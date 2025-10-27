import { z } from "zod";
import { maxInputLength, projectTitleMaxLength } from "@/lib/contants";

/**
 * Posts Schemas
 */

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      projectTitleMaxLength,
      `Title cannot exceed ${projectTitleMaxLength} characters`
    ),
  author: z
    .string()
    .min(1, "Author is required")
    .max(maxInputLength, "Author is too long"),
  body: z.string().min(1, "Body is required"),
  image: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
  teaser: z.string().min(1, "Teaser is required"),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

export const DeletePostSchema = z.object({
  project_id: z.string().min(1, "Project ID is required"),
  post_id: z.string().min(1, "Post ID is required"),
});

export type DeletePostInput = z.infer<typeof DeletePostSchema>;

export const GetPostSchema = z.object({
  post_id: z.string().min(1, "Post ID is required"),
  project_key: z.string().min(1, "Project key is required"),
});

export type GetPostInput = z.infer<typeof GetPostSchema>;

export const UpdatePostSchema = z
  .object({
    title: z
      .string()
      .max(
        projectTitleMaxLength,
        `Title cannot exceed ${projectTitleMaxLength} characters`
      )
      .optional(),
    author: z.string().max(maxInputLength, "Author is too long").optional(),
    body: z.string().optional(),
    teaser: z
      .string()
      .max(100, "Teaser cannot exceed 100 characters")
      .optional(),
    keywords: z
      .string()
      .max(maxInputLength, "Keywords are too long")
      .optional(),
    image: z.string().optional(),
    project_id: z.string().min(1, "Project ID is required"),
    post_id: z.string().min(1, "Post ID is required"),
  })
  .refine(
    (data: any) => Object.keys(data).length > 2, // At least one field other than project_id and post_id
    "At least one field must be provided for update"
  );

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

/**
 * Projects Schemas
 */

export const CreateProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      projectTitleMaxLength,
      `Title cannot exceed ${projectTitleMaxLength} characters`
    ),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const DeleteProjectSchema = z.object({
  project_id: z.string().min(1, "Project ID is required"),
});

export type DeleteProjectInput = z.infer<typeof DeleteProjectSchema>;

export const GetProjectSchema = z
  .object({
    project_id: z.string().optional(),
    project_key: z.string().optional(),
  })
  .refine(
    (data: any) => data.project_id || data.project_key,
    "Either project_id or project_key must be provided"
  );

export type GetProjectInput = z.infer<typeof GetProjectSchema>;
