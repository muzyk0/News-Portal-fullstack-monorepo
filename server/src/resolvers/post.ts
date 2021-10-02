import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";

import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
    @Query(() => [Post], { description: "Return array Posts" })
    async posts(): Promise<Post[]> {
        return Post.find();
    }

    @Query(() => Post, { nullable: true })
    async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    @Mutation(() => Post)
    async createPost(@Arg("title") title: string): Promise<Post> {
        const post = Post.create({
            title,
        });
        return await post.save();
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("title", () => String, { nullable: true }) title: string
    ): Promise<Post | null> {
        const post = await Post.findOne(id);

        if (!post) {
            return null;
        }
        if (typeof title !== "undefined") {
            await Post.update({ id }, { title });
        }

        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg("id", () => Int) id: number): Promise<boolean> {
        const result = await Post.delete(id);

        if (result) {
            return true;
        } else {
            return false;
        }
    }
}
