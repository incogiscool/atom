"use server";
import Link from "next/link";
import { getAllPosts } from "../lib/client/getAllPosts";

export const AtomPage = async ({ apiKey }: { apiKey: string }) => {
  const res = await getAllPosts(apiKey);

  return (
    <main className="sm:p-20 p-8 flex flex-col justify-center">
      {res ? (
        <>
          <h1 className="text-center text-5xl font-semibold">{res.title}</h1>
          <div className="gap-6 flex flex-wrap justify-center mt-12">
            {res.posts.map((post) => {
              return (
                <Link
                  key={post.post_id}
                  href={`/blog/${post.post_id}`}
                  className="border rounded-lg w-[550px] p-6 flex items-center hover:bg-slate-100 transition"
                >
                  <div className="flex gap-8 flex-wrap">
                    {post.image && (
                      <img
                        alt="article-image"
                        src={post.image}
                        className="w-[125px] h-[125px] rounded-xl"
                      />
                    )}
                    <div className="max-w-xs">
                      <h6 className="font-medium">{post.title}</h6>
                      <p className="text-slate-500 text-sm mt-2">
                        {post.teaser}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        "could not fetch posts"
      )}
    </main>
  );
};
