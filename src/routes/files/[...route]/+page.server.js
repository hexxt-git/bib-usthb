export async function load({ params }) {
    const route = params?.route;

    return { 
        files: [
            { label: "algebra", route: 'bib-usthb/math/algebra', lastModified: '2023-01-12T16:50:00', downloads: 51 }, 
            { label: "calculus", route: 'bib-usthb/math/calculus', lastModified: '2023-02-11T15:40:00', downloads: 87 }, 
            { label: "linear algebra", route: 'bib-usthb/math/linear-algebra', lastModified: '2023-03-10T14:30:00', downloads: 16 }, 
            { label: "differential equations", route: 'bib-usthb/math/differential-equations', lastModified: '2023-04-09T13:20:00', downloads: 74 }, 
            { label: "operating systems", route: 'bib-usthb/math/operating-systems', lastModified: '2023-05-08T12:10:00', downloads: 8 },
            { label: "soccer", route: 'bib-usthb/sports/soccer', lastModified: '2023-06-18T11:15:00', downloads: 21 },
            { label: "basketball", route: 'bib-usthb/sports/basketball', lastModified: '2023-07-17T10:05:00', downloads: 230 },
            { label: "tennis", route: 'bib-usthb/sports/tennis', lastModified: '2023-08-16T09:55:00', downloads: 81 },
            { label: "baseball", route: 'bib-usthb/sports/baseball', lastModified: '2023-09-15T08:45:00', downloads: 2 },
            { label: "swimming", route: 'bib-usthb/sports/swimming', lastModified: '2023-10-14T07:35:00', downloads: 15 },
            { label: "literature", route: 'bib-usthb/arts/literature', lastModified: '2023-11-13T06:25:00', downloads: 84 },
            { label: "poetry", route: 'bib-usthb/arts/poetry', lastModified: '2023-12-12T05:15:00', downloads: 58 },
            { label: "novels", route: 'bib-usthb/arts/novels', lastModified: '2024-01-11T04:05:00', downloads: 21 },
            { label: "drama", route: 'bib-usthb/arts/drama', lastModified: '2024-02-10T03:55:00', downloads: 12 },
            { label: "philosophy", route: 'bib-usthb/arts/philosophy', lastModified: '2024-03-09T02:45:00', downloads: 95 },
            { label: "geometry", route: 'bib-usthb/math/geometry', lastModified: '2024-04-08T01:35:00', downloads: 1 },
            { label: "trigonometry", route: 'bib-usthb/math/trigonometry', lastModified: '2024-05-07T00:25:00', downloads: 35 },
            { label: "volleyball", route: 'bib-usthb/sports/volleyball', lastModified: '2024-06-06T23:15:00', downloads: 81 },
            { label: "rugby", route: 'bib-usthb/sports/rugby', lastModified: '2024-07-05T22:05:00', downloads: 15 },
            { label: "painting", route: 'bib-usthb/arts/painting', lastModified: '2024-08-04T21:55:00', downloads: 48 },
            { label: "sculpture", route: 'bib-usthb/arts/sculpture', lastModified: '2024-09-03T20:45:00', downloads: 55 },
            { label: "ethics", route: 'bib-usthb/arts/ethics', lastModified: '2024-10-02T19:35:00', downloads: 30 },
            { label: "logic", route: 'bib-usthb/arts/logic', lastModified: '2024-10-19T18:25:00', downloads: 8 },
        ],
        route
    }
}
