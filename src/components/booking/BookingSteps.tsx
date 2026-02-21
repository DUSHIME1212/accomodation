"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface BookingStepsProps {
  currentStep: number;
  isConfirmed?: boolean; // New prop to trigger the "all green" state
}

export default function BookingSteps({
  currentStep,
  isConfirmed = false,
}: BookingStepsProps) {
  const steps = [
    { number: 1, label: "Selection", subtitle: "Choose Room" },
    { number: 2, label: "Details", subtitle: "Guest Info" },
    { number: 3, label: "Finalize", subtitle: "Confirmation" },
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
    <div className="relative mx-auto max-w-5xl px-4 py-20">
      {/* Background Track */}
      <div className="absolute top-[6.75rem] right-[10%] left-[10%] z-0 h-[1px] bg-black/[0.08] dark:bg-white/[0.08]" />
      {/* Progress Line */}
      <div className="pointer-events-none absolute top-[6.75rem] right-[10%] left-[10%] z-0">
        <div
          ref={barRef}
          className={cn(
            "h-[1.5px] w-0 transition-colors duration-1000",
            isConfirmed ? "bg-emerald-500" : "bg-foreground",
          )}
        />
      </div>
      <div className="relative z-10 flex items-start justify-between px-[5%]">
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number || isConfirmed;

          return (
            <div key={step.number} className="flex w-32 flex-col items-center">
              <div className="relative mb-8 flex items-center justify-center">
                {/* Active/Success Pulse */}
                {isActive && !isConfirmed && (
                  <div className="border-foreground/10 absolute inset-[-12px] animate-pulse rounded-full border" />
                )}

                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full transition-all duration-1000",
                    isActive && !isConfirmed
                      ? "border-foreground/40 bg-background border"
                      : "border border-transparent",
                    isCompleted
                      ? "scale-90 bg-emerald-500 shadow-lg shadow-emerald-500/20"
                      : "",
                  )}
                >
                  {isCompleted ? (
                    <Check className="animate-in zoom-in h-5 w-5 stroke-[2.5px] text-white duration-500" />
                  ) : (
                    <span
                      className={cn(
                        "text-[11px] font-medium tracking-widest",
                        isActive ? "text-foreground" : "text-foreground/10",
                      )}
                    >
                      0{step.number}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center">
                <p
                  className={cn(
                    "mb-2 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-700",
                    isConfirmed
                      ? "text-emerald-600"
                      : isActive
                        ? "text-foreground/80"
                        : "text-foreground/20",
                  )}
                >
                  {isConfirmed ? "Verified" : step.label}
                </p>
                <p
                  className={cn(
                    "font-serif text-[13px] italic transition-opacity duration-700",
                    isConfirmed
                      ? "text-emerald-500/60"
                      : isActive
                        ? "text-muted-foreground opacity-100"
                        : "opacity-0",
                  )}
                >
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
