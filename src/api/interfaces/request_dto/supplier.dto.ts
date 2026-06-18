export interface NewSupplierDto {
    name: string;
    contactName?: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive?: boolean;
}

export interface UpdateSupplierDto {
    name?: string;
    contactName?: string;
    phone?: string;
    email?: string;
    address?: string;
    isActive?: boolean;
}
