import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  ClipboardList,
  MessageSquare,
  Clock,
  PieChart,
  BrainCog,
} from 'lucide-react';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { type: 'spring', damping: 25 } }}
      viewport={{ once: true }}
      className={cn(
        'flex relative flex-col justify-between px-6 pt-6 pb-10 h-full rounded-xl border shadow-md transition-all duration-500 cursor-pointer group border-primary/10 bg-background hover:border-primary/30 overflow-hidden',
        className,
      )}
    >
      <div className="absolute -right-1/2 top-0 z-0 size-full bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="absolute bottom-3 right-1 scale-[6] text-primary/5 transition-all duration-700 group-hover:scale-[6.2] group-hover:text-primary/10">
        {icon}
      </div>

      <div className="flex relative z-10 flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full shadow bg-primary/10 text-primary shadow-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/20">
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

const items:{
  title:string,
  description:string,
  icon:React.ReactNode,
  size:"small"|'medium'|"large"
}[] = [
  {
    title: 'Team Collaboration',
    description: 'Seamless team workspaces with chat, tagging, and task assignment.',
    icon: <Users className="size-6" />,
    size: 'large',
  },
  {
    title: 'Task Management',
    description: 'Organize, prioritize, and track your tasks efficiently.',
    icon: <ClipboardList className="size-6" />,
    size: 'medium',
  },
  {
    title: 'Real-Time Chat',
    description: 'Communicate instantly with built-in WebSocket messaging.',
    icon: <MessageSquare className="size-6" />,
    size: 'small',
  },
  {
    title: 'Time Tracking',
    description: 'Monitor work hours and productivity with built-in timers.',
    icon: <Clock className="size-6" />,
    size: 'small',
  },
  {
    title: 'Analytics & Reports',
    description: 'Gain insights with visual dashboards and progress metrics.',
    icon: <PieChart className="size-6" />,
    size: 'medium',
  },
  {
    title: 'AI Recommendations',
    description: 'Smart task suggestions and summaries powered by AI.',
    icon: <BrainCog className="size-6" />,
    size: 'large',
  },
];

export default function BentoGrid(

) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const getSizeClass = (size: "small"|"medium"|"large") => {
    switch (size) {
      case 'large':
        return 'col-span-12 sm:col-span-6 md:col-span-6';
      case 'medium':
        return 'col-span-12 sm:col-span-6 md:col-span-3';
      case 'small':
        return 'col-span-12 sm:col-span-6 md:col-span-2';
      default:
        return 'col-span-12';
    }
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-6xl">
      <motion.div
        className="grid grid-cols-12 gap-4"
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
            className={cn(getSizeClass(item.size), 'h-full')}
          />
        ))}
      </motion.div>
    </div>
  );
}
