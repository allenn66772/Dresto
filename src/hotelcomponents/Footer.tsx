import React from "react";

/**
 * Footer: olive bar matching Header, with the white logo,
 * a row of links and a copyright line. Styled with Tailwind CSS.
 *
 * Props
 *  brand   wordmark text                        (default "Grove")
 *  color   background color, any CSS color      (default "#5E6B23")
 *  year    copyright year                       (default current year)
 *  links   [{ label, href }]                    (default About, Contact, Privacy, Terms)
 */
const defaultLinks = [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
];

export default function Footer({
    brand = "Grove",
    color = "#5E6B23",
    year = new Date().getFullYear(),
    links = defaultLinks,
}) {
    return (
        <footer
            style={{ "--ftr-bg": color } as React.CSSProperties & { "--ftr-bg": string }}
            className="box-border w-full bg-[var(--ftr-bg)] px-4 py-8 font-sans text-white sm:px-8"
        >
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-3 text-xl font-bold leading-none tracking-tight">
                    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                        <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="2" />
                        <path d="M10 24C10 15 16 10 26 10C26 20 21 26 12 26" fill="white" />
                        <path d="M10 26L20 16" className="stroke-[var(--ftr-bg)]" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span>{brand}</span>
                </div>

                <nav aria-label="Footer">
                    <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                        {links.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="inline-flex min-h-[44px] items-center rounded px-3 text-sm font-medium text-white/90 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <p className="mx-auto mt-6 max-w-6xl border-t border-white/25 pt-6 text-center text-sm text-white/85 sm:text-left">
                © {year} {brand}. All rights reserved.
            </p>
        </footer>
    );
}