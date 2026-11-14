// Headless Shopify: build a cart with the Storefront API and hand the shopper to Shopify's hosted checkout.
// Server-only (the Storefront token stays on the server). Switched off until NEXT_PUBLIC_CHECKOUT_LIVE=true.
import "server-only";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2026-10";

const VARIANTS: Record<string, string | undefined> = {
  weekly: process.env.SHOPIFY_VARIANT_WEEKLY,
  sampler: process.env.SHOPIFY_VARIANT_SAMPLER,
  "peach-of-mind": process.env.SHOPIFY_VARIANT_PEACH_OF_MIND,
  "to-the-beet": process.env.SHOPIFY_VARIANT_TO_THE_BEET,
  "zest-life": process.env.SHOPIFY_VARIANT_ZEST_LIFE,
  "calm-o-mile": process.env.SHOPIFY_VARIANT_CALM_O_MILE,
};

const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function createCheckout(lines: { id: string; qty: number }[]): Promise<string> {
  if (!domain || !token) throw new Error("Shopify is not configured");
  const cartLines = lines.map((l) => {
    const merchandiseId = VARIANTS[l.id];
    if (!merchandiseId || merchandiseId.endsWith("/0")) throw new Error(`No Shopify variant for ${l.id}`);
    return { merchandiseId, quantity: Math.max(1, Math.min(20, Math.floor(l.qty))) };
  });
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({
      query: CART_CREATE,
      variables: { input: { lines: cartLines, buyerIdentity: { countryCode: "TH" } } },
    }),
    cache: "no-store",
  });
  const json = await res.json();
  const out = json?.data?.cartCreate;
  if (!res.ok || !out?.cart?.checkoutUrl) {
    throw new Error(out?.userErrors?.[0]?.message || json?.errors?.[0]?.message || `Shopify ${res.status}`);
  }
  return out.cart.checkoutUrl as string;
}
