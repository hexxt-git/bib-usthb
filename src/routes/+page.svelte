<script>
    import { config } from './config.js';
    let selected_modules = new Array(config.faculties.length).fill(-1);
    let selected_semesters = new Array(config.faculties.length).fill(-1);

</script>

<main>
    <nav>
        <div id="nav-left">
            <div id="nav-logo">TresorUSTHB</div>
            <div class="nav-link" id="nav-language">language</div>
            <div class="nav-link" id="nav-faculties">faculties</div>
            <div class="nav-link" id="nav-creators">creators</div>
        </div>
        <div id="nav-right">
            <input type="search" placeholder="search..." id="nav-search">
            <div id="nav-contribute">contribute</div>
        </div>
    </nav>
    <div id="welcome-page">
        <h1>Welcome to <span>TresorUSTHB</span>!</h1>
        <img src="/images/students.jpg" alt="students" /> <!--this image is stolen, we prob should replace it-->
        <p>
            &nbsp;&nbsp;&nbsp;<a href="https://google.com" target="_blank">TresorUSTHB</a> is the unofficial student hub, made by students for students. It's a place where you can find all study related resources for your succeess. You can find here all the courses, exams, TDs, TPs, and more for all faculties, specialties and semesters at <a href="https://www.usthb.dz/" target="_blank">USTHB</a>. This website is supported and maintained by student <a href="https://google.com" target="_blank">contributions</a> and is free to use. We hope you find it helpful and we are always open to feedback and suggestions. Enjoy your stay! 
        </p>
    </div>

    <div id="faculties-page">
        <h2>faculties</h2>
        <div id="faculties-container">
            {#each config.faculties as faculty}
            <a class="faculty" href="#{faculty.abriviation}-page">
                <img src="images/university.png" alt="">
                <span>{faculty.english_name}</span>
            </a>
            {/each}
        </div>
    </div>

    {#each config.faculties as faculty, index}
    <div id="{faculty.abriviation}-page" class="faculty-page">
        <h2>{faculty.english_name}</h2>
        <div id="{faculty.abriviation}-navigator" class="faculty-navigator">
            <div class="module-selector">
                {#each faculty.modules as module, index2}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="module" style="
                        background-color: {selected_modules[index] === index2 ? 'var(--light-green)' : 'var(--off-off-white)'};
                    " on:click={() => {selected_modules[index] = index2; selected_semesters[index] = -1}}>
                        {module.english_name} <!--<span>50</span>-->
                    </div>
                {/each}
            </div>
            <div class="semester-selector">
                {#if faculty.modules.length && selected_modules[index] !== -1}
                    {#each faculty.modules[selected_modules[index]].semesters as semester, index2}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="semester" style="
                            background-color: {selected_semesters[index] === index2 ? 'var(--light-green)' : 'var(--off-off-white)'};
                        " on:click={() => selected_semesters[index] = index2}>
                            {semester.name} <!--<span>50</span>-->
                        </div>
                    {/each}
                {/if}
            </div>
            <div class="subject-selector">
                {#if faculty.modules.length && selected_modules[index] !== -1 && selected_semesters[index] !== -1}
                {#each faculty.modules[selected_modules[index]].semesters[selected_semesters[index]].links as link}
                    <div class="subject">
                        {link[0]} <!--<span>50</span>-->
                    </div>
                {/each}
                {/if}
            </div>
        </div>
    </div>
    {/each}

    <footer>
        <div>
            made by <a href="https://9EED.github.io/" target="_blank"> Zeghdani Salah </a> and <a href="https://laindev.me/" target="_blank"> Aymen lain</a>
        </div>
        <div>
            kept alive by your <a href="https://google.com" target="_blank">contributions</a>
        </div>
        <div>
            icons from <a href="https://icons8.com/">icons8</a>
        </div>
    </footer>
</main>
<style>
  
*{
    box-sizing: border-box;
    --nav-height: 70px;
    --side-margin: 70px;
    --barnd-green: #49c22a;
    --off-white: #f5f5f5;
    --off-off-white: #eeeeee;
    --super-strong-shadow: #0006 0px 0px 5px;
    --strong-shadow: #0006 0px 0px 10px;
    --weak-shadow: #0004 0px 0px 14px;
    --strong-glow: #61ce36 0px 0px 10px;
    --weak-glow: #61ce3688 0px 0px 14px;
    --light-green: #8ddd6e;
}
main{
    margin: 0px;
    font-family: 'Roboto', sans-serif;
}
nav{
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 0px;
    padding-top: 5px;
    height: var(--nav-height);
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background-color: white;
    box-shadow: var(--strong-shadow);
}
#nav-left{
    display: flex;
    align-items: center;
    gap: 20px;
    padding-left: 30px;
}
#nav-right{
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 45px;
}
#nav-logo{
    min-width: 210px;
    color: var(--barnd-green);
    font-family: 'Rubik';
    font-weight: 700;
    font-size: 30px;
    user-select: none;
    cursor: pointer;
    transition: text-shadow 200ms ease-in-out;
    -webkit-transition: text-shadow 200ms ease-in-out;
    -moz-transition: text-shadow 200ms ease-in-out;
    -ms-transition: text-shadow 200ms ease-in-out;
    -o-transition: text-shadow 200ms ease-in-out;
}
#nav-logo:hover{
    text-shadow: var(--weak-glow);
}
#nav-contribute{
    color: white;
    background-color: var(--barnd-green);
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    user-select: none;
    cursor: pointer;
    transition: box-shadow 200ms ease-in-out;
    -webkit-transition: box-shadow 200ms ease-in-out;
    -moz-transition: box-shadow 200ms ease-in-out;
    -ms-transition: box-shadow 200ms ease-in-out;
    -o-transition: box-shadow 200ms ease-in-out;
    flex-shrink: 1;
}
#nav-contribute:hover{
    box-shadow: var(--strong-glow);
}
#nav-search{
    width: 150px;
    height: 30px;
    border: #666 solid 1.5px;
    box-shadow: var(--weak-shadow);
    outline: none;
    padding: 0px 8px;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    color: var(--barnd-green-darker);
    font-family: 'Rubik';
    font-size: 15px;
    font-weight: 500;
    flex-shrink: 1;
}
.nav-link{
    cursor: pointer;
}
.nav-link:hover{
    text-decoration: underline;
}
#welcome-page{
    height: calc(100vh - var(--nav-height));
    margin-top: var(--nav-height);
    position: relative;
}
#welcome-page h1{
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
#welcome-page h1 span{
    color: var(--barnd-green);
}
#welcome-page p{
    position: absolute;
    top: 40px;
    left: 55%;
    width: calc(45% - 20px);
    margin: 0px;
    padding: 5px;
    color: white;
    text-shadow: black 0px 0px 6px;
}
#welcome-page p a{
    color: var(--barnd-green);
    text-decoration: none;
}
#welcome-page p a:hover{
    text-decoration: underline;
}
#welcome-page img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    user-select: none;
}
#faculties-page{
    padding-top: 10px;
}
.faculty-page h2, #faculties-page h2{
    margin: 10px 0px 0px 20px;
    text-decoration: var(--barnd-green) underline;
    user-select: none;
    cursor: pointer;
    width: fit-content;
    font-family: 'Rubik';
}
#faculties-container{
    margin: 40px var(--side-margin);
    background-color: var(--off-white);
    box-shadow: #4444 2px 5px 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 10px;
    padding-bottom: 20px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
}
.faculty{
    height: 65px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: default;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    color: black;
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
}
.faculty:hover{
    background: var(--off-off-white);
}
.faculty span{
    cursor: pointer;
}
.faculty span:hover{
    text-decoration: underline;
}
.faculty img{
    height: 100%;
}
.faculty-page{
    min-height: 200px;
    display: grid;
    grid-template-rows: auto 1fr;
}
.faculty-navigator{
    margin: 30px var(--side-margin) 50px var(--side-margin);
    padding: 10px;
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: 5fr 3fr 5fr;
    background-color: var(--off-white);
    box-shadow: #4444 2px 5px 15px;
    gap: 10px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    font-weight: 500;
}
.module-selector, .semester-selector, .subject-selector{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.module, .semester, .subject{
    background-color: var(--off-off-white);
    padding: 15px 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    user-select: none;
    cursor: pointer;
}
.module span, .semester span, .subject span{
    color: var(--barnd-green);
    text-decoration: underline;
}
.module:hover, .semester:hover, .subject:hover{
    text-decoration: underline;
}
footer{
    padding: 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--off-white);
    box-shadow: var(--strong-shadow);
}
footer a{
    color: var(--barnd-green);
    text-decoration: none;
}
footer a:hover{
    text-decoration: underline;
}
</style>