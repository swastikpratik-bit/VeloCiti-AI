"use client";

import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="pt-24 pb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-cyan/50 text-cyan hover:bg-cyan/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>
      </div>
    </div>
  );
}