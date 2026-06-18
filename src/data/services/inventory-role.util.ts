export type InventoryRole = "owner" | "admin" | "editor" | "viewer";

const ROLE_LEVEL: Record<InventoryRole, number> = {
    viewer: 1,
    editor: 2,
    admin: 3,
    owner: 4,
};

export const hasMinRole = (
    role: InventoryRole,
    minRole: InventoryRole
): boolean => {
    return ROLE_LEVEL[role] >= ROLE_LEVEL[minRole];
};

export const isFullWarehouseAccessRole = (role: InventoryRole): boolean => {
    return role === "owner" || role === "admin";
};
