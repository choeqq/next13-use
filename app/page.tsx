"use client";

import { use } from "react";

const fetchMap = new Map<string, Promise<any>>();
function queryClient<QueryResult>(
  name: string,
  query: () => Promise<QueryResult>
): Promise<QueryResult> {
  if (!fetchMap.has(name)) fetchMap.set(name, query());

  return fetchMap.get(name)!;
}

export default function Home() {
  const pokemons = use(
    queryClient<{ id: number; name: string }[]>("pokemon", () =>
      fetch("http://localhost:3000/api/pokemon").then((res) => res.json())
    )
  );

  return (
    <div>
      {pokemons.map((p) => (
        <button key={p.id}>{p.name}</button>
      ))}
    </div>
  );
}
