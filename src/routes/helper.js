export async function load(link){
    let response = await fetch(link);
    let data = await response.json();
    return data;
}