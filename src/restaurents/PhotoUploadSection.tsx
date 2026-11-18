import { useState, useRef } from 'react';
import type { FC, DragEvent, ChangeEvent } from 'react';
import type { GalleryCategory, PhotoUploadSectionProps } from './restaurant.types';
import { Camera, ImagePlus, Images, Trash2 } from 'lucide-react';

export const PhotoUploadSection: FC<PhotoUploadSectionProps> = ({
    photos,
    onUploadPhotos,
    onSetAsCover,
    onDeletePhoto,
    theme
}) => {
    const [uploadCategory, setUploadCategory] = useState<GalleryCategory>('Ambiance');
    const [filterCategory, setFilterCategory] = useState<'All' | GalleryCategory>('All');
    const [isDragging, setIsDragging] = useState(false);

    const photoInputRef = useRef<HTMLInputElement>(null);

    const categories: GalleryCategory[] = ['Ambiance', 'Food & Drinks', 'Rooms', 'Events'];

    const filteredPhotos =
        filterCategory === 'All'
            ? photos
            : photos.filter((p) => p.category === filterCategory);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUploadPhotos(e.dataTransfer.files, uploadCategory);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUploadPhotos(e.target.files, uploadCategory);
            e.target.value = '';
        }
    };

    return (
        <section
            id="photos-section"
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
            {/* Header & Upload Controls */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Camera className={`w-5 h-5 ${theme.textClass}`} />
                        <h2 className="text-lg font-bold text-slate-900">
                            Property &amp; Culinary Photos Uploading
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Upload high-resolution photos of suites, dining spaces, and signature dishes. Set any
                        photo directly as your cover banner.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <select
                        aria-label="Select category for uploaded photos"
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as GalleryCategory)}
                        className={`px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 ${theme.ringClass}`}
                    >
                        <option value="Ambiance">Category: Ambiance</option>
                        <option value="Food & Drinks">Category: Food &amp; Drinks</option>
                        <option value="Rooms">Category: Rooms &amp; Suites</option>
                        <option value="Events">Category: Events &amp; Banquets</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className={`${theme.bgClass} ${theme.hoverBgClass} text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer`}
                    >
                        <ImagePlus className="w-4 h-4" />
                        <span>Upload Photos</span>
                    </button>
                    <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
                {/* Multi-File Drag & Drop Photo Zone */}
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
                    onClick={() => photoInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
                        isDragging
                            ? 'border-amber-500 bg-amber-50/40'
                            : 'border-slate-300 hover:border-amber-500 bg-slate-50/60 hover:bg-amber-50/20'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                            <Images className={`w-5 h-5 ${theme.textClass}`} />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-sm font-semibold text-slate-800">
                                Drag &amp; drop multiple photos here to upload immediately
                            </p>
                            <p className="text-xs text-slate-500">
                                Selected files will be tagged under{' '}
                                <span className="font-semibold text-slate-700">{uploadCategory}</span> with instant
                                preview.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                        {(['All', ...categories] as const).map((cat) => {
                            const isSelected = filterCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                                        isSelected
                                            ? 'font-semibold bg-slate-900 text-white'
                                            : 'font-medium bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {cat === 'All' ? 'All Photos' : cat}
                                </button>
                            );
                        })}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                        Showing {filteredPhotos.length} photo{filteredPhotos.length === 1 ? '' : 's'}
                    </span>
                </div>

                {/* Responsive Photo Grid */}
                {filteredPhotos.length === 0 ? (
                    <div className="py-10 text-center bg-slate-50 rounded-2xl border border-slate-200/70">
                        <p className="text-sm font-semibold text-slate-700">
                            No photos in &ldquo;{filterCategory}&rdquo; yet
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Use the Upload Photos button above to add images to this category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm h-60"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                                {/* Top Category Tag & Delete Action */}
                                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15">
                                        {photo.category}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => onDeletePhoto(photo.id)}
                                        title="Delete photo"
                                        className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-white backdrop-blur-md border border-white/15 transition cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Bottom Title & One-Click Set as Cover CTA */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-white truncate">{photo.title}</h4>
                                        <p className="text-[11px] text-slate-300">{photo.date}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onSetAsCover(photo)}
                                        className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold shadow-md transition shrink-0 cursor-pointer"
                                    >
                                        Set as Cover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PhotoUploadSection;
