import React, { useState } from 'react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

interface Story {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  image: string;
  color: 'orange' | 'green';
}

const stories: Story[] = [
  {
    id: 1,
    name: 'Sathvika Reddy',
    role: 'CSIT · Placed at Microsoft',
    testimonial: 'MLRIT provided me with the perfect blend of academics and practical skills. The faculty support was exceptional.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    color: 'orange',
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'ECE · Placed at Amazon',
    testimonial: 'The placement cell at MLRIT is outstanding. They prepared us thoroughly for interviews and technical rounds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    color: 'green',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'CSE · Placed at Google',
    testimonial: 'MLRIT shaped my career. The industry exposure and hands-on projects made all the difference.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    color: 'orange',
  },
  {
    id: 4,
    name: 'Arjun Patel',
    role: 'IT · Placed at Infosys',
    testimonial: 'The technical training and soft skills development at MLRIT prepared me for the corporate world.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    color: 'green',
  },
  {
    id: 5,
    name: 'Divya Menon',
    role: 'CSE · Placed at TCS',
    testimonial: 'MLRIT gave me confidence and skills. The campus placements were well-organized and professional.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    color: 'orange',
  },
  {
    id: 6,
    name: 'Karthik Reddy',
    role: 'EEE · Placed at Wipro',
    testimonial: 'The faculty at MLRIT are industry experts. Their guidance helped me secure my dream job.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    color: 'green',
  },
  {
    id: 7,
    name: 'Sneha Iyer',
    role: 'CSE · Placed at Accenture',
    testimonial: 'MLRIT provided excellent infrastructure and learning environment. Forever grateful for the opportunities.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    color: 'orange',
  },
  {
    id: 8,
    name: 'Vikram Singh',
    role: 'Mechanical · Placed at L&T',
    testimonial: 'The practical approach to learning at MLRIT made me industry-ready from day one.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    color: 'green',
  },
];

export const SuccessStories: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate stories for seamless loop
  const duplicatedStories = [...stories, ...stories];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600 mb-4">
          Success Stories
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Hear from our alumni who have made their mark in the industry
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div
          className="flex gap-6 py-4"
          style={{
            animation: isPaused ? 'none' : 'scroll-left 25s linear infinite',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedStories.map((story, index) => (
            <div
              key={`${story.id}-${index}`}
              className="flex-shrink-0 w-80"
            >
              <SpotlightCard
                customSize
                spotlightColor={
                  story.color === 'orange'
                    ? 'rgba(232, 93, 31, 0.2)'
                    : 'rgba(24, 69, 59, 0.2)'
                }
                className="h-full"
              >
                <div className="relative h-full p-6 flex flex-col">
                  {/* Image */}
                  <div className="mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {story.name}
                    </h3>
                    <p
                      className={`text-sm font-medium mb-4 ${
                        story.color === 'orange'
                          ? 'text-orange-500'
                          : 'text-green-500'
                      }`}
                    >
                      {story.role}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      "{story.testimonial}"
                    </p>
                  </div>

                  {/* Accent Line */}
                  <div
                    className={`mt-4 h-1 w-16 rounded-full ${
                      story.color === 'orange'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                  />
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
