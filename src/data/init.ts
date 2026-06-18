import sequelizeConnection from "./config";
import {
    AccessToken,
    Brand,
    Category,
    Client,
    Entry,
    EntryDetails,
    Inventory,
    InventoryMember,
    InventoryMovement,
    Invoice,
    InvoiceDetail,
    InvoiceDetailTax,
    MeasureUnit,
    Product,
    ProductWarehouse,
    Purchase,
    PurchaseItem,
    RefreshToken,
    Role,
    Supplier,
    Tax,
    User,
    Warehouse,
    WarehouseMember,
} from "./models";
import { BrandCreationAttributes } from "./models/brand-model.sequelize";
import { CategoryCreationAttributes } from "./models/category-model.sequelize";
import { UserCreationAttributes } from "./models/user-model.sequelize";
import bcrypt from "bcryptjs";

const dbInit = async () => {
    const isForced = false;
    const isBulkCreateActive = false;

    await Role.sync({ force: isForced });
    await User.sync({ force: isForced });
    await MeasureUnit.sync({ force: isForced });
    await Category.sync({ force: isForced });
    await Brand.sync({ force: isForced });
    await Supplier.sync({ force: isForced });
    await Tax.sync({ force: isForced });
    await Inventory.sync({ force: isForced });
    await InventoryMember.sync({ force: isForced });
    await Warehouse.sync({ force: isForced });
    await WarehouseMember.sync({ force: isForced });
    await Product.sync({ force: isForced });
    await ProductWarehouse.sync({ force: isForced });
    await Purchase.sync({ force: isForced });
    await PurchaseItem.sync({ force: isForced });
    await Entry.sync({ force: isForced });
    await EntryDetails.sync({ force: isForced });
    await InventoryMovement.sync({ force: isForced });
    await Invoice.sync({ force: isForced });
    await InvoiceDetail.sync({ force: isForced });
    await InvoiceDetailTax.sync({ force: isForced });
    await AccessToken.sync({ force: isForced });
    await RefreshToken.sync({ force: isForced });
    await Client.sync({ force: isForced });

    await sequelizeConnection.sync({ force: isForced });

    if (!isBulkCreateActive) {
        return;
    }

    const initialUsers: UserCreationAttributes[] = [
        {
            username: "user01",
            email: "user01@hotmail.com",
            password: bcrypt.hashSync("password", 10),
            firstname: "firstname01",
            lastname: "lastname01",
        },
        {
            username: "user02",
            email: "user02@hotmail.com",
            password: bcrypt.hashSync("password", 10),
            firstname: "firstname02",
            lastname: "lastname02",
        },
        {
            username: "user03",
            email: "user03@hotmail.com",
            password: bcrypt.hashSync("password", 10),
            firstname: "firstname03",
            lastname: "lastname03",
        },
        {
            username: "user04",
            email: "user04@hotmail.com",
            password: bcrypt.hashSync("password", 10),
            firstname: "firstname04",
            lastname: "lastname04",
        },
        {
            username: "betolafarc",
            email: "ragest031@gmail.com",
            password: bcrypt.hashSync("ou260802", 10),
            firstname: "Jose Alberto",
            lastname: "Espinoza Castillo",
        },
    ];

    const initialClients = [
        {
            clientId: "clientId1",
            clientSecret: "clientSecret1",
            redirectUris: "http://localhost:4200/callback",
        },
        {
            clientId: "clientId2",
            clientSecret: "clientSecret2",
            redirectUris: "http://localhost:4200/callback",
        },
    ];

    const initialMeasureUnits = [
        { name: "Kilogramo", abbreviation: "kg" },
        { name: "Litro", abbreviation: "L" },
        { name: "Metro", abbreviation: "m" },
        { name: "Unidad", abbreviation: "u" },
        { name: "Centímetro", abbreviation: "cm" },
        { name: "Milímetro", abbreviation: "mm" },
        { name: "Gramo", abbreviation: "g" },
        { name: "Pulgada", abbreviation: "in" },
        { name: "Yarda", abbreviation: "yd" },
        { name: "Onza", abbreviation: "oz" },
        { name: "Galón", abbreviation: "gal" },
        { name: "Cuarto", abbreviation: "qt" },
        { name: "Pinta", abbreviation: "pt" },
        { name: "Taza", abbreviation: "taza" },
        { name: "Cucharada", abbreviation: "cucharada" },
        { name: "Cucharadita", abbreviation: "cucharadita" },
        { name: "Mililitro", abbreviation: "ml" },
        { name: "Centilitro", abbreviation: "cl" },
    ];

    const initialCategories: CategoryCreationAttributes[] = [
        {
            name: "Electrónica",
            description: "Dispositivos electrónicos y accesorios",
        },
        { name: "Hogar", description: "Artículos para el hogar y la cocina" },
        { name: "Ropa", description: "Vestimenta y accesorios de moda" },
        {
            name: "Jardinería",
            description: "Herramientas y suministros de jardinería",
        },
        { name: "Deportes", description: "Equipamiento y ropa deportiva" },
        {
            name: "Salud y Belleza",
            description: "Productos de salud y cuidado personal",
        },
        {
            name: "Automotriz",
            description: "Accesorios y piezas para vehículos",
        },
        { name: "Juguetes", description: "Juguetes y juegos para niños" },
        { name: "Libros", description: "Libros de diversos géneros" },
        { name: "Alimentos", description: "Productos alimenticios y bebidas" },
    ];

    const initialBrands: BrandCreationAttributes[] = [
        { name: "Samsung", description: "Electrónica y tecnología" },
        { name: "Apple", description: "Productos electrónicos y software" },
        { name: "Nike", description: "Ropa y calzado deportivo" },
        { name: "Adidas", description: "Ropa y calzado deportivo" },
        { name: "Sony", description: "Electrónica y entretenimiento" },
        { name: "LG", description: "Electrodomésticos y electrónica" },
        { name: "Coca-Cola", description: "Bebidas y refrescos" },
        { name: "Pepsi", description: "Bebidas y refrescos" },
    ];

    const initialSuppliers = [
        {
            name: "Distribuidora Norte",
            contactName: "María López",
            phone: "555-1001",
            email: "ventas@norte.com",
            address: "Av. Reforma 100, CDMX",
        },
        {
            name: "Suministros del Sur",
            contactName: "Carlos Ruiz",
            phone: "555-2002",
            email: "contacto@sursupplies.com",
            address: "Calle 5 de Mayo 45, Oaxaca",
        },
    ];

    const initialTaxes = [
        {
            code: "IVA16",
            name: "IVA general 16%",
            taxType: "VAT",
            rate: 0.16,
        },
        {
            code: "IVA0",
            name: "IVA 0%",
            taxType: "VAT",
            rate: 0,
        },
        {
            code: "IEPS8",
            name: "IEPS bebidas 8%",
            taxType: "IEPS",
            rate: 0.08,
        },
        {
            code: "ISR_RET10",
            name: "Retención ISR 10%",
            taxType: "RETENTION",
            rate: -0.1,
        },
    ];

    await Client.bulkCreate(initialClients, { ignoreDuplicates: true });
    await MeasureUnit.bulkCreate(initialMeasureUnits, {
        ignoreDuplicates: true,
    });
    await Category.bulkCreate(initialCategories, { ignoreDuplicates: true });
    await User.bulkCreate(initialUsers, { ignoreDuplicates: true });
    await Brand.bulkCreate(initialBrands, { ignoreDuplicates: true });
    await Supplier.bulkCreate(initialSuppliers, { ignoreDuplicates: true });
    await Tax.bulkCreate(initialTaxes, { ignoreDuplicates: true });
};

export default dbInit;
