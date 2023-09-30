export interface User {
    name: string;
    email?:String;
    password?:string;
}

export interface Food {
    name: string;
    calories: number;
    ingredients: string[];

}

// Path: types/index.d.ts