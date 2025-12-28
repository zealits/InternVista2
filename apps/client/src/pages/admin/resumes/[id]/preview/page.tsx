import { t } from "@lingui/macro";
import { ArrowLeft, CircleNotch, FilePdf } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import { Button } from "@reactive-resume/ui";
import { pageSizeMap } from "@reactive-resume/utils";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { queryClient } from "@/client/libs/query-client";
import { findResumeByIdAsAdmin } from "@/client/services/resume";
import { usePrintResume } from "@/client/services/resume";

export const AdminResumePreviewPage = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { printResume, loading: printLoading } = usePrintResume();

  const { id, title, data: resume } = useLoaderData() as ResumeDto;
  const format = resume.metadata.page.format;

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume };
    (() => frameRef.current.contentWindow.postMessage(message, "*"))();
  }, [frameRef, resume]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateResumeInFrame);
    return () => frameRef.current?.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;

    const handleMessage = (event: MessageEvent) => {
      if (!frameRef.current || !frameRef.current.contentWindow) return;
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "PAGE_LOADED") {
        frameRef.current.width = event.data.payload.width;
        frameRef.current.height = event.data.payload.height;
        frameRef.current.contentWindow.removeEventListener("message", handleMessage);
      }
    };

    frameRef.current.contentWindow.addEventListener("message", handleMessage);

    return () => {
      frameRef.current?.contentWindow?.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(updateResumeInFrame, [resume, updateResumeInFrame]);

  const onDownloadPdf = async () => {
    try {
      const { url } = await printResume({ id });
      const win = window.open(url, "_blank");
      if (win) win.focus();
    } catch (error) {
      // Handle error silently or show toast
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {title} - {t`Preview`} - {t`Admin`} - {t`InternVista`}
        </title>
      </Helmet>

      {/* Header */}
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="flex items-center gap-x-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-x-3">
            <Icon size={24} />
            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p className="text-xs text-muted-foreground">{t`Resume Preview`}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-x-2"
            onClick={onDownloadPdf}
            disabled={printLoading}
          >
            {printLoading ? (
              <CircleNotch size={16} className="animate-spin" />
            ) : (
              <FilePdf size={16} />
            )}
            <span>{t`Download PDF`}</span>
          </Button>
          <ThemeSwitch />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center overflow-auto bg-gradient-to-b from-muted/50 to-background py-12 px-4 sm:py-16 sm:px-8">
        <div className="w-full max-w-5xl">
          <div
            className="mx-auto overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300 hover:shadow-3xl print:shadow-none"
            style={{
              width: `${pageSizeMap[format].width}mm`,
              maxWidth: "100%",
            }}
          >
            <iframe
              title={title}
              ref={frameRef}
              scrolling="no"
              src="/artboard/preview"
              className="block w-full border-0 bg-white"
              style={{
                width: `${pageSizeMap[format].width}mm`,
                minHeight: `${pageSizeMap[format].height}mm`,
                aspectRatio: `${pageSizeMap[format].width} / ${pageSizeMap[format].height}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const adminResumePreviewLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const id = params.id as string;

    const resume = await queryClient.fetchQuery({
      queryKey: ["admin-resume", { id }],
      queryFn: () => findResumeByIdAsAdmin(id),
    });

    return resume;
  } catch (error) {
    return redirect("/admin/internships");
  }
};

