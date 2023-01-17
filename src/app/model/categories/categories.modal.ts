export interface CategoriesResponse {
    message: boolean;
    status: boolean;
    value: CategoriesModal
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