import {Textarea} from "@nextui-org/react";
import React from "react";
import {ControllerRenderProps} from "react-hook-form";

interface TextAreaProps {
    field: ControllerRenderProps;
    label?: string;
    description?: string;
    isInvalid?: boolean;
    errorMessage?: string;
    placeholder?: string;
}

function FormTextarea({
                          field,
                          label,
                          description,
                          isInvalid,
                          errorMessage,
                          placeholder,
                      }: TextAreaProps) {
    const shouldDisplayErrorMessage = isInvalid && errorMessage;
    return (
        <div key={field.name}>
            <Textarea label={label} {...field} placeholder={placeholder}/>
            {!shouldDisplayErrorMessage && description && (
                <small className='text-muted-foreground'>{description}</small>
            )}
            {shouldDisplayErrorMessage && (
                <small className='text-danger'>{errorMessage}</small>
            )}
        </div>
    );
}

export default FormTextarea;
