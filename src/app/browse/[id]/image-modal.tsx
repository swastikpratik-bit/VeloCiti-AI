"use client";

import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  images: string[];
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  carName: string;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  carName,
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="relative aspect-video">
          <img
            src={images[currentImageIndex]}
            alt={carName}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevImage}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextImage}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}