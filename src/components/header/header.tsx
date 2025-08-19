import React from "react";
import Link from "next/link";
import { auth, signOut } from "@/src/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import Image from "next/image";
import { Separator } from "@/src/components/ui/separator";
import { LogOutIcon, Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Bookmarks } from "./bookmarks";
import { Logo } from "./logo";
import { NavItems } from "./navitems";
import { ThemeToggle } from "./themetoggle";
import { Session } from "next-auth";

export const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavItems />
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Auth section */}
            <HeaderAuth user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const logout = async () => {
  "use server";
  await signOut();
};

type HeaderAuthProps = {
  user: Session["user"] | null;
};

export const HeaderAuth = ({ user }: HeaderAuthProps) => {
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 focus:outline-none"
            >
              <Image
                src={user.image || "/default-avatar.png"}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-muted shadow-sm"
                width={36}
                height={36}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-56 rounded-2xl p-3 shadow-lg border bg-background"
          >
            <div className="flex flex-col">
              {/* User info */}
              <div className="flex items-center gap-3 px-2 py-1.5">
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              {/* Bookmarks */}
              <Bookmarks />

              <Separator className="my-2" />

              {/* Logout */}
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-2 w-full px-2 py-2 text-sm rounded-xl hover:bg-muted transition"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Logout
                </button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/api/auth/signin">
          <Button className="rounded-xl px-4 py-2 shadow-sm">Login</Button>
        </Link>
      )}
    </div>
  );
};
