import { useEffect, useState, type FormEvent } from "react";

export type Review = { id: number; name: string; rating: number; text: string; date: string };

const display = "font-[family-name:Fraunces,Georgia,serif]";
const btnSolid =
    "inline-block rounded-full border-2 border-[#2B1D17] bg-[#2B1D17] px-5 py-2.5 text-center text-[.95rem] font-semibold text-[#FAF6F0] no-underline transition duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#C48A5A] dark:border-[#C48A5A] dark:bg-[#C48A5A] dark:text-[#2B1D17]";
const card = "rounded-3xl border border-[#2B1D17]/15 bg-[#FAF6F0] dark:border-[#FAF6F0]/20 dark:bg-[#35241C]";
const muted = "text-[#6B4A3A] dark:text-[#E7D6C1]";

export function Stars({ value, size = "text-base" }: { value: number; size?: string }) {
    return (
        <span className={`${size} tracking-tight text-[#C48A5A]`} role="img" aria-label={`${value} out of 5 stars`}>
            {"★".repeat(Math.round(value))}
            <span className="text-[#2B1D17]/20 dark:text-[#FAF6F0]/25">{"★".repeat(5 - Math.round(value))}</span>
        </span>
    );
}

export default function Reviews({ initial }: { initial: Review[] }) {
    const [reviews, setReviews] = useState(initial);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    // Keeps the list in sync when reviews arrive later from your API
    useEffect(() => setReviews(initial), [initial]);

    const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1);
    const counts = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => r.rating === n).length }));

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;
        // Replace with: await fetch("/api/reviews", { method: "POST", ... })
        setReviews([{ id: Date.now(), name: name.trim(), rating, text: text.trim(), date: "Just now" }, ...reviews]);
        setName("");
        setText("");
        setRating(5);
    };

    const field =
        "w-full rounded-xl border border-[#2B1D17]/20 bg-transparent px-4 py-2.5 outline-none focus:border-[#C48A5A] focus:ring-2 focus:ring-[#C48A5A]/40 dark:border-[#FAF6F0]/25";

    return (
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div className="grid content-start gap-6">
                <div className={`${card} p-6`}>
                    <div className="flex items-end gap-4">
                        <span className={`${display} text-6xl font-bold leading-none`}>{avg.toFixed(1)}</span>
                        <div>
                            <Stars value={avg} size="text-xl" />
                            <p className={`text-sm ${muted}`}>{reviews.length} reviews</p>
                        </div>
                    </div>
                    <ul className="mt-5 grid gap-2">
                        {counts.map(({ n, c }) => (
                            <li key={n} className="flex items-center gap-3 text-sm">
                                <span className="w-3">{n}</span>
                                <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#E7D6C1] dark:bg-[#6B4A3A]">
                                    <span className="block h-full rounded-full bg-[#C48A5A] transition-all duration-700" style={{ width: `${(c / (reviews.length || 1)) * 100}%` }} />
                                </span>
                                <span className={`w-5 text-right ${muted}`}>{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <form onSubmit={submit} className={`${card} grid gap-3 p-6`}>
                    <h3 className={`${display} text-xl font-bold`}>Write a review</h3>
                    <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                key={n}
                                type="button"
                                role="radio"
                                aria-checked={rating === n}
                                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                                onClick={() => setRating(n)}
                                className={`text-2xl transition hover:scale-110 ${n <= rating ? "text-[#C48A5A]" : "text-[#2B1D17]/20 dark:text-[#FAF6F0]/25"}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea className={`${field} min-h-24 resize-y`} placeholder="How was your meal?" value={text} onChange={(e) => setText(e.target.value)} />
                    <button className={btnSolid} type="submit">Post review</button>
                </form>
            </div>

            <ul className="grid content-start gap-4">
                {reviews.length === 0 && <li className={muted}>No reviews yet. Be the first to write one.</li>}
                {reviews.map((r) => (
                    <li key={r.id} className={`${card} p-6`}>
                        <div className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-full bg-[#C48A5A] font-bold text-[#2B1D17]">{r.name[0]?.toUpperCase()}</span>
                            <div className="flex-1">
                                <p className="font-semibold leading-tight">{r.name}</p>
                                <p className={`text-sm ${muted}`}>{r.date}</p>
                            </div>
                            <Stars value={r.rating} />
                        </div>
                        <p className="mt-3">{r.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}