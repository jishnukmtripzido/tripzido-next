"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import LoginModal from "@/components/features/auth/LoginModal";

type AuthContextValue = {
  isLoggedIn: boolean;
  userName: string | null;
  /** Opens the login modal. Pass "register" to land on the register tab. */
  openLoginModal: (mode?: "login" | "register") => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  isLoggedIn,
  userName,
  children,
}: {
  isLoggedIn: boolean;
  userName: string | null;
  children: ReactNode;
}) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"login" | "register">("login");

  const openLoginModal = useCallback((mode: "login" | "register" = "login") => {
    setInitialMode(mode);
    setLoginOpen(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, openLoginModal }}>
      {children}

      {/* Single LoginModal instance for the whole app */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialMode={initialMode}
      />
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
