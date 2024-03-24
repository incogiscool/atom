'use server';
import React from 'react';
import { AtomBody } from './AtomBody';
import { getPost } from '../lib/client/getPost';

/*

KEEP SERVERSIDE RENDERING BECAUSE OF API KEY

*/

export const Atom = async ({
  projectKey,
  postId,
}: {
  projectKey: string;
  postId: string;
}) => {
  const apires = await getPost(projectKey, postId);
  const res = apires.response;

  const publish_date = new Date(res?.createdAt || '');

  return (
    <>
      {apires.success ? (
        <main className="flex justify-center sm:p-20 p-8">
          <article className="prose lg:prose-xl w-full">
            <div className="flex items-center flex-col gap-4 w-full">
              <section className="space-y-6 w-full">
                <header className="space-y-4 w-full">
                  <h1 className="text-center">{res.title}</h1>

                  {res.image && (
                    <div
                      className="w-full h-auto rounded-xl"
                      style={{
                        backgroundImage: `url(${res.image})`,
                        width: '100%',
                        height: 450,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
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
