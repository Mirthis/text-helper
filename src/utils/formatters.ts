import { ACTIONS } from "~/data/actions";
import { LANGUAGES } from "~/data/languages";
import { CORRECT_PROMPTS } from "~/data/prompts";

export const getLanguage = (code: string) => {
  const language = LANGUAGES.find((language) => language.code === code);
  if (!language) {
    throw new Error("No language found for code: " + code);
  }
  return language;
};

export const getAction = (value: string) => {
  const action = ACTIONS.find((action) => action.value === value);
  if (!action) {
    throw new Error("No action found for value: " + value);
  }
  return action;
};

export const getFirstWords = (text: string, count: number) => {
  return text.split(" ").slice(0, count).join(" ");
  // return text.split(/\s+/).slice(0, 100).join(" ") + "...";
};

export const getCorrectPrompt = (language: string) => {
  const prompt = CORRECT_PROMPTS[language];
  if (!prompt) {
    throw new Error("No prompt found for language: " + language);
  }
  return prompt;
};
