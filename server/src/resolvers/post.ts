import { Resolver, Query, Ctx, Arg, Mutation, Int } from "type-graphql";
import { Post } from "../entities/Post";

import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post], { description: "Return array Posts" })
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    async post(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("title") title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, {
            title,
        });
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("title", () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id });

        if (!post) {
            return null;
        }
        if (typeof title !== "undefined") {
            post.title = title;
            await em.persistAndFlush(post);
        }

        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        const result = await em.nativeDelete(Post, { id });

        if (result) {
            return true;
        } else {
            return false;
        }
    }
}