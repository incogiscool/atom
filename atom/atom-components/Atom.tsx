"use server";
import Image from "next/image";
import { AtomBody } from "./AtomBody";
import axios from "axios";
import { ApiResponse } from "@/app/api/auth/signup/route";
import { Post } from "@/lib/types";
import { baseAPIRoute } from "@/lib/contants";
import { getPost } from "../lib/client/getPost";

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
  const apires = await getPost(apiKey, postId);
  const res = apires.response;

  const publish_date = new Date(res?.createdAt || "");

  return (
    <>
      {apires.success ? (
        <main className="flex justify-center sm:p-20 p-8">
          <article className="prose lg:prose-xl">
            <div className="flex items-center flex-col gap-4">
              <section className="space-y-6">
                <header className="space-y-4">
                  <h1 className="text-center">{res.title}</h1>

                  {res.image && (
                    <div
                      className="w-full h-auto rounded-xl"
                      style={{
                        backgroundImage: `url(${res.image})`,
                        width: "100%",
                        height: 450,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  <div className="flex items-center justify-center gap-4">
                    <p className="author">{res.author}</p>|
                    <time dateTime={publish_date.toDateString()}>
                      {publish_date.toDateString()}
                    </time>
                  </div>
                </header>
              </section>

              <section className="mt-12">
                <AtomBody className="space-y-6" body={res.body} />
              </section>
            </div>
          </article>
        </main>
      ) : (
        apires.message
      )}
    </>
  );
};
