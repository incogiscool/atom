import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import z from "zod";
import { Post } from "@/lib/types";
import { Input } from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  author: z.string().min(1, "Author cannot be empty."),
  body: z.string().min(1, "Title cannot be empty."),
  //DO KEYWORDS ZOD TYPE AS ARRAY
  keywords: z.any(),
  image: z.any(),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;

export const ProjectFormComponent = ({ openedPost }: { openedPost: Post }) => {
  function onSubmit() {}

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      // title: openedPost?.title || "",
      // author: openedPost?.author || "",
      // body: openedPost?.body || "",
      // keywords: openedPost?.keywords || null,
      // image: openedPost?.keywords || null,
    },
  });

  const keywords =
    (openedPost.keywords && openedPost.keywords.join(",")) || null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-8">
        <p className="text-sm text-slate-500">id: {openedPost.id}</p>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  defaultValue={openedPost.title}
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  defaultValue={openedPost.author}
                  placeholder="Author"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  defaultValue={openedPost.body}
                  className="border rounded-md p-2 h-[250px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Keywords (seperate with a comma)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Keywords"
                  defaultValue={keywords || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Save changes</Button>
      </form>
    </Form>
  );
};
