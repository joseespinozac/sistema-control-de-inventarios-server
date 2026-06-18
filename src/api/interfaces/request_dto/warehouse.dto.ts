export interface NewWarehouseDto {
    name: string;
    code: string;
    description?: string;
    location: string;
    isActive?: boolean;
    managerId: string;
}

export interface UpdateWarehouseDto {
    name?: string;
    code?: string;
    description?: string;
    location?: string;
    isActive?: boolean;
    managerId?: string;
}
