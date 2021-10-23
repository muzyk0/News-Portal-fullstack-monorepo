import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/layout";
import React from "react";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { Button, Stack } from "@chakra-ui/react";

const Index = () => {
    const [{ data, fetching }] = usePostsQuery({
        variables: {
            limit: 10,
        },
    });

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>;
    }

    return (
        <Layout>
            <Flex align="center" mb={8}>
                <Heading>Full-stack APP</Heading>

                <NextLink href="/create-post">
                    <Link ml="auto">create post</Link>
                </NextLink>
            </Flex>
            {!data && fetching ? (
                <div>loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data!.posts.map((p) => (
                        <Box p={5} shadow="md" borderWidth="1px">
                            <Heading fontSize="xl">{p.title}</Heading>
                            <Text mt={4}>{p.textSnippet}</Text>
                        </Box>
                    ))}
                </Stack>
            )}
            {data ? (
                <Flex>
                    <Button isLoading={fetching} m="auto" my={8}>
                        load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
