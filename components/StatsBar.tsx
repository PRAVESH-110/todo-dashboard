"use client";

import { useTodoContext } from "@/context/TodoContext";
import { Todo } from "@/types/todo";
import { CheckCircle2, Circle, List, Sparkles } from "lucide-react";

interface StatsBarProps {
    todos: Todo[];
}

interface StatCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
    return (
        <div className={`flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
            </div>
        </div>
    );
}

export default function StatsBar({ todos }: StatsBarProps) {
    const { isCompleted, localTodos } = useTodoContext();

    const total = todos.length;
    const completed = todos.filter(isCompleted).length;
    const pending = total - completed;
    const localCount = localTodos.length;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
                label="Total Items"
                value={total}
                icon={<List className="w-5 h-5 text-slate-600" />}
                color="bg-slate-100"
            />
            <StatCard
                label="Completed"
                value={completed}
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                color="bg-emerald-50"
            />
            <StatCard
                label="Pending"
                value={pending}
                icon={<Circle className="w-5 h-5 text-amber-600" />}
                color="bg-amber-50"
            />
            <StatCard
                label="Added Locally"
                value={localCount}
                icon={<Sparkles className="w-5 h-5 text-violet-600" />}
                color="bg-violet-50"
            />
        </div>
    );
}
