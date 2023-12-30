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

    if (jobDescription_JSON) {
      const db = getFirestore();

      await db.collection("jobs").add(JSON.parse(jobDescription_JSON));
    }
  }
);
