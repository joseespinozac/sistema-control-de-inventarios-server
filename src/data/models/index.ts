import Team from "./team-model.sequelize";
import User from "./user-model.sequelize";
import Project from "./project-model.sequelize";
import Task from "./task-model.sequelize";
import Comment from "./comments-model.sequelize";
import TaskStatus from "./taskstatus-model.sequelize";
import FavoriteProject from "./favorite-projects-model.sequelize";
import Role from "./user-role-model.sequelize";
import TeamMember from "./team-member-model.sequelize";
import AccessToken from "./accessToken-model.sequelize";
import RefreshToken from "./refreshToken-model.sequelize";
import Client from "./client-model.sequelize";
import Brand from "./brand-model.sequelize";
import Category from "./category-model.sequelize";
import MeasureUnit from "./measure-unit.model.sequelize";
import Product from "./product.model.sequelize";
import Supplier from "./supplier-model.sequelize";
import Tax from "./tax-model.sequelize";
import Inventory from "./inventory-model.sequelize";
import InventoryMember from "./inventory-member-model.sequelize";
import Warehouse from "./warehouse-model.sequelize";
import WarehouseMember from "./warehouse-member-model.sequelize";
import ProductWarehouse from "./product-warehouse-model.sequelize";
import Purchase from "./purchase-model.sequelize";
import PurchaseItem from "./purchase-item-model.sequelize";
import Entry from "./entry-model.sequelize";
import EntryDetails from "./entry-details-model.sequelize";
import InventoryMovement from "./inventory-movements-model.sequelize";
import Invoice from "./invoice-model.sequelize";
import InvoiceDetail from "./invoice-detail-model.sequelize";
import InvoiceDetailTax from "./invoice-detail-tax-model.sequelize";

// IMPORTANT: must be the LAST import.
// Loads cross-model associations AFTER every model class is defined,
// avoiding Sequelize circular-dependency errors.
import "./associations";

export {
    Team,
    User,
    Project,
    Task,
    Comment,
    TaskStatus,
    FavoriteProject,
    Role,
    TeamMember,
    AccessToken,
    RefreshToken,
    Client,
    Brand,
    Category,
    MeasureUnit,
    Product,
    Supplier,
    Tax,
    Inventory,
    InventoryMember,
    Warehouse,
    WarehouseMember,
    ProductWarehouse,
    Purchase,
    PurchaseItem,
    Entry,
    EntryDetails,
    InventoryMovement,
    Invoice,
    InvoiceDetail,
    InvoiceDetailTax,
};
