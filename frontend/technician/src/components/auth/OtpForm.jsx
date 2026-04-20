import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { signupVerifyOtp, reSendOtp, loginVerifyOtp } from "../../services/OtpApi";
// import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { techAuth } from "../../context/AuthContext";


const OtpForm = ({ phone, onResend, onBack, onClose, initialStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false)
    const { user, setUser, setOpenAuth, setAccessDenied } = techAuth();

    // const { setUser, redirectData, setRedirectData, setOpenAuth } = useAuth();

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
                const res = await signupVerifyOtp({ phone, otp: finalopt })
                console.log(res.data);

                if (res.data.statusCode === 200) {
                    console.log(res.data);
                    setUser(res.data.data.user);
                    console.log("Closing modal...");
                    setOpenAuth(false);

                }
            } else if (initialStep === "login") {
                const res = await loginVerifyOtp({ phone, otp: finalopt })
                console.log(res.data);

                if (res.data.statusCode === 200) {
                    // console.log(res.data.data.user.role);
                    // setUser(res.data.data.user);
                    // setOpenAuth(false);
                    // if (res.data.data.user.role !== "technician") {
                    //     setAccessDenied(true);
                    //     return;
                    // }
                    const user = res.data.data.user;

                    if (user.role !== "technician") {
                        setAccessDenied(true);
                        setUser(null);   // 🔥 IMPORTANT
                        return;
                    }

                    setUser(user);
                    setOpenAuth(false);
                }
            }

        } catch (error) {

            // console.error(error.response?.data || "OTP verification failed");
            console.error("REAL ERROR:", error.response || error);


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
            const res = await reSendOtp({ phone, type: initialStep })

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
                onClick={() => {
                    if (user) onClose(); // ✅ only allow if logged in
                }}
                className={`absolute top-0 right-0 text-lg ${!user ? "opacity-40 cursor-not-allowed" : "hover:text-text"
                    }`}
                disabled={loading}
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
                        {phone}
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