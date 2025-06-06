import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// To handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/generate-resume/", async (req, res) => {
  const resumeData = req.body;

  const html = generateHTML(resumeData);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Failed to generate resume PDF" });
  }
});

// HTML Template Generator
function generateHTML(data) {
  const {
    fullName,
    email,
    contactNumber,
    socials = [],
    education = {},
    skills = [],
    experiences = [],
    projects = [],
    achievements = [],
    courses = [],
    activities = [],
  } = data;

  const section = (title, items, formatter) =>
    items.length
      ? `<h2>${title}</h2><ul>${items.map(formatter).join("")}</ul>`
      : "";

  const html = `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.fullName} - Resume</title>
    <style>
    body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 0.92rem;
      background-color: #fdfdfd;
      margin: 0;
      padding: 0;
    }
      .skill-list {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
      }
      
      .skill-item {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      
      .skill-title {
        font-weight: bold;
        min-width: 200px;
        flex-shrink: 0;
      }
      
      .skill-description {
        flex-grow: 1;
      }

      .container {
        max-width: 800px;
        margin: 0.5rem auto; /* Reduced from 1.5rem to 0.5rem */
        padding: 1.2rem;
        background: #ffffff;
        border-radius: 8px;
      }
      header {
        text-align: center;
        margin-top: 0; /* Changed from 0.1rem to 0 */
        margin-bottom: 0.4rem; /* Optional: reduce bottom margin too */
      }
      
      header h1 {
        font-size: 1.6rem;
        margin-bottom: 0.3rem;
      }

      header p,
      header a {
        font-size: 0.95rem;
        color: #555;
        text-decoration: none;
        margin: 0 0.25rem;
      }

      h2 {
        border-bottom: 2px solid #ddd;
        padding-bottom: 0.2rem;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        color: #333;
        font-size:1.2rem
      }

      h3 {
        margin-top: 0.8rem;
        margin-bottom: 0.3rem;
        font-size: 1rem;
        color: #444;
      }
      .description {
        max-width: 90%;
        margin-left: 0.5rem;
      }
      ul {
        padding-left: 1.2rem;
        margin-top: 0.3rem;
        margin-bottom: 0.6rem;
      }

      ul li {
        margin-bottom: 0.3rem;
        line-height: 1.4;
      }

      p {
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        line-height: 1.5;
      }

      a {
        color: #007acc !important;
      }

      section {
        margin-bottom: 1rem;
      }

      .controls {
        text-align: center;
        padding: 1rem;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
      }
      .spacing {
        display: flex;
        flex-direction: column;
        gap: 0.5rem; 
      }

      .controls label {
        margin: 0 1rem;
        font-size: 0.95rem;
      }
      .flex-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
      }
      
      .flex-row h3, .flex-row span, .flex-row li {
        margin: 0.2rem 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>${data.fullName}</h1>
        <p>Email: ${data.email} | Contact: ${data.contactNumber}</p>
        <p>
          ${data.socials
            .map(
              (social, i) => `
            <a href="${social.link}">${social.platform}</a>${
                i !== data.socials.length - 1 ? " | " : ""
              }
          `
            )
            .join("")}
        </p>
      </header>

      ${
        data.education?.current?.degree ||
        data.education?.intermediate?.percentage ||
        data.education?.matriculation?.percentage
          ? `
      <section>
        <h2>EDUCATION</h2>
        <div class="spacing">
          ${
            data.education.current?.degree
              ? `
            <div class="flex-row">
              <div>
                <strong>${data.education.current.degree}</strong> in ${data.education.current.branch}, 
                ${data.education.current.college}
                <br/> ${data.education.current.cgpa} CGPA
              </div>
              <span>${data.education.current.session}</span>
            </div>
            `
              : ""
          }
          ${
            data.education.intermediate?.percentage
              ? `
            <div class="flex-row">
              <span><strong>Intermediate</strong> ( ${data.education.intermediate.percentage}% ), ${data.education.intermediate.school}</span>
              <span>${data.education.intermediate.sessionYear}</span>
            </div>
            `
              : ""
          }
          ${
            data.education.matriculation?.percentage
              ? `
            <div class="flex-row">
              <span><strong>Matriculation</strong> ( ${data.education.matriculation.percentage}% ), ${data.education.matriculation.school}</span>
              <span>${data.education.matriculation.sessionYear}</span>
            </div>
            `
              : ""
          }
        </div>
      </section>
      `
          : ""
      }

      ${
        data.skills && data.skills.length
          ? `
      <section>
        <h2>SKILLS</h2>
        <div class="skill-list">
          ${data.skills
            .map(
              (skill) => `
            <div class="skill-item">
              <div class="skill-title">${skill.title}</div>
              <div class="skill-description">${skill.description}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </section>
      `
          : ""
      }

      ${
        data.experiences?.length
          ? `
          <section>
          <h2>WORK EXPERIENCE</h2>
          ${data.experiences
            .map(
              (exp) => `
                <div class="flex-row">
                  <h3>${exp.position} in ${exp.company}</h3>
                  <span>${exp.duration}</span>
                </div>
                <p class="description">${exp.description}</p>

              `
            )
            .join("")}
        </section>
        
      `
          : ""
      }
      ${
        data.achievements && data.achievements.length
          ? `
      <section>
        <h2>ACHIEVEMENTS</h2>
        <ul>
          ${data.achievements.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
      `
          : ""
      }

      ${
        data.projects && data.projects.length
          ? `
      <section>
        <h2>PROJECTS</h2>
        ${data.projects
          .map(
            (project) => `
          <h3>${project.title}</h3>
          <p class="description">${project.description}</p>
          <p><a href="${project.link}">Visit</a></p>
        `
          )
          .join("")}
      </section>
      `
          : ""
      }

      ${
        data.activities && data.activities.length
          ? `
      <section>
        <h2>ACTIVITIES</h2>
        <ul>
          ${data.activities.map((activity) => `<li>${activity}</li>`).join("")}
        </ul>
      </section>
      `
          : ""
      }

      ${
        data.courses && data.courses.length
          ? `
<section>
  <h2>COURSES</h2>
  <ul>
    ${data.courses.map((course) => `<li>${course}</li>`).join("")}
  </ul>
</section>
`
          : ""
      }
    </div>
  </body>
</html>
  `;

  return html;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Resume PDF Generator API running on port ${PORT}`);
});
