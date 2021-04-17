import { ReactNode } from 'react';

export type IMenuItem = {
	id: number;
	title: string;
	link: string;
	icon: ReactNode;
};
