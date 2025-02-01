import { Link } from 'react-router-dom';
import { posts } from '../utils/posts';
import { Card, Text, Title, Space, Stack, Divider, Image } from '@mantine/core'; // Import Image
import '@mantine/core/styles.css';

export default function BlogList() {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <Title order={1} align="center" mb="lg">MSc E-portfolio</Title>
      <div className="blog-container" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* About Me Section */}
        <Card className="about-card" shadow="md" p="lg" radius="md" withBorder style={{ width: '80%', maxWidth: '800px', marginTop: '20px' }}>
          <Stack align="center" spacing="sm">
            <Title order={2}>About Me</Title>
            <Divider my="xs" />
            <Text size="sm" color="dimmed">
              A short and engaging description about yourself. You can add
              your interests, background, or anything you want to share with
              your readers. Keep it concise and inviting!
            </Text>
          </Stack>
        </Card>

        <Space h="xl" />

        <Title order={1} align="center" mb="lg">Blog Posts</Title>
        <div className="posts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', maxWidth: '800px' }}>
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="post-card"
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ marginBottom: '20px', backgroundColor: 'white', width: '100%' }}
            >
              {/* Display Image if available */}
              {post.image && ( // Check if image URL exists
                <Image
                  src={post.image} // Use post.image as the source
                  alt={post.title} // Use post title as alt text
                  width="100%" // Or any other width you want
                  height="auto" // Maintain aspect ratio
                  mb="md" // Add some margin bottom
                  radius="md" // Optional: Round the image corners
                />
              )}

              <Title order={3} className="post-title">
                <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </Title>
              <Text className="post-date" size="sm" color="dimmed" mt="xs">
                {new Date(post.date).toLocaleDateString()}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


// posts.js (No changes needed here, but included for completeness)
import frontMatter from 'front-matter';

const postModules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});