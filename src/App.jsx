import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}