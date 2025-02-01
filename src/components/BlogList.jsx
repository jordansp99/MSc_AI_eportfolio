// BlogList.jsx
import { Link } from 'react-router-dom';
import { posts as rawPosts } from '../utils/posts'; // Renamed import to avoid confusion
import { Card, Text, Title, Space, Stack, Divider, Image } from '@mantine/core';
import '@mantine/core/styles.css';
import { useState, useMemo } from 'react'; // Import useMemo

export default function BlogList() {
  const [hoveredSlug, setHoveredSlug] = useState(null);

  // Add random "isShiny" property to each post and sort by title number
  const posts = useMemo(() => {
    const postsWithShiny = rawPosts.map(post => ({
      ...post,
      isShiny: Math.random() < 0.1, // 10% chance of being shiny, adjust as needed
    }));
    const sortedPosts = [...postsWithShiny].sort((a, b) => {
      const numA = parseInt(a.title.split('.')[0]);
      const numB = parseInt(b.title.split('.')[0]);
      return numA - numB;
    });
    return sortedPosts;
  }, [rawPosts]);

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #eceff1, #f5f5f5)', // Soft light gray/blue gradient background
      backgroundColor: '#f5f5f5' // Fallback
    }}>
      <Title
        order={1}
        align="center"
        mb="lg"
        size="h1"
        style={{
          color: '#424242', // Slightly lighter dark gray for main title
          fontSize: '4rem',
        }}
      >
        Jordan Speight's MSc Artificial Intelligence E-portfolio
      </Title>
      <div className="blog-container" style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Title order={2} align="center" mb="lg" style={{ color: '#26A69A' }}>{/* Teal color for Modules title */}
          Modules
        </Title>
        <div className="posts" style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px', // Increased gap for slightly larger cards
          width: '90%',
          maxWidth: '1500px', // Increased max width to accommodate larger cards
        }}>
          {posts.map((post) => (
            <Link
              to={`/post/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: 'calc(370px + 30px)' }} // Adjusted Link width
              key={post.slug}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{
                  marginBottom: '0px',
                  backgroundColor: '#ffffff', // Pure white for cards
                  width: '370px',      // Slightly increased card width
                  height: '320px',     // Slightly increased card height
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  transform: hoveredSlug === post.slug ? 'scale(1.03)' : 'scale(1)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  ...(post.isShiny && {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%)', // Slightly brighter shine
                      pointerEvents: 'none',
                    },
                  }),
                }}
              >
                <Stack style={{height: '100%'}}>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width="100%"
                      height="auto"
                      style={{
                        objectFit: 'cover',
                        height: '220px',    // Increased image area height within card to maintain ratio
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                  )}
                  <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Title order={3} mt="xs" style={{textAlign: 'center', fontSize: '1.2rem', color: '#37474F'}}> {/* Darker gray/blue for card titles */}
                      {post.title}
                    </Title>
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