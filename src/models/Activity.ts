export interface Order {
	amount: string;
	remain: string;
	price: string;
	value: string;
}

export interface Activity {
	orders: Order[];
}
