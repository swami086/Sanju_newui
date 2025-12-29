'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    Upload,
    X,
    Check,
    AlertCircle,
    Building2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRollbar } from '@rollbar/react';

export default function EditPropertyPage() {
    const params = useParams();
    const router = useRouter();
    const supabase = createClient();
    const rollbar = useRollbar();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('draft');
    const [isVideo, setIsVideo] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProperty();
    }, [params.id]);

    const fetchProperty = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) throw error;

            setTitle(data.title);
            setDescription(data.description);
            setStatus(data.status);
            setIsVideo(data.is_video);
            setExistingImageUrl(data.image_url);
            setImagePreview(data.image_url);
        } catch (err: any) {
            rollbar.error('Error fetching property details for edit', err, { propertyId: params.id });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size should be less than 2MB');
                return;
            }
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let imageUrl = existingImageUrl;

            if (image) {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error('User not authenticated');

                const fileExt = image.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, image);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const response = await fetch(`/api/properties/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    image_url: imageUrl,
                    is_video: isVideo,
                    status,
                    updated_at: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update property');
            }

            router.push('/admin/properties');
        } catch (err: any) {
            rollbar.error('Property update failed', err, { propertyId: params.id });
            setError(err.message || 'An error occurred while updating the property');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-12 text-center text-zinc-500">Loading property details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.push('/admin/properties')}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Properties
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Edit Property</h1>
                <p className="text-zinc-500">Update the details for "{title}".</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm flex items-center gap-3">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Property Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all h-32 resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    >
                                        <option value="draft" className="bg-zinc-900">Draft</option>
                                        <option value="published" className="bg-zinc-900">Published</option>
                                        <option value="archived" className="bg-zinc-900">Archived</option>
                                    </select>
                                </div>

                                <div className="flex flex-col justify-end">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-12 h-6 rounded-full relative transition-colors ${isVideo ? 'bg-purple-600' : 'bg-zinc-800'}`}>
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={isVideo}
                                                onChange={(e) => setIsVideo(e.target.checked)}
                                            />
                                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isVideo ? 'translate-x-6' : ''}`} />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">Has Video</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-4">Property Image</label>
                            <div
                                className={`relative aspect-[4/3] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer ${imagePreview ? 'border-purple-600/50 bg-purple-600/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                                    }`}
                                onClick={() => document.getElementById('image-upload')?.click()}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImage(null);
                                                setImagePreview(existingImageUrl);
                                                setError(null);
                                            }}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/80 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-zinc-500">
                                            <Upload size={24} />
                                        </div>
                                        <p className="text-sm font-medium text-white mb-1">Click to change image</p>
                                        <p className="text-xs text-zinc-500">JPEG, PNG or WEBP (Max 2MB)</p>
                                    </>
                                )}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/properties')}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                        >
                            {saving ? (
                                <>Updating...</>
                            ) : (
                                <>
                                    <Check size={18} />
                                    Update Property
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
