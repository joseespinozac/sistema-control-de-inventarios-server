export interface QueryOptions {
    limit?: number;
    offset?: number;
    sort?: string;
    filter?: Record<string, string | number>;
}
