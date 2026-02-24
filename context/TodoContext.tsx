"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { Todo } from "@/types/todo";

interface TodoContextType {
    toggledIds: Set<number>;
    localTodos: Todo[];
    toggleTodo: (id: number) => void;
    addTodo: (title: string) => void;
    isCompleted: (todo: Todo) => boolean;
}

const TodoContext = createContext<TodoContextType | null>(null);

let localIdCounter = -1; // negative ids to avoid collision with API ids

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [toggledIds, setToggledIds] = useState<Set<number>>(new Set());
    const [localTodos, setLocalTodos] = useState<Todo[]>([]);

    // Load from localStorage on first mount (client-only)
    useEffect(() => {
        const storedTodos = localStorage.getItem("localTodos");
        if (storedTodos) {
            const parsed: Todo[] = JSON.parse(storedTodos);
            setLocalTodos(parsed);
            // Restore counter so new IDs don't clash with saved ones
            const minId = parsed.reduce((min, t) => Math.min(min, t.id), 0);
            localIdCounter = minId - 1;
        }

        const storedToggled = localStorage.getItem("toggledIds");
        if (storedToggled) {
            setToggledIds(new Set<number>(JSON.parse(storedToggled)));
        }
    }, []);

    // Persist localTodos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("localTodos", JSON.stringify(localTodos));
    }, [localTodos]);

    // Persist toggledIds to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("toggledIds", JSON.stringify([...toggledIds]));
    }, [toggledIds]);

    const toggleTodo = useCallback((id: number) => {
        setToggledIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const addTodo = useCallback((title: string) => {
        const newTodo: Todo = {
            id: localIdCounter--,
            userId: 0,
            title,
            completed: false,
            isLocal: true,
        };
        setLocalTodos((prev) => [newTodo, ...prev]);
    }, []);

    const isCompleted = useCallback(
        (todo: Todo) => {
            // If toggled, flip the original completed state
            if (toggledIds.has(todo.id)) {
                return !todo.completed;
            }
            return todo.completed;
        },
        [toggledIds]
    );

    return (
        <TodoContext.Provider
            value={{ toggledIds, localTodos, toggleTodo, addTodo, isCompleted }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export function useTodoContext() {
    const ctx = useContext(TodoContext);
    if (!ctx) throw new Error("useTodoContext must be used inside TodoProvider");
    return ctx;
}
