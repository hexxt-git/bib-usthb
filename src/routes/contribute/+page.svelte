<script>
    import { config } from '../config.js';

    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte';

    class File{
        constructor(file, faculty, module, semester, type){
            this.file = file !== undefined ? file : -1;
            this.faculty = faculty !== undefined ? faculty : -1;
            this.module = module !== undefined ? module : -1;
            this.semester = semester !== undefined ? semester : -1;
            this.type = type !== undefined ? type : -1;
        }
    }

    let personal_details = {
        name: '',
        usthb_student: false,
        email: '',
        field: '',
        additional: ''
    }
    let files = [new File()];
    
    let add_file = ()=>{
        let copy_file = files.length !== 0 ? new File(
            -1,
            files[files.length - 1].faculty,
            files[files.length - 1].module,
            files[files.length - 1].semester,
            files[files.length - 1].type
        ): new File();

        files = [...files, copy_file];
        console.table(files);
    }

    let submit = ()=>{
        console.table(personal_details);
        console.table(files);
    }
</script>
<Nav />
<main>
    <h1><span>TresorUTHB</span> contribution page</h1>
    <p>
        &nbsp;&nbsp;&nbsp;This website is ran and maintained all thanks to student contributions. please don't shy away from sharing any resources you have.
    </p>
    <form action="">
        <h2>personal details</h2>
        <p>
            &nbsp;&nbsp;&nbsp;for safety reasons contributions to the website require answering some basic questions. rest assured that your identity will be kept private. for more details read <a href="../help" target="_blank">help</a> page.
        </p>
        <div class="personal-detail-container">
            <div class="text-input">
                <label for="name">name:</label>
                <input type="text" id="name" name="name" bind:value={personal_details.name} required>
            </div>
            <div class="email-input">
                <label for="email">email:</label>
                <input type="email" id="email" name="email" bind:value={personal_details.email} required>
            </div>
            <div class="checkbox-input">
                <label for="usthb_student">are you a USTHB student: </label>
                <input type="checkbox" id="usthb_student" name="usthb_student" bind:checked={personal_details.usthb_student}>
            </div>
            <div class="text-input">
                <label for="field">what do you study:</label>
                <input type="text" id="field" name="field" bind:value={personal_details.field} required>
            </div>
        </div>
        <h2>file uploads</h2>
        <div class="file-container">
            {#if files.length > 0}{#each files as file, index}
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

                <div class="select-input">
                    <label for="file_faculty">faculty:</label>
                    <select name="file_faculty" id="file_faculty" bind:value={file.faculty} required>
                        {#each config.faculties as faculty, index2}
                        <option value={index2}>{faculty.english_name}</option>
                        {/each}
                    </select>
                </div>

                {#if file.faculty !== -1 && config.faculties[file.faculty].modules.length > 0}
                
                <div class="select-input">
                    <label for="file_module">module:</label>
                    <select name="file_module" id="file_module" bind:value={file.module} required>
                        {#each config.faculties[file.faculty].modules as module, index2}
                        <option value={index2}>{module.english_name}</option>
                        {/each}
                    </select>
                </div>
                
                {#if file.module !== -1 && config.faculties[file.faculty].modules[file.module].semesters.length > 0}
                <div class="select-input">
                    <label for="file_semester">semester:</label>
                    <select name="file_semester" id="file_semester" bind:value={file.semester} required>
                        {#each config.faculties[file.faculty].modules[file.module].semesters as semester, index2}
                        <option value={index2}>{semester.name}</option>
                        {/each}
                    </select>
                </div>

                {#if file.semester !== -1 && config.faculties[file.faculty].modules[file.module].semesters[file.semester].links.length > 0}
                <div class="select-input">
                    <label for="file_type">type:</label>
                    <select name="file_type" id="file_type" bind:value={file.type} required>
                        {#each config.faculties[file.faculty].modules[file.module].semesters[file.semester].links as link, index2}
                        <option value={index2}>{link[0]}</option>
                        {/each}
                    </select>
                </div>
                {/if}

                {/if}
                {/if}

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="file-delete" on:click={()=>{
                    files.splice(index, 1);
                    files = [...files];
                }}>delete</div>
            </div>
            {/each}{/if}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="file-plus" on:click={add_file}>+</div>
        </div>
        <h2>submission</h2>
        <p>
            &nbsp;&nbsp;&nbsp;your contribution are greatly appreciated. it may take a few days for your files to be reviewed and added to the website. you will be notified by email when your files are added. for more details read <a href="../help" target="_blank">help</a> page.
        </p>
        <textarea name="message" id="message" cols="80" rows="3" placeholder="any additional feedback" bind:value={personal_details.additional}></textarea>
        <button type="submit" on:click={submit}>submit</button>
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
        text-decoration: underline var(--barnd-green);
        font-family: 'Rubik', sans-serif;
        user-select: none;
        cursor: pointer;
    }
    h2 {
        margin: 40px 0 10px 0;
        color: #111;
        text-decoration: underline var(--barnd-green);
        font-family: 'Rubik', sans-serif;
        user-select: none;
        cursor: pointer;
    }
    p{
        margin: 0;
    }
    a{
        color: black;
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
        border-bottom: 2px solid var(--barnd-green);
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
        color: var(--barnd-green);
        cursor: pointer;
        user-select: none;
        transition: font-size 0.1s ease-in-out;
        margin-top: 10px;
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
        background-color: var(--barnd-green);
    }
    button[type="submit"]:hover{
        filter: contrast(1.2);
    }
</style>