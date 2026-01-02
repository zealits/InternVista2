import { t } from "@lingui/macro";
import { ArrowLeft, Briefcase, Plus, Pencil, Trash, Eye } from "@phosphor-icons/react";
import { Button, Card, CardContent, CardHeader, CardTitle, ScrollArea } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  useAdminInternships,
  useCreateInternship,
  useUpdateInternship,
  useDeleteInternship,
} from "@/client/services/internship";
import { toast } from "@/client/hooks/use-toast";
import { CreateEditDialog } from "./_dialogs/create-edit";

export const AdminInternshipsPage = () => {
  const navigate = useNavigate();
  const { data: internships, isLoading, refetch } = useAdminInternships(false);
  const { mutateAsync: createInternship } = useCreateInternship();
  const { mutateAsync: updateInternship } = useUpdateInternship();
  const { mutateAsync: deleteInternship } = useDeleteInternship();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<any>(null);

  const handleCreate = () => {
    setEditingInternship(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (internship: any) => {
    setEditingInternship(internship);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t`Are you sure you want to delete this internship?`)) return;

    try {
      await deleteInternship(id);
      toast({
        variant: "success",
        title: t`Success`,
        description: t`Internship deleted successfully.`,
      });
      refetch();
    } catch (error: any) {
      toast({
        variant: "error",
        title: t`Error`,
        description: error?.response?.data?.message || t`Failed to delete internship.`,
      });
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingInternship) {
        await updateInternship({ id: editingInternship.id, data });
        toast({
          variant: "success",
          title: t`Success`,
          description: t`Internship updated successfully.`,
        });
      } else {
        await createInternship(data);
        toast({
          variant: "success",
          title: t`Success`,
          description: t`Internship created successfully.`,
        });
      }
      setIsDialogOpen(false);
      setEditingInternship(null);
      refetch();
    } catch (error: any) {
      toast({
        variant: "error",
        title: t`Error`,
        description: error?.response?.data?.message || t`Failed to save internship.`,
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Helmet>
        <title>
          {t`Manage Internships`} - {t`Admin`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="container mx-auto max-w-7xl space-y-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/admin/aiiventure")}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{t`Manage Internships`}</h1>
              <p className="text-muted-foreground">
                {t`Create and manage internship postings`}
              </p>
            </div>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 size-4" />
            {t`New Internship`}
          </Button>
        </motion.div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-muted-foreground">{t`Loading internships...`}</div>
            </div>
          ) : !internships || internships.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Briefcase size={48} className="text-muted-foreground" />
              <p className="text-lg font-medium">{t`No internships yet`}</p>
              <p className="text-sm text-muted-foreground">
                {t`Create your first internship posting.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {internships.map((internship) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{internship.title}</CardTitle>
                          <CardContent className="p-0 text-base font-medium text-muted-foreground">
                            {internship.company}
                          </CardContent>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              internship.isActive
                                ? "bg-success/20 text-success"
                                : "bg-error/20 text-error"
                            }`}
                          >
                            {internship.isActive ? t`Active` : t`Inactive`}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {internship.description}
                      </p>
                      {internship.deadline && (
                        <p className="text-xs text-muted-foreground">
                          {t`Deadline: ${formatDate(internship.deadline)}`}
                        </p>
                      )}
                      {internship._count && (
                        <p className="text-xs text-muted-foreground">
                          {t`${internship._count.applications} application(s)`}
                        </p>
                      )}
                    </CardContent>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            navigate(`/admin/internships/${internship.id}/applications`)
                          }
                        >
                          <Eye className="mr-2 size-4" />
                          {t`View Applications`}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(internship)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(internship.id)}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <CreateEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        internship={editingInternship}
      />
    </>
  );
};


