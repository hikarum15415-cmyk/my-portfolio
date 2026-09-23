import { getWorks, getProfile } from "../microcms.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Profile from "../components/Profile.tsx";
import WorksGallery from "../islands/WorksGallery.tsx";
import ContactForm from "../islands/ContactForm.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const [works, profile] = await Promise.all([getWorks(), getProfile()]);

    const kv = await Deno.openKv();
    const key = ["visitCount"];
    await kv.atomic().mutate({
      type: "sum",
      key,
      value: new Deno.KvU64(1n),
    }).commit();
    const result = await kv.get<Deno.KvU64>(key);
    const visitCount = result.value ? result.value.value.toString() : "1";

    return ctx.render({ works, profile, visitCount });
  },
};

export default function Home({ data }: PageProps) {
  const works = data.works?.contents ?? [];
  const profile = data.profile ?? {};
  const visitCount = data.visitCount ?? "0";

  return (
    <div id="top" class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div class="max-w-4xl mx-auto px-4 py-16">
        <div id="about" class="text-center mb-16 scroll-mt-20">
          <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">こんにちは、emeです</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            自作イラストを掲示します
          </p>
        </div>

        <div id="profile" class="mb-20 scroll-mt-20">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
            プロフィール
          </h2>
          <Profile profile={profile} />
        </div>

        <div id="works" class="scroll-mt-20">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
            作品一覧
          </h2>
          <WorksGallery works={works} />
        </div>

        <div id="contact" class="mt-20 scroll-mt-20">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
            お問い合わせ
          </h2>
          <ContactForm />
        </div>

        <footer class="mt-20 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-400 dark:text-gray-500">
          累計アクセス数: {visitCount} 回
        </footer>
      </div>
    </div>
  );
}