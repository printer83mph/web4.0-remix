import type { LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PostDisplay, { postDisplayStyles } from '~/components/post-display'
import type { Post } from '~/models/post'

export const links: LinksFunction = () => [...postDisplayStyles()]

type LoaderData = { posts: (Post & { id: string; created: Date })[] }

export async function loader() {
  return json<LoaderData>({
    posts: [
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

export default function IndexPage() {
  const { posts } = useLoaderData<LoaderData>()
  return (
    <div className="container mx-auto">
      <h1>Welcome to Remix</h1>
      {posts.map((post) => (
        <PostDisplay {...{ post }} width={400} key={post.id} />
      ))}
    </div>
  )
}
