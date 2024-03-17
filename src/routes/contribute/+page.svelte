<script>
    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte';
    import {onMount} from 'svelte';
    import {load} from '../helper.js';
    import {upload} from '../helper.js';

    let faculties = []
    onMount(async ()=>{
        try{
            faculties = await load('https://walrus-app-mwr59.ondigitalocean.app/api/fac/all')
            faculties = faculties.map(fac => {
                fac.groups = fac.modules?.reduce((acc, module) => {
                    if(!acc.some(group => group.id === module.group.id)) acc.push(module.group);
                    return acc;
                }, []);
                return fac;
            });
        } catch (error) {
            alert('error loading page \nreload and try again later');
        }
        //console.log(faculties);
    });

    class File{
        constructor(file=-1, faculty=-1, group=-1, module=-1, type=-1){
            this.file = file;
            this.faculty = faculty;
            this.group = group;
            this.module = module;
            this.type = type // exam or lesson ..
        }
    }

    let personal_details = {
        name: '',
        usthb_student: false,
        email: '',
        domain: '',
        additional: ''
    }
    let files = [new File()];
    
    let add_file = ()=>{
        let copy_file = files.length !== 0 ? new File(
            -1,
            files[files.length - 1].faculty,
            files[files.length - 1].group,
            files[files.length - 1].module,
            files[files.length - 1].type
        ): new File();

        files = [...files, copy_file];
    }

    let formElement;
    let submitting = false;
    let submit = async (e) => {
        if(files.length === 0) {
            alert('please upload at least one file');
            e.preventDefault();
            return;
        }
        if (!formElement.reportValidity()) {
            e.preventDefault();
            return;
        } else {
            submitting = true;
            console.log('uploading...');
            let allok = true;

            for (const file of files) {
                try {
                    let response =  await upload(file, personal_details);
                    
                    if(!response.ok) { 
                        allok = false;
                        console.log(`error uploading ${file.file[0].name}`, response);
                        response.json().then(data => {
                            console.log(file.file[0].name, data);
                        });
                        alert(`error uploading ${file.file[0].name}`);
                    } else {
                        console.log(`success uploading ${file.file[0].name}`);
                    }

                } catch (error) {
                    allok = false;
                    console.log(`error uploading ${file.file[0].name}`, response, error);
                    response.json().then(data => {
                        console.log(file.file[0].name, data);
                    });
                    alert(`error uploading ${file.file[0].name}\n${error}`);
                }
            }
            
            submitting = false;
            if(allok) alert('all files uploaded successfully');
            else if(files.length > 1) alert('some files failed to upload');
            location.reload();
        }
    }
    let uploading_dots = '';
    setInterval(()=>{
        uploading_dots = uploading_dots.length < 5 ? uploading_dots + '.' : '';
    }, 500);
