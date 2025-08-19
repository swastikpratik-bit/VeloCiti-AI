import { auth } from "@/src/auth";
import { Button } from "../ui/button";
import { login, logout } from "@/src/lib/actions/auth-actions";
import { Bookmarks } from "./bookmarks";

export async function AuthButtons() {
  //   const session = await auth();

  return (
    <div className="flex items-center space-x-4">
      {!0 ? (
        <form action={login}>
          <Button
            type="submit"
            size="sm"
            className="hidden sm:flex bg-cyan hover:bg-cyan/80 text-black"
          >
            Sign In
          </Button>
        </form>
      ) : (
        <>
          {/* <Bookmarks /> */}
          <form action={logout}>
            <Button
              type="submit"
              size="sm"
              className="hidden sm:flex bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
