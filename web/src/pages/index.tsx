import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/layout";
import { UpdootSection } from "../components/UpdootSection";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
    const [variables, setVariables] = useState<PostsQueryVariables>({
        limit: 15,
        cursor: null,
    });
    const [{ data, fetching }] = usePostsQuery({
        variables,
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
                    {data!.posts.posts.map((p) => (
                        <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                            <UpdootSection post={p} />
                            <Box>
                                <Heading fontSize="xl">{p.title}</Heading>
                                <Text>posted by {p.creator.username}</Text>
                                <Text mt={4}>{p.textSnippet}</Text>
                            </Box>
                        </Flex>
                    ))}
                </Stack>
            )}
            {data && data.posts.hasMore ? (
                <Flex>
                    <Button
                        isLoading={fetching}
                        disabled={data.posts.posts.length < variables.limit}
                        m="auto"
                        my={8}
                        onClick={() => {
                            setVariables({
                                limit: variables.limit,
                                cursor: data.posts.posts.at(-1)?.createdAt,
                            });
                        }}
                    >
                        load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
