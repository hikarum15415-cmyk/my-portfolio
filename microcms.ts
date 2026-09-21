const SERVICE_DOMAIN = Deno.env.get("MICROCMS_SERVICE_DOMAIN")!;
const API_KEY = Deno.env.get("MICROCMS_API_KEY")!;

export async function getWorks() {
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/unlimit`,
    { headers: { "X-MICROCMS-API-KEY": API_KEY } },
  );
  return res.json();
}