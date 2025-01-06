import { MouseEvent } from "react";

export type Arg<Key extends string | number> = {
  event: MouseEvent<HTMLDivElement>;
  option: OptionType<Key>;
};

export type OptionType<Key extends string | number> = {
  key: Key;
  value: string;
};
