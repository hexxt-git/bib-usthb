import path from "path";
import { secret, backendBase } from "$env/static/private";
import { error } from '@sveltejs/kit';

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
    ]);
};

export async function load({ params }) {
    try {
        const route = params?.route || "";

        const response = await fetchWithTimeout(path.join(backendBase, "/get/", route), {
            headers: { "x-api-token": secret },
        });

        if (!response.ok) throw response;
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        throw error(err.status ?? 500, err.statusText ?? 'Failed to fetch data from the backend');
    }
}
