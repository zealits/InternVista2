import { t } from "@lingui/macro";
import { Link, Outlet } from "react-router-dom";

import { ThemeSwitch } from "@/client/components/theme-switch";

export const AdminAuthLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[420px] sm:px-0 lg:basis-[480px] lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="size-24">
            <div className="text-white font-semibold text-2xl md:text-3xl">InternVista</div>
          </Link>
          <div className="right-0 space-x-2 text-right lg:absolute lg:p-12 lg:text-center">
            <ThemeSwitch />
          </div>
        </div>

        <Outlet />
      </div>

      <div className="relative hidden lg:block lg:flex-1">
        <img
          width={1920}
          height={1080}
          alt="Admin Panel"
          className="h-screen w-full object-cover object-center"
          src="/backgrounds/login.png"
        />
      </div>
    </div>
  );
};


