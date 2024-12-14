import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import InputError from "@/Components/laravel-defaults/InputError";
import InputLabel from "@/Components/laravel-defaults/InputLabel";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, put, errors, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            onError: () => {
                passwordInput.current?.focus();
                currentPasswordInput.current?.focus();
            },
        });
    };

    return (
        <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
            <CardHeader>
                <div className="flex flex-col">
                    <h2 className="text-md font-semibold">Update Password</h2>
                    <p className="text-small text-default-500">
                        Ensure your account is using a secure password.
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="current_password"
                            value="Current Password"
                        />
                        <Input
                            type="password"
                            ref={currentPasswordInput}
                            placeholder="Enter your current password"
                            required
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="New Password" />
                        <Input
                            type="password"
                            ref={passwordInput}
                            placeholder="Enter a new password"
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
                            placeholder="Confirm your new password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
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
                <Button color="primary" disabled={processing} onClick={submit}>
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    );
}
