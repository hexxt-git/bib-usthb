import { Resend } from "resend";
import { resend_key } from '$env/static/private';

let actions = { default: async () => { console.error('resend api key not found') } };
const resend = new Resend(resend_key);

if (resend_key && resend_key.slice(0, 6) === 're_GUz') {
    console.log('key found!')
    actions = {
        default: async ({ request }) => {
            try {
                const formData = Object.fromEntries([...await request.formData()]);

                const subject = `bib-usthb.com ${formData.topic} from ${formData.name || 'anonymous'}`;
                const html = `
                    <h3>${formData.topic}</h3>
                    <p>${formData.detail}</p>
                    <hr>
                    This feedback mail was sent on ${new Date()}
                    by ${formData.name} ${formData.email} ${formData.usthb_student == 'on' ? 'a' : 'not a'} usthb student. Studying ${formData.domain}.
               `;

                await resend.emails.send({
                    from: 'bibusthb@resend.dev',
                    to: ['bibusthb@gmail.com'],
                    subject: subject,
                    html: html
                });

                console.log("Email sent successfully:", { subject, formData });
            } catch (error) {
                console.error("Error while sending email:", error);
                throw error;
            }
        }
    };
}

export { actions };

