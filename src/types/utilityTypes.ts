import { CONTENT_TYPES } from '@/assets/constants/data';

export type variantTypes = 'error' | 'success' | 'warning' | 'default';
export type statusObj = { msg: string; variant: variantTypes };

export type ContentType = (typeof CONTENT_TYPES)[number];
