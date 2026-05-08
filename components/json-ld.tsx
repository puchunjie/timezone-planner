import Script from "next/script";
import { SITE_URL } from "@/lib/site";

interface BaseProps {
  id: string;
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Timezone Planner",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd id="ld-website" data={data} />;
}

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({
  items,
  id = "ld-breadcrumbs",
}: {
  items: BreadcrumbCrumb[];
  id?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
  return <JsonLd id={id} data={data} />;
}

export interface ArticleJsonLdProps extends BaseProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function ArticleJsonLd({
  id,
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${SITE_URL}${url}`,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
  return <JsonLd id={id} data={data} />;
}

export interface PlaceJsonLdProps extends BaseProps {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  country: string;
}

export function PlaceJsonLd({
  id,
  name,
  description,
  latitude,
  longitude,
  country,
}: PlaceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    description,
    geo: { "@type": "GeoCoordinates", latitude, longitude },
    address: { "@type": "PostalAddress", addressCountry: country },
  };
  return <JsonLd id={id} data={data} />;
}

function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
