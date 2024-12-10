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

/**
 * PolymorphicButton component for rendering a button or a link.
 * @param href - The URL for the button.
 * @param func - The function to call when the button is clicked.
 * @param isExternal - Whether the button is external.
 * @param disableLoading - Whether to disable the loading state.
 * @param buttonProps - Additional props for the button.
 * @returns JSX.Element
 */
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
