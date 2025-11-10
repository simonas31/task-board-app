import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Bell, ChevronDown } from "lucide-react";
import { api } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { open } = useSidebar();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <div
      className={cn(
        "flex justify-between p-3 border shadow-lg content-center items-center transition-all",
        open && "ml-3 rounded-bl-2xl"
      )}
    >
      <div className="content-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="size-7">
          <Bell className="size-5" />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>

        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={loading}>
            <div className="flex transition-all p-1 rounded-md hover:cursor-pointer hover:bg-accent dark:hover:bg-accent/50">
              <span className="mx-1">
                {user?.firstname + " " + user?.lastname}
              </span>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={loading}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={loading}
              onClick={() => {
                setLoading(true);
                api
                  .post("/logout")
                  .then(() => {
                    setUser(null);
                    toast.success("You've logged out successfully!");
                    navigate("/login");
                  })
                  .catch(() => {
                    toast.success("Something went wrong. Try again");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
