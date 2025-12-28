import { t } from "@lingui/macro";
import { ArrowLeft, User, Calendar, FileText, CheckCircle, XCircle, Clock } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardHeader, CardTitle, ScrollArea, Badge } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import {
  useInternshipApplications,
  useInternship,
  useUpdateApplicationStatus,
} from "@/client/services/internship";
import { toast } from "@/client/hooks/use-toast";
import { UserAvatar } from "@/client/components/user-avatar";
import { ResumeLink } from "./_components/resume-link";

export const AdminInternshipApplicationsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: internship } = useInternship(id || "");
  const { data: applications, isLoading, refetch } = useInternshipApplications(id || "");
  const { mutateAsync: updateStatus } = useUpdateApplicationStatus();

  const handleStatusUpdate = async (applicationId: string, status: "accepted" | "rejected") => {
    try {
      await updateStatus({ applicationId, status });
      toast({
        variant: "success",
        title: t`Success`,
        description: t`Application status updated successfully.`,
      });
      refetch();
    } catch (error: any) {
      toast({
        variant: "error",
        title: t`Error`,
        description: error?.response?.data?.message || t`Failed to update status.`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-success/20 text-success">
            <CheckCircle className="mr-1 size-3" />
            {t`Accepted`}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-error/20 text-error">
            <XCircle className="mr-1 size-3" />
            {t`Rejected`}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-info/20 text-info">
            <Clock className="mr-1 size-3" />
            {t`Pending`}
          </Badge>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t`Applications`} - {t`Admin`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="container mx-auto max-w-7xl space-y-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/admin/internships")}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {internship ? `${internship.title} - ${t`Applications`}` : t`Applications`}
            </h1>
            <p className="text-muted-foreground">
              {t`View and manage applications for this internship`}
            </p>
          </div>
        </motion.div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-muted-foreground">{t`Loading applications...`}</div>
            </div>
          ) : !applications || applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <User size={48} className="text-muted-foreground" />
              <p className="text-lg font-medium">{t`No applications yet`}</p>
              <p className="text-sm text-muted-foreground">
                {t`No one has applied to this internship yet.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <UserAvatar
                            user={application.user}
                            size={48}
                            className="size-12"
                          />
                          <div>
                            <CardTitle className="text-xl">
                              {application.user?.name || t`Unknown User`}
                            </CardTitle>
                            <CardContent className="p-0 text-sm text-muted-foreground">
                              {application.user?.email}
                            </CardContent>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        <span>{t`Applied on ${formatDate(application.createdAt)}`}</span>
                      </div>

                      {application.resumeId && (
                        <ResumeLink resumeId={application.resumeId} />
                      )}

                      {application.coverLetter && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">{t`Cover Letter`}</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      {application.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(application.id, "accepted")}
                            className="flex-1"
                          >
                            <CheckCircle className="mr-2 size-4" />
                            {t`Accept`}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(application.id, "rejected")}
                            className="flex-1"
                          >
                            <XCircle className="mr-2 size-4" />
                            {t`Reject`}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};

