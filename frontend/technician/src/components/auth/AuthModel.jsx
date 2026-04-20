import { useEffect, useState } from "react";
import Model from "../ui/Model";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm";
import { techAuth } from "../../context/AuthContext";

const AuthModal = ({ open, onClose, initialStep }) => {
    const [step, setStep] = useState(initialStep);
    const [phone, setPhone] = useState("");
    const [authType, setAuthType] = useState(initialStep);

    const { user } = techAuth();


    useEffect(() => {
        if (open) {
            setStep(initialStep);
            setAuthType(initialStep);
        }
    }, [open, initialStep])

    // HANDLE LOGIN
    const handleLogin = (phoneNumber) => {
        setPhone(phoneNumber);
        setAuthType("login")
        setStep("otp");
    };

    // HANDLE SIGNUP
    const handleSignup = (data) => {
        setPhone(data.phone);
        setAuthType("register");
        setStep("otp");
    };

    return (
        <Model open={open} onClose={onClose} disableOutsideClick={!user}>

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
                    switchToLogin={() => {
                        setAuthType("login")
                        setStep("login")
                    }}
                    initialStep={step}
                />
            )}

            {step === "otp" && (
                <OtpForm
                    phone={phone}
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