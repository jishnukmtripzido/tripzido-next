export type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SendOtpResponse = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

export type VerifyOtpPayload = {
  phone_number: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type AuthActionResult = {
  success: boolean;
  message: string;
};
