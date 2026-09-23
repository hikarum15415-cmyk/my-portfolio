interface ProfileData {
  skills?: string;
  career?: string;
  certifications?: string;
}

function toList(text?: string): string[] {
  if (!text) return [];
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

export default function Profile({ profile }: { profile: ProfileData }) {
  const skills = toList(profile.skills);
  const career = toList(profile.career);
  const certifications = toList(profile.certifications);

  return (
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-10">
      {/* スキル */}
      <div>
        <h3 class="text-sm font-bold tracking-wider text-indigo-500 dark:text-indigo-400 uppercase mb-4">
          Skills
        </h3>
        <div class="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              class="px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div class="grid gap-10 sm:grid-cols-2">
        {/* 経歴（タイムライン風） */}
        <div>
          <h3 class="text-sm font-bold tracking-wider text-indigo-500 dark:text-indigo-400 uppercase mb-4">
            Career
          </h3>
          <ol class="relative border-l-2 border-indigo-200 dark:border-indigo-800 ml-2 space-y-6">
            {career.map((item) => (
              <li key={item} class="ml-5">
                <span class="absolute -left-[7px] w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-gray-800" />
                <p class="text-sm text-gray-700 dark:text-gray-300">{item}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 資格 */}
        <div>
          <h3 class="text-sm font-bold tracking-wider text-indigo-500 dark:text-indigo-400 uppercase mb-4">
            Certifications
          </h3>
          <ul class="space-y-3">
            {certifications.map((item) => (
              <li
                key={item}
                class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2"
              >
                <span class="text-indigo-500 dark:text-indigo-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}