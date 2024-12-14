import AuthenticatedLayout from "@/Components/laravel-defaults/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Forms/DeleteUserForm";
import UpdatePasswordForm from "./Forms/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Forms/UpdateProfileInformationForm";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";
import Layout from "@/Layouts/Layout";
import { Spacer } from "@nextui-org/react";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <Layout className="pt-20 mt-0 pb-0 mb-0">
            <Head title="Profile" />
            <BackgroundContainer className="min-h-screen">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />
                <Spacer y={10} />
                <UpdatePasswordForm />
                <Spacer y={10} />
                <DeleteUserForm />
                <Spacer y={10} />
            </BackgroundContainer>
        </Layout>
    );
}
