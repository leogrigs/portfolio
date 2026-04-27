import { ContentResponse } from "./content-response.interface";
import { PortfolioContent } from "./portfolio-content.interface";

export interface ContentState {
  data: ContentResponse | null;
  loading: boolean;
  error: string | null;
}

export interface ContentStateV2 {
  data: PortfolioContent;
  loading: boolean;
  error: string | null;
}
