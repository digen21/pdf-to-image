/**
 * Dynamically imports the 'canvas' module.
 *
 * @constant {Object} canvas - The imported 'canvas' module.
 * @async
 * @returns {Promise<Object>} The 'canvas' module.
 * The proxy function serves as a convenient way to dynamically load the canvas library,
 */
module.exports = async () => {
  const canvas = await import("canvas");
  return canvas.default || canvas;
};
