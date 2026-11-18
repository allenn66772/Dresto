
import {
    Crown,
    Bell,
    Sparkles,
    Images,
    Camera,
    UtensilsCrossed,
    Star,
    MapPin,
    Clock,
    Phone,
    SlidersHorizontal,
    Users,
    MessageSquareWarning,
    BookOpenCheck,
    AlertCircle,
    Utensils,
    ImagePlus,
    AlertTriangle,
    BellRing,
    X,
    Check,
    CheckCircle2,
    Info,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Reviews, { type Review } from '../Reviews';
import {
    ComplaintsSection,
    MenuUploadSection as ExternalMenuUploadSection,
    PhotoUploadSection as ExternalPhotoUploadSection
} from '../restaurents';
import type {
    ComplaintItem,
    ComplaintStatus
} from '../restaurents/restaurant.types';


// ============================================================================
// 1. TYPESCRIPT INTERFACES & TYPES
// ============================================================================

export type AccentThemeKey = 'amber' | 'emerald' | 'rose' | 'indigo' | 'sky';

export interface AccentThemeConfig {
    key: AccentThemeKey;
    label: string;
    swatchClass: string;
    bgClass: string;
    hoverBgClass: string;
    textClass: string;
    borderClass: string;
    ringClass: string;
    softBgClass: string;
}

export interface NotificationItem {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'complaint' | 'menu' | 'photo' | 'system';
    unread: boolean;
}

export interface RestaurantProfile {
    name: string;
    tagline: string;
    location: string;
    hours: string;
    contact: string;
    cuisines: string[];
    accentTheme: AccentThemeKey;
}



export interface MenuDocument {
    id: string;
    name: string;
    size: string;
    type: 'PDF Document' | 'Menu Image';
    uploadedAt: string;
    previewUrl?: string;
}

export interface MenuItem {
    id: number;
    name: string;
    category: 'Starters' | 'Main Course' | 'Breads & Rice' | 'Desserts' | 'Cocktails';
    price: number;
    diet: 'Veg' | 'Non-Veg';
    desc: string;
    available: boolean;
}

export type GalleryCategory = 'Ambiance' | 'Food & Drinks' | 'Rooms' | 'Events';

export interface GalleryPhoto {
    id: string;
    title: string;
    category: GalleryCategory;
    url: string;
    date: string;
}

export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'info' | 'warning';
}

// ============================================================================
// 2. THEME CONFIGURATION & INITIAL SAMPLE DATA
// ============================================================================

const ACCENT_THEMES: Record<AccentThemeKey, AccentThemeConfig> = {
    amber: {
        key: 'amber',
        label: 'Royal Amber',
        swatchClass: 'bg-amber-600',
        bgClass: 'bg-amber-600',
        hoverBgClass: 'hover:bg-amber-700',
        textClass: 'text-amber-600',
        borderClass: 'border-amber-500',
        ringClass: 'focus:ring-amber-500',
        softBgClass: 'bg-amber-50'
    },
    emerald: {
        key: 'emerald',
        label: 'Emerald Courtyard',
        swatchClass: 'bg-emerald-600',
        bgClass: 'bg-emerald-600',
        hoverBgClass: 'hover:bg-emerald-700',
        textClass: 'text-emerald-600',
        borderClass: 'border-emerald-500',
        ringClass: 'focus:ring-emerald-500',
        softBgClass: 'bg-emerald-50'
    },
    rose: {
        key: 'rose',
        label: 'Saffron Crimson',
        swatchClass: 'bg-rose-600',
        bgClass: 'bg-rose-600',
        hoverBgClass: 'hover:bg-rose-700',
        textClass: 'text-rose-600',
        borderClass: 'border-rose-500',
        ringClass: 'focus:ring-rose-500',
        softBgClass: 'bg-rose-50'
    },
    indigo: {
        key: 'indigo',
        label: 'Midnight Indigo',
        swatchClass: 'bg-indigo-600',
        bgClass: 'bg-indigo-600',
        hoverBgClass: 'hover:bg-indigo-700',
        textClass: 'text-indigo-600',
        borderClass: 'border-indigo-500',
        ringClass: 'focus:ring-indigo-500',
        softBgClass: 'bg-indigo-50'
    },
    sky: {
        key: 'sky',
        label: 'Coastal Azure',
        swatchClass: 'bg-sky-600',
        bgClass: 'bg-sky-600',
        hoverBgClass: 'hover:bg-sky-700',
        textClass: 'text-sky-600',
        borderClass: 'border-sky-500',
        ringClass: 'focus:ring-sky-500',
        softBgClass: 'bg-sky-50'
    }
};

