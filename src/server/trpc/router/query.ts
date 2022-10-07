import { t } from "../trpc";
import { searchQueryValidator } from "../../../shared/search-query";
import fs from "fs";

const invIdx = new Map<string, string[]>();
const pageRanks = new Map<string, number>();

const loadPageRanks = () => {
  try {
    // Intitializing the readFileLines with filename
    const data = fs
      .readFileSync(
        "/home/khannom/Documents/UNSA SEMESTRE 10/cloud/search-engine/src/server/trpc/router/pageRanks.txt",
        "utf8"
      )
      .toString();
    const lines = data.split("\n");
    for (const line of lines) {
      const content = line.split("\t");
      const word = content[0];
      if (word) {
        const filesContent = content[1]?.split(",");
        const fileTitles = [];
        for (const fileContent of filesContent ?? []) {
          const fileName = fileContent.split(":")[0];
          if (fileName) {
            fileTitles.push(fileName);
          }
        }
        invIdx.set(word, fileTitles);
      }
    }
  } catch (e) {
    // Printing error
    console.log("Error:", e.stack);
  }
};

const loadInvertedIndex = () => {
  try {
    // Intitializing the readFileLines with filename
    const data = fs
      .readFileSync(
        "/home/khannom/Documents/UNSA SEMESTRE 10/cloud/search-engine/src/server/trpc/router/inv_idx.txt",
        "utf8"
      )
      .toString();
    const lines = data.split("\n");
    for (const line of lines) {
      const content = line.split("\t");
      const word = content[0];
      if (word) {
        const filesContent = content[1]?.split(",");
        const fileTitles = [];
        for (const fileContent of filesContent ?? []) {
          const fileName = fileContent.split(":")[0];
          if (fileName) {
            fileTitles.push(fileName);
          }
        }
        invIdx.set(word, fileTitles);
      }
    }
  } catch (e) {
    // Printing error
    console.log("Error:", e.stack);
  }
};

const findArticlesByText = (text: string) => {
  if (invIdx.size === 0) {
    loadInvertedIndex();
  }
  if (pageRanks.size === 0) {
    loadPageRanks();
  }
  return invIdx.get(text);
};

export const queryRouter = t.router({
  query: t.procedure.input(searchQueryValidator).query(({ input }) => {
    return input.query;
  }),
  getArticles: t.procedure.input(searchQueryValidator).mutation(({ input }) => {
    return { articles: findArticlesByText(input.query ?? []) };
  }),
});
