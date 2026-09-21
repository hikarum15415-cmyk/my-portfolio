export default function Header() {
  return (
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#top" class="text-xl font-bold tracking-tight text-gray-900">
          eme<span class="text-indigo-500">.</span>
        </a>
        <nav class="flex gap-6 text-sm font-medium text-gray-600">
          <a href="#about" class="hover:text-gray-900 transition-colors">About</a>
          <a href="#works" class="hover:text-gray-900 transition-colors">Works</a>
        </nav>
      </div>
    </header>
  );
}