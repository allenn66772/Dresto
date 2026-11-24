
import {
    CreditCard,
    Package,
    Users,
    Heart,
    TrendingUp,
    CheckCircle2,
    Clock,
    Utensils,
} from 'lucide-react';

export default function Landingpage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
            {/* Navigation Bar */}
            

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f8f7] to-white pt-16 pb-24 lg:pt-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left Copy Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                                The All-in-One Operating System for Modern Restaurants.
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                Streamline reservations, POS, staff scheduling, inventory, and
                                online ordering—all in one powerful platform built for
                                restaurants, cafes, and multi-location dining.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <button className="px-7 py-3.5 text-sm font-semibold text-white bg-[#148873] rounded-full hover:bg-[#10705e] shadow-md shadow-teal-900/10 transition-all">
                                    Get Started Free
                                </button>
                                <button className="px-7 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 shadow-sm transition-all">
                                    Watch 2-Min Demo
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="pt-4 space-y-4">
                                <p className="text-xs font-medium text-slate-500">
                                    Trusted by 4,500+ restaurants worldwide
                                </p>
                                <div className="flex flex-wrap items-center gap-6 text-slate-400 grayscale opacity-75">
                                    <span className="font-serif italic font-bold text-sm">Bistro & Co</span>
                                    <span className="font-mono font-bold text-sm tracking-wider">THE OAK</span>
                                    <span className="font-sans font-extrabold text-sm">Delica</span>
                                    <span className="font-serif font-semibold text-sm">Saffron</span>
                                    <span className="font-sans font-bold text-xs uppercase tracking-widest">
                                        Urban Grill
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Device Mockups Column */}
                        <div className="lg:col-span-7 relative">
                            {/* Decorative Background Shapes */}
                            <div className="hidden sm:block absolute -top-6 -right-4 w-40 h-40 bg-[#148873] rounded-3xl -z-0" />
                            <div className="hidden sm:block absolute -bottom-6 left-10 w-32 h-24 bg-amber-400 rounded-2xl -z-0" />

                            {/* Laptop Frame */}
                            <div className="relative z-10 bg-slate-900 rounded-2xl p-2.5 shadow-2xl border border-slate-800">
                                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                                    {/* Mock App Header */}
                                    <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded bg-[#148873] text-white text-xs font-bold flex items-center justify-center">
                                                D
                                            </div>
                                            <span className="font-bold text-xs text-slate-800">Dresto</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 bg-[#148873] text-white text-[10px] font-medium rounded-md">
                                                + New Order
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mock Dashboard Body */}
                                    <div className="grid grid-cols-12 min-h-[310px]">
                                        {/* Sidebar */}
                                        <div className="col-span-3 bg-white border-r border-slate-100 p-3 space-y-2 hidden sm:block">
                                            <div className="px-2.5 py-1.5 rounded-md bg-teal-50 text-[#148873] text-xs font-semibold">
                                                Dashboard
                                            </div>
                                            {['Orders', 'Tables', 'Reservations', 'Inventory', 'Staff', 'Reports'].map(
                                                (item) => (
                                                    <div
                                                        key={item}
                                                        className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                                                    >
                                                        {item}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* Main Metrics Area */}
                                        <div className="col-span-12 sm:col-span-9 p-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-bold text-slate-800">Dashboard</h3>
                                                <span className="text-[11px] text-slate-400">Today, Live View</span>
                                            </div>

                                            {/* KPI Cards */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                                                    <p className="text-[10px] text-slate-400 font-medium">Live Revenue</p>
                                                    <p className="text-base font-bold text-slate-900 mt-0.5">$3,500</p>
                                                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium mt-1">
                                                        <TrendingUp className="w-3 h-3" /> +14.2%
                                                    </span>
                                                </div>

                                                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                                                    <p className="text-[10px] text-slate-400 font-medium">Tables Occupied</p>
                                                    <p className="text-base font-bold text-slate-900 mt-0.5">84%</p>
                                                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                                        <div className="bg-[#148873] h-full w-[84%] rounded-full" />
                                                    </div>
                                                </div>

                                                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                                                    <p className="text-[10px] text-slate-400 font-medium">Active Orders</p>
                                                    <p className="text-base font-bold text-slate-900 mt-0.5">28</p>
                                                    <span className="text-[10px] text-amber-600 font-medium mt-1 block">
                                                        6 in prep
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Floor / Schedule Preview */}
                                            <div className="bg-white p-3.5 rounded-lg border border-slate-100 shadow-xs space-y-2.5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-slate-700">
                                                        Upcoming Reservations
                                                    </span>
                                                    <span className="text-[10px] px-2 py-0.5 bg-teal-50 text-[#148873] rounded font-medium">
                                                        Evening Shift
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-[11px]">
                                                    <div className="p-2 rounded bg-teal-50/70 border border-teal-100">
                                                        <p className="font-semibold text-slate-800">Table 04 • 4 Guests</p>
                                                        <p className="text-slate-500 text-[10px]">7:30 PM • Confirmed</p>
                                                    </div>
                                                    <div className="p-2 rounded bg-amber-50/70 border border-amber-100">
                                                        <p className="font-semibold text-slate-800">Table 11 • 2 Guests</p>
                                                        <p className="text-slate-500 text-[10px]">7:45 PM • VIP</p>
                                                    </div>
                                                    <div className="p-2 rounded bg-slate-50 border border-slate-100">
                                                        <p className="font-semibold text-slate-800">Table 08 • 6 Guests</p>
                                                        <p className="text-slate-500 text-[10px]">8:00 PM • Seated</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Left Card: Kitchen Status */}
                            <div className="hidden md:block absolute -left-8 bottom-8 z-20 w-56 bg-white rounded-xl p-3.5 shadow-xl border border-slate-100">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-xs font-bold text-slate-800">Kitchen Queue</span>
                                    <Utensils className="w-3.5 h-3.5 text-[#148873]" />
                                </div>
                                <div className="space-y-2.5 text-[11px]">
                                    <div>
                                        <div className="flex justify-between text-slate-600 mb-1">
                                            <span>Dine-in Orders</span>
                                            <span className="font-semibold">70%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="w-[70%] h-full bg-[#148873] rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-slate-600 mb-1">
                                            <span>Online Delivery</span>
                                            <span className="font-semibold">20%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="w-[20%] h-full bg-amber-400 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-slate-600 mb-1">
                                            <span>Takeaway</span>
                                            <span className="font-semibold">10%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="w-[10%] h-full bg-sky-400 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Right Mobile Mockup */}
                            <div className="hidden sm:block absolute -right-4 -bottom-8 z-20 w-44 bg-slate-900 rounded-[26px] p-2 shadow-2xl border border-slate-800">
                                <div className="bg-white rounded-[20px] overflow-hidden p-3 space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-900">Dresto Mobile</span>
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="h-16 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-600 p-2 flex flex-col justify-end text-white">
                                        <span className="text-[9px] uppercase tracking-wider opacity-80">
                                            Main Dining
                                        </span>
                                        <span className="text-xs font-bold">14 Active Tables</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-[10px] p-1.5 bg-slate-50 rounded">
                                            <span className="font-medium text-slate-700 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3 text-[#148873]" /> Order #204
                                            </span>
                                            <span className="font-bold text-slate-900">$64.00</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] p-1.5 bg-slate-50 rounded">
                                            <span className="font-medium text-slate-700 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-amber-500" /> Order #205
                                            </span>
                                            <span className="font-bold text-slate-900">$42.50</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-1.5 bg-[#148873] text-white text-[10px] font-semibold rounded-lg">
                                        Open POS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p className="text-sm font-semibold text-[#148873] tracking-wide">
                            Key Features
                        </p>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Everything you need to run a thriving restaurant
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all">
                            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#148873] flex items-center justify-center mb-5">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Smart POS & Ordering
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Contactless tableside ordering, split billing, and instant kitchen
                                ticket routing.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all">
                            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#148873] flex items-center justify-center mb-5">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Inventory & Cost Control
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Real-time stock tracking, automated vendor alerts, and
                                ingredient-level recipe costing.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all">
                            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#148873] flex items-center justify-center mb-5">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Staff & Shift Management
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Drag-and-drop shift scheduling, PIN clock-ins, tip pooling, and
                                automated payroll sync.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all">
                            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#148873] flex items-center justify-center mb-5">
                                <Heart className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Customer Insights & Loyalty
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Built-in guest CRM, custom digital rewards, automated feedback
                                loops, and repeat-visit campaigns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}