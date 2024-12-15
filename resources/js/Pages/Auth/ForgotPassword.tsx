import InputError from "@/Components/lib/ui/InputError";
import InputLabel from "@/Components/lib/ui/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Layout from "@/Layouts/Layout";
import { Button, Input } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Forgot Password" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">
                                Forgot Password
                            </h2>
                            <p className="text-small text-default-500">
                                Recover access to your account
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                        </form>
                    </CardBody>
                    <CardFooter>
                        <div className="flex items-center w-full justify-end">
                            <Button
                                color="primary"
                                className="ms-4"
                                disabled={processing}
                                onClick={submit}
                            >
                                Email Password Reset Link
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
