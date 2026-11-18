import { useState, useRef } from 'react';
import type { FC, FormEvent, DragEvent, ChangeEvent } from 'react';
import type { MenuItem, MenuUploadSectionProps } from './restaurant.types';
import {
    FileSpreadsheet,
    UploadCloud,
    FileText,
    Image as ImageIcon,
    Trash2,
    PlusCircle,
    Search
} from 'lucide-react';

export const MenuUploadSection: FC<MenuUploadSectionProps> = ({
    menuFiles,
    onUploadMenuFiles,
    onDeleteMenuFile,
    menuItems,
    onAddMenuItem,
    onToggleDishAvailability,
    onDeleteMenuItem,
    theme
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dishName, setDishName] = useState('');
    const [dishCategory, setDishCategory] = useState<MenuItem['category']>('Main Course');
    const [dishPrice, setDishPrice] = useState('');
    const [dishDiet, setDishDiet] = useState<'Veg' | 'Non-Veg'>('Veg');
    const [dishDesc, setDishDesc] = useState('');

    // Search & Filter states for published menu items
    const [searchQuery, setSearchQuery] = useState('');
    const [dietFilter, setDietFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUploadMenuFiles(e.dataTransfer.files);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUploadMenuFiles(e.target.files);
            e.target.value = '';
        }
    };

    const handleCreateDish = (e: FormEvent) => {
        e.preventDefault();
        const numericPrice = Number(dishPrice);
        if (!dishName.trim() || numericPrice <= 0) return;

        onAddMenuItem({
            name: dishName.trim(),
            category: dishCategory,
            price: numericPrice,
            diet: dishDiet,
            desc: dishDesc.trim() || 'Chef special house preparation'
        });

        setDishName('');
        setDishPrice('');
        setDishDesc('');
        setDishDiet('Veg');
    };

    const filteredMenuItems = menuItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDiet = dietFilter === 'All' || item.diet === dietFilter;
        return matchesSearch && matchesDiet;
    });

    return (
        <section
            id="menu-section"
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className={`w-5 h-5 ${theme.textClass}`} />
                        <h2 className="text-lg font-bold text-slate-900">Menu Uploading &amp; Dishes</h2>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        Live Sync
                    </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                    Upload PDF/Image menus or add individual dishes with instant availability toggles.
                </p>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
                {/* Drag & Drop File Uploader */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer ${
                        isDragging
                            ? 'border-amber-500 bg-amber-50/50'
                            : 'border-slate-300 hover:border-amber-500 bg-slate-50/70 hover:bg-amber-50/30'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
                        <UploadCloud className={`w-5 h-5 ${theme.textClass}`} />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                        Drop PDF Menu or Food Photos here, or{' '}
                        <span className={`${theme.textClass} underline`}>Browse</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Supports PDF, PNG, JPG up to 25MB</p>
                </div>

                {/* Uploaded Menu Files Preview & Delete List */}
                {menuFiles.length > 0 && (
                    <div className="space-y-2">
                        {menuFiles.map((file) => {
                            const isPdf = file.type === 'PDF Document';
                            return (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        {file.previewUrl && !isPdf ? (
                                            <img
                                                src={file.previewUrl}
                                                alt={file.name}
                                                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                                            />
                                        ) : (
                                            <div
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                    isPdf ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                                                }`}
                                            >
                                                {isPdf ? (
                                                    <FileText className="w-4 h-4" />
                                                ) : (
                                                    <ImageIcon className="w-4 h-4" />
                                                )}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                                            <p className="text-[10px] text-slate-400">
                                                {file.type} • {file.size} • {file.uploadedAt}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteMenuFile(file.id)}
                                        title="Delete menu file"
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Quick Add Dish Form */}
                <form
                    onSubmit={handleCreateDish}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Quick Add Dish
                        </h3>
                        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setDishDiet('Veg')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                                    dishDiet === 'Veg'
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                ● Veg
                            </button>
                            <button
                                type="button"
                                onClick={() => setDishDiet('Non-Veg')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                                    dishDiet === 'Non-Veg'
                                        ? 'bg-rose-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                ▲ Non-Veg
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                            type="text"
                            required
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            placeholder="Dish Name (e.g. Truffle Dal Makhani)"
                            className={`w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                        />
                        <div className="flex gap-2">
                            <select
                                value={dishCategory}
                                onChange={(e) => setDishCategory(e.target.value as MenuItem['category'])}
                                className={`w-1/2 px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                            >
                                <option value="Starters">Starters</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Breads & Rice">Breads &amp; Rice</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Cocktails">Cocktails</option>
                            </select>
                            <input
                                type="number"
                                required
                                min={1}
                                value={dishPrice}
                                onChange={(e) => setDishPrice(e.target.value)}
                                placeholder="Price (₹)"
                                className={`w-1/2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        value={dishDesc}
                        onChange={(e) => setDishDesc(e.target.value)}
                        placeholder="Short description (ingredients, spice level...)"
                        className={`w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                    />

                    <button
                        type="submit"
                        className={`w-full ${theme.bgClass} ${theme.hoverBgClass} text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Dish to Live Menu</span>
                    </button>
                </form>

                {/* Searchable & Filterable Published Dishes List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Published Dishes
                        </h3>
                        <span className="text-[11px] font-medium text-slate-500">
                            {filteredMenuItems.length} of {menuItems.length} items
                        </span>
                    </div>

                    {/* Search & Dietary Filter Controls */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search dishes or category..."
                                className={`w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                            />
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                            {(['All', 'Veg', 'Non-Veg'] as const).map((diet) => (
                                <button
                                    key={diet}
                                    type="button"
                                    onClick={() => setDietFilter(diet)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                        dietFilter === diet
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {diet}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dishes List */}
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                        {filteredMenuItems.length === 0 ? (
                            <p className="text-xs text-slate-400 text-center py-6 bg-slate-50 rounded-xl">
                                No matching dishes found.
                            </p>
                        ) : (
                            filteredMenuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                                        item.available
                                            ? 'border-slate-200 bg-white'
                                            : 'border-slate-200/60 bg-slate-50 opacity-75'
                                    }`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                            <span
                                                className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[8px] font-bold shrink-0 ${
                                                    item.diet === 'Veg'
                                                        ? 'border-emerald-600 text-emerald-600'
                                                        : 'border-rose-600 text-rose-600'
                                                }`}
                                            >
                                                {item.diet === 'Veg' ? '●' : '▲'}
                                            </span>
                                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</p>
                                        <p className={`text-xs font-bold ${theme.textClass} mt-1`}>
                                            ₹{item.price.toLocaleString('en-IN')}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => onToggleDishAvailability(item.id)}
                                            title={item.available ? 'Mark Sold Out' : 'Mark Available'}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition cursor-pointer ${
                                                item.available ? 'bg-emerald-500' : 'bg-slate-300'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${
                                                    item.available ? 'translate-x-4.5' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteMenuItem(item.id)}
                                            title="Delete Dish"
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenuUploadSection;
