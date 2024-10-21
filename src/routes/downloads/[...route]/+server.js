import path from "path";
import { secret, backendBase } from "$env/static/private";

export async function GET({ params }) {
    try {
        const route = params?.route || "";

        const response = await fetch(path.join("http://154.250.11.160:25565/", "/download/", route), {
            headers: { "x-api-token": secret },
        });
        if (response.status !== 200) throw response;

        return response;
    } catch (error) {
        console.error(error);
        return {};
    }
}
