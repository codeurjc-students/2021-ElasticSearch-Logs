export interface SearchRequest {
  fields: string[];
  searchTerms: string[];
  sortBy?: string;
  order?: string;
  page: number;
  size: number;
}
