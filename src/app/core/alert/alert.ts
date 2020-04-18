export class Alert {

    constructor(
        public readonly typeOfAlert: TypeOfAlert,
        public readonly message: string
        ){}
}

export enum TypeOfAlert {
    
    DANGER,
    SUCCESS,
    WARNING,
    INFO
}