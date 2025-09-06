"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { CarFuelType, CarType, carTypes } from "@/src/constants/cars";
import { autoGenerateCar } from "@/src/lib/actions/ai-action";
import { addNewCar } from "@/src/lib/actions/cars-actions";
import { addCarSchema, AddCarSchema } from "@/src/lib/zod";
import { useImages } from "@/src/store/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { WandSparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const STORAGE_KEY = "new-car-details";

export const AddCarForm = () => {
  const { images, removeImage, addImage, clearImages } = useImages();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AddCarSchema>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      name: "",
      brand: "",
      type: undefined,
      year: new Date().getFullYear(),
      mileage: 0,
      colors: [],
      price: 0,
      description: "",
      images: [],
      transmission: "AUTOMATIC",
      features: [],
      location: "",
      fuelType: undefined,
      engineCapacity: undefined,
      doors: undefined,
      seats: undefined,
      topSpeed: undefined,
      acceleration: undefined,
      horsepower: undefined,
      torque: undefined,
      length: undefined,
      width: undefined,
      height: undefined,
      weight: undefined,
      // Seller details
      sellerName: "",
      sellerImage: "",
      sellerPhone: "",
      sellerEmail: "",
      sellerAddress: "",
      sellerCity: "",
      sellerState: "",
      sellerZip: "",
      sellerCountry: "",
      sellerWebsite: "",
    },
  });

  const [isGenerateAILoading, setIsGenerateAILoading] = useState(false);
  const [submitHandlerLoading, setSubmitHandlerLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [feature, setFeature] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const addColor = useCallback(() => {
    if (!color || color.trim() === "" || colors.includes(color)) return;

    const newColors = [...colors, color];
    setColors(newColors);
    setValue("colors", newColors);
    setColor("");
  }, [color, colors, setValue]);

  const removeColor = useCallback(
    (colorToRemove: string) => {
      const newColors = colors.filter((c) => c !== colorToRemove);
      setColors(newColors);
      setValue("colors", newColors);
    },
    [colors, setValue]
  );

  const addFeatures = useCallback(() => {
    if (!feature || feature.trim() === "" || features.includes(feature)) return;

    const newFeatures = [...features, feature];
    setFeatures(newFeatures);
    setValue("features", newFeatures);
    setFeature("");
  }, [feature, features, setValue]);

  const removeFeature = useCallback(
    (featureToRemove: string) => {
      const newFeatures = features.filter((f) => f !== featureToRemove);
      setFeatures(newFeatures);
      setValue("features", newFeatures);
    },
    [features, setValue]
  );

  const resetState = useCallback(() => {
    clearImages();
    setColors([]);
    setFeatures([]);
    reset();
    localStorage.removeItem(STORAGE_KEY);
  }, [clearImages, reset]);

  const onSubmit = useCallback(
    async (data: AddCarSchema) => {

      const toastId = toast.loading("Adding new car listing...");

      try {
        setSubmitHandlerLoading(true);
        await addNewCar(data);
        toast.success("Car listing added successfully", {
          id: toastId,
        });

        resetState();
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message, {
            id: toastId,
          });
        else
          toast.error("Error adding car listing", {
            id: toastId,
          });
      } finally {
        setSubmitHandlerLoading(false);
      }
    },
    [resetState, setSubmitHandlerLoading, errors]
  );

  const autoGenerateHandler = useCallback(async () => {
    try {
      if (!watch("name"))
        return toast.error("Please enter a car name to generate images");
      setIsGenerateAILoading(true);

      // Generate Info
      const result = await autoGenerateCar(watch("name"));

      if (!result) {
        toast.error("Failed to generate car details");
        return;
      }

      setColors(result.colors);
      setFeatures(result.features);

      // set generated data to form state
      Object.entries(result).forEach(([key, value]) => {
        if (key === "images") return;

        if (key === "sellerImage") {
          setValue("sellerImage", "jobke");
          return;
        }
        setValue(key as keyof AddCarSchema, value as string);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

      toast.success("Car details generated successfully");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to generate car details");
    } finally {
      setIsGenerateAILoading(false);
    }
  }, [watch, setValue]);

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  useEffect(() => {
    const savedCarDetails = localStorage.getItem(STORAGE_KEY);

    if (!savedCarDetails) return;
    const parsedDetails = JSON.parse(savedCarDetails) as AddCarSchema;

    setColors(parsedDetails.colors);
    setFeatures(parsedDetails.features);

    Object.entries(parsedDetails).forEach(([key, value]) => {
      setValue(key as keyof AddCarSchema, value as string);
    });
  }, [setValue]);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass border-cyan/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-cyan">Add New Car Listing</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={autoGenerateHandler}
              disabled={isGenerateAILoading}
              className="border-cyan/50 text-cyan hover:bg-cyan/10"
            >
              {isGenerateAILoading ? (
                <WandSparkles className="h-4 w-4 animate-spin" />
              ) : (
                <WandSparkles className="h-4 w-4" />
              )}
              AI Auto-Fill
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit, (errors) => {
            toast.error("Please fix the form errors before submitting");
          })}>
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Car Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., BMW M4 Competition"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("name", { required: "Car name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., BMW, Tesla, Porsche"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("brand", { required: "Brand is required" })}
                  />
                  {errors.brand && (
                    <p className="text-sm text-red-500">
                      {errors.brand.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Car Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("type", value as CarType)
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-cyan/20 focus:border-cyan">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      {carTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="e.g., 2023"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("year", {
                      required: "Year is required",
                      valueAsNumber: true,
                      min: { value: 1900, message: "Year must be after 1900" },
                      max: {
                        value: new Date().getFullYear() + 1,
                        message: "Year cannot be in the future",
                      },
                    })}
                  />
                  {errors.year && (
                    <p className="text-sm text-red-500">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="e.g., 1200"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("mileage", {
                      required: "Mileage is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Mileage cannot be negative" },
                    })}
                  />
                  {errors.mileage && (
                    <p className="text-sm text-red-500">
                      {errors.mileage.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 50000"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("transmission", value as "MANUAL" | "AUTOMATIC")
                    }
                    defaultValue="AUTOMATIC"
                  >
                    <SelectTrigger className="bg-background/50 border-cyan/20 focus:border-cyan">
                      <SelectValue placeholder="Select transmission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                      <SelectItem value="MANUAL">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("fuelType", value as CarFuelType)
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-cyan/20 focus:border-cyan">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GASOLINE">Gasoline</SelectItem>
                      <SelectItem value="DIESEL">Diesel</SelectItem>
                      <SelectItem value="ELECTRIC">Electric</SelectItem>
                      <SelectItem value="HYBRID">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Los Angeles, CA"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">Colors</h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a color..."
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-background/50 border-cyan/20 focus:border-cyan"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addColor())
                  }
                />
                <Button
                  type="button"
                  onClick={addColor}
                  className="bg-cyan hover:bg-cyan/80 text-black"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c, idx) => (
                  <Badge
                    key={idx}
                    className="flex items-center gap-1 bg-cyan/20 text-cyan border-cyan/30"
                  >
                    {c}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-400"
                      onClick={() => removeColor(c)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">Features</h3>
              <div className="flex items-center gap-2">
                <Input
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  placeholder="Add a feature..."
                  className="bg-background/50 border-cyan/20 focus:border-cyan"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeatures())
                  }
                />
                <Button
                  onClick={addFeatures}
                  type="button"
                  className="bg-cyan hover:bg-cyan/80 text-black"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((f, idx) => (
                  <Badge
                    key={idx}
                    className="flex items-center gap-1 bg-cyan/20 text-cyan border-cyan/30"
                  >
                    {f}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-400"
                      onClick={() => removeFeature(f)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Car Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">
                Car Specifications (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="engineCapacity">Engine Capacity (cc)</Label>
                  <Input
                    id="engineCapacity"
                    type="number"
                    placeholder="e.g., 2998"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("engineCapacity")}
                  />
                  {errors.engineCapacity && (
                    <p className="text-sm text-red-500">
                      {errors.engineCapacity.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horsepower">Horsepower</Label>
                  <Input
                    id="horsepower"
                    type="number"
                    placeholder="e.g., 503"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("horsepower")}
                  />
                  {errors.horsepower && (
                    <p className="text-sm text-red-500">
                      {errors.horsepower.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="torque">Torque (Nm)</Label>
                  <Input
                    id="torque"
                    type="number"
                    placeholder="e.g., 650"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("torque")}
                  />
                  {errors.torque && (
                    <p className="text-sm text-red-500">
                      {errors.torque.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acceleration">0-60 mph (seconds)</Label>
                  <Input
                    id="acceleration"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3.2"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("acceleration")}
                  />
                  {errors.acceleration && (
                    <p className="text-sm text-red-500">
                      {errors.acceleration.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topSpeed">Top Speed (mph)</Label>
                  <Input
                    id="topSpeed"
                    type="number"
                    placeholder="e.g., 155"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("topSpeed")}
                  />
                  {errors.topSpeed && (
                    <p className="text-sm text-red-500">
                      {errors.topSpeed.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doors">Doors</Label>
                  <Input
                    id="doors"
                    type="number"
                    placeholder="e.g., 4"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("doors")}
                  />
                  {errors.doors && (
                    <p className="text-sm text-red-500">
                      {errors.doors.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    placeholder="e.g., 5"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("seats")}
                  />
                  {errors.seats && (
                    <p className="text-sm text-red-500">
                      {errors.seats.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Length (mm)</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="e.g., 4794"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("length")}
                  />
                  {errors.length && (
                    <p className="text-sm text-red-500">
                      {errors.length.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width (mm)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="e.g., 1887"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("width")}
                  />
                  {errors.width && (
                    <p className="text-sm text-red-500">
                      {errors.width.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (mm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 1393"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("height")}
                  />
                  {errors.height && (
                    <p className="text-sm text-red-500">
                      {errors.height.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 1800"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("weight")}
                  />
                  {errors.weight && (
                    <p className="text-sm text-red-500">
                      {errors.weight.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">Description</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the vehicle..."
                  rows={6}
                  className="bg-background/50 border-cyan/20 focus:border-cyan"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">Images</h3>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="Enter the URL of the image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (imageUrl.trim()) {
                          addImage(imageUrl);
                          setImageUrl("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (imageUrl.trim()) {
                        addImage(imageUrl);
                        setImageUrl("");
                      }
                    }}
                    className="bg-cyan hover:bg-cyan/80 text-black"
                  >
                    Add
                  </Button>
                </div>
                {errors.images && (
                  <p className="text-sm text-red-500">
                    {errors.images.message}
                  </p>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Added {images.length} image(s). At least 1 image is required.
              </p>
              
              {images.length > 0 && (
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((item, idx) => (
                      <CarouselItem key={idx} className="relative">
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={item}
                            alt={`Car image ${idx + 1}`}
                            className="w-full h-96 object-cover"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(item)}
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>

            {/* Seller Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan">
                Seller Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sellerName">Seller Name</Label>
                  <Input
                    id="sellerName"
                    placeholder="e.g., John Doe"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerName")}
                  />
                  {errors.sellerName && (
                    <p className="text-sm text-red-500">
                      {errors.sellerName.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerPhone">Phone</Label>
                  <Input
                    id="sellerPhone"
                    placeholder="e.g., +1 (555) 123-4567"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerPhone")}
                  />
                  {errors.sellerPhone && (
                    <p className="text-sm text-red-500">
                      {errors.sellerPhone.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerEmail">Email</Label>
                  <Input
                    id="sellerEmail"
                    type="email"
                    placeholder="e.g., john@example.com"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerEmail")}
                  />
                  {errors.sellerEmail && (
                    <p className="text-sm text-red-500">
                      {errors.sellerEmail.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerWebsite">Website</Label>
                  <Input
                    id="sellerWebsite"
                    placeholder="e.g., https://example.com"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerWebsite")}
                  />
                  {errors.sellerWebsite && (
                    <p className="text-sm text-red-500">
                      {errors.sellerWebsite.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerImage">Profile Image URL</Label>
                  <Input
                    id="sellerImage"
                    placeholder="e.g., https://example.com/profile.jpg"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerImage")}
                  />
                  {errors.sellerImage && (
                    <p className="text-sm text-red-500">
                      {errors.sellerImage.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerAddress">Address</Label>
                  <Input
                    id="sellerAddress"
                    placeholder="e.g., 123 Main St"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerAddress")}
                  />
                  {errors.sellerAddress && (
                    <p className="text-sm text-red-500">
                      {errors.sellerAddress.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerCity">City</Label>
                  <Input
                    id="sellerCity"
                    placeholder="e.g., Los Angeles"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerCity")}
                  />
                  {errors.sellerCity && (
                    <p className="text-sm text-red-500">
                      {errors.sellerCity.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerState">State</Label>
                  <Input
                    id="sellerState"
                    placeholder="e.g., CA"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerState")}
                  />
                  {errors.sellerState && (
                    <p className="text-sm text-red-500">
                      {errors.sellerState.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerZip">Zip Code</Label>
                  <Input
                    id="sellerZip"
                    placeholder="e.g., 90001"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerZip")}
                  />
                  {errors.sellerZip && (
                    <p className="text-sm text-red-500">
                      {errors.sellerZip.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerCountry">Country</Label>
                  <Input
                    id="sellerCountry"
                    placeholder="e.g., USA"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerCountry")}
                  />
                  {errors.sellerCountry && (
                    <p className="text-sm text-red-500">
                      {errors.sellerCountry.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitHandlerLoading}
                className="w-full bg-cyan hover:bg-cyan/80 text-black font-semibold py-3"
              >
                {submitHandlerLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                    Adding Listing...
                  </>
                ) : (
                  "Add Listing"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};