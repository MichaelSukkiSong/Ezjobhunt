const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const axios = require("axios");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processResume(resume) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "user",
          content: resume,
        },
      ],
      functions: [
        {
          name: "get_json_from_resume",
          description: "Get information about the resume.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description:
                  "What is the name of the person? Keep it brief - 100 characters or LESS.",
              },
              headline: {
                type: "string",
                description:
                  "Describe the headline(A brief healine describing the profession/occupation/role, e.g Software Engineer). Keep it brief - 100 characters or LESS.",
              },
              contact_info: {
                type: "string",
                description:
                  "Describe the contact info(Linkedin profile, Personal website, Phone number, Address, Email Address)? Keep it brief - 100 characters or LESS.",
              },
              about: {
                type: "string",
                description:
                  "Describe the about section(A intro section or a welcome statement where people introduce theirselves and write about their years of experience, industry, or skills. People also talk about their achievements or previous job experiences.). If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              top_skills: {
                type: "string",
                description:
                  "Describe their top skills. If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              experience: {
                type: "string",
                description:
                  "Describe the experience(job title/role, employment type, comapany name, location, location type, start date, end date, description, skills). Keep it brief - 100 characters or LESS.",
              },
              education: {
                type: "string",
                description:
                  "Describe the education(School, Degree, Field of study, start date, end date, grade, activities and societies, description, skills). Keep it brief - 100 characters or LESS.",
              },
              projects: {
                type: "string",
                description:
                  "Describe the projects(project name, description, skills,start date, end date, contributors).If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              skills: {
                type: "string",
                description:
                  "Describe the skills(e.g. Research / Project management / Programming (Java, Javascript, React.js, Python)).If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              languages: {
                type: "string",
                description:
                  "Describe the language(e.g. English / Korean).If none, output empty string. Keep it brief - 100 characters or LESS.",
              },
              role: {
                type: "string",
                description:
                  "What role does the person in the resume operate in?",
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
              industry: {
                type: "string",
                description:
                  "What industry does the person in the resume operate in?",
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
              "name",
              "headline",
              "contact_info",
              "experience",
              "education",
              "role",
              "industry",
            ],
          },
        },
      ],
    });

    const result = response?.choices?.[0]?.message?.function_call?.arguments;
    console.log(
      "********************response******************** : ",
      response
    );
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
  console.log("***************root***************: ", $.root());
  const textContent = $.root().text();
  console.log("***************textContent***************: ", textContent);

  // Remove extra white spaces and limit the result to maxTokens
  const tokens = textContent.trim().replace(/\s+/g, " ").split(" ");
  const result = tokens.slice(0, maxTokens).join(" ");

  return result;
}

module.exports.processResume = processResume;
