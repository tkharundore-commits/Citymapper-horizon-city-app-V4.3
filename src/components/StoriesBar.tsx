import { useState } from "react";
import { Plus } from "lucide-react";
import { StoryViewer } from "./StoryViewer";

export interface FlockMember {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  hasStory: boolean;
  stories: Story[];
}

export interface Story {
  id: number;
  image: string;
  caption: string;
  location: string;
  timestamp: string;
}

const flockMembers: FlockMember[] = [
  {
    id: 1,
    name: "Sophie",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
    hasStory: true,
    stories: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=700&fit=crop",
        caption: "Le café Kitsuné est génial ! ☕",
        location: "Café Kitsuné, Paris",
        timestamp: "Il y a 2h",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1471874708433-acd480424946?w=400&h=700&fit=crop",
        caption: "Balade dans le Marais 🌸",
        location: "Le Marais, Paris",
        timestamp: "Il y a 3h",
      },
    ],
  },
  {
    id: 2,
    name: "Thomas",
    avatar: "https://i.pravatar.cc/150?img=2",
    isOnline: true,
    hasStory: true,
    stories: [
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=700&fit=crop",
        caption: "La Galerie Vivienne est magnifique 📸",
        location: "Galerie Vivienne, Paris",
        timestamp: "Il y a 1h",
      },
    ],
  },
  {
    id: 3,
    name: "Lucas",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOnline: false,
    hasStory: true,
    stories: [
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop",
        caption: "Trouvé une super librairie ! 📚",
        location: "Shakespeare & Co, Paris",
        timestamp: "Il y a 5h",
      },
    ],
  },
  {
    id: 4,
    name: "Marie",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOnline: true,
    hasStory: true,
    stories: [
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=700&fit=crop",
        caption: "Le falafel est à tomber ! 🥙",
        location: "L'As du Fallafel, Paris",
        timestamp: "Il y a 30min",
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=700&fit=crop",
        caption: "Gourmandise du jour 😍",
        location: "Chez Janou, Paris",
        timestamp: "Il y a 1h",
      },
    ],
  },
  {
    id: 5,
    name: "Alex",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: true,
    hasStory: false,
    stories: [],
  },
  {
    id: 6,
    name: "Léa",
    avatar: "https://i.pravatar.cc/150?img=9",
    isOnline: true,
    hasStory: true,
    stories: [
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&h=700&fit=crop",
        caption: "Vue incroyable depuis Montmartre 🗼",
        location: "Montmartre, Paris",
        timestamp: "Il y a 4h",
      },
    ],
  },
  {
    id: 7,
    name: "Hugo",
    avatar: "https://i.pravatar.cc/150?img=7",
    isOnline: false,
    hasStory: true,
    stories: [
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=700&fit=crop",
        caption: "Coucher de soleil sur la Seine 🌅",
        location: "Pont des Arts, Paris",
        timestamp: "Il y a 6h",
      },
    ],
  },
];

export function StoriesBar() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [viewedStories, setViewedStories] = useState<Set<number>>(new Set());

  const membersWithStories = flockMembers.filter((m) => m.hasStory);

  const handleStoryClick = (member: FlockMember) => {
    if (!member.hasStory) return;
    const idx = membersWithStories.findIndex((m) => m.id === member.id);
    setSelectedMemberIndex(idx >= 0 ? idx : 0);
    setViewerOpen(true);
  };

  const handleStoryViewed = (memberId: number) => {
    setViewedStories((prev) => new Set(prev).add(memberId));
  };

  const handleNextMember = () => {
    if (selectedMemberIndex < membersWithStories.length - 1) {
      setSelectedMemberIndex((prev) => prev + 1);
    } else {
      setViewerOpen(false);
    }
  };

  const handlePrevMember = () => {
    if (selectedMemberIndex > 0) {
      setSelectedMemberIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <button className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-accent hover:bg-accent/10 transition-all">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </button>
            <span className="text-[11px] text-muted-foreground font-medium">Vous</span>
          </div>

          {/* Flock Members */}
          {flockMembers.map((member) => {
            const isViewed = viewedStories.has(member.id);
            return (
              <button
                key={member.id}
                onClick={() => handleStoryClick(member)}
                className="flex flex-col items-center gap-1 flex-shrink-0 group"
                disabled={!member.hasStory}
              >
                <div
                  className={`relative p-[3px] rounded-full ${
                    member.hasStory
                      ? isViewed
                        ? "bg-muted-foreground/30"
                        : "bg-gradient-to-br from-accent via-primary to-accent"
                      : "bg-transparent"
                  }`}
                >
                  <div className="w-[58px] h-[58px] rounded-full border-[3px] border-card overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`w-full h-full object-cover ${
                        member.hasStory
                          ? "group-hover:scale-110 transition-transform duration-200"
                          : "opacity-60"
                      }`}
                    />
                  </div>
                  {member.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[hsl(var(--success))] border-[3px] border-card rounded-full" />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium truncate max-w-[64px] ${
                    member.hasStory && !isViewed ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {member.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {viewerOpen && membersWithStories.length > 0 && (
        <StoryViewer
          member={membersWithStories[selectedMemberIndex]}
          onClose={() => setViewerOpen(false)}
          onNextMember={handleNextMember}
          onPrevMember={handlePrevMember}
          onStoryViewed={handleStoryViewed}
          hasPrev={selectedMemberIndex > 0}
          hasNext={selectedMemberIndex < membersWithStories.length - 1}
        />
      )}
    </>
  );
}
