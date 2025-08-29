import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IncidentForm } from "@/components/IncidentForm";

interface CreateIncidentModalProps {
  trigger?: React.ReactNode;
  triggerText?: string;
  triggerClassName?: string;
}

export function CreateIncidentModal({ 
  trigger, 
  triggerText = "Create Incident",
  triggerClassName 
}: CreateIncidentModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className={triggerClassName}>
      <PlusIcon className="w-4 h-4 mr-2" />
      {triggerText}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Incident</DialogTitle>
        </DialogHeader>
        <IncidentForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
