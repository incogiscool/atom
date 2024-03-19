import { MainContainer } from "@/components/containers/MainContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <MainContainer>
      <section className="h-screen items-center  flex flex-col">
        <h1 className="text-6xl font-bold max-w-2xl text-center">
          Ship blogs and articles in minutes.
        </h1>
        <p className="mt-4">
          Create, edit, and publish a fully functioning blog in NextJS by adding
          2 lines of code.
        </p>
        <div className="flex gap-4 mt-8">
          <Link href={"/signin"}>
            <Button>Get started</Button>
          </Link>
          <Button variant={"outline"}>See demo</Button>
        </div>
        <div className="mt-12">
          <iframe
            src="https://demo.arcade.software/HoopYQB3bkPgqxaXQhkt?embed&show_copy_link=true"
            title="Atom - The NextJS CMS"
            frameBorder="0"
            loading="lazy"
            allowFullScreen={true}
            allow="clipboard-write"
            className="bg-black p-2 rounded-lg"
            style={{
              width: "1100px",
              height: "575px",
              colorScheme: "light",
            }}
          ></iframe>
        </div>
      </section>
    </MainContainer>
  );
};

export default Home;
