"use client";

import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import { useTodoContext } from "@/context/TodoContext";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
    todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
    const { localTodos } = useTodoContext();

    // Show local todos at the top of the current page view
    const allTodos: Todo[] = [...localTodos, ...todos];

    if (allTodos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-indigo-400" />
                </div>
                <p className="text-slate-500 text-sm">No todos yet. Add one above!</p>
            </div>
        );
    }

    return (
        <ul className="divide-y divide-slate-50">
            {allTodos.map((todo, i) => (
                <TodoItem key={todo.id} todo={todo} index={i} />
            ))}
        </ul>
    );
}
