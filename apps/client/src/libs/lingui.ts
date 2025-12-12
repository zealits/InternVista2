import { i18n } from "@lingui/core";
import dayjs from "dayjs";

import { dayjsLocales } from "./dayjs";

export const defaultLocale = "en-US";

export async function dynamicActivate(locale: string) {
  try {
    // In production, messages are compiled to .js files by the Lingui vite plugin
    // Use .js extension for production builds, .po for development
    const extension = import.meta.env.PROD ? '.js' : '.po';
    const { messages } = await import(`../locales/${locale}/messages${extension}`);

    if (messages) {
      i18n.loadAndActivate({ locale, messages });
    }

    if (dayjsLocales[locale]) {
      dayjs.locale(await dayjsLocales[locale]());
    }
  } catch (error) {
    console.error(error);
  }
}
