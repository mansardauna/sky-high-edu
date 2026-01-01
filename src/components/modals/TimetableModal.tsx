import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDemoData, TimetableEntry } from "@/contexts/DemoDataContext";
import { toast } from "sonner";

interface TimetableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: TimetableEntry | null;
  mode: "add" | "edit";
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

export const TimetableModal = ({ open, onOpenChange, entry, mode }: TimetableModalProps) => {
  const { subjects, teachers, classes, addTimetableEntry, updateTimetableEntry } = useDemoData();
  
  const [formData, setFormData] = useState({
    day: entry?.day || "",
    time: entry?.time || "",
    subject: entry?.subject || "",
    teacher: entry?.teacher || "",
    class: entry?.class || "",
    room: entry?.room || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.day || !formData.time || !formData.subject || !formData.teacher || !formData.class || !formData.room) {
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "add") {
      addTimetableEntry(formData);
      toast.success("Timetable entry added!");
    } else if (entry) {
      updateTimetableEntry(entry.id, formData);
      toast.success("Timetable entry updated!");
    }

    setFormData({ day: "", time: "", subject: "", teacher: "", class: "", room: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Timetable Entry" : "Edit Timetable Entry"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Schedule a new class session" : "Update the class schedule"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Day</Label>
              <Select value={formData.day} onValueChange={(v) => setFormData(prev => ({ ...prev, day: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select value={formData.time} onValueChange={(v) => setFormData(prev => ({ ...prev, time: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={formData.subject} onValueChange={(v) => setFormData(prev => ({ ...prev, subject: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Teacher</Label>
            <Select value={formData.teacher} onValueChange={(v) => setFormData(prev => ({ ...prev, teacher: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.filter(t => t.status === "active").map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>{teacher.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={formData.class} onValueChange={(v) => setFormData(prev => ({ ...prev, class: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Room</Label>
              <Input
                placeholder="e.g., Room 101"
                value={formData.room}
                onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {mode === "add" ? "Add Entry" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
