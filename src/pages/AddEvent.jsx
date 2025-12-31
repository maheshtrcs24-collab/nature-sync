import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Upload } from 'lucide-react';

const AddEvent = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Host an Event</h1>
                <p className="text-gray-400">Bring the community together.</p>
            </div>

            <GlassCard>
                <form className="space-y-6">
                    <div className="space-y-4">
                        <Input label="Event Title" placeholder="e.g. Beach Cleanup Drive" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Date" type="date" />
                            <Input label="Time" type="time" />
                        </div>

                        <Input label="Location" placeholder="Where is it happening?" />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Category</label>
                            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 text-gray-400">
                                <option>Conservation</option>
                                <option>Recreation</option>
                                <option>Education</option>
                                <option>Wellness</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
                            <textarea
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600 min-h-[120px]"
                                placeholder="Tell us more about the event..."
                            />
                        </div>

                        <div className="border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:bg-white/5 transition-colors cursor-pointer">
                            <Upload size={32} className="mb-2 text-primary" />
                            <span className="text-sm">Click to upload cover image</span>
                        </div>
                    </div>

                    <Button className="w-full mt-4">Create Event</Button>
                </form>
            </GlassCard>
        </div>
    );
};

export default AddEvent;
