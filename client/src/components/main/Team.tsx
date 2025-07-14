'use client';
 
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
 
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socialLinks?: { platform: 'github' | 'twitter' | 'linkedin'; url: string }[];
}
 
interface TeamProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  className?: string;
}
 
// Default team members data
const defaultMembers: TeamMember[] = [
  {
    name: 'Robert Brown',
    role: 'CEO & Co-Founder',
    imageUrl:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Leslie Livingston',
    role: 'CTO & Co-Founder',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Joseph McFall',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Helene Engels',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'github', url: 'https://github.com' },
    ],
  },
  {
    name: 'Thom Belly',
    role: 'UI/UX Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Bonnie Green',
    role: 'Product Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Roberta Casas',
    role: 'Content Strategist',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Jesse Leos',
    role: 'Back-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
];
 
export default function Team({
  title = 'Our people make us great',
  subtitle = "You'll interact with talented professionals, will be challenged to solve difficult problems and think in new and creative ways.",
  members = defaultMembers,
  className,
}: TeamProps) {
  return (
    <section
      className={cn(
        'overflow-hidden relative py-16 w-full md:py-24',
        className,
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-primary/5" />
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full blur-3xl bg-primary/10" />
      </div>
 
      <div className="container px-4 mx-auto md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 dark:from-foreground/70 dark:via-foreground dark:to-foreground/70 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground md:text-lg">{subtitle}</p>
        </motion.div>
 
        {/* Team members grid */}
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
 
function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * (index % 4) }}
      viewport={{ once: true }}
      className="overflow-hidden relative rounded-xl group"
    >
      {/* Image container */}
      <div className="overflow-hidden relative rounded-xl aspect-square bg-muted">
        <div className="absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 from-background/80 group-hover:opacity-100" />
 
        <img
          src={member.imageUrl}
          alt={member.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
 
        {/* Social links that appear on hover */}
        {member.socialLinks && (
          <div className="flex absolute right-0 left-0 bottom-4 z-20 gap-3 justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {member.socialLinks.map((link) => (
              <NavLink
                key={link.platform}
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-9 h-9 rounded-full backdrop-blur-sm transition-all bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                {link.platform === 'github' && (
                  <GithubIcon className="w-5 h-5" />
                )}
                {link.platform === 'twitter' && (
                  <TwitterIcon className="w-5 h-5" />
                )}
                {link.platform === 'linkedin' && (
                  <LinkedinIcon className="w-5 h-5" />
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
 
      {/* Name and role */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-primary">{member.role}</p>
      </div>
    </motion.div>
  );
}
 