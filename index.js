import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the URL to generate QR code:",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    console.log(`Entered URL is: ${url}`);

    try {
      // Generate QR Code Image
      const qr_svg = qr.image(url);
      qr_svg.pipe(fs.createWriteStream("qr1_img.png"));
      console.log("QR code image generated successfully.");
    } catch (err) {
      console.error("Error generating QR code:", err);
      return;
    }

    // Save URL to Text File
    try {
      fs.writeFileSync("URL.txt", url, { flag: "w" });
      console.log("The file has been saved successfully!");
    } catch (err) {
      console.error("Error saving the file:", err);
    }
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
