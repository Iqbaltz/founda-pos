import React from "react";
import { Accordion } from "../ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Link from "next/link";

type Props = {
  name: string;
  sub: { name: string; link: string }[];
};

export default function CollapsableItem({ name, sub }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={name}>
        <AccordionTrigger className="text-left w-full px-4 py-2 cursor-pointer text-foreground hover:bg-accent">
          {name}
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
