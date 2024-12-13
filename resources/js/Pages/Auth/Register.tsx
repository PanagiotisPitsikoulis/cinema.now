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
    Link,
} from "@nextui-org/react";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Register" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">Sign Up</h2>
                            <p className="text-small text-default-500">
                                Create a new account
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <Input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <Input
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
                                    type="password"
                                    placeholder="Enter password"
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
                                    placeholder="Confirm password"
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
                    <Divider />
                    <CardFooter>
                        <div className="flex items-center w-full justify-end">
                            <Link
                                href={route("login")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Already registered?
                            </Link>

                            <Button
                                color="primary"
                                className="ms-4"
                                disabled={processing}
                                onClick={submit}
                            >
                                Register
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
