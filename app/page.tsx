"use client";

import { use, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  image?: string;
}

function createQueryClient() {
  const fetchMap = new Map<string, Promise<any>>();
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name)!;
  };
}

const queryClient = createQueryClient();

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const pokemons = use(
    queryClient<Pokemon[]>("pokemon", () =>
      fetch("http://localhost:3000/api/pokemon").then((res) => res.json())
    )
  );

  const pokemonDetail = selectedPokemon
    ? use(
        queryClient<Pokemon>(["pokemon", selectedPokemon.id].join("-"), () =>
          fetch(`http://localhost:3000/api/${selectedPokemon.id}`).then((res) =>
            res.json()
          )
        )
      )
    : null;

  return (
    <div>
      {pokemons.map((p) => (
        <button key={p.id} onClick={() => setSelectedPokemon(p)}>
          {p.name}
        </button>
      ))}
      <div>{pokemonDetail && <img src={pokemonDetail.image} />}</div>
    </div>
  );
}
