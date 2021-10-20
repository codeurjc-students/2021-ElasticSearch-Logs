export interface SearchRequest {
    fields: String[]
    searchTerms: String[]
    sortBy?: String
    order?: String
    page: number
    size: number
}