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

export async function upload(file, personal_details){

    const formData = new FormData();

    formData.append('file', file.file[0]);
    console.log(file.file[0]);
    //formData.append('module_id', file.module);
    //formData.append('personal_details', JSON.stringify(personal_details));

    try{
        let response = await fetch('https://walrus-app-mwr59.ondigitalocean.app/api/upload', {
            method: 'POST',
            body: formData
        });

        if(response.status === 200){
            return response.json();
        } else {
            throw new Error('Error uploading file: ' + response.status);
        }

    } catch (error) {
        console.error(error);
        return error;
    }

}

