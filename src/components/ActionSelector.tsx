import { RadioGroup } from "@headlessui/react";
import { ACTIONS } from "~/data/actions";

const ActionSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // const [action, setAction] = useState("rewrite");

  return (
    <div>
      <RadioGroup value={value} onChange={onChange} className="w-full">
        {/* <RadioGroup.Label>Plan</RadioGroup.Label> */}

        <div className="flex w-full justify-between space-x-2">
          {ACTIONS.map((action) => (
            <RadioGroup.Option
              key={action.name}
              value={action.value}
              className="ui-active:sky-100 flex w-1/3 cursor-pointer flex-col items-center rounded-md bg-sky-300 px-2  py-2 ring-2 ring-sky-100 hover:bg-blue-400 focus:outline-none focus:ring-blue-400 ui-checked:bg-blue-500 ui-checked:text-sky-100 ui-active:bg-blue-500 sm:flex-row sm:gap-x-2"
            >
              {action.icon}
              {action.name}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-2">
        {value === "rewrite" && (
          <div className="text-left">
            <p className="font-semibold">Get text re-written.</p>
            <p>Same content in a new form!</p>
          </div>
        )}
        {value === "summarize" && (
          <div className=" text-left sm:text-center">
            <p className="font-semibold">Get text summarized.</p>
            <p>Less is more!</p>
          </div>
        )}
        {value === "correct" && (
          <div className="text-left sm:text-right">
            <p className="font-semibold">Get text corrected.</p>
            <p>And explanations of what was wrong.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionSelector;
