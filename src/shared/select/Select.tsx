"use client";

import { MouseEvent, useState } from "react";
import { Arg, OptionType } from "./type";

type SelectType<Key extends string | number> = {
  options: OptionType<Key>[];
  option: OptionType<Key>;
  onChange: ({ option, event }: Arg<Key>) => void;
};

export const Select = <Key extends string | number>({
  option,
  options,
  onChange,
}: SelectType<Key>) => {
  const [isOpenInner, setIsOpenInner] = useState(false);

  const handleSelect = () => {
    setIsOpenInner((prev) => !prev);
  };

  const onClick =
    (selectedOption: OptionType<Key>) =>
    (event: MouseEvent<HTMLDivElement>) => {
      onChange({
        event,
        option: selectedOption,
      });
    };

  return (
    <div>
      <button onClick={handleSelect}>{option.value}</button>

      {isOpenInner && (
        <div>
          {options.length &&
            options.map((option) => (
              <div key={option.key} onClick={onClick(option)}>
                {option.value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
