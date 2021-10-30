import { Box, Heading } from "@chakra-ui/layout";
import { create } from "domain";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface Props {}

const Post: React.FC<Props> = ({}) => {
    const router = useRouter();
    const intId =
        typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    const [{ data, error, fetching }] = usePostQuery({
        variables: {
            id: intId,
        },
    });

    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div>{error.message}</div>
            </Layout>
        );
    }

    if (!data?.post) {
        return (
            <Layout>
                <Box>could not find post</Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Heading mb={4}> {data.post.title}</Heading>
            {data.post.text}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
