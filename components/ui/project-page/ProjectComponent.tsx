"use client";
import { Post, Project } from "@/lib/types";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { Button } from "../button";
import { AppSidebarNav } from "@/components/sidebars/AppSidebarNav";
import { ProjectComponentSidebar } from "@/components/sidebars/ProjectComponentSidebar";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  author: z.string().min(1, "Author cannot be empty."),
  body: z.string().min(1, "Title cannot be empty."),
  //DO KEYWORDS ZOD TYPE AS ARRAY
  keywords: z.any(),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;

export const ProjectComponent = ({ project }: { project: Project }) => {
  const [openedPostId, setOpenedPostId] = useState(project.posts[0].id);
  const openedPost = project.posts.find((post) => post.id === openedPostId);

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: openedPost?.title || "",
      author: openedPost?.author || "",
      body: openedPost?.body || "",
      keywords: openedPost?.keywords || "",
    },
  });

  async function onSubmit() {}

  return (
    <div className="flex">
      <ProjectComponentSidebar
        project={project}
        setSelectedPostId={setOpenedPostId}
        selectedPostId={openedPostId}
      />
      <div className="p-6 w-full flex-1">
        <div className="flex h-full">
          <div className="overflow-auto w-full">
            {
              // MAKE SURE UPDATEPOST FUNCTION ONLY TAKES IN BODY, KEYWRODS, AUTHRO, TITLE
              //ARGUMENTS
            }
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <p className="text-sm text-slate-500">id: {openedPost?.id}</p>
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
                        <textarea
                          {...field}
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
                        <Input placeholder="Keywords" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Save changes</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
