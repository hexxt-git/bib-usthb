import path from "path";
import { secret, backendBase } from "$env/static/private";

export async function load({ params }) {
    try {
        const route = params?.route || "";

        const response = await fetch(path.join("http://154.250.11.160:25565/", "/get/", route), {
            headers: { "x-api-token": secret },
        });
        if (response.status !== 200) throw response;
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}
