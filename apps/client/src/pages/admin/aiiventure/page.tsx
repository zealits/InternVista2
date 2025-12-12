import { t } from "@lingui/macro";
import {
  CheckCircle,
  FileText,
  Lock,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { useStatistics } from "@/client/services/admin";

const StatCard = ({
  title,
  description,
  value,
  icon,
  delay = 0,
  onClick,
}: {
  title: string;
  description: string;
  value: number | undefined;
  icon: React.ReactNode;
  delay?: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card
      className={cn(
        onClick && "cursor-pointer hover:bg-secondary/50 transition-colors",
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary">
              {value !== undefined ? value : "—"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ProviderCard = ({
  usersByProvider,
  delay = 0,
  onProviderClick,
}: {
  usersByProvider: Array<{ provider: string; count: number }> | undefined;
  delay?: number;
  onProviderClick?: (provider: string) => void;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            {t`Users by Provider`}
          </CardTitle>
          <CardDescription>{t`Distribution of users by authentication provider`}</CardDescription>
        </CardHeader>
        <CardContent>
          {usersByProvider && usersByProvider.length > 0 ? (
            <div className="space-y-4 py-4">
              {usersByProvider.map((item) => (
                <div
                  key={item.provider}
                  className={cn(
                    "flex items-center justify-between cursor-pointer hover:bg-secondary/30 rounded p-2 transition-colors",
                    onProviderClick && "hover:bg-secondary/50",
                  )}
                  onClick={() => {
                    if (onProviderClick) {
                      navigate(`/admin/provider/${item.provider}`);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="capitalize font-medium">{item.provider}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{item.count}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">{t`No data available`}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const AdminAiiventurePage = () => {
  const { data, isLoading, error } = useStatistics();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          {t`Admin Dashboard`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="container mx-auto max-w-7xl space-y-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <Users className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t`Admin Dashboard`}</h1>
            <p className="text-muted-foreground">{t`Manage and monitor your portal`}</p>
          </div>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-muted-foreground">{t`Loading statistics...`}</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-16">
            <div className="text-destructive">{t`Error loading statistics`}</div>
          </div>
        )}

        {data && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title={t`Candidates on Portal`}
                description={t`Total number of candidates registered on the platform`}
                value={data.candidates}
                icon={<Users className="size-5" />}
                delay={0.1}
                onClick={() => navigate("/admin/users?filter=all")}
              />
              <StatCard
                title={t`Total Resumes`}
                description={t`Total number of resumes created on the platform`}
                value={data.resumes}
                icon={<FileText className="size-5" />}
                delay={0.2}
                onClick={() => navigate("/admin/resumes")}
              />
              <StatCard
                title={t`Email Verified`}
                description={t`Number of users with verified email addresses`}
                value={data.emailVerified}
                icon={<CheckCircle className="size-5" />}
                delay={0.3}
                onClick={() => navigate("/admin/users?filter=email-verified&verified=true")}
              />
              <StatCard
                title={t`2FA Enabled`}
                description={t`Number of users with two-factor authentication enabled`}
                value={data.twoFactorEnabled}
                icon={<ShieldCheck className="size-5" />}
                delay={0.4}
                onClick={() => navigate("/admin/users?filter=two-factor&enabled=true")}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ProviderCard
                usersByProvider={data.usersByProvider}
                delay={0.5}
                onProviderClick={(provider) => navigate(`/admin/provider/${provider}`)}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="size-5" />
                      {t`Security Overview`}
                    </CardTitle>
                    <CardDescription>
                      {t`Security metrics and verification status`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t`Email Verification Rate`}</span>
                        <span className="text-lg font-semibold">
                          {data.candidates > 0
                            ? `${Math.round((data.emailVerified / data.candidates) * 100)}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t`2FA Adoption Rate`}</span>
                        <span className="text-lg font-semibold">
                          {data.candidates > 0
                            ? `${Math.round((data.twoFactorEnabled / data.candidates) * 100)}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t`Average Resumes per User`}</span>
                        <span className="text-lg font-semibold">
                          {data.candidates > 0
                            ? (data.resumes / data.candidates).toFixed(1)
                            : "0"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

