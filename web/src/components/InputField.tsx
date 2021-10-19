import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    textarea,
    ...props
}) => {
    const InputOrTextarea = textarea ? (Textarea as any) : Input;
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};
