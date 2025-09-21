"use client";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Mail, MessageCircle, Phone, Shield, Star } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface SellerCardProps {
  seller: {
    name: string;
    image: string;
    verified: boolean;
    rating: number;
    totalSales: number;
  };
  selectedDate?: Date;
  setSelectedDate: (date: Date | undefined) => void;
  isTestDriveOpen: boolean;
  setIsTestDriveOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
}

export function SellerCard({
  seller,
  selectedDate,
  setSelectedDate,
  isTestDriveOpen,
  setIsTestDriveOpen,
  isContactOpen,
  setIsContactOpen,
}: SellerCardProps) {
  const handleTestDrive = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    setIsTestDriveOpen(false);
    toast.success(`Test drive scheduled for ${format(selectedDate, "PPP")}`);
  };

  const handleContact = () => {
    setIsContactOpen(false);
    toast.success("Message sent to seller!");
  };

  return (
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
              src={seller.image ? seller.image : "/default-avatar.png"}
              alt={seller.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan/50"
            />
            <div>
              <h3 className="font-semibold">{seller.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Verified Dealer</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>
                  {seller.rating} • {seller.totalSales} sales
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
                    Send a message to {seller.name}
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
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
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
  );
}