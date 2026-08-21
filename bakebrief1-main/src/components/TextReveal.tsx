import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'words' | 'chars';
}

export default function TextReveal({ text, className = '', delay = 0, mode = 'words' }: TextRevealProps) {
  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <span className={`inline-block overflow-hidden align-bottom ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
            <motion.span
              initial={{ y: '100%', opacity: 0, rotateX: -30 }}
              whileInView={{ y: '0%', opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  const chars = text.split('');
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
