"use client";

import { useState, useRef } from "react";
import { Plus, Sparkles } from "lucide-react";
import { useTodoContext } from "@/context/TodoContext";

export default function AddTodoForm() {
    const [value, setValue] = useState("");
    const { addTodo } = useTodoContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const submitTodo = (): void => {
        const trimmed = value.trim();
        if (!trimmed) {
            inputRef.current?.focus();
            return;
        }
        addTodo(trimmed);
        setValue("");
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        submitTodo();
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === "Enter") submitTodo();
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-slate-800">Add New Todo</h2>
                </div>
            </div>
            <div className="flex gap-3">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50
                     text-slate-800 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-all duration-200"
                    maxLength={200}
                />
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium
                     rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm
                     whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Add Todo
                </button>
            </div>
        </div>
    );
}
