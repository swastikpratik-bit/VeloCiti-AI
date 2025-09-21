"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Heart, Share2, Zap } from "lucide-react";
import { toast } from "sonner";

interface ImageGalleryProps {
  images: string[];
  name: string;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
  onViewImage: () => void;
  aiGenerated: boolean;
}

export function ImageGallery({
  images,
  name,
  currentImageIndex,
  setCurrentImageIndex,
  isLiked,
  onLike,
  onShare,
  onViewImage,
  aiGenerated,
}: ImageGalleryProps) {
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] rounded-2xl overflow-hidden glass">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Image Navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevImage}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextImage}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onShare}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onLike}
              className={`glass border-white/20 hover:bg-white/20 ${
                isLiked ? "text-red-500" : "text-white"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onViewImage}
              className="glass border-white/20 text-white hover:bg-white/20"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* AI Badge */}
          {aiGenerated && (
            <Badge className="absolute top-4 left-4 bg-cyan/90 text-black">
              <Zap className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-cyan w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-cyan"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}