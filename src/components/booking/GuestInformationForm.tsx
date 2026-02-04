"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, User, Globe, MessageSquare, ShieldCheck } from "lucide-react";
import type { FormData } from "@/lib/booking-data";

interface GuestInformationFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export default function GuestInformationForm({
  formData,
  onInputChange,
  onSelectChange
}: GuestInformationFormProps) {
  return (
    <form className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Section 1: Guest Dossier */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 -full">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-foreground/70">
            Guest Dossier
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="glass-card p-8 bg-white/40 dark:bg-black/20 border-white/40 dark:border-white/5 backdrop-blur-xl -[2rem] space-y-8 shadow-2xl shadow-black/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <PremiumField 
              label="Given Name" 
              id="firstName" 
              value={formData.firstName} 
              onChange={onInputChange} 
              placeholder="Julian"
            />
            <PremiumField 
              label="Surname" 
              id="lastName" 
              value={formData.lastName} 
              onChange={onInputChange} 
              placeholder="Vanderbilt"
            />
            <PremiumField 
              label="Electronic Mail" 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={onInputChange} 
              placeholder="j.vanderbilt@estate.com"
            />
            <PremiumField 
              label="Contact Number" 
              id="phone" 
              value={formData.phone} 
              onChange={onInputChange} 
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Residency */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 -full">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-foreground/70">
            Residency
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="glass-card p-8 bg-white/40 dark:bg-black/20 border-white/40 dark:border-white/5 backdrop-blur-xl -[2rem] space-y-8 shadow-2xl shadow-black/5">
          <PremiumField 
            label="Street Address" 
            id="address" 
            value={formData.address} 
            onChange={onInputChange} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <PremiumField label="City" id="city" value={formData.city} onChange={onInputChange} />
            <PremiumField label="Postal Code" id="zipCode" value={formData.zipCode} onChange={onInputChange} />
            <PremiumField label="Country" id="country" value={formData.country} onChange={onInputChange} />
          </div>
        </div>
      </section>

      {/* Section 3: Concierge Notes */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 -full">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-foreground/70">
            Concierge Notes
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="space-y-2">
          <textarea 
            id="specialRequests" 
            name="specialRequests" 
            value={formData.specialRequests} 
            onChange={onInputChange}
            placeholder="Dietary preferences, arrival arrangements, or specific celebrations..."
            className="w-full h-32 -2xl border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20 px-4 py-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:italic placeholder:text-muted-foreground/50 resize-none"
          />
        </div>
      </section>

      {/* Section 4: Secure Settlement */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 -full">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-foreground/70">
            Secure Settlement
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <Tabs defaultValue="credit-card" onValueChange={(value) => onSelectChange("paymentMethod", value)} className="w-full">
          <TabsList className="inline-flex p-1 bg-black/5 dark:bg-white/5 -full mb-8">
            <TabsTrigger value="credit-card" className="-full px-8 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-lg text-[10px] uppercase tracking-widest font-bold">
              Credit Card
            </TabsTrigger>
            <TabsTrigger value="pay-at-property" className="-full px-8 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-lg text-[10px] uppercase tracking-widest font-bold">
              Pay At Property
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card" className="space-y-8 animate-in fade-in duration-500">
            <div className="glass-card p-8 bg-white/40 dark:bg-black/20 border-white/40 dark:border-white/5 backdrop-blur-xl -[2rem] space-y-8">
              <PremiumField label="Name on Card" id="cardName" value={formData.cardName} onChange={onInputChange} />
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold ml-1">Card Number</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    value={formData.cardNumber} 
                    onChange={onInputChange}
                    placeholder="0000 0000 0000 0000"
                    className="h-12 bg-transparent border-0 border-b border-black/10 dark:border-white/10 -none px-0 text-lg tracking-[0.2em] focus-visible:ring-0 focus-visible:border-primary transition-all"
                  />
                  <CreditCard className="absolute right-0 top-3 w-5 h-5 text-muted-foreground/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <PremiumField label="Expiry Date" id="cardExpiry" value={formData.cardExpiry} onChange={onInputChange} placeholder="MM / YY" />
                <PremiumField label="Security Code" id="cardCvc" value={formData.cardCvc} onChange={onInputChange} placeholder="CVC" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pay-at-property" className="animate-in fade-in duration-500">
             <div className="p-8 border border-dashed border-primary/20 -[2rem] bg-primary/[0.02]">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  A valid credit card is required upon arrival for security purposes. 
                  Payment will be finalized during your stay. We look forward to welcoming you.
                </p>
             </div>
          </TabsContent>
        </Tabs>
      </section>
    </form>
  );
}

/* Reusable Premium Field Sub-component */
function PremiumField({ label, id, type = "text", value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2 group">
      <Label htmlFor={id} className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold ml-1 group-focus-within:text-primary transition-colors">
        {label}
      </Label>
      <Input 
        id={id} 
        name={id} 
        type={type}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        required 
        className="h-10 bg-transparent border-0 border-b border-black/10 dark:border-white/10 -none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-muted-foreground/30"
      />
    </div>
  );
}