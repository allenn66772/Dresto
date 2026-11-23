import React, { useEffect, useRef, useState } from "react";
import {
    Bell,
    Building2,
    CheckCheck,
    ChevronDown,
    Crown,
    LogOut,
    Settings,
    ShieldAlert,
    Sparkles,
    Users,
} from "lucide-react";

export interface NotificationItem {
    id: string | number;
    type: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
}

export interface BranchOption {
    id: number;
    name: string;
    city?: string | null;
}

interface OwnerHeaderProps {
    ownerName?: string;
    ownerEmail?: string;
    brandName?: string;
    isApproved?: boolean;
    branches?: BranchOption[];
    selectedBranchId?: number | null;
    onSelectBranch?: (branchId: number) => void;
    isBusinessOpen: boolean;
    onToggleBusinessStatus: () => void;
    notifications: NotificationItem[];
    onMarkAllRead: () => void;
    onMarkSingleRead: (id: string | number) => void;
    renderNotifIcon: (type: string) => React.ReactNode;
    onNavigateSettings?: () => void;
    onNavigateStaff?: () => void;
    onLogout: () => void;
    accentBgClass?: string;
}

export default function OwnerHeader({
    ownerName = "Owner",
    ownerEmail = "",
    brandName = "CraveOS",
    isApproved = true,
    branches = [],
    selectedBranchId,
    onSelectBranch,
    isBusinessOpen,
    onToggleBusinessStatus,
    notifications,
    onMarkAllRead,
    onMarkSingleRead,
    renderNotifIcon,
    onNavigateSettings,
    onNavigateStaff,
    onLogout,
    accentBgClass = "bg-gradient-to-br from-amber-500 to-amber-600",
}: OwnerHeaderProps) {
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [branchOpen, setBranchOpen] = useState(false);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const branchRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => n.unread).length;
    const activeBranch =
        branches.find((b) => b.id === selectedBranchId) || branches[0];

    const initials = ownerName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "OW";

    // Close popovers on outside click or Escape key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (notifRef.current && !notifRef.current.contains(target)) {
                setNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(target)) {
                setProfileOpen(false);
            }
            if (branchRef.current && !branchRef.current.contains(target)) {
                setBranchOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setNotifOpen(false);
                setProfileOpen(false);
                setBranchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800/90 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
                {/* LEFT: Brand Identity + Branch Switcher */}
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`w-9 h-9 rounded-xl ${accentBgClass} flex items-center justify-center shadow-sm ring-1 ring-white/15 shrink-0`}
                    >
                        <Crown className="w-4 h-4 text-white" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-base sm:text-lg tracking-tight text-white truncate">
                                {brandName}
                            </span>
                            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/25 shrink-0">
                                Owner
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 hidden lg:block truncate">
                            Hospitality &amp; Outlet Operations
                        </p>
                    </div>

                    {/* Branch Switcher (Shown when branches exist) */}
                    {branches.length > 0 && (
                        <div
                            className="relative hidden md:block pl-3 ml-1 border-l border-slate-800"
                            ref={branchRef}
                        >
                            <button
                                type="button"
                                onClick={() => setBranchOpen((prev) => !prev)}
                                aria-expanded={branchOpen}
                                aria-haspopup="listbox"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 text-xs text-slate-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                            >
                                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="font-medium max-w-[160px] truncate">
                                    {activeBranch?.name}
                                </span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                                        branchOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {branchOpen && (
                                <div
                                    role="listbox"
                                    className="absolute left-3 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 text-slate-800 py-1.5 z-50"
                                >
                                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                        Switch Outlet ({branches.length})
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {branches.map((branch) => {
                                            const isSelected = branch.id === activeBranch?.id;
                                            return (
                                                <button
                                                    key={branch.id}
                                                    type="button"
                                                    onClick={() => {
                                                        onSelectBranch?.(branch.id);
                                                        setBranchOpen(false);
                                                    }}
                                                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 transition ${
                                                        isSelected ? "bg-amber-50/70" : ""
                                                    }`}
                                                >
                                                    <div className="min-w-0 pr-2">
                                                        <p className="text-xs font-semibold text-slate-900 truncate">
                                                            {branch.name}
                                                        </p>
                                                        {branch.city && (
                                                            <p className="text-[11px] text-slate-500 truncate">
                                                                {branch.city}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {isSelected && (
                                                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* RIGHT: Approval Badge, Live Status, Notifications, Profile Menu */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Pending Verification Warning Pill */}
                    {!isApproved && (
                        <div
                            title="Your account is pending admin verification"
                            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium"
                        >
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                            <span>Pending Verification</span>
                        </div>
                    )}

                    {/* Live Outlet Status Toggle */}
                    <button
                        type="button"
                        onClick={onToggleBusinessStatus}
                        aria-pressed={isBusinessOpen}
                        title="Toggle live dining & order status"
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 cursor-pointer ${
                            isBusinessOpen
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                                : "bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
                        }`}
                    >
                        <span className="relative flex h-2 w-2">
                            {isBusinessOpen && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            )}
                            <span
                                className={`relative inline-flex rounded-full h-2 w-2 ${
                                    isBusinessOpen ? "bg-emerald-400" : "bg-rose-400"
                                }`}
                            />
                        </span>
                        <span className="hidden sm:inline">
                            {isBusinessOpen ? "Accepting Orders" : "Outlet Closed"}
                        </span>
                        <span className="sm:hidden">{isBusinessOpen ? "Open" : "Closed"}</span>
                    </button>

                    {/* Notifications Popover */}
                    <div className="relative" ref={notifRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setNotifOpen((prev) => !prev);
                                setProfileOpen(false);
                            }}
                            aria-label="Notifications"
                            aria-expanded={notifOpen}
                            aria-haspopup="true"
                            className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 cursor-pointer"
                        >
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-950">
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 overflow-hidden z-50">
                                <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <h3 className="text-sm font-semibold">Activity &amp; Alerts</h3>
                                        <span className="text-[11px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full font-medium">
                                            {unreadCount > 0 ? `${unreadCount} unread` : "Caught up"}
                                        </span>
                                    </div>
                                    {unreadCount > 0 && (
                                        <button
                                            type="button"
                                            onClick={onMarkAllRead}
                                            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
                                        >
                                            <CheckCheck className="w-3.5 h-3.5" />
                                            <span>Mark all read</span>
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                                    {notifications.length === 0 ? (
                                        <div className="py-10 px-4 text-center">
                                            <p className="text-xs font-medium text-slate-700">
                                                No notifications yet
                                            </p>
                                            <p className="text-[11px] text-slate-400 mt-1">
                                                New orders, table bookings, and staff updates appear here.
                                            </p>
                                        </div>
                                    ) : (
                                        notifications.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => onMarkSingleRead(item.id)}
                                                className={`w-full text-left p-3.5 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer ${
                                                    item.unread ? "bg-amber-50/40" : ""
                                                }`}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {renderNotifIcon(item.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="text-xs font-semibold text-slate-900 truncate">
                                                            {item.title}
                                                        </p>
                                                        {item.unread && (
                                                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                                                        {item.message}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 mt-1">
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Owner Account Dropdown */}
                    <div
                        className="relative pl-2 sm:pl-3 border-l border-slate-800"
                        ref={profileRef}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setProfileOpen((prev) => !prev);
                                setNotifOpen(false);
                            }}
                            aria-expanded={profileOpen}
                            aria-haspopup="menu"
                            className="flex items-center gap-2.5 p-1 pr-2 rounded-xl hover:bg-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/25 to-amber-600/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">
                                {initials}
                            </div>
                            <div className="hidden lg:block text-left max-w-[140px]">
                                <p className="text-xs font-semibold text-white leading-tight truncate">
                                    {ownerName}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                    {ownerEmail || "Property Owner"}
                                </p>
                            </div>
                            <ChevronDown
                                className={`hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform ${
                                    profileOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {profileOpen && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 py-1.5 z-50 overflow-hidden"
                            >
                                <div className="px-4 py-2.5 border-b border-slate-100">
                                    <p className="text-xs font-semibold text-slate-900 truncate">
                                        {ownerName}
                                    </p>
                                    {ownerEmail && (
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                            {ownerEmail}
                                        </p>
                                    )}
                                </div>

                                <div className="py-1">
                                    {onNavigateStaff && (
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setProfileOpen(false);
                                                onNavigateStaff();
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                                        >
                                            <Users className="w-4 h-4 text-slate-400" />
                                            <span>Manage Staff</span>
                                        </button>
                                    )}

                                    {onNavigateSettings && (
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setProfileOpen(false);
                                                onNavigateSettings();
                                            }}
                                            className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition"
                                        >
                                            <Settings className="w-4 h-4 text-slate-400" />
                                            <span>Outlet Settings</span>
                                        </button>
                                    )}
                                </div>

                                <div className="border-t border-slate-100 pt-1">
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            onLogout();
                                        }}
                                        className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}