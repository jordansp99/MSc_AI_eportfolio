// BlogList.jsx
import { Link } from 'react-router-dom';
import { posts as rawPosts } from '../utils/posts';
import { Card, Title, Image, Text, Group, Anchor } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { useMemo } from 'react';
import './BlogList.css';

export default function BlogList() {
  const posts = useMemo(() => {
    return [...rawPosts].sort((a, b) => {
      const numA = parseInt(a.title.split('.')[0]);
      const numB = parseInt(b.title.split('.')[0]);
      return numA - numB;
    });
  }, []);

  return (
    <div className="dev-portfolio">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Text className="nav-link">about/</Text>
        </div>
        <div className="sidebar-content">
          <Title order={1} className="sidebar-title">
            Jordan Speight
          </Title>
          <Text className="sidebar-subtitle">
            MSc Artificial Intelligence
          </Text>
          <Text className="sidebar-description">
            This e-portfolio showcases my journey and the skills I've acquired during my MSc Artificial Intelligence at the University of Essex.
          </Text>
          <Group spacing="lg" position="left" mt="xl">
            <Anchor href="https://github.com/jordansp99" target="_blank" className="social-link">
              <IconBrandGithub size={28} />
            </Anchor>
            <Anchor href="https://www.linkedin.com/in/jordansp/" target="_blank" className="social-link">
              <IconBrandLinkedin size={28} />
            </Anchor>
          </Group>
        </div>
      </aside>
      <main className="main-content">
        <div className="main-header">
          <div className="active-module-title">
            modules/
          </div>
        </div>
        <div className="projects-grid">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link to={`/post/${post.slug}`} className="project-card-link">
                <Card p="0" radius="md" className="project-card">
                  <div className="project-title-container">
                    <Title order={3} className="project-title">{post.title.toUpperCase()}</Title>
                    <Text className="project-title-outline">{post.title.toUpperCase()}</Text>
                  </div>
                  <Image
                    src={post.image}
                    alt={post.title}
                    height={350}
                    className="project-image"
                  />
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
