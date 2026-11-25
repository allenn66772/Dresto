import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
    Camera,
    Star,
    MapPin,
    Clock,
    Phone,
    SlidersHorizontal,
    MessageSquareWarning,
    AlertCircle,
    Utensils,
    ImagePlus,
    X,
    Check,
    CheckCircle2,
    Info,
    Bell,
    Plus,
    FileText,
    Trash2,
    UploadCloud,
    Send,
    LayoutDashboard,
    Building2,
    Menu,
} from 'lucide-react';
import SelectBranchModal from '../hotelcomponents/SelectBranchModal';
import type { Branch } from '../hotelcomponents/SelectBranchModal';
import { useRestaurantStore } from '../features/restuarant/restaurant.store';
// import { log } from 'console';

type AccentTheme = 'teal' | 'amber' | 'emerald' | 'rose' | 'indigo';

interface Profile {
    name: string;
    tagline: string;
    location: string;
    hours: string;
    contact: string;
    cuisines: string[];
    accentTheme: AccentTheme;
}

interface NotificationItem {
    id: number;
    title: string;
    message: string;
    time: string;
    unread: boolean;
}

interface Complaint {
    id: number;
    customer: string;
    unit: string;
    severity: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
    time: string;
    text: string;
    reply: string;
}

interface MenuFile {
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedAt: string;
}

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    diet: 'Veg' | 'Non-Veg';
    desc: string;
    available: boolean;
}

interface GalleryPhoto {
    id: string;
    title: string;
    category: string;
    url: string;
    date: string;
}

interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
}

interface ToastItem {
    id: string;
    message: string;
    type: 'success' | 'info';
}

const ACCENT_THEMES: Record<
    AccentTheme,
    {
        key: AccentTheme;
        label: string;
        swatchClass: string;
        bgClass: string;
        hoverBgClass: string;
        textClass: string;
        borderClass: string;
        ringClass: string;
        softBgClass: string;
    }
> = {
    teal: {
        key: 'teal',
        label: 'Dresto Teal',
        swatchClass: 'bg-[#148873]',
        bgClass: 'bg-[#148873]',
        hoverBgClass: 'hover:bg-[#10705e]',
        textClass: 'text-[#148873]',
        borderClass: 'border-[#148873]',
        ringClass: 'focus:ring-[#148873]',
        softBgClass: 'bg-teal-50',
    },
    amber: {
        key: 'amber',
        label: 'Royal Amber',
        swatchClass: 'bg-amber-600',
        bgClass: 'bg-amber-600',
        hoverBgClass: 'hover:bg-amber-700',
        textClass: 'text-amber-600',
        borderClass: 'border-amber-500',
        ringClass: 'focus:ring-amber-500',
        softBgClass: 'bg-amber-50',
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
        softBgClass: 'bg-emerald-50',
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
        softBgClass: 'bg-rose-50',
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
        softBgClass: 'bg-indigo-50',
    },
};

const PRESET_COVERS = [
    {
        label: 'Fine Dining',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=70',
    },
    {
        label: 'Resort Pool',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70',
    },
    {
        label: 'Rooftop Bar',
        url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=70',
    },
    {
        label: 'Royal Suites',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=85',
        thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=70',
    },
];

const INITIAL_BRANCHES: Branch[] = [
    {
        id: 1,
        name: 'Marine Drive Flagship',
        code: 'MUM-01',
        location: '42 Marine Drive, South Mumbai',
        isActive: true,
    },
    {
        id: 2,
        name: 'Bandra West Lounge',
        code: 'MUM-02',
        location: 'Linking Road, Bandra West',
        isActive: true,
    },
    {
        id: 3,
        name: 'Lower Parel Courtyard',
        code: 'MUM-03',
        location: 'Senapati Bapat Marg, Lower Parel',
        isActive: false,
    },
];

