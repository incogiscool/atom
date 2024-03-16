"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { UserDocument } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/client/auth/updateUser";
import { useRouter } from "next/navigation";

export const SettingsForm = ({
  userDocument,
}: {
  userDocument: UserDocument;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    // email: z.string().email().min(1),
    // password: z.string().min(8)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: userDocument.first_name,
      last_name: userDocument.last_name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;
    try {
      setIsLoading(true);

      await updateUser(values);

      router.refresh();

      setIsLoading(false);
    } catch (err: any) {
      console.log(err);

      toast.error(err.message || err);

      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 border w-fit rounded-lg">
      <h2 className="font-medium mb-4 text-lg">User data</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between gap-4 flex-wrap">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input value={userDocument.email} disabled />
          </div>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
