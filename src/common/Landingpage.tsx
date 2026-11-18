import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    UtensilsCrossed,
    Sparkles,
    TrendingUp,
    MapPin,
    QrCode,
    Heart,
    ArrowRight,
    CheckCircle2,
    ChefHat,
    Star,
} from "lucide-react";

type AudienceTab = "restaurants" | "foodies";

export default function LandingPage() {


    const [activeTab, setActiveTab] = useState<AudienceTab>("restaurants");

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: (delay: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="min-h-screen bg-[#FAF6F0] text-[#2B1D17] font-sans selection:bg-[#C48A5A] selection:text-[#FAF6F0] overflow-x-hidden">
            {/* NAVBAR */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF6F0]/85 border-b border-[#E7D6C1]"
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#2B1D17] flex items-center justify-center text-[#C48A5A] shadow-md">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#2B1D17]">
                            Dres<span className="text-[#C48A5A]">to</span>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B4A3A]">
                        <a href="#features" className="hover:text-[#2B1D17] transition-colors">
                            Platform
                        </a>
                        <a href="#experience" className="hover:text-[#2B1D17] transition-colors">
                            Dual Experience
                        </a>
                        <a href="#pricing" className="hover:text-[#2B1D17] transition-colors">
                            Pricing
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-[#6B4A3A] hover:text-[#2B1D17] transition-colors">
                            Sign In
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-5 py-2.5 rounded-full bg-[#2B1D17] text-[#FAF6F0] text-sm font-semibold hover:bg-[#6B4A3A] transition-colors shadow-sm"
                        >
                            Get Started
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* HERO SECTION */}
            <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 px-6">
                {/* Subtle Warm Glow Background */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#E7D6C1]/60 rounded-full blur-3xl -z-10 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Copy */}
                    <div className="lg:col-span-7 space-y-7">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E7D6C1]/70 border border-[#C48A5A]/30 text-[#6B4A3A] text-xs font-semibold uppercase tracking-wider"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#C48A5A]" />
                            Where Kitchens Meet Cravings
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2B1D17] leading-[1.1]"
                        >
                            One Smart Table for{" "}
                            <span className="text-[#C48A5A]">Restaurants</span> &amp;{" "}
                            <span className="underline decoration-[#E7D6C1] decoration-8 underline-offset-4">
                                Foodies.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-lg text-[#6B4A3A] max-w-xl leading-relaxed"
                        >
                            Streamline table turns, AI menu engineering, and instant QR ordering for
                            hospitality teams—while giving diners personalized dish discovery and
                            effortless loyalty rewards.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.3}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-4 rounded-full bg-[#C48A5A] text-[#FAF6F0] font-semibold text-base flex items-center gap-2 shadow-lg shadow-[#C48A5A]/25 hover:bg-[#b37949] transition-colors"
                            >
                                Launch Your Restaurant
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-7 py-4 rounded-full bg-[#E7D6C1] text-[#2B1D17] font-semibold text-base hover:bg-[#dcc6ab] transition-colors"
                            >
                                Explore Foodie App
                            </motion.button>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.4}
                            className="pt-4 flex items-center gap-6 text-sm text-[#6B4A3A]"
                        >
                            <div className="flex items-center gap-1 text-[#C48A5A]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span>
                                Trusted by <strong className="text-[#2B1D17]">1,400+</strong> cafés,
                                bistros &amp; <strong className="text-[#2B1D17]">85k</strong> diners
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Interactive Floating Dashboard Mockup */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative bg-[#2B1D17] text-[#FAF6F0] rounded-3xl p-6 shadow-2xl border border-[#6B4A3A]/50"
                        >
                            {/* Top Card Header */}
                            <div className="flex items-center justify-between pb-5 border-b border-[#6B4A3A]/40">
                                <div>
                                    <p className="text-xs text-[#E7D6C1]/70 uppercase tracking-wider">
                                        Live Service Pulse
                                    </p>
                                    <h3 className="text-lg font-bold text-[#FAF6F0]">
                                        Roast &amp; Rye Kitchen
                                    </h3>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-[#C48A5A]/20 text-[#C48A5A] text-xs font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#C48A5A] animate-pulse" />
                                    Peak Hour
                                </span>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 my-5">
                                <div className="p-4 rounded-2xl bg-[#6B4A3A]/30 border border-[#6B4A3A]/40">
                                    <p className="text-xs text-[#E7D6C1]">Tonight&apos;s Revenue</p>
                                    <p className="text-2xl font-bold text-[#FAF6F0] mt-1">₹1,48,900</p>
                                    <span className="text-xs text-[#C48A5A] font-medium">
                                        +18.4% vs last Fri
                                    </span>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#6B4A3A]/30 border border-[#6B4A3A]/40">
                                    <p className="text-xs text-[#E7D6C1]">Avg Table Turn</p>
                                    <p className="text-2xl font-bold text-[#FAF6F0] mt-1">42 mins</p>
                                    <span className="text-xs text-[#C48A5A] font-medium">
                                        94% occupancy
                                    </span>
                                </div>
                            </div>

                            {/* Trending Dish Pill */}
                            <div className="p-4 rounded-2xl bg-[#E7D6C1] text-[#2B1D17] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#2B1D17] text-[#C48A5A] flex items-center justify-center">
                                        <ChefHat className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#6B4A3A]">
                                            #1 Foodie Craving Tonight
                                        </p>
                                        <p className="text-sm font-bold">
                                            Smoked Caramel Cortado &amp; Brioche
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#C48A5A] text-[#FAF6F0]">
                                    64 orders
                                </span>
                            </div>
                        </motion.div>

                        {/* Floating Notification Badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-[#FAF6F0] border border-[#E7D6C1] px-4 py-3 rounded-2xl shadow-xl"
                        >
                            <div className="w-9 h-9 rounded-full bg-[#C48A5A]/20 text-[#C48A5A] flex items-center justify-center">
                                <Heart className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#2B1D17]">
                                    Aarav redeemed 500 pts
                                </p>
                                <p className="text-[11px] text-[#6B4A3A]">
                                    Free Tiramisu unlocked at Table 04
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* DUAL AUDIENCE TOGGLE SECTION */}
            <section id="experience" className="py-24 px-6 bg-[#E7D6C1]/45 border-y border-[#E7D6C1]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#2B1D17]">
                            Built for Both Sides of the Pass
                        </h2>
                        <p className="text-[#6B4A3A]">
                            Switch views to see how CraveOS powers kitchen operations and delights
                            everyday food explorers.
                        </p>

                        {/* Interactive Pill Switch */}
                        <div className="inline-flex p-1.5 rounded-full bg-[#E7D6C1] border border-[#C48A5A]/30 mt-4">
                            {(["restaurants", "foodies"] as AudienceTab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-colors ${activeTab === tab ? "text-[#FAF6F0]" : "text-[#6B4A3A]"
                                        }`}
                                >
                                    {activeTab === tab && (
                                        <motion.span
                                            layoutId="audiencePill"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            className="absolute inset-0 rounded-full bg-[#2B1D17] -z-0"
                                        />
                                    )}
                                    <span className="relative z-10">
                                        For {tab === "restaurants" ? "Restaurants" : "Foodies"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Animated Tab Content */}
                    <div className="mt-14">
                        <AnimatePresence mode="wait">
                            {activeTab === "restaurants" ? (
                                <motion.div
                                    key="restaurants"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.35 }}
                                    className="grid md:grid-cols-3 gap-6"
                                >
                                    {[
                                        {
                                            icon: QrCode,
                                            title: "Zero-App QR Ordering",
                                            desc: "Guests scan, customize spice or dietary notes, and split bills in 15 seconds—boosting average order value by 22%.",
                                        },
                                        {
                                            icon: TrendingUp,
                                            title: "AI Menu & Margin Insights",
                                            desc: "Identify high-margin hero dishes and automatically spotlight slow-moving specials during off-peak hours.",
                                        },
                                        {
                                            icon: ChefHat,
                                            title: "Unified Kitchen Display",
                                            desc: "Sync dine-in, takeaway, and direct delivery orders on one calm, color-coded screen with zero ticket chaos.",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-7 rounded-3xl bg-[#FAF6F0] border border-[#E7D6C1] shadow-sm hover:border-[#C48A5A] transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-[#2B1D17] text-[#C48A5A] flex items-center justify-center mb-5">
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#2B1D17] mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-[#6B4A3A] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="foodies"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.35 }}
                                    className="grid md:grid-cols-3 gap-6"
                                >
                                    {[
                                        {
                                            icon: MapPin,
                                            title: "Craving-First Discovery",
                                            desc: "Search by specific dish mood—like 'flaky sourdough' or 'authentic wood-fired'—curated by verified local foodies.",
                                        },
                                        {
                                            icon: Heart,
                                            title: "Universal Taste Passport",
                                            desc: "Earn roasted-bean rewards across every partner café and bistro with a single unified wallet.",
                                        },
                                        {
                                            icon: Sparkles,
                                            title: "Live Waitlist & Table Drops",
                                            desc: "Join queues remotely and get instant alerts when last-minute Friday night tables open up nearby.",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-7 rounded-3xl bg-[#FAF6F0] border border-[#E7D6C1] shadow-sm hover:border-[#C48A5A] transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-[#C48A5A] text-[#FAF6F0] flex items-center justify-center mb-5">
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#2B1D17] mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-[#6B4A3A] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* DARK ESPRESSO CTA BANNER */}
            <section id="pricing" className="py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto rounded-[2.5rem] bg-[#2B1D17] text-[#FAF6F0] p-10 sm:p-16 relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative Mocha & Caramel Orbs */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#6B4A3A]/40 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C48A5A]/20 blur-2xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl space-y-6">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-[#6B4A3A] text-[#E7D6C1] text-xs font-semibold tracking-wide uppercase">
                            14-Day Free Trial • No Hardware Lock-in
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                            Ready to serve a warmer, smarter dining experience?
                        </h2>
                        <p className="text-[#E7D6C1]/85 text-base sm:text-lg">
                            Set up your digital menu in under 10 minutes or download the CraveOS
                            app to unlock hidden culinary gems in your city.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 rounded-full bg-[#C48A5A] text-[#FAF6F0] font-bold text-base hover:bg-[#b37949] transition-colors shadow-lg"
                            >
                                Start Free Restaurant Trial
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 rounded-full border border-[#6B4A3A] text-[#E7D6C1] font-semibold text-base hover:bg-[#6B4A3A]/30 transition-colors"
                            >
                                Book a Live Demo
                            </motion.button>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#E7D6C1]/80">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#C48A5A]" /> Instant UPI &amp; Card Split-Pay
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#C48A5A]" /> Zero Commission Direct Orders
                            </span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#E7D6C1] py-10 px-6 text-sm text-[#6B4A3A]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-bold text-[#2B1D17]">
                        <UtensilsCrossed className="w-4 h-4 text-[#C48A5A]" />
                        <span>CraveOS</span>
                    </div>
                    <p>© {new Date().getFullYear()} CraveOS Technologies. Brewed with warmth.</p>
                </div>
            </footer>
        </div>
    );
}