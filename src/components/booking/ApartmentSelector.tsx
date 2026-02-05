"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type ApartmentProps } from "@/components/ApartmentCard";

interface ApartmentSelectorProps {
  apartments: ApartmentProps[];
  selectedApartment: ApartmentProps | null;
  onSelectApartment: (apartment: ApartmentProps) => void;
}

export default function ApartmentSelector({
  apartments,
  selectedApartment,
  onSelectApartment
}: ApartmentSelectorProps) {
  return (
    <div className="space-y-6">
      {apartments.map((apartment) => (
        <div 
          key={apartment.id}
className={cn(
            "border rounded-xl overflow-hidden transition-all flex flex-col md:flex-row",
            selectedApartment?.id === apartment.id 
              ? "border-primary shadow-md" 
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <img 
              src={apartment.image} 
              alt={apartment.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{apartment.name}</h3>
              <p className="text-muted-foreground mb-4">{apartment.description}</p>
<div className="flex flex-wrap gap-2 mb-4">
                <div className="text-sm bg-muted px-3 py-1 rounded-full">
                  {apartment.capacity} Guests
                </div>
                <div className="text-sm bg-muted px-3 py-1 rounded-full">
                  {apartment.size} m²
                </div>
                <div className="text-sm bg-muted px-3 py-1 rounded-full">
                  {apartment.location}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xl font-bold">${apartment.price}</span>
                <span className="text-muted-foreground text-sm"> / night</span>
              </div>
              <Button 
                variant={selectedApartment?.id === apartment.id ? "default" : "outline"}
                className={selectedApartment?.id === apartment.id ? "btn-primary" : ""}
                onClick={() => onSelectApartment(apartment)}
              >
                {selectedApartment?.id === apartment.id ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Selected
                  </>
                ) : (
                  "Select"
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}