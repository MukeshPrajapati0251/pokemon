
import { getPokemonByName } from "../../utils/api";
import Link from "next/link";

export default async function DetailPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getPokemonByName(params.name);

  return (
    <div>
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/">Home</Link> →{" "}
        <span className="capitalize">{data.name}</span>
      </nav>
      <h2 className="text-2xl capitalize font-bold mb-2">{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} className="w-32 h-32 object-contain mb-4" />
      <p className="mt-2">Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <p className="mt-2">Types:</p>
      <ul className="list-disc ml-5">
        {data.types.map((t: any) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>
    </div>
  );
}
