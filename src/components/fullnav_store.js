import { writable } from "svelte/store";

export const fullnav = writable(false)

export const close_nav = () => {
    fullnav.set(false)
}

export const open_nav = () => {
    setTimeout(() => {
        fullnav.set(true)
    }, 5)
}