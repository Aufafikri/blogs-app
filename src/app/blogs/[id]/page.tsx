import Comments from "@/components/Comments"
import FormComment from "@/components/FormComment"
import prisma from "@/lib/db"
import { FC } from "react"

interface BlogDetailProps {
  params: {
    id: string
  }
}

const BlogDetailPage: FC<BlogDetailProps> = async ({ params }) => {
  const posts = await prisma.post.findFirst({
    where: {
      id: params.id
    },
    include: {
      author: true
    }
  })
  console.log(posts)
  return (
    <div className="max-sm:p-2">
    <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold">{posts?.title}</h1>
        <p>Written by: {posts?.author?.name}</p>
        <div className="mt-4">{posts?.content}</div>
        <Comments postsId={params.id} />
        <FormComment postsId={params.id} />
    </div>
    </div>
  )
}

export default BlogDetailPage