import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreateProjectForm from "@/components/projects/create-project-form";

export default function CreateProjectPage() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h5>Project Details</h5>
      </CardHeader>
      <CardContent>
        <CreateProjectForm />
      </CardContent>
    </Card>
  );
}
