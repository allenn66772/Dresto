import { useState, type KeyboardEvent } from "react";
import Menu, { type MenuItem } from "./Menu";
import Reviews, { Stars, type Review } from "./Reviews";

/* ---------- types ---------- */
type Hours = { day: string; time: string };
type Restaurant = {
    name: string;
    cuisine: string;
    tagline: string;
    coverImage?: string; // e.g. a Cloudinary URL
    logoImage?: string;
    phone: string;
    address: string;
    mapQuery: string;
    hours: Hours[]; // Sunday first, to match Date.getDay()
    menu: MenuItem[] | null; // null = still loading (Menu shows placeholders)
    reviews: Review[];
};

/* ---------- sample data (replace with your API response) ---------- */
const sample: Restaurant = {
    name: "Sea View Residency",
    cuisine: "South Indian, Seafood",
    tagline: "Fresh catch and home-style curries, a minute from the beach.",
    phone: "+91 98765 43210",
    address: "Beach Road, Ponnani, Kerala 679577",
    mapQuery: "Ponnani Beach, Kerala",
    hours: [
        { day: "Sunday", time: "8:00 AM to 11:00 PM" },
        { day: "Monday", time: "11:00 AM to 10:30 PM" },
        { day: "Tuesday", time: "11:00 AM to 10:30 PM" },
        { day: "Wednesday", time: "11:00 AM to 10:30 PM" },
        { day: "Thursday", time: "11:00 AM to 10:30 PM" },
        { day: "Friday", time: "11:00 AM to 11:00 PM" },
        { day: "Saturday", time: "8:00 AM to 11:00 PM" },
    ],
    // Fill these from your API. Each dish can have image: "https://res.cloudinary.com/..."
    menu: [],
    reviews: [],
};

/* ---------- shared classes ---------- */
const display = "font-[family-name:Fraunces,Georgia,serif]";
const btn =
    "inline-block rounded-full border-2 px-5 py-2.5 text-center text-[.95rem] font-semibold no-underline transition duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#C48A5A]";
const btnSolid = `${btn} border-[#2B1D17] bg-[#2B1D17] text-[#FAF6F0] dark:border-[#C48A5A] dark:bg-[#C48A5A] dark:text-[#2B1D17]`;
const btnGhost = `${btn} border-[#2B1D17]/20 text-inherit dark:border-[#FAF6F0]/25`;
const card = "rounded-3xl border border-[#2B1D17]/15 bg-[#FAF6F0] dark:border-[#FAF6F0]/20 dark:bg-[#35241C]";
const muted = "text-[#6B4A3A] dark:text-[#E7D6C1]";
const TABS = ["Menu", "Reviews", "Location"] as const;
type Tab = (typeof TABS)[number];

