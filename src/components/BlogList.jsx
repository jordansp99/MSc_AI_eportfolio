// BlogList.jsx
import { Link } from 'react-router-dom';
import { posts as rawPosts } from '../utils/posts';
import { Card, Title, Image, Text, Group, Anchor } from '@mantine/core';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import { useMemo, useState, useEffect, useRef } from 'react';
import './BlogList.css';

export default function BlogList() {
  const [activeModule, setActiveModule] = useState('');
  const mainContentRef = useRef(null);
  const moduleRefs = useRef({});

  const posts = useMemo(() => {
    return [...rawPosts].sort((a, b) => {
      const numA = parseInt(a.title.split('.')[0]);
      const numB = parseInt(b.title.split('.')[0]);
      return numA - numB;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = mainContentRef.current;
      if (!mainContent) return;

      const { top } = mainContent.getBoundingClientRect();

      let currentModule = '';
      for (const post of posts) {
        const moduleEl = moduleRefs.current[post.slug];
        if (moduleEl) {
          const rect = moduleEl.getBoundingClientRect();
          if (rect.top <= top + 150 && rect.bottom >= top) {
            currentModule = post.title;
            break;
          }
        }
      }
      setActiveModule(currentModule);
    };

    const mainContent = mainContentRef.current;
    mainContent.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

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
            I build pixel-perfect, engaging, and accessible digital experiences. This portfolio showcases my journey and the skills I've acquired.
          </Text>
          <Group spacing="lg" position="left" mt="xl">
            <Anchor href="https://github.com/jordansp99" target="_blank" className="social-link">
              <IconBrandGithub size={28} />
            </Anchor>
            <Anchor href="https://www.linkedin.com/in/jordanspeight/" target="_blank" className="social-link">
              <IconBrandLinkedin size={28} />
            </Anchor>
          </Group>
        </div>
      </aside>
      <main className="main-content" ref={mainContentRef}>
        <div className="main-header">
          <Text className="nav-link">
            modules/{activeModule && <span>{activeModule}</span>}
          </Text>
        </div>
        <div className="projects-grid">
          {posts.map((post) => (
            <div key={post.slug} ref={el => moduleRefs.current[post.slug] = el}>
              <Link to={`/post/${post.slug}`} className="project-card-link">
                <Card p="0" radius="md" className="project-card">
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
