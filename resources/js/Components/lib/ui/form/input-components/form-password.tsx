import FormInput, {FormInputProps} from "./form-input";
import {FieldValues} from "react-hook-form";

export function FormPassword<T extends FieldValues>(props: FormInputProps<T>) {
    return (
        <>
            <FormInput {...props} type='password' isPassword/>
        </>
    );
}
