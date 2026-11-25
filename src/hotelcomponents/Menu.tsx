import { useMemo, useState } from "react";

export type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
  veg: boolean;
  image?: string; // Cloudinary URL
};

const display = "font-[family-name:Fraunces,Georgia,serif]";
const muted = "text-[#6B4A3A] dark:text-[#E7D6C1]";
const card = "rounded-3xl border border-[#2B1D17]/15 bg-[#FAF6F0] dark:border-[#FAF6F0]/20 dark:bg-[#35241C]";

function DishImage({ item }: { item: MenuItem }) {
  const [failed, setFailed] = useState(false);
  if (!item.image || failed) {
    return (
      <div className="grid h-44 place-items-center bg-[linear-gradient(135deg,#E7D6C1,#C48A5A)] text-6xl font-bold text-[#2B1D17]/70">
        {item.name[0]}
      </div>
    );
  }
  return (
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}

/** items = null means the menu is still loading */
export default function Menu({ items: menu }: { items: MenuItem[] | null }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set((menu ?? []).map((m) => m.category)))], [menu]);
  const [cat, setCat] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);

  if (!menu) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[1, 2, 3].map((n) => (
          <li key={n} className="h-72 animate-pulse rounded-3xl bg-[#E7D6C1] dark:bg-[#6B4A3A]/70" />
        ))}
      </ul>
    );
  }

  const items = menu.filter((m) => (cat === "All" || m.category === cat) && (!vegOnly || m.veg));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              cat === c
                ? "border-[#2B1D17] bg-[#2B1D17] text-[#FAF6F0] dark:border-[#C48A5A] dark:bg-[#C48A5A] dark:text-[#2B1D17]"
                : "border-[#2B1D17]/20 hover:bg-[#E7D6C1]/60 dark:border-[#FAF6F0]/25 dark:hover:bg-[#6B4A3A]/50"
            }`}
          >
            {c}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="size-4 accent-[#C48A5A]" />
          Veg only
        </label>
      </div>

      {items.length === 0 ? (
        <p className={muted}>No dishes match these filters.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <li
              key={m.id}
              className={`${card} group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-22px_rgb(43_29_23/.55)]`}
            >
              <div className="overflow-hidden">
                <DishImage item={m} />
              </div>
              <div className="flex gap-4 p-5">
                <span
                  title={m.veg ? "Vegetarian" : "Non-vegetarian"}
                  className={`mt-1.5 grid size-4 shrink-0 place-items-center rounded-[3px] border-2 ${m.veg ? "border-green-700" : "border-red-700"}`}
                >
                  <span className={`size-2 rounded-full ${m.veg ? "bg-green-700" : "bg-red-700"}`} />
                </span>
                <div className="flex-1">
                  <h3 className={`${display} text-lg font-bold leading-tight`}>{m.name}</h3>
                  <p className={`mt-1 text-[.92rem] ${muted}`}>{m.desc}</p>
                </div>
                <span className={`${display} text-lg font-bold`}>₹{m.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}