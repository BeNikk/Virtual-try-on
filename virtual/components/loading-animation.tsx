"use client";
import { cn } from "@/lib/utils"

interface LoadingAnimationProps {
  className?: string
}

export default function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative h-6 w-24">
        <div
          className="absolute top-0 mt-1 h-4 w-4 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="absolute top-0 mt-1 h-4 w-4 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "300ms", left: "calc(50% - 8px)" }}
        ></div>
        <div
          className="absolute top-0 mt-1 h-4 w-4 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "600ms", right: "0" }}
        ></div>
      </div>
    </div>
  )
}

