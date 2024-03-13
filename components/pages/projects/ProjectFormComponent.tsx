import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import z from "zod";
import { Post } from "@/lib/types";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { MarkdownEditor } from "@/components/ui/markdown-editor";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  author: z.string().min(1, "Author cannot be empty."),
  body: z.string().min(1, "Title cannot be empty."),
  //DO KEYWORDS ZOD TYPE AS ARRAY
  keywords: z.string().optional(),
  image: z.any(),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;

export const ProjectFormComponent = ({ openedPost }: { openedPost: Post }) => {
  function onSubmit() {}
  function handleDeleteItem() {}

  const keywords =
    (openedPost.keywords && openedPost.keywords.join(",")) || undefined;

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: openedPost?.title || "",
      author: openedPost?.author || "",
      keywords,
      image: openedPost?.image || "",
      body: openedPost?.body || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-8">
        <div className="flex justify-between gap-4 flex-wrap items-ce ter">
          <p className="text-sm text-slate-500">id: {openedPost.id}</p>
          <FaTrash
            className="text-red-700 cursor-pointer"
            onClick={handleDeleteItem}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
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
                <Input placeholder="Author" {...field} />
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
                {/* <Textarea
                  {...field}
                  defaultValue={openedPost.body}
                  className="h-[250px]"
                /> */}
                <MarkdownEditor value={field.value} onChange={field.onChange} />
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
                <Input placeholder="Keywords" {...field} />
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
              <FormLabel>Cover image</FormLabel>
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
