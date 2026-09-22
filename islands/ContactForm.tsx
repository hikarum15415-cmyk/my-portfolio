import { useState } from "preact/hooks";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xdekgjdb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p class="text-center text-green-600 dark:text-green-400 font-medium py-8">
        メッセージを送信しました。ありがとうございます！
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4 max-w-md mx-auto">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          お名前
        </label>
        <input
          type="text"
          name="name"
          required
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          required
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          メッセージ
        </label>
        <textarea
          name="message"
          required
          rows={5}
          class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg py-2 transition-colors"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
      {status === "error" && (
        <p class="text-red-600 dark:text-red-400 text-sm text-center">
          送信に失敗しました。もう一度お試しください。
        </p>
      )}
    </form>
  );
}