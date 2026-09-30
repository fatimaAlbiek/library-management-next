import type { User } from "./types";

export const defaultUsers: User[] = [
    {
        email: "admin@library.com",
        password: "123456",
        role: "admin",
    },
    {
        email: "user@library.com",
        password: "123456",
        role: "customer",
    },
];