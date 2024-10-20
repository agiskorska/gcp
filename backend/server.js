const express = require("express");
const fs = require("fs");
const app = express();
const dbFile = "db.json";
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post("/save", (req, res) => {
  const data = req.body;

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

    dbContent.push(data);

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
app.get("/", (req, res) => {
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
