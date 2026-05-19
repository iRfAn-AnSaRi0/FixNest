import Container from "./Container";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useCategories } from "../../context/CategoryContext";

const Footer = () => {

    const { categories } = useCategories();

    return (
        <footer className="bg-text text-gray-400 pt-16 pb-8">

            <Container>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">


                    <div className="lg:col-span-2">
                        <Link to="/">
                            <span className="font-semibold text-white font-heading text-4xl">
                                Fix<span className="text-accent font-bold">Nest</span>
                            </span>
                        </Link>
                        <p className="text-xs mt-2 max-w-xs font-sans leading-relaxed">
                            Home Services Platform connecting homeowners with trusted professionals.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <Link to="https://www.facebook.com/share/193bmyAMz2/?mibextid=wwXIfr" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent hover:text-white transition"> <FaFacebookF size={14} /> </Link>
                            <Link to="https://www.instagram.com/fixnest_official" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent hover:text-white transition"> <FaInstagram size={14} /> </Link>
                            <Link to="" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent hover:text-white transition"> <FaTwitter size={14} /> </Link>
                            <Link to="" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent hover:text-white transition"> <FaLinkedinIn size={14} /> </Link>
                        </div>

                    </div>



                    <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-4">
                            Services
                        </h3>

                        <ul className="space-y-2 text-xs font-sans">
                            {categories.map((cat) => (
                                <li key={cat._id}>
                                    <Link
                                        to={`/services/${cat.name.toLowerCase().replace(/\s+/g, "-")}/${cat._id}`}
                                        className="hover:text-white transition"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>



                    <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-4">
                            Company
                        </h3>

                        <ul className="space-y-2 text-xs font-sans">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
                        </ul>
                    </div>



                    <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-4">
                            Support
                        </h3>

                        <ul className="space-y-2 text-xs font-sans">
                            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
                            <li><Link to="/help" className="hover:text-white transition">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact Support</Link></li>
                        </ul>
                    </div>



                    <div>
                        <h3 className="font-heading text-base font-semibold text-white mb-4">
                            For Professionals
                        </h3>

                        <ul className="space-y-2 text-xs font-sans">
                            <li><Link to="#" className="hover:text-white transition">Join as Technician</Link></li>
                            <li><Link to="#" className="hover:text-white transition">Partner with FixNest</Link></li>
                            <li><Link to="#" className="hover:text-white transition">Technician Login</Link></li>
                        </ul>
                    </div>

                </div>



                <div className="border-t border-white/10 mt-14 font-sans  pt-6 text-center text-xs text-gray-400">

                    <p>© 2026 FixNest. All rights reserved.</p>

                    <p className="mt-2">
                        <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-conditions">Terms of Service</Link>
                    </p>

                </div>

            </Container>

        </footer>
    );
};

export default Footer;