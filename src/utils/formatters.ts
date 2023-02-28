import { ACTIONS } from "~/data/actions";
import { LANGUAGES } from "~/data/languages";

export const getLanguage = (code: string) => {
  return LANGUAGES.find((language) => language.code === code);
};

export const getAction = (value: string) => {
  return ACTIONS.find((action) => action.value === value);
};

export const getFirstWords = (text: string, count: number) => {
  return text.split(" ").slice(0, count).join(" ");
  // return text.split(/\s+/).slice(0, 100).join(" ") + "...";
};
