export interface NewProductDto {
    name: string;
    description: string;
    unitQty: number;
    stock: number;
    sku: string;
    barcode: string;
    isActive: boolean;
    categoryId: number;
    brandId: number;
    measureUnitId: number;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    unitQty?: number;
    stock?: number;
    sku?: string;
    barcode?: string;
    isActive?: boolean;
    categoryId?: number;
    brandId?: number;
    measureUnitId?: number;
    removedImages?: string[];
    newImages?: string[];
}
