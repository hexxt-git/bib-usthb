import { writable } from "svelte/store";

export const fullnav = writable(false)

export const close_nav = () => {
    fullnav.set(false)
}

export const open_nav = () => {
    fullnav.set(true)
}

export const switch_nav = () => {
    fullnav.update(old => !old)
}