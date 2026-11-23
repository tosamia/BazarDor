import { cacheLife, cacheTag } from "next/cache";
import type { ChangeDirection } from "./format";

export const BAZARDOR_API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type PriceChange = {
  dir: ChangeDirection;
  pct: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeChange(value: unknown): PriceChange | null {
  if (!isRecord(value)) return null;
  if (typeof value.pct !== "number") return null;
  if (value.dir !== "up" && value.dir !== "down" && value.dir !== "flat") {
    return null;
  }

  return { dir: value.dir, pct: value.pct };
}

function normalizeCategory(value: unknown): Category | null {
  if (!isRecord(value)) return null;
  if (typeof value.id !== "string" || typeof value.slug !== "string") {
    return null;
  }
  if (typeof value.nameBn !== "string" || typeof value.icon !== "string") {
    return null;
  }

  return {
    id: value.id,
    slug: value.slug,
    nameBn: value.nameBn,
    icon: value.icon,
  };
}

function normalizeProduct(value: unknown): Product | null {
  if (!isRecord(value)) return null;

  const change = normalizeChange(value.change);

  if (
    typeof value.id !== "number" ||
    typeof value.nameBn !== "string" ||
    typeof value.category !== "string" ||
    typeof value.categoryNameBn !== "string" ||
    typeof value.categoryIcon !== "string" ||
    typeof value.unit !== "string" ||
    typeof value.today !== "number" ||
    !change
  ) {
    return null;
  }

  return {
    id: value.id,
    slug: typeof value.slug === "string" ? value.slug : String(value.id),
    nameBn: value.nameBn,
    category: value.category,
    categoryNameBn: value.categoryNameBn,
    categoryIcon: value.categoryIcon,
    unit: value.unit,
    image: typeof value.image === "string" ? value.image : value.categoryIcon,
    today: value.today,
    yesterday: typeof value.yesterday === "number" ? value.yesterday : value.today,
    lastWeek: typeof value.lastWeek === "number" ? value.lastWeek : value.today,
    lastMonth: typeof value.lastMonth === "number" ? value.lastMonth : value.today,
    change,
    markets: Array.isArray(value.markets) ? (value.markets as Market[]) : [],
  };
}

function normalizeProducts(value: unknown): Product[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => normalizeProduct(item))
    .filter((item): item is Product => item !== null);
}

function normalizeCategories(value: unknown): Category[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => normalizeCategory(item))
    .filter((item): item is Category => item !== null);
}

async function fetchFromApi(path: string): Promise<unknown> {
  try {
    const response = await fetch(`${BAZARDOR_API_URL}${path}`);

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag("bazardor-products");

  const data = await fetchFromApi("/products");

  return normalizeProducts(data);
}

export async function getCategories(): Promise<Category[]> {
  "use cache: remote";
  cacheLife("hours");
  cacheTag("bazardor-categories");

  const data = await fetchFromApi("/categories");

  return normalizeCategories(data);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache: remote";
  cacheLife("hours");
  cacheTag(`bazardor-category:${slug}`);

  const data = await fetchFromApi(`/categories/${encodeURIComponent(slug)}`);

  return normalizeCategory(data);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag(`bazardor-category-products:${slug}`);

  const data = await fetchFromApi(
    `/products?category=${encodeURIComponent(slug)}`
  );

  return normalizeProducts(data);
}

export async function getProductById(id: number): Promise<Product | null> {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag(`bazardor-product:${id}`);

  const data = await fetchFromApi(`/products/${id}`);

  return normalizeProduct(data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const match = products.find((product) => product.slug === slug);

  if (!match) return null;

  return (await getProductById(match.id)) ?? match;
}
