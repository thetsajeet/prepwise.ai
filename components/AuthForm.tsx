"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import PrepFormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) =>
  z.object({
    username: type === "sign-up" ? z.string().min(3) : z.string().optional(), // TODO: Update username validation
    password: z.string().min(3), // TODO: secure it
    email: z.string().email(),
  });

function AuthForm({ type }: { type: FormType }) {
  const isSignUp = type === "sign-up";
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isSignUp) {
        console.log("Sign Up: ", values);
        toast.success("Account created successfully");
        router.push("/");
      } else {
        console.log("Sign In: ", values);
        toast.success("Account signed in");
        router.push("/");
      }
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="prepwise logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practise job interviews with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {isSignUp && (
              <PrepFormField
                type="text"
                label="Username"
                name="username"
                control={form.control}
                placeholder="Enter your username"
              />
            )}
            <PrepFormField
              type="email"
              label="Email"
              name="email"
              control={form.control}
              placeholder="Enter your email"
            />{" "}
            <PrepFormField
              type="password"
              label="Password"
              name="password"
              control={form.control}
              placeholder="Enter your password"
            />
            <Button className="btn" type="submit">
              {isSignUp ? "Create an Account" : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignUp ? "Have an account already?" : "No account yet?"}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
