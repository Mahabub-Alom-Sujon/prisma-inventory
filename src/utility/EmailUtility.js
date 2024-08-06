import nodemailer from 'nodemailer';
export async function SendEmail(EmailTo,EmailText,EmailSubject){
   let Transport= nodemailer.createTransport({
      //host: "mail.teamrabbil.com",
      host: "smtp.gmail.com",
      port:587,
        
      secure:false,
      // auth:{user:"info@teamrabbil.com", pass:"~sR4[bhaC[Qs"},
      auth: {
         user:process.env.SMTP_USERNAME,
         pass:process.env.SMTP_PASSWOED
      },
        tls:{rejectUnauthorized:false}
    })
    let MailOption={
       from:"News Portal <mahabub.sujon78@gmail.com>",
       to:EmailTo,
       subject:EmailSubject,
       text:EmailText
    }
    return await Transport.sendMail(MailOption)
}