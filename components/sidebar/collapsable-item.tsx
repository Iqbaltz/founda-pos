import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Props = {
  name: string;
  sub: { name: string; link: string }[];
  icon: React.ReactNode;
};

export default function CollapsableItem({ name, sub, icon }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={name} className="border-none">
        <AccordionTrigger className="flex items-center text-left w-full px-4 py-3 cursor-pointer text-foreground hover:bg-accent hover:no-underline">
          <span className="flex justify-center gap-2">
            {icon && icon}
            {name}
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {sub.map((item, index) => (
            <Link
              href={item.link}
              key={`${name}-${index}`}
              className="w-full px-8 py-2 text-foreground hover:bg-accent"
            >
              {item.name}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