const PRESET_COVERS = [
    {
        label: 'Fine Dining',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=70'
    },
    {
        label: 'Resort Pool',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70'
    },
    {
        label: 'Rooftop Bar',
        url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=70'
    },
    {
        label: 'Royal Suites',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=70'
    }
];

const INITIAL_PROFILE: RestaurantProfile = {
    name: 'The Saffron Pavilion & Grand Hotel',
    tagline: 'Contemporary Indian Fine Dining, Artisan Cocktails & Boutique Luxury Suites',
    location: '42 Marine Drive, South Mumbai',
    hours: '11:30 AM – 11:30 PM (All Days)',
    contact: '+91 22 4890 7721',
    cuisines: ['North Indian Royal', 'Coastal Seafood', 'Craft Mixology', 'Luxury Stays'],
    accentTheme: 'amber'
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        title: 'New High-Priority Table Complaint',
        message: 'Aarav Mehta (Table 08) reported a 25-minute delay on main course.',
        time: '4 mins ago',
        type: 'complaint',
        unread: true
    },
    {
        id: 2,
        title: 'Seasonal Monsoon Menu Approved',
        message: 'Your PDF upload "Grand_Dinner_Menu_2026.pdf" is now live for guests.',
        time: '38 mins ago',
        type: 'menu',
        unread: true
    },
    {
        id: 3,
        title: 'New 5-Star Photo Review',
        message: 'Priya Nair shared 2 photos of the Rooftop Infinity Lounge.',
        time: '2 hours ago',
        type: 'photo',
        unread: true
    },
    {
        id: 4,
        title: 'Suite 402 Housekeeping Cleared',
        message: 'Presidential Sea-View Suite is ready for VIP check-in.',
        time: 'Yesterday',
        type: 'system',
        unread: false
    }
];

const INITIAL_COMPLAINTS: ComplaintItem[] = [
    {
        id: 101,
        customer: 'Aarav Mehta',
        unit: 'Table 08 • Dining Hall',
        severity: 'High',
        status: 'Pending',
        time: '12 mins ago',
        text: 'We ordered the Coastal Prawn Curry and Garlic Naan 30 minutes ago, and our starters were cleared 15 minutes back with no update from the server.',
        reply: ''
    },
    {
        id: 102,
        customer: 'Meera Krishnan',
        unit: 'Suite 304 • Heritage Wing',
        severity: 'Medium',
        status: 'In Progress',
        time: '45 mins ago',
        text: 'The room air conditioning is slightly noisy on high fan mode. Would appreciate if engineering could take a look before tonight.',
        reply: 'Duty engineer dispatched to Suite 304; complimentary fruit platter arranged.'
    },
    {
        id: 103,
        customer: 'Rohan Deshmukh',
        unit: 'Table 14 • Terrace Deck',
        severity: 'Low',
        status: 'Resolved',
        time: '3 hours ago',
        text: 'Requested a quieter corner table away from the live acoustic speaker for an anniversary dinner.',
        reply: 'Moved guests to Private Cabana #2 with complimentary sparkling toast.'
    },
    {
        id: 104,
        customer: 'Ananya Sharma',
        unit: 'Room 210 • Deluxe King',
        severity: 'Medium',
        status: 'Pending',
        time: '5 hours ago',
        text: 'In-room dining menu QR code on the nightstand led to a broken link.',
        reply: ''
    }
];

