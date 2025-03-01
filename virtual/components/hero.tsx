"use client";
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroine.avif"
          alt="Fashion model in elegant dress"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-28 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Virtual Fashion <br />
            <span className="bg-clip-text  text-white bg-gradient-to-r from-primary to-primary/80">
              Reimagined
            </span>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Experience the future of fashion with our AI-powered virtual fitting room. Try on designer outfits instantly
            with stunning realism.
          </p>
          <Button
            size="lg"
            className="group text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
            onClick={() => {
              document.getElementById("try-on-section")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Try Now
            <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  )
}

