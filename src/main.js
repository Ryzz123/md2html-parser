import mdhtmlparser from "./utils/mdhtmlparser.js";
import mdparser from "./utils/mdparser.js";

/**
 * Converts markdown text to HTML with a specified theme and title.
 *
 * @param {Object} options - The options for the conversion.
 * @param {string} options.text - The markdown text to be converted.
 * @param {string} options.theme - The theme to be applied to the HTML.
 * @param {string} options.title - The title to be applied to the HTML.
 * @returns {Promise<Object>} The parsed HTML with the applied theme and title.
 */
const mdhtml = async ({
    text,
    theme,
    title
}) => {
    return mdhtmlparser({
        markdown: await mdparser(text),
        theme,
        title
    });
}

export default mdhtml;