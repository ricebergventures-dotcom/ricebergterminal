'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  external?: boolean;
}

export function ProjectCard({ number, title, description, tags, href, external }: ProjectCardProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link href={href} {...linkProps}>
      <motion.div
        className="p-5 rounded-lg cursor-pointer relative overflow-hidden group"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        whileHover={{ borderColor: 'var(--color-border-2)' }}
        transition={{ duration: 0.2 }}
      >
        {/* Gold bottom border on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: 'var(--color-gold)' }}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-xs" style={{ color: 'var(--color-gold)' }}>{number}</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {external
              ? <ExternalLink size={14} style={{ color: 'var(--color-text-3)' }} />
              : <ArrowRight size={14} style={{ color: 'var(--color-text-3)' }} />
            }
          </motion.span>
        </div>

        <h3 className="font-display text-base mb-2" style={{ color: 'var(--color-text-1)' }}>{title}</h3>
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--color-text-2)' }}>{description}</p>

        <div className="flex gap-1.5 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-3)', border: '1px solid var(--color-border)' }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
}
