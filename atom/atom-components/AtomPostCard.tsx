import { ClientPost } from "@/app/api/projects/get/single/client/route";
import Link from "next/link";

export const AtomPostCard = ({
  post,
  baseRoute,
}: {
  post: ClientPost;
  baseRoute: string;
}) => {
  return (
    <Link
      href={`${baseRoute}/${post.id}`}
      className="w-[300px] border h-fit p-4 rounded-lg hover:bg-slate-50 transition"
    >
      {post.image && (
        <div
          className="rounded-md mb-4"
          style={{
            backgroundImage: `url(${post.image})`,
            width: "100%",
            height: 150,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <p className="text-sm text-slate-500">{post.teaser}</p>
        </div>
        <div className="text-sm text-slate-500">
          {post.author} | {new Date(post.createdAt).toDateString()}
        </div>
      </div>
    </Link>
  );
};
