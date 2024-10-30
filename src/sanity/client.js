import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "y2x1cizf",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});