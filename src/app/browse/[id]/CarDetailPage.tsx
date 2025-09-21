"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BackButton } from "./back-button";
import { ImageGallery } from "./image-gallery";
import { CarHeader } from "./car-header";
import { CarDetailsTabs } from "./car-details-tabs";
import { SellerCard } from "./seller-card";
import { ImageModal } from "./image-modal";

export default function CarDetailPage({ car }: { car: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <main className="min-h-screen">
      <BackButton />

      <ImageGallery
        images={car.images}
        name={car.name}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
        onViewImage={() => setIsImageModalOpen(true)}
        aiGenerated={car.aiGenerated}
      />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CarHeader
                name={car.name}
                location={car.location}
                viewCount={car.viewCount}
                rating={car.rating}
                reviews={car.reviews}
                price={car.price}
                year={car.year}
                mileage={car.mileage}
                transmission={car.transmission}
                fuelType={car.fuelType}
                features={car.features}
              />

              <CarDetailsTabs
                description={car.description}
                specifications={car.specifications}
                colors={car.colors}
              />
            </div>

            <div className="space-y-6">
              <SellerCard
                seller={car.seller}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                isTestDriveOpen={isTestDriveOpen}
                setIsTestDriveOpen={setIsTestDriveOpen}
                isContactOpen={isContactOpen}
                setIsContactOpen={setIsContactOpen}
              />
            </div>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={setIsImageModalOpen}
        images={car.images}
        currentImageIndex={currentImageIndex}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        carName={car.name}
      />
    </main>
  );
}
