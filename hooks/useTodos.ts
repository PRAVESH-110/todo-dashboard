import { useQuery } from "@tanstack/react-query";
import { Todo } from "@/types/todo";

const LIMIT = 10;

async function fetchTodos(page: number): Promise<Todo[]> {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`
    );
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
}

export function useTodos(page: number) {
    return useQuery<Todo[], Error>({
        queryKey: ["todos", page],
        queryFn: () => fetchTodos(page),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 5,
    });
}

export { LIMIT };
