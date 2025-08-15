import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { posts } from '../utils/posts';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="blog-post-container">
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back
        </button>
      </div>
      <div className="blog-post-layout">
        <div className="blog-post-title-container">
          <h1>{post.title}</h1>
        </div>
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const [copyText, setCopyText] = useState('Copy');

              const handleCopy = () => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                setCopyText('Copied!');
                setTimeout(() => {
                  setCopyText('Copy');
                }, 2000);
              };

              return !inline && match ? (
                <div className="code-block">
                  <div className="code-header">
                    <span>{match[1]}</span>
                    <button onClick={handleCopy} className="copy-button">{copyText}</button>
                  </div>
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                    customStyle={{
                      margin: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img: ({ node, ...props }) => {
              return (
                <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
