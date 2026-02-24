"use client";

import { useState } from "react";
import { useTodos, LIMIT } from "@/hooks/useTodos";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import StatsBar from "./StatsBar";
import AddTodoForm from "./AddTodoForm";
import LoadingSpinner from "./LoadingSpinner";
import ErrorState from "./ErrorState";

// JSONPlaceholder has 200 todos total
const TOTAL_TODOS = 200;
const TOTAL_PAGES = Math.ceil(TOTAL_TODOS / LIMIT);

export default function TodoDashboard() {
    const [page, setPage] = useState(1);
    const { data: todos, isLoading, isError, error, isFetching, refetch } = useTodos(page);

    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > TOTAL_PAGES) return;
        setPage(newPage);
        // Scroll smoothly to top of list on new page
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
                            Live Dashboard
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                        My Todo Dashboard
                    </h1>
                </div>
            </div>

            {/* Add Todo Form */}
            <AddTodoForm />

            {/* Stats (only when data is available) */}
            {todos && <StatsBar todos={todos} />}

            {/* Todo Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Todo List
                        </h2>
                        {isFetching && !isLoading && (
                            <span className="text-xs text-indigo-500 animate-pulse font-medium">
                                refreshing…
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                        Page {page} / {TOTAL_PAGES}
                    </span>
                </div>

                {/* Content */}
                <div className="px-2 py-2">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : isError ? (
                        <ErrorState
                            message={error?.message ?? "Unknown error occurred."}
                            onRetry={() => refetch()}
                        />
                    ) : todos ? (
                        <TodoList todos={todos} />
                    ) : null}
                </div>

                {/* Pagination footer */}
                {!isLoading && !isError && (
                    <div className="px-5 pb-5">
                        <Pagination
                            page={page}
                            totalPages={TOTAL_PAGES}
                            onPageChange={handlePageChange}
                            isFetching={isFetching}
                        />
                    </div>
                )}
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-slate-400">
                Data from{" "}
                <a
                    href="https://jsonplaceholder.typicode.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-600 font-medium underline underline-offset-2 transition-colors"
                >
                    JSONPlaceholder
                </a>{" "}
                · Toggle tasks locally · Additions are stored in localStorage
            </p>
        </div>
    );
}
