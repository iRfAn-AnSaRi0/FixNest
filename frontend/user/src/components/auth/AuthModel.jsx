import { useEffect, useState } from "react";
import Model from "../ui/Model";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm";

const AuthModal = ({ open, onClose, initialStep }) => {
  const [step, setStep] = useState(initialStep);
  const [email, setEmail] = useState("");
  const [authType, setAuthType] = useState(initialStep);


  useEffect(() => {
    if (open) {
      setStep(initialStep);
      setAuthType(initialStep);
    }
  }, [open, initialStep])

  // HANDLE LOGIN
  const handleLogin = (email) => {
    setEmail(email);
    setAuthType("login")
    setStep("otp");
  };

  // HANDLE SIGNUP
  const handleSignup = (data) => {
    setEmail(data.email);
    setAuthType("register");
    setStep("otp");
  };

  return (
    <Model open={open} onClose={onClose}>

      {step === "login" && (
        <LoginForm
          onClose={onClose}
          onSubmit={handleLogin}
          switchToSignup={() => {
            setAuthType("register");
            setStep("register");
          }}
          initialStep={step}
        />
      )}

      {step === "register" && (
        <SignupForm
          onClose={onClose}
          onSubmit={handleSignup}
          switchToLogin={() =>{
            setAuthType("login")
             setStep("login")
          }}
          initialStep={step}
        />
      )}

      {step === "otp" && (
        <OtpForm
          email={email}
          onClose={onClose}
          onBack={() => setStep(authType)}
          onVerify={(otp) => console.log("OTP:", otp)}
          onResend={() => console.log("Resend OTP")}
          initialStep={authType}
        />
      )}

    </Model>
  );
};

export default AuthModal;