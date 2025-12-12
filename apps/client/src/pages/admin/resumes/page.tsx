import { t } from "@lingui/macro";
import { ArrowLeft, FileText, Lock, LockOpen, Eye } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAllResumes } from "@/client/services/admin";
import { UserAvatar } from "@/client/components/user-avatar";

export const AdminResumesPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading } = useAllResumes(page * pageSize, pageSize);

  return (
    <>
      <Helmet>
        <title>
          {t`All Resumes`} - {t`Admin`} - {t`InternVista`}
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
            onClick={() => navigate("/admin/aiiventure")}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t`All Resumes`}</h1>
            <p className="text-muted-foreground">
              {t`View and manage all resumes on the platform`}
            </p>
          </div>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-muted-foreground">{t`Loading resumes...`}</div>
          </div>
        )}

        {data && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {t`Total Resumes`}: {data.total}
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {data.resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "hover:bg-secondary/50 transition-colors cursor-pointer",
                    )}
                    onClick={() => navigate(`/builder/${resume.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="size-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{resume.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t`by`} {resume.user.name} (@{resume.user.username})
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs capitalize text-muted-foreground">
                                {resume.visibility}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {dayjs(resume.createdAt).format("MMM DD, YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end gap-2">
                            {resume.locked ? (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Lock className="size-4" />
                                <span className="text-xs">{t`Locked`}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-success">
                                <LockOpen className="size-4" />
                                <span className="text-xs">{t`Unlocked`}</span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {dayjs(resume.updatedAt).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/builder/${resume.id}`);
                            }}
                            className="ml-4"
                          >
                            <Eye className="size-4 mr-2" />
                            {t`View`}
                          </Button>
                          {resume.visibility === "public" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/${resume.user.username}/${resume.slug}`);
                              }}
                            >
                              {t`Public View`}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  {t`Previous`}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t`Page`} {data.page} {t`of`} {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                  disabled={page >= data.totalPages - 1}
                >
                  {t`Next`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

