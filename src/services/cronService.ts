import cron from "node-cron";
import { getTodaysBirthdays } from "./userService";
import { sendBirthdayEmail } from "./emailService";

const runBirthdayCheck = async (): Promise<void> => {
  console.log("🔍 Running birthday check...", new Date().toLocaleString());

  try {
    // Fetch everyone whose birthday is today
    const celebrants = await getTodaysBirthdays();

    if (celebrants.length === 0) {
      console.log("📭 No birthdays today.");
      return;
    }

    console.log(`🎂 Found ${celebrants.length} birthday(s) today!`);

    // Send an email to each person
    for (const user of celebrants) {
      try {
        await sendBirthdayEmail(user.username, user.email);
      } catch (error: any) {
        // If one email fails, log it but continue to the next person
        console.error(
          `❌ Failed to send email to ${user.email}:`,
          error.message,
        );
      }
    }

    console.log("✅ Birthday check complete!");
  } catch (error: any) {
    console.error("❌ Birthday check failed:", error.message);
  }
};

export const startCronJob = (): void => {
  // Runs every day at 7:00am
  cron.schedule("0 7 * * *", runBirthdayCheck, {
    timezone: "Africa/Lagos",
  });

  console.log("⏰ Birthday cron job scheduled for 7:00am daily");
};

// Call this from anywhere to test without waiting for 7am
export const runNow = runBirthdayCheck;
