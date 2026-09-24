interface ProfileData {
  skills?: string;
  career?: string;
  certifications?: string;
}

function toList(text?: string): string[] {
  if (!text) return [];
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

// 「2022年3月　東京理科大学　入学」→ 日付 / 名前 / 出来事 に分ける
function parseCareer(item: string) {
  let date = "";
  let rest = item;

  const ym = item.match(/^(\d{4})年\s*(\d{1,2})月\s*(.*)$/);
  const y = item.match(/^(\d{4})年\s*(.*)$/);
  if (ym) {
    date = `${ym[1]}.${ym[2].padStart(2, "0")}`;
    rest = ym[3];
  } else if (y) {
    date = y[1];
    rest = y[2];
  }

  const parts = rest.split(/\s+/).filter(Boolean);
  const event = parts.length > 1 ? parts.pop()! : "";
  const title = parts.join(" ");
  return { date, title, event };
}

// 「TOEIC　605」→ 名前 / 右側の値 に分ける
function parseCert(item: string) {
  const parts = item.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    const value = parts.pop()!;
    return { name: parts.join(" "), value };
  }
  return { name: item, value: "" };
}

function Label({ children }: { children: string }) {
  return (
    <h3 class="text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-0 sm:pt-1 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
      {children}
    </h3>
  );
}

export default function Profile({ profile }: { profile: ProfileData }) {
  const skills = toList(profile.skills);
  const career = toList(profile.career).map(parseCareer);
  const certifications = toList(profile.certifications).map(parseCert);

  return (
    <div class="rounded-2xl border border-indigo-100 dark:border-gray-700 shadow-lg shadow-indigo-100/60 dark:shadow-none bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 px-6 sm:px-10 divide-y divide-indigo-100 dark:divide-gray-700">
      {/* スキル */}
      <section class="py-8 sm:grid sm:grid-cols-4 sm:gap-8">
        <Label>Skills</Label>
        <div class="sm:col-span-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              class="px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 経歴 */}
      <section class="py-8 sm:grid sm:grid-cols-4 sm:gap-8">
        <Label>Career</Label>
        <ol class="sm:col-span-3 ml-1 pl-6 border-l-2 border-indigo-200 dark:border-indigo-800 space-y-5">
          {career.map((c, i) => (
            <li key={i} class="relative flex gap-6">
              <span class="absolute -left-[30px] top-[5px] w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-50 dark:ring-gray-800" />
              <span class="w-16 shrink-0 text-sm font-semibold tabular-nums text-indigo-500 dark:text-indigo-400">
                {c.date}
              </span>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {c.title}
                </p>
                {c.event && (
                  <span class="inline-block mt-1 px-2 py-0.5 text-[11px] rounded bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {c.event}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 資格 */}
      <section class="py-8 sm:grid sm:grid-cols-4 sm:gap-8">
        <Label>Certifications</Label>
        <ul class="sm:col-span-3 divide-y divide-indigo-100 dark:divide-gray-700 -my-3">
          {certifications.map((c, i) => (
            <li
              key={i}
              class="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <span class="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                <span class="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[10px]">
                  ✓
                </span>
                {c.name}
              </span>
              {c.value && (
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {c.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}