"use client"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DressSelectorProps {
  onDressSelect: (dressUrl: string) => void
  selectedDress: string | null
}

// Mock dress data
const dresses = [
  {
    id: 1,
    name: "Elegant Evening Gown",
    image:
      "/dress1.avif"
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    image:
    "/dress2.avif"
  },
  {
    id: 3,
    name: "Casual Attire",
    image:
    "/dress3.avif"
  },
  {
    id: 4,
    name: "Formal Blazer",
    image:
    "/dress6.avif"

  },
  {
    id: 5,
    name: "Designer Gown",
    image:
    "/dress5.avif"
  },
  {
    id: 6,
    name: "Casual Chic Outfit",
    image:
    "/dress4.avif"

  },
]

export default function DressSelector({ onDressSelect, selectedDress }: DressSelectorProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex space-x-4">
        {dresses.map((dress) => (
          <div
            key={dress.id}
            className={cn(
              "relative flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all",
              selectedDress === dress.image ? "border-primary shadow-md" : "border-transparent hover:border-primary/50",
            )}
            onClick={() => onDressSelect(dress.image)}
          >
            <div className="w-32 h-48 md:w-40 md:h-56">
              <Image src={dress.image || "/placeholder.svg"} alt={dress.name} fill className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
              <p className="text-white text-xs truncate">{dress.name}</p>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

