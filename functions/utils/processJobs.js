const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const axios = require("axios");
const cheerio = require("cheerio");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processJob(job) {
  // Grab URL of what was written to Firestore.
  const url = job.data().absolute_url;

  try {
    const res = await axios.get(url);

    const $ = cheerio.load(res.data);
    const jobDescription = $("body").text();

    const trimmedjobDescription = trimJobDescription(jobDescription);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "user",
          content: trimmedjobDescription,
        },
      ],
      functions: [
        {
          name: "get_json_from_job_description",
          description: "Get information about the job.",
          parameters: {
            type: "object",
            properties: {
              job_company: {
                type: "string",
                description:
                  "What is the name of the company? Keep it brief - 50 characters or LESS.",
              },
              about_company: {
                type: "string",
                description:
                  "What does the company do? Keep it brief - 100 characters or LESS.",
              },
              responsibilities: {
                type: "string",
                description:
                  "Describe the role and responsibility. Keep it brief - 100 characters or LESS.",
              },
              tech_stack: {
                type: "string",
                description:
                  "Their tech stack (programming languages, software, tools required to know, etc). If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              requirements: {
                type: "string",
                description:
                  "Describe the ideal candidate for this job. Keep it brief - 100 characters or LESS.",
              },
              salary_range: {
                type: "string",
                description:
                  "Extract salary range from the job description and preserve the currency symbol if provided (ex $, €, £, etc). If none, output empty string.",
              },
              salary_high: {
                type: "number",
                description:
                  "If salary range is provided, output the high end of the range. If just a number is provided, output that number. If none, output null.",
              },
              job_type: {
                type: "string",
                description: "What is the job type?",
                enum: [
                  "Full Time",
                  "Part Time",
                  "Contract",
                  "Internship",
                  "Temporary",
                ],
              },
              role: {
                type: "string",
                enum: [
                  "Engineering",
                  "Design",
                  "Product",
                  "Science",
                  "Sales",
                  "Marketing",
                  "Support",
                  "Operations",
                  "Project Management",
                  "Recruiting & HR",
                  "Finance",
                  "Legal",
                ],
              },
              min_years_experience: {
                type: "number",
                description: "What's the min years of experience required?",
              },
              industry: {
                type: "string",
                description: "What industry does the company operate in?",
                enum: [
                  "Blockchain",
                  "Food",
                  "Transportation",
                  "Biotechnology",
                  "Climate Tech",
                  "HR Software",
                  "Insurance",
                  "Non-Profit",
                  "Education",
                  "Legal",
                  "Media & Entertainment",
                  "Accounting Software",
                  "Telecommunications",
                  "E-commerce",
                  "AI/ML",
                  "Health & Wellness",
                  "Cybersecurity",
                  "Financial Technology",
                  "Real Estate & Construction",
                  "Industrials",
                  "Government",
                  "SaaS / B2B",
                ],
              },
            },
            required: [
              "job_company",
              "about_company",
              "responsibilities",
              "requirements",
              "salary_range",
              "job_type",
              "role",
              "min_years_experience",
              "industry",
              "tech_stack",
            ],
          },
        },
      ],
    });

    const result = response?.choices?.[0]?.message?.function_call?.arguments;
    return result;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

function trimJobDescription(description, maxTokens = 10000) {
  // Load the HTML content using Cheerio
  const $ = cheerio.load(description);

  // Remove script and style tags
  $("script, style").remove();

  // Get text content
  const textContent = $.root().text();

  // Remove extra white spaces and limit the result to maxTokens
  const tokens = textContent.trim().replace(/\s+/g, " ").split(" ");
  const result = tokens.slice(0, maxTokens).join(" ");

  return result;
}

module.exports.processJob = processJob;
