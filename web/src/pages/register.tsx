import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
