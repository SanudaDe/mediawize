'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

const CATEGORIES = [
  'All',
  'Podcast Tips',
  'YouTube Growth',
  'Content Creation',
  'Studio Behind The Scenes',
  'Creator Insights',
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          CREATOR INSIGHTS & RESOURCES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          WizeTV Blog & Production Guides
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Actionable strategies on podcast growth, studio acoustics, YouTube retention, and vertical video scaling from Sri Lanka’s leading media studio.
        </p>
      </section>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center justify-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-brand-red text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="studio-card rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-black text-slate-900 mb-3 leading-snug hover:text-brand-red transition-colors">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-7 pt-0 border-t border-slate-100">
              <Link
                href={`/contact?inquiry=${encodeURIComponent(post.title)}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red hover:text-brand-red-hover"
              >
                <span>Read Guide & Discuss With Producer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
