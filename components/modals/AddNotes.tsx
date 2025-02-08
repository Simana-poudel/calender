import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { create } from "zustand";

type NoteStoreState = {
  notes: NoteData[];
  addNote: (newNote: NoteData) => void;
};

const useNoteStore = create<NoteStoreState>((set) => ({
  notes:
    typeof window !== "undefined" && window.localStorage.getItem("notes")
      ? JSON.parse(window.localStorage.getItem("notes")!)
      : [],
  addNote: (newNote) =>
    set((state) => {
      const updatedNotes = [...state.notes, newNote];
      if (typeof window !== "undefined") {
        window.localStorage.setItem("notes", JSON.stringify(updatedNotes));
      }
      return { notes: updatedNotes };
    }),
}));

type NoteData = {
  date: {
    date: string;
    nepaliDate: number;
  };
  note: string;
};

interface NoteProps {
  dayObj: {
    date: Date;
    nepaliDate: number;
  } | null;
  isOpen?: boolean;
  onClose?: () => void;
}

const Note = ({ dayObj, isOpen, onClose }: NoteProps) => {
  const [note, setNote] = useState<string>("");
  const [noteExists, setNoteExists] = useState<boolean>(false);
  const notes = useNoteStore((state) => state.notes);
  const addNote = useNoteStore((state) => state.addNote);

  useEffect(() => {
    const existingNote = notes.find(
      (n) => n.date.date === dayObj?.date.toISOString()
    );
    if (existingNote) setNoteExists(true);
  }, [dayObj?.date, notes]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() === "") return;

    const newNoteData: NoteData = {
      date: {
        date: dayObj ? dayObj.date.toISOString() : "",
        nepaliDate: dayObj?.nepaliDate ?? 0,
      },
      note: note,
    };

    addNote(newNoteData);
    setNote("");
    setNoteExists(true);

    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {!noteExists && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Note</DialogTitle>
            <DialogDescription>Add your note for this day.</DialogDescription>
          </DialogHeader>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Enter your note..."
            rows={4}
            style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
          />
          <button onClick={handleSaveNote}>Save Note</button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Note;
