/**
 * Validates if a given URL is a valid image URL
 * @param url - The URL string to validate
 * @returns boolean - True if the URL is valid, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url || url === "string") return false;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};
