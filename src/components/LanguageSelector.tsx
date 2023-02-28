import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../data/languages";

const FlagImage = ({ url, name }: { url: string; name: string }) => {
  return (
    <Image
      src={url}
      alt={`Flag of ${name}`}
      className="mr-2 h-4 w-8"
      height={32}
      width={64}
    />
  );
};

const LanguageSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const selectedLanguage =
    LANGUAGES.find((l) => l.code === value) || DEFAULT_LANGUAGE;

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative flex w-full cursor-default items-center space-x-2 rounded-lg bg-sky-200 py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:w-72 sm:text-sm">
          <FlagImage
            url={selectedLanguage.flagUrl}
            name={selectedLanguage.name}
          />

          <div className="flex w-full items-center justify-between">
            <span className="block truncate">{selectedLanguage.name}</span>
            <span className="pointer-events-none flex items-center">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-sky-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-72 sm:text-sm">
            {LANGUAGES.map((language, languageIdx) => (
              <Listbox.Option
                key={languageIdx}
                className="relative flex cursor-default select-none space-x-2 py-2 px-3 text-gray-900 ui-active:bg-sky-100 ui-active:text-sky-900"
                value={language.code}
              >
                {({ selected }) => (
                  <>
                    <FlagImage url={language.flagUrl} name={language.name} />
                    <div className="flex w-full justify-between">
                      <span className="block truncate font-normal ui-selected:font-medium">
                        {language.name}
                      </span>
                      {selected && (
                        <span className="items-center text-sky-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default LanguageSelector;
