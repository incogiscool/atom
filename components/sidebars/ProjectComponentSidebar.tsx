import { Project } from "@/lib/types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { IoChevronBackOutline, IoCopyOutline } from "react-icons/io5";
import { Button } from "../ui/button";

export const ProjectComponentSidebar = ({
  project,
  selectedPostId,
  setSelectedPostId,
}: {
  project: Project;
  selectedPostId: string | null;
  setSelectedPostId: Dispatch<SetStateAction<string | null>>;
}) => {
  function handleCreateNewPost() {}

  return (
    <div className="flex flex-col h-screen max-h-screen w-[325px] p-4 border-r">
      <div className="flex-shrink-0 flex gap-4 items-center">
        <Link
          href={"/app"}
          className="w-[30px] h-[30px] flex items-center justify-center bg-black hover:bg-slate-800 transition text-white rounded-lg"
        >
          <IoChevronBackOutline />
        </Link>
        <p>Back to app</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col flex-grow overflow-hidden">
        <p className="text-lg font-medium">Posts</p>
        <div className="flex-grow overflow-auto space-y-2 pr-4 my-6">
          {project.posts.map((post) => (
            <div
              key={post.id}
              className={`p-2 ${
                post.id === selectedPostId && "bg-black text-white"
              } hover:bg-slate-800 hover:text-white transition rounded-lg cursor-pointer`}
              onClick={() => setSelectedPostId(post.id)}
            >
              <p>{post.title.slice(0, 20) + "..."}</p>
              <p className="text-sm">
                {new Date(post.updatedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full space-y-4">
        <Button
          variant={"outline"}
          onClick={() => {
            navigator.clipboard.writeText(project.project_key);
            toast.success("Copied project key.");
          }}
          className="flex gap-4 items-center w-full text-sm"
        >
          <IoCopyOutline />
          <p>Copy project key</p>
        </Button>
        <Button onClick={handleCreateNewPost} className="w-full">
          Create new post
        </Button>
      </div>
    </div>
  );
};
