import {Button, ButtonProps} from "@nextui-org/button";
import React from "react";
import {Link} from "@nextui-org/react";

// Props for the PolymorphicButton component
export type PolymorphicButtonProps = {
    href?: string;
    func?: () => Promise<void>;
    isExternal?: boolean;
    disableLoading?: boolean;
} & ButtonProps;

// PolymorphicButton automatically determines if it should render a button or a link
function PolymorphicButton({
                               href,
                               func,
                               isExternal,
                               disableLoading,
                               ...buttonProps
                           }: PolymorphicButtonProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    if (href) {
        // Render as a Link
        return (
            <Button {...buttonProps} as={Link} href={href} isExternal={isExternal}/>
        );
    }

    if (func) {
        // Render as a Button
        return (
            <Button
                isLoading={isLoading}
                onPress={async (e) => {
                    if (!disableLoading) setIsLoading(true);
                    func && (await func());
                    buttonProps.onPress && buttonProps.onPress(e);
                    if (!disableLoading) setIsLoading(false);
                }}
                {...buttonProps}
            />
        );
    }

    // Render null if neither href nor func is provided
    return null;
}

export default PolymorphicButton;
