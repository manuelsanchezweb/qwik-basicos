import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./button.css?inline";

interface ButtonProps {
  onclick?: any;
  label?: String;
  children?: any;
}

export const Button = component$((props: ButtonProps) => {
  useStylesScoped$(styles);

  return (
    <button onClick$={props.onclick}>{props.children || props.label}</button>
  );
});
