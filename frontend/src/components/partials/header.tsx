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

export default function Header() {
  const { open } = useSidebar();

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
          <DropdownMenuTrigger asChild>
            <div className="flex transition-all p-1 rounded-md hover:cursor-pointer hover:bg-accent dark:hover:bg-accent/50">
              <span className="mx-1">John Doe</span>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
