import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Characters } from "~/components/characters/characters";
import { Textimage } from "~/components/textimage/textimage";

export default component$(() => {
  return (
    <div>
      <Textimage />
      <Characters />
    </div>
  );
});

export const head: DocumentHead = {
  title: "⭐️ Básicos de Qwik",
  meta: [
    {
      name: "description",
      content: "Aprender básicos de Qwik",
    },
  ],
};
