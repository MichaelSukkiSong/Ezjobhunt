// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onObjectFinalized } = require("firebase-functions/v2/storage");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

const { processJob } = require("./utils/processJobs");
const { processResume } = require("./utils/processResume");
const pdf = require("pdf-parse");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

initializeApp();

exports.createProfileForRecruitors = onObjectFinalized(
  { cpu: 2 },
  async (event) => {
    const fileBucket = event.data.bucket; // Storage bucket containing the file.
    const filePath = event.data.name; // File path in the bucket.
    const contentType = event.data.contentType; // File content type.

    // console.log("===fileBucket : ", fileBucket);
    // console.log("===filePath : ", filePath);
    // console.log("===contentType : ", contentType);

    //get bucket
    const bucket = getStorage().bucket(fileBucket);
    // download the file
    const downloadResponse = await bucket.file(filePath).download();
    const dataBuffer = downloadResponse[0];
    // console.log("==dataBuffer: ", dataBuffer);

    if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Unzip the content of the file
      const zip = new PizZip(dataBuffer);

      // This will parse the template, and will throw an error if the template is
      // invalid, for example, if the template is "{user" (no closing tag)
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const text = doc.getFullText();
      // console.log(text);

      // create linkedin-like profile
      const processedResume = await processResume(text);
      // console.log(processedResume);
      const processedResume_obj = JSON.parse(processedResume);
      // console.log(processedResume_obj);

      if (processedResume_obj) {
        //get firestore db
        const db = getFirestore();

        // save to firestore 'resumes' collection
        await db.collection("resumes").add(processedResume_obj);
        console.log("saved to firestore!");
      }
    }

    if (contentType === "application/pdf") {
      // if the file is a pdf file
      pdf(dataBuffer)
        .then(async (data) => {
          // number of pages
          // console.log(data.numpages);
          // number of rendered pages
          // console.log(data.numrender);
          // PDF info
          // console.log(data.info);
          // PDF metadata
          // console.log(data.metadata);
          // PDF.js version
          // check https://mozilla.github.io/pdf.js/getting_started/
          // console.log(data.version);

          // PDF text
          // console.log(data.text);

          // create linkedin-like profile
          const processedResume = await processResume(data.text);
          // console.log(processedResume);
          const processedResume_obj = JSON.parse(processedResume);
          // console.log(processedResume_obj);

          if (processedResume_obj) {
            //get firestore db
            const db = getFirestore();

            // save to firestore 'resumes' collection
            await db.collection("resumes").add(processedResume_obj);
            console.log("saved to firestore!");
          }
        })
        .catch((err) => {
          console.log("Error parsing/saving pdf file");
        });
    }
  }
);

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
