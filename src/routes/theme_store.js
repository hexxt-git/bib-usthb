import { writable } from "svelte/store"

let themes = ['light', 'dark', 'ocean', 'fire']
export let theme_store = writable('light')

if(typeof window !== 'undefined'){
    theme_store = writable(localStorage.getItem('theme') || 'light')
}

export let switch_theme = () => {
    theme_store.update((theme) => {
        let new_theme = themes[(themes.indexOf(theme) + 1) % themes.length]
        localStorage.setItem('theme', new_theme)
        return new_theme
    })
}