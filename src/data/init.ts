import sequelizeConnection from "./config";
import { AccessToken, Client, RefreshToken, Team } from "./models";
import Brand, { BrandCreationAttributes } from "./models/brand-model.sequelize";
import Category, {
    CategoryCreationAttributes,
} from "./models/category-model.sequelize";
import Comment from "./models/comments-model.sequelize";
import FavoriteProject from "./models/favorite-projects-model.sequelize";
import InventoryMember from "./models/inventory-member-model.sequelize";
import Inventory from "./models/inventory-model.sequelize";
import MeasureUnit from "./models/measure-unit.model.sequelize";
import Product from "./models/product.model.sequelize";
import Project from "./models/project-model.sequelize";
import PurchaseItem from "./models/purchase-item-model.sequelize";
import Purchase from "./models/purchase-model.sequelize";
import Task from "./models/task-model.sequelize";
import TaskStatus, {
    TaskStatusCreationAttributes,
} from "./models/taskstatus-model.sequelize";
import TeamMember from "./models/team-member-model.sequelize";
import User, { UserCreationAttributes } from "./models/user-model.sequelize";
import Role from "./models/user-role-model.sequelize";
import bcrypt from "bcryptjs";
import { Warehouse } from "./models/warehouse-model.sequelize";

const dbInit = async () => {
    // Sync all models

    const isForced = true;
    const isBulkCreateActive = true;

    await Role.sync({ force: isForced });
    await User.sync({ force: isForced });
    // await Team.sync({ force: isForced });
    // await Project.sync({ force: isForced });
    // await TeamMember.sync({ force: isForced });
    // await FavoriteProject.sync({ force: isForced });
    // await TaskStatus.sync({ force: isForced });
    // await Task.sync({ force: isForced });
    await MeasureUnit.sync({ force: isForced });
    await Category.sync({ force: isForced });
    await Brand.sync({ force: isForced });
    await Product.sync({ force: isForced });
    await Purchase.sync({ force: isForced });
    await PurchaseItem.sync({ force: isForced });
    // await Comment.sync({ force: isForced });
    await AccessToken.sync({ force: isForced });
    await RefreshToken.sync({ force: isForced });
    await Client.sync({ force: isForced });
    await Inventory.sync({ force: isForced });
    await InventoryMember.sync({ force: isForced });
    await Warehouse.sync({ force: isForced });

    //

    await sequelizeConnection.sync({ force: isForced });

    (async () => {
        const initialUsers: UserCreationAttributes[] = [
            {
                username: "user01",
                email: "user01@hotmail.com",
                password: bcrypt.hashSync("password", 10), // Hash the password
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
                clientSecret: "clientSecret1",
                redirectUris: "http://localhost:4200/callback",
            },
            {
                clientSecret: "clientSecret2",
                redirectUris: "http://localhost:4200/callback",
            },
        ];

        // const taskStatuses: TaskStatusCreationAttributes[] = [
        //     {
        //         id: 1,
        //         taskStatusLabel: "Sin Iniciar",
        //     },
        //     {
        //         id: 2,
        //         taskStatusLabel: "En Progreso",
        //     },
        //     {
        //         id: 3,
        //         taskStatusLabel: "Cancelado",
        //     },
        //     {
        //         id: 4,
        //         taskStatusLabel: "Completado",
        //     },
        // ];

        const initialMeasureUnits = [
            {
                name: "Kilogramo",
                abbreviation: "kg",
            },
            {
                name: "Litro",
                abbreviation: "L",
            },
            {
                name: "Metro",
                abbreviation: "m",
            },
            {
                name: "Unidad",
                abbreviation: "u",
            },
            {
                name: "Centímetro",
                abbreviation: "cm",
            },
            {
                name: "Milímetro",
                abbreviation: "mm",
            },
            {
                name: "Gramo",
                abbreviation: "g",
            },
            {
                name: "Pulgada",
                abbreviation: "in",
            },
            {
                name: "Yarda",
                abbreviation: "yd",
            },
            {
                name: "Onza",
                abbreviation: "oz",
            },
            {
                name: "Galón",
                abbreviation: "gal",
            },
            {
                name: "Cuarto",
                abbreviation: "qt",
            },
            {
                name: "Pinta",
                abbreviation: "pt",
            },
            {
                name: "Taza",
                abbreviation: "taza",
            },
            {
                name: "Cucharada",
                abbreviation: "cucharada",
            },
            {
                name: "Cucharadita",
                abbreviation: "cucharadita",
            },
            {
                name: "Mililitro",
                abbreviation: "ml",
            },
            {
                name: "Centilitro",
                abbreviation: "cl",
            },
        ];

        const initialCategories: CategoryCreationAttributes[] = [
            {
                name: "Electrónica",
                description: "Dispositivos electrónicos y accesorios",
            },
            {
                name: "Hogar",
                description: "Artículos para el hogar y la cocina",
            },
            {
                name: "Ropa",
                description: "Vestimenta y accesorios de moda",
            },
            {
                name: "Jardinería",
                description: "Herramientas y suministros de jardinería",
            },
            {
                name: "Deportes",
                description: "Equipamiento y ropa deportiva",
            },
            {
                name: "Salud y Belleza",
                description: "Productos de salud y cuidado personal",
            },
            {
                name: "Automotriz",
                description: "Accesorios y piezas para vehículos",
            },
            {
                name: "Juguetes",
                description: "Juguetes y juegos para niños",
            },
            {
                name: "Libros",
                description: "Libros de diversos géneros",
            },
            {
                name: "Alimentos",
                description: "Productos alimenticios y bebidas",
            },
        ];

        const initialBrands: BrandCreationAttributes[] = [
            {
                name: "Samsung",
                description: "Electrónica y tecnología",
            },
            {
                name: "Apple",
                description: "Productos electrónicos y software",
            },
            {
                name: "Nike",
                description: "Ropa y calzado deportivo",
            },
            {
                name: "Adidas",
                description: "Ropa y calzado deportivo",
            },
            {
                name: "Sony",
                description: "Electrónica y entretenimiento",
            },
            {
                name: "LG",
                description: "Electrodomésticos y electrónica",
            },
            {
                name: "Coca-Cola",
                description: "Bebidas y refrescos",
            },
            {
                name: "Pepsi",
                description: "Bebidas y refrescos",
            },
        ];

        if (isBulkCreateActive) {
            await Client.bulkCreate(initialClients, { ignoreDuplicates: true });
            // await TaskStatus.bulkCreate(taskStatuses, {
            //     ignoreDuplicates: true,
            // });
            await MeasureUnit.bulkCreate(initialMeasureUnits, {
                ignoreDuplicates: true,
            });
            await Category.bulkCreate(initialCategories, {
                ignoreDuplicates: true,
            });
            await User.bulkCreate(initialUsers, { ignoreDuplicates: true });
            await Brand.bulkCreate(initialBrands, {
                ignoreDuplicates: true,
            });
        }
    })();
};

export default dbInit;
