import React, { useState } from "react";

import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface forgotPasswordProps {}

export const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
    const [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setComplete] = useState(false);
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>
                            if an account with thay email exists, we sent you
                            can email
                        </Box>
                    ) : (
                        <Form>
                            <Box mt={4}>
                                <InputField
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    type="email"
                                />
                            </Box>
                            <Button
                                mt={4}
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                forgot password
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
