import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { join } from "path";

import { configSchema } from "./schema";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: configSchema.parse,
      // Explicitly set env file paths to ensure .env is loaded
      envFilePath: [
        join(process.cwd(), ".env.local"),
        join(process.cwd(), ".env"),
        join(process.cwd(), "..", ".env"),
        join(process.cwd(), "..", "..", ".env"),
      ],
    }),
  ],
})
export class ConfigModule {}
