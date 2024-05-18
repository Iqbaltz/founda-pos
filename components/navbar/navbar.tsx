"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSidebarContext } from "@/src/context/layout-context";
import { LogInIcon, LogOutIcon, MenuIcon, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Utils } from "@/src/helpers/utils";
import { authService } from "@/src/service/auth";
import { User } from "@/src/entity/auth-entity";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
};

export default function Navbar({ children }: Props) {
  const [profile, setProfile] = useState<User>();
  const { setCollapsed } = useSidebarContext();
  const { setTheme, theme } = useTheme();
  const { getProfile, logout } = authService;
  const { isLoggedIn } = Utils;

  const handleLogout = () => {
    logout().then(() => {
      setProfile(undefined);
      Cookies.remove("auth");
    });
  };

  useEffect(() => {
    if (isLoggedIn()) {
      getProfile().then((user) => {
        setProfile(user);
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <nav className="w-full bg-secondary p-2 flex justify-between items-center">
        <Button variant={"ghost"} onClick={setCollapsed}>
          <MenuIcon />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <div className="mr-2">
            {profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={profile.photo} />
                    <AvatarFallback className="bg-primary-foreground">
                      {profile.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                    <span className="ml-2">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"} className="flex gap-1">
                <LogInIcon />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
