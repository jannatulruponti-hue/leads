import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import mailchimp from "@mailchimp/mailchimp_marketing";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Configure Mailchimp
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || "us2";

  if (MAILCHIMP_API_KEY) {
    mailchimp.setConfig({
      apiKey: MAILCHIMP_API_KEY,
      server: MAILCHIMP_SERVER_PREFIX,
    });
  }

  // API Routes
  app.post("/api/leads", async (req, res) => {
    const { firstName, phone, email, serviceType } = req.body;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
      console.error("Mailchimp configuration missing");
      // Fallback or local log if keys are missing
      console.log("Lead received (Logging only):", { firstName, phone, email, serviceType });
      return res.status(200).json({ success: true, message: "Lead received locally (Missing API Key)" });
    }

    try {
      // Adding member to the list
      await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          PHONE: phone,
          MMERGE4: serviceType, // Assuming serviceType goes to a custom field
        },
      });

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Mailchimp Error:", error.response?.body || error.message);
      
      // If member already exists, handle gracefully
      if (error.response?.body?.title === "Member Exists") {
        return res.status(200).json({ success: true, message: "Already subscribed" });
      }

      res.status(500).json({ 
        success: false, 
        error: error.response?.body?.detail || "Failed to add lead to Mailchimp" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
