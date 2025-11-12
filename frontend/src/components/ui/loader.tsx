import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "size-6",
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
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
