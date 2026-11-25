import React, { useEffect, useMemo, useState } from "react";

export interface Branch {
    id: string | number;
    name: string;
    code?: string;
    location?: string;
    address?: string;
    isActive?: boolean;
}

interface SelectBranchModalProps {
    isOpen: boolean;
    branches: Branch[];
    currentBranchId?: string | number | null;
    defaultBranchId?: string | number | null;
    onClose: () => void;
    onEnterBranch: (branch: Branch, options: { setAsDefaultOnLogin: boolean }) => void;
    onAddNewBranch: () => void;
    onToggleDefaultOnLogin?: (branchId: string | number | null, enabled: boolean) => void;
}

const ITEMS_PER_PAGE = 16; // 4x4 grid

export const SelectBranchModal: React.FC<SelectBranchModalProps> = ({
    isOpen,
    branches,
    currentBranchId = null,
    defaultBranchId = null,
    onClose,
    onEnterBranch,
    onAddNewBranch,
    onToggleDefaultOnLogin,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [selectedBranchId, setSelectedBranchId] = useState<string | number | null>(
        currentBranchId ?? defaultBranchId ?? null
    );
    const [setAsDefaultOnLogin, setSetAsDefaultOnLogin] = useState<boolean>(
        Boolean(defaultBranchId && (currentBranchId ? defaultBranchId === currentBranchId : true))
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isOpen) {
            const initialId = currentBranchId ?? defaultBranchId ?? branches[0]?.id ?? null;
            setSelectedBranchId(initialId);
            setSetAsDefaultOnLogin(
                Boolean(defaultBranchId && initialId !== null && defaultBranchId === initialId)
            );
            setSearchQuery("");
            setStatusFilter("all");
            setCurrentPage(1);
        }
    }, [isOpen, currentBranchId, defaultBranchId, branches]);

    // Consolidated metrics across all branches
    const consolidatedStats = useMemo(() => {
        const total = branches.length;
        const active = branches.filter((b) => b.isActive !== false).length;
        const inactive = total - active;
        return { total, active, inactive };
    }, [branches]);

    // Filtered branches based on search & consolidated filter
    const filteredBranches = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return branches.filter((branch) => {
            const isActive = branch.isActive !== false;
            if (statusFilter === "active" && !isActive) return false;
            if (statusFilter === "inactive" && isActive) return false;

            if (!q) return true;
            return (
                branch.name.toLowerCase().includes(q) ||
                (branch.code && branch.code.toLowerCase().includes(q)) ||
                (branch.location && branch.location.toLowerCase().includes(q)) ||
                (branch.address && branch.address.toLowerCase().includes(q))
            );
        });
    }, [branches, searchQuery, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredBranches.length / ITEMS_PER_PAGE));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedBranches = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBranches.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBranches, currentPage]);

    if (!isOpen) return null;

    const handleSelectCard = (branchId: string | number) => {
        setSelectedBranchId(branchId);
        if (onToggleDefaultOnLogin) {
            onToggleDefaultOnLogin(branchId, setAsDefaultOnLogin);
        }
    };

    const handleDefaultCheckboxChange = (checked: boolean) => {
        setSetAsDefaultOnLogin(checked);
        if (onToggleDefaultOnLogin) {
            onToggleDefaultOnLogin(selectedBranchId, checked);
        }
    };

    const handleEnter = (branch: Branch) => {
        setSelectedBranchId(branch.id);
        onEnterBranch(branch, { setAsDefaultOnLogin });
    };

    const selectedBranch =
        branches.find((b) => b.id === selectedBranchId) || paginatedBranches[0] || null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="select-branch-modal-title"
        >
            <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2
                            id="select-branch-modal-title"
                            className="text-xl font-semibold text-slate-900"
                        >
                            Select Branch
                        </h2>
                        <p className="text-sm text-slate-500">
                            Consolidated overview of all branches — choose a branch to enter
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        ✕
                    </button>
                </div>

                {/* Consolidated Summary & Search Bar */}
                <div className="space-y-4 border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    {/* Consolidated Stats Row */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={() => {
                                setStatusFilter("all");
                                setCurrentPage(1);
                            }}
                            className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left transition ${statusFilter === "all"
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                                }`}
                        >
                            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                                All Branches
                            </span>
                            <span className="text-lg font-bold">{consolidatedStats.total}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStatusFilter("active");
                                setCurrentPage(1);
                            }}
                            className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left transition ${statusFilter === "active"
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                                }`}
                        >
                            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                                Active
                            </span>
                            <span className="text-lg font-bold">{consolidatedStats.active}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStatusFilter("inactive");
                                setCurrentPage(1);
                            }}
                            className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left transition ${statusFilter === "inactive"
                                    ? "border-amber-600 bg-amber-600 text-white"
                                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                                }`}
                        >
                            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                                Inactive
                            </span>
                            <span className="text-lg font-bold">{consolidatedStats.inactive}</span>
                        </button>
                    </div>

                    {/* Search Input + Result Count */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search branch by name, code, or location..."
                                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setCurrentPage(1);
                                    }}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className="text-xs text-slate-500">
                            Showing{" "}
                            <span className="font-semibold text-slate-800">{filteredBranches.length}</span>{" "}
                            {filteredBranches.length === 1 ? "branch" : "branches"}
                        </div>
                    </div>
                </div>

                {/* 4x4 Cards Grid */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {paginatedBranches.length === 0 ? (
                        <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
                            <p className="text-sm font-medium text-slate-700">No matching branches found</p>
                            <p className="mt-1 text-xs text-slate-500">
                                Try adjusting your search or filter, or add a new branch below.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {paginatedBranches.map((branch) => {
                                const isSelected = selectedBranchId === branch.id;
                                const isCurrent = currentBranchId === branch.id;
                                const isDefault = defaultBranchId === branch.id;
                                const isActive = branch.isActive !== false;

                                return (
                                    <div
                                        key={branch.id}
                                        onClick={() => handleSelectCard(branch.id)}
                                        className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition ${isSelected
                                                ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/15"
                                                : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm"
                                            }`}
                                    >
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
                                                    {branch.name}
                                                </h3>
                                                <span
                                                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${isActive
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-amber-100 text-amber-700"
                                                        }`}
                                                >
                                                    {isActive ? "Active" : "Inactive"}
                                                </span>
                                            </div>

                                            {branch.code && (
                                                <p className="mt-1 text-xs font-medium text-slate-500">
                                                    Code: {branch.code}
                                                </p>
                                            )}

                                            {(branch.location || branch.address) && (
                                                <p className="mt-1.5 line-clamp-2 text-xs text-slate-600">
                                                    {branch.location || branch.address}
                                                </p>
                                            )}

                                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                                {isCurrent && (
                                                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                                                        Current
                                                    </span>
                                                )}
                                                {isDefault && (
                                                    <span className="rounded bg-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-800">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEnter(branch);
                                            }}
                                            className="mt-4 w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
                                        >
                                            Enter Branch
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination (when more than 16 branches match) */}
                    {totalPages > 1 && (
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
                            <span>
                                Page {currentPage} of {totalPages} (max 16 per grid)
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Footer: Default on Login Checkbox + Add New Branch Button */}
                <div className="flex flex-col justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center">
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 select-none">
                        <input
                            type="checkbox"
                            checked={setAsDefaultOnLogin}
                            onChange={(e) => handleDefaultCheckboxChange(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span>
                            Set{" "}
                            <span className="font-semibold text-slate-900">
                                {selectedBranch ? selectedBranch.name : "selected branch"}
                            </span>{" "}
                            as default on login
                        </span>
                    </label>

                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onAddNewBranch}
                            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            + Add New Branch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectBranchModal;