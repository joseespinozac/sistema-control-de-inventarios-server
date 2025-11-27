import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface MeasureUnitAttributes {
  id: number;
  name: string;
  abbreviation?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MeasureUnitCreationAttributes
  extends Optional<MeasureUnitAttributes, "id"> {}

class MeasureUnit
  extends Model<MeasureUnitAttributes, MeasureUnitCreationAttributes>
  implements MeasureUnitAttributes
{
  public id!: number;
  public name!: string;
  public abbreviation?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MeasureUnit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      field: "measure_unit_id",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "measure_unit_name",
    },
    abbreviation: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: "measure_unit_abbreviation",
    },
  },
  {
    tableName: "measure_unit",
    updatedAt: "measure_unit_updated_at",
    createdAt: "measure_unit_created_at",
    sequelize: sequelizeConnection,
  }
);

export default MeasureUnit;
