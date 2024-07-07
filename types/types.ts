export interface Product {
	_ref: any;
    name: string;
	title: string;
	image: string;
	_id: string;
	slug: MyString;
	category: Category;
	price: number;
	discount?: number;
	selectedQuantity: number 
}

export interface Category {
	_ref: any;
    _id: string;
    categoryName: string;
    slug: MyString;
    image: string
}

export interface User {
	id: number;
	name: string;
	email: string;
	password: string
}

export interface MyString extends String {
	current: string | undefined
}

export interface CartItem extends Product {
	selectedQuantity: number;
}

export interface Order {
	_id?: string;
	username: string;
	email: string;
	phoneNumber: string;
	address: string;
	postalCode: string;
	orderItems: CartItem[];
	totalAmount: number;
	paid: boolean;
	dispatched: boolean;
	orderDate: Date
}