import {Button, Card, CardFooter, CardHeader, Image} from "@nextui-org/react";
import React from "react";
import {Link} from "@inertiajs/react";
import {motion} from "motion/react"


export interface CardData {
    href?: string;
    header: {
        title: string;
        subtitle: string;
    };
    image: string;
    footer: {
        customContent?: React.ReactNode;
        appName: string;
        description: string;
        buttonLabel: string;
    };
}

/**
 * Represents a single card component.
 * @param props - Props for the card.
 */
export function GridItem(props: CardData) {
    const {href, header, image, footer} = props;

    return (
        <Card
            shadow={"md"}
            isFooterBlurred
            className="w-full h-full relative"
            as={Link}
            href={href ?? ""}
        >
            <CardHeader
                className="absolute bg-gradient-to-b from-black/50 to-transparent z-10 top-0 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                    {header.subtitle}
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                    {header.title}
                </h4>
            </CardHeader>
            <motion.div layoutId={image}>
                <Image
                    removeWrapper
                    alt={header.title}
                    className="z-0 w-full h-full object-cover"
                    src={image}
                />
            </motion.div>

            <CardFooter
                className="absolute bg-black/40 bottom-0 z-10"
            >
                <div className="flex flex-grow gap-2 items-center">
                    {footer.customContent && (
                        <div className="flex items-center">
                            {footer.customContent}
                        </div>
                    )}
                    <div className="flex flex-col mx-2">
                        <p className="text-tiny text-white">{footer.appName}</p>
                        <p className="text-tiny text-white/60 line-clamp-2">
                            {footer.description}
                        </p>
                    </div>
                </div>
                <Button radius="full" size="sm">
                    {footer.buttonLabel}
                </Button>
            </CardFooter>
        </Card>
    );
}
