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

/* ---------- palette: olive + white ----------
   olive        #5E6B23   (buttons, accents, logo tile)
   olive hover  #4E5A1C
   olive tint   #F5F7EC   (cards)   #E4EAC6 (highlight)
   deep olive   #1F2610   (text)    #1E240F (dark-mode page)
   leaf         #B5C46E   (accent on dark backgrounds)
   muted text   #586038   (light)   #D3DBB2 (dark)
---------------------------------------------- */

/* ---------- shared classes ---------- */
const display = "font-[family-name:Fraunces,Georgia,serif]";
const btn =
    "inline-block rounded-full border-2 px-5 py-2.5 text-center text-[.95rem] font-semibold no-underline transition duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#5E6B23] dark:focus-visible:outline-[#B5C46E]";
const btnSolid = `${btn} border-[#5E6B23] bg-[#5E6B23] text-white hover:bg-[#4E5A1C] dark:border-[#B5C46E] dark:bg-[#B5C46E] dark:text-[#1E240F] dark:hover:bg-[#C6D388]`;
const btnGhost = `${btn} border-[#5E6B23]/40 text-[#5E6B23] hover:bg-[#F5F7EC] dark:border-[#B5C46E]/50 dark:text-[#B5C46E] dark:hover:bg-[#2A3214]`;
const card = "rounded-3xl border border-[#5E6B23]/20 bg-[#F5F7EC] dark:border-[#B5C46E]/20 dark:bg-[#2A3214]";
const muted = "text-[#586038] dark:text-[#D3DBB2]";
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
                        <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="underline decoration-[#5E6B23] underline-offset-4 dark:decoration-[#B5C46E]">{r.phone}</a>
                    </p>
                    <a className={`${btnSolid} mt-5`} href={dirHref} target="_blank" rel="noreferrer">Get directions</a>
                </div>
                <div className={`${card} p-6`}>
                    <h3 className={`${display} mb-3 text-xl font-bold`}>Opening hours</h3>
                    <ul className="grid gap-1.5 text-[.95rem]">
                        {r.hours.map((h, i) => (
                            <li key={h.day} className={`flex justify-between rounded-lg px-3 py-1.5 ${i === today ? "bg-[#E4EAC6] font-semibold text-[#1F2610] dark:bg-[#4A5524] dark:text-white" : ""}`}>
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
        <div className="min-h-screen bg-white font-[family-name:Instrument_Sans,system-ui,sans-serif] text-[17px] leading-relaxed text-[#1F2610] dark:bg-[#1E240F] dark:text-[#F5F7EC]">
            {/* cover */}
            <div
                className="h-56 bg-[#5E6B23] bg-cover bg-center sm:h-72"
                style={restaurant.coverImage ? { backgroundImage: `url(${restaurant.coverImage})` } : { backgroundImage: "linear-gradient(135deg,#2F3814,#5E6B23 55%,#A3B35A)" }}
            />

            <div className="mx-auto w-full max-w-[1120px] px-6">
                {/* header */}
                <header className="-mt-14 flex flex-wrap items-end gap-5 pb-8">
                    <div className="grid size-28 place-items-center overflow-hidden rounded-3xl border-4 border-white bg-[#5E6B23] shadow-lg dark:border-[#1E240F]">
                        {restaurant.logoImage ? (
                            <img src={restaurant.logoImage} alt={`${restaurant.name} logo`} className="size-full object-cover" />
                        ) : (
                            <span className={`${display} text-5xl font-bold text-white`}>{restaurant.name[0]}</span>
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
                <div role="tablist" aria-label="Restaurant sections" className="sticky top-0 z-10 -mx-6 flex gap-1 border-b border-[#5E6B23]/20 bg-white/90 px-6 backdrop-blur dark:border-[#B5C46E]/20 dark:bg-[#1E240F]/90">
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
                            className={`relative px-5 py-3.5 font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-[#5E6B23] dark:focus-visible:outline-[#B5C46E] ${tab === t
                                ? "text-[#5E6B23] dark:text-[#B5C46E]"
                                : `${muted} hover:text-[#1F2610] dark:hover:text-white`
                                }`}
                        >
                            {t}
                            {t === "Reviews" && <span className={`ml-1.5 text-sm font-normal ${muted}`}>{restaurant.reviews.length}</span>}
                            <span className={`absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-[#5E6B23] transition-transform duration-300 dark:bg-[#B5C46E] ${tab === t ? "scale-x-100" : "scale-x-0"}`} />
                        </button>
                    ))}
                </div>

                <main role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} key={tab} className="py-10">
                    {tab === "Menu" && <Menu items={restaurant.menu} />}
                    {tab === "Reviews" && <Reviews initial={restaurant.reviews} />}
                    {tab === "Location" && <LocationTab r={restaurant} />}
                </main>

                <footer id="reserve" className={`border-t border-[#5E6B23]/20 py-10 text-sm dark:border-[#B5C46E]/20 ${muted}`}>
                    Reservations open soon. Call {restaurant.phone} to book a table.
                </footer>
            </div>
        </div>
    );
}