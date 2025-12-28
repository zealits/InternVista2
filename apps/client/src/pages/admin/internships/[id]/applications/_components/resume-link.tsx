import { t } from "@lingui/macro";
import { FileText, Eye } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { useQuery } from "@tanstack/react-query";
import { ResumeDto } from "@reactive-resume/dto";
import { axios } from "@/client/libs/axios";
import { AxiosResponse } from "axios";

interface ResumeLinkProps {
  resumeId: string;
}

const fetchResumeData = async (id: string): Promise<ResumeDto | null> => {
  try {
    // Use admin endpoint to fetch any resume by ID (bypasses ownership check)
    const response = await axios.get<ResumeDto, AxiosResponse<ResumeDto>>(`/admin/resumes/${id}`);
    return response.data || null;
  } catch (error) {
    return null;
  }
};

export const ResumeLink = ({ resumeId }: ResumeLinkProps) => {
  const { data: resume, isLoading } = useQuery({
    queryKey: ["resume-data", resumeId],
    queryFn: () => fetchResumeData(resumeId),
    enabled: !!resumeId,
  });

  const getResumeViewUrl = () => {
    if (!resume) return "#";
    
    // Use admin preview route for viewing resumes (read-only mode)
    return `/admin/resumes/${resumeId}/preview`;
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium flex items-center gap-2">
        <FileText size={16} />
        {t`Resume`}
      </h4>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <span className="text-sm text-muted-foreground">{t`Loading resume...`}</span>
        ) : (
          <>
            {resume?.title && (
              <span className="text-sm text-muted-foreground mr-2">
                {resume.title}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = getResumeViewUrl();
                if (url.startsWith("http")) {
                  window.open(url, "_blank");
                } else {
                  window.open(url, "_blank");
                }
              }}
            >
              <Eye className="mr-2 size-4" />
              {t`View Resume`}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

