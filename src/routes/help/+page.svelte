<script>
    import Main from "/src/items/Main.svelte";
    import H1 from "/src/items/H1.svelte";
    import H2 from "/src/items/H2.svelte";
    import H3 from "/src/items/H3.svelte";
    import P from "/src/items/P.svelte";
    import A from "/src/items/A.svelte";
</script>

<Main>
    <H1><span>BiB-USTHB</span> help page&nbsp;</H1>
    <P>
        &ensp; This page is designed to help you understand how to navigate and use this website, as well as to provide you with some general information about the service.
    </P>
    <H2>General information</H2>
    <P>
        &ensp; BiB-USTHB website is the unofficial student hub, made by students for students. It is the place where you can find and share all study related resources, such as: lessons, exercises, exams, books and more for free. The website is designed to be simple and easy to use, and it is open to all students from all faculties and all semesters.
    </P>
    <P>
        &ensp; The entire service is ran and maintained all thanks to the students who contribute to the website. both by uploading their files and contributing to the website's development and maintenance. as it is all opensourced on github.
    </P>
    <H2>Navigation</H2>
    <P>
        &ensp; Navigating through the website is simple. You can use the nav bar at the top of the page to access the websites three pages: the home page, the contribution page and this one the help page.
    </P>
    <P>
        &ensp; On the home page, you can find your files and folders through a couple of simple steps: select the faculty you study under, then select the subject you are interested in and finally select the semester you are in. once you have done that, you will get links to the files and folders you are looking for.
    </P>
    <P>
        &ensp; On the contribution page, you can upload your files to the website. First You can optionally insert some identity information, then you will be able to add your files to the website. These files may take some time to appear on the website, as they are reviewed by the website's maintainers before being published.
    </P>
    <H2>Support</H2>
    <P>
        &ensp; If you have any questions, suggestions or issues, you may reach us through the dedicated <A href="/feedback/">feedback</A> page, email <A href="mailto:bibusthb@gmail.com" target="_blank">bibusthb@gmail.com</A>  or through <A href="https://github.com/9EED/BiB-USTHB/issues" target="_blank">github reports</A> we're are always happy to help and we are always looking for ways to improve the website.
    </P>
    <H2 id="app">App Download</H2>
    <div>
        <P>
            &ensp; BiB-USTHB uses modern web technology to offer a fast, easy to use application. You can download the app on your phone or computer by following these steps:
        </P>
        <!-- i should change this -->
        <div id="container">
            <div class="item">
                <H3>On Mobile:</H3>
                <li> Head to the website on your phone or computer. </li>
                <li> Open the drop down menu from the top right of the browser, usually denoted by three vertical dots </li>
                <li> You will find an install button you can click on to start the download. </li>
                <div class="image-container">
                    <img src="/images/mobile_download1.jpg" alt="screenshot of how to download on mobile">
                    <img src="/images/mobile_download2.jpg" alt="screenshot of how to download on mobile">
                </div>
            </div>
            <div class="item">
                <H3>On Desktop:</H3>
                <li> Head to the website on your phone or computer. </li>
                <li> you will find an install icon on the top right of the. </li>
                <li> click the install button to start the downloading process. </li>
                <div class="image-container">
                    <img src="/images/desktop_download1.png" alt="screenshot of how to download on mobile">
                    <img src="/images/desktop_download2.png" alt="screenshot of how to download on mobile">
                </div>
            </div>
        </div>
    </div>
    <H2>Privacy</H2>
    <P>
        &ensp; using this website you're completly anonymous, we don't collect any personal information about you, and we don't track you. anonymous user analytics is kept for the sake of the websites development. so the only information we collect is the one you provide us with when you upload a file, and that information is only used to provide the service and to improve it.
    </P>
</Main>

<style>
    li{
        margin: 5px;
        font-size: 17px;
        line-height: 19px;
    }
    #container{
        margin: 0;
        margin-left: 15px;
    }
    .item{
        margin: 0;
    }
    img{
        max-height: 50vh;
        max-width: 100%;
    }
    .image-container{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
</style>