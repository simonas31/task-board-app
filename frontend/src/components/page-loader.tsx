import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="min-h-screen flex justify-center items-center space-x-2">
      <h4>Loading...</h4>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
