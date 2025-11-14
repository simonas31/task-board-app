import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "rounded-none bg-inherit text-muted-foreground inline-flex w-fit items-center justify-center",
        className
      )}
      {...props}
    />
  );
}

function TabListContainer({
  children,
  className,
  ...props
}: {
  children: React.JSX.Element | React.JSX.Element[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center relative after:content-[''] after:absolute after:bottom-0 after:w-full after:border-b-2 after:border-border after:z-[-1]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground data-[state=active]:text-black data-[state=active]:dark:text-white inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-2 py-1 text-base font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "py-4 px-3 border-b-2 hover:border-b-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:dark:border-b-white",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabListContainer, TabsList, TabsTrigger, TabsContent };
