import frontMatter from 'front-matter';

const postModules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const posts = Object.entries(postModules).map(([path, content]) => {
  const slug = path.split('/').pop().replace('.md', '');
  const { attributes, body } = frontMatter(content);
  return {
    slug,
    ...attributes,
    content: body,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));