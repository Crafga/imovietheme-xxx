export interface Tag {
    name: string;
    [key: string]: any;
}

export interface Category {
    name: string;
    [key: string]: any;
}

export interface Movie {
    Title: string;
    Img: string;
    Categories: string[];
    [key: string]: any;
}