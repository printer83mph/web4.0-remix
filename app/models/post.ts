import prisma from '~/lib/prisma'
import { z } from 'zod'
import type { Post as PrismaPost } from '@prisma/client'

export type RawPost = {
  title: string
  subtitle: string
} & (
  | { isReply: true; innerPost: RawPost }
  | { isReply: false; imageUrl: string }
)

export type Post = RawPost & {
  id: string
  created: Date
}

export const postArgsSchema: z.ZodType<RawPost> = z.lazy(() =>
  z
    .object({
      title: z.string(),
      subtitle: z.string(),
    })
    .and(
      z.discriminatedUnion('isReply', [
        z.object({ isReply: z.literal(true), innerPost: postArgsSchema }),
        z.object({ isReply: z.literal(false), imageUrl: z.string() }),
      ])
    )
)

export function prismaPostToTyped(post: PrismaPost) {
  return { ...post, isReply: !post.imageUrl } as Post
}

export async function createPost({ isReply, ...post }: Post) {
  return prisma.post.create({ data: post })
}

export async function getPosts({ from, to }: { from?: Date; to?: Date } = {}) {
  const response = await prisma.post.findMany({
    where: {
      created: {
        gte: from,
        lte: to,
      },
    },
  })
  return response.map(prismaPostToTyped)
}
