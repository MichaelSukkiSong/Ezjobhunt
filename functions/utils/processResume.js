const dotenv = require("dotenv");
const { OpenAI } = require("openai");

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
                  "Describe the experience(job title/role, comapany name, start date, end date, description, skills). Keep it brief - 300 characters or LESS. DO NOT EXCEED 300 characters",
              },
              education: {
                type: "string",
                description:
                  "Describe the education(School, Degree, Field of study, start date, end date, grade, activities and societies, description, skills). Keep it brief - 100 characters or LESS.",
              },
              projects: {
                type: "string",
                description:
                  "Describe the projects(project name, description, skills,start date, end date, contributors).If none, output empty string. Keep it brief - 300 characters or LESS. DO NOT EXCEED 300 characters",
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
                  "Data science",
                  "Sales",
                  "Marketing",
                  "Design",
                  "Product Management",
                  "Project Management",
                  "Finance",
                  "Recruiting & HR",
                  "Customer Support",
                  "Science",
                  "Operations",
                  "Legal",
                ],
              },
              industry: {
                type: "string",
                description:
                  "What industry does the person in the resume have operated in the past?",
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

    return result;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

module.exports.processResume = processResume;
