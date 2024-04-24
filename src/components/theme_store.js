import { writable } from "svelte/store"

let themes = ['light', 'dark', 'ocean', 'fire', 'bubble', 'sun']
export let theme_store = writable('ocean')

export let next_theme = writable('');

if(typeof window !== 'undefined'){
    theme_store.set(localStorage.getItem('theme') || 'ocean')
    next_theme.set(themes[(themes.indexOf(localStorage.getItem('theme'))+1) % themes.length] || 'fire')
}

export let switch_theme = () => {
    next_theme.update((theme) => {
        let new_theme = themes[(themes.indexOf(theme) + 1) % themes.length]
        localStorage.setItem('theme', new_theme)
        theme_store.set(theme)
        return new_theme
    })
}