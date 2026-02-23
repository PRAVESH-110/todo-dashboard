"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isFetching: boolean;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
    isFetching,
}: PaginationProps) {
    const isFirst = page === 1;
    const isLast = page === totalPages;

    // Build visible page range (max 5 numbers)
    const getPageNumbers = () => {
        const delta = 2;
        const range: number[] = [];
        const start = Math.max(1, page - delta);
        const end = Math.min(totalPages, page + delta);
        for (let i = start; i <= end; i++) range.push(i);
        return range;
    };

    return (
        <div className="flex items-center justify-between gap-4 mt-2 pt-5 border-t border-slate-100">
            <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-800">{page}</span>
                {" "}of{" "}
                <span className="font-semibold text-slate-800">{totalPages}</span>
                {isFetching && (
                    <span className="ml-2 inline-block w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin align-middle" />
                )}
            </p>

            <div className="flex items-center gap-1">
                {/* Previous */}
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={isFirst}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600
                     rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
                     disabled:hover:border-slate-200 transition-all duration-200 shadow-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                </button>

                {/* Page numbers */}
                <div className="hidden sm:flex items-center gap-1">
                    {page > 3 && (
                        <>
                            <button
                                onClick={() => onPageChange(1)}
                                className="w-9 h-9 text-sm font-medium text-slate-600 rounded-lg border border-slate-200
                           bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all duration-200 shadow-sm"
                            >
                                1
                            </button>
                            {page > 4 && (
                                <span className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
                                    …
                                </span>
                            )}
                        </>
                    )}
                    {getPageNumbers().map((p) => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-9 h-9 text-sm font-medium rounded-lg border transition-all duration-200 shadow-sm
                ${p === page
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 shadow-md"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-indigo-300"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                    {page < totalPages - 2 && (
                        <>
                            {page < totalPages - 3 && (
                                <span className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
                                    …
                                </span>
                            )}
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="w-9 h-9 text-sm font-medium text-slate-600 rounded-lg border border-slate-200
                           bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all duration-200 shadow-sm"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                {/* Next */}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={isLast}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600
                     rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
                     disabled:hover:border-slate-200 transition-all duration-200 shadow-sm"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
