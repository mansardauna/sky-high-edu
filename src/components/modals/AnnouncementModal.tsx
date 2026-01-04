import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDemoData, Announcement } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Megaphone } from "lucide-react";

interface AnnouncementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement?: Announcement | null;
  mode: "add" | "edit";
}

export const AnnouncementModal = ({ open, onOpenChange, announcement, mode }: AnnouncementModalProps) => {
  const { addAnnouncement, updateAnnouncement } = useDemoData();
  const { t } = useLanguage();
  
  const [title, setTitle] = useState(announcement?.title || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [category, setCategory] = useState<Announcement["category"]>(announcement?.category || "notice");
  const [targetAudience, setTargetAudience] = useState<Announcement["targetAudience"]>(announcement?.targetAudience || "all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (mode === "add") {
      addAnnouncement({
        title,
        content,
        category,
        targetAudience,
        createdBy: "Admin",
        isActive: true
      });
      toast.success("Announcement published successfully!");
    } else if (announcement) {
      updateAnnouncement(announcement.id, {
        title,
        content,
        category,
        targetAudience
      });
      toast.success("Announcement updated successfully!");
    }

    onOpenChange(false);
    setTitle("");
    setContent("");
    setCategory("notice");
    setTargetAudience("all");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            {mode === "add" ? t("push_announcement") : "Edit Announcement"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" 
              ? "Create a new announcement for students and teachers" 
              : "Update the announcement details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("announcement_title")} *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">{t("announcement_content")} *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your announcement content here..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(value: Announcement["category"]) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notice">{t("notice")}</SelectItem>
                  <SelectItem value="academic">{t("academic")}</SelectItem>
                  <SelectItem value="events">{t("events")}</SelectItem>
                  <SelectItem value="admissions">{t("admissions_cat")}</SelectItem>
                  <SelectItem value="urgent">{t("urgent")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("target_audience")}</Label>
              <Select value={targetAudience} onValueChange={(value: Announcement["targetAudience"]) => setTargetAudience(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all_users")}</SelectItem>
                  <SelectItem value="students">{t("students_only")}</SelectItem>
                  <SelectItem value="teachers">{t("teachers_only")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              {t("cancel")}
            </Button>
            <Button type="submit" className="flex-1">
              {mode === "add" ? t("push_announcement") : t("save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
