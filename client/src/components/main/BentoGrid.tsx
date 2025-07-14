import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Code, FileText, Layers, Palette, Zap } from 'lucide-react';
 
interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}
 
const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = 'small',
}: BentoGridItemProps) => {
 
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 25 },
      }}
      viewport={{ once: true }}
      className={cn(
        'flex overflow-hidden relative flex-col justify-between px-6 pt-6 pb-10 h-full rounded-xl border shadow-md transition-all duration-500 cursor-pointer group border-primary/10 bg-background hover:border-primary/30',
        className,
      )}
    >
      <div className="absolute -right-1/2 top-0 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
 
      <div className="absolute bottom-3 right-1 scale-[6] text-primary/5 transition-all duration-700 group-hover:scale-[6.2] group-hover:text-primary/10">
        {icon}
      </div>
 
      <div className="flex relative z-10 flex-col justify-between h-full">
        <div>
          <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full shadow transition-all duration-500 bg-primary/10 text-primary shadow-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/20">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center mt-4 text-sm text-primary">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="transition-all duration-500 size-4 group-hover:translate-x-2" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r blur-2xl transition-all duration-500 from-primary to-primary/30 group-hover:blur-lg" />
    </motion.div>
  );
};
 
const items = [
  {
    title: 'Developer Experience',
    description:
      'Built with developers in mind, making implementation a breeze.',
    icon: <Code className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'Accessibility',
    description:
      'Built with a11y best practices to ensure your app is usable by everyone.',
    icon: <Layers className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Responsive Design',
    description: 'Create layouts that adapt to any screen size with ease.',
    icon: <Layers className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Customizable',
    description: "Tailor components to match your brand's unique style.",
    icon: <Palette className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and efficiency across all devices.',
    icon: <Zap className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Documentation',
    description:
      'Comprehensive guides and examples to help you get started quickly.',
    icon: <FileText className="size-6" />,
    size: 'large' as const,
  },
];
 
export default function BentoGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };
 
  return (
    <div className="px-4 py-12 mx-auto max-w-6xl">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            size={item.size}
            className={cn(
              item.size === 'large'
                ? 'col-span-4'
                : item.size === 'medium'
                  ? 'col-span-3'
                  : 'col-span-2',
              'h-full',
            )}
          />
        ))}
      </motion.div>
    </div>
  );
}
 