import path from "path";
import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const response = await fetch(path.join(env.backendBase, `upload`), {
            method: "POST",
            headers: { "x-api-token": env.secret },
            body: formData,
        });

        if (!response.ok) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(err.status ?? 500, err.statusText ?? "Failed to fetch data from the backend");
    }
}
