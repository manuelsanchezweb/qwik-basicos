import {
  component$,
  useClientEffect$,
  useStylesScoped$,
} from "@builder.io/qwik";
import gsap from "gsap";
import { QwikLogo } from "../icons/qwik";
import styles from "./textimage.css?inline";

export const Textimage = component$(() => {
  useStylesScoped$(styles);

  useClientEffect$(() => {
    const left = document.querySelector(".textimage h1");
    const right = document.querySelector(".textimage svg");

    const textMediaTimeline = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" },
    });

    textMediaTimeline.fromTo(
      left,
      {
        opacity: 0,
        x: -200,
      },
      { opacity: 1, x: 0 }
    );
    textMediaTimeline.fromTo(
      right,
      {
        opacity: 0,
        x: 200,
      },
      { opacity: 1, x: 0 }
    );

    return () => {
      textMediaTimeline?.kill();
    };
  });

  return (
    <div class="textimage">
      <h1>
        Experimenta
        <br />
        <span>el poder de</span>
        <br />
        este framework
      </h1>
      <QwikLogo />
    </div>
  );
});
