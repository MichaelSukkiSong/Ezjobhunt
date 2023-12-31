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
    try {
      const job = event.data;
      const jobDescription_str = await processJob(job);
      const job_title = job.data()?.title || "";
      const job_location = job.data()?.location?.name || "";
      const job_url = job.data()?.absolute_url || "";
      const job_company =
        job.data()?.metadata?.find((el) => el.name === "Entity")?.value ||
        job.data()?.metadata?.find((el) => el.name === "Company")?.value ||
        "";

      const jobetc_obj = {
        job_title,
        job_location,
        job_company,
        job_url,
      };
      // console.log("jobetc_obj", jobetc_obj);
      // console.log("typeof jobetc_obj", typeof jobetc_obj);
      console.log("jobDescription_str", jobDescription_str);
      console.log("typeof jobDescription_str", typeof jobDescription_str);
      // console.log("{ ...jobetc_obj, ...jobDescription_str } : ", {
      //   ...jobetc_obj,
      //   ...jobDescription_str,
      // });
      const jobDescription_obj = jobDescription_str
        ? JSON.parse(jobDescription_str)
        : undefined;
      const job_obj = { ...jobetc_obj, ...jobDescription_obj };
      // console.log("job_obj : ", job_obj);
      // console.log("typeof job_obj : ", typeof job_obj);

      if (job_obj) {
        const db = getFirestore();

        await db.collection("jobs").add(job_obj);
      }
    } catch (e) {
      console.log(e);
    }
  }
);
