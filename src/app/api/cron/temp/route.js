export const maxDuration = 300;

import fb from "@/app/services/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

async function processJob(job) {
  const salary = job.data().compensation || job.data().salary_range || null;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `Title: ${job.data().job_title} \nLocation: ${
            job.data().job_location
          } Job description: ${preparedJD(job.data())} ${
            salary ? `\nSalary: ${salary}` : ""
          }`,
        },
      ],
      functions: [
        {
          name: "get_json_from_job_description",
          description: "Get information about the job.",
          parameters: {
            type: "object",
            properties: {
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

    const result = getJSON(
      response?.choices?.[0]?.message?.function_call?.arguments
    );
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
