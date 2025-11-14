import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "size-6",
      sm: "size-5",
      lg: "size-7",
      icon: "size-6",
      "icon-sm": "size-5",
      "icon-lg": "size-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function Loader({
  className,
  size,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof loaderVariants>) {
  return (
    <Loader2Icon
      className={cn(loaderVariants({ size, className }))}
      {...props}
    />
  );
}
