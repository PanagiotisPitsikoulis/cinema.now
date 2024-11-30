import React from "react";
import {Controller, DefaultValues, FieldValues, Path, RegisterOptions, useForm} from "react-hook-form";
import {Button} from "@nextui-org/button";
import {renderField} from "./render-field";
import {cn} from "@/Components/utils";


export interface FieldSchema<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
    type?: string;
    validation?: RegisterOptions<T, Path<T>>;
}

export interface FormSchema<T extends FieldValues> {
    fields: FieldSchema<T>[];
}

export interface FormProps<T extends FieldValues> {
    schema: FormSchema<T>;
    onSubmit: (data: T) => Promise<void>;
    initialValues: DefaultValues<T>;
}


export type FormClientProps<T extends FieldValues> = FormProps<T> &
    FormClientExtraProps;

export type FormClientExtraProps = {
    config?: {
        extraButtons?: React.ReactNode;
    };
    classNames?: {
        form?: string;
        buttons?: string;
        fieldWrapper?: string;
    };
    className?: string;
    text?: {
        submitButton?: string;
        clearButton?: string;
    };
};

export const Form = <T extends FieldValues>({
                                                schema,
                                                onSubmit,
                                                initialValues,
                                                config,
                                                classNames,
                                                className,
                                                text,
                                            }: FormClientProps<T>) => {
    const formData = useForm<T>({
        defaultValues: initialValues,
    });

    return (
        <form
            className={cn("w-full space-y-2", className, classNames?.form)}
            onSubmit={formData.handleSubmit(onSubmit)}
        >
            {schema.fields.map((fieldSchema) => (
                <div key={fieldSchema.name} className={cn(classNames?.fieldWrapper)}>
                    <Controller
                        name={fieldSchema.name}
                        control={formData.control}
                        rules={fieldSchema.validation}
                        render={({field, fieldState, formState}) =>
                            renderField({
                                ...formData,
                                field,
                                formState,
                                fieldSchema,
                                isInvalid: !!fieldState.error,
                                errorMessage: fieldState.error?.message,
                            })!
                        }
                    />
                </div>
            ))}
            <div
                className={cn(
                    "flex flex-row gap-2 items-center pt-3",
                    classNames?.buttons
                )}
            >
                <Button
                    type='submit'
                    color='primary'
                    isLoading={formData.formState.isSubmitting}
                    disabled={formData.formState.isSubmitting}
                >
                    {text?.submitButton || "Submit"}
                </Button>
                <Button
                    variant='bordered'
                    color='default'
                    type='button'
                    onClick={() => formData.reset(initialValues)}
                >
                    {text?.clearButton || "Clear"}
                </Button>
                {config?.extraButtons}
            </div>
        </form>
    );
};
