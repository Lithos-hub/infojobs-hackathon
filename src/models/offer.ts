export interface Offer {
	id: string;
	title: string;
	province: Category;
	city: string;
	link: string;
	category: Category;
	contractType: Category;
	subcategory: Category;
	salaryMin: Category;
	salaryMax: Category;
	salaryPeriod: Category;
	experienceMin: Category;
	workDay: Category;
	study: Category;
	teleworking: Category;
	published: Date;
	updated: Date;
	author: Author;
	requirementMin: string;
	bold: boolean;
	applications: string;
	subSegment: number;
	executive: boolean;
	salaryDescription: string;
	multiProvince: boolean;
	urgent: boolean;
	color: boolean;
}

export interface Author {
	id: string;
	privateId: number;
	name: string;
	uri: string;
	logoUrl: string;
	corporateResponsive: boolean;
	showCorporativeHeader: boolean;
}

export interface Category {
	id: number;
	value: string;
}
