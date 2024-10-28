<script>
    import { writable } from "svelte/store";
    import { shoot_confetti } from "$lib/components/confetti_store";
    import Main from "$lib/items/Main.svelte";
    import H1 from "$lib/items/H1.svelte";
    import H2 from "$lib/items/H2.svelte";
    import P from "$lib/items/P.svelte";
    import A from "$lib/items/A.svelte";
    import TextInput from "$lib/items/TextInput.svelte";
    import TextArea from "$lib/items/TextArea.svelte";
    import Submit from "$lib/items/Submit.svelte";
    import CheckboxInput from "$lib/items/CheckboxInput.svelte";
    import FileInput from "$lib/items/FileInput.svelte";

    class Resource {
        constructor(file) {
            this.file_store = writable(file);
            this.file = file;
            this.file_store.subscribe((newFile) => (this.file = newFile));
        }
    }

    class FileInfo {
        constructor() {
            this.specialty_store = writable("");
            this.year_store = writable("");
            this.module_store = writable("");

            this.specialty = "";
            this.year = "";
            this.module = "";

            this.specialty_store.subscribe((newSpecialty) => (this.specialty = newSpecialty));
            this.year_store.subscribe((newYear) => (this.year = newYear));
            this.module_store.subscribe((newModule) => (this.module = newModule));
        }

        isValid() {
            return this.specialty.trim() !== "" && this.year.trim() !== "" && this.module.trim() !== "";
        }
    }

    class PersonalDetails {
        constructor() {
            this.name_store = writable("");
            this.email_store = writable("");
            this.domain_store = writable("");
            this.usthb_student_store = writable(false);
            this.additional_store = writable("");

            this.name = "";
            this.email = "";
            this.domain = "";
            this.usthb_student = false;
            this.additional = "";

            this.name_store.subscribe((newName) => (this.name = newName));
            this.email_store.subscribe((newEmail) => (this.email = newEmail));
            this.domain_store.subscribe((newDomain) => (this.domain = newDomain));
            this.usthb_student_store.subscribe((newStatus) => (this.usthb_student = newStatus));
            this.additional_store.subscribe((newAdditional) => (this.additional = newAdditional));
        }
    }

    let resources = [];
    let file_info = new FileInfo();
    let personal_details = new PersonalDetails();

    let add_resource = (file = null) => {
        let new_resource = new Resource(file);
        resources = [...resources, new_resource];
    };

    let prompt_for_file = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.click();
        input.onchange = (e) => {
            let new_files = e.target.files;
            for (const file of new_files) {
                let data_transfer = new DataTransfer();
                data_transfer.items.add(file);
                add_resource(data_transfer.files);
            }
        };
    };

    let handle_file_drop = (e) => {
        e.preventDefault();
        let dt = e.dataTransfer;
        let files = dt.files;
        for (const file of files) {
            let data_transfer = new DataTransfer();
            data_transfer.items.add(file);
            add_resource(data_transfer.files);
        }
    };

    let formElement;
    let submitting = false;

    let submit = async (e) => {
        e.preventDefault();
        if (resources.length < 1) return;

        // Validate file info
        if (!file_info.isValid()) {
            alert("Please fill in all required file information");
            return;
        }

        let data = new FormData();
        // Add personal details
        data.append("name", personal_details.name);
        data.append("email", personal_details.email);
        data.append("domain", personal_details.domain);
        data.append("usthb_student", personal_details.usthb_student);
        data.append("additional", personal_details.additional);

        // Add file info once
        data.append("specialty", file_info.specialty);
        data.append("year", file_info.year);
        data.append("module", file_info.module);

        // Add files
        resources.forEach((resource, index) => {
            data.append("files", resource.file[0]);
        });

        submitting = true;

        try {
            let response = await fetch("/upload", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                shoot_confetti();
                resources = [];
                file_info = new FileInfo();
                personal_details = new PersonalDetails();
                formElement.reset();
            } else {
                console.error("Upload failed");
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while uploading. Please try again.");
        } finally {
            submitting = false;
        }
    };

    let delete_resource = (resource) => {
        resources = resources.filter((r) => r != resource);
    };

    let uploading_dots = "";
    setInterval(() => {
        uploading_dots = uploading_dots.length < 5 ? uploading_dots + "." : "";
    }, 500);
</script>

<Main>
    <H1><span>BiB-USTHB</span> contribution page&nbsp;</H1>
    <P>
        &ensp; This website is ran and maintained all thanks to student contributions. please don't shy away
        from sharing any resources you have. If you can't find a module or faculty that is because the website
        is still in its early phase and we're looking for people to help us fill them up, you can help us with
        that on the <A href="/feedback/">feedback</A> page.
    </P>
    <form bind:this={formElement} on:submit={submit}>
        <H2>personal details</H2>
        <P>&ensp; Adding personal details is optional but that is how we can get back to you on updates.</P>
        <div class="form-container">
            <TextInput
                label="name"
                store={personal_details.name_store}
                placeholder={["John Doe", "Jane Smith", "Alex Johnson"][Math.floor(Math.random() * 3)]}
            />
            <TextInput
                label="email"
                store={personal_details.email_store}
                placeholder={["john@example.com", "jane@example.com", "alex@example.com"][
                    Math.floor(Math.random() * 3)
                ]}
            />
            <CheckboxInput label="are you a usthb student" store={personal_details.usthb_student_store} />
            <TextInput
                label="study field"
                store={personal_details.domain_store}
                placeholder={["Informatique", "Biologie", "Science technologie"][
                    Math.floor(Math.random() * 3)
                ]}
            />
        </div>

        <H2>file information</H2>
        <P>
            &ensp; What kind of files will you be contributing. please correctly label your files and upload
            them in batches. this helps us better organize the website.
        </P>

        <div class="form-container">
            <TextInput
                label="specialty"
                store={file_info.specialty_store}
                placeholder={["Informatique", "Biologie", "Science technologie"][
                    Math.floor(Math.random() * 3)
                ]}
                required
            />
            <TextInput
                label="year"
                store={file_info.year_store}
                placeholder={["Licence 1", "Master 2", "Engineer 3"][Math.floor(Math.random() * 3)]}
                required
            />
            <TextInput
                label="module"
                store={file_info.module_store}
                placeholder={["Math 1", "Algorithm 2", "Entrepreneurship 1"][Math.floor(Math.random() * 3)]}
                required
            />
        </div>

        <H2>uploads</H2>
        <div class="resources-container">
            {#each resources as resource, index (resource)}
                <div class="resource">
                    <FileInput store={resource.file_store} id={index} />
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="resource-delete" on:click={() => delete_resource(resource)}>delete</div>
                </div>
            {/each}

            <div
                on:dragover={(e) => e.preventDefault()}
                on:dragenter={(e) => e.preventDefault()}
                on:drop={handle_file_drop}
                class="resource-drop"
            >
                <span
                    ><div>
                        <img src="../images/upload.png" alt="" />
                        <p>drag and drop files</p>
                        <p>
                            or click
                            <button type="button" on:click={prompt_for_file}>here</button>
                            to upload
                        </p>
                    </div></span
                >
            </div>
        </div>

        <H2>submission</H2>
        <P>
            &ensp; Your contribution are greatly appreciated. it may take a little while for your files to be
            reviewed and added to the website. you will be notified by email when your files are added. for
            more details read <A href="../help" target="_blank">help</A> page.
        </P>

        <TextArea
            label=""
            placeholder="is there anything you would like to add"
            rows="4"
            store={personal_details.additional_store}
        />
        <br />
        {#if submitting}
            <Submit disabled>uploading{uploading_dots}</Submit>
        {:else}
            <Submit>submit</Submit>
        {/if}
    </form>
</Main>

<style>
    .form-container {
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
        .form-container {
            grid-template-columns: 1fr;
        }
    }
    .resources-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 20px;
    }
    @media (max-width: 1800px) {
        .resources-container {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media (max-width: 1200px) {
        .resources-container {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 800px), (orientation: portrait) {
        .resources-container {
            grid-template-columns: 1fr;
        }
    }
    .resource {
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
    .resource-delete {
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
    .resource-drop {
        border-radius: var(--element-radius);
        box-shadow: var(--window-shadow);
        background-color: var(--background-1);
        margin-top: 10px;
        min-height: 260px;
        padding: 15px;
        color: var(--text-color-weak);
    }
    .resource-drop span,
    .resource-drop div {
        pointer-events: none;
    }
    .resource-drop span {
        border: var(--brand-color) 2px dashed;
        border-radius: var(--element-radius);
        display: block;
        width: 100%;
        height: 100%;
    }
    .resource-drop div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .resource-drop p {
        margin: 0;
    }
    .resource-drop img {
        height: 80px;
        filter: var(--icon-filter-weak);
    }
    .resource-drop button {
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
    .resource-drop button:hover {
        text-decoration: underline;
    }
</style>
