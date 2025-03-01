"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const mockResults = [
  {
    id: 1,
    image:
    "/result1.avif",
    likes: 124,
    isLiked: false,
  },
  {
    id: 2,
    image:
    "/result2.avif",
    likes: 89,
    isLiked: true,
  },
  {
    id: 3,
    image:
    "/result1.avif",
    likes: 56,
    isLiked: false,
  },
]

export default function ResultsGallery() {
  const [results, setResults] = useState(mockResults)
  const [currentIndex, setCurrentIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diffX = touchStartX.current - touchEndX.current

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const handleLike = (id: number) => {
    setResults(
      results.map((result) =>
        result.id === id
          ? { ...result, isLiked: !result.isLiked, likes: result.isLiked ? result.likes - 1 : result.likes + 1 }
          : result,
      ),
    )
  }

  const handleShare = () => {
    toast("Share feature",{
      description: "Sharing is not available in this demo",
    })
  }

  const handleDownload = () => {
    toast("Download started",
    {
      description: "Your image would download in a real app",
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === results.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? results.length - 1 : prev - 1))
  }

  return (
    <section id="results-gallery" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Your Try-On Gallery</h2>

        <div
          ref={galleryRef}
          className="relative max-w-md mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              className="absolute top-0 left-0 w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0,
                x: currentIndex === index ? 0 : 100,
                pointerEvents: currentIndex === index ? "auto" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={result.image || "/placeholder.svg"}
                      alt={`Try-on result ${result.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={() => handleLike(result.id)}>
                      <Heart className={`h-6 w-6 ${result.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="ml-2">{result.likes}</span>
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {results.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

