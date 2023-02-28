import {
  ScissorsIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

export interface Action {
  value: string;
  name: string;
  icon: JSX.Element;
}

export const ACTIONS = [
  {
    value: "rewrite",
    name: "Rewrite",
    icon: <PencilSquareIcon className="h-6 w-6" />,
  },
  {
    value: "summarize",
    name: "Summarize",
    icon: <ScissorsIcon className="h-6 w-6" />,
  },
  {
    value: "correct",
    name: "Correct",
    icon: <CheckCircleIcon className="h-6 w-6" />,
  },
];
