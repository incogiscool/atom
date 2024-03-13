import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { MarkdownEditor } from "../ui/markdown-editor";
import { createPost } from "@/lib/client/posts/createPost";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  body: z.string().min(1),
  keywords: z.string().optional(),
  image: z.string().optional(),
});

export const CreatePostModal = ({ project_id }: { project_id: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      // keywords: null,
      body: "",
      // image: "",
    },
  });

  async function handleCreateNewPost() {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const formData = form.getValues();

      await createPost(project_id, formData);

      router.refresh();
      setIsLoading(false);
      setModalOpen(false);
      form.reset();
    } catch (err: any) {
      console.log(err);

      toast.error(err.message || err);
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full">Create new post</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[650px] overflow-y-auto max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateNewPost)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Post author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
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
                  <FormItem>
                    <FormLabel>Keywords - seperate with commas (,)</FormLabel>
                    <FormControl>
                      <Input placeholder="Post keywords" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover image link</FormLabel>
                    <FormControl>
                      <Input type="string" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full">
                Create post
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
