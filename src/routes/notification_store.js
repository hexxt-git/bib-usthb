import { writable } from "svelte/store"

export let notification_store = writable([])

export let notify = new_notification => {
    console.log(new_notification)
    let new_id = Math.floor(Math.random() * 10**12)
    notification_store.update(notifications => {
        return [...notifications, {...new_notification, id: new_id}];
    });
    return new_id
}
export let add_notification = notify

export let delete_notification = delete_id =>{
    notification_store.update(notifications => 
        notifications.filter(notification => notification.id != delete_id)    
    )
}

export let clear_notifications = () => {
    notification_store.set([])
}
