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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Confirm Password" />
            <BackgroundContainer className="min-h-screen">
                <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">
                                Confirm Password
                            </h2>
                            <p className="text-small text-default-500">
                                Verify your identity to continue
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            This is a secure area of the application. Please
                            confirm your password before continuing.
                        </div>

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
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
                                Confirm
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </BackgroundContainer>
        </Layout>
    );
}
