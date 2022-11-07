"use client";

import { use } from "react";

const fetchMap = new Map<string, Promise<any>>();
function queryClient(name: string, query: () => Promise<any>) {
  if (!fetchMap.has(name)) fetchMap.set(name, query());

  return fetchMap.get(name)!;
}

export default function Home() {
  const data = use(
    queryClient("hello", () =>
      fetch("http://localhost:3000/api/hello").then((res) => res.json())
    )
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
