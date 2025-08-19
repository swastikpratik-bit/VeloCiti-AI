"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Progress } from "@/src/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { WandSparkles, X, Upload, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Badge } from "@/src/components/ui/badge";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateImageSchema } from "@/src/lib/zod";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { imagekitAuthenticator } from "@/src/lib/imagekit";
// import { generateImage } from "@/src/lib/actions/cars-actions";

// Types
interface GenerateImageSchema {
  description: string;
  name: string;
}

interface AddCarSchema {
  name: string;
  brand: string;
  type: string;
  year: number;
  mileage: number;
  colors: string[];
  price: number;
  description: string;
  images: string[];
  transmission: "MANUAL" | "AUTOMATIC";
  features: string[];
  location: string;
  fuelType: string;
  engineCapacity?: number;
  doors?: number;
  seats?: number;
  topSpeed?: number;
  acceleration?: number;
  horsepower?: number;
  torque?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  sellerName: string;
  sellerImage: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerAddress: string;
  sellerCity: string;
  sellerState: string;
  sellerZip: string;
  sellerCountry: string;
  sellerWebsite: string;
}

// Mock image store
const useImages = () => {
  const [images, setImages] = useState<string[]>([]);

  const addImage = (image: string) => {
    setImages((prev) => [...prev, image]);
  };

  const removeImage = (image: string) => {
    setImages((prev) => prev.filter((img) => img !== image));
  };

  const clearImages = () => {
    setImages([]);
  };

  return { images, addImage, removeImage, clearImages };
};

// Mock functions
const generateImage = async (description: string, name: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    base64Data:
      "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: name,
  };
};

const addNewCar = async (data: AddCarSchema) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Adding car:", data);
};

const autoGenerateCar = async (carName: string) => {
  // Simulate AI generation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    brand: "Tesla",
    type: "SEDAN",
    year: 2024,
    mileage: 0,
    price: 89990,
    description: `The ${carName} represents the pinnacle of electric vehicle technology, combining luxury, performance, and sustainability in one exceptional package.`,
    transmission: "AUTOMATIC" as const,
    location: "San Francisco, CA",
    fuelType: "ELECTRIC",
    engineCapacity: 0,
    doors: 4,
    seats: 5,
    topSpeed: 200,
    acceleration: 3.1,
    horsepower: 670,
    torque: 850,
    length: 4970,
    width: 1964,
    height: 1445,
    weight: 2162,
    colors: ["Pearl White", "Solid Black", "Midnight Silver"],
    features: [
      "Autopilot",
      "Premium Interior",
      "Glass Roof",
      "Supercharging",
      "Over-the-air Updates",
    ],
    sellerName: "Tesla Motors",
    sellerPhone: "+1 (650) 681-5000",
    sellerEmail: "sales@tesla.com",
    sellerAddress: "1 Tesla Road",
    sellerCity: "Austin",
    sellerState: "TX",
    sellerZip: "78725",
    sellerCountry: "USA",
    sellerWebsite: "https://tesla.com",
  };
};

