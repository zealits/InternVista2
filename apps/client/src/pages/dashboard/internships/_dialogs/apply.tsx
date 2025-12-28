import { t } from "@lingui/macro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState, useEffect } from "react";
import { useResumes } from "@/client/services/resume";

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (coverLetter?: string, resumeId?: string) => void;
  isLoading?: boolean;
}

export const ApplyDialog = ({ open, onOpenChange, onApply, isLoading }: ApplyDialogProps) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const { resumes, loading: resumesLoading } = useResumes();

  useEffect(() => {
    if (open) {
      // Reset form when dialog opens
      setCoverLetter("");
      setSelectedResumeId("");
    }
  }, [open]);

  const handleSubmit = () => {
    onApply(coverLetter || undefined, selectedResumeId || undefined);
    setCoverLetter("");
    setSelectedResumeId("");
  };

  const handleClose = () => {
    setCoverLetter("");
    setSelectedResumeId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t`Apply for Internship`}</DialogTitle>
          <DialogDescription>
            {t`Select a resume and optionally provide a cover letter to accompany your application.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">{t`Select Resume`}</Label>
            {resumesLoading ? (
              <div className="flex h-9 items-center justify-center rounded border border-border bg-transparent px-3 py-2 text-sm text-muted-foreground">
                {t`Loading resumes...`}
              </div>
            ) : !resumes || resumes.length === 0 ? (
              <div className="flex h-9 items-center justify-center rounded border border-border bg-transparent px-3 py-2 text-sm text-muted-foreground">
                {t`No resumes available. Please create a resume first.`}
              </div>
            ) : (
              <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
                <SelectTrigger id="resume">
                  <SelectValue placeholder={t`Choose a resume...`} />
                </SelectTrigger>
                <SelectContent>
                  {resumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      {resume.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <p className="text-xs text-muted-foreground">
              {t`Select the resume you want to submit with your application.`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">{t`Cover Letter (Optional)`}</Label>
            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder={t`Tell us why you're interested in this internship...`}
              rows={6}
              className={cn(
                "flex w-full rounded border border-border bg-transparent px-3 py-2 text-sm ring-0 ring-offset-transparent transition-colors placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            {t`Cancel`}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !selectedResumeId || resumesLoading || !resumes || resumes.length === 0}
          >
            {isLoading ? t`Submitting...` : t`Submit Application`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

