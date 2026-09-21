import { getWorks } from "../microcms.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const data = await getWorks();
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps) {
  const works = data.contents ?? [];

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 py-16">
        {/* 自己紹介エリア */}
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">こんにちは、emeです</h1>
          <p class="text-lg text-gray-600 max-w-xl mx-auto">
            作成したイラストを公開します
          </p>
        </div>

        {/* 作品一覧 */}
        <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
          作品一覧
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {works.map((work: any) => (
            <div
              key={work.id}
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {work.image && (
                <img
                  src={work.image.url}
                  alt={work.title}
                  class="w-full h-48 object-cover"
                />
              )}
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  {work.title}
                </h3>
                <p class="text-sm text-gray-600">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}