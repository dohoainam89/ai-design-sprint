import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { portfolioItem } from './portfolioItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, portfolioItem],
}
