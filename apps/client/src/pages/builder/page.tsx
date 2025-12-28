import { t } from "@lingui/macro";
import { ResumeDto } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect } from "react-router-dom";

import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { findResumeByIdAsAdmin } from "@/client/services/resume/admin";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { fetchUser } from "@/client/services/user";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef || !frameRef.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => frameRef.contentWindow.postMessage(message, "*"))();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => frameRef.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const id = params.id as string;

    // Try to fetch resume normally first
    try {
      const resume = await queryClient.fetchQuery({
        queryKey: ["resume", { id }],
        queryFn: () => findResumeById({ id }),
      });

      useResumeStore.setState({ resume });
      useResumeStore.temporal.getState().clear();

      return resume;
    } catch (error) {
      // If regular fetch fails, check if user is admin and try admin endpoint
      try {
        const user = await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: fetchUser,
        });

        if (user?.isAdmin) {
          const resume = await findResumeByIdAsAdmin(id);
          useResumeStore.setState({ resume });
          useResumeStore.temporal.getState().clear();
          return resume;
        }
      } catch (adminError) {
        // If admin fetch also fails, redirect
      }

      // If all attempts fail, check if user is admin and redirect accordingly
      try {
        const user = await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: fetchUser,
        });
        if (user?.isAdmin) {
          return redirect("/admin/internships");
        }
      } catch {
        // Fall through to default redirect
      }
      return redirect("/dashboard");
    }
  } catch (error) {
    // Try to redirect to admin panel if user is admin
    try {
      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
      });
      if (user?.isAdmin) {
        return redirect("/admin/internships");
      }
    } catch {
      // Fall through to default redirect
    }
    return redirect("/dashboard");
  }
};
