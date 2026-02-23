"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center ring-4 ring-red-100">
                <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <div className="text-center">
                <h3 className="font-semibold text-slate-800 text-lg mb-1">
                    Something went wrong
                </h3>
                <p className="text-slate-500 text-sm max-w-xs">{message}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try again
                </button>
            )}
        </div>
    );
}
