const X_URL = "https://x.com/emerald_0415";
const INSTAGRAM_URL = "https://www.instagram.com/hikaru_865";
const GITHUB_URL = "https://github.com/hikarum15415-cmyk";

export default function SocialLinks() {
  return (
    <div class="flex items-center gap-4">
      <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
        <img src="/x-icon.png" alt="X" class="w-5 h-5 rounded opacity-70 hover:opacity-100 transition-opacity" />
      </a>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <img src="/instagram-icon.png" alt="Instagram" class="w-5 h-5 rounded opacity-70 hover:opacity-100 transition-opacity" />
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <img src="/github-icon.png" alt="GitHub" class="w-5 h-5 rounded opacity-70 hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}