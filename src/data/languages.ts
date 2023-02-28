export interface Language {
  code: string;
  name: string;
  flagUrl: string;
}

export const DEFAULT_LANGUAGE: Language = {
  code: "en",
  name: "English",
  flagUrl: "https://flagcdn.com/gb.svg",
};

export const LANGUAGES: Language[] = [
  DEFAULT_LANGUAGE,
  {
    code: "es",
    name: "Spanish",
    flagUrl: "https://flagcdn.com/es.svg",
  },
  {
    code: "fr",
    name: "French",
    flagUrl: "https://flagcdn.com/fr.svg",
  },
  {
    code: "de",
    name: "German",
    flagUrl: "https://flagcdn.com/de.svg",
  },
  {
    code: "pt",
    name: "Portuguese",
    flagUrl: "https://flagcdn.com/pt.svg",
  },
  {
    code: "it",
    name: "Italian",
    flagUrl: "https://flagcdn.com/it.svg",
  },
];
