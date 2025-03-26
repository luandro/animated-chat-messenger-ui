import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NavigationButtons from "./NavigationButtons";

interface HeaderProps {
  currentStory: string;
  currentLanguage: string;
  onStoryChange: (story: string) => void;
  onLanguageChange: (lang: string) => void;
  onReset: () => void;
  onAdvance: () => void;
}

const Header = ({
  currentStory,
  currentLanguage,
  onStoryChange,
  onLanguageChange,
  onReset,
  onAdvance,
}: HeaderProps) => {
  const stories = {
    funding: "Funding Opportunity Plugin",
    course: "Course Plugin",
    support: "Product Support Plugin",
    production: "Production Plugin",
    production_DM: "Our Production Plugin",
  };

  return (
    <div className="bg-chat-bubble-received/30 p-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Select value={currentStory} onValueChange={onStoryChange}>
          <SelectTrigger className="w-[200px] bg-zinc-900/80 border border-zinc-800 text-zinc-100 hover:bg-zinc-800/90 transition-colors rounded-lg shadow-lg">
            <SelectValue placeholder="Select story" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border border-zinc-800">
            {Object.entries(stories).map(([key, value]) => (
              <SelectItem
                key={key}
                value={key}
                className="text-zinc-100 hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          onClick={() => onLanguageChange(currentLanguage === "en" ? "pt" : "en")}
          className="text-white hover:text-blue-700/80"
        >
          {currentLanguage === "en" ? "PT" : "EN"}
        </Button>
        <div className="hidden md:flex">
          <NavigationButtons onReset={onReset} onAdvance={onAdvance} />
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-blue-700/80"
            >
              <Info className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Earth Defenders Assistant</DialogTitle>
              <DialogDescription>
                <p className="mt-2">
                  Earth Defenders Assistant is an AI-powered chat interface designed
                  to help environmental activists and organizations.
                </p>
                <p className="mt-2">
                  Visit our{" "}
                  <a
                    href="https://github.com/digidem/earth-defenders-assistant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    GitHub repository
                  </a>{" "}
                  for more information.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="md:hidden">
          <NavigationButtons onReset={onReset} onAdvance={onAdvance} />
        </div>
      </div>
    </div>
  );
};

export default Header;
