import { writable } from "svelte/store"

let themes = ['light', 'dark', 'ocean', 'fire', 'bubble', 'sun']

export let theme_store = writable('ocean')
export let next_theme = writable('');

const get_next = (theme) => themes[(themes.indexOf(theme) + 1) % themes.length]

theme_store.subscribe((theme)=>{
    next_theme.set(get_next(theme))
})

if(typeof window !== 'undefined'){
    theme_store.set(localStorage.getItem('theme') || 'ocean')
}

export let switch_theme = () => {
    theme_store.update((theme) => {
        return get_next(theme)
    })
}
