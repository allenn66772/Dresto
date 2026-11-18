import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Camera,
    Check,
    Clock3,
    ImagePlus,
    MapPin,
    Plus,
    Store,
    Trash2,
    UtensilsCrossed,
} from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Form = {
    name: string;
    cuisine: string;
    tagline: string;
    description: string;
    phone: string;
    address: string;
    mapQuery: string;
};

type Dish = {
    name: string;
    desc: string;
    price: string;
    category: string;
    veg: boolean;
    image: File | null;
};

const emptyDish: Dish = { name: "", desc: "", price: "", category: "Mains", veg: true, image: null };
const inputClass =
    "w-full rounded-xl border border-[#ded3c7] bg-white/75 px-4 py-3 text-sm text-[#30241d] outline-none transition placeholder:text-[#9b8b7d] focus:border-[#a75b36] focus:ring-4 focus:ring-[#a75b36]/10";
const labelClass = "grid gap-2 text-sm font-semibold text-[#403229]";

function useObjectUrl(file: File | null) {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return url;
}

function SectionCard({
    id,
    number,
    icon,
    title,
    description,
    children,
}: {
    id: string;
    number: string;
    icon: ReactNode;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-28 rounded-3xl border border-[#e9dfd5] bg-[#fffdf9] p-5 shadow-[0_12px_35px_-30px_rgba(48,36,29,.45)] sm:p-7">
            <div className="mb-6 flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#f4e9dc] text-[#995337]">{icon}</span>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-[.16em] text-[#a75b36]">{number}</span>
                        <h2 className="font-[family-name:Fraunces,Georgia,serif] text-xl font-bold tracking-tight text-[#30241d]">{title}</h2>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#827267]">{description}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

function ProfilePreview({
    form,
    cover,
    logo,
    dishCount,
}: {
    form: Form;
    cover: string | null;
    logo: string | null;
    dishCount: number;
}) {
    return (
        <aside className="grid content-start gap-4 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-[#e9dfd5] bg-[#fffdf9] shadow-[0_20px_55px_-35px_rgba(48,36,29,.5)]">
                <div
                    className="relative h-36 bg-cover bg-center"
                    style={{
                        backgroundImage: cover
                            ? `url(${cover})`
                            : "linear-gradient(130deg,#4a2d22 0%,#8b4e31 56%,#d99b59 100%)",
                    }}
                >
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white backdrop-blur">
                        Live preview
                    </span>
                    <div className="absolute -bottom-8 left-5 grid size-[4.25rem] place-items-center overflow-hidden rounded-2xl border-4 border-[#fffdf9] bg-[#f4c27a] font-[family-name:Fraunces,Georgia,serif] text-3xl font-bold text-[#4a2d22] shadow-sm">
                        {logo ? <img src={logo} alt="" className="size-full object-cover" /> : form.name.trim().charAt(0).toUpperCase() || <Store size={23} />}
                    </div>
                </div>
                <div className="px-5 pb-5 pt-11">
                    <p className="text-[11px] font-bold uppercase tracking-[.15em] text-[#a75b36]">{form.cuisine || "Your cuisine"}</p>
                    <h2 className="mt-1 break-words font-[family-name:Fraunces,Georgia,serif] text-2xl font-bold leading-tight text-[#30241d]">
                        {form.name || "Your restaurant"}
                    </h2>
                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#827267]">
                        {form.tagline || "A little introduction to what makes your place special."}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#eee5dc] pt-4">
                        <div className="rounded-xl bg-[#f8f2eb] p-3">
                            <UtensilsCrossed size={16} className="text-[#a75b36]" />
                            <p className="mt-2 text-lg font-bold text-[#30241d]">{dishCount}</p>
                            <p className="text-xs text-[#827267]">{dishCount === 1 ? "menu item" : "menu items"}</p>
                        </div>
                        <div className="rounded-xl bg-[#f8f2eb] p-3">
                            <MapPin size={16} className="text-[#a75b36]" />
                            <p className="mt-2 truncate text-sm font-bold text-[#30241d]">{form.address || "Your location"}</p>
                            <p className="text-xs text-[#827267]">Restaurant address</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-[#e9dfd5] bg-[#f8f2eb] p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-bold text-[#403229]">Your profile checklist</p>
                        <p className="mt-1 text-xs text-[#827267]">Add the essentials to get started.</p>
                    </div>
                    <span className="grid size-9 place-items-center rounded-full bg-white text-[#995337]">
                        <Check size={17} />
                    </span>
                </div>
                <nav aria-label="Profile sections" className="mt-4 grid grid-cols-2 gap-2">
                    {[
                        ["photos", "Photos"],
                        ["details", "Details"],
                        ["hours", "Hours"],
                        ["menu", "Menu"],
                    ].map(([id, title], index) => (
                        <a key={id} href={`#${id}`} className="rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold text-[#6d5b4e] transition hover:text-[#a75b36]">
                            <span className="mr-1.5 text-[#b58b6a]">0{index + 1}</span>
                            {title}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

export default function AddProfile() {
    const [form, setForm] = useState<Form>({
        name: "",
        cuisine: "",
        tagline: "",
        description: "",
        phone: "",
        address: "",
        mapQuery: "",
    });
    const [hours, setHours] = useState(DAYS.map((day) => ({ day, time: "11:00 AM to 10:30 PM" })));
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [cover, setCover] = useState<File | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
    const [saving, setSaving] = useState(false);
    const coverUrl = useObjectUrl(cover);
    const logoUrl = useObjectUrl(logo);
    const completedBasics = [form.name, form.cuisine, form.phone, form.address].filter((value) => value.trim()).length;

    const set = (key: keyof Form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((current) => ({ ...current, [key]: event.target.value }));
    const pick = (setter: (file: File | null) => void) => (event: ChangeEvent<HTMLInputElement>) =>
        setter(event.target.files?.[0] ?? null);
    const addDish = () => setDishes((current) => [...current, { ...emptyDish }]);
    const removeDish = (index: number) => setDishes((current) => current.filter((_, itemIndex) => itemIndex !== index));
    const updateDish = <K extends keyof Dish>(index: number, key: K, value: Dish[K]) =>
        setDishes((current) => current.map((dish, itemIndex) => (itemIndex === index ? { ...dish, [key]: value } : dish)));

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus(null);

        if (!form.name.trim() || !form.cuisine.trim() || !form.phone.trim() || !form.address.trim()) {
            setStatus({ type: "error", text: "Name, cuisine, phone and address are required." });
            return;
        }
        if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
            setStatus({ type: "error", text: "Enter a valid 10-digit phone number." });
            return;
        }
        if (dishes.some((dish) => !dish.name.trim() || !(Number(dish.price) > 0))) {
            setStatus({ type: "error", text: "Every dish needs a name and a price." });
            return;
        }

        const body = new FormData();
        Object.entries(form).forEach(([key, value]) => body.append(key, value.trim()));
        body.append("hours", JSON.stringify(hours));
        body.append(
            "menu",
            JSON.stringify(
                dishes.map((dish) => ({
                    name: dish.name.trim(),
                    desc: dish.desc.trim(),
                    price: Number(dish.price),
                    category: dish.category.trim() || "Mains",
                    veg: dish.veg,
                })),
            ),
        );
        dishes.forEach((dish, index) => {
            if (dish.image) body.append(`dish_${index}`, dish.image);
        });
        if (cover) body.append("cover", cover);
        if (logo) body.append("logo", logo);

        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/owner/profile", {
                method: "POST",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                body,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Could not save the profile");
            setStatus({ type: "ok", text: "Your restaurant profile is ready." });
        } catch (error) {
            setStatus({ type: "error", text: error instanceof Error ? error.message : "Something went wrong" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f3ed] font-[family-name:Instrument_Sans,system-ui,sans-serif] text-[#30241d]">
            <header className="border-b border-[#e9dfd5] bg-[#fffdf9]">
                <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-7 lg:px-10">
                    <a href="/" className="flex items-center gap-3 text-inherit no-underline">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#3a261c] text-[#f4c27a]">
                            <UtensilsCrossed size={19} />
                        </span>
                        <span className="font-[family-name:Fraunces,Georgia,serif] text-xl font-bold tracking-tight">dresto</span>
                    </a>
                    <div className="hidden items-center gap-3 text-sm text-[#827267] sm:flex">
                        <span className="size-2 rounded-full bg-[#a75b36]" />
                        Restaurant setup
                    </div>
                    <a href="/restaurent-profile" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#6d5b4e] transition hover:bg-[#f4e9dc] hover:text-[#30241d]">
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Back to preview</span>
                        <span className="sm:hidden">Back</span>
                    </a>
                </div>
            </header>

            <main className="mx-auto max-w-[1320px] px-4 pb-16 pt-8 sm:px-7 sm:pt-12 lg:px-10">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                    <div className="max-w-2xl">
                        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e5d6c6] bg-[#fffaf3] px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#995337]">
                            <Store size={14} />
                            Your restaurant, your story
                        </p>
                        <h1 className="font-[family-name:Fraunces,Georgia,serif] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02] tracking-[-.045em] text-[#30241d]">
                            Make your place
                            <br className="hidden sm:block" /> easy to <span className="text-[#a75b36]">fall for.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-[#827267] sm:text-base">
                            Add the details diners look for. You can always come back and make changes later.
                        </p>
                    </div>
                    <div className="min-w-52 rounded-2xl border border-[#e9dfd5] bg-[#fffdf9] px-4 py-3">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#6d5b4e]">Profile basics</span>
                            <span className="text-[#995337]">{completedBasics}/4</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#eee5dc]">
                            <div className="h-full rounded-full bg-[#a75b36] transition-all" style={{ width: `${(completedBasics / 4) * 100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-8">
                    <form onSubmit={submit} className="grid min-w-0 gap-5">
                        <SectionCard
                            id="photos"
                            number="01"
                            icon={<Camera size={19} />}
                            title="Set the scene"
                            description="Give guests a first look at the atmosphere and the people behind it."
                        >
                            <div className="grid gap-4 sm:grid-cols-[1.45fr_.8fr]">
                                <label className="group relative grid min-h-52 cursor-pointer place-items-center overflow-hidden rounded-2xl border border-dashed border-[#d6c4b1] bg-[#f8f2eb] text-center transition hover:border-[#a75b36]">
                                    {coverUrl ? (
                                        <img src={coverUrl} alt="Selected restaurant cover" className="absolute inset-0 size-full object-cover" />
                                    ) : (
                                        <div className="relative z-10 grid justify-items-center px-5 py-8">
                                            <span className="grid size-12 place-items-center rounded-2xl bg-white text-[#a75b36] shadow-sm">
                                                <ImagePlus size={21} />
                                            </span>
                                            <span className="mt-3 text-sm font-bold text-[#403229]">Add a cover photo</span>
                                            <span className="mt-1 text-xs text-[#827267]">A wide shot works best</span>
                                        </div>
                                    )}
                                    {coverUrl && <span className="absolute inset-x-3 bottom-3 z-10 rounded-xl bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur">Change cover photo</span>}
                                    <input type="file" accept="image/*" onChange={pick(setCover)} className="sr-only" aria-label="Upload cover photo" />
                                </label>
                                <label className="grid cursor-pointer content-center justify-items-center rounded-2xl border border-dashed border-[#d6c4b1] bg-[#f8f2eb] px-4 py-6 text-center transition hover:border-[#a75b36]">
                                    <span className="grid size-16 place-items-center overflow-hidden rounded-2xl bg-[#f0dfc8] font-[family-name:Fraunces,Georgia,serif] text-2xl font-bold text-[#75462f]">
                                        {logoUrl ? <img src={logoUrl} alt="Selected restaurant logo" className="size-full object-cover" /> : form.name.trim().charAt(0).toUpperCase() || <Store size={23} />}
                                    </span>
                                    <span className="mt-3 text-sm font-bold text-[#403229]">{logoUrl ? "Change logo" : "Add a logo"}</span>
                                    <span className="mt-1 text-xs text-[#827267]">Square image recommended</span>
                                    <input type="file" accept="image/*" onChange={pick(setLogo)} className="sr-only" aria-label="Upload restaurant logo" />
                                </label>
                            </div>
                        </SectionCard>

                        <SectionCard
                            id="details"
                            number="02"
                            icon={<Store size={19} />}
                            title="The essentials"
                            description="Help diners discover your restaurant and get in touch."
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className={labelClass}>
                                    Restaurant name <span className="text-[#a75b36]">*</span>
                                    <input className={inputClass} value={form.name} onChange={set("name")} placeholder="e.g. Sea View Residency" required />
                                </label>
                                <label className={labelClass}>
                                    Cuisine <span className="text-[#a75b36]">*</span>
                                    <input className={inputClass} value={form.cuisine} onChange={set("cuisine")} placeholder="South Indian, Seafood" required />
                                </label>
                                <label className={`${labelClass} sm:col-span-2`}>
                                    A short tagline
                                    <input className={inputClass} value={form.tagline} onChange={set("tagline")} placeholder="Fresh catch, a minute from the beach" />
                                </label>
                                <label className={`${labelClass} sm:col-span-2`}>
                                    Tell your story
                                    <textarea className={`${inputClass} min-h-28 resize-y`} value={form.description} onChange={set("description")} placeholder="What should guests know about your food, your ingredients, or your story?" />
                                </label>
                                <label className={labelClass}>
                                    Phone number <span className="text-[#a75b36]">*</span>
                                    <input className={inputClass} type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" required />
                                </label>
                                <label className={labelClass}>
                                    Restaurant address <span className="text-[#a75b36]">*</span>
                                    <textarea className={`${inputClass} min-h-[50px] resize-y`} value={form.address} onChange={set("address")} placeholder="Beach Road, Ponnani, Kerala" required />
                                </label>
                                <label className={`${labelClass} sm:col-span-2`}>
                                    Map search
                                    <input className={inputClass} value={form.mapQuery} onChange={set("mapQuery")} placeholder="Use your address or add a nearby landmark" />
                                    <span className="text-xs font-normal text-[#938376]">We’ll use your address if you leave this blank.</span>
                                </label>
                            </div>
                        </SectionCard>

                        <SectionCard
                            id="hours"
                            number="03"
                            icon={<Clock3 size={19} />}
                            title="When to visit"
                            description="Set your regular hours so guests know when you’re open."
                        >
                            <div className="overflow-hidden rounded-2xl border border-[#eee5dc]">
                                {hours.map((entry, index) => (
                                    <label key={entry.day} className={`grid items-center gap-2 px-4 py-3 sm:grid-cols-[minmax(100px,.7fr)_1.3fr] ${index < hours.length - 1 ? "border-b border-[#eee5dc]" : ""}`}>
                                        <span className="text-sm font-semibold text-[#55463b]">{entry.day}</span>
                                        <input
                                            className="w-full rounded-lg border border-transparent bg-[#f8f5f0] px-3 py-2 text-sm text-[#403229] outline-none transition placeholder:text-[#9b8b7d] focus:border-[#a75b36] focus:bg-white"
                                            value={entry.time}
                                            onChange={(event) => setHours((current) => current.map((hour, hourIndex) => (hourIndex === index ? { ...hour, time: event.target.value } : hour)))}
                                            placeholder="11:00 AM to 10:30 PM, or Closed"
                                            aria-label={`${entry.day} opening hours`}
                                        />
                                    </label>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard
                            id="menu"
                            number="04"
                            icon={<UtensilsCrossed size={19} />}
                            title="A taste of the menu"
                            description="Add a few favourites to give guests a reason to stop by."
                        >
                            <div className="grid gap-4">
                                {dishes.length === 0 && (
                                    <div className="grid justify-items-center rounded-2xl border border-dashed border-[#d6c4b1] bg-[#fcf8f2] px-5 py-8 text-center">
                                        <span className="grid size-11 place-items-center rounded-full bg-[#f1e2d0] text-[#995337]"><UtensilsCrossed size={18} /></span>
                                        <p className="mt-3 text-sm font-bold text-[#403229]">Your menu starts here</p>
                                        <p className="mt-1 text-xs text-[#827267]">Add a dish and set a price to show it on your profile.</p>
                                    </div>
                                )}
                                {dishes.map((dish, index) => (
                                    <article key={index} className="rounded-2xl border border-[#e9dfd5] bg-[#fcfaf6] p-4 sm:p-5">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-[.13em] text-[#995337]">Dish {String(index + 1).padStart(2, "0")}</span>
                                            <button type="button" onClick={() => removeDish(index)} aria-label={`Remove dish ${index + 1}`} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#9a5640] transition hover:bg-[#f8e9e3]">
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px]">
                                            <label className={labelClass}>
                                                Dish name <span className="text-[#a75b36]">*</span>
                                                <input className={inputClass} placeholder="e.g. Malabar fish curry" value={dish.name} onChange={(event) => updateDish(index, "name", event.target.value)} />
                                            </label>
                                            <label className={labelClass}>
                                                Price (₹) <span className="text-[#a75b36]">*</span>
                                                <input className={inputClass} type="number" min="1" step="1" placeholder="280" value={dish.price} onChange={(event) => updateDish(index, "price", event.target.value)} />
                                            </label>
                                            <label className={`${labelClass} sm:col-span-2`}>
                                                Description
                                                <input className={inputClass} placeholder="A short, appetizing description" value={dish.desc} onChange={(event) => updateDish(index, "desc", event.target.value)} />
                                            </label>
                                            <label className={labelClass}>
                                                Category
                                                <input className={inputClass} placeholder="Mains" value={dish.category} onChange={(event) => updateDish(index, "category", event.target.value)} />
                                            </label>
                                            <div className="flex flex-wrap items-end justify-between gap-3">
                                                <label className="flex min-h-12 cursor-pointer items-center gap-2 text-sm font-medium text-[#55463b]">
                                                    <input type="checkbox" checked={dish.veg} onChange={(event) => updateDish(index, "veg", event.target.checked)} className="size-4 accent-[#668050]" />
                                                    Vegetarian
                                                </label>
                                                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#ded3c7] px-3 py-2.5 text-xs font-semibold text-[#6d5b4e] transition hover:border-[#a75b36] hover:text-[#995337]">
                                                    <Camera size={14} />
                                                    Add photo
                                                    <input type="file" accept="image/*" onChange={(event) => updateDish(index, "image", event.target.files?.[0] ?? null)} className="sr-only" aria-label={`Upload photo for dish ${index + 1}`} />
                                                </label>
                                            </div>
                                        </div>
                                        {dish.image && <p className="mt-3 truncate text-xs text-[#827267]">{dish.image.name}</p>}
                                    </article>
                                ))}
                                <button type="button" onClick={addDish} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#cdb7a1] bg-[#fffdf9] px-4 py-3 text-sm font-bold text-[#995337] transition hover:border-[#a75b36] hover:bg-[#fcf5ec]">
                                    <Plus size={17} />
                                    Add a dish
                                </button>
                            </div>
                        </SectionCard>

                        {status && (
                            <p role={status.type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm font-medium ${status.type === "ok" ? "border-[#c9ddbd] bg-[#eff6e9] text-[#49643b]" : "border-[#f0c7bb] bg-[#fff0eb] text-[#963f2b]"}`}>
                                {status.text}
                            </p>
                        )}

                        <div className="flex flex-col-reverse items-stretch justify-between gap-3 rounded-2xl border border-[#e9dfd5] bg-[#fffdf9] p-4 sm:flex-row sm:items-center sm:px-5">
                            <p className="text-xs text-[#827267]"><span className="text-[#a75b36]">*</span> Required to publish your profile</p>
                            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3a261c] px-5 py-3 text-sm font-bold text-[#fffaf3] shadow-sm transition hover:bg-[#553626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75b36] disabled:cursor-not-allowed disabled:opacity-60">
                                {saving ? "Saving profile..." : "Save restaurant profile"}
                                {!saving && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>

                    <ProfilePreview form={form} cover={coverUrl} logo={logoUrl} dishCount={dishes.length} />
                </div>
            </main>
        </div>
    );
}
