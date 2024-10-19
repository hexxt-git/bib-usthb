export async function load({ params }) {
    const route = params?.route;

    return { 
        files: [
            { label: "algebra", route: 'education/math/algebra' }, 
            { label: "calculus", route: 'education/math/calculus' }, 
            { label: "linear algebra", route: 'education/math/linear-algebra' }, 
            { label: "differential equations", route: 'education/math/differential-equations' }, 
            { label: "discrete mathematics", route: 'education/math/discrete-mathematics' }, 
            { label: "probability", route: 'education/math/probability' }, 
            { label: "statistics", route: 'education/math/statistics' }, 
            { label: "number theory", route: 'education/math/number-theory' }, 
            { label: "combinatorics", route: 'education/math/combinatorics' }, 
            { label: "graph theory", route: 'education/math/graph-theory' }, 
            { label: "set theory", route: 'education/math/set-theory' }, 
            { label: "topology", route: 'education/math/topology' }, 
            { label: "mathematical logic", route: 'education/math/mathematical-logic' }, 
            { label: "real analysis", route: 'education/math/real-analysis' }, 
            { label: "complex analysis", route: 'education/math/complex-analysis' }, 
            { label: "abstract algebra", route: 'education/math/abstract-algebra' }, 
            { label: "numerical analysis", route: 'education/math/numerical-analysis' }, 
            { label: "game theory", route: 'education/math/game-theory' }, 
            { label: "cryptography", route: 'education/math/cryptography' }, 
            { label: "information theory", route: 'education/math/information-theory' }, 
            { label: "algorithms", route: 'education/math/algorithms' }, 
            { label: "data structures", route: 'education/math/data-structures' }, 
            { label: "computer architecture", route: 'education/math/computer-architecture' }, 
            { label: "operating systems", route: 'education/math/operating-systems' }, 
            { label: "computer networks", route: 'education/math/computer-networks' }
        ].sort(() => Math.random() - 0.5),
        route
    }
}
