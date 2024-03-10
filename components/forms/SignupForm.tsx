"use client";
import { maxInputLength } from "@/lib/contants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signupUser } from "@/lib/client/auth/signupUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const signupFormSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  first_name: z
    .string()
    .min(1, "First name cannot be empty.")
    .max(maxInputLength),
  last_name: z
    .string()
    .min(1, "Last name cannot be empty.")
    .max(maxInputLength),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirm_password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export type SignupFormInputs = z.infer<typeof signupFormSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit() {
    const formValues = form.getValues();
    setIsLoading(true);

    try {
      if (formValues.confirm_password !== formValues.password)
        throw new Error("Passwords must match.");

      const userDocument = await signupUser(formValues);

      //Set global state

      router.push("/app");
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);

      toast.error(err.message || err);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-[500px] w-[350px] space-y-4"
      >
        <div className="flex gap-6 w-full">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          Signup to Atom
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/signin"}>
            <span className="underline">Sign in.</span>
          </Link>
        </p>
      </form>
    </Form>
  );
};
