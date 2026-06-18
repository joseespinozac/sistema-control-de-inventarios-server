import { InventoryRole } from "../../../data/services/inventory-role.util";

export interface AddInventoryMemberDto {
    userId: string;
    role: InventoryRole;
}

export interface UpdateInventoryMemberDto {
    role: InventoryRole;
}
