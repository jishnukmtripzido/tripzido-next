import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";

const contactMethods = [
  {
    icon: "📞",
    title: "Call Us",
    detail: "+91 98765 43210",
    timing: "Mon - Sun: 8:00 AM - 10:00 PM",
    action: "tel:+919876543210",
    btnText: "Call Now",
  },
  {
    icon: "💬",
    title: "WhatsApp Support",
    detail: "+91 98765 43210",
    timing: "Instant response for live bookings",
    action: "https://wa.me/919876543210",
    btnText: "Chat on WhatsApp",
  },
  {
    icon: "✉️",
    title: "Email Support",
    detail: "support@tripzido.com",
    timing: "We reply within 2–4 hours",
    action: "mailto:support@tripzido.com",
    btnText: "Send an Email",
  },
];

const faqs = [
  {
    q: "What documents do I need to rent a bike?",
    a: "You need a valid original Driving License (DL) and an Aadhaar Card or Passport for identity verification at the time of pickup.",
  },
  {
    q: "Is fuel included in the rental price?",
    a: "No, fuel is not included. We provide enough fuel to get you to the nearest petrol station, and you must return the vehicle with the same level of fuel.",
  },
  {
    q: "How does the security deposit work?",
    a: "A refundable security deposit is collected at pickup and refunded directly to your original payment method within 24 hours of vehicle return.",
  },
];

async function submitContactForm(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const subject = formData.get("subject")?.toString();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !phone || !message) {
    redirect("/contact?error=missing_fields");
  }

  // TODO: send email, hit a DB, call a CRM, etc.
  console.log("New contact submission:", {
    name,
    email,
    phone,
    subject,
    message,
  });

  redirect("/contact?success=true");
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const submitted = params.success === "true";
  const missingFields = params.error === "missing_fields";

  return (
    <main className="min-h-screen bg-gray-50">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <span className="inline-block bg-brand-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Support & Contact
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          We&apos;re here to help you ride
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Have a question about bike rentals, documentation, or your upcoming
          trip? Reach out and we&apos;ll sort you out.
        </p>
      </section>

      {/* Quick Contact Cards */}
      <div className="bg-brand-yellow">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center flex flex-col items-center justify-between border border-black/5 shadow-sm"
            >
              <div>
                <span className="text-3xl mb-2 inline-block">
                  {method.icon}
                </span>
                <h3 className="text-base font-bold text-black">
                  {method.title}
                </h3>
                <p className="text-sm font-extrabold text-gray-900 mt-1">
                  {method.detail}
                </p>
                <p className="text-xs text-gray-600 mt-1">{method.timing}</p>
              </div>

              <a
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full py-2 px-4 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-900 transition-colors text-center"
              >
                {method.btnText}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Form & FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the details below and our operations team will reach out.
            </p>

            {submitted ? (
              <div className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3">
                Thank you for reaching out! We&apos;ll get back to you shortly.
              </div>
            ) : (
              <form action={submitContactForm} className="space-y-4">
                {missingFields && (
                  <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3">
                    Please fill in all required fields before submitting.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      name="subject"
                      defaultValue="General Inquiry"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Help">Booking Assistance</option>
                      <option value="Roadside Support">Roadside Support</option>
                      <option value="Partner With Us">Fleet Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-yellow text-black font-bold rounded-xl text-sm hover:bg-[#e6ac00] transition-colors shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQs & Quick Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                  >
                    <p className="font-bold text-sm text-gray-900 mb-1.5">
                      {faq.q}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hubs card */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Headquarters & Pick-up Hub
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Main Service Road, Indiranagar, Bengaluru, KA 560038
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Roadside Banner */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-black rounded-2xl px-6 py-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-2">
            24/7 Roadside Assistance
          </p>
          <h3 className="text-xl font-extrabold mb-2">
            Stuck on your ride? We&apos;ve got your back.
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-4">
            Call our emergency roadside desk anytime for flat tires, battery
            breakdowns, or towing.
          </p>
          <a
            href="tel:+919876543210"
            className="inline-block bg-brand-yellow text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e6ac00] transition-colors"
          >
            Emergency SOS: +91 98765 43210
          </a>
        </div>
      </section>
    </main>
  );
}
