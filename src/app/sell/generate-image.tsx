"use client";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Textarea } from "@/src/components/ui/textarea";
import { imagekitAuthenticator } from "@/src/lib/imagekit";
import { generateImageSchema } from "@/src/lib/zod";
import { useImages } from "@/src/store/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { motion } from "framer-motion";
import { Image as ImageIcon, Upload, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { generateImage } from "@/src/lib/actions/cars-actions";

interface GenerateImageSchema {
  description: string;
  name: string;
}

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

// // Mock image store
// const useImages = () => {
//   const [images, setImages] = useState<string[]>([]);

//   const addImage = (image: string) => {
//     setImages((prev) => [...prev, image]);
//   };

//   const removeImage = (image: string) => {
//     setImages((prev) => prev.filter((img) => img !== image));
//   };

//   const clearImages = () => {
//     setImages([]);
//   };

//   return { images, addImage, removeImage, clearImages };
// };

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
          animateProgress((event.loaded / event.total) * 100);
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

  const animateProgress = (target: number) => {
    setProgress((prev) => {
      if (target <= prev) return prev; // don't go backwards
      const step = (target - prev) / 10; // smooth step
      let current = prev;

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(interval);
          setProgress(target);
        } else {
          setProgress(Math.floor(current));
        }
      }, 50); // 50ms per step (~0.5s smooth)
      return prev;
    });
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

          {progress > 0 && <UploadProgress value={progress} />}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const UploadProgress = ({ value }: { value: number }) => {
  if (value <= 0 || value > 100) return null;

  return (
    <div className="mt-4 space-y-2">
      <Progress value={value} className="h-2 rounded-full" />
      <p className="text-sm text-muted-foreground text-center font-medium tracking-wide">
        {value < 100
          ? `Uploading... ${Math.round(value)}%`
          : "Upload complete!"}
      </p>
    </div>
  );
};
