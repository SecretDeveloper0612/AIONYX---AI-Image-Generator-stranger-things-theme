import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  { title: "Creating Best Visuals With Just A Prompt", date: "October 11, 2025", author: "KITPRO", img: "https://picsum.photos/400/300?random=60" },
  { title: "Why AI-Generated Images Are The Future", date: "October 12, 2025", author: "KITPRO", img: "https://picsum.photos/400/300?random=61" },
  { title: "Speed Up Your Workflow With AI Images", date: "October 13, 2025", author: "KITPRO", img: "https://picsum.photos/400/300?random=62" },
];

export const Blog: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-bold font-display max-w-md text-stranger-glow">From Our Blog: AI & Horror Innovation</h2>
        <button className="hidden md:flex items-center gap-2 px-6 py-2 rounded-sm border border-stranger-red/30 hover:bg-stranger-red/10 transition-colors text-stranger-red font-bold uppercase text-xs tracking-widest">
          View More <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="rounded-sm overflow-hidden mb-6 relative border border-white/10 group-hover:border-stranger-red/50 transition-colors">
              <div className="absolute inset-0 bg-stranger-red/0 group-hover:bg-stranger-red/20 transition-colors z-10"></div>
              <img src={post.img} alt={post.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 sepia-[0.5] group-hover:sepia-0" />
            </div>
            <div className="flex items-center gap-2 text-xs text-stranger-red mb-2 uppercase tracking-widest font-bold">
              <span>{post.date}</span>
              <span>|</span>
              <span>By {post.author}</span>
            </div>
            <h3 className="text-xl font-bold group-hover:text-stranger-red transition-colors leading-snug font-display">{post.title}</h3>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};