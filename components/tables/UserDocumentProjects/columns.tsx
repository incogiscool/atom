"use client";
import { UserDocumentProjects } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { deleteProject } from "@/lib/client/projects/deleteProject";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";
import Link from "next/link";
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

async function handleDeleteProject(
  project_id: string,
  router: AppRouterInstance
) {
  try {
    await deleteProject(project_id);

    router.refresh();
  } catch (err: any) {
    console.log(err);

    toast.error(err.message || err);
  }
}

export const columns: ColumnDef<UserDocumentProjects>[] = [
  {
    accessorKey: "title",
    header: "Name",
    cell: (cell) => {
      return (
        <Link href={`/app/projects/${cell.row.original.id}`}>
          <span className="underline">{cell.row.original.title}</span>
        </Link>
      );
    },
  },
  {
    accessorFn: (originalRow: UserDocumentProjects) => {
      return new Date(originalRow.createdAt).toDateString();
    },
    header: "Created",
  },
  {
    accessorFn: (originalRow: UserDocumentProjects) => {
      return new Date(originalRow.updatedAt).toDateString();
    },
    header: "Updated",
  },
  {
    accessorKey: "creator.email",
    header: "Creator",
  },
  {
    id: "actions",
    cell: (cell) => {
      const data = cell.row.original;

      //@ts-expect-error
      const router = cell.router;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-8 w-8 p-0 bg:none hover:bg-slate-200 rounded-lg items-center justify-center text-center flex transition">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <AlertDialogTrigger className="text-red-600 cursor-pointer">
                  Delete project
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                project and remove it&#39;s data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteProject(data.id, router)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
