export interface NewMeasureUnitDto {
    measureUnitName: string;
    measureUnitAbbrev: string;
}

export interface UpdateMeasureUnitDto {
    measureUnitName?: string;
    measureUnitAbbrev?: string;
}
