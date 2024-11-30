import {Input} from "@nextui-org/react";
import {EyeClosed, EyeIcon} from "lucide-react";
import React from "react";
import {
    Control,
    ControllerRenderProps,
    FieldValues,
    UseFormRegister,
    UseFormReturn,
    UseFormStateReturn,
} from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
    field: ControllerRenderProps<T>;
    label?: string;
    description?: string;
    isInvalid?: boolean;
    errorMessage?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    formState?: UseFormStateReturn<T>;
    control?: Control<T>;
    register?: UseFormRegister<T>;
} & UseFormReturn<T>;

function FormInput<T extends FieldValues>({
                                              field,
                                              label,
                                              description,
                                              isInvalid,
                                              errorMessage,
                                              placeholder,
                                              type,
                                              isPassword,
                                          }: FormInputProps<T> & { isPassword?: boolean }) {
    const shouldDisplayErrorMessage = isInvalid && errorMessage;
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div key={field.name}>
            <Input
                label={label}
                {...field}
                endContent={
                    isPassword ? (
                        <button
                            className='focus:outline-none'
                            type='button'
                            onClick={toggleVisibility}
                            aria-label='toggle password visibility'
                        >
                            {isVisible ? (
                                <EyeClosed className='text-2xl text-default-400 pointer-events-none'/>
                            ) : (
                                <EyeIcon className='text-2xl text-default-400 pointer-events-none'/>
                            )}
                        </button>
                    ) : undefined
                }
                type={isVisible ? "text" : type}
                placeholder={placeholder}
            />
            {!shouldDisplayErrorMessage && description && (
                <small className='text-muted-foreground'>{description}</small>
            )}
            {shouldDisplayErrorMessage && (
                <small className='text-danger'>{errorMessage}</small>
            )}
        </div>
    );
}

export default FormInput;
