<main id="welcome-page">
    <img src="/images/students.jpg" alt="students" /> <!--this image is stolen, we prob should replace it-->
    <h1>Welcome to <span>TresorUSTHB</span>!</h1>
    <p>
        &nbsp;&nbsp;&nbsp;<a href="https://google.com" target="_blank">TresorUSTHB</a> is the unofficial student hub, made by students for students. It's a place where you can find all study related resources for your succeess. You can find here all the courses, exams, TDs, TPs, and more for all faculties, specialties and semesters at <a href="https://www.usthb.dz/" target="_blank">USTHB</a>. This website is supported and maintained by student <a href="/contribute" target="_blank">contributions</a> and is free to use. We hope you find it helpful and we are always open to feedback and suggestions. Enjoy your stay! 
    </p>
</main>

<style>
    main{
        height: calc(100vh - var(--nav-height));
        position: relative;
    }
    h1{
        position: absolute;
        bottom: 30px;
        left: 60px;
        margin: 0px;
        user-select: none;
        color: white;
        font-family: 'Rubik';
        font-size: 60px;
        text-shadow: var(--super-strong-shadow);
    }
    h1 span{
        color: var(--barnd-green);
    }
    p{
        position: absolute;
        top: 40px;
        left: 55%;
        width: calc(45% - 20px);
        margin: 0px;
        padding: 5px;
        color: white;
        text-shadow: black 0px 0px 6px;
        font-size: 18px;
    }
    p a{
        color: var(--barnd-green);
        text-decoration: none;
    }
    p a:hover{
        text-decoration: underline;
    }
    img{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        object-fit: cover;
        user-select: none;
        z-index: -1;
    }
    @media (max-width: 700px), (orientation: portrait) {
        h1{
            position: static;
            font-size: 35px;
            padding: 20px 0px 0px 10px;
        }
        p{
            position: static;
            font-size: 18px;
            width: 90%;
        }
    }
</style>