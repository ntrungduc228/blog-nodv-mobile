export const extractFirstImgFrommHtml = htmlString => {
  const imgRegex = /<img.+?src="(.+?)"/;
  const match = imgRegex.exec(htmlString);
  if (match && match.length > 1) {
    return match[1];
  }
  return null; // Return null if no image URL found
};
