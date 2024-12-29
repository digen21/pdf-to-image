import axios from "axios";
import { configureUnPDF, renderPageAsImage } from "unpdf";
import fs from "fs";

//* NODE VERSION 20

/**
 * Converts an ArrayBuffer to a Base64 encoded string.
 *
 * @param uint8Array - The ArrayBuffer to be converted.
 * @returns The Base64 encoded string representation of the input ArrayBuffer.
 */
function uint8ArrayToBase64(uint8Array: ArrayBuffer): string {
  return Buffer.from(uint8Array).toString("base64");
}

/**
 * Fetches a PDF file from a specified URL and returns it as a Buffer.
 *
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer containing the PDF data.
 *
 * @throws {Error} Throws an error if the request fails.
 */
const getPdfBuffer = async (): Promise<Buffer> => {
  const response = await axios.get("https://pdfobject.com/pdf/sample.pdf", {
    responseType: "arraybuffer",
  });
  return response && response.data;
};

/**
 * Converts a base64 encoded image to a file and saves it to the specified output path.
 *
 * @param base64Image - The base64 encoded image string.
 * @param outputName - The name of the output file where the image will be saved.
 * @throws Will throw an error if the file writing process fails.
 */
const base64ToImage = (base64Image: string, outputName: string): void => {
  fs.writeFile(outputName, base64Image, { encoding: "base64" }, function (err) {
    if (err) throw err;
  });
};

/**
 * Converts a PDF document to images and saves the result.
 *
 * This function configures the PDF rendering library, retrieves a PDF buffer,
 * renders the first page of the PDF as an image, converts the image to a base64
 * string, writes the base64 string to a file, and saves the image as a PNG file.
 *
 * @async
 * @function getPdfToImages
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if any of the asynchronous operations fail.
 */
const getPdfToImages = async (): Promise<void> => {
  try {
    await configureUnPDF({
      pdfjs: () => require("./pdfjs-proxy")(),
    });

    const pdfBuffer = await getPdfBuffer();
    const pageNumber = 1;

    const result = await renderPageAsImage(
      new Uint8Array(pdfBuffer),
      pageNumber,
      {
        canvas: () => Promise.resolve(require("canvas")),
        // canvas: () => require("./canvas-proxy.js")(),
      }
    );

    const base64 = uint8ArrayToBase64(result);
    fs.writeFileSync("./base64.txt", base64);
    base64ToImage(base64, "./img.png");
  } catch (error) {
    console.error(error);
  }
};

getPdfToImages().then();
