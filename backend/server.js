const express = require("express");
const fs = require("fs");
const app = express();
const dbFile = "db.json";
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to save data to the db.json file
app.post("/save", (req, res) => {
  const data = req.body;

  // Read the current contents of db.json (if any)
  fs.readFile(dbFile, "utf8", (err, fileData) => {
    if (err && err.code !== "ENOENT") {
      return res
        .status(500)
        .json({ message: "Error reading the file", error: err });
    }

    let dbContent = [];
    if (fileData) {
      dbContent = JSON.parse(fileData);
    }

    // Add new data to the content
    dbContent.push(data);

    // Write the updated content back to db.json
    fs.writeFile(dbFile, JSON.stringify(dbContent, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error writing to the file", error: err });
      }
      res.status(200).json({ message: "Data saved successfully!" });
    });
  });
});

// GET endpoint to retrieve data from the db.json file
app.get("/data", (req, res) => {
  fs.readFile(dbFile, "utf8", (err, fileData) => {
    if (err && err.code === "ENOENT") {
      return res.status(200).json({ message: "No data found" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Error reading the file", error: err });
    }

    const dbContent = JSON.parse(fileData);
    res.status(200).json(dbContent);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
