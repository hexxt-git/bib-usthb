<script>
    import { notify } from '$lib/components/notification_store'
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

    class Resource{
        constructor(file){
            this.file_store = writable(file);
            this.file = file
            
            this.file_store.subscribe(new_file => this.file = new_file)
        
        }
    }

    let personal_details = {}
    let resources = [];

    let name = writable('')
    let email = writable('')
    let domain = writable('')
    let usthb_student = writable(false)
    let additional = writable('')

    name.subscribe(value => personal_details.name = value)
    email.subscribe(value => personal_details.email = value)
    domain.subscribe(value => personal_details.domain = value)
    usthb_student.subscribe(value => personal_details.usthb_student = value)
    additional.subscribe(value => personal_details.additional = value)
    
    let string_trunc = (string, length) => string.length > length ? string.substr(0, length-3) + '...' : string;

    // files
    let add_resource = (file=-1)=>{
        let new_resource = new Resource(file)
        if(resources.length > 0){
            // copy last files settings
        }
        
        resources = [...resources, new_resource]
    }
    let prompt_for_file = ()=>{
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.click();
        input.onchange = (e)=>{
            let new_files = e.target.files;
            for (const file of new_files) {
                let data_transfer = new DataTransfer();
                data_transfer.items.add(file);
                add_resource(data_transfer.files);
            }
        }
    }
    let handle_file_drop = (e)=>{
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
        console.log(personal_details, files)
        if(files.length === 0) {
            notify({state:'error', message:'please upload atleast one file', duration: 30*1000})

            e.preventDefault();
            return;
        }
        if (!formElement.reportValidity()) {
            e.preventDefault();
            return;
        } else {
            submitting = true;
            notify({state: "notification", message: "uploading files...", duration: 30*1000});
            let allok = true;

            let successfull_uploads = []
            
            for (const file of files) {
                console.log('trying to upload:', file, personal_details)
                if(!file.file.length) continue;

                try {
                    let response =  await upload(file, personal_details);
                    
                    if(!response.ok) { 
                        allok = false;
                        response.json().then(data => {
                            console.log(file.file[0].name, data);
                        });
                        notify({state: 'error', message: `error uploading file ${file.file[0].name}`, duration: 30*1000})
                    } else {
                        successfull_uploads.push(file);
                        notify({state: 'success', message: `successfully uploaded file ${file.file[0].name}`, duration: 30*1000})
                    }
                } catch (error) {
                    allok = false;
                    console.error(error)
                    notify({state: 'error', message: `error uploading file ${file.file[0].name}`, duration: 30*1000})
                }
            }
            
            submitting = false;
            files = files.filter(file => !successfull_uploads.includes(file));
            if(allok){
                notify({state: 'success', message: 'all files uploaded successfully', duration: 30*1000})
                notify({state: 'notification', message: 'we thank you very much for your contributions', duration: 30*1000})
                shoot_confetti()
            } else {
                notify({state: 'error', message: 'some files failed to upload', duration: 30*1000});
            }
        }
    }

    let delte_resource = (resource) => {
        resources = resources.filter(r => r != resource);
    }
    
    let uploading_dots = '';
    setInterval(()=>{
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
            <TextInput label='name' store={name} />
            <TextInput label='email' store={email} style="grid-row:2/3; grid-column:1/2" />
            <CheckboxInput label="are you a usthb student" store={usthb_student} />
            <TextInput label='study field' store={domain} />
        </div>

        <H2>file uploads</H2>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="resources-container">
            
            {#each resources as resource, index (resource)}
            <div class="resource">
                <FileInput store={resource.file_store} id={index} />
                <SelectionInput options={[1,2,3]} />
                <SelectionInput options={[1,2,3]} />
                <SelectionInput options={[1,2,3]} />
                <SelectionInput options={[1,2,3]} />

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="resource-delete" on:click={() => delte_resource(resource)}>delete</div>
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
        
        <TextArea label="" placeholder="is there anything you would like to add" rows="4" store={additional}/>
        <br>
        {#if submitting} <Submit disabled={true}> uploading{uploading_dots} </Submit>
        {:else} <Submit> submit </Submit>{/if}


        <!-- <button type="button" on:click={()=>{
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
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
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
        padding: 20px 20px 50px 20px;
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        margin-top: 10px;
        background-color: var(--background-1);
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 230px;
    }
    .resource-delete{
        position: absolute;
        bottom: 5px;
        right: 10px;
        color: rgb(245, 22, 59);
        cursor: pointer;
        text-decoration: underline;
        font-size: var(--text-2);
        user-select: none;
        font-weight: 500;
    }
    .resource-drop{
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        background-color: var(--background-1);
        margin-top: 10px;
        min-height: 230px;
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