import { useForm, usePage, Link } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button, Input } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import InputLabel from "@/Components/lib/ui/InputLabel";
import InputError from "@/Components/lib/ui/InputError";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
            <CardHeader>
                <div className="flex flex-col">
                    <h2 className="text-md font-semibold">
                        Profile Information
                    </h2>
                    <p className="text-small text-default-500">
                        Update your account's profile information and email
                        address.
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
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <Input
                            type="email"
                            placeholder="user@example.com"
                            required
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="mt-4">
                            <p className="text-small text-gray-600 dark:text-gray-400">
                                Your email address is unverified.{" "}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>
                            {status === "verification-link-sent" && (
                                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </CardBody>
            <CardFooter>
                <div className="flex items-center w-full justify-end">
                    <Button
                        color="primary"
                        disabled={processing}
                        onClick={submit}
                    >
                        Save
                    </Button>
                    {status && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                            Saved.
                        </p>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
