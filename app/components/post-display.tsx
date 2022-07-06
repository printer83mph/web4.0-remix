import clsx from 'clsx'
import type { Post } from '~/models/post'

import styles from './post-display.css'

export const postDisplayStyles = () => [{ rel: 'stylesheet', href: styles }]

export interface PostDisplayProps {
  post: Post
  width: number
}

function PostDisplay({ post, width }: PostDisplayProps) {
  return (
    <div
      className="post relative flex select-none flex-col items-center bg-black text-center font-serif text-white"
      style={{ '--width': `${width}px` } as any}
    >
      <div
        className={clsx(
          'post-img-container p-[.5%]',
          post.isReply || 'limit-height'
        )}
      >
        {post.isReply ? (
          <PostDisplay post={post.innerPost} width={width * 0.65} />
        ) : (
          <img src={post.imageUrl} alt={post.title} className="h-full" />
        )}
      </div>
      <h3 className="post-title uppercase leading-[100%] tracking-wide">
        {post.title}
      </h3>
      <p className="post-subtitle leading-[150%]">{post.subtitle}</p>
    </div>
  )
}

export default PostDisplay
