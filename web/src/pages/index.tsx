import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button, IconButton, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/layout";
import { UpdootSection } from "../components/UpdootSection";
import {
    PostsQueryVariables,
    useDeletePostMutation,
    usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
    const [variables, setVariables] = useState<PostsQueryVariables>({
        limit: 15,
        cursor: null,
    });
    const [{ data, fetching }] = usePostsQuery({
        variables,
    });
    const [, deletePost] = useDeletePostMutation();

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>;
    }

    return (
        <Layout>
            {!data && fetching ? (
                <div>loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data!.posts.posts.map((p) =>
                        !p ? null : (
                            <Flex
                                key={p.id}
                                p={5}
                                shadow="md"
                                borderWidth="1px"
                            >
                                <UpdootSection post={p} />
                                <Box flex={1}>
                                    <NextLink
                                        href="/post/[id]"
                                        as={`/post/${p.id}`}
                                    >
                                        <Link>
                                            <Heading fontSize="xl">
                                                {p.title}
                                            </Heading>
                                        </Link>
                                    </NextLink>
                                    <Text>posted by {p.creator.username}</Text>
                                    <Flex align="center">
                                        <Text flex={1} mt={4}>
                                            {p.textSnippet}
                                        </Text>
                                        <IconButton
                                            ml="auto"
                                            colorScheme="red"
                                            aria-label="Delete Post"
                                            onClick={async () => {
                                                await deletePost({ id: p.id });
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Flex>
                                </Box>
                            </Flex>
                        )
                    )}
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
