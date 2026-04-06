import type { ID, BaseEntity, Category } from './common';

export interface Exercise extends BaseEntity {
  id: ID;
  name: string;
  category: Category;
  isCustom: boolean;
}