const INITIAL_MENU_FILES: MenuDocument[] = [
    {
        id: 'doc-1',
        name: 'Grand_Dinner_Menu_2026.pdf',
        size: '3.4 MB',
        type: 'PDF Document',
        uploadedAt: 'Today, 10:15 AM'
    },
    {
        id: 'doc-2',
        name: 'Artisan_Cocktails_Wine_List.pdf',
        size: '1.8 MB',
        type: 'PDF Document',
        uploadedAt: 'Yesterday'
    }
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Smoked Dal Makhani',
        category: 'Main Course',
        price: 680,
        diet: 'Veg',
        desc: '24-hour slow-cooked black lentils finished with white butter',
        available: true
    },
    {
        id: 2,
        name: 'Malabar Lobster Moilee',
        category: 'Main Course',
        price: 1450,
        diet: 'Non-Veg',
        desc: 'Fresh coastal lobster simmered in spiced coconut milk',
        available: true
    },
    {
        id: 3,
        name: 'Truffle & Wild Mushroom Kulcha',
        category: 'Breads & Rice',
        price: 420,
        diet: 'Veg',
        desc: 'Tandoor-baked flatbread stuffed with porcini & aged cheddar',
        available: true
    },
    {
        id: 4,
        name: 'Saffron Pistachio Rasmalai',
        category: 'Desserts',
        price: 490,
        diet: 'Veg',
        desc: 'Chilled cottage cheese dumplings in Kashmiri saffron milk',
        available: true
    },
    {
        id: 5,
        name: 'Smoked Cinnamon Old Fashioned',
        category: 'Cocktails',
        price: 790,
        diet: 'Veg',
        desc: 'Small-batch bourbon infused with burnt cinnamon & orange bitters',
        available: false
    },
    {
        id: 6,
        name: 'Chargrilled Lamb Galouti',
        category: 'Starters',
        price: 890,
        diet: 'Non-Veg',
        desc: 'Melt-in-mouth spiced lamb medallions on saffron sheermal',
        available: true
    }
];

const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
    {
        id: 'gal-1',
        title: 'Main Candlelit Dining Pavilion',
        category: 'Ambiance',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        date: 'Featured'
    },
    {
        id: 'gal-2',
        title: 'Signature Coastal Tasting Platter',
        category: 'Food & Drinks',
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        date: '2 days ago'
    },
    {
        id: 'gal-3',
        title: 'Imperial Ocean-View Suite',
        category: 'Rooms',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        date: '3 days ago'
    },
    {
        id: 'gal-4',
        title: 'Sunset Infinity Pool & Cabanas',
        category: 'Ambiance',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        date: '5 days ago'
    },
    {
        id: 'gal-5',
        title: 'Grand Crystal Ballroom Setup',
        category: 'Events',
        url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
        date: '1 week ago'
    },
    {
        id: 'gal-6',
        title: 'Artisan Mixology Bar Counter',
        category: 'Food & Drinks',
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
        date: '1 week ago'
    }
];

const INITIAL_REVIEWS: Review[] = [
    {
        id: 1,
        name: 'Priya Nair',
        rating: 5,
        text: 'The rooftop dinner and coastal tasting menu were exceptional.',
        date: 'Today'
    },
    {
        id: 2,
        name: 'Kabir Shah',
        rating: 4,
        text: 'Great service and ambience. The main course arrived a little late.',
        date: 'Yesterday'
    }
];

// ============================================================================
// 3. DEDICATED SUB-COMPONENTS
// ============================================================================

/**
 * COMPONENT 1: Sticky Top Header
 * Includes Grand Horizon branding, interactive Open/Closed status toggle,
 * Notification Bell with unread badge + dropdown popover, and owner profile chip.
 */
interface HeaderProps {
    isBusinessOpen: boolean;
    onToggleBusinessStatus: () => void;
    notifications: NotificationItem[];
    onMarkSingleRead: (id: number) => void;
    onMarkAllRead: () => void;
    theme: AccentThemeConfig;
}

