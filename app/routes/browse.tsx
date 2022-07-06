import type { LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useElementSize } from 'usehooks-ts'
import PostDisplay, { postDisplayStyles } from '~/components/post-display'
import type { PostWithMeta } from '~/models/post'
import { getPosts } from '~/models/post'

export const links: LinksFunction = () => [...postDisplayStyles()]

type LoaderData = { posts: (PostWithMeta & { id: string; created: Date })[] }

export async function loader() {
  return json<LoaderData>({
    posts: [
      ...(await getPosts()),
      {
        id: 'hello!',
        created: new Date(),
        imageUrl: 'http://placekitten.com/500/300',
        isReply: false,
        title: 'You had been trolled',
        subtitle: 'You had been trolled...',
      },
    ],
  })
}

export default function BrowsePage() {
  const { posts } = useLoaderData<LoaderData>()
  const [containerRef, { width, height }] = useElementSize()
  return (
    <div className="container mx-auto my-12 max-w-4xl px-2">
      <h1>Welcome to Remix</h1>
      <div ref={containerRef}>
        {posts.map((post) => (
          <PostDisplay {...{ post, width }} key={post.id} />
        ))}
      </div>
      <Outlet />
    </div>
  )
}
