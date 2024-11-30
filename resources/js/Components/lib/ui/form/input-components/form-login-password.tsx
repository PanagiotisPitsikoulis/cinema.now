import React from "react";
import FormInput, {FormInputProps} from "./form-input";
import {FieldValues} from "react-hook-form";
import {Link} from "@nextui-org/react";

export function FormLoginPassword<T extends FieldValues>(
    props: FormInputProps<T>
) {
    return (
        <>
            <FormInput {...props} type='password' isPassword/>
            <div className='flex items-center justify-end'>
                <Link href='/forgot-password'>
                    <small className='py-2 underline'>Forgot your password?</small>
                </Link>
            </div>
        </>
    );
}
