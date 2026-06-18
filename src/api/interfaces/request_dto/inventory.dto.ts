export interface NewInventoryDto {
    name: string;
    lowStockThreshold?: number;
    stockMode?: "manual" | "auto";
}

export interface UpdateInventoryDto {
    name?: string;
    lowStockThreshold?: number;
    stockMode?: "manual" | "auto";
}
