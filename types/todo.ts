export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    isLocal?: boolean;
}

export interface PaginationState {
    page: number;
    limit: number;
}
