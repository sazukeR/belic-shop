export interface Product {
 id: string;
 description: string;
 images: string[];
 inStock: number;
 price: number;
 sizes: ValidSize[];
 slug: string;
 tags: string[];
 title: string;
 // type: ValidType;
 gender: "men" | "women" | "kid" | "unisex";
}

export interface CartProduct {
 id: string;
 slug: string;
 price: number;
 title: string;
 size: ValidSize;
 quantity: number;
 image: string;
}

export type ValidCategory = "men" | "women" | "kid" | "unisex";
export type ValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