function LocationTab({ r }: { r: Restaurant }) {
    const today = new Date().getDay();
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(r.mapQuery)}&output=embed`;
    const dirHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(r.mapQuery)}`;

    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className={`${card} overflow-hidden`}>
                <iframe title={`Map of ${r.name}`} src={mapSrc} loading="lazy" className="h-80 w-full border-0 lg:h-full lg:min-h-96" />
            </div>
            <div className="grid content-start gap-6">
                <div className={`${card} p-6`}>
                    <h3 className={`${display} mb-3 text-xl font-bold`}>Find us</h3>
                    <p>{r.address}</p>
                    <p className={`mt-1 ${muted}`}>
                        <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="underline decoration-[#C48A5A] underline-offset-4">{r.phone}</a>
                    </p>
                    <a className={`${btnSolid} mt-5`} href={dirHref} target="_blank" rel="noreferrer">Get directions</a>
                </div>
                <div className={`${card} p-6`}>
                    <h3 className={`${display} mb-3 text-xl font-bold`}>Opening hours</h3>
                    <ul className="grid gap-1.5 text-[.95rem]">
                        {r.hours.map((h, i) => (
                            <li key={h.day} className={`flex justify-between rounded-lg px-3 py-1.5 ${i === today ? "bg-[#E7D6C1] font-semibold dark:bg-[#6B4A3A]" : ""}`}>
                                <span>{h.day}{i === today && " (today)"}</span>
                                <span className={i === today ? "" : muted}>{h.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ---------- page ---------- */
export default function RestaurantProfile({ restaurant = sample }: { restaurant?: Restaurant }) {
    const [tab, setTab] = useState<Tab>("Menu");
    const avg = restaurant.reviews.reduce((s, r) => s + r.rating, 0) / (restaurant.reviews.length || 1);

    const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
        const i = TABS.indexOf(tab);
        if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length]);
        if (e.key === "ArrowLeft") setTab(TABS[(i + TABS.length - 1) % TABS.length]);
    };

    return (
        <div className="min-h-screen bg-[#FAF6F0] font-[family-name:Instrument_Sans,system-ui,sans-serif] text-[17px] leading-relaxed text-[#2B1D17] dark:bg-[#2B1D17] dark:text-[#FAF6F0]">
            {/* cover */}
            <div
                className="h-56 bg-[#6B4A3A] bg-cover bg-center sm:h-72"
                style={restaurant.coverImage ? { backgroundImage: `url(${restaurant.coverImage})` } : { backgroundImage: "linear-gradient(135deg,#2B1D17,#6B4A3A 55%,#C48A5A)" }}
            />

            <div className="mx-auto w-full max-w-[1120px] px-6">
                {/* header */}
                <header className="-mt-14 flex flex-wrap items-end gap-5 pb-8">
                    <div className="grid size-28 place-items-center overflow-hidden rounded-3xl border-4 border-[#FAF6F0] bg-[#C48A5A] shadow-lg dark:border-[#2B1D17]">
                        {restaurant.logoImage ? (
                            <img src={restaurant.logoImage} alt={`${restaurant.name} logo`} className="size-full object-cover" />
                        ) : (
                            <span className={`${display} text-5xl font-bold text-[#2B1D17]`}>{restaurant.name[0]}</span>
                        )}
                    </div>
                    <div className="min-w-60 flex-1">
                        <h1 className={`${display} text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-tight`}>{restaurant.name}</h1>
                        <p className={`mt-1 ${muted}`}>{restaurant.cuisine}</p>
                        <p className="mt-2 flex flex-wrap items-center gap-x-3 text-sm">
                            <Stars value={avg} />
                            <span className="font-semibold">{avg.toFixed(1)}</span>
                            <span className={muted}>({restaurant.reviews.length} reviews)</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a className={btnSolid} href="#reserve">Reserve a table</a>
                        <a className={btnGhost} href={`tel:${restaurant.phone.replace(/\s/g, "")}`}>Call</a>
                    </div>
                </header>
                <p className={`-mt-2 mb-8 max-w-[38em] ${muted}`}>{restaurant.tagline}</p>

                {/* tabs */}
                <div role="tablist" aria-label="Restaurant sections" className="sticky top-0 z-10 -mx-6 flex gap-1 border-b border-[#2B1D17]/15 bg-[#FAF6F0]/90 px-6 backdrop-blur dark:border-[#FAF6F0]/20 dark:bg-[#2B1D17]/90">
                    {TABS.map((t) => (
                        <button
                            key={t}
                            role="tab"
                            id={`tab-${t}`}
                            aria-selected={tab === t}
                            aria-controls={`panel-${t}`}
                            tabIndex={tab === t ? 0 : -1}
                            onClick={() => setTab(t)}
                            onKeyDown={onKey}
                            className={`relative px-5 py-3.5 font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-[#C48A5A] ${tab === t ? "" : `${muted} hover:text-[#2B1D17] dark:hover:text-[#FAF6F0]`
                                }`}
                        >
                            {t}
                            {t === "Reviews" && <span className={`ml-1.5 text-sm font-normal ${muted}`}>{restaurant.reviews.length}</span>}
                            <span className={`absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-[#C48A5A] transition-transform duration-300 ${tab === t ? "scale-x-100" : "scale-x-0"}`} />
                        </button>
                    ))}
                </div>

                <main role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} key={tab} className="py-10">
                    {tab === "Menu" && <Menu items={restaurant.menu} />}
                    {tab === "Reviews" && <Reviews initial={restaurant.reviews} />}
                    {tab === "Location" && <LocationTab r={restaurant} />}
                </main>

                <footer id="reserve" className={`border-t border-[#2B1D17]/15 py-10 text-sm dark:border-[#FAF6F0]/20 ${muted}`}>
                    Reservations open soon. Call {restaurant.phone} to book a table.
                </footer>
            </div>
        </div>
    );
}