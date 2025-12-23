export type Frontmatter = {
  title: string;
  date: string;
  update: string;
  description: string;
  categories: string[];
  iconUrl: string;
  tags: { icon: string; tag: string }[];
};
