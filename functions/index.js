// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const { processJob } = require("./utils/processJobs");

initializeApp();

exports.makejobdescriptionJSON = onDocumentCreated(
  "/greenhouse/{greenhouseId}",
  async (event) => {
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
  }
);

function combineJson(jsonString1, jsonString2) {
  try {
    // Parse the JSON strings into objects
    const object1 = JSON.parse(jsonString1);
    const object2 = JSON.parse(jsonString2);

    // Combine the objects
    const combinedObject = { ...object1, ...object2 };

    // Return the combined object
    return combinedObject;
  } catch (error) {
    // Handle any errors that might occur during the parsing or combining process
    console.error("Error combining JSON:", error);
    return null;
  }
}
