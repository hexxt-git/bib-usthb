<script>
    import { config } from '../config.js';

    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte';



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
                <input type="text" id="name" name="name" required>
            </div>
            <div class="checkbox-input">
                <label for="usthb_student">are you a USTHB student?</label>
                <input type="checkbox" id="usthb_student" name="usthb_student">
            </div>
            <div class="email-input">
                <label for="email">email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="text-input">
                <label for="field">what do you study:</label>
                <input type="text" id="field" name="field" required>
            </div>
        </div>
        <h2>file uploads</h2>
        <div class="file-container">
            <div class="file">
                <div class="file-input">
                    <label for="file">file:</label>
                    <input type="file" id="file" name="file" required>
                </div>
                <div class="select-input">
                    <label for="file_faculty">faculty:</label>
                    <select name="file_faculty" id="file_faculty" required>
                        {#each config.faculties as faculty}
                        <option value={faculty.abriviation}>{faculty.english_name}</option>
                        {/each}
                    </select>
                </div>
                <div class="select-input">
                    <label for="file_module">module:</label>
                    <select name="file_module" id="file_module" required>
                        {#each config.faculties[5].modules as module}
                        <option value={module.abriviation}>{module.english_name}</option>
                        {/each}
                    </select>
                </div>
                <div class="select-input">
                    <label for="file_semester">semester:</label>
                    <select name="file_semester" id="file_semester" required>
                        {#each config.faculties[5].modules[0].semesters as semester}
                        <option value={semester.abriviation}>{semester.name}</option>
                        {/each}
                    </select>
                </div>
                <div class="select-input">
                    <label for="file_type">type:</label>
                    <select name="file_type" id="file_type" required>
                        <option value="exam">exam</option>
                        <option value="lesson">lesson</option>
                        <option value="TD">TD</option>
                        <option value="TP">TP</option>
                        <option value="other">other</option>
                    </select>
                </div>
            </div>
        </div>
        <h2>submission</h2>
        <button type="submit">submit</button>
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
        grid-template-columns: 1fr 1fr 1fr;
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
    }
</style>