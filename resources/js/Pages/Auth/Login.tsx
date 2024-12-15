import InputError from "@/Components/lib/ui/InputError";
import InputLabel from "@/Components/lib/ui/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Layout from "@/Layouts/Layout";
import { Button, Checkbox, Input } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
} from "@nextui-org/react";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Log in" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">Log In</h2>
                            <p className="text-small text-default-500">
                                Sign in to your account
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <Input
                                    type="email"
                                    placeholder="user@example.com"
                                    required
                                    autoComplete="email"
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

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <Checkbox
                                    isSelected={data.remember}
                                    onValueChange={(value) =>
                                        setData("remember", value)
                                    }
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                            </div>

                            <div className="flex items-center w-full justify-end mt-6">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <Button
                                    color="primary"
                                    className="ms-4"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                    {status && (
                        <CardFooter>
                            <div className="text-sm font-medium text-green-600">
                                {status}
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
