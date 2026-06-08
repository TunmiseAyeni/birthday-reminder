import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const buildEmailTemplate = (username: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Happy Birthday!</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f0ede8;
          padding: 40px 16px;
        }
        .wrapper { max-width: 520px; margin: 0 auto; }
        .card { background: #ffffff; border-radius: 16px; overflow: hidden; }
        .top {
          background: #1a1a2e;
          padding: 40px 32px;
          text-align: center;
        }
        .top .big { font-size: 56px; display: block; margin-bottom: 16px; }
        .top h1 { color: #ffffff; font-size: 26px; font-weight: 600; margin-bottom: 8px; }
        .top p { color: rgba(255,255,255,0.5); font-size: 14px; }
        .body { padding: 36px 32px; }
        .body p { font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 16px; }
        .highlight {
          background: #f0ede8;
          border-radius: 10px;
          padding: 20px 24px;
          margin: 24px 0;
          text-align: center;
        }
        .highlight p { font-size: 15px; color: #666; margin: 0; font-style: italic; }
        .accent { color: #f4a261; font-weight: 600; }
        .footer { padding: 20px 32px; border-top: 1px solid #f0ede8; text-align: center; }
        .footer p { font-size: 11px; color: #bbb; line-height: 1.7; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="top">
            <span class="big">🎂</span>
            <h1>Happy Birthday, ${username}!</h1>
            <p>Wishing you the best day ever</p>
          </div>
          <div class="body">
            <p>Hey <span class="accent">${username}</span>,</p>
            <p>
              Today is your day — and we didn't want it to go by
              without letting you know we're thinking of you.
              Birthdays are a reminder of how far you've come and
              everything still ahead of you.
            </p>
            <div class="highlight">
              <p>
                "The secret to staying young is to live honestly,
                eat slowly, and lie about your age."
                <br/><br/>— Lucille Ball
              </p>
            </div>
            <p>
              We hope this year brings you everything you've been
              working towards. Treat yourself today — you've earned it.
            </p>
            <p>With love,<br/>The Birthday Reminder Team 🎈</p>
          </div>
          <div class="footer">
            <p>
              You're receiving this because you signed up for birthday reminders.<br/>
              We only send this once a year, on your birthday.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendBirthdayEmail = async (
  username: string,
  email: string,
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "Birthday Reminder <onboarding@resend.dev>",
    to: email,
    subject: `Happy Birthday, ${username}! 🎉`,
    html: buildEmailTemplate(username),
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(`📧 Birthday email sent to ${username} at ${email}`);
};
