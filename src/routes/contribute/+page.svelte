<script>
    import { writable } from "svelte/store";
    import {shoot_confetti} from "$lib/components/confetti_store"
    import Main from "$lib/items/Main.svelte";
    import H1 from "$lib/items/H1.svelte";
    import H2 from "$lib/items/H2.svelte";
    import P from "$lib/items/P.svelte";
    import A from "$lib/items/A.svelte";
    import TextInput from "$lib/items/TextInput.svelte";
    import TextArea from "$lib/items/TextArea.svelte";
	import Submit from "$lib/items/Submit.svelte";
	import SelectionInput from "$lib/items/SelectionInput.svelte";
	import CheckboxInput from "$lib/items/CheckboxInput.svelte";
	import FileInput from '$lib/items/FileInput.svelte';

    class Resource {
        constructor(file) {
            this.file_store = writable(file);
            this.file = file;
            this.file_store.subscribe(new_file => this.file = new_file);
            
            this.type_store = writable('');
            this.type = '';
            this.type_store.subscribe(new_type => this.type = new_type);

            this.specialty = '';
            this.module = '';
            this.additional = '';
        }
    }

    class PersonalDetails {
        constructor() {
            this.name_store = writable('');
            this.name = '';
            this.name_store.subscribe(new_name => this.name = new_name);

            this.email_store = writable('');
            this.email = '';
            this.email_store.subscribe(new_email => this.email = new_email);

            this.domain_store = writable('');
            this.domain = '';
            this.domain_store.subscribe(new_domain => this.domain = new_domain);

            this.usthb_student_store = writable(false);
            this.usthb_student = false;
            this.usthb_student_store.subscribe(new_status => this.usthb_student = new_status);

            this.additional_store = writable('');
            this.additional = '';
            this.additional_store.subscribe(new_additional => this.additional = new_additional);
        }
    }

    let resources = [];
    let personal_details = new PersonalDetails();

    
    const FILE_TYPES = [
        'TD / Exercises',
        'TP / Practical',
        'Cours / Lecture',
        'PFE / Project',
        'Notes / Résumé',
        'Book',
        'Other'
    ]

    let string_trunc = (string, length) => string.length > length ? string.substr(0, length-3) + '...' : string;

    // files
    let add_resource = (file=-1) => {
        if(resources.length > 0){
            let last_resource = resources[resources.length - 1];
            let cloned_resource = new Resource(last_resource.file);
            cloned_resource.type_store.set(last_resource.type);
            cloned_resource.specialty = last_resource.specialty;
            cloned_resource.module = last_resource.module;
            cloned_resource.additional = last_resource.additional;
            resources = [...resources, cloned_resource];
        } else {
            let new_resource = new Resource(file)
            resources = [...resources, new_resource]
        }    
    }

    let prompt_for_file = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.click();
        input.onchange = (e) => {
            let new_files = e.target.files;
            for (const file of new_files) {
                let data_transfer = new DataTransfer();
                data_transfer.items.add(file);
                add_resource(data_transfer.files);
            }
        }
    }

    let handle_file_drop = (e) => {
        e.preventDefault();
        let dt = e.dataTransfer;
        let files = dt.files;
        for (const file of files) {
            let data_transfer = new DataTransfer();
            data_transfer.items.add(file);
            add_resource(data_transfer.files);
        }
    }

    let formElement;
    let submitting = false;

    let submit = async (e) => {
        e.preventDefault()
        if(resources.length < 1) return;
        let data = new FormData()
        data.append('name', personal_details.name);
        data.append('email', personal_details.email);
        data.append('domain', personal_details.domain);
        data.append('usthb_student', personal_details.usthb_student);
        data.append('additional', personal_details.additional);

        resources.forEach((resource, index) => {
            data.append(`file`, resource.file[0]);
            data.append('file_data', JSON.stringify({
                type: resource.type,
                specialty: resource.specialty,
                module: resource.module,
                additional: resource.additional
            }))
        });
        console.log(data)
        submitting = true;

        try {
            let response = await fetch('/upload', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                shoot_confetti();
                resources = [];
                personal_details = new PersonalDetails();
                formElement.reset();
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            submitting = false;
        }
    }

    let delete_resource = (resource) => {
        resources = resources.filter(r => r != resource);
    }
    
    let uploading_dots = '';
    setInterval(() => {
        uploading_dots = uploading_dots.length < 5 ? uploading_dots + '.' : '';
    }, 500);
</script>

<Main>
    <H1><span>BiB-USTHB</span> contribution page&nbsp;</H1>
    <P>
       &ensp; This website is ran and maintained all thanks to student contributions. please don't shy away from sharing any resources you have. If you can't find a module or faculty that is because the website is still in its early phase and we're looking for people to help us fill them up, you can help us with that on the <A href="/feedback/">feedback</A> page.
    </P>
    <form bind:this={formElement} on:submit={submit}>
        
        <H2>personal details</H2>
        <P>
            &ensp; adding personal details is optional but that is how we can get back to you on updates.
        </P>
        <div class="personal-detail-container">
            <TextInput label='name' store={personal_details.name_store} />
            <TextInput label='email' store={personal_details.email_store} style="grid-row:2/3; grid-column:1/2" />
            <CheckboxInput label="are you a usthb student" store={personal_details.usthb_student_store} />
            <TextInput label='study field' store={personal_details.domain_store} />
        </div>

        <H2>file uploads</H2>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="resources-container">
            
            {#each resources as resource, index (resource)}
            <div class="resource">
                <FileInput store={resource.file_store} id={index} />
                <SelectionInput label='file type*' options={FILE_TYPES} store={resource.type_store} />
                <div class="resource-input">
                    <label for="specialty-{index}">specialty: </label>
                    <input type="text" name="specialty-{index}" bind:value={resource.specialty}>
                </div>
                <div class="resource-input">
                    <label for="module-{index}">module*: </label>
                    <input type="text" name="module-{index}" bind:value={resource.module} required>
                </div>
                <div class="resource-input">
                    <label for="additional-{index}">additional info: </label>
                    <input type="text" name="additional-{index}" bind:value={resource.additional}>
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="resource-delete" on:click={() => delete_resource(resource)}>delete</div>
            </div>
            {/each}

            <div
                on:dragover="{(e) => e.preventDefault()}"
                on:dragenter="{(e) => e.preventDefault()}"
                on:drop="{handle_file_drop}"
                class="resource-drop"
            >
                <span><div>
                    <img src="../images/upload.png" alt="" />
                    <p>drag and drop files</p>
                    <p>
                        or click
                        <button type="button" on:click={prompt_for_file}>here</button>
                        to upload
                    </p>
                </div></span>
            </div>

        </div>
        <H2>submission</H2>
        <P>
            &ensp; your contribution are greatly appreciated. it may take a little while for your files to be reviewed and added to the website. you will be notified by email when your files are added. for more details read <A href="../help" target="_blank">help</A> page.
        </P>
        
        <TextArea label="" placeholder="is there anything you would like to add" rows="4" store={personal_details.additional_store}/>
        <br>
        {#if submitting} <Submit disabled> uploading{uploading_dots} </Submit>
        {:else} <Submit> submit </Submit>{/if}


        <!-- <button type="button" on:click={() => {
            console.log(resources, personal_details);
        }}>log</button> -->
    </form>
</Main>

<style>
    .personal-detail-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: var(--background-1);
        gap: 20px 30px;
        padding: 20px 40px 30px 15px;
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        margin-top: 10px;
    }
    @media (max-width: 925px), (orientation: portrait) {
        .personal-detail-container{
            grid-template-columns: 1fr;
        }
    }
    .resources-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 20px;
    }
    @media (max-width: 1800px) {
        .resources-container{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media (max-width: 1200px) {
        .resources-container{
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 800px), (orientation: portrait) {
        .resources-container{
            grid-template-columns: 1fr;
        }
    }
    .resource{
        padding: 10px 15px 25px 15px;
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        margin-top: 10px;
        background-color: var(--background-1);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 260px;
    }
    .resource-input {
        display: grid;
        grid-template-columns: auto 1fr;
        margin: 3px 0;
        gap: 10px;
    }
    .resource input {
        border-radius: 9px;
        border: solid 1px #444;
        width: 100%;
        padding: 0 5px;
    }
    .resource input:focus {
        outline: none;
    }
    .resource-delete{
        position: absolute;
        bottom: 5px;
        right: 15px;
        color: rgb(241, 44, 77);
        cursor: pointer;
        text-decoration: underline;
        font-size: var(--text-1);
        user-select: none;
        font-weight: 500;
    }
    .resource-drop{
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        background-color: var(--background-1);
        margin-top: 10px;
        min-height: 260px;
        padding: 15px;
        color: var(--text-color-weak);
    }
    .resource-drop span, .resource-drop div{
        pointer-events: none;
    }
    .resource-drop span{
        border: var(--brand-color) 2px dashed;
        border-radius: var(--element-radius);
        display: block;
        widows: 100%;
        height: 100%;
    }
    .resource-drop div{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .resource-drop p{
        margin: 0;
    }
    .resource-drop img{
        height: 80px;
        filter: var(--icon-filter-weak);
    }
    .resource-drop button{
        border-radius: 8px;
        border: solid 1px var(--text-color-weak);
        padding: 0 5px;
        cursor: pointer;
        font-size: 16px;
        font-family: var(--main-font);
        color: var(--text-color-weak);
        pointer-events: all !important;
        background-color: var(--background-3);
    }
    .resource-drop button:hover{
        text-decoration: underline;
    }

</style>