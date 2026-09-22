import DarkModeToggle from "../islands/DarkModeToggle.tsx";

export default function Header() {
  return (
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#top" class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          eme<span class="text-indigo-500">.</span>
        </a>
        <nav class="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#about" class="hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
          <a href="#works" class="hover:text-gray-900 dark:hover:text-white transition-colors">Works</a>
          <a href="#contact" class="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}