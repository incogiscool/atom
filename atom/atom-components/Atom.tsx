"use server";
import Image from "next/image";
import { AtomBody } from "./AtomBody";
import axios from "axios";
import { ApiResponse } from "@/app/api/auth/signup/route";
import { Post } from "@/lib/types";
import { baseAPIRoute } from "@/lib/contants";
import { getPost } from "../lib/server/getPost";

/*

KEEP SERVERSIDE RENDERING BECAUSE OF API KEY

*/

export const Atom = async ({
  apiKey,
  postId,
}: {
  apiKey: string;
  postId: string;
}) => {
  const res = await getPost(apiKey, postId);

  const publish_date = new Date(res?.createdAt || "");

  return (
    <>
      {res ? (
        <main className="flex justify-center sm:p-20 p-8">
          <article className="flex items-center flex-col gap-4 max-w-[950px]">
            <section className="space-y-6">
              <header className="space-y-4">
                <h1 className="sm:text-5xl text-4xl text-center font-bold">
                  {res.title}
                </h1>

                <div className="flex items-center justify-center gap-4">
                  <time dateTime={publish_date.toDateString()}>
                    {publish_date.toDateString()}
                  </time>
                  |<p className="author">{res.author}</p>
                </div>
              </header>

              {res.image && (
                <img
                  alt="article-image"
                  src={res.image}
                  className="w-full h-auto rounded-xl"
                />
              )}
            </section>

            <section className="mt-12">
              <AtomBody className="space-y-6" body={res.body} />
            </section>
          </article>
        </main>
      ) : (
        "no response from server"
      )}
    </>
  );
};
