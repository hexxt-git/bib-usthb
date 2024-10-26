import path from "path";
import { secret, backendBase } from "$env/static/private";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const response = await fetch(path.join(backendBase, `upload`), {
            method: "POST",
            headers: { "x-api-token": secret },
            body: formData,
        });

        if (response.status !== 200) throw response;

        return response;
    } catch (err) {
        console.error(err);
        throw error(500, "Failed to fetch data from the backend");
    }
}
