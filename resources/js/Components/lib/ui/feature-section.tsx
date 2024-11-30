import {Button, Image, Link} from "@nextui-org/react";
import {sectionWrapper, subtitle, title, titleWrapper} from "@/Components/lib/ui/primitives";
import {FeaturesGrid} from "@/Components/lib/ui/features-grid";
import {GradientBox} from "@/Components/lib/ui/gradient-box";
import {cn} from "@/Components/utils";

export type FeatureSectionProps = {
    /** Children elements to render inside the GradientBox. */
    children: React.ReactNode;
    /** Whether to reverse the order of the content and the GradientBox. */
    reverse?: boolean;
    /** Color theme for the section. */
    color?: "green" | "pink" | "orange";
    /** Heading configuration with title, subtitle, and colored text. */
    heading: {
        title: string;
        subtitle: string;
        coloredText: string;
    };
    /** Button configuration with text and link. */
    button: {
        text: string;
        link: string;
    };
    /** External link with text and href. */
    externalLink: {
        text: string;
        href: string;
    };
    /** Array of features for the FeaturesGrid component. */
    features: {
        title: string;
        icon: React.ReactNode;
    }[];
    /** Optional background image URL. */
    backgroundImage?: string;
};

/**
 * FeatureSection component renders a section with a heading, features grid,
 * button, and optional background image.
 */
export const FeatureSection: React.FC<FeatureSectionProps> = ({
                                                                  children,
                                                                  reverse = false,
                                                                  color = "green",
                                                                  heading,
                                                                  button,
                                                                  externalLink,
                                                                  features,
                                                                  backgroundImage,
                                                              }) => {
    return (
        <section className={sectionWrapper({class: "z-20"})}>
            <div className='flex flex-col gap-8'>
                {/* Heading Section */}
                <div>
                    <div className={titleWrapper()}>
                        <h1 className={title({size: "lg"})}>{heading.title}</h1>
                        <div>
                            <h1
                                className={title({
                                    color: color === "orange" ? "yellow" : color,
                                    size: "lg",
                                })}
                            >
                                {heading.coloredText}&nbsp;
                            </h1>
                            <h1 className={title({size: "lg"})}>{heading.subtitle}</h1>
                        </div>
                    </div>
                    <p className={subtitle()}>
                        <Link
                            isExternal
                            className='text-xl text-default-500 font-light [&>svg]:ml-1'
                            href={externalLink.href}
                            underline='always'
                        >
                            {externalLink.text}
                        </Link>
                    </p>
                </div>

                {/* Features and GradientBox Section */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24'>
                    <div className='flex flex-col mt-8 lg:mt-16 gap-6'>
                        <FeaturesGrid
                            classNames={{
                                base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
                                header: "pb-3",
                                card: "bg-white dark:bg-default-400/10",
                                iconWrapper:
                                    "bg-default-100 dark:bg-transparent text-default-500/50",
                            }}
                            features={features}
                        />
                        <Button
                            aria-label={button.text}
                            as={Link}
                            className='max-w-fit'
                            color='default'
                            href={button.link}
                            radius='full'
                            size='sm'
                            variant='flat'
                        >
                            {button.text}
                        </Button>
                    </div>
                    <GradientBox
                        className={cn(
                            "h-full min-h-[200px] lg:min-h-[390px] max-h-[300px] lg:pt-8 items-center lg:items-start justify-center",
                            reverse && "lg:order-first"
                        )}
                        color={color}
                        to='right'
                    >
                        {children}
                    </GradientBox>
                </div>
            </div>

            {/* Optional Background Image */}
            {backgroundImage && (
                <div className='absolute hidden dark:md:block h-full dark:opacity-70 -bottom-[10%] left-[20%] z-[-10]'>
                    <Image
                        removeWrapper
                        alt='Feature Section Background'
                        className='h-full z-[-10]'
                        src={backgroundImage}
                    />
                </div>
            )}
        </section>
    );
};
