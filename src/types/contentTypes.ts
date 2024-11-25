import { tagReturnScheme } from './tagsTypes';
import { ContentType } from './utilityTypes';

export interface addContentSchema {
	title: string;
	link: string;
	type: ContentType;
	tags?: string[];
	note?: string;
}
export interface updateContentSchema {
	title?: string;
	type?: ContentType;
	tags?: string[];
	note?: string;
}
export interface ContentSchema {
	_id: string;
	title: string;
	link: string;
	type: ContentType;
	tags?: tagReturnScheme[];
	note?: string;
}
export interface ContentUpdateModalSchema extends Omit<ContentSchema, 'link'> {}
