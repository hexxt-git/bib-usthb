import path from "path";
import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
    const searchQuery = url.searchParams.get('query');

    try {
        const response = await fetch(path.join(env.backendBase, `search?query=${encodeURIComponent(searchQuery)}`), {
            method: "GET",
            headers: { "x-api-token": env.secret },
        });

        if (!response.ok) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(err.status ?? 500, err.statusText ?? "Failed to fetch data from the backend");
    }
}
