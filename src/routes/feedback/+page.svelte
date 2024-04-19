<script>
    import { Confetti } from "svelte-confetti"
    let confetti = false /*   can't do both confetti and submit this way x(   */
    let send_confetti = ()=>{
        confetti = true
        setTimeout(()=>{confetti = true}, 8000)
    }
    let name = ''
    let email = ''
    let domain = ''
    let usthb_student = false
    const submit = ()=>{
        send_confetti()
        if(!name) name = 'anonymous'
        if(!email) email = 'anonymous@mail'
        if(!domain) domain = 'unknown'
    }
</script>
{#if confetti}
    <div style="
        position: fixed;
        top: -50px;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        overflow: hidden;
        pointer-events: none;
        z-index: 10;
        "
    ><Confetti x={[-5, 5]} y={[-1, 2]} amount=300 fallDistance="400px" /></div>
{/if}

<main>
    <h1>BiB-USTHB feedback and support page</h1>
    <p>
        &nbsp;&nbsp;&nbsp;In this page you can reach us, the developers and maintainers of the website. we're always looking for new ways to improve our service, so plesae write any suggestions or complaints you have on here. you can also reach us through email <a href="mailto:bibusthb@gmail.com" target="_blank">bibusthb@gmail.com</a> and github <a href="https://github.com/9EED/bib-usthb/issues" target="_blank">reports</a>.<br>
        &nbsp;&nbsp;&nbsp;adding personal details is optional but that is how we can get back to you on updates.
    </p>
    <h2>feedback form</h2>
    <form method="POST" on:submit={()=>submit()}> 
        <div class="text-input">
            <label for="name">name:</label>
            <input type="text" id="name" name="name" bind:value={name}>
        </div>
        <div class="email-input">
            <label for="email">email:</label>
            <input type="email" id="email" name="email" bind:value={email}>
        </div>
        <div class="checkbox-input">
            <label for="usthb_student">are you a USTHB student: </label>
            <input type="checkbox" id="usthb_student" name="usthb_student" bind:checked={usthb_student}>
        </div>
        <div class="text-input">
            <label for="domain">study field:</label>
            <input type="text" id="domain" name="domain" bind:value={domain}>
        </div>
        <div class="select-input" id="topic">
            <label for="topic">topic:</label>
            <select name="topic" value="" required>
                <option value="website error">website errors</option>
                <option value="missing module">corrupted/missing module</option>
                <option value="missing module">inappropriately categoraized module</option>
                <option value="missing module">corrupted/missing file</option>
                <option value="missing module">inappropriately categoraized file</option>
                <option value="missing module">website design (UI)</option>
                <option value="missing module">website layout (UX)</option>
                <option value="missing module">contribution to the website</option>
                <option value="missing module">additional feature requests</option>
                <option value="missing module">words of thanks and appretiation 🤗</option>
                <option value="missing module">other</option>
            </select>
        </div>
        <div class="textarea-input" id="detail">
            <label for="detail">details:</label>
            <textarea name="detail" rows="4" required></textarea>
        </div>
        <button type="submit">submit</button>
    </form>
</main>

<style>
    main {
        padding: 0 var(--side-margin) 30px var(--side-margin);
        min-height: calc(100vh - 187px);
        font-family: var(--main-font);
        background-color: var(--background-0);
        color: var(--text-color);
    }
    h1{
        margin: 0;
        padding: 20px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-1);
        color: var(--title-color);
    }
    h2{
        margin: 10px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-2);
        color: var(--title-color);
    }
    p{
        margin: 10px 0;
        font-size: var(--text-1);
        word-spacing: 1px;
    }
    a{
        color: var(--brand-color);
        text-decoration: underline;
    }
    form{
        background-color: var(--background-1);
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        margin-top: 10px;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px 25px;
    }
    .email-input{
        grid-area: 2 / 1 / 3 / 2;
    }
    @media (max-width: 925px), (orientation: portrait) {
        form{
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
        gap: 5px;
    }    
    .text-input input, .email-input input{
        border: none;
        border-bottom: 2px solid var(--brand-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 5px 5px 0 10px;
        border-radius: calc(var(--element-radius)/2) calc(var(--element-radius)/2) 0 0;
        background-color: var(--background-2);
        color: var(--highlight-color);
    }
    .text-input label, .email-input label{
        padding: 5px 0 0 0;
    }
    .text-input input:focus, .email-input input:focus{
        outline: none;
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
        border-radius: 8px;
    }
    .textarea-input{
        display: grid;
    }
    .textarea-input textarea{
        margin-top: 5px;
        width: 100%;
        max-width: calc(100vw - var(--side-margin)*2 - 40px);
        background-color: var(--background-2);
        border-radius: var(--element-radius);
        color: var(--highlight-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 10px;
    }
    .textarea-input textarea:focus{
        outline: none;
    }
    #topic{
        grid-column: 1 / -1;
    }
    #detail{
        grid-column: 1 / -1;
    }
    button[type="submit"]{
        padding: 7px 14px;
        border: none;
        border-radius: var(--element-radius);
        box-shadow: var(--weak-shadow);
        cursor: pointer;
        user-select: none;
        font-size: var(--text-1);
        color: var(--background-0);
        font-weight: 600;
        margin-top: -5px; /*forbiden technique*/
        margin-left: auto;
        display: block;
        background-color: var(--brand-color);
        grid-column: 1 / -1;
    }
    /* button[type="submit"]{
        background-color: #666;
        color: #aaa;
        cursor: not-allowed;
    } */
</style>