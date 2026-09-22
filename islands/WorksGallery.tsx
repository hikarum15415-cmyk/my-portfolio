import { useState } from "preact/hooks";

interface Work {
  id: string;
  title: string;
  description: string;
  image?: { url: string };
}

export default function WorksGallery({ works }: { works: Work[] }) {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {works.map((work) => (
          <div
            key={work.id}
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelected(work)}
          >
            {work.image && (
              <img
                src={work.image.url}
                alt={work.title}
                class="w-full h-48 object-cover"
              />
            )}
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{work.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{work.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image && (
              <img
                src={selected.image.url}
                alt={selected.title}
                class="w-full object-contain max-h-[60vh] bg-gray-100"
              />
            )}
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-2xl font-bold text-gray-900">{selected.title}</h3>
                <button
                  class="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>
              </div>
              <p class="text-gray-600">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}