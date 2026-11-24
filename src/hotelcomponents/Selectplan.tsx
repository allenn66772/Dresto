
import React from 'react'
import Header from './Header'
import Footer from './Footer'

const plans = [
    {
        name: 'Starter',
        price: 299,
        description: 'Perfect for small restaurants getting started.',
        features: [
            'Digital QR Menu',
            'Menu Management',
            'Item Availability Updates',
            'Restaurant Profile',
            'Table Management',
        ],
        button: 'Choose Starter',
        popular: false,
    },
    {
        name: 'Professional',
        price: 599,
        description: 'Everything you need to manage your restaurant.',
        features: [
            'Everything in Starter',
            'Customer Assistance Requests',
            'Real-time Staff Notifications',
            'Customer Ratings & Reviews',
            'Complaint Management',
            'Basic Analytics',
        ],
        button: 'Choose Professional',
        popular: true,
    },
    {
        name: 'Business',
        price: 999,
        description: 'Advanced tools for growing restaurant businesses.',
        features: [
            'Everything in Professional',
            'Advanced Analytics',
            'Multiple Staff Permissions',
            'Customer Insights',
            'Priority Support',
            'Advanced Branch Management',
        ],
        button: 'Choose Business',
        popular: false,
    },
]

function Selectplan() {
    return (
        <>
            
            <div className="min-h-screen bg-[#f8faf6] px-4 py-12 text-[#263323] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
    
                    {/* Header */}
                    <div className="mb-14 text-center">
                        <span className="mb-4 inline-block rounded-full bg-[#e9efdf] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#657b42]">
                            Simple & Flexible Pricing
                        </span>
    
                        <h1 className="text-3xl font-bold tracking-tight text-[#263323] sm:text-5xl">
                            Choose the right plan
                            <span className="block text-[#718b49]">
                                for your restaurant
                            </span>
                        </h1>
    
                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#7b8574] sm:text-base">
                            Everything you need to manage your restaurant,
                            streamline operations and deliver a better
                            customer experience.
                        </p>
                    </div>
    
                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-3">
    
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2 ${
                                    plan.popular
                                        ? 'border-[#718b49] bg-white shadow-xl shadow-[#718b49]/15'
                                        : 'border-[#e5e9df] bg-white shadow-sm hover:shadow-lg'
                                }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#718b49] px-5 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md">
                                        MOST POPULAR
                                    </div>
                                )}
    
                                {/* Plan Info */}
                                <div className="mb-7">
                                    <h2 className="text-xl font-bold text-[#34432e]">
                                        {plan.name}
                                    </h2>
    
                                    <p className="mt-2 min-h-10 text-sm leading-6 text-[#899184]">
                                        {plan.description}
                                    </p>
                                </div>
    
                                {/* Price */}
                                <div className="mb-7">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold tracking-tight text-[#34432e]">
                                            ₹{plan.price}
                                        </span>
                                        <span className="text-sm text-[#899184]">
                                            / month
                                        </span>
                                    </div>
    
                                    <p className="mt-2 text-xs text-[#9ba294]">
                                        Billed monthly per branch
                                    </p>
                                </div>
    
                                {/* Button */}
                                <button
                                    className={`mb-8 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 ${
                                        plan.popular
                                            ? 'bg-[#718b49] text-white shadow-md shadow-[#718b49]/20 hover:bg-[#5e753a]'
                                            : 'border border-[#dce4d3] bg-[#f5f7f1] text-[#566b3d] hover:border-[#718b49] hover:bg-[#eaf0e2]'
                                    }`}
                                >
                                    {plan.button}
                                </button>
    
                                {/* Features */}
                                <div className="flex-1">
                                    <p className="mb-5 text-sm font-semibold text-[#34432e]">
                                        What's included
                                    </p>
    
                                    <ul className="space-y-4">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-[#65705e]"
                                            >
                                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eaf0e2]">
                                                    <svg
                                                        className="h-3 w-3 text-[#718b49]"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </span>
    
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
    
                    </div>
    
                    {/* Footer */}
                    <div className="mt-14 text-center">
                        <p className="text-sm text-[#899184]">
                            Need help choosing a plan?
                            <span className="ml-1 cursor-pointer font-semibold text-[#718b49] hover:text-[#526a35]">
                                Contact our support team
                            </span>
                        </p>
    
                        <p className="mt-3 text-xs text-[#a0a899]">
                            All plans are billed per restaurant branch.
                            Prices exclude applicable taxes.
                        </p>
                    </div>
    
                </div>
            </div>
            
        </>
    )
}

export default Selectplan
