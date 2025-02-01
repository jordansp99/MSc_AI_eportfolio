// BlogList.jsx
import { Link } from 'react-router-dom';
import { posts } from '../utils/posts';
import { Card, Text, Title, Space, Stack, Divider, Image } from '@mantine/core';
import '@mantine/core/styles.css';

export default function BlogList() {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <Title order={1} align="center" mb="lg">Jordan Speight's MSc Artificial Intelligence E-portfolio</Title>
      <div className="blog-container" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


        <Title order={1} align="center" mb="lg">Modules</Title>
        <div className="posts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', maxWidth: '800px' }}>
          {posts.map((post) => (
            <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }} key={post.slug}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{ marginBottom: '20px', backgroundColor: 'white', width: '100%' }}
              >
                <Stack>
                  {post.image && (
                    <Image
                    src={post.image}
                    alt={post.title}
                    width="100%"
                    height={150}
                    style={{ objectFit: 'contain', borderRadius: '4px 4px 0 0' }} // Use 'contain'
                    />
                  )}
                  <div style={{ padding: '1rem' }}>
                    <Title order={3} mt="xs">
                      {post.title}
                    </Title>
                   {/* Removed the date */}
                  </div>
                </Stack>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}