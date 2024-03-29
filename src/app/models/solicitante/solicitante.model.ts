import { Credenciales } from '../credenciales.model';
import { Imagen } from '../imagen.model';
import { EstadoCivil } from '../estado-civil.model';
import { Ciudad } from '../ciudad.model';
import { Ocupacion } from '../ocupacion/ocupacion.model';
import { OcupacionSolicitante } from '../ocupacion/ocupacion-solicitante';
export class Solicitante {
    constructor(
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public cedula: string,
        public num_complemento_ci: string,
        public genero: string,
        public credenciales: Credenciales,
        public nacionalidad: string,
        public direccion: string,
        public estado_civil: EstadoCivil,
        public ciudad: Ciudad,
        public fecha_nac: Date,
        public profesion: Ocupacion,
        public id?: number,
        public imagen?: Imagen,
        public habilitado?: boolean,
        public creado_en?: Date,
        public ocupaciones?: OcupacionSolicitante[]
    ){
    }
}
