import { t } from "@lingui/macro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Switch,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState, useEffect } from "react";

interface CreateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  internship?: any;
}

export const CreateEditDialog = ({
  open,
  onOpenChange,
  onSave,
  internship,
}: CreateEditDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "",
    duration: "",
    stipend: "",
    requirements: "",
    skills: "",
    deadline: "",
    isActive: true,
  });

  useEffect(() => {
    if (internship) {
      setFormData({
        title: internship.title || "",
        company: internship.company || "",
        description: internship.description || "",
        location: internship.location || "",
        type: internship.type || "",
        duration: internship.duration || "",
        stipend: internship.stipend || "",
        requirements: internship.requirements || "",
        skills: internship.skills?.join(", ") || "",
        deadline: internship.deadline
          ? new Date(internship.deadline).toISOString().split("T")[0]
          : "",
        isActive: internship.isActive ?? true,
      });
    } else {
      setFormData({
        title: "",
        company: "",
        description: "",
        location: "",
        type: "",
        duration: "",
        stipend: "",
        requirements: "",
        skills: "",
        deadline: "",
        isActive: true,
      });
    }
  }, [internship, open]);

  const handleSubmit = () => {
    const data: any = {
      ...formData,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      deadline: formData.deadline ? new Date(formData.deadline).toISOString() : undefined,
    };

    // Remove empty strings
    Object.keys(data).forEach((key) => {
      if (data[key] === "" && key !== "description") {
        delete data[key];
      }
    });

    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {internship ? t`Edit Internship` : t`Create New Internship`}
          </DialogTitle>
          <DialogDescription>
            {internship
              ? t`Update the internship details below.`
              : t`Fill in the details to create a new internship posting.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t`Title *`}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t`e.g., Software Development Intern`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{t`Company *`}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={t`e.g., Tech Corp`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t`Description *`}</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t`Describe the internship role and responsibilities...`}
              rows={4}
              className={cn(
                "flex w-full rounded border border-border bg-transparent px-3 py-2 text-sm ring-0 ring-offset-transparent transition-colors placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t`Location`}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={t`e.g., Remote, New York, etc.`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">{t`Type`}</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder={t`e.g., Remote, On-site, Hybrid`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">{t`Duration`}</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder={t`e.g., 3 months, 6 months`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stipend">{t`Stipend`}</Label>
              <Input
                id="stipend"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                placeholder={t`e.g., $500/month, Unpaid`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">{t`Requirements`}</Label>
            <textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder={t`List the requirements for this internship...`}
              rows={3}
              className={cn(
                "flex w-full rounded border border-border bg-transparent px-3 py-2 text-sm ring-0 ring-offset-transparent transition-colors placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">{t`Skills (comma-separated)`}</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder={t`e.g., JavaScript, React, Node.js`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">{t`Application Deadline`}</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">{t`Active`}</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t`Cancel`}
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.title || !formData.company || !formData.description}>
            {internship ? t`Update` : t`Create`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

