import { writable } from "svelte/store"

export let confetti_array = writable([])

export const shoot_confetti = () => { // i could use a LIFO stack
    const id = Math.random()
    confetti_array.update(arr => [...arr, {id}]);

    setTimeout(()=>{
        console.log(id)
        confetti_array.update(arr => arr.filter(element => element.id !== id));
    }, 3000)
}