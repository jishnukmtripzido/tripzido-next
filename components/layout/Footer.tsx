import Link from "next/link";

const FOOTER_LINKS = {
  Support: [
    "Manage your bookings",
    "Customer service help",
    "Safety resource center",
    "Report an issue",
  ],
  Discover: [
    "Loyalty rewards program",
    "Seasonal deals",
    "Travel articles",
    "Tripzido for business",
    "Destinations guide",
  ],
  "Terms and settings": [
    "Privacy notice",
    "Terms of service",
    "Accessibility statement",
  ],
  Partners: [
    "Vendor login",
    "Partner help",
    "List your bikes",
    "Become an affiliate",
  ],
  About: ["About Tripzido", "How we work", "Contact Us"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6">
      <div className="mx-auto px-4 lg:px-8 xl:mx-[121.5px] xl:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold text-gray-900 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            Tripzido is India&apos;s trusted two-wheeler rental platform, connecting riders with verified local vendors
            across popular destinations.
            <br className="hidden sm:block" />
            Copyright &copy; 2026 Tripzido. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
