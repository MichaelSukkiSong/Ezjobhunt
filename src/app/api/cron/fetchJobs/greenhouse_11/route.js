export const maxDuration = 300;

import { board_tokens_greenhouse_11 } from "@/app/utils/board_tokens";
import { fetchJobs } from "@/app/utils/fetchJobs";
import { saveJobs } from "@/app/utils/saveJobs";

export async function GET(request) {
  // Secure cron function invocation by checking header
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  for (const board_token of board_tokens_greenhouse_11) {
    try {
      const { jobs, meta } = await fetchJobs(board_token);

      if (jobs) {
        await saveJobs(jobs);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return Response.json({ success: true, message: "Cron job completed" });
}
