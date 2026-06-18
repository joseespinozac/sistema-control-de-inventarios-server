import User from "./user-model.sequelize";
import Role from "./user-role-model.sequelize";

import MeasureUnit from "./measure-unit.model.sequelize";
import Category from "./category-model.sequelize";
import Brand from "./brand-model.sequelize";
import Supplier from "./supplier-model.sequelize";
import Tax from "./tax-model.sequelize";

import Inventory from "./inventory-model.sequelize";
import InventoryMember from "./inventory-member-model.sequelize";
import Warehouse from "./warehouse-model.sequelize";
import WarehouseMember from "./warehouse-member-model.sequelize";

import Product from "./product.model.sequelize";
import ProductWarehouse from "./product-warehouse-model.sequelize";

import Purchase from "./purchase-model.sequelize";
import PurchaseItem from "./purchase-item-model.sequelize";

import Entry from "./entry-model.sequelize";
import EntryDetails from "./entry-details-model.sequelize";

import InventoryMovement from "./inventory-movements-model.sequelize";

import Invoice from "./invoice-model.sequelize";
import InvoiceDetail from "./invoice-detail-model.sequelize";
import InvoiceDetailTax from "./invoice-detail-tax-model.sequelize";

// ---------------------------------------------------------------------------
// User <-> Role
// ---------------------------------------------------------------------------
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "user" });

// ---------------------------------------------------------------------------
// Inventory <-> Warehouse <-> User
// ---------------------------------------------------------------------------
Inventory.belongsTo(User, {
    foreignKey: { name: "owner_user_id", allowNull: false },
    as: "owner",
});

Inventory.hasMany(Warehouse, {
    foreignKey: "inventory_id",
    as: "warehouses",
});

Warehouse.belongsTo(Inventory, {
    foreignKey: { name: "inventory_id", allowNull: false },
    as: "inventory",
});

Warehouse.belongsTo(User, {
    foreignKey: { name: "manager_id", allowNull: false },
    as: "manager",
});

// ---------------------------------------------------------------------------
// Inventory members (many-to-many)
// ---------------------------------------------------------------------------
User.belongsToMany(Inventory, {
    through: InventoryMember,
    foreignKey: "user_id",
    as: "memberOfInventories",
});

Inventory.belongsToMany(User, {
    through: InventoryMember,
    foreignKey: "inventory_id",
    as: "members",
});

// ---------------------------------------------------------------------------
// Warehouse members (many-to-many)
// ---------------------------------------------------------------------------
WarehouseMember.belongsTo(User, {
    foreignKey: { name: "user_id", allowNull: false },
    as: "user",
});

WarehouseMember.belongsTo(Warehouse, {
    foreignKey: { name: "warehouse_id", allowNull: false },
    as: "warehouse",
});

User.belongsToMany(Warehouse, {
    through: WarehouseMember,
    foreignKey: "user_id",
    otherKey: "warehouse_id",
    as: "assignedWarehouses",
});

Warehouse.belongsToMany(User, {
    through: WarehouseMember,
    foreignKey: "warehouse_id",
    otherKey: "user_id",
    as: "assignedMembers",
});

// ---------------------------------------------------------------------------
// Products <-> catalogs
// ---------------------------------------------------------------------------
Product.belongsTo(MeasureUnit, {
    foreignKey: "measure_unit_id",
    as: "measureUnit",
});
MeasureUnit.hasMany(Product, {
    foreignKey: "measure_unit_id",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: { name: "category_id", allowNull: true },
    as: "category",
});
Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
});

Product.belongsTo(Brand, {
    foreignKey: { name: "brand_id", allowNull: true },
    as: "brand",
});
Brand.hasMany(Product, {
    foreignKey: "brand_id",
    as: "products",
});

// ---------------------------------------------------------------------------
// Product <-> Warehouse (stock per location)
// ---------------------------------------------------------------------------
ProductWarehouse.belongsTo(Product, {
    foreignKey: { name: "product_id", allowNull: false },
    as: "product",
});
ProductWarehouse.belongsTo(Warehouse, {
    foreignKey: { name: "warehouse_id", allowNull: false },
    as: "warehouse",
});

Product.hasMany(ProductWarehouse, {
    foreignKey: "product_id",
    as: "warehouseStocks",
});
Warehouse.hasMany(ProductWarehouse, {
    foreignKey: "warehouse_id",
    as: "productStocks",
});

// ---------------------------------------------------------------------------
// Purchases
// ---------------------------------------------------------------------------
Purchase.belongsTo(Supplier, {
    foreignKey: "supplier_id",
    as: "supplier",
});
Purchase.belongsTo(Inventory, {
    foreignKey: "inventory_id",
    as: "inventory",
});

Purchase.hasMany(PurchaseItem, {
    foreignKey: "purchase_id",
    as: "items",
});
PurchaseItem.belongsTo(Purchase, {
    foreignKey: "purchase_id",
    as: "purchase",
});

PurchaseItem.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});
Product.hasMany(PurchaseItem, {
    foreignKey: "product_id",
    as: "purchaseItems",
});

// ---------------------------------------------------------------------------
// Entries
// ---------------------------------------------------------------------------
Entry.belongsTo(User, {
    foreignKey: { name: "received_by", allowNull: false },
    as: "receivedBy",
});
Entry.belongsTo(Warehouse, {
    foreignKey: { name: "warehouse_id", allowNull: false },
    as: "warehouse",
});

Entry.hasMany(EntryDetails, {
    foreignKey: "entry_id",
    as: "details",
});
EntryDetails.belongsTo(Entry, {
    foreignKey: "entry_id",
    as: "entry",
});

EntryDetails.belongsTo(Product, {
    foreignKey: { name: "product_id", allowNull: false },
    as: "product",
});
Product.hasMany(EntryDetails, {
    foreignKey: "product_id",
    as: "entryDetails",
});

// ---------------------------------------------------------------------------
// Inventory movements
// ---------------------------------------------------------------------------
InventoryMovement.belongsTo(Product, {
    foreignKey: { name: "product_id", allowNull: false },
    as: "product",
});
InventoryMovement.belongsTo(Warehouse, {
    foreignKey: { name: "warehouse_id", allowNull: false },
    as: "warehouse",
});
InventoryMovement.belongsTo(User, {
    foreignKey: { name: "created_by", allowNull: false },
    as: "createdBy",
});
InventoryMovement.belongsTo(User, {
    foreignKey: { name: "approved_by", allowNull: true },
    as: "approvedBy",
});

// ---------------------------------------------------------------------------
// Invoices
// ---------------------------------------------------------------------------
Invoice.belongsTo(Purchase, {
    foreignKey: { name: "purchase_id", allowNull: true },
    as: "purchase",
});
Invoice.belongsTo(Supplier, {
    foreignKey: { name: "supplier_id", allowNull: false },
    as: "supplier",
});

Invoice.hasMany(InvoiceDetail, {
    foreignKey: "invoice_id",
    as: "details",
});
InvoiceDetail.belongsTo(Invoice, {
    foreignKey: "invoice_id",
    as: "invoice",
});

InvoiceDetail.belongsTo(Product, {
    foreignKey: { name: "product_id", allowNull: false },
    as: "product",
});

InvoiceDetail.hasMany(InvoiceDetailTax, {
    foreignKey: "invoice_detail_id",
    as: "taxes",
});
InvoiceDetailTax.belongsTo(InvoiceDetail, {
    foreignKey: "invoice_detail_id",
    as: "invoiceDetail",
});
InvoiceDetailTax.belongsTo(Tax, {
    foreignKey: "tax_id",
    as: "tax",
});

export {};
