"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BackButton } from "./back-button";
import { ImageGallery } from "./image-gallery";
import { CarHeader } from "./car-header";
import { CarDetailsTabs } from "./car-details-tabs";
import { SellerCard } from "./seller-card";
import { ImageModal } from "./image-modal";
import { getCarById } from "@/src/lib/actions/cars-actions";

// Mock car data - in real app this would come from API
const mockCar = {
  id: "1",
  name: "Tesla Model S Plaid",
  brand: "Tesla",
  price: 129990,
  year: 2024,
  mileage: 0,
  transmission: "Automatic",
  fuelType: "Electric",
  location: "San Francisco, CA",
  aiGenerated: true,
  description:
    "Experience the pinnacle of electric performance with the Tesla Model S Plaid. This revolutionary sedan combines cutting-edge technology, unmatched acceleration, and luxurious comfort in one extraordinary package. With its tri-motor setup and advanced autopilot features, the Model S Plaid represents the future of automotive excellence.",
  images: [
    "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  features: [
    "Autopilot",
    "Premium Interior",
    "Glass Roof",
    "Supercharging",
    "Over-the-air Updates",
    "HEPA Air Filter",
    "Premium Audio",
    "Mobile Connector",
  ],
  colors: ["Pearl White", "Solid Black", "Midnight Silver", "Deep Blue"],
  specifications: {
    engineCapacity: 0,
    horsepower: 1020,
    torque: 1420,
    acceleration: 1.99,
    topSpeed: 200,
    doors: 4,
    seats: 5,
    length: 4970,
    width: 1964,
    height: 1445,
    weight: 2162,
    range: 396,
  },
  seller: {
    id: "1",
    name: "Tesla Motors",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    phone: "+1 (650) 681-5000",
    email: "sales@tesla.com",
    verified: true,
    rating: 4.9,
    totalSales: 1250,
  },
  savedBy: [],
  viewCount: 1847,
  rating: 4.8,
  reviews: 156,
};




export default function CarDetailPage({ params }: { params: { id: string } }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [data , setData] = useState(null);


  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockCar.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + mockCar.images.length) % mockCar.images.length
    );
  };

  return (
    <main className="min-h-screen">
      <BackButton />

      <button className="p-2 bg-blue-500 text-white rounded mb-4" onClick={() => {
        getCarById(params.id).then((carData) => {
          console.log("Fetched car data:", carData);
        }).catch((error) => {
          console.error("Error fetching car data:", error);
        }); 
      }}   >
        Fetch Data
      </button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  
      <ImageGallery
        images={mockCar.images}
        name={mockCar.name}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
        onViewImage={() => setIsImageModalOpen(true)}
        aiGenerated={mockCar.aiGenerated}
      />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CarHeader
                name={mockCar.name}
                location={mockCar.location}
                viewCount={mockCar.viewCount}
                rating={mockCar.rating}
                reviews={mockCar.reviews}
                price={mockCar.price}
                year={mockCar.year}
                mileage={mockCar.mileage}
                transmission={mockCar.transmission}
                fuelType={mockCar.fuelType}
                features={mockCar.features}
              />
              
              <CarDetailsTabs
                description={mockCar.description}
                specifications={mockCar.specifications}
                colors={mockCar.colors}
              />
            </div>

            <div className="space-y-6">
              <SellerCard
                seller={mockCar.seller}
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
        images={mockCar.images}
        currentImageIndex={currentImageIndex}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        carName={mockCar.name}
      />
    </main>
  );
}
