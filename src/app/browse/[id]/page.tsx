"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Gauge,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Shield,
  Star,
  PenTool as Tool,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Calendar as CalendarComponent } from "@/src/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { format } from "date-fns";
import { FaDoorOpen, FaWrench } from "react-icons/fa";
import { PiEngineFill, PiSeatFill } from "react-icons/pi";
import { toast } from "sonner";

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
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Mock function to handle sharing
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  // Mock function to handle like
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  // Mock function to schedule test drive
  const handleTestDrive = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    setIsTestDriveOpen(false);
    toast.success(`Test drive scheduled for ${format(selectedDate, "PPP")}`);
  };

  // Mock function to contact seller
  const handleContact = () => {
    setIsContactOpen(false);
    toast.success("Message sent to seller!");
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
      {/* Back Button */}
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

      {/* Image Gallery */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[60vh] rounded-2xl overflow-hidden glass">
            <motion.img
              key={currentImageIndex}
              src={mockCar.images[currentImageIndex]}
              alt={mockCar.name}
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
                onClick={handleShare}
                className="glass border-white/20 text-white hover:bg-white/20"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleLike}
                className={`glass border-white/20 hover:bg-white/20 ${
                  isLiked ? "text-red-500" : "text-white"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsImageModalOpen(true)}
                className="glass border-white/20 text-white hover:bg-white/20"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* AI Badge */}
            {mockCar.aiGenerated && (
              <Badge className="absolute top-4 left-4 bg-cyan/90 text-black">
                <Zap className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
            )}

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {mockCar.images.map((_, index) => (
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
            {mockCar.images.map((image, index) => (
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
                  alt={`${mockCar.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-outfit font-bold mb-2">
                      {mockCar.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mockCar.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{mockCar.viewCount} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>
                          {mockCar.rating} ({mockCar.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl sm:text-4xl font-bold text-cyan mb-1">
                      ${mockCar.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Market price
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                    <Calendar className="h-4 w-4 text-cyan" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-semibold">{mockCar.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                    <Gauge className="h-4 w-4 text-cyan" />
                    <div>
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{mockCar.mileage} miles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                    <Clock className="h-4 w-4 text-cyan" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Transmission
                      </p>
                      <p className="font-semibold">{mockCar.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                    <Tool className="h-4 w-4 text-cyan" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel</p>
                      <p className="font-semibold">{mockCar.fuelType}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ScrollArea>
                    <div className="flex gap-2 pb-4">
                      {mockCar.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="border-cyan/30 text-cyan flex-shrink-0"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </motion.div>

              {/* Detailed Information Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="glass border border-cyan/20 w-full">
                    <TabsTrigger
                      value="details"
                      className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="specs"
                      className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
                    >
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="flex-1 data-[state=active]:bg-cyan data-[state=active]:text-black"
                    >
                      History
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-6">
                    <Card className="glass border-cyan/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {mockCar.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-cyan">
                              Performance
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between">
                                <span>0-60 mph:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.acceleration}s
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Top Speed:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.topSpeed} mph
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Horsepower:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.horsepower} hp
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Range:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.range} miles
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-cyan">
                              Dimensions
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between">
                                <span>Length:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.length} mm
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Width:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.width} mm
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Height:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.height} mm
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Weight:</span>
                                <span className="font-medium">
                                  {mockCar.specifications.weight} kg
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="specs" className="mt-6">
                    <Card className="glass border-cyan/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6">
                          Technical Specifications
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold mb-4 text-cyan flex items-center gap-2">
                              <PiEngineFill className="h-5 w-5" />
                              Engine & Performance
                            </h4>
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-center gap-2">
                                <FaWrench className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Torque: {mockCar.specifications.torque} Nm
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Horsepower:{" "}
                                  {mockCar.specifications.horsepower} hp
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-4 text-cyan flex items-center gap-2">
                              <PiSeatFill className="h-5 w-5" />
                              Interior & Comfort
                            </h4>
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-center gap-2">
                                <PiSeatFill className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Seats: {mockCar.specifications.seats}
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <FaDoorOpen className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Doors: {mockCar.specifications.doors}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-8">
                          <h4 className="font-semibold mb-4 text-cyan">
                            Available Colors
                          </h4>
                          <div className="flex gap-3">
                            {mockCar.colors.map((color) => (
                              <div key={color} className="text-center">
                                <div
                                  className="w-12 h-12 rounded-full border-2 border-white/20 mb-2"
                                  style={{
                                    backgroundColor: color
                                      .toLowerCase()
                                      .replace(" ", ""),
                                  }}
                                />
                                <p className="text-xs text-muted-foreground">
                                  {color}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    <Card className="glass border-cyan/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          Vehicle History
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                            <Shield className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium text-green-500">
                                Clean History
                              </p>
                              <p className="text-sm text-muted-foreground">
                                No accidents or damage reported
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 rounded-lg bg-cyan/10 border border-cyan/20">
                            <Zap className="h-5 w-5 text-cyan" />
                            <div>
                              <p className="font-medium text-cyan">
                                AI Verified
                              </p>
                              <p className="text-sm text-muted-foreground">
                                All details verified by AI systems
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Seller Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass border-cyan/20 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-cyan">
                      Seller Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={mockCar.seller.image}
                        alt={mockCar.seller.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan/50"
                      />
                      <div>
                        <h3 className="font-semibold">{mockCar.seller.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span>Verified Dealer</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>
                            {mockCar.seller.rating} •{" "}
                            {mockCar.seller.totalSales} sales
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Dialog
                        open={isContactOpen}
                        onOpenChange={setIsContactOpen}
                      >
                        <DialogTrigger asChild>
                          <Button className="w-full bg-cyan hover:bg-cyan/80 text-black font-semibold">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Seller
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contact Seller</DialogTitle>
                            <DialogDescription>
                              Send a message to {mockCar.seller.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </Button>
                            </div>
                            <Button
                              onClick={handleContact}
                              className="w-full bg-cyan hover:bg-cyan/80 text-black"
                            >
                              Send Message
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isTestDriveOpen}
                        onOpenChange={setIsTestDriveOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-cyan/50 text-cyan hover:bg-cyan/10"
                          >
                            Schedule Test Drive
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule Test Drive</DialogTitle>
                            <DialogDescription>
                              Select a date for your test drive
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {selectedDate
                                    ? format(selectedDate, "PPP")
                                    : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <Button
                              onClick={handleTestDrive}
                              disabled={!selectedDate}
                              className="w-full bg-cyan hover:bg-cyan/80 text-black"
                            >
                              Schedule Test Drive
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-video">
            <img
              src={mockCar.images[currentImageIndex]}
              alt={mockCar.name}
              className="w-full h-full object-cover rounded-lg"
            />
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
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
