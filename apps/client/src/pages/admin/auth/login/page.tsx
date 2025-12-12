import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { loginSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAdminLogin } from "@/client/services/admin/auth";

type FormValues = z.infer<typeof loginSchema>;

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAdminLogin();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      navigate("/admin/aiiventure");
    } catch (error) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`Admin Sign In`} - {t`InternVista`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Admin Sign In`}</h2>
        <h6>
          <span className="opacity-75">{t`Don't have an admin account?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/admin/auth/register">
              {t`Register now`} <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      <Form {...form}>
        <form
          ref={formRef}
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Email or Username`}</FormLabel>
                <FormControl>
                  <Input placeholder="admin@example.com" {...field} />
                </FormControl>
                <FormDescription>{t`Enter your admin email or username`}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Password`}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  {t`Hold Ctrl to display your password temporarily`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {t`Sign in`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

