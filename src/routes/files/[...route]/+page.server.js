export async function load({ params }) {
    const route = params?.route;

    return { 
        files: [
            { label: "algebra" }, { label: "calculus" }, { label: "linear algebra" }, { label: "differential equations" }, { label: "discrete mathematics" }, { label: "probability" }, { label: "statistics" }, { label: "number theory" }, { label: "combinatorics" }, { label: "graph theory" }, { label: "set theory" }, { label: "topology" }, { label: "mathematical logic" }, { label: "real analysis" }, { label: "complex analysis" }, { label: "abstract algebra" }, { label: "numerical analysis" }, { label: "game theory" }, { label: "cryptography" }, { label: "information theory" }, { label: "algorithms" }, { label: "data structures" }, { label: "computer architecture" }, { label: "operating systems" }, { label: "computer networks" }
        ].sort(()=>Math.random()-.5),
        route
    }
}
