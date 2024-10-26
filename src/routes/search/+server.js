import path from "path";
import { secret, backendBase } from "$env/static/private";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
    const searchQuery = url.searchParams.get('query');

    try {
        const response = await fetch(path.join(backendBase, `search?query=${encodeURIComponent(searchQuery)}`), {
            method: "GET",
            headers: { "x-api-token": secret },
        });

        if (response.status !== 200) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(500, "Failed to fetch data from the backend");
    }
}
