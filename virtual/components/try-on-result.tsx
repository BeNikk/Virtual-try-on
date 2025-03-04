"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Equal } from "lucide-react"
import { motion } from "framer-motion"

interface TryOnResultProps {
  userImage: string | null
  clothingImage: string | null
  resultImage: string | null
}

export default function TryOnResult({ userImage, clothingImage, resultImage }: TryOnResultProps) {
  if (!userImage || !clothingImage || !resultImage) return null

  return (
    <section id="try-on-result" className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">Your Result</h2>
        <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          See how our AI technology perfectly matches the clothing to your photo.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* User Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/4"
          >
            <Card className="overflow-hidden border-0 shadow-lg h-full">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image src={userImage || "/placeholder.svg"} alt="Your photo" fill className="object-cover" />
                </div>
                <div className="p-4 text-center bg-background/80 backdrop-blur-sm absolute bottom-0 left-0 right-0">
                  <p className="font-medium">Your Photo</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Plus Sign */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
          </motion.div>

          {/* Clothing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/4"
          >
            <Card className="overflow-hidden border-0 shadow-lg h-full">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={clothingImage || "/placeholder.svg"}
                    alt="Selected clothing"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center bg-background/80 backdrop-blur-sm absolute bottom-0 left-0 right-0">
                  <p className="font-medium">Selected Outfit</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Equals Sign */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Equal className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full md:w-1/3"
          >
            <Card className="overflow-hidden border-0 shadow-lg relative group">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image src={resultImage || "/placeholder.svg"} alt="Try-on result" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 text-center bg-background/80 backdrop-blur-sm absolute bottom-0 left-0 right-0">
                  <p className="font-medium">Final Result</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Our AI technology seamlessly combines your photo with the selected outfit to create a realistic virtual
            try-on.
          </p>
        </div>
      </div>
    </section>
  )
}