export const GenerateImage = () => {
  const { addImage } = useImages();
  const [image, setImage] = useState<{ base64Data: string; name: string }>();
  const [uploadLoader, setUploadLoader] = useState(false);
  const [generatingLoader, setGeneratingLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortController = new AbortController();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GenerateImageSchema>({
    defaultValues: {
      description: "",
      name: "",
    },
    resolver: zodResolver(generateImageSchema),
  });

  const onSubmit = async ({ description, name }: GenerateImageSchema) => {
    const toastId = toast.loading("Generating image...");
    try {
      setGeneratingLoader(true);

      if (!description || !name)
        throw new Error("Description and name are required");

      const data = await generateImage(description, name);

      if (!data) throw new Error("Failed to generate image");
      setImage(data);

      toast.success("Image generated successfully", { id: toastId });
    } catch {
      toast.error("Error generating image", { id: toastId });
    } finally {
      setGeneratingLoader(false);
    }
  };

  const handleUploadDummy = async () => {
    if (!image) return toast.error("No image to upload");

    setUploadLoader(true);
    try {
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      addImage(image.base64Data);
      toast.success("Image uploaded successfully");
      setImage(undefined);
      setProgress(0);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploadLoader(false);
    }
  };

  const handleUpload = async () => {
    if (!image) return toast.error("No image to upload");

    let authParams;
    setUploadLoader(true);
    try {
      authParams = await imagekitAuthenticator();
    } catch (error) {
      console.error("Error authenticating with ImageKit", error);
      setUploadLoader(false);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;
    console.log("ImageKit auth params:", authParams);

    try {
      const uploadResponse = await upload({
        signature,
        expire,
        token,
        publicKey,
        file: image.base64Data,
        fileName: image.name,
        folder: "cars",
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });

      console.log("Upload response:", uploadResponse);

      if (!uploadResponse.filePath)
        return toast.error("Failed to upload image");
      addImage(uploadResponse.filePath);

      toast.success("Image uploaded successfully");
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    } finally {
      setUploadLoader(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass border-cyan/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan">
            <ImageIcon className="h-6 w-6" />
            Generate AI Image
          </CardTitle>
          <p className="text-muted-foreground">
            Use AI to generate stunning images of your dream car
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the car you want to generate... (e.g., 'A sleek red sports car with carbon fiber details parked in a modern city at sunset')"
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

            <div className="space-y-2">
              <Label htmlFor="file-name">File Name</Label>
              <Input
                id="file-name"
                placeholder="Enter a name for the generated image..."
                className="bg-background/50 border-cyan/20 focus:border-cyan"
                {...register("name", { required: "File name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Button
              disabled={generatingLoader}
              className="w-full bg-cyan hover:bg-cyan/80 text-black font-semibold"
            >
              {generatingLoader ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <WandSparkles className="h-4 w-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </form>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 space-y-4"
            >
              <h3 className="text-lg font-semibold">Generated Image</h3>
              {generatingLoader ? (
                <Skeleton className="w-full h-96 rounded-lg" />
              ) : (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={image.base64Data}
                    alt="Generated Car"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-cyan/90 text-black">
                      AI Generated
                    </Badge>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setImage(undefined)}
                  className="border-cyan/50 text-cyan hover:bg-cyan/10"
                >
                  Cancel
                </Button>
                <Button
                  disabled={uploadLoader}
                  onClick={handleUpload}
                  className="bg-cyan hover:bg-cyan/80 text-black"
                >
                  {uploadLoader ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-pulse" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {progress > 0 && (
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Uploading... {Math.round(progress)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------
// -----------------------------------------------------------------------------add Car------------------------------------------------------------

const STORAGE_KEY = "new-car-details";

const carTypes = [
  "SEDAN",
  "SUV",
  "COUPE",
  "CONVERTIBLE",
  "HATCHBACK",
  "TRUCK",
  "VAN",
];

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
    defaultValues: {
      name: "",
      brand: "",
      type: "",
      year: new Date().getFullYear(),
      mileage: 0,
      colors: [],
      price: 0,
      description: "",
      images: [],
      transmission: "AUTOMATIC",
      features: [],
      location: "",
      fuelType: "",
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

  const addImageUrl = useCallback(() => {
    if (!imageUrl || imageUrl.trim() === "" || images.includes(imageUrl))
      return;
    addImage(imageUrl);
    setImageUrl("");
  }, [imageUrl, images, addImage]);

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
        toast.success("Car listing added successfully", { id: toastId });
        resetState();
      } catch (error) {
        toast.error("Error adding car listing", { id: toastId });
      } finally {
        setSubmitHandlerLoading(false);
      }
    },
    [resetState]
  );

  const autoGenerateHandler = useCallback(async () => {
    try {
      if (!watch("name"))
        return toast.error("Please enter a car name to generate details");

      setIsGenerateAILoading(true);

      const result = await autoGenerateCar(watch("name"));

      if (!result) {
        toast.error("Failed to generate car details");
        return;
      }

      setColors(result.colors);
      setFeatures(result.features);

      // Set generated data to form state
      Object.entries(result).forEach(([key, value]) => {
        if (key === "images") return;
        setValue(key as keyof AddCarSchema, value as any);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      toast.success("Car details generated successfully");
    } catch (error) {
      toast.error("Failed to generate car details");
    } finally {
      setIsGenerateAILoading(false);
    }
  }, [watch, setValue]);

  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

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
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
                  <Select onValueChange={(value) => setValue("type", value)}>
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
                    onValueChange={(value) => setValue("fuelType", value)}
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
                  />
                  <Button
                    type="button"
                    onClick={addImageUrl}
                    className="bg-cyan hover:bg-cyan/80 text-black"
                  >
                    Add
                  </Button>
                </div>
              </div>

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
                    {...register("sellerName", {
                      required: "Seller name is required",
                    })}
                  />
                  {errors.sellerName && (
                    <p className="text-sm text-red-500">
                      {errors.sellerName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerPhone">Phone</Label>
                  <Input
                    id="sellerPhone"
                    placeholder="e.g., +1 (555) 123-4567"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerPhone", {
                      required: "Phone is required",
                    })}
                  />
                  {errors.sellerPhone && (
                    <p className="text-sm text-red-500">
                      {errors.sellerPhone.message}
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
                    {...register("sellerEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.sellerEmail && (
                    <p className="text-sm text-red-500">
                      {errors.sellerEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellerCity">City</Label>
                  <Input
                    id="sellerCity"
                    placeholder="e.g., Los Angeles"
                    className="bg-background/50 border-cyan/20 focus:border-cyan"
                    {...register("sellerCity", {
                      required: "City is required",
                    })}
                  />
                  {errors.sellerCity && (
                    <p className="text-sm text-red-500">
                      {errors.sellerCity.message}
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
