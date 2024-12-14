import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Button } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Email Verification" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">
                                Verify Email Address
                            </h2>
                            <p className="text-small text-default-500">
                                Confirm your email to access your account
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Thanks for signing up! Before getting started, could
                            you verify your email address by clicking on the
                            link we just emailed to you? If you didn’t receive
                            the email, we will gladly send you another.
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to the
                                email address you provided during registration.
                            </div>
                        )}
                    </CardBody>
                    <CardFooter>
                        <form onSubmit={submit} className="flex w-full">
                            <div className="flex items-center justify-between w-full">
                                <Button
                                    color="primary"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Resend Verification Email
                                </Button>

                                <Button
                                    color="danger"
                                    onClick={() =>
                                        post(route("logout"), {
                                            preserveScroll: true,
                                        })
                                    }
                                    variant="flat"
                                >
                                    Log Out
                                </Button>
                            </div>
                        </form>
                    </CardFooter>
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
