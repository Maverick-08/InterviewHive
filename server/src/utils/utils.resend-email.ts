import { Resend } from "resend";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export const sendEmailResend = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Interview Hive <service@interview-hive.dev-projects.site>",
    to: [`${to}`],
    subject: `${subject}`,
    html,
  });
  if (error) {
    console.log(error);
    if(error.name == "rate_limit_exceeded"){
        return {success:false,rateLimitExceeded:true}
    }
    return {success:false,rateLimitExceeded:false}
  }

  return {success:true,rateLimitExceeded:false}
};
