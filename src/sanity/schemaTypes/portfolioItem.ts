import { defineArrayMember, defineField, defineType } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({ name: 'link', type: 'url', title: 'Project URL (optional)' }),
    defineField({ name: 'order', type: 'number', title: 'Display order', initialValue: 99 }),
    defineField({ name: 'leadParagraph', title: 'Lead paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Page body',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'textSection',
          type: 'object',
          title: 'Text section',
          fields: [
            defineField({ name: 'heading', type: 'string', title: 'Heading (H2)' }),
            defineField({ name: 'paragraph', type: 'text', title: 'Paragraph', rows: 5 }),
          ],
          preview: { select: { title: 'heading' } },
        }),
        defineArrayMember({
          name: 'fullImageSection',
          type: 'object',
          title: 'Full-width image',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
          ],
          preview: { select: { media: 'image' } },
        }),
        defineArrayMember({
          name: 'twoImageSection',
          type: 'object',
          title: 'Two images',
          fields: [
            defineField({
              name: 'imageLeft',
              type: 'image',
              title: 'Left image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
            defineField({
              name: 'imageRight',
              type: 'image',
              title: 'Right image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
            }),
          ],
          preview: { select: { media: 'imageLeft' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
