import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import InputError from "@/Components/laravel-defaults/InputError";
import InputLabel from "@/Components/laravel-defaults/InputLabel";

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    /**
     * Handles the form submission to delete the user's account.
     */
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
        });
    };

    /**
     * Opens the modal for confirming user deletion.
     */
    const openModal = () => {
        setConfirmingUserDeletion(true);
    };

    /**
     * Closes the modal and resets the form state.
     */
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <Card className="lg:max-w-[50vw] w-full mx-auto" isBlurred>
            <CardHeader>
                <div className="flex flex-col">
                    <h2 className="text-md font-semibold">Delete Account</h2>
                    <p className="text-small text-default-500">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm.
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <Button color="danger" onClick={openModal}>
                    Delete Account
                </Button>
            </CardBody>

            <Modal
                isOpen={confirmingUserDeletion} // Control the modal visibility
                onClose={closeModal} // Handle modal close event
                isDismissable // Allow closing via overlay click or Esc key
            >
                <ModalContent>
                    <form onSubmit={submit}>
                        {/* Modal Header */}
                        <ModalHeader>
                            <h3 className="text-lg font-semibold">
                                Confirm Account Deletion
                            </h3>
                        </ModalHeader>

                        {/* Modal Body */}
                        <ModalBody>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Please enter your password to confirm you would
                                like to permanently delete your account.
                            </p>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <Input
                                    type="password"
                                    id="password"
                                    ref={passwordInput}
                                    placeholder="Enter your password"
                                    required
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    autoFocus // Automatically focus on this input when modal opens
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </ModalBody>

                        {/* Modal Footer */}
                        <ModalFooter>
                            <Button variant="bordered" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button
                                color="danger"
                                disabled={processing}
                                type="submit"
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Card>
    );
}
