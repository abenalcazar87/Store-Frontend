import { MenuDto } from "./menu-dto";

export class RolDto {
    nombre?: string;
    descripcion?: string;
    menus?: MenuDto[];
}