import { t } from "@lingui/macro";
import {
  Briefcase,
  Calendar,
  MapPin,
  Money,
  Clock,
  FileText,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Separator,
} from "@reactive-resume/ui";
import { Internship } from "@/client/services/internship";

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  internship: Internship | null;
  onApply?: () => void;
  applied?: boolean;
  status?: string;
  deadlinePassed?: boolean;
  canApply?: boolean;
}

export const DetailDialog = ({
  open,
  onOpenChange,
  internship,
  onApply,
  applied = false,
  status,
  deadlinePassed = false,
  canApply = true,
}: DetailDialogProps) => {
  if (!internship) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{internship.title}</DialogTitle>
              <DialogDescription className="text-lg font-medium">
                {internship.company}
              </DialogDescription>
            </div>
            {applied && (
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  status === "accepted"
                    ? "bg-success/20 text-success"
                    : status === "rejected"
                      ? "bg-error/20 text-error"
                      : "bg-info/20 text-info"
                }`}
              >
                {status === "accepted"
                  ? t`Accepted`
                  : status === "rejected"
                    ? t`Rejected`
                    : t`Pending`}
              </span>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} />
              {t`Description`}
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {internship.description}
            </p>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {internship.location && (
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t`Location`}</p>
                  <p className="text-sm text-muted-foreground">{internship.location}</p>
                </div>
              </div>
            )}

            {internship.type && (
              <div className="flex items-start gap-3">
                <Briefcase size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t`Type`}</p>
                  <p className="text-sm text-muted-foreground">{internship.type}</p>
                </div>
              </div>
            )}

            {internship.duration && (
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t`Duration`}</p>
                  <p className="text-sm text-muted-foreground">{internship.duration}</p>
                </div>
              </div>
            )}

            {internship.stipend && (
              <div className="flex items-start gap-3">
                <Money size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t`Stipend`}</p>
                  <p className="text-sm text-muted-foreground">{internship.stipend}</p>
                </div>
              </div>
            )}

            {internship.deadline && (
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t`Application Deadline`}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(internship.deadline)}
                    {deadlinePassed && (
                      <span className="ml-2 text-error">{t`(Expired)`}</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Requirements */}
          {internship.requirements && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t`Requirements`}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {internship.requirements}
                </p>
              </div>
            </>
          )}

          {/* Skills */}
          {internship.skills && internship.skills.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t`Required Skills`}</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            {t`Close`}
          </Button>
          {onApply && (
            <Button
              className="flex-1"
              variant={applied ? "outline" : "primary"}
              disabled={applied || deadlinePassed || !canApply}
              onClick={onApply}
            >
              {applied
                ? status === "accepted"
                  ? t`Application Accepted`
                  : status === "rejected"
                    ? t`Application Rejected`
                    : t`Application Pending`
                : deadlinePassed
                  ? t`Deadline Passed`
                  : !canApply
                    ? t`Not Available`
                    : t`Apply Now`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

