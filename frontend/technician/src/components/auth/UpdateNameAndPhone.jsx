import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { updateProfileApi } from "../../services/UpdateProfile";
import { techAuth } from "../../context/AuthContext";

const UpdateProfileForm = ({ type, onClose }) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        fullAddress: "",
        city: "",
        state: "",
        pincode: ""
    });

    const { user, setUser } = techAuth();

    // ✅ PREFILL
    useEffect(() => {
        if (type === "name") setValue(user?.name || "");
        if (type === "phone") setValue(user?.phone || "");

        if (type === "address") {
            setAddress({
                fullAddress: user?.fullAddress || "",
                city: user?.city || "",
                state: user?.state || "",
                pincode: user?.pincode || ""
            });
        }
    }, [type, user]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (type === "name" && !value) {
    //         return toast.error("Name is required");
    //     }

    //     if (type === "phone" && !/^[0-9]{10}$/.test(value)) {
    //         return toast.error("Enter valid phone number");
    //     }

    //     setLoading(true);
    //     try {
    //         if (type === "name") {
    //             // await updateName({ name: value })
    //             toast.success("Name updated");
    //         }

    //         if (type === "phone") {
    //             // await updatePhone({ phone: value })
    //             toast.success("OTP sent to new number");
    //         }

    //         onClose();
    //     } catch (error) {
    //         toast.error("Something went wrong");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "name" && !value) {
            return toast.error("Name is required");
        }

        if (type === "phone" && !/^[0-9]{10}$/.test(value)) {
            return toast.error("Enter valid phone number");
        }

        if (type === "address") {
            const { fullAddress, city, state, pincode } = address;

            if (!fullAddress || !city || !state || !pincode) {
                return toast.error("All address fields are required");
            }

            if (!/^[0-9]{6}$/.test(pincode)) {
                return toast.error("Enter valid pincode");
            }
        }

        setLoading(true);
        try {
            const payload =
                type === "name"
                    ? { name: value }
                    : type === "phone"
                        ? { phone: value }
                        : address; // ✅ address payload

            const res = await updateProfileApi(payload);

            console.log(res.data.data);

            // 🔥 OPTIONAL: update user in context (important)
            setUser(prev => ({ ...prev, ...res.data.data }));

            // ✅ 🔥 UPDATE GLOBAL USER STATE
            setUser(prev => ({
                ...prev,
                ...res.data.data
            }));

            onClose();

        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">

            {/* ❌ CLOSE */}
            <button
                onClick={onClose}
                className="absolute top-0 right-0 text-muted hover:text-text text-lg"
            >
                ✕
            </button>

            {/* 🔥 HEADER */}
            <div className="text-center mb-6">
                <h2>
                    {type === "name"
                        ? "Change Name"
                        : type === "phone"
                            ? "Change Phone"
                            : "Update Address"}
                </h2>

                <p className="text-sm text-muted mt-1">
                    {type === "name"
                        ? "Update your full name"
                        : type === "phone"
                            ? "Enter new phone number"
                            : "Update your address"}
                </p>
            </div>

            {/* 🔥 FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {type === "address" ? (
                    <>
                        <Input
                            label="Full Address"
                            value={address.fullAddress}
                            onChange={(e) =>
                                setAddress({ ...address, fullAddress: e.target.value })
                            }
                        />

                        <Input
                            label="City"
                            value={address.city}
                            onChange={(e) =>
                                setAddress({ ...address, city: e.target.value })
                            }
                        />

                        <Input
                            label="State"
                            value={address.state}
                            onChange={(e) =>
                                setAddress({ ...address, state: e.target.value })
                            }
                        />

                        <Input
                            label="Pincode"
                            value={address.pincode}
                            onChange={(e) =>
                                setAddress({ ...address, pincode: e.target.value })
                            }
                        />
                    </>
                ) : (
                    <Input
                        label={type === "name" ? "Full Name" : "Phone Number"}
                        type={type === "phone" ? "tel" : "text"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                )}

                <Button variant="accent" disabled={loading} className="w-full">
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Updating...
                        </>
                    ) : (
                        "Update"
                    )}
                </Button>

            </form>

        </div>
    );
};

export default UpdateProfileForm;