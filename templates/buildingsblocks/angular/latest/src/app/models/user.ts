import { Role } from './role';

export class User {
    id: number;
    username: string;
    password: string;
    role: Role;
    nombre: string;
    apellido: string;
    identificacion: string;
    estado:boolean;

    hasPrivilege(key: string) : boolean{
        if (!this.role) { return false; }
        else{
            if(this.role.name == key){
                return true;
            }
            else
                return false;
        }
        //return this.role.filter(p => p.key === key).length > 0;
    }

}