const INITIAL_PROFILE: Profile = {
    name: 'The Saffron Pavilion & Grand Hotel',
    tagline: 'Contemporary Indian Fine Dining, Artisan Cocktails & Boutique Luxury Suites',
    location: '42 Marine Drive, South Mumbai',
    hours: '11:30 AM – 11:30 PM (All Days)',
    contact: '+91 22 4890 7721',
    cuisines: ['North Indian Royal', 'Coastal Seafood', 'Craft Mixology', 'Luxury Stays'],
    accentTheme: 'teal',
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        title: 'High-Priority Table Complaint',
        message: 'Aarav Mehta (Table 08) reported a 25-minute delay on main course.',
        time: '4m ago',
        unread: true,
    },
    {
        id: 2,
        title: 'Monsoon Menu Approved',
        message: 'Grand_Dinner_Menu_2026.pdf is now live for guests.',
        time: '38m ago',
        unread: true,
    },
    {
        id: 3,
        title: 'New 5-Star Photo Review',
        message: 'Priya Nair shared 2 photos of the Rooftop Infinity Lounge.',
        time: '2h ago',
        unread: false,
    },
];

const INITIAL_COMPLAINTS: Complaint[] = [
    {
        id: 101,
        customer: 'Aarav Mehta',
        unit: 'Table 08 • Dining Hall',
        severity: 'High',
        status: 'Pending',
        time: '12 mins ago',
        text: 'We ordered the Coastal Prawn Curry and Garlic Naan 30 minutes ago, and our starters were cleared 15 minutes back with no update.',
        reply: '',
    },
    {
        id: 102,
        customer: 'Meera Krishnan',
        unit: 'Suite 304 • Heritage Wing',
        severity: 'Medium',
        status: 'In Progress',
        time: '45 mins ago',
        text: 'The room air conditioning is slightly noisy on high fan mode. Would appreciate if engineering could take a look before tonight.',
        reply: 'Duty engineer dispatched to Suite 304; complimentary fruit platter arranged.',
    },
    {
        id: 103,
        customer: 'Rohan Deshmukh',
        unit: 'Table 14 • Terrace Deck',
        severity: 'Low',
        status: 'Resolved',
        time: '3 hours ago',
        text: 'Requested a quieter corner table away from the live acoustic speaker for an anniversary dinner.',
        reply: 'Moved guests to Private Cabana #2 with complimentary sparkling toast.',
    },
];

const INITIAL_MENU_FILES: MenuFile[] = [
    {
        id: 'doc-1',
        name: 'Grand_Dinner_Menu_2026.pdf',
        size: '3.4 MB',
        type: 'PDF Document',
        uploadedAt: 'Today, 10:15 AM',
    },
    {
        id: 'doc-2',
        name: 'Artisan_Cocktails_Wine_List.pdf',
        size: '1.8 MB',
        type: 'PDF Document',
        uploadedAt: 'Yesterday',
    },
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Smoked Dal Makhani',
        category: 'Main Course',
        price: 680,
        diet: 'Veg',
        desc: '24-hour slow-cooked black lentils finished with white butter',
        available: true,
    },
    {
        id: 2,
        name: 'Malabar Lobster Moilee',
        category: 'Main Course',
        price: 1450,
        diet: 'Non-Veg',
        desc: 'Fresh coastal lobster simmered in spiced coconut milk',
        available: true,
    },
    {
        id: 3,
        name: 'Truffle & Wild Mushroom Kulcha',
        category: 'Breads & Rice',
        price: 420,
        diet: 'Veg',
        desc: 'Tandoor-baked flatbread stuffed with porcini & aged cheddar',
        available: true,
    },
    {
        id: 4,
        name: 'Smoked Cinnamon Old Fashioned',
        category: 'Cocktails',
        price: 790,
        diet: 'Veg',
        desc: 'Small-batch bourbon infused with burnt cinnamon & orange bitters',
        available: false,
    },
];

