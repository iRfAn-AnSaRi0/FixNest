import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { signup } from "../../services/SignupAndLoginApi"
import toast from "react-hot-toast";
import { techAuth } from "../../context/AuthContext";

const SignupForm = ({ onClose, switchToLogin, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [technicianType, setTechnicianType] = useState("");
  const [experience, setExperience] = useState("");
  const [idProofType, setIdProofType] = useState("");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [idProofImage, setIdProofImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const { user } = techAuth();

  // 📸 Image upload 
  const handleImageChange = (e) => {
    const file = e.target.files[0]; if (!file)
      return; setIdProofImage(file); setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setIdProofImage(null); setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      return setError("All fields are required");
    }
    if (name.length < 3) {
      return setError("Name must be at least 3 characters");
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return setError("Enter valid 10-digit phone number");
    }
    if (alternatePhone && !/^[6-9]\d{9}$/.test(alternatePhone)) {
      return setError("Invalid alternate phone");
    }
    if (pincode && !/^[0-9]{6}$/.test(pincode)) {
      return setError("Invalid pincode");
    }

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("alternatePhone", alternatePhone);
      formData.append("fullAddress", fullAddress);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);
      formData.append("technicianType", technicianType);
      formData.append("experience", experience);
      formData.append("idProofType", idProofType);
      formData.append("idProofNumber", idProofNumber);
      if (idProofImage) {
        formData.append("idProofImage", idProofImage);
      }
      const res = await signup(formData)
      console.log(res.data);
      //   toast.success(res.data.message);

      // ✅ FAKE SUCCESS
      toast.success("OTP sent successfully");
      onSubmit({ name, phone }) // 🔥 GO TO OTP
    } catch (error) {
      // console.error(error.response?.data?.message || "Something went wrong")
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // 🔥 stop loading ALWAYS
    }

  };

  return (
    <div className="relative max-h-[80vh] flex flex-col overflow-x-hidden px-3 flex-1 custom-scroll">

      <div className="sticky top-0 bg-white z-10 ">
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
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Fix<span className="text-accent">Nest</span>
          </h2>
          <p className="text-sm text-muted mt-1">
            Create your account to get started
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mt-1">
        <Input label="Full Name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} />
        <Input label="Phone Number" type="tel" value={phone} disabled={loading} onChange={(e) => setPhone(e.target.value)} />
        <Input label="Alternate Phone" type="tel" value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} />
        <Input label="Full Address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
        <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
        <Input label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} /> {/* TECHNICIAN */}
        <select value={technicianType} onChange={(e) => setTechnicianType(e.target.value)} className="w-full border p-2 rounded" >
          <option value="">Select Technician Type</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumber">Plumber</option>
          <option value="AC">AC</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Washing Machine">Washing Machine</option>
        </select>
        <Input label="Experience (years)" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
        <select value={idProofType} onChange={(e) => setIdProofType(e.target.value)} className="w-full border p-2 rounded" >
          <option value="">Select ID Proof</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
          <option value="Driving License">Driving License</option>
        </select>
        <Input label="ID Proof Number" value={idProofNumber} onChange={(e) => setIdProofNumber(e.target.value)} />
        <div>
          <label className="block text-sm mb-1">Upload ID Proof</label>
          {!preview ? (<input type="file" accept="image/*" onChange={handleImageChange} />
          ) : (
            <div className="relative"> <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" />
              <button type="button" onClick={removeImage} className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded" > ✕ </button>
            </div>
          )} </div>
        {error && <p className="text-sm text-danger">{error}</p>}
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