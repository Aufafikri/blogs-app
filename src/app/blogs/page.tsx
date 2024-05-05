import Link from "next/link";
import { posts } from "../../data/posts";
import prisma from "@/lib/db";

const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true
    }
  })
  console.log(posts)
  return (
    <div className="bg-slate-200 max-sm:p-2">
      <div className="max-w-4xl min-h-screen mx-auto py-8">
        <h1 className="font-bold text-3xl mb-4">Blogs</h1>
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
          {posts.map((post) => {
            return (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                className="bg-white p-4 rounded-md shadow-md"
              >
                <h2 className="text-xl font-bold"> {post.title} </h2>
                <p>writtenBy : {post.author?.name} </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
