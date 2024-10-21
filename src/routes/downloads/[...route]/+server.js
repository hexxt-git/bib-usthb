import path from "path";
import { secret } from "$env/static/private";

export async function GET({ params }) {
    try {
        const route = params?.route || "";

        const response = await fetch(path.join("http://localhost:3000/download", route), {
            headers: { "x-api-token": secret },
        });
        if (response.status !== 200) throw response;

        return response;
    } catch (error) {
        console.error(error);
        return {};
    }
}
