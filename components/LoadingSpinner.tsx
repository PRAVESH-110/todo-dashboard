"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
            </div>
            <p className="text-slate-500 text-sm font-medium animate-pulse">
                Loading your todos...
            </p>
        </div>
    );
}
