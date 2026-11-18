
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { useAuthStore } from "../features/auth/auth.store";
import axios from "axios";

export default function AuthCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === "/register";

  // Zustand actions
  const customerRegister = useAuthStore(
    (state) => state.customerRegister
  );

  const customerLogin = useAuthStore(
    (state) => state.customerLogin
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(
    (location.state as { registrationMessage?: string } | null)
      ?.registrationMessage || ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        // CUSTOMER REGISTRATION
        await customerRegister({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          ...(formData.phone.trim()
            ? { phone: formData.phone.trim() }
            : {}),
        });
    
        // Registration does not automatically log in.
        navigate("/login", {
          replace: true,
          state: {
            registrationMessage: "Registration successful. Please log in.",
          },
        });
      } else {
        // CUSTOMER LOGIN
        await customerLogin({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        // Change this to your actual protected customer route.
        navigate("/dashboard", { replace: true });
      }
    } catch (err: unknown) {
    // Log complete error for debugging
    console.error("AuthCard Error:", err);

    if (axios.isAxiosError(err)) {
        console.error("API Error Response:", err.response?.data);
        console.error("API Status:", err.response?.status);
        console.error("API URL:", err.config?.url);

        setError(
            err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
    } else if (err instanceof Error) {
        console.error("Error Message:", err.message);
        setError(err.message);
    } else {
        setError("Something went wrong. Please try again.");
    }
} finally {
    setLoading(false);
}
  }

  const handleAuthSwitch = () => {
    setError("");
    setSuccess("");
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    navigate(isRegister ? "/login" : "/register");
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E7D6C1]/30 border border-[#E7D6C1] text-[#2B1D17] text-sm focus:outline-none focus:border-[#C48A5A]";

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="relative w-full max-w-5xl h-[620px] bg-[#FAF6F0] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#6B4A3A]/45">

        {/* BRANDING PANEL */}
        <motion.div
          initial={false}
          animate={{ x: isRegister ? "100%" : "0%" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-[2.5rem] overflow-hidden bg-[#2B1D17] text-[#FAF6F0] z-20 p-10 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#2B1D17] to-[#1a110e] shadow-2xl"
        >
          <div className="absolute top-1/3 -left-20 w-64 h-64 bg-[#C48A5A]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            <p className="text-xs text-[#E7D6C1]/70 tracking-widest uppercase font-medium">
              {isRegister
                ? "Start your journey with us"
                : "Global payments made simple"}
            </p>
          </div>

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
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#FAF6F0]">
                  {isRegister ? (
                    <>
                      Create your <br />
                      <span className="text-[#C48A5A]">
                        future today
                      </span>
                    </>
                  ) : (
                    <>
                      Manage <br />
                      <span className="text-[#C48A5A]">
                        your money
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-sm text-[#E7D6C1]/80 max-w-xs leading-relaxed">
                  {isRegister
                    ? "Join thousands of users managing transactions and growing effortlessly with CraveOS."
                    : "Experience seamless cross-border transfers, unified dashboards, and secure financial growth."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between text-xs text-[#E7D6C1]/60 pt-6 border-t border-[#6B4A3A]/40">
            <span>© {new Date().getFullYear()} CraveOS Inc.</span>
            <div className="flex items-center gap-1.5 text-[#C48A5A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure 256-Bit</span>
            </div>
          </div>
        </motion.div>

        {/* FORM PANEL */}
        <motion.div
          initial={false}
          animate={{ x: isRegister ? "-100%" : "0%" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-0 bottom-0 left-1/2 w-1/2 bg-[#FAF6F0] text-[#2B1D17] z-10 p-10 sm:p-12 flex flex-col justify-between"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C48A5A] flex items-center justify-center text-[#FAF6F0] font-bold text-sm shadow-md">
                C
              </div>
              <span className="font-bold text-lg tracking-tight text-[#2B1D17]">
                CraveOS
              </span>
            </div>

            <button
              type="button"
              onClick={handleAuthSwitch}
              className="px-4 py-1.5 rounded-full bg-[#E7D6C1]/60 hover:bg-[#E7D6C1] text-xs font-semibold text-[#2B1D17] transition-colors"
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* FORM CONTENT */}
          <div className="max-w-sm w-full mx-auto my-auto py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={isRegister ? "register-form" : "login-form"}
                initial={{
                  opacity: 0,
                  x: isRegister ? 20 : -20,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: isRegister ? -20 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1D17] tracking-tight">
                    {isRegister ? "Create Account" : "Sign In"}
                  </h2>

                  <p className="text-xs text-[#6B4A3A] mt-1">
                    {isRegister
                      ? "Enter your details to register a new account."
                      : "Welcome back! Please enter your details."}
                  </p>
                </div>

                {/* SUCCESS MESSAGE */}
                {success && (
                  <div
                    role="status"
                    className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 text-xs"
                  >
                    {success}
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                  <div
                    role="alert"
                    className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-xs"
                  >
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >
                  {isRegister && (
                    <div>
                      <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                        Full Name
                      </label>

                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/60" />

                        <input
                          type="text"
                          name="name"
                          required
                          minLength={2}
                          maxLength={100}
                          placeholder="Aarav Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputClass}
                          autoComplete="name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/60" />

                      <input
                        type="email"
                        name="email"
                        required
                        maxLength={254}
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {isRegister && (
                    <div>
                      <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/60" />

                        <input
                          type="tel"
                          name="phone"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Password
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/60" />

                      <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={72}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete={
                          isRegister
                            ? "new-password"
                            : "current-password"
                        }
                      />
                    </div>
                  </div>

                  {!isRegister && (
                    <div className="flex justify-end">
                      <a
                        href="#forgot"
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-[#C48A5A] hover:underline font-medium"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#C48A5A] to-[#b37949] text-[#FAF6F0] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C48A5A]/25 hover:opacity-95 transition-all mt-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>
                      {loading
                        ? "Please wait..."
                        : isRegister
                          ? "Create Account"
                          : "Sign In"}
                    </span>

                    {!loading && (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between text-xs text-[#6B4A3A] pt-4 border-t border-[#E7D6C1]">
            <span>© {new Date().getFullYear()} CraveOS Inc.</span>

            <div className="flex items-center gap-4">
              <a href="#contact" className="hover:text-[#2B1D17]">
                Contact Us
              </a>
              <span>English</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
