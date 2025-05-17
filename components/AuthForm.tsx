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

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

function AuthForm({ type }: { type: FormType }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            {type !== "sign-in" && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            <Button className="btn" type="submit">
              {type !== "sign-in" ? "Create an Account" : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {type !== "sign-in" ? "Have an account already?" : "No account yet?"}
          <Link
            href={type !== "sign-in" ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {type !== "sign-in" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
