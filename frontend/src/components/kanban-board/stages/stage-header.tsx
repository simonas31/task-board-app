import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Circle, Plus } from "lucide-react";
import { Badge } from "../../ui/badge";

type StageHeaderProps = {
  name: string;
  tasksInStage?: number;
  indicatorColor?: "gray" | "blue" | "yellow" | "green";
};

const stageHeaderVariants = cva("", {
  variants: {
    variant: {
      gray: "text-gray-500",
      blue: "text-blue-500",
      yellow: "text-yellow-500",
      green: "text-green-600",
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});

export default function StageHeader({
  name,
  tasksInStage,
  indicatorColor = "gray",
}: StageHeaderProps) {
  return (
    <div className="flex justify-between items-center rounded-xl bg-gray-200 py-2 px-3">
      <div className="flex items-center gap-2">
        <Circle
          size={15}
          className={cn(
            stageHeaderVariants({ variant: indicatorColor }),
            "stroke-[3px]"
          )}
        />
        <span className="text-black">{name}</span>
        {tasksInStage && (
          <Badge className="rounded-sm px-1 text-white text-xs">
            {tasksInStage}
          </Badge>
        )}
      </div>
      <Plus size={20} className="text-gray-500" />
    </div>
  );
}
