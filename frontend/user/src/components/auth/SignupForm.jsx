import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { signup } from "../../services/SignupAndLoginApi";
import toast from "react-hot-toast";

const SignupForm = ({ onClose, switchToLogin, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      return setError("All fields are required");
    }

    if (name.length < 3) {
      return setError("Name must be at least 3 characters");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return setError("Enter valid 10-digit phone number");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Enter a valid email address");

    setLoading(true)

    try {
      const res = await signup({ name, email, phone })
      // console.log(res.data.message);
      toast.success(res.data.message);
      onSubmit({ name, email, phone }) // 🔥 GO TO OTP
    } catch (error) {
      // console.error(error.response?.data?.message || "Something went wrong")
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // 🔥 stop loading ALWAYS
    }

  };

  return (
    <div className="relative">


      <button
        onClick={onClose}
        disabled={loading}
        className="absolute top-0 right-0 text-muted hover:text-text text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ✕
      </button>
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Fix<span className="text-accent">Nest</span>
        </h2>
        <p className="text-sm text-muted mt-1">
          Create your account to get started
        </p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-5">

        <Input
          label="Full Name"
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          disabled={loading}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}

        <Button variant="accent" disabled={loading} className="w-full">
          {/* {loading ? "Sending OTP..." : "Continue"} */}
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Sending OTP...
            </>
          ) : (
            "Continue"
          )}
        </Button>

      </form>


      <p className="text-sm text-center text-muted mt-6">
        Already have an account?{" "}
        <span
          onClick={() => {
            if (!loading) switchToLogin();
          }}
          className={`text-accent font-medium hover:underline ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
          Sign in
        </span>
      </p>

    </div>
  );
};

export default SignupForm;