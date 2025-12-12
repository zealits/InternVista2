import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

import { BackupOtpPage } from "../pages/auth/backup-otp/page";
import { ForgotPasswordPage } from "../pages/auth/forgot-password/page";
import { AuthLayout } from "../pages/auth/layout";
import { LoginPage } from "../pages/auth/login/page";
import { RegisterPage } from "../pages/auth/register/page";
import { ResetPasswordPage } from "../pages/auth/reset-password/page";
import { VerifyEmailPage } from "../pages/auth/verify-email/page";
import { VerifyOtpPage } from "../pages/auth/verify-otp/page";
import { BuilderLayout } from "../pages/builder/layout";
import { BuilderPage } from "../pages/builder/page";
import { builderLoader } from "../pages/builder/page";
import { AdminAiiventurePage } from "../pages/admin/aiiventure/page";
import { AdminLayout } from "../pages/admin/layout";
import { AdminUsersPage } from "../pages/admin/users/page";
import { AdminResumesPage } from "../pages/admin/resumes/page";
import { AdminProviderPage } from "../pages/admin/provider/page";
import { AdminLoginPage } from "../pages/admin/auth/login/page";
import { AdminRegisterPage } from "../pages/admin/auth/register/page";
import { AdminAuthLayout } from "../pages/admin/auth/layout";
import { TestPage } from "../pages/test/page";
import { TestLayout } from "../pages/test/layout";
import { DashboardLayout } from "../pages/dashboard/layout";
import { ResumesPage } from "../pages/dashboard/resumes/page";
import { SettingsPage } from "../pages/dashboard/settings/page";
import { EmailPage } from "../pages/dashboard/get_email/page";
import {CareerPage } from "../pages/dashboard/career_guidance/page";
import { HomeLayout } from "../pages/home/layout";
import { HomePage } from "../pages/home/page";
import { publicLoader, PublicResumePage } from "../pages/public/page";
import { Providers } from "../providers";
import { AuthGuard } from "./guards/auth";
import { AdminAuthGuard } from "./guards/admin-auth";
import { GuestGuard } from "./guards/guest";
import { PublicRouteGuard } from "./guards/public-route";
import { authLoader } from "./loaders/auth";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route element={<HomeLayout />}>
      <Route path="/" element={<HomePage />} />
    </Route>

    {/* Test Route - Simple standalone page */}
    <Route path="test" element={<TestLayout />}>
      <Route index element={<TestPage />} />
    </Route>

    {/* Email Verification - Root level (accessible without auth) */}
    <Route element={<AuthLayout />}>
      <Route path="verify-email" element={<VerifyEmailPage />} />
    </Route>

    <Route path="auth">
      <Route element={<AuthLayout />}>
        <Route element={<GuestGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Password Recovery */}
        <Route element={<GuestGuard />}>
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Two-Factor Authentication */}
        <Route element={<GuestGuard />}>
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="backup-otp" element={<BackupOtpPage />} />
        </Route>

        {/* Email Verification - Also available at /auth/verify-email for backward compatibility */}
        <Route path="verify-email" element={<VerifyEmailPage />} />

        {/* OAuth Callback */}
        <Route path="callback" loader={authLoader} />
      </Route>

      <Route index element={<Navigate to="/auth/login" replace />} />
    </Route>

    {/* Admin Auth Routes */}
    <Route path="admin/auth">
      <Route element={<AdminAuthLayout />}>
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="register" element={<AdminRegisterPage />} />
        <Route index element={<Navigate to="/admin/auth/login" replace />} />
      </Route>
    </Route>

    {/* Admin Routes - Protected */}
    <Route path="admin" element={<AdminAuthGuard />}>
      <Route element={<AdminLayout />}>
        <Route path="aiiventure" element={<AdminAiiventurePage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="resumes" element={<AdminResumesPage />} />
        <Route path="provider/:provider" element={<AdminProviderPage />} />
        <Route index element={<Navigate to="/admin/aiiventure" replace />} />
      </Route>
    </Route>

    <Route path="dashboard">
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="resumes" element={<ResumesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="getmail" element={<EmailPage />} />
          <Route path="careerguidance" element={<CareerPage />} />

          <Route index element={<Navigate to="/dashboard/resumes" replace />} />
        </Route>
      </Route>
    </Route>

    <Route path="builder">
      <Route element={<AuthGuard />}>
        <Route element={<BuilderLayout />}>
          <Route path=":id" loader={builderLoader} element={<BuilderPage />} />

          <Route index element={<Navigate to="/dashboard/resumes" replace />} />
        </Route>
      </Route>
    </Route>

    {/* Public Routes */}
    <Route path=":username">
      <Route element={<PublicRouteGuard />}>
        <Route path=":slug" loader={publicLoader} element={<PublicResumePage />} />
      </Route>
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
