export async function load(link){
    try{
        let response = await fetch(link);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function upload(file){

    const formData = new FormData();

    formData.append('file', file.file[0]);

    try{
        let response = await fetch('https://walrus-app-mwr59.ondigitalocean.app/api/upload', {
            method: 'POST',
            body: formData
        });
        console.log(response);
        return response.json();

    } catch (error) {
        return error;
    }

}
