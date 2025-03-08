"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header
    className="mx-7 flex"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "max-md:text-md my-0.5 flex flex-1 items-center justify-between rounded-lg p-4 py-4 text-start text-xl font-medium transition-all hover:bg-zinc-950 hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-primary h-7 w-7 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="text-md data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down mx-7 overflow-hidden px-4 text-gray-300"
    {...props}
  >
    <div className={cn("pt-1 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
