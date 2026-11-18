import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { ComplaintItem, ComplaintSeverity, ComplaintStatus, ComplaintsSectionProps } from './restaurant.types';
import { CornerDownRight, MessageSquareReply, Reply, X } from 'lucide-react';

export const ComplaintsSection: FC<ComplaintsSectionProps> = ({
    complaints,
    onResolveOrReply,
    onQuickResolve,
    theme
}) => {
    const [filterStatus, setFilterStatus] = useState<'All' | ComplaintStatus>('All');
    const [activeComplaint, setActiveComplaint] = useState<ComplaintItem | null>(null);
    const [modalStatus, setModalStatus] = useState<ComplaintStatus>('Resolved');
    const [modalReply, setModalReply] = useState('');

    const filterTabs: Array<'All' | ComplaintStatus> = [
        'All',
        'Pending',
        'In Progress',
        'Resolved'
    ];

    const filteredComplaints =
        filterStatus === 'All'
            ? complaints
            : complaints.filter((c) => c.status === filterStatus);

    const openModal = (complaint: ComplaintItem) => {
        setActiveComplaint(complaint);
        setModalStatus(complaint.status === 'Pending' ? 'Resolved' : complaint.status);
        setModalReply(complaint.reply || '');
    };

    const handleModalSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!activeComplaint) return;
        onResolveOrReply(activeComplaint.id, modalStatus, modalReply.trim());
        setActiveComplaint(null);
    };

    const getSeverityClasses = (severity: ComplaintSeverity) => {
        switch (severity) {
            case 'High':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'Medium':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    const getStatusClasses = (status: ComplaintStatus) => {
        switch (status) {
            case 'Pending':
                return 'bg-rose-100 text-rose-800';
            case 'In Progress':
                return 'bg-amber-100 text-amber-800';
            case 'Resolved':
                return 'bg-emerald-100 text-emerald-800';
        }
    };

    return (
        <section
            id="complaints-section"
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
            {/* Section Header & Filter Tabs */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <h2 className="text-lg font-bold text-slate-900">
                            Guest Complaints &amp; Service Desk
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Monitor live table &amp; room feedback and send direct owner resolutions.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {filterTabs.map((tab) => {
                        const isSelected = filterStatus === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setFilterStatus(tab)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                                    isSelected
                                        ? 'font-semibold bg-white text-slate-900 shadow-sm'
                                        : 'font-medium text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Guest Feedback Cards List */}
            <div className="divide-y divide-slate-100 max-h-[680px] overflow-y-auto">
                {filteredComplaints.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-sm font-semibold text-slate-700">
                            No complaints under &ldquo;{filterStatus}&rdquo;
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Switch filter tabs above to view other guest records.
                        </p>
                    </div>
                ) : (
                    filteredComplaints.map((c) => (
                        <div key={c.id} className="p-5 hover:bg-slate-50/70 transition space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-sm font-bold text-slate-900">{c.customer}</h4>
                                        <span className="text-xs font-medium text-slate-500">• {c.unit}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{c.time}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getSeverityClasses(
                                            c.severity
                                        )}`}
                                    >
                                        {c.severity} Priority
                                    </span>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getStatusClasses(
                                            c.status
                                        )}`}
                                    >
                                        {c.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                &ldquo;{c.text}&rdquo;
                            </p>

                            {c.reply && (
                                <div className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900">
                                    <CornerDownRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold">Owner Response:</span> {c.reply}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-2 pt-1">
                                {c.status !== 'Resolved' && (
                                    <button
                                        type="button"
                                        onClick={() => onQuickResolve(c.id)}
                                        className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition cursor-pointer"
                                    >
                                        Quick Mark Resolved
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => openModal(c)}
                                    className={`${theme.bgClass} ${theme.hoverBgClass} text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer`}
                                >
                                    <Reply className="w-3.5 h-3.5" />
                                    <span>{c.reply ? 'Update Reply' : 'Reply / Resolve'}</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Interactive Reply & Resolve Modal */}
            {activeComplaint && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquareReply className="w-5 h-5 text-amber-400" />
                                <h3 className="text-base font-bold">Respond &amp; Update Complaint</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveComplaint(null)}
                                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-slate-900">{activeComplaint.customer}</span>
                                    <span className="font-medium text-slate-500">{activeComplaint.unit}</span>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                                    {activeComplaint.text}
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Update Resolution Status
                                </label>
                                <select
                                    value={modalStatus}
                                    onChange={(e) => setModalStatus(e.target.value as ComplaintStatus)}
                                    className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:outline-none focus:ring-2 ${theme.ringClass}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Owner Response / Action Taken
                                </label>
                                <textarea
                                    rows={3}
                                    required
                                    value={modalReply}
                                    onChange={(e) => setModalReply(e.target.value)}
                                    placeholder="Write a courteous response to the guest (e.g., complimentary dessert offered, AC technician dispatched...)"
                                    className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 ${theme.ringClass}`}
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveComplaint(null)}
                                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`${theme.bgClass} ${theme.hoverBgClass} text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm cursor-pointer`}
                                >
                                    Send Reply &amp; Save Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ComplaintsSection;
