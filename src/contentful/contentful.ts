import { ContentResponse } from "@/interfaces/content-response.interface";
import { PortfolioContent } from "@/interfaces/portfolio-content.interface";
import * as contentful from "contentful";

export const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const getFirstEntryFields = async (
  contentType: string,
  query: object | undefined,
  locale: string
) => {
  const response = await client.getEntries({
    content_type: contentType,
    ...query,
    locale,
  });
  const fields = response.items[0]?.fields;
  if (!fields) {
    throw new Error(`No entries found for content type "${contentType}".`);
  }
  return fields;
};

export const fetchContentfulData = async (
  contentType: string,
  query?: object,
  locale: string = "en-US"
) => {
  try {
    const fields = await getFirstEntryFields(contentType, query, locale);
    return fields as unknown as ContentResponse;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Failed to fetch data from Contentful.");
  }
};

export const fetchContentfulDataV2 = async (
  contentType: string,
  query?: object,
  locale: string = "en-US"
) => {
  try {
    const fields = await getFirstEntryFields(contentType, query, locale);
    return fields.content as unknown as PortfolioContent;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Failed to fetch data from Contentful.");
  }
};
