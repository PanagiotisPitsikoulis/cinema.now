import { Link } from "@nextui-org/react";

function getCurrentYear(): number {
    return new Date().getFullYear();
}

export type FooterProps = {
    text: {
        brandName: string;
        copyrightText: string;
        createdByText: string;
        creatorName: string;
    };
    creatorExternalLink: string;
};

export const Footer = ({ text, creatorExternalLink }: FooterProps) => {
    return (
        <footer className="container mx-auto max-w-7xl pb-12 px-12">
            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm text-default-400">
                    © {getCurrentYear()} {text.brandName}. {text.copyrightText}.
                </p>
                <p className="text-sm text-default-400">
                    {text.createdByText}{" "}
                    <Link
                        color="foreground"
                        size="sm"
                        showAnchorIcon
                        isExternal
                        href={creatorExternalLink}
                    >
                        {text.creatorName}
                    </Link>
                </p>
            </div>
        </footer>
    );
};
