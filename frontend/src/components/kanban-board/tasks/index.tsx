import { MessageCircle, Paperclip } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import type { Task } from "@/types/KanbanProvider.types";

type TaskProps = {
  task: Task;
};

export default function Task({ task }: TaskProps) {
  return (
    <Card className="py-4 gap-2 transition-all hover:scale-105">
      <CardHeader>
        <Badge>Dashoard</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold truncate">{task.title}</p>
        <p className="text-sm text-muted-foreground truncate">
          {task.description}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-center">
        <div>
          <span>users</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Paperclip size={13} /> <span>2</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={13} /> <span>1</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
