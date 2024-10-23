import path from "path";
import { secret, backendBase } from "$env/static/private";
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

        const response = await fetchWithTimeout(path.join(backendBase, "/download/", route), {
            headers: { "x-api-token": secret },
        });

        if (response.status !== 200) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(500, "Failed to fetch data from the backend");
    }
}
