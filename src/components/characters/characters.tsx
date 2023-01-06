import {
  $,
  component$,
  Resource,
  useResource$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./characters.css?inline";

import { fetchCharacters } from "~/api/fetchCharacters";
import { Button } from "../button/button";

export const Characters = component$(() => {
  useStylesScoped$(styles);

  const button = useStore({
    clicked: false,
  });

  const fetch = $(async () => {
    const fetchButton = document.querySelector("button");
    if (fetchButton) {
      fetchButton.style.display = "none";
    }
    button.clicked = true;
  });

  const allCharacters = useResource$<string[]>(({ track, cleanup }) => {
    // We need a way to re-run fetching data whenever the `github.org` changes.
    // Use `track` to trigger re-running of the this data fetching function.
    track(() => button.clicked);

    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return fetchCharacters(controller);
  });

  return (
    <div class="characters">
      <h2>Carga de JS según lo necesites</h2>
      <Button onclick={fetch} label="Hazme click" />
      {button.clicked === true && (
        <Resource
          value={allCharacters}
          onPending={() => <>Cargando...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(users) => (
            <ul>
              {users.map((user: any) => (
                <li>
                  <figure>
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <figcaption>
                      {user.firstName} {user.lastName}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        />
      )}
    </div>
  );
});
