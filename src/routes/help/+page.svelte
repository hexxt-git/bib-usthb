<script>
    import Nav from '../Nav.svelte';
    import Footer from '../Footer.svelte';
</script>
<Nav />
<main>
    <h1><span>BiB-USTHB</span> help page&nbsp;</h1>
    <p>
        &ensp; This page is designed to help you understand how to navigate and use this website, as well as to provide you with some general information about the service.<br>
    </p>
    <h2>General information</h2>
    <p>
        &ensp; BiB-USTHB website is the unofficial student hub, made by students for students. It is the place where you can find and share all study related resources, such as: lessons, exercises, exams, books and more for free. The website is designed to be simple and easy to use, and it is open to all students from all faculties and all semesters.
    </p>
    <p>
        &ensp; The entire service is ran and maintained all thanks to the students who contribute to the website. both by uploading their files and contributing to the website's development and maintenance. as it is all opensourced on github.
    </p>
    <h2>Navigation</h2>
    <p>
        &ensp; Navigating through the website is simple. You can use the nav bar at the top of the page to access the websites three pages: the home page, the contribution page and this one the help page.
    </p>
    <p>
        &ensp; On the home page, you can find your files and folders through a couple of simple steps: select the faculty you study under, then select the subject you are interested in and finally select the semester you are in. once you have done that, you will get links to the files and folders you are looking for.
    </p>
    <p>
        &ensp; On the contribution page, you can upload your files to the website. First You can optionally insert some identity information, then you will be able to add your files to the website. These files may take some time to appear on the website, as they are reviewed by the website's maintainers before being published.
    </p>
    <h2>Support</h2>
    <p>
        &ensp; If you have any questions, suggestions or issues, you may reach us through email <a href="mailto:bibusthb@gmail.com">bibusthb@gmail.com</a>  or on <a href="https://github.com/9EED/BiB-USTHB/issues" target="_blank">github issues</a> we're are always happy to help and we are always looking for ways to improve the website.
    </p>
    <h2>Privacy</h2>
    <p>
        &ensp; using this website you're completly anonymous, we don't collect any personal information about you, we don't use cookies and we don't track you. the only information we collect is the one you provide us with when you upload a file, and that information is only used to provide the service and to improve it.
    </p>
</main>
<Footer />
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
        font-size: 1.1em;
        line-height: 1.2em;
        word-spacing: 2px;
    }
    a{
        color: var(--brand-color);
        text-decoration: underline;
    }
</style>