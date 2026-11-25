import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Building2,
    Eye,
    EyeOff,
    FileText,
    Hash,
    Lock,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";
import axios from "axios";

import { useAuthStore } from "../features/auth/auth.store";
import type { HotelOwner } from "../features/auth/auth.types";

type OwnerRegisterPayload = Omit<HotelOwner, "id" | "role"> & {
    registration_number: string;
    gst_number: string;
    password: string;
};

type OwnerLoginPayload = Pick<HotelOwner, "email"> & { password: string };

const emptyForm: OwnerRegisterPayload = {
    owner_name: "",
    hotel_name: "",
    registration_number: "",
    gst_number: "",
    email: "",
    phone: "",
    password: "",
};

export default function HotelOwnerAuthCard() {
    const navigate = useNavigate();
    const location = useLocation();

    const isRegister = location.pathname === "/owner/register";

    const hotelOwnerRegister = useAuthStore((s) => s.ownerRegister);
    const hotelOwnerLogin = useAuthStore((s) => s.ownerLogin);

    const [formData, setFormData] = useState<OwnerRegisterPayload>(emptyForm);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const message = (
            location.state as { registrationMessage?: string } | null
        )?.registrationMessage;
        setSuccess(message ?? "");
    }, [location.state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "gst_number" ? value.toUpperCase() : value,
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isRegister) {
                const payload: OwnerRegisterPayload = {
                    owner_name: formData.owner_name.trim(),
                    hotel_name: formData.hotel_name.trim(),
                    registration_number: formData.registration_number.trim(),
                    gst_number: formData.gst_number.trim().toUpperCase(),
                    email: formData.email.trim().toLowerCase(),
                    phone: formData.phone.trim(),
                    password: formData.password,
                };

                await hotelOwnerRegister(payload);
                setFormData(emptyForm);

                navigate("/owner/login", {
                    replace: true,
                    state: {
                        registrationMessage: "Registration successful. Please log in.",
                    },
                });
            } else {
                const payload: OwnerLoginPayload = {
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                };

                await hotelOwnerLogin(payload);
                navigate("/owner/dashboard", { replace: true });
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        "Something went wrong. Please try again."
                );
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAuthSwitch = () => {
        setError("");
        setSuccess("");
        setShowPassword(false);
        setFormData(emptyForm);
        navigate(isRegister ? "/owner/login" : "/owner/register");
    };

    const inputClass =
        "w-full pl-9 pr-3 py-2 rounded-xl bg-[#E7D6C1]/30 border border-[#E7D6C1] text-[#2B1D17] text-sm focus:outline-none focus:border-[#C48A5A]";
    const labelClass = "block text-xs font-semibold text-[#6B4A3A] mb-1";
    const iconClass =
        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/60";

    return (
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 sm:p-6 font-sans">
            <div className="relative w-full max-w-5xl min-h-[680px] bg-[#FAF6F0] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#8dd6a4]/45 flex">
                {/* BRANDING PANEL (Desktop only) */}
                <motion.div
                    initial={false}
                    animate={{ x: isRegister ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:flex absolute top-0 bottom-0 left-0 w-1/2 rounded-[2.5rem] overflow-hidden text-[#FAF6F0] z-20 p-10 lg:p-12 flex-col justify-between bg-gradient-to-br from-[#206837] to-[#40793b] shadow-2xl"
                >
                    <div className="absolute top-1/3 -left-20 w-64 h-64 bg-[#C48A5A]/15 rounded-full blur-3xl pointer-events-none" />

                    <p className="text-xs text-[#e4e1dd] tracking-widest uppercase font-medium">
                        {isRegister ? "Partner with CraveOS" : "Owner portal"}
                    </p>

                    <div className="my-auto py-6 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isRegister ? "reg-text" : "login-text"}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                    {isRegister ? (
                                        <>
                                            List your hotel <br />
                                            <span className="text-[#ffffff]">in minutes</span>
                                        </>
                                    ) : (
                                        <>
                                            Run your hotel <br />
                                            <span className="text-[#ffffff]">with ease</span>
                                        </>
                                    )}
                                </h1>
                                <p className="text-sm text-[#e4e1dd]/80 max-w-xs leading-relaxed">
                                    {isRegister
                                        ? "Create your owner account to manage bookings, rooms, staff and revenue in one place."
                                        : "Sign in to track bookings, manage rooms and see how your property is performing."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#e4e1dd] pt-6 border-t border-[#6B4A3A]/40">
                        <span>© {new Date().getFullYear()} Dresto</span>
                        <div className="flex items-center gap-1.5 text-[#e4e1dd]">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secure 256-Bit</span>
                        </div>
                    </div>
                </motion.div>

                {/* FORM PANEL */}
                <motion.div
                    initial={false}
                    animate={{ x: isRegister ? "-100%" : "0%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full md:w-1/2 md:ml-[50%] max-md:!transform-none bg-[#FAF6F0] text-[#5E6B23] z-10 p-6 sm:p-10 flex flex-col justify-between"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1b7712] flex items-center justify-center text-[#FAF6F0] font-bold text-sm shadow-md">
                                C
                            </div>
                            <span className="font-bold text-lg tracking-tight">CraveOS</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleAuthSwitch}
                            className="px-4 py-1.5 rounded-full bg-[#1b7712] hover:bg-[#a1c69f] text-xs text-white font-semibold transition-colors"
                        >
                            {isRegister ? "Sign In" : "Sign Up"}
                        </button>
                    </div>

                    {/* FORM CONTENT */}
                    <div className="max-w-md w-full mx-auto my-auto py-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isRegister ? "register-form" : "login-form"}
                                initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRegister ? -20 : 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-4">
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        {isRegister ? "Create Owner Account" : "Owner Sign In"}
                                    </h2>
                                    <p className="text-xs text-[#6B4A3A] mt-1">
                                        {isRegister
                                            ? "Tell us about you and your property."
                                            : "Welcome back! Please enter your details."}
                                    </p>
                                </div>

                                {success && (
                                    <div
                                        role="status"
                                        className="mb-3 p-3 rounded-xl bg-green-100 text-green-800 text-xs"
                                    >
                                        {success}
                                    </div>
                                )}

                                {error && (
                                    <div
                                        role="alert"
                                        className="mb-3 p-3 rounded-xl bg-red-100 text-red-700 text-xs"
                                    >
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {isRegister && (
                                        <>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className={labelClass}>Owner Name</label>
                                                    <div className="relative">
                                                        <User className={iconClass} />
                                                        <input
                                                            type="text"
                                                            name="owner_name"
                                                            required
                                                            minLength={2}
                                                            maxLength={100}
                                                            placeholder="Name"
                                                            value={formData.owner_name}
                                                            onChange={handleChange}
                                                            className={inputClass}
                                                            autoComplete="name"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className={labelClass}>Hotel Name</label>
                                                    <div className="relative">
                                                        <Building2 className={iconClass} />
                                                        <input
                                                            type="text"
                                                            name="hotel_name"
                                                            required
                                                            minLength={2}
                                                            maxLength={120}
                                                            placeholder="Enter Hotel Name"
                                                            value={formData.hotel_name}
                                                            onChange={handleChange}
                                                            className={inputClass}
                                                            autoComplete="organization"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className={labelClass}>Reg. Number</label>
                                                    <div className="relative">
                                                        <Hash className={iconClass} />
                                                        <input
                                                            type="text"
                                                            name="registration_number"
                                                            required
                                                            placeholder="Enter your reg no"
                                                            value={formData.registration_number}
                                                            onChange={handleChange}
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className={labelClass}>GST Number</label>
                                                    <div className="relative">
                                                        <FileText className={iconClass} />
                                                        <input
                                                            type="text"
                                                            name="gst_number"
                                                            required
                                                            maxLength={15}
                                                            placeholder="Enter a valid gst number"
                                                            value={formData.gst_number}
                                                            onChange={handleChange}
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div
                                        className={
                                            isRegister
                                                ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                                                : ""
                                        }
                                    >
                                        <div>
                                            <label className={labelClass}>Email Address</label>
                                            <div className="relative">
                                                <Mail className={iconClass} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    maxLength={254}
                                                    placeholder="Enter a vaild email  "
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    autoComplete="email"
                                                />
                                            </div>
                                        </div>

                                        {isRegister && (
                                            <div>
                                                <label className={labelClass}>Phone Number</label>
                                                <div className="relative">
                                                    <Phone className={iconClass} />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        placeholder="Enter phone number"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className={inputClass}
                                                        autoComplete="tel"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Password</label>
                                        <div className="relative">
                                            <Lock className={iconClass} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                required
                                                minLength={8}
                                                maxLength={72}
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`${inputClass} pr-10`}
                                                autoComplete={
                                                    isRegister ? "new-password" : "current-password"
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B4A3A]/60 hover:text-[#2B1D17]"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 px-6 rounded-full bg-[#1b7712]  text-[#FAF6F0] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C48A5A]/25 hover:opacity-95 transition-all mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <span>
                                            {loading
                                                ? "Please wait..."
                                                : isRegister
                                                  ? "Create Account"
                                                  : "Sign In"}
                                        </span>
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between text-xs text-[#6B4A3A] pt-4 border-t border-[#E7D6C1]">
                        {/* <Link to="/login" className="hover:text-[#2B1D17] hover:underline">
                            Are you a customer?
                        </Link> */}
                        <span>© {new Date().getFullYear()} Dresto</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}