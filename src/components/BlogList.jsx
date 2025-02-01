import { Link } from 'react-router-dom';
import { posts } from '../utils/posts';
import { Card, Text, Title, Space, Stack, Divider } from '@mantine/core';
import '@mantine/core/styles.css';
import './BlogList.css';

export default function BlogList() {
  return (
    <div className="blog-container">
      {/* About Me Section */}
      <Card className="about-card" shadow="md" p="lg" radius="md" withBorder>
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
      <div className="posts">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="post-card"
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
          >
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
  );
}