export default async function Home() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
