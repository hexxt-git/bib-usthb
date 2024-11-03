import { Resend } from "resend"
import { env } from '$env/dynamic/private'


let actions = {default: async() => { console.error('resend api key not found') }};
let resend;

if((env.resend_key||'').slice(0, 6) === 're_GUz'){
    resend = new Resend( env.resend_key );
    actions = {
       default: async({ request }) =>{ // it comes in a weird data struct and i convert it to an object
           const formData = [...await request.formData()].reduce((acc, arr)=>{
               acc[arr[0]] = arr[1]
               return acc
           },{})
           
           console.log(formData)
           
           const subject = `bib-usthb.com ${formData.topic} from ${formData.name || 'anonymous'}`
           const html = `
               <h3>${formData.topic}</h3>
               <p>${formData.detail}</p>
               <hr>
               this feedback mail was sent on ${new Date()}
               by ${formData.name} ${formData.email} ${formData.usthb_student == 'on' ? 'a' : 'not a'} usthb student. studying ${formData.domain}
           `
    
           resend.emails.send({
               from: 'bibusthb@resend.dev',
               to: ['bibusthb@gmail.com'],
               subject: subject,
               html: html
           })
    
       }
    }
}

export { actions };