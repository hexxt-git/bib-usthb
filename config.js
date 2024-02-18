const config = {
    faculties: [
        {
            english_name: 'Biological Sciences',
            french_name: 'Sciences Biologiques',            
            abriviation: 'fbiol',
            modules: [
                {
                    english_name: 'Biochemistry',
                    french_name: 'Biochimie',
                    abriviation: 'fbioc',
                    semesters: [
                        {
                            number: 1,
                            links:{
                                    exams: 'https://www.google.com',
                                    td: 'https://www.google.com',
                                    tp: 'https://www.google.com',
                                    other: 'https://www.google.com',
                                }
                        }
                    ]
                }
            ]
        },
        {
            english_name: 'Chimestry',
            french_name: 'Chimie',
            abriviation: 'fchimie',
        },
        {
            english_name: 'Civil Engineering',
            french_name: 'Génie Civil',
            abriviation: 'fgc',
        },
        {
            english_name: 'Electrical Engineering',
            french_name: 'Génie Electrique',
            abriviation: 'fge',
        },
        {
            english_name: 'Earth Sciences, Geography and Terrritorial Planning',
            french_name: 'Sciences de la Terre, Géographie et Aménagement du Territoire',
            abriviation: 'fst',
        },
        {
            english_name: 'Computer Science',
            french_name: 'Informatique',
            abriviation: 'finfo',
            modules: [
                {
                    abriviation: 'ALGO',
                    french_name: 'Algorithmique et structures de données',
                },
                {
                    abriviation: 'ARCHI',
                    french_name: 'Architecture des ordinateurs',
                },
                {
                    abriviation: 'SE',
                    french_name: "Systèmes d'exploitation",
                },
                {
                    abriviation: 'TIC',
                    french_name: "Technologies de l'information et de la communication",
                },
                
            ]
        },
        {
            english_name: 'Mathematics',
            french_name: 'Mathématiques',
            abriviation: 'fmath',
        },
        {
            english_name: 'Physics',
            french_name: 'Physique',
            abriviation: 'fphy',
        },
        {
            english_name: 'Process And Mechanical Engineering',
            french_name: 'Génie Mécanique et des Procédés',
            abriviation: 'fgmgp',
        },
    ]
}