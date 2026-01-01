import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useDemoData, Teacher } from "@/contexts/DemoDataContext";
import { toast } from "sonner";

interface AssignSubjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
}

export const AssignSubjectModal = ({ open, onOpenChange, teacher }: AssignSubjectModalProps) => {
  const { subjects, classes, assignSubjectToTeacher } = useDemoData();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleClassToggle = (className: string) => {
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className) 
        : [...prev, className]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher || !selectedSubject || selectedClasses.length === 0) {
      toast.error("Please select a subject and at least one class");
      return;
    }

    assignSubjectToTeacher(teacher.id, selectedSubject, selectedClasses);
    toast.success(`${selectedSubject} assigned to ${teacher.name}!`);
    setSelectedSubject("");
    setSelectedClasses([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Subject</DialogTitle>
          <DialogDescription>
            Assign a subject and classes to {teacher?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Select Classes</Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
              {classes.map((cls) => (
                <div key={cls.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={cls.id}
                    checked={selectedClasses.includes(cls.name)}
                    onCheckedChange={() => handleClassToggle(cls.name)}
                  />
                  <label htmlFor={cls.id} className="text-sm cursor-pointer">
                    {cls.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Assign Subject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
