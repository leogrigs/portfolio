import { ContentResponse } from "@/interfaces/content-response.interface";
import * as contentful from "contentful";

export const client = contentful.createClient({
  space: "ujdyanw7bzbf",
  environment: "master",
  accessToken: "CoCva5G1v57jvaMo_Wgs6tXFhouWg_vqPcw4yggzYrQ",
});

export const fetchContentfulData = async (
  contentType: string,
  query?: object,
  locale: string = "en-US"
) => {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      ...query,
      locale,
    });
    console.log(response);
    return response.items[0].fields as unknown as ContentResponse;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Failed to fetch data from Contentful.");
  }
};
