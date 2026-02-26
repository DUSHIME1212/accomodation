import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen px-8 pt-32 pb-24 md:px-16 lg:px-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 space-y-4">
          <h4 className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
            Privacy Policy
          </h4>
          <h1 className="text-foreground font-serif text-4xl leading-tight md:text-6xl">
            Your Privacy is Our <span className="italic">Priority</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            At Silver Horizon, we are committed to protecting your personal
            information and your right to privacy.
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
                <h2 className="text-foreground font-serif text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4 pl-16">
                <p className="text-muted-foreground leading-relaxed font-light">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="border-primary/20 space-y-3 border-l pl-4">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground/80 flex gap-3 text-sm font-light"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="border-border/50 group bg-card relative mt-20 overflow-hidden rounded-2xl border p-8 shadow-sm">
          <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 h-32 w-32 -translate-x-12 -translate-y-12 rounded-full blur-3xl transition-colors duration-700" />
          <h3 className="text-foreground mb-4 font-serif text-xl">
            Questions about our policy?
          </h3>
          <p className="text-muted-foreground mb-6 font-light">
            If you have any questions or concerns about this privacy notice, or
            our practices with regards to your personal information, please
            contact us.
          </p>
          <a
            href="mailto:privacy@silverhorizon.com"
            className="bg-foreground text-background hover:bg-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </main>
  );
}

const sections = [
  {
    title: "Information We Collect",
    icon: FileText,
    content:
      "We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.",
    list: [
      "Personal details (name, date of birth, nationality)",
      "Contact information (email address, phone number)",
      "Payment and billing information",
      "Booking details and travel preferences",
      "Log and usage data from our website",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: Eye,
    content:
      "We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.",
    list: [
      "To facilitate account creation and logon process",
      "To manage and confirm your bookings",
      "To send administrative information to you",
      "To fulfill and manage your orders",
      "To respond to user inquiries and offer support",
    ],
  },
  {
    title: "How We Share Your Information",
    icon: Shield,
    content:
      "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.",
    list: [
      "Compliance with Laws (Government requests, legal proceedings)",
      "Vital Interests and Legal Rights",
      "Third-Party Service Providers (Payment processors, IT services)",
      "Business Transfers during mergers or sales",
    ],
  },
  {
    title: "Data Security",
    icon: Lock,
    content:
      "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.",
  },
];
