<script>
    import Main from "$lib/items/Main.svelte";
    import H1 from "$lib/items/H1.svelte";
    import H2 from "$lib/items/H2.svelte";
    import H3 from "$lib/items/H3.svelte";
    import P from "$lib/items/P.svelte";
    import A from "$lib/items/A.svelte";
</script>

<Main>
    <H1><span>BiB-USTHB</span> help page&nbsp;</H1>
    <P>
        &ensp; This page is designed to help you understand how to navigate and use this website, as well as
        to provide you with some general information about the service.
    </P>
    <H2>General information</H2>
    <P>
        &ensp; BiB-USTHB website is the unofficial student hub, made by students for students. It is the place
        where you can find and share all study related resources, such as: lessons, exercises, exams, books
        and more all for free. The website is designed to be simple and easy to use, and it is open to all
        students from all faculties and all semesters.
    </P>
    <P>
        &ensp; The entire service is ran and maintained all thanks to the students who contribute to the
        website. both by uploading their files and contributing to the website's development and maintenance.
        as it is all open-sourced on github.
    </P>
    <H2>Navigation</H2>
    <P>
        &ensp; Navigating through the website is simple. You can use the file finder on the home page to
        select a field, year, subject then file.
    </P>
    <P>
        &ensp; On the contribution page, you can upload your files to the website. First You can optionally
        insert some identity information, then you will be able to add your files to the website. These files
        may take some time to appear on the website, as they are reviewed by the website's maintainers before
        being published.
    </P>
    <H2>Support</H2>
    <P>
        &ensp; If you have any questions, suggestions or issues, you may reach us through the dedicated <A
            href="/feedback/">feedback</A
        > page, email <A href="mailto:bibusthb@gmail.com" target="_blank">bibusthb@gmail.com</A> or through <A
            href="https://github.com/hexxt-git/bib-usthv/issues"
            target="_blank">github reports</A
        > we're are always happy to help and we are always looking for ways to improve the website.
    </P>
    <H2>App Download</H2>
    <div>
        <P>
            &ensp; BiB-USTHB uses modern web technology to offer a fast, easy to use application. You can
            download the app on your phone or computer by following these steps:
        </P>
        <!-- i should change this -->
        <div id="container">
            <div class="item">
                <H3>On Mobile:</H3>
                <li>Head to the website on your phone or computer.</li>
                <li>
                    Open the drop down menu from the top right of the browser, usually denoted by three
                    vertical dots
                </li>
                <li>You will find an install button you can click on to start the download.</li>
                <div class="image-container">
                    <img src="/images/mobile_download1.jpg" alt="screenshot of how to download on mobile" />
                    <img src="/images/mobile_download2.jpg" alt="screenshot of how to download on mobile" />
                </div>
            </div>
            <div class="item">
                <H3>On Desktop:</H3>
                <li>Head to the website on your phone or computer.</li>
                <li>you will find an install icon on the top right of the.</li>
                <li>click the install button to start the downloading process.</li>
                <div class="image-container">
                    <img src="/images/desktop_download1.png" alt="screenshot of how to download on mobile" />
                    <img src="/images/desktop_download2.png" alt="screenshot of how to download on mobile" />
                </div>
            </div>
        </div>
    </div>
    <H2>Privacy</H2>
    <P>
        &ensp; Using this website you're completely anonymous, we don't collect any personal information about
        you, and we don't track you. anonymous user analytics is kept for the sake of the websites
        development. and the only information we keep is the one you provide us with when you upload a file
        for the sake of communicating with you if you wish.
    </P>
</Main>

<style>
    li {
        margin: 5px;
        font-size: 17px;
        line-height: 19px;
    }
    #container {
        margin: 0;
        margin-left: 15px;
    }
    .item {
        margin: 0;
    }
    img {
        max-height: 50vh;
        max-width: 100%;
    }
    .image-container {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
</style>
