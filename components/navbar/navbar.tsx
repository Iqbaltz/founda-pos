import React from "react";
import { Button } from "../ui/button";
import { useSidebarContext } from "@/src/context/layout-context";
import { LogInIcon, MenuIcon, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export default function Navbar({ children }: Props) {
  const { setCollapsed } = useSidebarContext();
  const { setTheme, theme } = useTheme();

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
          <Link href={"/login"} className="flex gap-1 mr-2">
            <LogInIcon />
            Login
          </Link>
        </div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
