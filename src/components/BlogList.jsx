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
      background: 'linear-gradient(to bottom, #e0f2f7, #ffffff)', /* Light blue to white gradient */
      minHeight: '100vh',
      padding: '20px 0',
    }}>
      <Title
        order={1}
        align="center"
        mb="xl" /* Increased margin-bottom */
        size="h1"
        style={{
          color: '#263238',
          fontSize: '3.8rem', /* Slightly larger for impact */
          fontWeight: 700,
          textShadow: '3px 3px 6px rgba(0,0,0,0.15)', /* More pronounced shadow */
          letterSpacing: '-0.05em', /* Tighter letter spacing */
        }}
      >
        Jordan Speight's MSc Artificial Intelligence E-portfolio
      </Title>
      <div className="blog-container" style={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
      }}>

        <Title order={2} align="center" mb="lg" style={{
          color: '#37474F', /* Consistent with card titles, a dark blue-gray */
          fontSize: '2.2rem', /* Slightly smaller for better hierarchy */
          marginTop: '40px',
          fontWeight: 600, /* Slightly less bold than main title */
        }}>
          Modules
        </Title>
        <div className="posts" style={{
          display: 'grid', /* Use CSS Grid for better control */
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', /* Responsive grid columns */
          justifyContent: 'center',
          gap: '25px', /* Slightly reduced gap */
          width: '90%',
          maxWidth: '1500px',
        }}>
          {posts.map((post) => (
            <Link
              to={`/post/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center' }} /* Center link content */
              key={post.slug}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <Card
                shadow="md" /* Stronger shadow */
                p="0" /* Remove padding from card directly, add to inner div */
                radius="lg" /* More rounded corners */
                withBorder
                style={{
                  backgroundColor: '#ffffff',
                  width: '100%', /* Card takes full width of grid item */
                  maxWidth: '350px', /* Max width for individual cards */
                  height: '300px', /* Fixed height for consistency */
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  transform: hoveredSlug === post.slug ? 'scale(1.05)' : 'scale(1)', /* Stronger hover effect */
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: '1px solid #e0e0e0', /* Subtle border */
                  ...(post.isShiny && {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)', /* Brighter, more spread out shine */
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
                      style={{
                        objectFit: 'cover',
                        height: '180px', /* Adjusted image height */
                        width: '100%',
                        borderRadius: 'lg lg 0 0', /* Apply border-radius to top corners */
                      }}
                    />
                  )}
                  <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Title order={3} mt="xs" style={{textAlign: 'center', fontSize: '1.3rem', color: '#37474F'}}>
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
