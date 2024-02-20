<script>
    import { config } from '../config.js';

    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte';

    class File{
        constructor(file, faculty, module, semester, type){
            this.file = file || -1;
            this.faculty = faculty || -1;
            this.module = module || -1;
            this.semester = semester || -1;
            this.type = type || -1;
        }
    }

    let personal_details = {
        name: '',
        usthb_student: false,
        email: '',
        field: ''
    }
    let files = [new File(), new File(), new File(), new File(), new File()];
    
    let submit = ()=>{
        console.table(personal_details);
        console.table(files);
    }
</script>
<Nav spacer={true} />
<main>
    <h1><span>TresorUTHB</span> contribution page</h1>
    <p>
        &nbsp;&nbsp;&nbsp;This website is ran and maintained all thanks to student contributions. please don't shy away from sharing any resources you have.
    </p>
    <form action="">
        <h2>personal details</h2>
        <p>
            &nbsp;&nbsp;&nbsp;for safety reasons contributions to the website require answering some basic questions. rest assured that your identity will be kept private. for more details read <a href="../help" target="_blank">help</a> page
        </p>
        <div class="personal-detail-container">
            <div class="text-input">
                <label for="name">name:</label>
                <input type="text" id="name" name="name" bind:value={personal_details.name} required>
            </div>
            <div class="checkbox-input">
                <label for="usthb_student">are you a USTHB student?</label>
                <input type="checkbox" id="usthb_student" name="usthb_student" bind:checked={personal_details.usthb_student}>
            </div>
            <div class="email-input">
                <label for="email">email:</label>
                <input type="email" id="email" name="email" bind:value={personal_details.email} required>
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
                    <label for="file">file:</label>
                    <input type="file" id="file" name="file" bind:value={file.file} required>
                </div>

                {#if file.file !== -1}
                <div class="select-input">
                    <label for="file_faculty">faculty:</label>
                    <select name="file_faculty" id="file_faculty" bind:value={file.faculty} required>
                        {#each config.faculties as faculty, index2}
                        <option value={index2}>{faculty.english_name}</option>
                        {/each}
                    </select>
                </div>
                {/if}

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
        </div>
        <h2>submission</h2>
        <button type="submit" on:click={submit}>submit</button>
    </form>
</main>
<Footer />
<style>
    main {
        padding: 0px var(--side-margin);
    }
    h1 {
        margin: 20px 0px 10px 0px;
        color: #111;
        text-decoration: underline var(--barnd-green);
        font-family: 'Rubik';
    }
    h2 {
        margin: 40px 0px 10px 0px;
        color: #111;
        text-decoration: underline var(--barnd-green);
        font-family: 'Rubik';
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
    @media (max-width: 800px), (orientation: portrait) {
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
        border-bottom: 1px solid var(--barnd-green);
        font-family: 'roboto', sans-serif;
        font-size: 16px;
        padding: 5px 5px 0px 10px;
    }
    .text-input label, .email-input label{
        padding: 5px 0px 0px 0px;
    }
    .text-input input:focus, .email-input input:focus{
        outline: none;
    }
    .file-container{
        display: grid;
        grid-template-columns: 30% 30% 30%;
        gap: 20px;
    }
    .select-input{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    .file-input {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    @media (max-width: 800px), (orientation: portrait) {
        .file-container{
            grid-template-columns: 1fr;
        }
    }
    .file{
        gap: 20px;
        padding: 20px 20px 50px 20px;
        border-radius: 10px;
        box-shadow: var(--window-shadow);
        margin-top: 10px;
        background-color: var(--off-white);
        position: relative;
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
    }
</style>