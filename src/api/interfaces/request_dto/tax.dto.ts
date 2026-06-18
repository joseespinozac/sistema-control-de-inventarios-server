export interface NewTaxDto {
    code: string;
    name: string;
    taxType: string;
    rate: number;
    isActive?: boolean;
}

export interface UpdateTaxDto {
    code?: string;
    name?: string;
    taxType?: string;
    rate?: number;
    isActive?: boolean;
}
