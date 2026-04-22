import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { signupVerifyOtp, reSendOtp, loginVerifyOtp } from "../../services/OtpApi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ email, onResend, onBack, onClose, initialStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const { setUser, redirectData, setRedirectData, setOpenAuth, setAccessDenied } = useAuth();


    // ⏱ TIMER
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // HANDLE INPUT
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    // BACKSPACE
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };


    // SUBMIT

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalopt = otp.join("");
        setLoading(true)
        try {
            if (initialStep === "register") {
                const res = await signupVerifyOtp({ email, otp: finalopt })
                if (res.data.statusCode === 200) {
                    toast.success(res.data.message);
                    setUser(res.data.data.user);
                     localStorage.setItem("token", res.data.data.token);
                    onClose();
                    if (redirectData && redirectData.path) {
                        navigate(redirectData.path, {
                            state: redirectData.state   // 👈 pass state
                        }); // 👈 REDIRECT HERE
                        setRedirectData(null);    // clear after use
                    } else {
                        navigate("/"); // fallback
                    }

                }
            } else if (initialStep === "login") {
                const res = await loginVerifyOtp({ email, otp: finalopt })
                if (res.data.statusCode === 200) {
                    toast.success(res.data.message);
                    const user = res.data.data.user;

                    if (user.role !== "user") {
                        setAccessDenied(true);
                        setUser(null);   // 🔥 IMPORTANT
                        return;
                    }

                    setAccessDenied(false); // 🔥 IMPORTANT
                    setUser(user);
                    localStorage.setItem("token", res.data.data.token);
                    onClose();
                    if (redirectData && redirectData.path) {
                        navigate(redirectData.path, {
                            state: redirectData.state   // 👈 pass state
                        });   // 👈 REDIRECT HERE
                        setRedirectData(null);    // clear after use
                    } else {
                        navigate("/"); // fallback
                    }

                }
            }

        } catch (error) {
            // console.error(error.response.status)
            // console.error(error.response.statusText)
            // console.log(error);
            toast.error(error.response?.data?.message || "OTP verification failed");


        } finally {
            setLoading(false)
        }

    };

    // RESEND
    const handleResend = async () => {
        if (timer === 0) {
            setTimer(60);
            onResend();
        }

        try {
            const res = await reSendOtp({ email, type: initialStep })

            if (res.data.statusCode === 200) {
                toast.success(res.data.message);
            }

            console.log(res.data);

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="relative w-full max-w-xs mx-auto">

            <button
                onClick={onClose}
                disabled={loading}
                className="absolute top-0 right-0 text-muted hover:text-text text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ✕
            </button>

            <div className="text-center">
                <h2 className="text-xl font-semibold text-text pb-6">
                    Verify OTP
                </h2>

                <p className="text-center text-sm text-muted mb-6">
                    Enter the 6-digit code sent to <br />
                    <span className="font-medium text-text">
                        {email}
                    </span>{" "}
                    <button
                        onClick={onBack}
                        disabled={loading}
                        className="ml-2 text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Edit
                    </button>
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* OTP BOXES */}
                <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            disabled={loading}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="
                w-11 h-12 text-center text-lg font-medium
                border border-border rounded-lg
                outline-none transition

                focus:border-accent
                focus:ring-2 focus:ring-accent/20
              "
                        />
                    ))}
                </div>

                {/* VERIFY BUTTON */}

                <Button variant="accent" disabled={loading} className="w-full">
                    {/* {loading ? "Verifying..." : "Verify"} */}
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Verifying...
                        </>
                    ) : (
                        "Verify"
                    )}
                </Button>

            </form>

            {/* RESEND SECTION */}
            <div className="text-center mt-5 text-sm text-muted">
                {timer > 0 ? (
                    <p>Resend OTP in {timer}s</p>
                ) : (
                    <p
                        onClick={handleResend}
                        disabled={loading}
                        className="text-accent font-medium hover:underline cursor-pointer disable:"
                    >
                        Resend OTP
                    </p>
                )}
            </div>

        </div>
    );
};

export default OtpForm;