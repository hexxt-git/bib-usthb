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

export async function upload(file, personal_details) {
    const formData = new FormData();
    const reader = new FileReader();

    // Wrap FileReader in a Promise
    const fileData = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file.file[0]);
    });

    try {
        // Wait for the file data
        const arrayBuffer = await fileData;

        formData.append('file', new Blob([arrayBuffer]));
        //formData.append('module_id', file.module);
        //formData.append('personal_details', JSON.stringify(personal_details));

        let response = await fetch('https://walrus-app-mwr59.ondigitalocean.app/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.status !== 200) {
            throw new Error('Error uploading file: ' + response.status);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}