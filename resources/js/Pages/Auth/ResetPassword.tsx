import InputError from "@/Components/laravel-defaults/InputError";
import InputLabel from "@/Components/laravel-defaults/InputLabel";
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

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Reset Password" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">
                                Reset Password
                            </h2>
                            <p className="text-small text-default-500">
                                Enter your new password to reset access to your
                                account
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
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

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    required
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
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <Input
                                    type="password"
                                    placeholder="Confirm new password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.password_confirmation}
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
                                Reset Password
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
