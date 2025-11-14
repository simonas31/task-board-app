import { FolderGit2, UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";

type ProjectHeaderProps = {
  isLoading: boolean;
};

export default function ProjectHeader({ isLoading }: ProjectHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center gap-5">
        <FolderGit2 size={45} />
        <h3>Project name</h3>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div>Project users</div>
        <Button variant="outline" size="sm" isLoading={isLoading}>
          <UserRoundPlus />
          <span>Invite</span>
        </Button>
      </div>
    </div>
  );
}
