import { t } from "@lingui/macro";
import { ArrowLeft, Users } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useUsersByProvider } from "@/client/services/admin";
import { UserAvatar } from "@/client/components/user-avatar";
import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";

export const AdminProviderPage = () => {
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading } = useUsersByProvider(provider || "", page * pageSize, pageSize);

  return (
    <>
      <Helmet>
        <title>
          {t`Users by Provider`} - {t`Admin`} - {t`InternVista`}
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
            <Users className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {t`Users by Provider`}: {provider?.toUpperCase()}
            </h1>
            <p className="text-muted-foreground">
              {t`View all users registered via`} {provider}
            </p>
          </div>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-muted-foreground">{t`Loading users...`}</div>
          </div>
        )}

        {data && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {t`Total Users`}: {data.total}
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="grid gap-4">
              {data.users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:bg-secondary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <UserAvatar size={48} />
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                @{user.username}
                              </span>
                              <span className="text-xs capitalize text-muted-foreground">
                                {user.provider}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {user._count.resumes} {t`resumes`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end gap-2">
                            {user.emailVerified && (
                              <div className="flex items-center gap-1 text-success">
                                <CheckCircle className="size-4" />
                                <span className="text-xs">{t`Verified`}</span>
                              </div>
                            )}
                            {user.twoFactorEnabled && (
                              <div className="flex items-center gap-1 text-info">
                                <ShieldCheck className="size-4" />
                                <span className="text-xs">{t`2FA`}</span>
                              </div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {dayjs(user.createdAt).format("MMM DD, YYYY")}
                            </span>
                          </div>
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


