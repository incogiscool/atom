import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaTrash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
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
import toast from "react-hot-toast";
import { deletePost } from "@/lib/client/posts/deletePost";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  author: z.string().min(1, "Author cannot be empty."),
  body: z.string().min(1, "Title cannot be empty."),
  keywords: z.string().optional(),
  image: z.string().optional(),
  teaser: z.string().url().min(1, "Teaser cannot be empty"),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;

export const ProjectFormComponent = ({
  openedPost,
  project_id,
}: {
  openedPost: Post;
  project_id: string;
}) => {
  const router = useRouter();

  function onSubmit() {}
  async function handleDeleteItem() {
    try {
      await deletePost(project_id, openedPost.id);

      router.refresh();
    } catch (err: any) {
      console.log(err);

      toast.error(err.message || err);
    }
  }

  const keywords =
    (openedPost.keywords && openedPost.keywords.join(",")) || undefined;

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: openedPost.title || "",
      author: openedPost.author || "",
      keywords,
      image: openedPost.image || "",
      body: openedPost.body || "",
      teaser: openedPost.teaser || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-8">
        <div className="flex justify-between gap-4 flex-wrap items-ce ter">
          <p className="text-sm text-slate-500">id: {openedPost.id}</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <FaTrash className="text-red-700 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteItem}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teaser"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Teaser</FormLabel>
              <FormControl>
                <Input placeholder="Teaser" {...field} />
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
              <FormLabel>Cover image link</FormLabel>
              <FormControl>
                <Input placeholder="Image link" {...field} />
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
