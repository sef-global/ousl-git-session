const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Directory containing the HTML files
const directoryPath = path.join(__dirname, 'contributors'); // Update folder name if necessary

// Serve static files from the 'contributors' directory
app.use('/contributors', express.static(directoryPath));

// Route for the index page
app.get('/', (req, res) => {
  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }

    // Filter out only the HTML files
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    // Create the main index HTML structure
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contributors</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          ul {
            list-style-type: none;
          }
          li {
            margin: 10px 0;
          }
          a {
            text-decoration: none;
            color: #0073e6;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Contributors</h1>
        <ul>
    `;

    // Append each HTML file as a link
    htmlFiles.forEach(file => {
      const fileName = path.basename(file, '.html');
      htmlContent += `<li><a href="./contributors/${file}" target="_blank">${fileName}</a></li>\n`;
    });

    // Close the HTML structure
    htmlContent += `
        </ul>
      </body>
      </html>
    `;

    // Send the dynamically generated HTML as the response
    res.send(htmlContent);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