const Header: React.FC<HeaderProps> = ({
    isBusinessOpen,
    onToggleBusinessStatus,
    notifications,
    onMarkSingleRead,
    onMarkAllRead,
    theme
}) => {
    const [notifOpen, setNotifOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderNotifIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'complaint':
                return (
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                    </div>
                );
            case 'menu':
                return (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Utensils className="w-4 h-4" />
                    </div>
                );
            case 'photo':
                return (
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Camera className="w-4 h-4" />
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <BellRing className="w-4 h-4" />
                    </div>
                );
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Brand Logo & Portal Title */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${theme.bgClass} flex items-center justify-center shadow-md shrink-0 transition-colors`}>
                        <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white">
                                Grand Horizon
                            </span>
                            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-slate-800 text-amber-400 border border-slate-700">
                                Owner Portal
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 hidden md:block">
                            Hospitality &amp; Dining Command Center
                        </p>
                    </div>
                </div>

                {/* Right Controls: Live Status Toggle, Notification Bell, Owner Profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Interactive Open / Closed Status Pill */}
                    <button
                        type="button"
                        onClick={onToggleBusinessStatus}
                        title="Click to toggle restaurant live status"
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${isBusinessOpen
                                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                                : 'bg-rose-500/15 border-rose-500/30 text-rose-300 hover:bg-rose-500/25'
                            }`}
                    >
                        <span
                            className={`w-2 h-2 rounded-full ${isBusinessOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                                }`}
                        />
                        <span className="hidden sm:inline">
                            {isBusinessOpen ? 'Open for Dining' : 'Temporarily Closed'}
                        </span>
                        <span className="sm:hidden">{isBusinessOpen ? 'Open' : 'Closed'}</span>
                    </button>

                    {/* Notification Bell & Popover */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setNotifOpen((prev) => !prev)}
                            aria-label="Notifications"
                            className="relative p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 transition focus:outline-none cursor-pointer"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm ring-2 ring-slate-900">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 text-slate-800 overflow-hidden z-50">
                                <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <h3 className="text-sm font-semibold">Notifications</h3>
                                        <span className="text-xs bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full font-medium">
                                            {unreadCount > 0 ? `${unreadCount} new` : 'All caught up'}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onMarkAllRead}
                                        className="text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition cursor-pointer"
                                    >
                                        Mark all as read
                                    </button>
                                </div>

                                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                                    {notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => onMarkSingleRead(item.id)}
                                            className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer ${item.unread ? 'bg-amber-50/40' : ''
                                                }`}
                                        >
                                            {renderNotifIcon(item.type)}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-xs font-semibold text-slate-900 truncate">
                                                        {item.title}
                                                    </p>
                                                    {item.unread && (
                                                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                                    {item.message}
                                                </p>
                                                <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
                                    <span className="text-xs text-slate-500">
                                        Real-time alerts for Grand Horizon Hospitality
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Owner Profile Chip */}
                    <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-800">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80"
                            alt="Vikram Singhania"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/70"
                        />
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-semibold text-white leading-tight">Vikram Singhania</p>
                            <p className="text-[11px] text-slate-400">Managing Director</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

/**
 * COMPONENT 2A: CoverBanner Hero & Profile Summary Card
 */
interface CoverBannerProps {
    coverUrl: string;
    onChangeCoverUrl: (url: string, label: string) => void;
    profile: RestaurantProfile;
    theme: AccentThemeConfig;
    onOpenCustomizeModal: () => void;
}

const CoverBanner: React.FC<CoverBannerProps> = ({
    coverUrl,
    onChangeCoverUrl,
    profile,
    theme,
    onOpenCustomizeModal
}) => {
    const [presetOpen, setPresetOpen] = useState(false);
    const presetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (presetRef.current && !presetRef.current.contains(e.target as Node)) {
                setPresetOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const handleLocalCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const localUrl = URL.createObjectURL(file);
        onChangeCoverUrl(localUrl, file.name);
        e.target.value = '';
    };

    return (
        <section className="relative bg-slate-900">
            {/* Full-Width Cover Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden group">
                <img
                    src={coverUrl}
                    alt="Business Cover Photo"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/20" />

                {/* Top-Right Cover Photo Actions */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-wrap items-center gap-2 z-20">
                    {/* Preset Hospitality Banners Dropdown */}
                    <div className="relative" ref={presetRef}>
                        <button
                            type="button"
                            onClick={() => setPresetOpen((prev) => !prev)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-md border border-white/15 shadow-lg transition cursor-pointer"
                        >
                            <Images className="w-4 h-4 text-amber-400" />
                            <span className="hidden sm:inline">Preset Banners</span>
                        </button>

                        {presetOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-30">
                                <p className="text-xs font-semibold text-slate-700 mb-2 px-1">
                                    Choose Hospitality Banner
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {PRESET_COVERS.map((preset) => (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => {
                                                onChangeCoverUrl(preset.url, preset.label);
                                                setPresetOpen(false);
                                            }}
                                            className="relative rounded-xl overflow-hidden h-14 border border-slate-200 hover:border-amber-500 transition cursor-pointer"
                                        >
                                            <img
                                                src={preset.thumb}
                                                alt={preset.label}
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute inset-0 bg-black/45 flex items-center justify-center text-[10px] font-semibold text-white">
                                                {preset.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Local Cover Photo Upload Button */}
                    <label
                        htmlFor="cover-upload-input"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-lg cursor-pointer transition"
                    >
                        <Camera className={`w-4 h-4 ${theme.textClass}`} />
                        <span>Change Cover Photo</span>
                    </label>
                    <input
                        id="cover-upload-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLocalCoverUpload}
                    />
                </div>
            </div>

            {/* Overlapping Business Profile Identity Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                <div className="relative -mt-20 sm:-mt-24 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Left: Emblem + Business Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border-4 border-white shadow-lg flex flex-col items-center justify-center text-white shrink-0">
                                <UtensilsCrossed className={`w-8 h-8 ${theme.textClass} mb-1 transition-colors`} />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">
                                    5-Star
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                                        {profile.name}
                                    </h1>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                        4.9 <span className="text-amber-600 font-normal">(1,280 reviews)</span>
                                    </span>
                                </div>

                                <p className="text-sm text-slate-600 font-medium">{profile.tagline}</p>

                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin className={`w-3.5 h-3.5 ${theme.textClass}`} />
                                        <span>{profile.location}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className={`w-3.5 h-3.5 ${theme.textClass}`} />
                                        <span>{profile.hours}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Phone className={`w-3.5 h-3.5 ${theme.textClass}`} />
                                        <span>{profile.contact}</span>
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                                    {profile.cuisines.map((tag, idx) => (
                                        <span
                                            key={`${tag}-${idx}`}
                                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Customize Restaurant Profile CTA */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={onOpenCustomizeModal}
                                className={`${theme.bgClass} ${theme.hoverBgClass} text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span>Customize Restaurant Profile</span>
                            </button>
                            <p className="text-[11px] text-slate-400 text-center lg:text-right">
                                Update brand identity, hours &amp; theme color live
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * COMPONENT 2B: Restaurant Profile Customization Modal
 */
