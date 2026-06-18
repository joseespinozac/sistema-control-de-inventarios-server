export interface NewProductDto {
    name: string;
    description: string;
    unitQty: number;
    min_stock?: number;
    max_stock?: number;
    profit_margin?: number;
    currentPrice?: number;
    sku: string;
    barcode: string;
    isActive: boolean;
    categoryId: string;
    brandId: string;
    measureUnitId: string;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    unitQty?: number;
    min_stock?: number;
    max_stock?: number;
    profit_margin?: number;
    currentPrice?: number;
    sku?: string;
    barcode?: string;
    isActive?: boolean;
    categoryId?: string;
    brandId?: string;
    measureUnitId?: string;
    removedImages?: string[];
    newImages?: string[];
}
