import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";
import { Computer, Moon, Sun, SunMoon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="size-7 flex items-center justify-center">
          <SunMoon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
          className="flex"
          active={theme === "light"}
        >
          <Sun /> <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
          className="flex"
          active={theme === "dark"}
        >
          <Moon /> <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
          className="flex"
          active={theme === "system"}
        >
          <Computer /> <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
