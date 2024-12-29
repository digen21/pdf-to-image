/**
 * Dynamically imports the pdfjs-dist library.
 *
 * @constant {Object} pdfjs - The imported pdfjs-dist library.
 * @async
 * @returns {Promise<Object>} The pdfjs-dist library.
 *  The proxy function serves as a convenient way to dynamically load the pdfjs-dist library,
 */
module.exports = async () => {
  const pdfjs = await import("pdfjs-dist");
  return pdfjs.default || pdfjs;
};
