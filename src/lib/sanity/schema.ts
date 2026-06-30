export const newsPostSchema = {
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Super Eagles", value: "super-eagles" },
          { title: "AFCON", value: "afcon" },
          { title: "Membership", value: "membership" },
          { title: "Merchandise", value: "merchandise" },
          { title: "Governance", value: "governance" },
          { title: "Travel", value: "travel" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Full Article",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};