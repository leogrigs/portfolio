import { ContentResponse } from "./content-response.interface";

export interface ContentState {
  data: ContentResponse | null;
  loading: boolean;
  error: string | null;
}
