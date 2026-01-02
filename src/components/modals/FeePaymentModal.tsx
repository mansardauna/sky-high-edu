import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard, Banknote } from "lucide-react";

interface FeePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  amount: number;
  feeType: string;
  onPaymentComplete: (studentId: string, feeType: string, amount: number) => void;
}

export const FeePaymentModal = ({ 
  open, 
  onOpenChange, 
  studentId, 
  studentName, 
  amount,
  feeType,
  onPaymentComplete 
}: FeePaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(amount.toString());
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!reference.trim()) {
      toast.error("Please enter payment reference");
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPaymentComplete(studentId, feeType, parseFloat(paymentAmount));
    toast.success("Payment recorded successfully!");
    setLoading(false);
    setPaymentMethod("");
    setReference("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Record Payment
          </DialogTitle>
          <DialogDescription>
            Record fee payment for {studentName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Fee Type</span>
              <span className="font-medium text-foreground">{feeType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount Due</span>
              <span className="font-bold text-primary text-lg">₦{amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              min="0"
              max={amount}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash Payment</SelectItem>
                <SelectItem value="pos">POS Payment</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Payment Reference / Receipt No.</Label>
            <Input
              id="reference"
              placeholder="e.g., TRX123456789"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <Banknote className="w-4 h-4 mr-2" />
                  Record Payment
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
