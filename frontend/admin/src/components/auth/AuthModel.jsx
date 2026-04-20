import Model from "../ui/Model";
import Login from "./Login";
import { adminAuth } from "../../context/AuthContext";

const AuthModal = ({ open, onClose }) => {
    const { user } = adminAuth();

    return (
        <Model open={open} onClose={onClose} disableOutsideClick={!user}>
            <Login onClose={onClose} />
        </Model>
    );
};

export default AuthModal;