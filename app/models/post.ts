import { z } from 'zod'
import type { Post as PrismaPost } from '@prisma/client'
import prisma from '~/lib/prisma'

export type Post = {
  title: string
  subtitle: string
} & ({ isReply: true; innerPost: Post } | { isReply: false; imageUrl: string })

export type PostWithMeta = Post & {
  id: string
  created: Date
}

export const postArgsSchema: z.ZodType<Post> = z.lazy(() =>
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

export function parsePrismaPost(post: PrismaPost) {
  const data = JSON.parse(post.stringified)
  return { ...data, isReply: !data.imageUrl } as PostWithMeta
}

export async function createPost({ isReply, ...post }: Post) {
  return prisma.post.create({ data: { stringified: JSON.stringify(post) } })
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
  return response.map(parsePrismaPost)
}
