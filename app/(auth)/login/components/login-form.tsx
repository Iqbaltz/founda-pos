"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginEntity, LoginSchema } from "@/src/entity/auth-entity";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";

type Props = {};

export default function LoginForm({}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<LoginEntity>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@testing.com",
      password: "password",
    },
  });

  const onSubmit = (data: LoginEntity) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    }).then(({ ok }: any) => {
      if (ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <span className="top-2 right-2 absolute">
                      {showPassword ? (
                        <EyeOffIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
