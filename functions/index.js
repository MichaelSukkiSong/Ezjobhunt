// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const { processJob } = require("./utils/processJobs");
const { combineJson } = require("./utils/combineJson");

initializeApp();

exports.makejobdescriptionJSON = onDocumentCreated(
  "/greenhouse/{greenhouseId}",
  async (event) => {
    try {
      const job = event.data;
      const jobDescription_JSON = await processJob(job);
      const jobetc_JSON = JSON.stringify({
        job_title: job.data().title,
        job_location: job.data().location?.name || "",
        job_company:
          job.data().metadata?.find((el) => el.name === "Entity").value ||
          job.data().metadata?.find((el) => el.name === "Company").value ||
          "",
      });
      const job_obj = combineJson(jobetc_JSON, jobDescription_JSON);

      if (job_obj) {
        const db = getFirestore();

        await db.collection("jobs").add(job_obj);
      }
    } catch (e) {
      console.log(e);
    }
  }
);
