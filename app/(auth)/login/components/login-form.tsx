"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "@/src/service/auth";
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

type Props = {};

export default function LoginForm({}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<LoginEntity>({
    resolver: zodResolver(LoginSchema),
  });
  const { login } = authService;

  const onSubmit = async (data: LoginEntity) => {
    const res = await login(data);

    if (res?.access_token) {
      Cookies.set("auth", res.access_token, {
        expires: res.expires_in / 60 / 60 / 24,
      });
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (Cookies.get("auth")) {
      router.push("/dashboard");
    }
  }, []);

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
                    <span className="absolute right-2 top-2">
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
          className="w-full mt-4"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