const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
    {
        id: 'gal-1',
        title: 'Main Candlelit Dining Pavilion',
        category: 'Ambiance',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        date: 'Featured',
    },
    {
        id: 'gal-2',
        title: 'Signature Coastal Tasting Platter',
        category: 'Food & Drinks',
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        date: '2 days ago',
    },
    {
        id: 'gal-3',
        title: 'Imperial Ocean-View Suite',
        category: 'Rooms',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        date: '3 days ago',
    },
    {
        id: 'gal-4',
        title: 'Sunset Infinity Pool & Cabanas',
        category: 'Ambiance',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        date: '5 days ago',
    },
];

const INITIAL_REVIEWS: Review[] = [
    {
        id: 1,
        name: 'Priya Nair',
        rating: 5,
        text: 'The rooftop dinner and coastal tasting menu were exceptional. Service felt truly bespoke.',
        date: 'Today',
    },
    {
        id: 2,
        name: 'Kabir Shah',
        rating: 4,
        text: 'Great service and ambience. The main course arrived a little late during peak rush.',
        date: 'Yesterday',
    },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
    const [activeBranchId, setActiveBranchId] = useState<string | number>(1);
    const [defaultBranchId, setDefaultBranchId] = useState<string | number | null>(1);
    const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

    const [isBusinessOpen, setIsBusinessOpen] = useState(true);
    const [coverUrl, setCoverUrl] = useState(PRESET_COVERS[0].url);
    const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    const [presetOpen, setPresetOpen] = useState(false);
    const presetRef = useRef<HTMLDivElement>(null);

    const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
    const [complaintFilter, setComplaintFilter] = useState<'All' | Complaint['status']>('All');
    const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

    const [menuFiles, setMenuFiles] = useState<MenuFile[]>(INITIAL_MENU_FILES);
    const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
    const [newDishName, setNewDishName] = useState('');
    const [newDishPrice, setNewDishPrice] = useState('');
    const [newDishCategory, setNewDishCategory] = useState('Main Course');
    const [newDishDiet, setNewDishDiet] = useState<MenuItem['diet']>('Veg');

    const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);
    const [galleryFilter, setGalleryFilter] = useState('All');
    const [uploadCategory, setUploadCategory] = useState('Ambiance');

    const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const [editName, setEditName] = useState(profile.name);
    const [editTagline, setEditTagline] = useState(profile.tagline);
    const [editLocation, setEditLocation] = useState(profile.location);
    const [editContact, setEditContact] = useState(profile.contact);
    const [editHours, setEditHours] = useState(profile.hours);
    const [editCuisines, setEditCuisines] = useState(profile.cuisines.join(', '));
    const [editTheme, setEditTheme] = useState<AccentTheme>(profile.accentTheme);

    const theme = ACCENT_THEMES[profile.accentTheme] || ACCENT_THEMES.teal;
    const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];


    ///
    // const restaurants=useRestaurantStore((s)=>s.restaurants);
    const fetchRestaurants=useRestaurantStore((s)=>s.fetchRestaurants)

    useEffect(()=>{
        fetchRestaurants()
        
    },[fetchRestaurants])

    useEffect(() => {
        const handleOutside = (e: globalThis.MouseEvent) => {
            if (notifRef.current && e.target instanceof Node && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
            if (presetRef.current && e.target instanceof Node && !presetRef.current.contains(e.target)) {
                setPresetOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const triggerToast = (message: string, type: ToastItem['type'] = 'success') => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3200);
    };

    const openProfileModal = () => {
        setEditName(profile.name);
        setEditTagline(profile.tagline);
        setEditLocation(profile.location);
        setEditContact(profile.contact);
        setEditHours(profile.hours);
        setEditCuisines(profile.cuisines.join(', '));
        setEditTheme(profile.accentTheme);
        setIsCustomizeModalOpen(true);
    };

    const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parsedCuisines = editCuisines
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean);

        setProfile({
            name: editName.trim(),
            tagline: editTagline.trim(),
            location: editLocation.trim(),
            contact: editContact.trim(),
            hours: editHours.trim(),
            cuisines: parsedCuisines.length ? parsedCuisines : ['Fine Dining'],
            accentTheme: editTheme,
        });
        setIsCustomizeModalOpen(false);
        triggerToast('Restaurant profile & theme updated!');
    };

    const handleLocalCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverUrl(URL.createObjectURL(file));
        triggerToast(`Cover updated to "${file.name}"`);
        e.target.value = '';
    };

    const handleSendComplaintReply = (id: number) => {
        const text = (replyDrafts[id] || '').trim();
        if (!text) return;
        setComplaints((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: 'Resolved', reply: text } : c))
        );
        setReplyDrafts((prev) => ({ ...prev, [id]: '' }));
        triggerToast('Reply sent & complaint resolved');
    };

    const handleQuickResolve = (id: number) => {
        setComplaints((prev) =>
            prev.map((c) =>
                c.id === id
                    ? {
                          ...c,
                          status: 'Resolved',
                          reply: c.reply || 'Resolved immediately by Duty Manager on floor.',
                      }
                    : c
            )
        );
        triggerToast('Complaint marked as Resolved');
    };

    const handleUploadMenuFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        const added = Array.from(files).map((file) => ({
            id: `doc-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            type: file.name.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Menu Image',
            uploadedAt: 'Just now',
        }));
        setMenuFiles((prev) => [...added, ...prev]);
        triggerToast(`${added.length} menu file(s) published`);
        e.target.value = '';
    };

    const handleAddDish = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newDishName.trim() || !newDishPrice) return;
        setMenuItems((prev) => [
            {
                id: Date.now(),
                name: newDishName.trim(),
                category: newDishCategory,
                price: Number(newDishPrice),
                diet: newDishDiet,
                desc: 'Chef special preparation',
                available: true,
            },
            ...prev,
        ]);
        triggerToast(`Added "${newDishName.trim()}" to menu`);
        setNewDishName('');
        setNewDishPrice('');
    };

    const handleUploadPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        const added = Array.from(files).map((file) => ({
            id: `gal-${Date.now()}-${Math.random()}`,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            category: uploadCategory,
            url: URL.createObjectURL(file),
            date: 'Just now',
        }));
        setGalleryPhotos((prev) => [...added, ...prev]);
        triggerToast(`Uploaded ${added.length} photo(s) to ${uploadCategory}`);
        e.target.value = '';
    };

    const handleEnterBranch = (branch: Branch, options: { setAsDefaultOnLogin: boolean }) => {
        setActiveBranchId(branch.id);
        if (options.setAsDefaultOnLogin) {
            setDefaultBranchId(branch.id);
            setProfile((prev) => ({
                ...prev,
                location: branch.location || prev.location,
            }));
        }
        setIsBranchModalOpen(false);
        triggerToast(
            `Switched to ${branch.name}${options.setAsDefaultOnLogin ? ' (set as default on login)' : ''}`
        );
    };

    const handleAddNewBranch = () => {
        const nextNum = branches.length + 1;
        const created: Branch = {
            id: Date.now(),
            name: `New Branch #${nextNum}`,
            code: `BR-0${nextNum}`,
            location: 'Thrissur, Kerala',
            isActive: true,
        };
        setBranches((prev) => [...prev, created]);
        setActiveBranchId(created.id);
        triggerToast(`Added "${created.name}"`);
    };

    const unreadCount = notifications.filter((n) => n.unread).length;
    const openComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;

    const filteredComplaints =
        complaintFilter === 'All'
            ? complaints
            : complaints.filter((c) => c.status === complaintFilter);

    const filteredPhotos =
        galleryFilter === 'All'
            ? galleryPhotos
            : galleryPhotos.filter((p) => p.category === galleryFilter);

    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '0.0';

    const sidebarNav = [
        { id: 'overview', label: 'Overview & Brand', icon: LayoutDashboard },
        {
            id: 'complaints',
            label: 'Guest Complaints',
            icon: MessageSquareWarning,
            badge: openComplaintsCount > 0 ? openComplaintsCount : null,
        },
        {
            id: 'menu',
            label: 'Menu & Uploads',
            icon: Utensils,
            badge: menuItems.length,
        },
        {
            id: 'photos',
            label: 'Property Gallery',
            icon: ImagePlus,
            badge: galleryPhotos.length,
        },
        { id: 'reviews', label: 'Guest Reviews', icon: Star },
    ];

    return (
        <>
            <div className="min-h-screen bg-[#f4f7f6] text-slate-900 font-sans antialiased flex">
                {/* Toast Stack */}
                <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className="pointer-events-auto flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-medium border border-slate-800"
                        >
                            {toast.type === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span>{toast.message}</span>
                        </div>
                    ))}
                </div>

                {/* Mobile Sidebar Overlay */}
                {mobileNavOpen && (
                    <div
                        className="fixed inset-0 bg-slate-950/50 z-40 lg:hidden"
                        onClick={() => setMobileNavOpen(false)}
                    />
                )}

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMobileNavOpen(true)}
                    aria-label="Open navigation"
                    className={`lg:hidden fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full ${theme.bgClass} ${theme.hoverBgClass} text-white shadow-lg flex items-center justify-center cursor-pointer`}
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Left Workspace Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transition-transform duration-200 ${
                        mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                >
                    <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
                        <div className="flex items-center gap-2.5">
                            <div
                                className={`w-8 h-8 rounded-xl ${theme.bgClass} text-white font-bold flex items-center justify-center shadow-sm`}
                            >
                                D
                            </div>
                            <div>
                                <span className="text-white font-bold text-base tracking-tight block leading-none">
                                    Dresto
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                    Owner Suite
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <div className="relative" ref={notifRef}>
                                <button
                                    type="button"
                                    onClick={() => setNotifOpen((prev) => !prev)}
                                    aria-label="Notifications"
                                    className="relative p-2 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-900 transition cursor-pointer"
                                >
                                    <Bell className="w-4 h-4" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {notifOpen && (
                                    <div className="absolute left-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-40 text-slate-900">
                                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-900">
                                                Notifications
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setNotifications((prev) =>
                                                        prev.map((n) => ({ ...n, unread: false }))
                                                    )
                                                }
                                                className={`text-[11px] font-semibold ${theme.textClass} hover:underline cursor-pointer`}
                                            >
                                                Mark all read
                                            </button>
                                        </div>
                                        <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                                            {notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() =>
                                                        setNotifications((prev) =>
                                                            prev.map((item) =>
                                                                item.id === n.id
                                                                    ? { ...item, unread: false }
                                                                    : item
                                                            )
                                                        )
                                                    }
                                                    className={`p-3.5 text-xs cursor-pointer transition hover:bg-slate-50 ${
                                                        n.unread ? 'bg-teal-50/30' : ''
                                                    }`}
                                                >
                                                    <div className="flex justify-between font-semibold text-slate-900">
                                                        <span>{n.title}</span>
                                                        <span className="text-[10px] text-slate-400">
                                                            {n.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-500 mt-1 leading-relaxed">
                                                        {n.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setMobileNavOpen(false)}
                                aria-label="Close navigation"
                                className="lg:hidden text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-5 space-y-1">
                        {sidebarNav.map((item) => {
                            const Icon = item.icon;
                            const active = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setMobileNavOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                        active
                                            ? `${theme.bgClass} text-white shadow-sm`
                                            : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </span>
                                    {item.badge !== null && item.badge !== undefined && (
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] ${
                                                active
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-800 text-slate-300'
                                            }`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Live Storefront Status Card inside Sidebar */}
                    <div className="p-4 m-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-400">
                                Storefront Status
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                                    isBusinessOpen ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        isBusinessOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                                    }`}
                                />
                                {isBusinessOpen ? 'Open' : 'Closed'}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setIsBusinessOpen((prev) => !prev);
                                triggerToast(
                                    !isBusinessOpen ? 'Property is now Open' : 'Property set to Closed',
                                    'info'
                                );
                            }}
                            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                        >
                            {isBusinessOpen ? 'Pause Reservations' : 'Go Live Now'}
                        </button>
                    </div>
                </aside>

                {/* Main Content Shell */}
                <div className="flex-1 flex flex-col min-w-0">
                    <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-6">
                        {/* Compact Split Hero Profile Card */}
                        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-5 relative min-h-[220px] bg-slate-900 group overflow-hidden">
                                <img
                                    src={coverUrl}
                                    alt="Cover"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20" />

                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2" ref={presetRef}>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setPresetOpen((prev) => !prev)}
                                            className="px-3 py-1.5 rounded-xl bg-slate-950/75 hover:bg-slate-950 text-white text-xs font-medium backdrop-blur-xs transition cursor-pointer"
                                        >
                                            Presets
                                        </button>
                                        {presetOpen && (
                                            <div className="absolute bottom-full left-0 mb-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 grid grid-cols-2 gap-1.5 z-20">
                                                {PRESET_COVERS.map((preset) => (
                                                    <button
                                                        key={preset.label}
                                                        type="button"
                                                        onClick={() => {
                                                            setCoverUrl(preset.url);
                                                            setPresetOpen(false);
                                                            triggerToast(`Cover set to ${preset.label}`);
                                                        }}
                                                        className="group/item text-left rounded-xl overflow-hidden border border-slate-100 hover:border-slate-300 cursor-pointer"
                                                    >
                                                        <img
                                                            src={preset.thumb}
                                                            alt={preset.label}
                                                            className="w-full h-14 object-cover"
                                                        />
                                                        <span className="block px-2 py-1 text-[11px] font-medium text-slate-700 truncate">
                                                            {preset.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-xs cursor-pointer transition">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>Upload Cover</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLocalCoverUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                                    {profile.name}
                                                </h1>
                                                {activeBranch && (
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${theme.softBgClass} ${theme.textClass}`}
                                                    >
                                                        <Building2 className="w-3.5 h-3.5" />
                                                        {activeBranch.name}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                                {profile.tagline}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsBranchModalOpen(true)}
                                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
                                            >
                                                <Building2 className="w-3.5 h-3.5" />
                                                <span>Switch Branch</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={openProfileModal}
                                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl ${theme.bgClass} ${theme.hoverBgClass} text-white text-xs font-semibold transition cursor-pointer`}
                                            >
                                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                                <span>Edit Profile</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {profile.cuisines.map((c) => (
                                            <span
                                                key={c}
                                                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                                    <div className="flex items-center gap-2 truncate">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="truncate">{profile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 truncate">
                                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="truncate">{profile.hours}</span>
                                    </div>
                                    <div className="flex items-center gap-2 truncate">
                                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="truncate">{profile.contact}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                                    <p className="text-xs font-medium text-slate-500">Open Complaints</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {openComplaintsCount}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('complaints')}
                                        className={`mt-3 text-xs font-semibold ${theme.textClass} hover:underline cursor-pointer`}
                                    >
                                        View complaints →
                                    </button>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                                    <p className="text-xs font-medium text-slate-500">Menu Items</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {menuItems.length}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('menu')}
                                        className={`mt-3 text-xs font-semibold ${theme.textClass} hover:underline cursor-pointer`}
                                    >
                                        Manage menu →
                                    </button>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
                                    <p className="text-xs font-medium text-slate-500">Guest Rating</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">
                                        {avgRating} ★
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('reviews')}
                                        className={`mt-3 text-xs font-semibold ${theme.textClass} hover:underline cursor-pointer`}
                                    >
                                        Read reviews →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Complaints Tab */}
                        {activeTab === 'complaints' && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h2 className="text-lg font-bold text-slate-900">Guest Complaints</h2>
                                    <div className="flex gap-1.5">
                                        {(['All', 'Pending', 'In Progress', 'Resolved'] as const).map((status) => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => setComplaintFilter(status)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                                    complaintFilter === status
                                                        ? `${theme.bgClass} text-white`
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {filteredComplaints.map((c) => (
                                        <div
                                            key={c.id}
                                            className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <span className="font-bold text-sm text-slate-900">
                                                        {c.customer}
                                                    </span>
                                                    <span className="text-xs text-slate-500 ml-2">
                                                        {c.unit} • {c.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {c.severity}
                                                    </span>
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                                        {c.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-xs sm:text-sm text-slate-700">{c.text}</p>

                                            {c.reply && (
                                                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600">
                                                    <span className="font-semibold text-slate-800">
                                                        Response:{' '}
                                                    </span>
                                                    {c.reply}
                                                </div>
                                            )}

                                            {c.status !== 'Resolved' && (
                                                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                                                    <input
                                                        type="text"
                                                        value={replyDrafts[c.id] || ''}
                                                        onChange={(e) =>
                                                            setReplyDrafts((prev) => ({
                                                                ...prev,
                                                                [c.id]: e.target.value,
                                                            }))
                                                        }
                                                        placeholder="Write a resolution note..."
                                                        className={`flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none ${theme.ringClass}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSendComplaintReply(c.id)}
                                                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl ${theme.bgClass} ${theme.hoverBgClass} text-white text-xs font-semibold cursor-pointer`}
                                                    >
                                                        <Send className="w-3.5 h-3.5" />
                                                        <span>Reply & Resolve</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuickResolve(c.id)}
                                                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
                                                    >
                                                        Quick Resolve
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Menu Tab */}
                        {activeTab === 'menu' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-7 space-y-4">
                                    <form
                                        onSubmit={handleAddDish}
                                        className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3"
                                    >
                                        <h2 className="text-sm font-bold text-slate-900">Add Dish</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                                            <input
                                                type="text"
                                                value={newDishName}
                                                onChange={(e) => setNewDishName(e.target.value)}
                                                placeholder="Dish name"
                                                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                            />
                                            <input
                                                type="number"
                                                value={newDishPrice}
                                                onChange={(e) => setNewDishPrice(e.target.value)}
                                                placeholder="Price (₹)"
                                                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                            />
                                            <select
                                                value={newDishDiet}
                                                onChange={(e) =>
                                                    setNewDishDiet(e.target.value as MenuItem['diet'])
                                                }
                                                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                                            >
                                                <option value="Veg">Veg</option>
                                                <option value="Non-Veg">Non-Veg</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <input
                                                type="text"
                                                value={newDishCategory}
                                                onChange={(e) => setNewDishCategory(e.target.value)}
                                                placeholder="Category"
                                                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                            />
                                            <button
                                                type="submit"
                                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.bgClass} ${theme.hoverBgClass} text-white text-xs font-semibold cursor-pointer`}
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add Item</span>
                                            </button>
                                        </div>
                                    </form>

                                    <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
                                        {menuItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 flex items-center justify-between gap-3"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm text-slate-900">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                                            {item.diet} • {item.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-sm text-slate-900">
                                                        ₹{item.price}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setMenuItems((prev) =>
                                                                prev.map((m) =>
                                                                    m.id === item.id
                                                                        ? { ...m, available: !m.available }
                                                                        : m
                                                                )
                                                            )
                                                        }
                                                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                                                            item.available
                                                                ? 'bg-emerald-50 text-emerald-700'
                                                                : 'bg-rose-50 text-rose-700'
                                                        }`}
                                                    >
                                                        {item.available ? 'Available' : 'Sold Out'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 self-start">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-bold text-slate-900">Menu Files</h2>
                                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 cursor-pointer">
                                            <UploadCloud className="w-3.5 h-3.5" />
                                            <span>Upload</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept=".pdf,image/*"
                                                onChange={handleUploadMenuFiles}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div className="space-y-2">
                                        {menuFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 text-xs"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                                    <div className="truncate">
                                                        <p className="font-semibold text-slate-800 truncate">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            {file.size} • {file.uploadedAt}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setMenuFiles((prev) =>
                                                            prev.filter((f) => f.id !== file.id)
                                                        )
                                                    }
                                                    aria-label={`Delete ${file.name}`}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Photos Tab */}
                        {activeTab === 'photos' && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex gap-1.5">
                                        {['All', 'Ambiance', 'Food & Drinks', 'Rooms'].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setGalleryFilter(cat)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                                                    galleryFilter === cat
                                                        ? `${theme.bgClass} text-white`
                                                        : 'bg-white text-slate-600 border border-slate-200'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={uploadCategory}
                                            onChange={(e) => setUploadCategory(e.target.value)}
                                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs"
                                        >
                                            <option value="Ambiance">Ambiance</option>
                                            <option value="Food & Drinks">Food & Drinks</option>
                                            <option value="Rooms">Rooms</option>
                                        </select>
                                        <label
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl ${theme.bgClass} ${theme.hoverBgClass} text-white text-xs font-semibold cursor-pointer`}
                                        >
                                            <ImagePlus className="w-3.5 h-3.5" />
                                            <span>Add Photos</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleUploadPhotos}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {filteredPhotos.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
                                        >
                                            <img
                                                src={photo.url}
                                                alt={photo.title}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-3">
                                                <p className="font-semibold text-xs text-slate-900 truncate">
                                                    {photo.title}
                                                </p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">
                                                    {photo.category} • {photo.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="space-y-3">
                                {reviews.map((rev) => (
                                    <div
                                        key={rev.id}
                                        className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-sm text-slate-900">
                                                {rev.name}
                                            </span>
                                            <span className="text-xs font-semibold text-amber-600">
                                                {'★'.repeat(rev.rating)} ({rev.rating}/5)
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600">{rev.text}</p>
                                        <p className="text-[11px] text-slate-400">{rev.date}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Profile & Theme Modal */}
            {isCustomizeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
                    <form
                        onSubmit={handleSaveProfile}
                        className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">
                                Edit Profile & Accent Theme
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsCustomizeModalOpen(false)}
                                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Property Name
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={editTagline}
                                    onChange={(e) => setEditTagline(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={editLocation}
                                        onChange={(e) => setEditLocation(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={editContact}
                                        onChange={(e) => setEditContact(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Operating Hours
                                </label>
                                <input
                                    type="text"
                                    value={editHours}
                                    onChange={(e) => setEditHours(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Tags / Cuisines (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={editCuisines}
                                    onChange={(e) => setEditCuisines(e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1.5">
                                    Accent Theme
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(ACCENT_THEMES) as AccentTheme[]).map((key) => {
                                        const t = ACCENT_THEMES[key];
                                        const selected = editTheme === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setEditTheme(key)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                                                    selected
                                                        ? 'border-slate-900 bg-slate-900 text-white'
                                                        : 'border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <span
                                                    className={`w-3 h-3 rounded-full ${t.swatchClass} flex items-center justify-center`}
                                                >
                                                    {selected && <Check className="w-2 h-2 text-white" />}
                                                </span>
                                                <span>{t.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsCustomizeModalOpen(false)}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-xl ${theme.bgClass} ${theme.hoverBgClass} text-white text-xs font-semibold cursor-pointer`}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Branch Selector Modal */}
            <SelectBranchModal
                isOpen={isBranchModalOpen}
                branches={branches}
                currentBranchId={activeBranchId}
                defaultBranchId={defaultBranchId}
                onClose={() => setIsBranchModalOpen(false)}
                onEnterBranch={handleEnterBranch}
                onAddNewBranch={handleAddNewBranch}
            />
        </>
    );
}