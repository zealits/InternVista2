import { t } from "@lingui/macro";
import { Briefcase, Calendar, MapPin, Money, Clock } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ScrollArea } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

import { useInternships, useApplyToInternship, useMyApplications, Internship } from "@/client/services/internship";
import { toast } from "@/client/hooks/use-toast";
import { ApplyDialog } from "./_dialogs/apply";
import { DetailDialog } from "./_dialogs/detail";

export const InternshipsPage = () => {
  const { data: internships, isLoading } = useInternships(true);
  const { data: myApplications } = useMyApplications();
  const { mutateAsync: applyToInternship, isPending: isApplying } = useApplyToInternship();
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailInternship, setDetailInternship] = useState<Internship | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const hasApplied = (internshipId: string) => {
    return myApplications?.some((app) => app.internshipId === internshipId) || false;
  };

  const getApplicationStatus = (internshipId: string) => {
    const application = myApplications?.find((app) => app.internshipId === internshipId);
    return application?.status;
  };

  const handleApplyClick = (internshipId: string) => {
    setSelectedInternship(internshipId);
    setIsDialogOpen(true);
  };

  const handleViewDetails = (internship: Internship) => {
    setDetailInternship(internship);
    setIsDetailDialogOpen(true);
  };

  const handleApplyFromDetail = () => {
    if (!detailInternship) return;
    setIsDetailDialogOpen(false);
    setSelectedInternship(detailInternship.id);
    setIsDialogOpen(true);
  };

  const handleApply = async (coverLetter?: string, resumeId?: string) => {
    if (!selectedInternship) return;

    try {
      await applyToInternship({
        internshipId: selectedInternship,
        data: { coverLetter, resumeId },
      });
      toast({
        variant: "success",
        title: t`Application submitted`,
        description: t`Your application has been submitted successfully.`,
      });
      setIsDialogOpen(false);
      setSelectedInternship(null);
    } catch (error: any) {
      toast({
        variant: "error",
        title: t`Error`,
        description: error?.response?.data?.message || t`Failed to submit application.`,
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>
            {t`Internships`} - {t`InternVista`}
          </title>
        </Helmet>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">{t`Loading internships...`}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {t`Internships`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          {t`Internships`}
        </motion.h1>

        <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          {!internships || internships.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Briefcase size={48} className="text-muted-foreground" />
              <p className="text-lg font-medium">{t`No internships available`}</p>
              <p className="text-sm text-muted-foreground">
                {t`Check back later for new opportunities.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {internships.map((internship) => {
                const applied = hasApplied(internship.id);
                const status = getApplicationStatus(internship.id);
                const deadlinePassed = internship.deadline
                  ? new Date(internship.deadline) < new Date()
                  : false;

                return (
                  <motion.div
                    key={internship.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full flex flex-col cursor-pointer hover:border-primary/50 transition-colors" onClick={() => handleViewDetails(internship)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{internship.title}</CardTitle>
                            <CardDescription className="text-base font-medium">
                              {internship.company}
                            </CardDescription>
                          </div>
                          {applied && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
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
                      </CardHeader>
                      <CardContent className="flex-1 space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {internship.description}
                        </p>

                        <div className="space-y-2">
                          {internship.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin size={16} />
                              <span>{internship.location}</span>
                            </div>
                          )}
                          {internship.type && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Briefcase size={16} />
                              <span>{internship.type}</span>
                            </div>
                          )}
                          {internship.duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock size={16} />
                              <span>{internship.duration}</span>
                            </div>
                          )}
                          {internship.stipend && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Money size={16} />
                              <span>{internship.stipend}</span>
                            </div>
                          )}
                          {internship.deadline && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar size={16} />
                              <span>
                                {t`Deadline: ${formatDate(internship.deadline)}`}
                                {deadlinePassed && (
                                  <span className="ml-2 text-error">{t`(Expired)`}</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        {internship.skills && internship.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {internship.skills.slice(0, 5).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                            {internship.skills.length > 5 && (
                              <span className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground">
                                +{internship.skills.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant={applied ? "outline" : "primary"}
                          disabled={applied || deadlinePassed || !internship.isActive}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(internship.id);
                          }}
                        >
                          {applied
                            ? status === "accepted"
                              ? t`Application Accepted`
                              : status === "rejected"
                                ? t`Application Rejected`
                                : t`Application Pending`
                            : deadlinePassed
                              ? t`Deadline Passed`
                              : !internship.isActive
                                ? t`Not Available`
                                : t`Apply Now`}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {selectedInternship && (
        <ApplyDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onApply={handleApply}
          isLoading={isApplying}
        />
      )}

      {detailInternship && (
        <DetailDialog
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          internship={detailInternship}
          onApply={handleApplyFromDetail}
          applied={hasApplied(detailInternship.id)}
          status={getApplicationStatus(detailInternship.id)}
          deadlinePassed={
            detailInternship.deadline
              ? new Date(detailInternship.deadline) < new Date()
              : false
          }
          canApply={detailInternship.isActive}
        />
      )}
    </>
  );
};

