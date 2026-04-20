import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { updateProfileApi } from "../../services/UserApi"
import { useAuth } from "../../context/AuthContext";

const UpdateProfileForm = ({ type, onClose}) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useAuth();

    // ✅ PREFILL
    useEffect(() => {
        if (type === "name") setValue(user?.name || "");
        if (type === "phone") setValue(user?.phone || "");
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

        setLoading(true);
        try {
            const payload =
                type === "name"
                    ? { name: value }
                    : { phone: value };

            const res = await updateProfileApi(payload);

            toast.success(res.data.message);

            // 🔥 OPTIONAL: update user in context (important)
            // setUser(prev => ({ ...prev, ...res.data.data }));

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
                <h2 className="font-heading text-xl font-semibold text-primary">
                    {type === "name" ? "Change Name" : "Change Phone"}
                </h2>

                <p className="text-sm text-muted mt-1">
                    {type === "name"
                        ? "Update your full name"
                        : "Enter new phone number"}
                </p>
            </div>

            {/* 🔥 FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

                <Input
                    label={type === "name" ? "Full Name" : "Phone Number"}
                    type={type === "phone" ? "tel" : "text"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

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