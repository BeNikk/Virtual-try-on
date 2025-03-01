"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, Shirt, ImageIcon } from "lucide-react"
import ImageUploader from "@/components/image-uploader"
import DressSelector from "@/components/dress-selector"
import LoadingAnimation from "@/components/loading-animation"
import { toast } from "sonner"

export default function TryOnSection() {
  const [userImage, setUserImage] = useState<File | null>(null)
  const [clothImage, setClothImage] = useState<File | null>(null)
  const [selectedDress, setSelectedDress] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)

  const handleTryOn = async () => {
    if (!userImage || (!selectedDress && !clothImage)) {
      toast.error("Please upload an image and select a dress.");
      return;
    }

    setIsProcessing(true);
    setResultImage(null);

    try {
      const formData = new FormData();
      formData.append("category", "tops");

      // Add model image
      if (userImage) {
        formData.append("modelImage", userImage);
      }

      // Add garment image
      if (clothImage) {
        formData.append("garmentImage", clothImage);
      } else if (selectedDress) {
        const response = await fetch(selectedDress);
      const blob = await response.blob();
      const file = new File([blob], "selected_dress.jpg", { type: blob.type });

      formData.append("garmentImage", file);
      }

      const response = await fetch("http://localhost:5000/tryon", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate try-on image.");
      }

      const data = await response.json();
      console.log(data);
      if (data) {
        setResultImage(data);
        toast.success("Try-on image generated successfully!");
      } else {
        throw new Error("Try-on image processing failed.");
      }
    } catch (error) {
      toast.error(`Try-On Failed: ${error instanceof Error ? error.message : "Please try again."}`);
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setUserImage(file);
    setResultImage(null);
  };

  const handleClothUpload = (file: File) => {
    setClothImage(file);
    setSelectedDress(null);
    setResultImage(null);
  };

  const handleDressSelect = (dressUrl: string) => {
    setSelectedDress(dressUrl);
    setClothImage(null);
    setResultImage(null);
  };

  return (
    <section id="try-on-section" className="w-full py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">Create Your Look</h2>
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Upload your photo and choose from our collection or upload your own clothing to see how it looks on you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6 tracking-tight">Your Photo</h3>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </TabsTrigger>
                  <TabsTrigger value="camera">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-0">
                  <ImageUploader onImageUpload={handleImageUpload} />
                </TabsContent>
                <TabsContent value="camera" className="mt-0">
                  <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg border-muted-foreground/25 p-4">
                    <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Camera access is not available in this demo. Please use the upload option.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6 tracking-tight">Choose Outfit</h3>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">

                  <TabsTrigger value="upload">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Outfit
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="gallery" className="mt-0">
                  <DressSelector onDressSelect={handleDressSelect} selectedDress={selectedDress} />
                </TabsContent>
                <TabsContent value="upload" className="mt-0">
                  <ImageUploader onImageUpload={handleClothUpload} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            onClick={handleTryOn}
            disabled={isProcessing || !userImage || (!selectedDress && !clothImage)}
            className="relative px-8 py-6 text-lg shadow-lg rounded-full transition-all hover:scale-105"
          >
            {isProcessing ? (
              <>
                <span className="opacity-0">Try It On</span>
                <LoadingAnimation className="absolute inset-0 flex items-center justify-center" />
              </>
            ) : (
              "Try It On"
            )}
          </Button>
        </div>

        {resultImage && (
          <div className="mt-12 flex justify-center">
            <Card className="border-0 shadow-lg overflow-hidden max-w-md">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6 tracking-tight text-center">Your Virtual Try-On</h3>
                <img 
                  src={resultImage} 
                  alt="Virtual try-on result" 
                  className="rounded-lg w-full shadow-md" 
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
