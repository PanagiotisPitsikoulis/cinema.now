import React from "react";
import {Control, ControllerRenderProps, FieldValues, UseFormReturn, UseFormStateReturn,} from "react-hook-form";
import FormInput from "./input-components/form-input";
import FormTextarea from "./input-components/form-textarea";
import {FormLoginPassword} from "./input-components/form-login-password";
import {FormPassword} from "./input-components/form-password";
import {FieldSchema} from "@/Components/lib/ui/form/index";

interface RenderFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    fieldSchema: FieldSchema<T>;
    isInvalid?: boolean;
    control?: Control<T>;
    errorMessage?: string;
    formState: UseFormStateReturn<T>;
}

export function renderField<T extends FieldValues>({
                                                       ...props
                                                   }: RenderFieldProps<T> & UseFormReturn<T>) {
    const {type, ...fieldSchema} = props.fieldSchema;

    const componentMap: Record<string, React.FC<any>> = {
        loginPassword: FormLoginPassword,
        password: FormPassword,
        textarea: FormTextarea,
        default: FormInput,
    };

    const Component = componentMap[type!] || componentMap["default"];

    if (!Component) {
        console.error(`No component found for type '${type}'.`);
        return null;
    }

    return <Component {...props} type={type} {...fieldSchema} />;
}
