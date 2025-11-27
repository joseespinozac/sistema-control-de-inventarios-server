export interface NewTeamDto {
    name: string;
    description: string;
    membersId: number[];
    ownerId: number;
}

export interface UpdateTeamDto extends NewTeamDto {
    id: number;
}