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


export interface NewCategoryModal {
    icon: any;
    name: string;
    webSiteUrl:string;
}