export interface NewCategoryDto {
    categoryName: string;
    categoryDescription: string;
}

export interface UpdateCategoryDto {
    categoryName?: string;
    categoryDescription?: string;
}
