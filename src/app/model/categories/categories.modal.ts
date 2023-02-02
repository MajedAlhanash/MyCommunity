export interface CategoriesResponse {
    message: boolean;
    status: boolean;
    dtos: CategoriesModal
}



export interface CategoriesModal {
    iconPath: string;
    name: string;
    id:number;
}

export interface CategoryModal {
    Icon: any;
    Name: string;
}

export interface NewCategoryModal extends CategoryModal{
    clinics: number[];
}
export interface EditCategoryModal extends CategoryModal{
    Id: number;
}
