export const extractHtmlToArrayPlaintext = html => {
  var regex = />([^<]+)</g; // regular expression to match text between > and <

  var matches = []; // array to store matches
  var match;

  while ((match = regex.exec(html))) {
    if (!match[1].trim()) {
      continue;
    }
    // loop through all matches
    matches.push(match[1]); // push the captured group (text) into array
  }
  return matches;
};
