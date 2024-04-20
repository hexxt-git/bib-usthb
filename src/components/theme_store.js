import { writable } from "svelte/store"

let themes = ['light', 'dark', 'ocean', 'fire', 'bubble', 'sun']
export let theme_store = writable('ocean')

if(typeof window !== 'undefined'){
    theme_store = writable(localStorage.getItem('theme') || 'ocean')
}

export let switch_theme = () => {
    theme_store.update((theme) => {
        let new_theme = themes[(themes.indexOf(theme) + 1) % themes.length]
        localStorage.setItem('theme', new_theme)
        return new_theme
    })
}