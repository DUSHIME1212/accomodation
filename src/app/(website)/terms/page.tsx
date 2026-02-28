import {
  Gavel,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen px-8 pt-32 pb-24 md:px-16 lg:px-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 space-y-4">
          <h4 className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
            Legal
          </h4>
          <h1 className="text-background font-serif text-4xl leading-tight md:text-6xl">
            Terms of <span className="italic">Service</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Please read these terms and conditions carefully before using our
            booking services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {sections.map((section, index) => (
            <section key={index} className="group space-y-6">
              <div className="flex items-center gap-4">
                <div className="border-border/50 group-hover:border-primary/50 bg-card flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition-colors duration-500">
                  <section.icon
                    className="text-primary h-5 w-5"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="text-background font-serif text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4 pl-16">
                <p className="text-muted-foreground leading-relaxed font-light">
                  {section.content}
                </p>
                {section.details && (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {section.details.map((detail, i) => (
                      <div
                        key={i}
                        className="border-border/30 bg-card rounded-xl border p-4 transition-all duration-300 hover:shadow-md"
                      >
                        <h4 className="text-foreground mb-1 text-sm font-medium">
                          {detail.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed italic">
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center space-y-6 text-center">
          <div className="via-border h-24 w-px bg-gradient-to-b from-transparent to-transparent" />
          <p className="text-muted-foreground max-w-md text-sm font-light">
            By making a reservation with Silver Horizon, you acknowledge that
            you have read, understood, and agreed to these Terms of Service.
          </p>
          <p className="text-muted-foreground/50 text-[10px] tracking-[0.2em] uppercase">
            Last Updated: February 2026
          </p>
        </div>
      </div>
    </main>
  );
}

const sections = [
  {
    title: "Reservation & Booking",
    icon: Calendar,
    content:
      "All reservations are subject to availability and confirmation. A booking is only considered confirmed once you receive a confirmation email with a confirmation number.",
    details: [
      {
        title: "Minimum Age",
        text: "Guests must be at least 18 years old to make a reservation and check in.",
      },
      {
        title: "ID Requirement",
        text: "A valid government-issued ID is required at the time of check-in.",
      },
    ],
  },
  {
    title: "Payment Policy",
    icon: CreditCard,
    content:
      "We accept major credit cards and other specified payment methods. Full payment or a deposit may be required at the time of booking depending on the selected rate.",
    details: [
      {
        title: "Currency",
        text: "All transactions are processed in USD unless otherwise specified.",
      },
      {
        title: "Taxes",
        text: "Applicable taxes are clearly stated during the booking process.",
      },
    ],
  },
  {
    title: "Cancellation & Refunds",
    icon: AlertCircle,
    content:
      "Our cancellation policies vary depending on the apartment type and selected rate. Please review the specific cancellation policy for your chosen accommodation.",
    details: [
      {
        title: "Flexible Rates",
        text: "Free cancellation up to 24 hours before check-in.",
      },
      {
        title: "Non-Refundable",
        text: "No refunds for cancellations or no-shows.",
      },
    ],
  },
  {
    title: "Guest Conduct & Rules",
    icon: CheckCircle2,
    content:
      "Guests are expected to follow house rules and maintain a respectful environment for other guests and staff.",
    details: [
      {
        title: "Quiet Hours",
        text: "Quiet hours are observed from 10:00 PM to 7:00 AM.",
      },
      {
        title: "Smoking",
        text: "Strict no-smoking policy inside all apartments.",
      },
    ],
  },
  {
    title: "Legal Terms",
    icon: Gavel,
    content:
      "Silver Horizon Luxury Hotel Group shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with your stay.",
  },
];
