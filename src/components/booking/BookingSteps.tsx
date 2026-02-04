"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface BookingStepsProps {
  currentStep: number;
  isConfirmed?: boolean; // New prop to trigger the "all green" state
}

export default function BookingSteps({ currentStep, isConfirmed = false }: BookingStepsProps) {
  const steps = [
    { number: 1, label: "Selection", subtitle: "Choose Room" },
    { number: 2, label: "Details", subtitle: "Guest Info" },
    { number: 3, label: "Finalize", subtitle: "Confirmation" }
  ];

  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If confirmed, progress bar is always 100%
    const progress = isConfirmed ? 1 : (currentStep - 1) / (steps.length - 1);
    
    gsap.to(barRef.current, {
      width: `${progress * 100}%`,
      backgroundColor: isConfirmed ? "#10b981" : "currentColor", // Emerald green on finish
      duration: 1.5,
      ease: "expo.inOut",
    });

    gsap.to(ringRef.current, {
      left: `${progress * 100}%`,
      borderColor: isConfirmed ? "rgba(16, 185, 129, 0.2)" : "rgba(0,0,0,0.05)",
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, [currentStep, isConfirmed]);

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-20">
      {/* Background Track */}
      <div className="absolute top-[6.75rem] left-[10%] right-[10%] h-[1px] bg-black/[0.08] dark:bg-white/[0.08] z-0" />
      
      {/* Progress Line */}
      <div className="absolute top-[6.75rem] left-[10%] right-[10%] z-0 pointer-events-none">
        <div 
          ref={barRef}
          className={cn(
            "h-[1.5px] w-0 transition-colors duration-1000",
            isConfirmed ? "bg-emerald-500" : "bg-black dark:bg-white"
          )} 
        />
      </div>

      {/* Overlapping Aesthetic Ring */}
      {/* <div 
        ref={ringRef}
        className="absolute top-[4rem] w-24 h-24 border border-black/[0.05] dark:border-white/[0.05] rounded-full z-0 pointer-events-none -ml-12"
        style={{ left: "0" }}
      /> */}

      <div className="flex justify-between items-start relative z-10 px-[5%]">
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number || isConfirmed;

          return (
            <div key={step.number} className="flex flex-col items-center w-32">
              <div className="relative mb-8 flex items-center justify-center">
                {/* Active/Success Pulse */}
                {isActive && !isConfirmed && (
                   <div className="absolute inset-[-12px] border border-black/[0.1] dark:border-white/[0.1] rounded-full animate-pulse" />
                )}
                
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-1000",
                  isActive && !isConfirmed ? "border border-black/40 dark:border-white/40 bg-white dark:bg-black" : "border border-transparent",
                  isCompleted ? "bg-emerald-500 scale-90 shadow-[0_10px_20px_rgba(16,185,129,0.2)]" : ""
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white stroke-[2.5px] animate-in zoom-in duration-500" />
                  ) : (
                    <span className={cn(
                      "text-[11px] font-medium tracking-widest",
                      isActive ? "text-black dark:text-white" : "text-black/10 dark:text-white/10"
                    )}>
                      0{step.number}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center">
                <p className={cn(
                  "text-[10px] uppercase tracking-[0.3em] font-bold mb-2 transition-colors duration-700",
                  isConfirmed ? "text-emerald-600" : (isActive ? "text-black/80 dark:text-white/80" : "text-black/20 dark:text-white/20")
                )}>
                  {isConfirmed ? "Verified" : step.label}
                </p>
                <p className={cn(
                  "text-[13px] font-serif italic transition-opacity duration-700",
                  isConfirmed ? "text-emerald-500/60" : (isActive ? "text-black/40 dark:text-white/40 opacity-100" : "opacity-0")
                )}>
                  {isConfirmed ? "Reservation Secured" : step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}