import React, { useEffect, useState } from "react";
import type { CreateRestaurantPayload } from "../features/restuarant/restaurant.api";
import { useRestaurantStore } from "../features/restuarant/restaurant.store";

interface AddRestaurantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const initialFormState: CreateRestaurantPayload = {
    restaurant_name: "",
    location: "",
    email: "",
    cuisine: "",
    phone: "",
    fssai_reg_no: "",
    gstin: "",
    is_active: true,
    image_url: "",
};

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const { addRestaurant, loading, error } = useRestaurantStore();
    const [formData, setFormData] =
        useState<CreateRestaurantPayload>(initialFormState);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) {
                onClose();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, loading, onClose]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        if (
            !formData.restaurant_name.trim() ||
            !formData.location.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.cuisine.trim()
        ) {
            setValidationError("Please fill in all required fields.");
            return;
        }

        const payload: CreateRestaurantPayload = {
            ...formData,
            restaurant_name: formData.restaurant_name.trim(),
            location: formData.location.trim(),
            email: formData.email.trim(),
            cuisine: formData.cuisine.trim(),
            phone: formData.phone.trim(),
            fssai_reg_no: formData.fssai_reg_no?.trim() || null,
            gstin: formData.gstin?.trim().toUpperCase() || null,
            image_url: formData.image_url?.trim() || null,
        };

        try {
            await addRestaurant(payload);
            setFormData(initialFormState);
            setValidationError(null);
            onSuccess?.();
            onClose();
        } catch {
            // Store already captures API error in `error`
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-restaurant-modal-title"
            onClick={() => {
                if (!loading) onClose();
            }}
        >
            <div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6 flex items-start justify-between border-b border-gray-100 pb-4">
                    <div>
                        <h2
                            id="add-restaurant-modal-title"
                            className="text-xl font-semibold text-gray-900"
                        >
                            Add New Restaurant
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the outlet details, contact info, and compliance numbers.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                    >
                        ✕
                    </button>
                </div>

                {(validationError || error) && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {validationError || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="restaurant_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Restaurant Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="restaurant_name"
                                name="restaurant_name"
                                type="text"
                                required
                                value={formData.restaurant_name}
                                onChange={handleChange}
                                placeholder="e.g., Spice Route Kitchen"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="cuisine"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Cuisine <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="cuisine"
                                name="cuisine"
                                type="text"
                                required
                                value={formData.cuisine}
                                onChange={handleChange}
                                placeholder="e.g., North Indian, Mughlai"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Location / Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Indiranagar, Bengaluru"
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="contact@restaurant.in"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>
                    </div>

                    {/* Compliance: FSSAI & GSTIN */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="fssai_reg_no"
                                className="block text-sm font-medium text-gray-700"
                            >
                                FSSAI Registration No.{" "}
                                <span className="text-xs font-normal text-gray-400">
                                    (Optional)
                                </span>
                            </label>
                            <input
                                id="fssai_reg_no"
                                name="fssai_reg_no"
                                type="text"
                                maxLength={14}
                                value={formData.fssai_reg_no ?? ""}
                                onChange={handleChange}
                                placeholder="14-digit FSSAI number"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="gstin"
                                className="block text-sm font-medium text-gray-700"
                            >
                                GSTIN{" "}
                                <span className="text-xs font-normal text-gray-400">
                                    (Optional)
                                </span>
                            </label>
                            <input
                                id="gstin"
                                name="gstin"
                                type="text"
                                maxLength={15}
                                value={formData.gstin ?? ""}
                                onChange={handleChange}
                                placeholder="15-character GSTIN"
                                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 uppercase text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label
                            htmlFor="image_url"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Cover Image URL{" "}
                            <span className="text-xs font-normal text-gray-400">
                                (Optional)
                            </span>
                        </label>
                        <input
                            id="image_url"
                            name="image_url"
                            type="url"
                            value={formData.image_url ?? ""}
                            onChange={handleChange}
                            placeholder="https://example.com/restaurant.jpg"
                            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Active Status</p>
                            <p className="text-xs text-gray-500">
                                Make this restaurant visible immediately after creation
                            </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="peer sr-only"
                            />
                            <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-orange-600 peer-focus:ring-2 peer-focus:ring-orange-500/30 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Add Restaurant"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurantModal;