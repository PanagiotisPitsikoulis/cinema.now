import React, {useEffect, useRef, useState} from "react";
import {Link} from "@nextui-org/react";


export interface Props {
    id?: string;
    children?: React.ReactNode;
}

/**
 * Encodes a string for use in a virtual anchor link.
 * @param text - The text to encode.
 * @returns The encoded text.
 */
export const virtualAnchorEncode = (text?: string) => {
    if (!text) return undefined;

    return text.toLowerCase().replace(/ /g, "-");
};

/**
 * A component that creates a virtual anchor link.
 * @param id - The ID of the anchor link.
 * @param children - The children of the anchor link.
 * @returns JSX.Element
 */
export const VirtualAnchor: React.FC<Props> = ({children, id}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [anchorId, setAnchorId] = useState<string | undefined>();

    useEffect(() => {
        if (!ref.current || !id) return;
        setAnchorId(virtualAnchorEncode(ref.current.textContent || undefined));
    }, [ref.current, id]);

    return (
        <Link
            ref={ref}
            className='relative w-fit flex items-center gap-1 group text-inherit'
            href={`#${id || anchorId}`}
        >
            {children}
            <span className='opacity-0 transition-opacity group-hover:opacity-100'>
      </span>
        </Link>
    );
};
