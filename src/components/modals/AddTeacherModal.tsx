import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoData } from "@/contexts/DemoDataContext";
import { toast } from "sonner";

interface AddTeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTeacherModal = ({ open, onOpenChange }: AddTeacherModalProps) => {
  const { addTeacher } = useDemoData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "teacher123",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    addTeacher({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      subjects: [],
      classes: [],
      status: "active",
    });

    toast.success("Teacher added successfully!");
    setFormData({ name: "", email: "", password: "teacher123" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>
            Add a new teacher to the school system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g., Mr. John Doe"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@daruulum.edu"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Default Password</Label>
            <Input
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">Teacher can change this after first login</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Add Teacher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
