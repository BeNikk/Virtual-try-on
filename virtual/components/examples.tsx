"use client";
import Image from "next/image"
import { Card, CardContent } from "./ui/card"

export default function FeaturedExamples() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Stunning Virtual Fashion</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our AI technology creates photorealistic virtual try-ons that transform your shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden border-0 shadow-lg group">
            <CardContent className="p-0 relative">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/photo1.avif"
                  alt="Elegant evening wear"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Elegant Evening Wear</h3>
                <p className="text-muted-foreground">Experience luxury fashion virtually</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg group">
            <CardContent className="p-0 relative">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/photo2.avif"
                  alt="Designer casual wear"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Designer Casual Wear</h3>
                <p className="text-muted-foreground">Perfect fit, every time</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg group">
            <CardContent className="p-0 relative">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/photo3.avif"
                  alt="Luxury collection"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Luxury Collection</h3>
                <p className="text-muted-foreground">High-fashion virtual experience</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

