"use client";
import React, { useState } from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function Filters({slug,sort}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4" >
      <PriceFilter slug={slug} sort={sort}/>
      <BrandFilter/> 
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className=" ">
        <div className="flex items-center justify-between space-x-4 px-4 ">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center justify-between">
              <h2>Price</h2>
              <Plus className=" h-4 w-4"/>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
