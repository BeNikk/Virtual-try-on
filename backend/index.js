const express = require("express");
const multer = require("multer");
const { fal } = require("@fal-ai/client");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
fal.config({ credentials: process.env.FAL_KEY });
app.post("/tryon", upload.fields([{ name: "modelImage" }, { name: "garmentImage" }]), async (req, res) => {
  try {
    console.log("hitting");
    if (!req.files || !req.files["modelImage"] || !req.files["garmentImage"]) {
      return res.status(400).json({ error: "Both images are required" });
    }

    const modelImage = `data:image/png;base64,${req.files["modelImage"][0].buffer.toString("base64")}`;
    const garmentImage = `data:image/png;base64,${req.files["garmentImage"][0].buffer.toString("base64")}`;

    const result = await fal.subscribe("fashn/tryon", {
      input: {
        model_image: modelImage,
        garment_image: garmentImage,
        category: "one-pieces",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    const photo = result.data.images[0].url;
    console.log(result.data.images[0].url);

    res.json(photo);
  } catch (error) {
    console.error("Error processing try-on:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
