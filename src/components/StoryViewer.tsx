import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Clock, Heart, Send } from "lucide-react";
import { FlockMember } from "./StoriesBar";

interface StoryViewerProps {
  member: FlockMember;
  onClose: () => void;
  onNextMember: () => void;
  onPrevMember: () => void;
  onStoryViewed: (memberId: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const STORY_DURATION = 5000;

export function StoryViewer({
  member,
  onClose,
  onNextMember,
  onPrevMember,
  onStoryViewed,
  hasPrev,
  hasNext,
}: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const story = member.stories[currentStoryIndex];

  // Reset on member change
  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgress(0);
    onStoryViewed(member.id);
  }, [member.id, onStoryViewed]);

  // Progress timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story or next member
          if (currentStoryIndex < member.stories.length - 1) {
            setCurrentStoryIndex((i) => i + 1);
            return 0;
          } else {
            onNextMember();
            return 0;
          }
        }
        return prev + 100 / (STORY_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, currentStoryIndex, member.stories.length, onNextMember]);

  // Reset progress on story change
  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex]);

  const goNext = useCallback(() => {
    if (currentStoryIndex < member.stories.length - 1) {
      setCurrentStoryIndex((i) => i + 1);
    } else {
      onNextMember();
    }
  }, [currentStoryIndex, member.stories.length, onNextMember]);

  const goPrev = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((i) => i - 1);
    } else {
      onPrevMember();
    }
  }, [currentStoryIndex, onPrevMember]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      {/* Navigation arrows */}
      {hasPrev && (
        <button
          onClick={onPrevMember}
          className="absolute left-4 z-10 p-2 rounded-full bg-card/20 hover:bg-card/40 transition-colors text-primary-foreground"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNextMember}
          className="absolute right-4 z-10 p-2 rounded-full bg-card/20 hover:bg-card/40 transition-colors text-primary-foreground"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Story Container */}
      <div
        className="relative w-full max-w-[420px] h-[85vh] max-h-[750px] rounded-2xl overflow-hidden bg-[hsl(var(--dark-bg))] shadow-2xl"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Image */}
        <img
          src={story.image}
          alt={story.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {member.stories.map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-[3px] rounded-full bg-primary-foreground/30 overflow-hidden"
            >
              <div
                className="h-full bg-primary-foreground rounded-full transition-all duration-75 ease-linear"
                style={{
                  width:
                    idx < currentStoryIndex
                      ? "100%"
                      : idx === currentStoryIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-foreground">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold text-sm font-['Outfit']">
                {member.name}
              </p>
              <p className="text-primary-foreground/70 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {story.timestamp}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Tap Zones */}
        <div className="absolute inset-0 flex z-[5]">
          <div className="w-1/3 h-full cursor-pointer" onClick={goPrev} />
          <div className="w-1/3 h-full" />
          <div className="w-1/3 h-full cursor-pointer" onClick={goNext} />
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          {/* Location */}
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              {story.location}
            </span>
          </div>

          {/* Caption */}
          <p className="text-primary-foreground text-base font-medium mb-4">
            {story.caption}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Envoyer un message..."
              className="flex-1 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="p-2.5 rounded-full hover:bg-primary-foreground/15 transition-colors">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </button>
            <button className="p-2.5 rounded-full hover:bg-primary-foreground/15 transition-colors">
              <Send className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
