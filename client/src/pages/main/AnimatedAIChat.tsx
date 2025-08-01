import { useEffect, useRef, useCallback, useTransition } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ImageIcon,
  Figma,
  MonitorIcon,
  Paperclip,
  SendIcon,
  XIcon,
  LoaderIcon,
  Sparkles,
  Command,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
 
interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}
 
function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
 
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
 
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
 
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );
 
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );
 
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);
 
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);
 
  return { textareaRef, adjustHeight };
}
 
interface CommandSuggestion {
  icon: React.ReactNode;
  label: string;
  description: string;
  prefix: string;
}
 
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}
 
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
 
    return (
      <div className={cn('relative', containerClassName)}>
        <textarea
          className={cn(
            'flex px-3 py-2 w-full text-sm rounded-md border min-h-[80px] border-input bg-background',
            'transition-all duration-200 ease-in-out',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            showRing
              ? 'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
              : '',
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
 
        {showRing && isFocused && (
          <motion.span
            className="absolute inset-0 rounded-md ring-2 ring-offset-0 pointer-events-none ring-primary/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
 
        {props.onChange && (
          <div
            className="absolute right-2 bottom-2 w-2 h-2 rounded-full opacity-0 bg-primary"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
 
export default function AnimatedAIChat() {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [, setRecentCommand] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const [inputFocused, setInputFocused] = useState(false);
  const commandPaletteRef = useRef<HTMLDivElement>(null);
 
  const commandSuggestions: CommandSuggestion[] = [
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: 'Clone UI',
      description: 'Generate a UI from a screenshot',
      prefix: '/clone',
    },
    {
      icon: <Figma className="w-4 h-4" />,
      label: 'Import Figma',
      description: 'Import a design from Figma',
      prefix: '/figma',
    },
    {
      icon: <MonitorIcon className="w-4 h-4" />,
      label: 'Create Page',
      description: 'Generate a new web page',
      prefix: '/page',
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Improve',
      description: 'Improve existing UI design',
      prefix: '/improve',
    },
  ];
 
  useEffect(() => {
    if (value.startsWith('/') && !value.includes(' ')) {
      setShowCommandPalette(true);
 
      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value),
      );
 
      if (matchingSuggestionIndex >= 0) {
        setActiveSuggestion(matchingSuggestionIndex);
      } else {
        setActiveSuggestion(-1);
      }
    } else {
      setShowCommandPalette(false);
    }
  }, [value]);
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
 
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const commandButton = document.querySelector('[data-command-button]');
 
      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !commandButton?.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showCommandPalette) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < commandSuggestions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : commandSuggestions.length - 1,
        );
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          const selectedCommand = commandSuggestions[activeSuggestion];
          setValue(selectedCommand.prefix + ' ');
          setShowCommandPalette(false);
 
          setRecentCommand(selectedCommand.label);
          setTimeout(() => setRecentCommand(null), 3500);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        handleSendMessage();
      }
    }
  };
 
  const handleSendMessage = () => {
    if (value.trim()) {
      startTransition(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setValue('');
          adjustHeight(true);
        }, 3000);
      });
    }
  };
 
  const handleAttachFile = () => {
    const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, mockFileName]);
  };
 
  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
 
  const selectCommandSuggestion = (index: number) => {
    const selectedCommand = commandSuggestions[index];
    setValue(selectedCommand.prefix + ' ');
    setShowCommandPalette(false);
 
    setRecentCommand(selectedCommand.label);
    setTimeout(() => setRecentCommand(null), 2000);
  };
 
  return (
    <div className="flex overflow-x-hidden w-full">
      <div className="flex overflow-hidden relative flex-col justify-center items-center p-6 w-full min-h-screen bg-transparent text-foreground">
        <div className="overflow-hidden absolute inset-0 w-full h-full">
          <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-primary/10 mix-blend-normal blur-[128px] filter" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary/10 mix-blend-normal blur-[128px] filter delay-700" />
          <div className="absolute right-1/3 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 mix-blend-normal blur-[96px] filter delay-1000" />
        </div>
        <div className="relative mx-auto w-full max-w-2xl">
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-3 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <h1 className="pb-1 text-3xl font-medium tracking-tight">
                  How can I help today?
                </h1>
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent to-transparent via-primary/50"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Type a command or ask a question
              </motion.p>
            </div>
 
            <motion.div
              className="relative rounded-2xl border shadow-2xl backdrop-blur-2xl border-border bg-card/80"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <AnimatePresence>
                {showCommandPalette && (
                  <motion.div
                    ref={commandPaletteRef}
                    className="overflow-hidden absolute right-4 left-4 bottom-full z-50 mb-2 rounded-lg border shadow-lg backdrop-blur-xl border-border bg-background/90"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="py-1 bg-background">
                      {commandSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={suggestion.prefix}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors',
                            activeSuggestion === index
                              ? 'bg-primary/20 text-foreground'
                              : 'text-muted-foreground hover:bg-primary/10',
                          )}
                          onClick={() => selectCommandSuggestion(index)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <div className="flex justify-center items-center w-5 h-5 text-primary">
                            {suggestion.icon}
                          </div>
                          <div className="font-medium">{suggestion.label}</div>
                          <div className="ml-1 text-xs text-muted-foreground">
                            {suggestion.prefix}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
 
              <div className="p-4">
                <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    adjustHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Ask mvp.ai a question..."
                  containerClassName="w-full"
                  className={cn(
                    'px-4 py-3 w-full',
                    'resize-none',
                    'bg-transparent',
                    'border-none',
                    'text-sm text-foreground',
                    'focus:outline-none',
                    'placeholder:text-muted-foreground',
                    'min-h-[60px]',
                  )}
                  style={{
                    overflow: 'hidden',
                  }}
                  showRing={false}
                />
              </div>
 
              <AnimatePresence>
                {attachments.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-2 px-4 pb-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {attachments.map((file, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5 text-xs text-muted-foreground"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <span>{file}</span>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
 
              <div className="flex gap-4 justify-between items-center p-4 border-t border-border">
                <div className="flex gap-3 items-center">
                  <motion.button
                    type="button"
                    onClick={handleAttachFile}
                    whileTap={{ scale: 0.94 }}
                    className="relative p-2 rounded-lg transition-colors group text-muted-foreground hover:text-foreground"
                  >
                    <Paperclip className="w-4 h-4" />
                    <motion.span
                      className="absolute inset-0 rounded-lg opacity-0 transition-opacity bg-primary/10 group-hover:opacity-100"
                      layoutId="button-highlight"
                    />
                  </motion.button>
                  <motion.button
                    type="button"
                    data-command-button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCommandPalette((prev) => !prev);
                    }}
                    whileTap={{ scale: 0.94 }}
                    className={cn(
                      'group relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground',
                      showCommandPalette && 'bg-primary/20 text-foreground',
                    )}
                  >
                    <Command className="w-4 h-4" />
                    <motion.span
                      className="absolute inset-0 rounded-lg opacity-0 transition-opacity bg-primary/10 group-hover:opacity-100"
                      layoutId="button-highlight"
                    />
                  </motion.button>
                </div>
 
                <motion.button
                  type="button"
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isTyping || !value.trim()}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    'flex items-center gap-2',
                    value.trim()
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10'
                      : 'bg-muted/50 text-muted-foreground',
                  )}
                >
                  {isTyping ? (
                    <LoaderIcon className="h-4 w-4 animate-[spin_2s_linear_infinite]" />
                  ) : (
                    <SendIcon className="w-4 h-4" />
                  )}
                  <span>Send</span>
                </motion.button>
              </div>
            </motion.div>
 
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {commandSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.prefix}
                  onClick={() => selectCommandSuggestion(index)}
                  className="flex relative gap-2 items-center px-3 py-2 text-sm rounded-lg transition-all group bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {suggestion.icon}
                  <span>{suggestion.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-border/50"
                    initial={false}
                    animate={{
                      opacity: [0, 1],
                      scale: [0.98, 1],
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
 
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="fixed bottom-8 px-4 py-2 mx-auto rounded-full border shadow-lg backdrop-blur-2xl transform -translate-x-1/2 border-border bg-background/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex gap-3 items-center">
                <div className="flex justify-center items-center w-8 h-7 text-center rounded-full bg-primary/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <span>Thinking</span>
                  <TypingDots />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {inputFocused && (
          <motion.div
            className="pointer-events-none fixed z-0 h-[50rem] w-[50rem] rounded-full bg-gradient-to-r from-primary via-primary/80 to-secondary opacity-[0.02] blur-[96px]"
            animate={{
              x: mousePosition.x - 400,
              y: mousePosition.y - 400,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 150,
              mass: 0.5,
            }}
          />
        )}
      </div>
    </div>
  );
}
 
function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="mx-0.5 h-1.5 w-1.5 rounded-full bg-primary"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.85, 1.1, 0.85],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: 'easeInOut',
          }}
          style={{
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  );
}
 
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}
 
const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;
 
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = rippleKeyframes;
  document.head.appendChild(style);
}
 