import { MemeTemplate, Meme } from "@/app/(data)/types";

import { MemeEditor } from "@/app/(components)/MemeEditor";
import { MemeDisplay } from "@/app/(components)/MemeDisplay";

export default async function Home() {
  const memeTemplatesReq = await fetch(
    "http://localhost:3000/api/meme-templates"
  );
  const memeTemplates = (await memeTemplatesReq.json()) as MemeTemplate[];

  const memesReq = await fetch("http://localhost:3000/api/memes", {
    cache: "no-cache",
  });
  const memes = (await memesReq.json()) as Meme[];

  return (
    <main className="p-2 max-w-[1200px] mx-auto">
      <MemeEditor templates={memeTemplates} />
      <h2 className="text-3xl font-bold mt-5">Memes</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {memes.map((meme) => (
          <MemeDisplay
            key={meme.id}
            template={
              memeTemplates.find((template) => template.id === meme.template)!
            }
            values={meme.values}
          />
        ))}
      </div>
    </main>
  );
}
