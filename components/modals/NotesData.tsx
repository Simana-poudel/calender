import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NoteProps {
  notes?: string;
  isOpen?: boolean;
  onClose?: () => void;
}
const AddNote = ({ notes, isOpen, onClose }: NoteProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Note</DialogTitle>
          <DialogDescription>{notes}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
