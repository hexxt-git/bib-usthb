import path from "path";
import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
    ]);
};

export async function GET({ params }) {
    try {
        const route = params?.route || "";

        const response = await fetchWithTimeout(path.join(env.backendBase, "/download/", route), {
            headers: { "x-api-token": env.secret },
        });

        if (!response.ok) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(err.status ?? 500, err.statusText ?? "Failed to fetch data from the backend");
    }
}
