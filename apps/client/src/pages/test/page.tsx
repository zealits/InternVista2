import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";

export const TestPage = () => {
  return (
    <>
      <Helmet>
        <title>
          {t`Test`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">Under Construction</h1>
          <p className="text-xl text-muted-foreground">This page is currently under construction.</p>
        </div>
      </div>
    </>
  );
};

