import natural from "natural";
import stopword from "stopword";

function extractKeywords(text) {
    // 1️⃣ Tokenize
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(text.toLowerCase());

    // 2️⃣ Remove stop words
    tokens = stopword.removeStopwords(tokens);

    // 3️⃣ Stem words
    const stemmer = natural.PorterStemmer;
    const roots = tokens.map((word) => stemmer.stem(word));

    // 4️⃣ Remove duplicates
    const uniqueRoots = [...new Set(roots)];

    return uniqueRoots;
}

export { extractKeywords };
