"use client";

import { Check, RotateCcw, Pin, Trash2 } from "lucide-react";
import { Todo } from "@/types/todo";
import { useTodoContext } from "@/context/TodoContext";

interface TodoItemProps {
    todo: Todo;
    index: number;
}

export default function TodoItem({ todo, index }: TodoItemProps) {
    const { toggleTodo, isCompleted, deleteTodo } = useTodoContext();
    const completed = isCompleted(todo);

    return (
        <li
            className="group flex items-start gap-4 px-5 py-4 rounded-xl transition-all duration-200
                 hover:bg-slate-50 border border-transparent hover:border-slate-100"
            style={{ animationDelay: `${index * 30}ms` }}
        >
            {/* Checkbox */}
            <button
                onClick={() => toggleTodo(todo.id)}
                aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${completed
                        ? "bg-emerald-500 border-emerald-500 focus:ring-emerald-400"
                        : "border-slate-300 hover:border-indigo-400 focus:ring-indigo-400 group-hover:border-indigo-300"
                    }`}
            >
                {completed && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </button>

            {/* Todo content */}
            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm leading-relaxed transition-all duration-200 ${completed
                        ? "text-slate-400 line-through"
                        : "text-slate-700 group-hover:text-slate-900"
                        }`}
                >
                    {todo.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    {todo.isLocal && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100">
                            <Pin className="w-2.5 h-2.5" />
                            Local
                        </span>
                    )}
                    <span className="text-xs text-slate-400">#{todo.id < 0 ? "new" : todo.id}</span>
                </div>
            </div>

            {/* Status badge */}
            <span
                className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${completed
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
            >
                {completed ? "Done" : "Pending"}
            </span>

            {/* Delete button — only for local todos */}
            {todo.isLocal && (
                <button
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete todo"
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                               p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}
        </li>
    );
}