interface ProfileCustomizationModalProps {
    isOpen: boolean;
    profile: RestaurantProfile;
    onClose: () => void;
    onSave: (updated: RestaurantProfile) => void;
}

const ProfileCustomizationModal: React.FC<ProfileCustomizationModalProps> = ({
    isOpen,
    profile,
    onClose,
    onSave
}) => {
    const [name, setName] = useState(profile.name);
    const [tagline, setTagline] = useState(profile.tagline);
    const [location, setLocation] = useState(profile.location);
    const [contact, setContact] = useState(profile.contact);
    const [hours, setHours] = useState(profile.hours);
    const [cuisinesRaw, setCuisinesRaw] = useState(profile.cuisines.join(', '));
    const [accentTheme, setAccentTheme] = useState<AccentThemeKey>(profile.accentTheme);

    useEffect(() => {
        if (isOpen) {
            setName(profile.name);
            setTagline(profile.tagline);
            setLocation(profile.location);
            setContact(profile.contact);
            setHours(profile.hours);
            setCuisinesRaw(profile.cuisines.join(', '));
            setAccentTheme(profile.accentTheme);
        }
    }, [isOpen, profile]);

    if (!isOpen) return null;

    const activeTheme = ACCENT_THEMES[accentTheme];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedCuisines = cuisinesRaw
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean);

        onSave({
            name: name.trim(),
            tagline: tagline.trim(),
            location: location.trim(),
            contact: contact.trim(),
            hours: hours.trim(),
            cuisines: parsedCuisines.length > 0 ? parsedCuisines : ['Fine Dining'],
            accentTheme
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl ${activeTheme.bgClass} flex items-center justify-center transition-colors`}>
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold">Customize Restaurant Profile</h3>
                            <p className="text-xs text-slate-400">
                                Changes update your public banner and dashboard theme live
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Hotel / Restaurant Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Brand Tagline
                        </label>
                        <input
                            type="text"
                            required
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Location Address
                            </label>
                            <input
                                type="text"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Reservation Phone
                            </label>
                            <input
                                type="text"
                                required
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Opening Hours
                            </label>
                            <input
                                type="text"
                                required
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Cuisine Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                required
                                value={cuisinesRaw}
                                onChange={(e) => setCuisinesRaw(e.target.value)}
                                className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 ${activeTheme.ringClass}`}
                            />
                        </div>
                    </div>

                    {/* Primary Brand Accent Color Picker */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                            Primary Brand Accent Theme
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                            {(Object.keys(ACCENT_THEMES) as AccentThemeKey[]).map((key) => {
                                const item = ACCENT_THEMES[key];
                                const isSelected = accentTheme === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setAccentTheme(key)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${isSelected
                                                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        <span className={`w-3.5 h-3.5 rounded-full ${item.swatchClass}`} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${activeTheme.bgClass} ${activeTheme.hoverBgClass} text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition flex items-center gap-2 cursor-pointer`}
                        >
                            <Check className="w-4 h-4" />
                            <span>Save Profile Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * COMPONENT 3: Dedicated Guest Complaints & Service Desk Section
 * Receives complaints state & handlers from Dashboard.
 */




// Menu, photo, and complaint sections are imported from src/restaurents.

// ============================================================================
// 4. MAIN DASHBOARD & ROOT APP COMPONENT
// ============================================================================

const Dashboard: React.FC = () => {
    const [isBusinessOpen, setIsBusinessOpen] = useState<boolean>(true);
    const [coverUrl, setCoverUrl] = useState<string>(PRESET_COVERS[0].url);
    const [profile, setProfile] = useState<RestaurantProfile>(INITIAL_PROFILE);
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState<boolean>(false);

    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_COMPLAINTS);
    const [menuFiles, setMenuFiles] = useState<MenuDocument[]>(INITIAL_MENU_FILES);
    const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
    const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);

    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const activeTheme = ACCENT_THEMES[profile.accentTheme];

    const triggerToast = (
        message: string,
        type: 'success' | 'info' | 'warning' = 'success'
    ) => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3400);
    };

    // Header Handlers
    const handleToggleBusinessStatus = () => {
        setIsBusinessOpen((prev) => {
            const next = !prev;
            triggerToast(
                next
                    ? 'Status set to Open for Dining & Reservations'
                    : 'Status set to Temporarily Closed',
                next ? 'success' : 'info'
            );
            return next;
        });
    };

    const handleMarkSingleNotificationRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
        );
    };

    const handleMarkAllNotificationsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
        triggerToast('All notifications marked as read', 'info');
    };

    // Cover & Profile Handlers
    const handleChangeCoverUrl = (url: string, label: string) => {
        setCoverUrl(url);
        triggerToast(`Cover photo updated to "${label}"`);
    };

    const handleSaveProfile = (updated: RestaurantProfile) => {
        setProfile(updated);
        setIsCustomizeModalOpen(false);
        triggerToast('Restaurant profile & brand theme updated live!');
    };

    // Complaints Handlers
    const handleResolveOrReplyComplaint = (
        id: number,
        status: ComplaintStatus,
        reply: string
    ) => {
        const target = complaints.find((c) => c.id === id);
        setComplaints((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status, reply } : c))
        );
        if (target) {
            triggerToast(`Response sent to ${target.customer} (${status})`);
        }
    };

    const handleQuickResolveComplaint = (id: number) => {
        const target = complaints.find((c) => c.id === id);
        setComplaints((prev) =>
            prev.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        status: 'Resolved',
                        reply: c.reply || 'Issue addressed immediately by Duty Manager on floor.'
                    }
                    : c
            )
        );
        if (target) {
            triggerToast(`Marked ${target.customer}'s complaint as Resolved`);
        }
    };

    // Menu Handlers
    const handleUploadMenuFiles = (fileList: FileList) => {
        const newDocs: MenuDocument[] = Array.from(fileList).map((file) => {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            const isPdf =
                file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf');
            return {
                id: `doc-${Date.now()}-${Math.random()}`,
                name: file.name,
                size: `${sizeMB} MB`,
                type: isPdf ? 'PDF Document' : 'Menu Image',
                uploadedAt: 'Just now',
                previewUrl: isPdf ? undefined : URL.createObjectURL(file)
            };
        });

        setMenuFiles((prev) => [...newDocs, ...prev]);
        triggerToast(`${newDocs.length} menu file(s) uploaded and published!`);
    };

    const handleDeleteMenuFile = (id: string) => {
        setMenuFiles((prev) => prev.filter((f) => f.id !== id));
        triggerToast('Menu file removed', 'info');
    };

    const handleAddMenuItem = (newDish: Omit<MenuItem, 'id' | 'available'>) => {
        const created: MenuItem = {
            ...newDish,
            id: Date.now(),
            available: true
        };
        setMenuItems((prev) => [created, ...prev]);
        triggerToast(`Added "${created.name}" to live menu!`);
    };

    const handleToggleDishAvailability = (id: number) => {
        const target = menuItems.find((m) => m.id === id);
        setMenuItems((prev) =>
            prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m))
        );
        if (target) {
            triggerToast(
                `"${target.name}" marked ${!target.available ? 'In Stock' : 'Sold Out'}`,
                'info'
            );
        }
    };

    const handleDeleteMenuItem = (id: number) => {
        const target = menuItems.find((m) => m.id === id);
        setMenuItems((prev) => prev.filter((m) => m.id !== id));
        if (target) {
            triggerToast(`Removed "${target.name}" from menu`, 'info');
        }
    };

    // Gallery Photos Handlers
    const handleUploadGalleryPhotos = (
        fileList: FileList,
        category: GalleryCategory
    ) => {
        const validImages = Array.from(fileList).filter((f) =>
            f.type.startsWith('image/')
        );
        if (validImages.length === 0) return;

        const uploaded: GalleryPhoto[] = validImages.map((file) => {
            const cleanTitle = file.name
                .replace(/\.[^/.]+$/, '')
                .replace(/[-_]/g, ' ');
            return {
                id: `gal-${Date.now()}-${Math.random()}`,
                title: cleanTitle || 'Uploaded Property Photo',
                category,
                url: URL.createObjectURL(file),
                date: 'Just now'
            };
        });

        setGalleryPhotos((prev) => [...uploaded, ...prev]);
        triggerToast(`Uploaded ${uploaded.length} photo(s) to "${category}"`);
    };

    const handleSetGalleryPhotoAsCover = (photo: GalleryPhoto) => {
        setCoverUrl(photo.url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        triggerToast(`"${photo.title}" set as your business cover photo!`);
    };

    const handleDeleteGalleryPhoto = (id: string) => {
        setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
        triggerToast('Photo removed from gallery', 'info');
    };

    const openComplaintsCount = complaints.filter(
        (c) => c.status !== 'Resolved'
    ).length;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            {/* Toast Notification Stack */}
            <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
                {toasts.map((toast) => {
                    const borderClass =
                        toast.type === 'success'
                            ? 'border-emerald-500'
                            : toast.type === 'info'
                                ? 'border-amber-500'
                                : 'border-rose-500';
                    return (
                        <div
                            key={toast.id}
                            className={`pointer-events-auto flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border-l-4 ${borderClass} text-xs font-medium max-w-sm`}
                        >
                            {toast.type === 'success' && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {toast.type === 'info' && (
                                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            {toast.type === 'warning' && (
                                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span className="leading-snug">{toast.message}</span>
                        </div>
                    );
                })}
            </div>

            {/* 1. Sticky Top Header */}
            <Header
                isBusinessOpen={isBusinessOpen}
                onToggleBusinessStatus={handleToggleBusinessStatus}
                notifications={notifications}
                onMarkSingleRead={handleMarkSingleNotificationRead}
                onMarkAllRead={handleMarkAllNotificationsRead}
                theme={activeTheme}
            />

            {/* 2. Cover Banner & Restaurant Profile Summary */}
            <CoverBanner
                coverUrl={coverUrl}
                onChangeCoverUrl={handleChangeCoverUrl}
                profile={profile}
                theme={activeTheme}
                onOpenCustomizeModal={() => setIsCustomizeModalOpen(true)}
            />

            {/* Profile Customization Modal */}
            <ProfileCustomizationModal
                isOpen={isCustomizeModalOpen}
                profile={profile}
                onClose={() => setIsCustomizeModalOpen(false)}
                onSave={handleSaveProfile}
            />

            {/* 3. Main Dashboard Workspace */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {/* Quick Overview KPI Cards */}
                <section
                    aria-label="Key Business Metrics"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Today&apos;s Covers &amp; Rooms
                            </p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                148{' '}
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                    +14%
                                </span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">86% dining occupancy</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Open Complaints
                            </p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {openComplaintsCount}{' '}
                                <span
                                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${openComplaintsCount > 0
                                            ? 'text-rose-600 bg-rose-50'
                                            : 'text-emerald-600 bg-emerald-50'
                                        }`}
                                >
                                    {openComplaintsCount > 0 ? 'Action Needed' : 'All Resolved'}
                                </span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Avg resolution: 18 mins</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                            <MessageSquareWarning className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Active Menu Items
                            </p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{menuItems.length}</p>
                            <p className="text-xs text-slate-400 mt-1">
                                {menuFiles.length} menu file{menuFiles.length === 1 ? '' : 's'} published
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BookOpenCheck className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Showcase Gallery
                            </p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                {galleryPhotos.length} Photos
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Synced to guest portal</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Camera className="w-6 h-6" />
                        </div>
                    </div>
                </section>

                {/* Quick Section Anchor Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <a
                        href="#complaints-section"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm hover:bg-slate-800 transition shrink-0"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        Guest Complaints
                    </a>
                    <a
                        href="#menu-section"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shrink-0"
                    >
                        <Utensils className={`w-3.5 h-3.5 ${activeTheme.textClass}`} />
                        Menu Uploading
                    </a>
                    <a
                        href="#photos-section"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shrink-0"
                    >
                        <ImagePlus className={`w-3.5 h-3.5 ${activeTheme.textClass}`} />
                        Photos Uploading
                    </a>
                    <a
                        href="#reviews-section"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shrink-0"
                    >
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        Reviews
                    </a>
                </div>

                {/* Primary Workspace Grid: Separate ComplaintsSection + MenuUploadSection */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7">
                        <ComplaintsSection
                            complaints={complaints}
                            onResolveOrReply={handleResolveOrReplyComplaint}
                            onQuickResolve={handleQuickResolveComplaint}
                            theme={activeTheme}
                        />
                    </div>

                    <div className="lg:col-span-5">
                        <ExternalMenuUploadSection
                            menuFiles={menuFiles}
                            onUploadMenuFiles={handleUploadMenuFiles}
                            onDeleteMenuFile={handleDeleteMenuFile}
                            menuItems={menuItems}
                            onAddMenuItem={handleAddMenuItem}
                            onToggleDishAvailability={handleToggleDishAvailability}
                            onDeleteMenuItem={handleDeleteMenuItem}
                            theme={activeTheme}
                        />
                    </div>
                </div>

                <section id="reviews-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                    <div className="mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-slate-900">Guest Reviews</h2>
                    </div>
                    <Reviews initial={INITIAL_REVIEWS} />
                </section>

                {/* Full-Width Separate PhotoUploadSection */}
                <ExternalPhotoUploadSection
                    photos={galleryPhotos}
                    onUploadPhotos={handleUploadGalleryPhotos}
                    onSetAsCover={handleSetGalleryPhotoAsCover}
                    onDeletePhoto={handleDeleteGalleryPhoto}
                    theme={activeTheme}
                />
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8 border-t border-slate-200 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-400">
                <p>&copy; 2026 Grand Horizon Hospitality Group. Owner Management Suite.</p>
                <p className="mt-2 sm:mt-0">
                    All changes auto-sync with guest booking &amp; table reservation channels.
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;