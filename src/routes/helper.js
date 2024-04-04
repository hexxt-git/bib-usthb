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

    formData.append('file', file.file[0] );
    formData.append('title', file.file[0].name.slice(0, 100) + (file.file[0].name.length > 100 ? Math.random().toString(36).substring(2, 15) : '') ); // 100 character limit and random string to avoid duplicates
    formData.append('description',
        JSON.stringify(personal_details).replaceAll(',',',\n')
    );
    formData.append('module_id', file.module);
    formData.append('file_type', file.type);

    let response = await fetch('https://walrus-app-mwr59.ondigitalocean.app/api/upload/', {
        method: 'POST',
        body: formData
    });
    
    return response;
}

export async function search(query, type){
    try{
        let response = await fetch(`https://walrus-app-mwr59.ondigitalocean.app/api/search/${type}/?query=${query}`);
        let data = await response.json();
        return data;
    } catch (error) {
       console.error(error);
    }
}