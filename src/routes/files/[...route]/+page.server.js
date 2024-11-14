import path from "path";
import { env } from "$env/dynamic/private";
import { error, json } from "@sveltejs/kit";

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
    ]);
};

const cache = new Map(); // piii map
const CACHE_TTL = 1 * 60 * 1000; // 1 minute

export async function load({ params }) {
    try {
        const route = params?.route || "";
        const cacheKey = route;

        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            if (Date.now() < cached.expiry) {
                return cached.data;
            } else {
                cache.delete(cacheKey);
            }
        }

        const response = await fetchWithTimeout(path.join(env.backendBase, "/get/", route), {
            headers: { "x-api-token": env.secret },
        });

        if (!response.ok) throw response;
        const data = await response.json();

        cache.set(cacheKey, {
            data,
            expiry: Date.now() + CACHE_TTL,
        });

        return data;
    } catch (err) {
        console.error(err);
        if (params.route) {
            throw error(err.status ?? 500, err.statusText ?? "Failed to fetch data from the backend");
        } else {
            return {
                isDirectory: true
            };
        }
    }
}
