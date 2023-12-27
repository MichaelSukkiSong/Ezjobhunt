export const maxDuration = 300;

import fb from "@/app/services/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { board_tokens_greenhouse_1 } from "@/app/utils/board_tokens";

export async function GET(request) {
  // Secure cron function invocation by checking header
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const db = fb.getFirestore();

  for (const board_token of board_tokens_greenhouse_1) {
    try {
      const { jobs, meta } = await getJobs(board_token);

      if (jobs) {
        await saveJobs(db, jobs);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return Response.json({ success: true, message: "Cron job completed" });
}

async function getJobs(board_token) {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

async function saveJobs(db, jobs) {
  for (const job of jobs) {
    // Check if the job already exists in Firestore
    const querySnapshot = await getDocs(
      query(collection(db, "jobs"), where("id", "==", job.id))
    );

    if (querySnapshot.empty) {
      // Job does not exist, add it to Firestore
      try {
        const docRef = await addDoc(collection(db, "jobs"), {
          ...job,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      // Job already exists, skip
      console.log(
        `Job "${job.title}" already exists in Firestore. Skipping...`
      );
    }
  }
}
