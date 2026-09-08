// import AuthModal from "@/components/features/auth/AuthModal";

// export const metadata = {
//   title: "Login or Sign Up - Tripzido",
//   description:
//     "Access your Tripzido account or create a new one to enjoy seamless bike rentals across India.",
// };

// export default function AuthPage() {
//   return <AuthModal />;
// }

import AuthModal from "@/components/features/auth/AuthModal";

export const metadata = {
  title: "Login or Sign Up - Tripzido",
  description:
    "Access your Tripzido account or create a new one to enjoy seamless bike rentals across India.",
};

export default function AuthPage() {
  return <AuthModal isOpen={true} onClose={() => {}} />;
}
