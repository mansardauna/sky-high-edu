import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDemoData, FeeStructure } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface FeeStructureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fee?: FeeStructure | null;
  mode: "add" | "edit";
}

export const FeeStructureModal = ({ open, onOpenChange, fee, mode }: FeeStructureModalProps) => {
  const { addFeeStructure, updateFeeStructure } = useDemoData();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: fee?.name || "",
    amount: fee?.amount?.toString() || "",
    term: fee?.term || "First",
    classLevel: fee?.classLevel || "All",
  });

  const feeTypes = language === "ar" 
    ? ["الرسوم الدراسية", "رسوم التطوير", "رسوم الكتب", "رسوم الامتحانات", "رسوم المختبر", "رسوم الرياضة", "رسوم التسجيل", "رسوم الزي المدرسي"]
    : ["Tuition Fee", "Development Levy", "Book Fee", "Examination Fee", "Laboratory Fee", "Sports Fee", "Registration Fee", "Uniform Fee"];

  const classLevels = [
    { value: "All", label: language === "ar" ? "جميع المراحل" : "All Levels" },
    { value: "تمهيدي", label: language === "ar" ? "التمهيدي" : "Tamhidi" },
    { value: "إعدادي", label: language === "ar" ? "الإعدادي" : "I'dadi" },
    { value: "توجيهي", label: language === "ar" ? "التوجيهي" : "Tawjihi" },
  ];

  const terms = [
    { value: "First", label: language === "ar" ? "الفصل الأول" : "First Term" },
    { value: "Second", label: language === "ar" ? "الفصل الثاني" : "Second Term" },
    { value: "Third", label: language === "ar" ? "الفصل الثالث" : "Third Term" },
    { value: "Annual", label: language === "ar" ? "سنوي" : "Annual" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      toast.error(t("please_fill_required"));
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error(language === "ar" ? "أدخل مبلغاً صحيحاً" : "Enter a valid amount");
      return;
    }

    if (mode === "add") {
      addFeeStructure({ name: formData.name, amount, term: formData.term, classLevel: formData.classLevel });
      toast.success(language === "ar" ? "تم إضافة الرسوم بنجاح" : "Fee structure added!");
    } else if (fee) {
      updateFeeStructure(fee.id, { name: formData.name, amount, term: formData.term, classLevel: formData.classLevel });
      toast.success(language === "ar" ? "تم تحديث الرسوم بنجاح" : "Fee structure updated!");
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" 
              ? (language === "ar" ? "إضافة رسوم جديدة" : "Add Fee Structure")
              : (language === "ar" ? "تعديل الرسوم" : "Edit Fee Structure")}
          </DialogTitle>
          <DialogDescription>
            {language === "ar" ? "حدد تفاصيل هيكل الرسوم" : "Configure the fee structure details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t("fee_type")}</Label>
            <Select value={formData.name} onValueChange={(v) => setFormData(prev => ({ ...prev, name: v }))}>
              <SelectTrigger>
                <SelectValue placeholder={language === "ar" ? "اختر نوع الرسوم" : "Select fee type"} />
              </SelectTrigger>
              <SelectContent>
                {feeTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("amount")} (₦)</Label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("term")}</Label>
              <Select value={formData.term} onValueChange={(v) => setFormData(prev => ({ ...prev, term: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((term) => (
                    <SelectItem key={term.value} value={term.value}>{term.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("class")}</Label>
              <Select value={formData.classLevel} onValueChange={(v) => setFormData(prev => ({ ...prev, classLevel: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit">
              {mode === "add" ? t("add") : t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
