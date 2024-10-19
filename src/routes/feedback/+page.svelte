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

    let name = writable('')
    let email = writable('')
    let domain = writable('')
    let usthb_student = writable(false)
    
    const submit = e =>{
        shoot_confetti()
        if(!name) name = 'anonymous'
        if(!email) email = 'anonymous@mail'
        if(!domain) domain = 'unknown'
    }

    const feedback_types = [
        "website errors",
        "corrupted/missing module",
        "inappropriately categorized module",
        "corrupted/missing file",
        "inappropriately categorized file",
        "website design (UI)",
        "website layout (UX)",
        "contribution to the website",
        "additional feature requests",
        "words of thanks and appreciation 🤗",
        "other"
    ]

</script>

<Main>
    <H1>BiB-USTHB feedback and support page</H1>    
    <P>
        &nbsp;&nbsp;&nbsp;In this page you can reach us, the developers and maintainers of the website. we're always looking for new ways to improve our service, so plesae write any suggestions or complaints you have on here. you can also reach us through email <A href="mailto:bibusthb@gmail.com" target="_blank">bibusthb@gmail.com</A> and github <A href="https://github.com/9EED/bib-usthb/issues" target="_blank">reports</A>.<br>
        &nbsp;&nbsp;&nbsp;adding personal details is optional but that is how we can get back to you on updates.
    </P>
    <H2>feedback form</H2>
    <form method="POST" on:submit={submit}> 
        <TextInput label='name' store={name} />
        <TextInput label='email' store={email} style="grid-row:2/3; grid-column:1/2" />
        <CheckboxInput label="are you a usthb student" store={usthb_student} />
        <TextInput label='study field' store={domain} />
        <SelectionInput label='topic' options={feedback_types} style="grid-column: 1 / -1" />
        <TextArea label="details" placeholder="details here.." rows="4" required={true} style="grid-column: 1/-1;" />
        <Submit>submit</Submit>
    </form>
</Main>

<style>
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
    @media (max-width: 925px), (orientation: portrait) {
        form{
            grid-template-columns: 1fr;
        }
    }
</style>