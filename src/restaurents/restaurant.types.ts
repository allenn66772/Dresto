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

// Complaints types
export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';
export type ComplaintSeverity = 'High' | 'Medium' | 'Low';

export interface ComplaintItem {
    id: number;
    customer: string;
    unit: string;
    severity: ComplaintSeverity;
    status: ComplaintStatus;
    time: string;
    text: string;
    reply: string;
}

export interface ComplaintsSectionProps {
    complaints: ComplaintItem[];
    onResolveOrReply: (id: number, status: ComplaintStatus, reply: string) => void;
    onQuickResolve: (id: number) => void;
    theme: AccentThemeConfig;
}

// Menu types
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

export interface MenuUploadSectionProps {
    menuFiles: MenuDocument[];
    onUploadMenuFiles: (files: FileList) => void;
    onDeleteMenuFile: (id: string) => void;
    menuItems: MenuItem[];
    onAddMenuItem: (item: Omit<MenuItem, 'id' | 'available'>) => void;
    onToggleDishAvailability: (id: number) => void;
    onDeleteMenuItem: (id: number) => void;
    theme: AccentThemeConfig;
}

// Photos / Images types
export type GalleryCategory = 'Ambiance' | 'Food & Drinks' | 'Rooms' | 'Events';

export interface GalleryPhoto {
    id: string;
    title: string;
    category: GalleryCategory;
    url: string;
    date: string;
}

export interface PhotoUploadSectionProps {
    photos: GalleryPhoto[];
    onUploadPhotos: (files: FileList, category: GalleryCategory) => void;
    onSetAsCover: (photo: GalleryPhoto) => void;
    onDeletePhoto: (id: string) => void;
    theme: AccentThemeConfig;
}