</script>
<Nav />
<main>
    <h1><span>BiB-USTHB</span> contribution page&nbsp;</h1>
    <p>
        &nbsp;&nbsp;&nbsp;This website is ran and maintained all thanks to student contributions. please don't shy away from sharing any resources you have.
    </p>
    <form bind:this={formElement} on:submit={submit}>
        <h2>personal details</h2>
        <p>
            &nbsp;&nbsp;&nbsp;please fill in the following fields to help us identify you and contact you if needed. your personal details will not be shared with anyone.
        </p>
        <div class="personal-detail-container">
            <div class="text-input">
                <label for="name">name:</label>
                <input type="text" id="name" name="name" bind:value={personal_details.name}>
            </div>
            <div class="email-input">
                <label for="email">email:</label>
                <input type="email" id="email" name="email" bind:value={personal_details.email}>
            </div>
            <div class="checkbox-input">
                <label for="usthb_student">are you a USTHB student: </label>
                <input type="checkbox" id="usthb_student" name="usthb_student" bind:checked={personal_details.usthb_student}>
            </div>
            <div class="text-input">
                <label for="domain">what do you study:</label>
                <input type="text" id="domain" name="domain" bind:value={personal_details.domain}>
            </div>
        </div>
        <h2>file uploads</h2>
        <div class="file-container">
            {#each files as file, index}
            <div class="file">

                <div class="file-input">
                    <label for="file-{index}">file:
                        {#if !file.file[0]}<span>upload</span>
                        {:else}
                            <span>change</span>
                            {#if file.file[0].name.length > 33}
                                <div>{file.file[0].name.slice(0, 30)}...</div>
                            {:else}
                                <div>{file.file[0].name}</div>
                            {/if}
                        {/if}
                    </label>
                    <input type="file" id="file-{index}" name="file-{index}" bind:files={file.file} required>
                </div>
                {#if file.file !== -1}
                <div class="select-input">
                    <label for="file_faculty">faculty:</label>
                    <select name="file_faculty" id="file_faculty" bind:value={file.faculty} required>
                        {#each faculties as faculty}
                        <option value={faculty.id}>{faculty.name}</option>
                        {/each}
                    </select>
                </div>
                {#if file.faculty !== -1}
                <div class="select-input">
                    <label for="file_module">module:</label>
                    <select name="file_module" id="file_module" bind:value={file.group} required>
                        {#each faculties.find(fac => fac.id === file.faculty)?.groups||[] as group}
                        <option value={group.id}>{group.name}</option>
                        {/each}
                    </select>
                </div>
                {#if file.group !== -1}
                <div class="select-input">
                    <label for="file_module">semester:</label>
                    <select name="file_module" id="file_module" bind:value={file.module} required>
                        {#each faculties.find(fac => fac.id === file.faculty)?.modules.filter(module => module.group.id === file.group)||[] as module}
                        <option value={module.id}>{module.name}</option>
                        {/each}
                    </select>
                </div>
                {#if file.module !== -1}
                <div class="select-input">
                    <label for="file_type">type:</label>
                    <select name="file_type" id="file_type" bind:value={file.type} required>
                        <option value="exam">exam</option>
                        <option value="cour">lesson</option>
                        <option value="td">directed work (TD)</option>
                        <option value="tp">practical work (TP)</option>
                        <option value="other">other</option>
                    </select>
                </div>
                
                {/if}
                {/if}
                {/if}
                {/if}

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="file-delete" on:click={()=>{
                    files.splice(index, 1);
                    files = [...files];
                }}>delete</div>
            </div>
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="file-plus" on:click={add_file}>+</div>
        </div>
        <h2>submission</h2>
        <p>
            &nbsp;&nbsp;&nbsp;your contribution are greatly appreciated. it may take a few days for your files to be reviewed and added to the website. you will be notified by email when your files are added. for more details read <a href="../help" target="_blank">help</a> page.
        </p>
        <textarea name="message" id="message" cols="80" rows="3" placeholder="any additional feedback" bind:value={personal_details.additional}></textarea>
        {#if submitting}
            <button type="submit" disabled>
                uploading{uploading_dots}
            </button>
        {:else}
            <button type="submit">
                submit
            </button>
        {/if}
    </form>
</main>
<Footer />
<style>
    main {
        padding: 0 var(--side-margin) 30px var(--side-margin);
    }
    h1 {
        margin: 20px 0 10px 0;
        color: #111;
        text-decoration: underline var(--brand-green);
        font-family: 'Rubik', sans-serif;
        user-select: none;
        cursor: pointer;
    }
    h2 {
        margin: 40px 0 10px 0;
        color: #111;
        text-decoration: underline var(--brand-green);
        font-family: 'Rubik', sans-serif;
        user-select: none;
        cursor: pointer;
    }
    p{
        margin: 0;
    }
    a{
        color: black;
        text-decoration: underline;
    }
    .personal-detail-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: var(--off-white);
        gap: 20px 30px;
        padding: 20px 40px 30px 15px;
        border-radius: 10px;
        box-shadow: var(--window-shadow);
        margin-top: 10px;
    }
    .email-input{
        grid-area: 2 / 1 / 3 / 2;
    }
    @media (max-width: 925px), (orientation: portrait) {
        .personal-detail-container{
            grid-template-columns: 1fr;
        }
    }
    .text-input, .email-input{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    .checkbox-input{
        display: flex;
        align-items: center;
    }    
    .text-input input, .email-input input{
        border: none;
        border-bottom: 2px solid var(--brand-green);
        font-family: 'roboto', sans-serif;
        font-size: 16px;
        padding: 5px 5px 0 10px;
        border-radius: 10px 10px 0 0;
    }
    .text-input label, .email-input label{
        padding: 5px 0 0 0;
    }
    .text-input input:focus, .email-input input:focus{
        outline: none;
    }
    .file-input {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    .file-input input{
        display: none;
    }
    .file-input label span{
        padding: 0 5px;
        margin-left: 5px;
        border: solid 1px #444;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        font-weight: 400;
        
    }
    .file-input label span:hover{
        text-decoration: underline;
    }
    .file-input label div{
        display: inline;
        font-weight: 400;
    }
    .file-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }
    @media (max-width: 1200px) {
        .file-container{
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 800px), (orientation: portrait) {
        .file-container{
            grid-template-columns: 1fr;
        }
    }
    .file{
        padding: 20px 20px 50px 20px;
        border-radius: 10px;
        box-shadow: var(--window-shadow);
        margin-top: 10px;
        background-color: var(--off-white);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 230px;
    }
    .file label{
        font-weight: 500;
    }
    .file div{
        padding-bottom: 5px;
        display: grid;
        grid-template-columns: auto 1fr;
        height: fit-content;
    }
    .select-input{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        overflow: hidden;
    }
    .select-input select{
        max-width: 100%;
        box-sizing: border-box;
        outline: none;
        border: solid 1px #444;
        border-radius: 5px;
    }
    .file-delete{
        position: absolute;
        bottom: 5px;
        right: 10px;
        color: rgb(245, 22, 59);
        cursor: pointer;
        text-decoration: underline;
        font-size: 14px;
        user-select: none;
        font-weight: 500;
    }
    .file-plus{
        border-radius: 10px;
        box-shadow: var(--window-shadow);
        background-color: var(--off-white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        color: var(--brand-green);
        cursor: pointer;
        user-select: none;
        transition: font-size 0.1s ease-in-out;
        margin-top: 10px;
        min-height: 230px;
    }
    .file-plus:hover{
        font-size: 45px;
    }
    textarea{
        margin-top: 10px;
        width: 100%;
    }
    button[type="submit"]{
        padding: 7px 20px;
        border: none;
        border-radius: 5px;
        box-shadow: var(--weak-shadow);
        cursor: pointer;
        user-select: none;
        font-size: 20px;
        font-weight: 500;
        color: white;
        margin-top: 20px;
        margin-left: auto;
        display: block;
        transition: 0.3s ease-in-out;
        background-color: var(--brand-green);
    }
    button[type="submit"]:hover{
        filter: contrast(1.3);
    }
</style>