const express = require("express");

const app = express();
var cors = require("cors");
const fs = require("fs");
const path = require("path");

function getDirectoryTree(dir) {
  const stats = fs.statSync(dir);
  if (!stats.isDirectory()) {
    return null;
  }

  const dirName = path.basename(dir);
  const tree = {
    fileName: dirName,
    child: [],
  };

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const childTree = getDirectoryTree(filePath);
      if (childTree !== null) {
        tree.child.push(childTree);
      }
    }
  });

  return tree;
}

app.use(
  cors()
);

app.use(express.json());
app.get("/api", (req, res) => {
  try {
    const documentsTree = getDirectoryTree("/Users/kunal/Documents");

    res.status(200).json({  documentsTree });
  } catch (error) {}
});
app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port ");
});
