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
import { fal } from "@fal-ai/client";


export default function TryOnSection() {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [clothImage, setClothImage] = useState<string | null>(null)
  const [selectedDress, setSelectedDress] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<any>(null)
  fal.config({
    proxyUrl: "/api/fal/proxy", //
  });
  const handleTryOn = async () => {
    if (!userImage || (!selectedDress && !clothImage)) {
      toast.error("Please upload an image and select a dress.");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await fal.subscribe("fashn/tryon", {
        input: {
          model_image: userImage,
          garment_image: clothImage || selectedDress ||"/heroine.avif",
          category: "tops",
          timesteps: 50,
          guidance_scale: 2,
          nsfw_filter: true,
          garment_photo_type: "auto",
          num_samples: 1,
          seed: 42,
        },
        pollInterval: 5000,
        logs: true,
      });
      console.log(result);
      toast.success("Try-on image generated successfully!");
    } catch (error) {
      toast.error("Try-On Failed. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  

  const handleImageUpload = (imageDataUrl: string) => {
    setUserImage(imageDataUrl)
    setResultImage(null)
  }

  const handleClothUpload = (imageDataUrl: string) => {
    setClothImage(imageDataUrl)
    setSelectedDress(null)
    setResultImage(null)
  }

  const handleDressSelect = (dressUrl: string) => {
    setSelectedDress(dressUrl)
    setClothImage(null)
    setResultImage(null)
  }



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
              <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="gallery">
                    <Shirt className="mr-2 h-4 w-4" />
                    Gallery
                  </TabsTrigger>
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
      </div>
    </section>
  )
}

