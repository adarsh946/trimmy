import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { AuthState } from "@/context";
import { useFetch } from "@/hooks/useFetch";
import { logout } from "@/database/apiAuth";
import { BarLoader } from "react-spinners";

function Header() {
  const navigate = useNavigate();

  const { user, fetchUser } = AuthState();
  const { loading, fn: fnLogout } = useFetch(logout);

  const handleUser = () => {
    navigate("/auth");
  };
  return (
    <>
      <nav className=" py-4 flex items-center justify-between">
        <Link to="/">
          <img src="logo.png" alt="logo" className="h-20" />
        </Link>
        {user ? (
          <Button onClick={handleUser}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                Links
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4 " />
                <span
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} />}
    </>
  );
}

export default Header;
