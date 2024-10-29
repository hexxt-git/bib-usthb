import path from "path";
import { secret, backendBase } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const response = await fetch(path.join(backendBase, `upload`), {
            method: "POST",
            headers: { "x-api-token": secret },
            body: formData,
        });

        if (!response.ok) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(err.status ?? 500, err.statusText ?? "Failed to fetch data from the backend");
    }
}
