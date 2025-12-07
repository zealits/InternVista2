import { HttpException, Module } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { RavenInterceptor, RavenModule } from "nest-raven";
import { ZodValidationPipe } from "nestjs-zod";
import { join } from "path";

import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { ConfigModule } from "./config/config.module";
import { ContributorsModule } from "./contributors/contributors.module";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { MailModule } from "./mail/mail.module";
import { PrinterModule } from "./printer/printer.module";
import { ResumeModule } from "./resume/resume.module";
import { StorageModule } from "./storage/storage.module";
import { TranslationModule } from "./translation/translation.module";
import { UserModule } from "./user/user.module";
import { UtilsModule } from "./utils/utils.module";
import { EmailController } from './email.controller';

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    DatabaseModule,
    MailModule,
    RavenModule,
    CacheModule,
    UtilsModule,
    HealthModule,

    // Feature Modules
    AuthModule.register(),
    UserModule,
    ResumeModule,
    StorageModule,
    PrinterModule,
    TranslationModule,
    ContributorsModule,

    // Static Assets
    ServeStaticModule.forRoot({
      serveRoot: "/artboard",
      rootPath: join(__dirname, "..", "artboard"),
      serveStaticOptions: {
        maxAge: 31536000, // 1 year cache for artboard assets
        immutable: true,
      },
    }),
    ServeStaticModule.forRoot({
      renderPath: "/*",
      rootPath: join(__dirname, "..", "client"),
      serveStaticOptions: {
        // Cache static assets (JS, CSS, images) for 1 year
        maxAge: 31536000,
        immutable: true,
        // Set proper cache headers
        setHeaders: (res, path) => {
          // Cache JS and CSS files aggressively
          if (path.match(/\.(js|css)$/)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
          // Cache images and fonts
          if (path.match(/\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
          // Don't cache HTML files (for SPA routing)
          if (path.match(/\.html$/)) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          }
        },
      },
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          // Filter all HttpException with status code <= 500
          {
            type: HttpException,
            filter: (exception: HttpException) => exception.getStatus() < 500,
          },
        ],
      }),
    },
  ],
  controllers: [EmailController],
})
export class AppModule {}
