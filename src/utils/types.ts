export type User = {
    email: string;
    password: string;
    role: "admin" | "customer";
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};