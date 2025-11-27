import { Op } from "sequelize";
import { QueryOptions } from "../api/interfaces/QueryOptions.interface";

export function buildSequelizeQuery(options: QueryOptions) {
    const { limit = 10, offset = 0, sort, filter = {} } = options;

    const where: any = {};
    for (const key in filter) {
        const value = filter[key];

        // Puedes hacer más filtros inteligentes aquí (ej. ranges, LIKEs, fechas, etc)
        if (typeof value === "string" && value.includes("%")) {
            where[key] = { [Op.like]: value };
        } else {
            where[key] = value;
        }
    }

    const order: any[] = [];
    if (sort) {
        const [field, direction] = sort.split(":");
        order.push([field, direction.toUpperCase()]);
    }

    return {
        where,
        limit,
        offset,
        order,
    };
}
