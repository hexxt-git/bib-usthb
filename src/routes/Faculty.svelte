<script>
    export let faculty = {
        abriviation: 'UNDF',
        english_name: 'undefined',
        french_name: 'undefined',
    };
    
</script>


<a class="faculty" href="#{faculty.abriviation}-page">
    <img src="images/university.png" alt="">
    <span>{faculty.english_name}</span>
</a>


<style>
    .faculty{
        height: 65px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        padding: 10px;
        cursor: default;
        border-radius: 15px;
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
</style>