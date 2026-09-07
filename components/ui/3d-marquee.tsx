"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
  innerScaleClass,
}: {
  images: string[];
  className?: string;
  innerScaleClass?: string;
}) => {
  // Ensure we have enough images to fill columns
  const baseImages = images.length > 0 ? images : ["/images/studio-images/DSC00046.jpg"];

  // Split into 5 columns across the full screen width
  const numColumns = 5;
  const chunkSize = Math.max(1, Math.ceil(baseImages.length / numColumns));
  
  const columns = Array.from({ length: numColumns }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    const slice = baseImages.slice(start, start + chunkSize);
    // If slice has fewer items, wrap around
    const colItems = slice.length > 0 ? slice : baseImages.slice(0, 4);
    // Duplicate 3 times for seamless infinite video-like marquee loop
    return [...colItems, ...colItems, ...colItems];
  });

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden flex items-center justify-center",
        className
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden [perspective:1400px]">
        <div
          style={{
            transform: "rotateX(22deg) rotateY(-4deg) rotateZ(-8deg) scale(1.08)",
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "w-[220vw] max-w-[3400px] min-w-[1400px] shrink-0 grid grid-cols-5 gap-6 sm:gap-8 lg:gap-10",
            innerScaleClass
          )}
        >
          {columns.map((colImages, colIndex) => {
            const isEven = colIndex % 2 === 0;
            const duration = isEven ? 80 + colIndex * 4 : 88 + colIndex * 4;

            return (
              <div
                key={`col-${colIndex}`}
                className="relative overflow-hidden h-[1600px] flex flex-col justify-center"
              >
                <GridLineVertical className="-left-3 sm:-left-4" offset="120px" />
                
                <motion.div
                  initial={{ y: isEven ? "0%" : "-50%" }}
                  animate={{ y: isEven ? "-50%" : "0%" }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  className="flex flex-col items-center gap-6 sm:gap-8 w-full"
                >
                  {colImages.map((image, imageIndex) => (
                    <div
                      className="relative w-full group/card"
                      key={`${colIndex}-${imageIndex}-${image}`}
                    >
                      <GridLineHorizontal className="-top-3 sm:-top-4" offset="30px" />
                      
                      <motion.div
                        whileHover={{
                          scale: 1.06,
                          rotateZ: isEven ? 1 : -1,
                          zIndex: 40,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 ring-1 ring-slate-900/20"
                      >
                        {/* Image */}
                        <img
                          src={image}
                          alt={`Studio Showcase ${imageIndex + 1}`}
                          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                        />
                        {/* Glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-red/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(236, 35, 40, 0.3)",
          "--height": "1px",
          "--width": "6px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.25)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(236, 35, 40, 0.3)",
          "--height": "6px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.25)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};
