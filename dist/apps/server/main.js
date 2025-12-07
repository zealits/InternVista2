/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@sentry/node");

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("nestjs-prisma");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("nestjs-zod");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(4);
const serve_static_1 = __webpack_require__(12);
const nest_raven_1 = __webpack_require__(13);
const nestjs_zod_1 = __webpack_require__(10);
const path_1 = __webpack_require__(14);
const auth_module_1 = __webpack_require__(15);
const cache_module_1 = __webpack_require__(134);
const config_module_1 = __webpack_require__(135);
const contributors_module_1 = __webpack_require__(137);
const database_module_1 = __webpack_require__(141);
const health_module_1 = __webpack_require__(142);
const mail_module_1 = __webpack_require__(18);
const printer_module_1 = __webpack_require__(145);
const resume_module_1 = __webpack_require__(155);
const storage_module_1 = __webpack_require__(24);
const translation_module_1 = __webpack_require__(164);
const user_module_1 = __webpack_require__(23);
const utils_module_1 = __webpack_require__(167);
const email_controller_1 = __webpack_require__(168);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            // Core Modules
            config_module_1.ConfigModule,
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            nest_raven_1.RavenModule,
            cache_module_1.CacheModule,
            utils_module_1.UtilsModule,
            health_module_1.HealthModule,
            // Feature Modules
            auth_module_1.AuthModule.register(),
            user_module_1.UserModule,
            resume_module_1.ResumeModule,
            storage_module_1.StorageModule,
            printer_module_1.PrinterModule,
            translation_module_1.TranslationModule,
            contributors_module_1.ContributorsModule,
            // Static Assets
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: "/artboard",
                rootPath: (0, path_1.join)(__dirname, "..", "artboard"),
                serveStaticOptions: {
                    maxAge: 31536000, // 1 year cache for artboard assets
                    immutable: true,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                renderPath: "/*",
                rootPath: (0, path_1.join)(__dirname, "..", "client"),
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
                provide: core_1.APP_PIPE,
                useClass: nestjs_zod_1.ZodValidationPipe,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useValue: new nest_raven_1.RavenInterceptor({
                    filters: [
                        // Filter all HttpException with status code <= 500
                        {
                            type: common_1.HttpException,
                            filter: (exception) => exception.getStatus() < 500,
                        },
                    ],
                }),
            },
        ],
        controllers: [email_controller_1.EmailController],
    })
], AppModule);


/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/serve-static");

/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("nest-raven");

/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var AuthModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(16);
const passport_1 = __webpack_require__(17);
const mail_module_1 = __webpack_require__(18);
const user_module_1 = __webpack_require__(23);
const user_service_1 = __webpack_require__(112);
const auth_controller_1 = __webpack_require__(114);
const auth_service_1 = __webpack_require__(108);
const dummy_strategy_1 = __webpack_require__(122);
const github_strategy_1 = __webpack_require__(124);
const google_strategy_1 = __webpack_require__(126);
const jwt_strategy_1 = __webpack_require__(128);
const local_strategy_1 = __webpack_require__(130);
const refresh_strategy_1 = __webpack_require__(132);
const two_factor_strategy_1 = __webpack_require__(133);
let AuthModule = AuthModule_1 = class AuthModule {
    static register() {
        return {
            module: AuthModule_1,
            imports: [passport_1.PassportModule, jwt_1.JwtModule, user_module_1.UserModule, mail_module_1.MailModule],
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy,
                refresh_strategy_1.RefreshStrategy,
                two_factor_strategy_1.TwoFactorStrategy,
                // OAuth2 Strategies
                {
                    provide: github_strategy_1.GitHubStrategy,
                    inject: [config_1.ConfigService, user_service_1.UserService],
                    useFactory: (configService, userService) => {
                        try {
                            const clientID = configService.getOrThrow("GITHUB_CLIENT_ID");
                            const clientSecret = configService.getOrThrow("GITHUB_CLIENT_SECRET");
                            const callbackURL = configService.getOrThrow("GITHUB_CALLBACK_URL");
                            return new github_strategy_1.GitHubStrategy(clientID, clientSecret, callbackURL, userService);
                        }
                        catch (error) {
                            return new dummy_strategy_1.DummyStrategy();
                        }
                    },
                },
                {
                    provide: google_strategy_1.GoogleStrategy,
                    inject: [config_1.ConfigService, user_service_1.UserService],
                    useFactory: (configService, userService) => {
                        try {
                            const clientID = configService.getOrThrow("GOOGLE_CLIENT_ID");
                            const clientSecret = configService.getOrThrow("GOOGLE_CLIENT_SECRET");
                            const callbackURL = configService.getOrThrow("GOOGLE_CALLBACK_URL");
                            return new google_strategy_1.GoogleStrategy(clientID, clientSecret, callbackURL, userService);
                        }
                        catch (error) {
                            return new dummy_strategy_1.DummyStrategy();
                        }
                    },
                },
            ],
            exports: [auth_service_1.AuthService],
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], AuthModule);


/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const mailer_1 = __webpack_require__(19);
const nodemailer = tslib_1.__importStar(__webpack_require__(20));
const mail_service_1 = __webpack_require__(21);
const email_templates_service_1 = __webpack_require__(22);
// Create a mock transporter that logs instead of sending
const emptyTransporter = nodemailer.createTransport({
    jsonTransport: true, // This makes it log instead of actually sending
});
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    console.log("[MailModule] ===== INITIALIZING MAIL MODULE =====");
                    // Hardcode Gmail SMTP settings to ensure they're always used
                    const smtpHost = configService.get("SMTP_HOST") || "smtp.gmail.com";
                    const smtpPort = configService.get("SMTP_PORT") || 465;
                    const smtpMail = configService.get("SMTP_MAIL");
                    const smtpPassword = configService.get("SMTP_PASSWORD");
                    const smtpService = configService.get("SMTP_SERVICE");
                    // Force use of Gmail SMTP if SMTP_SERVICE is gmail
                    const finalHost = smtpService === "gmail" ? "smtp.gmail.com" : smtpHost;
                    const finalPort = smtpService === "gmail" ? 465 : smtpPort;
                    console.log("[MailModule] Raw config values:");
                    console.log("  SMTP_HOST:", smtpHost || "not set");
                    console.log("  SMTP_PORT:", smtpPort || "not set");
                    console.log("  SMTP_MAIL:", smtpMail || "not set");
                    console.log("  SMTP_PASSWORD:", smtpPassword ? "***" : "not set");
                    console.log("  SMTP_SERVICE:", smtpService || "not set");
                    // Debug logging to verify configuration - always log to help diagnose issues
                    common_1.Logger.log(`SMTP Config Check - Host: ${smtpHost || "not set"}, Port: ${smtpPort || "not set"}, Mail: ${smtpMail ? "***" : "not set"}, Password: ${smtpPassword ? "***" : "not set"}, Service: ${smtpService || "not set"}`, "MailModule");
                    let transport;
                    // PRIORITY 1: If SMTP_SERVICE is "gmail", always use Gmail SMTP configuration
                    if (smtpService === "gmail" && smtpMail && smtpPassword) {
                        console.log("[MailModule] Gmail service detected - using explicit smtp.gmail.com:465");
                        const transportConfig = {
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                                user: smtpMail,
                                pass: smtpPassword,
                            },
                            tls: {
                                rejectUnauthorized: false,
                            },
                        };
                        console.log("[MailModule] Transport config:", {
                            host: transportConfig.host,
                            port: transportConfig.port,
                            secure: transportConfig.secure,
                            user: transportConfig.auth.user,
                            hasPassword: !!transportConfig.auth.pass
                        });
                        common_1.Logger.log(`Creating Gmail SMTP transport: Host: smtp.gmail.com, Port: 465, Secure: true, User: ${smtpMail}`, "MailModule");
                        // Pass the transport config directly to MailerModule instead of pre-creating
                        // This ensures MailerModule uses our configuration
                        transport = transportConfig;
                        console.log("[MailModule] Transport config passed directly to MailerModule");
                        // Verify the transport configuration
                        console.log("[MailModule] Transport config being passed:", {
                            host: transport.host || "N/A",
                            port: transport.port || "N/A",
                            secure: transport.secure !== undefined ? transport.secure : "N/A",
                            hasAuth: !!transport.auth
                        });
                    }
                    // PRIORITY 2: Use individual SMTP configuration (host/port) if provided
                    else if (finalHost && finalPort && smtpMail && smtpPassword) {
                        console.log("[MailModule] Using individual SMTP config");
                        console.log("  Host:", finalHost);
                        console.log("  Port:", finalPort);
                        console.log("  Mail:", smtpMail);
                        // Check if SMTP_HOST is localhost/127.0.0.1 - this usually means misconfiguration
                        const isLocalhost = finalHost === "localhost" ||
                            finalHost === "127.0.0.1" ||
                            finalHost === "::1" ||
                            finalHost.startsWith("127.");
                        if (isLocalhost) {
                            console.log("[MailModule] WARNING: SMTP_HOST is localhost - forcing Gmail SMTP");
                            // Force Gmail SMTP instead of using empty transporter
                            console.log("[MailModule] Overriding to use smtp.gmail.com:465");
                            const transportConfig = {
                                host: "smtp.gmail.com",
                                port: 465,
                                secure: true,
                                auth: {
                                    user: smtpMail,
                                    pass: smtpPassword,
                                },
                                tls: {
                                    rejectUnauthorized: false,
                                },
                            };
                            console.log("[MailModule] Transport config:", {
                                host: transportConfig.host,
                                port: transportConfig.port,
                                secure: transportConfig.secure,
                                user: transportConfig.auth.user,
                                hasPassword: !!transportConfig.auth.pass
                            });
                            common_1.Logger.log(`Creating SMTP transport: Host: smtp.gmail.com, Port: 465, Secure: true, User: ${smtpMail}`, "MailModule");
                            // Pass transport config directly to MailerModule
                            transport = transportConfig;
                            console.log("[MailModule] Transport config passed directly to MailerModule (localhost override)");
                        }
                        else {
                            console.log("[MailModule] Creating transport with host/port config");
                            const isSecure = finalPort === 465; // Port 465 uses SSL, 587 uses TLS
                            // For Gmail and other services, explicitly set host/port and DO NOT use 'service'
                            // This prevents nodemailer from overriding our settings with defaults
                            const transportConfig = {
                                host: finalHost,
                                port: Number(finalPort), // Ensure it's a number
                                secure: isSecure, // true for 465, false for other ports
                                auth: {
                                    user: smtpMail,
                                    pass: smtpPassword,
                                },
                            };
                            // For Gmail with port 465, ensure SSL is properly configured
                            if (isSecure) {
                                transportConfig.tls = {
                                    rejectUnauthorized: false, // Allow self-signed certificates if needed
                                };
                            }
                            else {
                                // For TLS (port 587)
                                transportConfig.requireTLS = true;
                                transportConfig.tls = {
                                    rejectUnauthorized: false,
                                };
                            }
                            console.log("[MailModule] Transport config:", {
                                host: transportConfig.host,
                                port: transportConfig.port,
                                secure: transportConfig.secure,
                                user: transportConfig.auth.user,
                                hasPassword: !!transportConfig.auth.pass
                            });
                            common_1.Logger.log(`Creating SMTP transport: Host: ${finalHost}, Port: ${finalPort}, Secure: ${isSecure}, User: ${smtpMail}`, "MailModule");
                            // Pass transport config directly to MailerModule
                            transport = transportConfig;
                            console.log("[MailModule] Transport config passed directly to MailerModule");
                        }
                    }
                    // PRIORITY 3: Use SMTP_SERVICE for other services
                    else if (smtpService && smtpMail && smtpPassword) {
                        console.log("[MailModule] Using SMTP_SERVICE:", smtpService);
                        console.log("  Mail:", smtpMail);
                        if (finalHost && finalPort) {
                            // For other services, use explicit host/port if available
                            console.log("[MailModule] Using explicit host/port config");
                            console.log("  Host:", finalHost);
                            console.log("  Port:", finalPort);
                            const isSecure = finalPort === 465;
                            const transportConfig = {
                                host: finalHost,
                                port: Number(finalPort),
                                secure: isSecure,
                                auth: {
                                    user: smtpMail,
                                    pass: smtpPassword,
                                },
                            };
                            if (isSecure) {
                                transportConfig.tls = {
                                    rejectUnauthorized: false,
                                };
                            }
                            else {
                                transportConfig.requireTLS = true;
                                transportConfig.tls = {
                                    rejectUnauthorized: false,
                                };
                            }
                            // Pass transport config directly to MailerModule
                            transport = transportConfig;
                            console.log("[MailModule] Transport config passed directly to MailerModule");
                        }
                        else {
                            // Use service-based config (nodemailer will use service defaults)
                            common_1.Logger.log(`Using SMTP service: ${smtpService} with email: ${smtpMail ? "***" : "not set"}`, "MailModule");
                            // Pass service config directly to MailerModule
                            transport = {
                                service: smtpService,
                                auth: {
                                    user: smtpMail,
                                    pass: smtpPassword,
                                },
                            };
                            console.log("[MailModule] Service-based transport config passed directly to MailerModule");
                        }
                    }
                    else {
                        console.log("[MailModule] No valid SMTP config - using empty transporter");
                        common_1.Logger.warn(`SMTP configuration incomplete. Required: SMTP_HOST, SMTP_PORT, SMTP_MAIL, SMTP_PASSWORD. Found - Host: ${smtpHost || "not set"}, Port: ${smtpPort || "not set"}, Mail: ${smtpMail ? "set" : "not set"}, Password: ${smtpPassword ? "set" : "not set"}`, "MailModule");
                        common_1.Logger.warn("Since SMTP configuration is not set, emails would be logged to the console instead. This is not recommended for production environments.", "MailModule");
                        transport = emptyTransporter;
                    }
                    // Final verification: ensure transport is properly configured
                    if (transport) {
                        // If transport is a config object (not a pre-created transporter)
                        if (typeof transport === 'object' && !transport.sendMail && transport.host) {
                            const finalConfig = transport;
                            console.log("[MailModule] Final transport configuration being returned:", {
                                host: finalConfig.host || "N/A",
                                port: finalConfig.port || "N/A",
                                secure: finalConfig.secure !== undefined ? finalConfig.secure : "N/A",
                                service: finalConfig.service || "N/A",
                                hasAuth: !!finalConfig.auth
                            });
                            // Warn if we detect localhost configuration
                            if (finalConfig.host && (finalConfig.host === "localhost" || finalConfig.host === "127.0.0.1" || finalConfig.host.startsWith("127."))) {
                                common_1.Logger.error(`CRITICAL: Transport is configured with localhost (${finalConfig.host}:${finalConfig.port}). This will not work!`, "MailModule");
                            }
                        }
                        else {
                            // If transport is a pre-created transporter
                            const finalConfig = transport.options || transport.transporter?.options || {};
                            console.log("[MailModule] Final transport configuration being returned:", {
                                host: finalConfig.host || "N/A",
                                port: finalConfig.port || "N/A",
                                secure: finalConfig.secure !== undefined ? finalConfig.secure : "N/A",
                                service: finalConfig.service || "N/A",
                                hasAuth: !!finalConfig.auth
                            });
                            // Warn if we detect localhost configuration
                            if (finalConfig.host && (finalConfig.host === "localhost" || finalConfig.host === "127.0.0.1" || finalConfig.host.startsWith("127."))) {
                                common_1.Logger.error(`CRITICAL: Transport is configured with localhost (${finalConfig.host}:${finalConfig.port}). This will not work!`, "MailModule");
                            }
                        }
                    }
                    return {
                        defaults: { from: smtpMail || "noreply@internvista.com" },
                        transport,
                    };
                },
            }),
        ],
        providers: [mail_service_1.MailService, email_templates_service_1.EmailTemplatesService],
        exports: [mail_service_1.MailService, email_templates_service_1.EmailTemplatesService],
    })
], MailModule);


/***/ }),
/* 19 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const mailer_1 = __webpack_require__(19);
const email_templates_service_1 = __webpack_require__(22);
/**
 * Mail Service
 * Handles sending emails via SMTP with proper error handling
 */
let MailService = class MailService {
    constructor(configService, mailerService, emailTemplates) {
        this.configService = configService;
        this.mailerService = mailerService;
        this.emailTemplates = emailTemplates;
    }
    /**
     * Check if SMTP is properly configured
     */
    isSmtpConfigured() {
        const smtpMail = this.configService.get("SMTP_MAIL");
        const smtpPassword = this.configService.get("SMTP_PASSWORD");
        const smtpService = this.configService.get("SMTP_SERVICE");
        console.log("[MailService] isSmtpConfigured - Checking config:");
        console.log("  SMTP_SERVICE:", smtpService || "not set");
        console.log("  SMTP_MAIL:", smtpMail || "not set");
        console.log("  SMTP_PASSWORD:", smtpPassword ? "***" : "not set");
        // Check if SMTP_SERVICE is configured (doesn't need host/port)
        if (smtpService && smtpMail && smtpPassword) {
            console.log("[MailService] SMTP configured via SMTP_SERVICE");
            return true;
        }
        // Check if individual SMTP config is set and not localhost (needs host/port)
        const smtpHost = this.configService.get("SMTP_HOST");
        const smtpPort = this.configService.get("SMTP_PORT");
        console.log("  SMTP_HOST:", smtpHost || "not set");
        console.log("  SMTP_PORT:", smtpPort || "not set");
        if (smtpHost && smtpPort && smtpMail && smtpPassword) {
            const isLocalhost = smtpHost === "localhost" ||
                smtpHost === "127.0.0.1" ||
                smtpHost === "::1" ||
                smtpHost.startsWith("127.");
            if (isLocalhost) {
                console.log("[MailService] SMTP_HOST is localhost - NOT configured");
                return false; // Localhost hosts are not valid SMTP configurations
            }
            console.log("[MailService] SMTP configured via individual config (host/port)");
            return true;
        }
        console.log("[MailService] SMTP NOT configured - missing required fields");
        return false;
    }
    /**
     * Send email with HTML and text support
     */
    async sendEmail(options) {
        console.log("[MailService] sendEmail called");
        console.log("  To:", options.to);
        console.log("  Subject:", options.subject);
        const isConfigured = this.isSmtpConfigured();
        console.log("[MailService] isSmtpConfigured result:", isConfigured);
        // Check the actual transport being used - try different ways to access it
        const mailerService = this.mailerService;
        console.log("[MailService] MailerService structure:", {
            hasTransporter: !!mailerService?.transporter,
            hasTransport: !!mailerService?.transport,
            keys: Object.keys(mailerService || {})
        });
        let transportOptions = {};
        const transporter = mailerService?.transporter || mailerService?.transport;
        if (transporter) {
            // Try different ways to access nodemailer transport options
            // Nodemailer stores options in different places depending on transport type
            const directOptions = transporter.options;
            const nestedOptions = transporter.transporter?.options;
            const smtpOptions = transporter.smtp?.options;
            transportOptions = directOptions || nestedOptions || smtpOptions || {};
            // Also try to get from the actual nodemailer transport
            if (transporter.transporter) {
                const nodemailerTransport = transporter.transporter;
                transportOptions = {
                    ...transportOptions,
                    host: nodemailerTransport.options?.host ||
                        nodemailerTransport.hostname ||
                        nodemailerTransport.host ||
                        transportOptions.host ||
                        "N/A",
                    port: nodemailerTransport.options?.port ||
                        nodemailerTransport.port ||
                        transportOptions.port ||
                        "N/A",
                    secure: nodemailerTransport.options?.secure !== undefined ?
                        nodemailerTransport.options.secure :
                        (nodemailerTransport.secure !== undefined ? nodemailerTransport.secure : transportOptions.secure),
                    service: nodemailerTransport.options?.service ||
                        nodemailerTransport.service ||
                        transportOptions.service ||
                        "N/A",
                };
            }
            // If we still don't have host, try to get it from the connection
            if (!transportOptions.host || transportOptions.host === "N/A") {
                const connection = transporter.connection || transporter.socket;
                if (connection) {
                    transportOptions.host = connection.hostname || connection.host || transportOptions.host || "N/A";
                    transportOptions.port = connection.port || transportOptions.port || "N/A";
                }
            }
        }
        console.log("[MailService] Current transport config:", {
            host: transportOptions.host || "N/A",
            port: transportOptions.port || "N/A",
            secure: transportOptions.secure !== undefined ? transportOptions.secure : "N/A",
            service: transportOptions.service || "N/A",
            auth: transportOptions.auth ? { user: transportOptions.auth.user || "N/A", hasPass: !!transportOptions.auth.pass } : "N/A"
        });
        // Warn if we detect localhost configuration
        if (transportOptions.host && transportOptions.host !== "N/A" &&
            (transportOptions.host === "localhost" || transportOptions.host === "127.0.0.1" || transportOptions.host.startsWith("127."))) {
            common_1.Logger.warn(`WARNING: Transport is configured with localhost (${transportOptions.host}:${transportOptions.port}). This will fail!`, "MailService#sendEmail");
        }
        try {
            console.log("[MailService] Attempting to send email via mailerService...");
            const result = await this.mailerService.sendMail(options);
            console.log("[MailService] Email sent successfully:", result);
            return result;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.log("[MailService] Error sending email:", errorMessage);
            console.log("[MailService] Full error:", error);
            // Check for connection errors (ECONNREFUSED, ETIMEDOUT, etc.)
            if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("ETIMEDOUT")) {
                common_1.Logger.warn(`SMTP connection failed for ${options.to}: ${errorMessage}. Falling back to console logging. To fix this, either: 1) Remove SMTP configuration to use console logging, or 2) Configure a proper SMTP server (e.g., Gmail, SendGrid, etc.)`, "MailService#sendEmail");
                // Log the email content as fallback
                const bodyPreview = options.text ||
                    (typeof options.html === 'string' ? options.html.substring(0, 100) :
                        options.html instanceof Buffer ? options.html.toString('utf8').substring(0, 100) :
                            "N/A");
                common_1.Logger.log(`[Email would be sent] To: ${options.to}, Subject: ${options.subject}, Body: ${bodyPreview}`, "MailService#sendEmail");
                // Return a mock response instead of throwing to prevent breaking the flow
                return {
                    messageId: "mock-message-id",
                    accepted: [options.to],
                    rejected: [],
                    pending: [],
                    response: "Email logged (SMTP connection failed)",
                };
            }
            else {
                common_1.Logger.error(`Failed to send email to ${options.to}: ${errorMessage}`, "MailService#sendEmail");
            }
            throw error;
        }
    }
    /**
     * Send verification email with HTML template
     */
    async sendVerificationEmail(email, name, verificationToken) {
        const template = this.emailTemplates.getVerificationEmailTemplate(name, email, verificationToken);
        await this.sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
            text: template.text,
        });
    }
    /**
     * Send welcome email with HTML template
     */
    async sendWelcomeEmail(email, name) {
        const template = this.emailTemplates.getWelcomeEmailTemplate(name, email);
        await this.sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
            text: template.text,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _b : Object, typeof (_c = typeof email_templates_service_1.EmailTemplatesService !== "undefined" && email_templates_service_1.EmailTemplatesService) === "function" ? _c : Object])
], MailService);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailTemplatesService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
/**
 * Email Templates Service
 * Provides HTML email templates for verification and welcome emails
 */
let EmailTemplatesService = class EmailTemplatesService {
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * Get the frontend URL for email links
     */
    getFrontendUrl() {
        const publicUrl = this.configService.get("PUBLIC_URL");
        const devClientUrl = this.configService.get("__DEV__CLIENT_URL");
        return publicUrl || devClientUrl || "http://localhost:5173";
    }
    /**
     * Base HTML email template wrapper
     */
    getBaseTemplate(content, subject) {
        const frontendUrl = this.getFrontendUrl();
        const appName = "InternVista"; // You can make this configurable
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-top: 1px solid #e9ecef;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .text-link {
      color: #667eea;
      word-break: break-all;
    }
    .expiration-notice {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px 16px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .expiration-notice p {
      margin: 0;
      font-size: 14px;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>${appName}</h1>
    </div>
    <div class="email-body">
      ${content}
    </div>
    <div class="email-footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      <p>If you have any questions, please contact our support team.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
    }
    /**
     * Generate verification email HTML template
     */
    getVerificationEmailTemplate(name, email, verificationToken) {
        const frontendUrl = this.getFrontendUrl();
        const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
        const htmlContent = `
      <h2>Hello ${name}!</h2>
      <p>Thank you for signing up for InternVista. To complete your registration, please verify your email address by clicking the button below:</p>
      
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${verificationUrl}" class="text-link">${verificationUrl}</a></p>
      
      <div class="expiration-notice">
        <p><strong>⏰ Important:</strong> This verification link will expire in 24 hours. Please verify your email as soon as possible.</p>
      </div>
      
      <p>If you didn't create an account with InternVista, you can safely ignore this email.</p>
    `;
        const textContent = `
Hello ${name}!

Thank you for signing up for InternVista. To complete your registration, please verify your email address by clicking the link below:

${verificationUrl}

Important: This verification link will expire in 24 hours. Please verify your email as soon as possible.

If you didn't create an account with InternVista, you can safely ignore this email.
    `.trim();
        return {
            subject: "Verify Your Email Address - InternVista",
            html: this.getBaseTemplate(htmlContent, "Verify Your Email Address"),
            text: textContent,
        };
    }
    /**
     * Generate welcome email HTML template
     */
    getWelcomeEmailTemplate(name, email) {
        const frontendUrl = this.getFrontendUrl();
        const loginUrl = `${frontendUrl}/auth/login`;
        const htmlContent = `
      <h2>Welcome to InternVista, ${name}! 🎉</h2>
      <p>Your email has been successfully verified. You're all set to start using InternVista!</p>
      
      <p>You can now log in to your account and start exploring all the features we have to offer.</p>
      
      <div style="text-align: center;">
        <a href="${loginUrl}" class="button">Log In to Your Account</a>
      </div>
      
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${loginUrl}" class="text-link">${loginUrl}</a></p>
      
      <p>If you have any questions or need help, don't hesitate to reach out to our support team.</p>
      
      <p>Best regards,<br>The InternVista Team</p>
    `;
        const textContent = `
Welcome to InternVista, ${name}!

Your email has been successfully verified. You're all set to start using InternVista!

You can now log in to your account:
${loginUrl}

If you have any questions or need help, don't hesitate to reach out to our support team.

Best regards,
The InternVista Team
    `.trim();
        return {
            subject: "Welcome to InternVista!",
            html: this.getBaseTemplate(htmlContent, "Welcome to InternVista"),
            text: textContent,
        };
    }
};
exports.EmailTemplatesService = EmailTemplatesService;
exports.EmailTemplatesService = EmailTemplatesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailTemplatesService);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_module_1 = __webpack_require__(15);
const storage_module_1 = __webpack_require__(24);
const user_controller_1 = __webpack_require__(34);
const user_service_1 = __webpack_require__(112);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule.register()), storage_module_1.StorageModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const nestjs_minio_client_1 = __webpack_require__(25);
const storage_controller_1 = __webpack_require__(26);
const storage_service_1 = __webpack_require__(30);
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_minio_client_1.MinioModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    endPoint: configService.getOrThrow("STORAGE_ENDPOINT"),
                    port: configService.getOrThrow("STORAGE_PORT"),
                    region: configService.get("STORAGE_REGION"),
                    accessKey: configService.getOrThrow("STORAGE_ACCESS_KEY"),
                    secretKey: configService.getOrThrow("STORAGE_SECRET_KEY"),
                    useSSL: configService.getOrThrow("STORAGE_USE_SSL"),
                }),
            }),
        ],
        controllers: [storage_controller_1.StorageController],
        providers: [storage_service_1.StorageService],
        exports: [storage_service_1.StorageService],
    })
], StorageModule);


/***/ }),
/* 25 */
/***/ ((module) => {

"use strict";
module.exports = require("nestjs-minio-client");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(27);
const swagger_1 = __webpack_require__(5);
const two_factor_guard_1 = __webpack_require__(28);
const user_decorator_1 = __webpack_require__(29);
const storage_service_1 = __webpack_require__(30);
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async uploadFile(userId, file) {
        if (!file.mimetype.startsWith("image")) {
            throw new common_1.BadRequestException("The file you uploaded doesn't seem to be an image, please upload a file that ends in .jp(e)g or .png.");
        }
        return this.storageService.uploadObject(userId, "pictures", file.buffer, userId);
    }
};
exports.StorageController = StorageController;
tslib_1.__decorate([
    (0, common_1.Put)("image"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, common_1.UploadedFile)("file")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "uploadFile", null);
exports.StorageController = StorageController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Storage"),
    (0, common_1.Controller)("storage"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _a : Object])
], StorageController);


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let TwoFactorGuard = class TwoFactorGuard extends (0, passport_1.AuthGuard)("two-factor") {
};
exports.TwoFactorGuard = TwoFactorGuard;
exports.TwoFactorGuard = TwoFactorGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TwoFactorGuard);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(2);
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var StorageService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const cuid2_1 = __webpack_require__(31);
const nestjs_redis_1 = __webpack_require__(32);
const nestjs_minio_client_1 = __webpack_require__(25);
const sharp_1 = tslib_1.__importDefault(__webpack_require__(33));
const PUBLIC_ACCESS_POLICY = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "PublicAccess",
            Effect: "Allow",
            Action: ["s3:GetObject"],
            Principal: { AWS: ["*"] },
            Resource: [
                "arn:aws:s3:::{{bucketName}}/*/pictures/*",
                "arn:aws:s3:::{{bucketName}}/*/previews/*",
                "arn:aws:s3:::{{bucketName}}/*/resumes/*",
            ],
        },
    ],
};
let StorageService = StorageService_1 = class StorageService {
    constructor(configService, minioService, redisService) {
        this.configService = configService;
        this.minioService = minioService;
        this.redisService = redisService;
        this.logger = new common_1.Logger(StorageService_1.name);
        this.redis = this.redisService.getClient();
    }
    async onModuleInit() {
        this.client = this.minioService.client;
        this.bucketName = this.configService.getOrThrow("STORAGE_BUCKET");
        this.skipCreateBucket = this.configService.getOrThrow("STORAGE_SKIP_CREATE_BUCKET");
        if (this.skipCreateBucket) {
            this.logger.log("Skipping the creation of the storage bucket.");
            this.logger.warn("Make sure that the following paths are publicly accessible: ");
            this.logger.warn("- /pictures/*");
            this.logger.warn("- /previews/*");
            this.logger.warn("- /resumes/*");
            return;
        }
        try {
            // Create a storage bucket if it doesn't exist
            // if it exists, log that we were able to connect to the storage service
            const bucketExists = await this.client.bucketExists(this.bucketName);
            if (!bucketExists) {
                const bucketPolicy = JSON.stringify(PUBLIC_ACCESS_POLICY).replace(/{{bucketName}}/g, this.bucketName);
                try {
                    await this.client.makeBucket(this.bucketName);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException("There was an error while creating the storage bucket.");
                }
                try {
                    await this.client.setBucketPolicy(this.bucketName, bucketPolicy);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException("There was an error while applying the policy to the storage bucket.");
                }
                this.logger.log("A new storage bucket has been created and the policy has been applied successfully.");
            }
            else {
                this.logger.log("Successfully connected to the storage service.");
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async bucketExists() {
        const exists = await this.client.bucketExists(this.bucketName);
        if (!exists) {
            throw new common_1.InternalServerErrorException("There was an error while checking if the storage bucket exists.");
        }
    }
    async uploadObject(userId, type, buffer, filename = (0, cuid2_1.createId)()) {
        const extension = type === "resumes" ? "pdf" : "jpg";
        const storageUrl = this.configService.get("STORAGE_URL");
        const filepath = `${userId}/${type}/${filename}.${extension}`;
        const url = `${storageUrl}/${filepath}`;
        const metadata = extension === "jpg"
            ? { "Content-Type": "image/jpeg" }
            : {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=${filename}.${extension}`,
            };
        try {
            if (extension === "jpg") {
                // If the uploaded file is an image, use sharp to resize the image to a maximum width/height of 600px
                buffer = await (0, sharp_1.default)(buffer)
                    .resize({ width: 600, height: 600, fit: sharp_1.default.fit.outside })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            }
            await Promise.all([
                this.client.putObject(this.bucketName, filepath, buffer, metadata),
                this.redis.set(`user:${userId}:storage:${type}:${filename}`, url),
            ]);
            return url;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("There was an error while uploading the file.");
        }
    }
    async deleteObject(userId, type, filename) {
        const extension = type === "resumes" ? "pdf" : "jpg";
        const path = `${userId}/${type}/${filename}.${extension}`;
        try {
            return await Promise.all([
                this.redis.del(`user:${userId}:storage:${type}:${filename}`),
                this.client.removeObject(this.bucketName, path),
            ]);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`There was an error while deleting the document at the specified path: ${path}.`);
        }
    }
    async deleteFolder(prefix) {
        const objectsList = [];
        const objectsStream = this.client.listObjectsV2(this.bucketName, prefix, true);
        for await (const object of objectsStream) {
            objectsList.push(object.name);
        }
        try {
            return await this.client.removeObjects(this.bucketName, objectsList);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`There was an error while deleting the folder at the specified path: ${this.bucketName}/${prefix}.`);
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof nestjs_minio_client_1.MinioService !== "undefined" && nestjs_minio_client_1.MinioService) === "function" ? _b : Object, typeof (_c = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _c : Object])
], StorageService);


/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
module.exports = require("@paralleldrive/cuid2");

/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
module.exports = require("@songkeys/nestjs-redis");

/***/ }),
/* 33 */
/***/ ((module) => {

"use strict";
module.exports = require("sharp");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(5);
const library_1 = __webpack_require__(35);
const dto_1 = __webpack_require__(36);
const utils_1 = __webpack_require__(81);
const auth_service_1 = __webpack_require__(108);
const two_factor_guard_1 = __webpack_require__(28);
const user_decorator_1 = __webpack_require__(29);
const user_service_1 = __webpack_require__(112);
let UserController = class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    fetch(user) {
        return user;
    }
    async update(email, updateUserDto) {
        try {
            // If user is updating their email, send a verification email
            if (updateUserDto.email && updateUserDto.email !== email) {
                await this.userService.updateByEmail(email, {
                    emailVerified: false,
                    email: updateUserDto.email,
                });
                await this.authService.sendVerificationEmail(updateUserDto.email);
                email = updateUserDto.email;
            }
            return await this.userService.updateByEmail(email, {
                name: updateUserDto.name,
                picture: updateUserDto.picture,
                username: updateUserDto.username,
                locale: updateUserDto.locale,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.UserAlreadyExists);
            }
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async delete(id, response) {
        await this.userService.deleteOneById(id);
        response.clearCookie("Authentication");
        response.clearCookie("Refresh");
        response.status(200).send({ message: "Sorry to see you go, goodbye!" });
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.UserDto !== "undefined" && dto_1.UserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "fetch", null);
tslib_1.__decorate([
    (0, common_1.Patch)("me"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("email")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)("me"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Controller)("user"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], UserController);


/***/ }),
/* 35 */
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/library");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(107), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(77), exports);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgotPasswordDto = exports.forgotPasswordSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.forgotPasswordSchema = z_1.z.object({ email: z_1.z.string().email() });
class ForgotPasswordDto extends (0, dto_1.createZodDto)(exports.forgotPasswordSchema) {
}
exports.ForgotPasswordDto = ForgotPasswordDto;


/***/ }),
/* 39 */
/***/ ((module) => {

"use strict";
module.exports = require("nestjs-zod/dto");

/***/ }),
/* 40 */
/***/ ((module) => {

"use strict";
module.exports = require("nestjs-zod/z");

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = exports.loginSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const user_1 = __webpack_require__(42);
exports.loginSchema = z_1.z
    .object({
    identifier: z_1.z.string(),
    password: z_1.z.password().min(6),
})
    .refine((value) => {
    if (value.identifier.includes("@")) {
        return z_1.z.string().email().parse(value.identifier);
    }
    else {
        return user_1.usernameSchema.parse(value.identifier);
    }
}, { message: "InvalidCredentials" });
class LoginDto extends (0, dto_1.createZodDto)(exports.loginSchema) {
}
exports.LoginDto = LoginDto;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.updateUserSchema = void 0;
const dto_1 = __webpack_require__(39);
const user_1 = __webpack_require__(44);
exports.updateUserSchema = user_1.userSchema.partial().pick({
    name: true,
    locale: true,
    username: true,
    email: true,
    picture: true,
});
class UpdateUserDto extends (0, dto_1.createZodDto)(exports.updateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserWithSecrets = exports.userWithSecretsSchema = exports.UserDto = exports.userSchema = exports.usernameSchema = void 0;
const schema_1 = __webpack_require__(45);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const secrets_1 = __webpack_require__(69);
exports.usernameSchema = z_1.z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9._-]+$/, {
    message: "Usernames can only contain lowercase letters, numbers, periods, hyphens, and underscores.",
});
exports.userSchema = z_1.z.object({
    id: schema_1.idSchema,
    name: z_1.z.string().min(3).max(255),
    picture: z_1.z.literal("").or(z_1.z.null()).or(z_1.z.string().url()),
    username: exports.usernameSchema,
    email: z_1.z.string().email(),
    locale: z_1.z.string().default("en-US"),
    emailVerified: z_1.z.boolean().default(false),
    twoFactorEnabled: z_1.z.boolean().default(false),
    provider: z_1.z.enum(["email", "github", "google"]).default("email"),
    createdAt: z_1.z.date().or(z_1.z.dateString()),
    updatedAt: z_1.z.date().or(z_1.z.dateString()),
});
class UserDto extends (0, dto_1.createZodDto)(exports.userSchema) {
}
exports.UserDto = UserDto;
exports.userWithSecretsSchema = exports.userSchema.merge(z_1.z.object({ secrets: secrets_1.secretsSchema }));
class UserWithSecrets extends (0, dto_1.createZodDto)(exports.userWithSecretsSchema) {
}
exports.UserWithSecrets = UserWithSecrets;


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultResumeData = exports.resumeDataSchema = void 0;
const tslib_1 = __webpack_require__(1);
const zod_1 = __webpack_require__(46);
const basics_1 = __webpack_require__(47);
const metadata_1 = __webpack_require__(53);
const sections_1 = __webpack_require__(54);
// Schema
exports.resumeDataSchema = zod_1.z.object({
    basics: basics_1.basicsSchema,
    sections: sections_1.sectionsSchema,
    metadata: metadata_1.metadataSchema,
});
// Defaults
exports.defaultResumeData = {
    basics: basics_1.defaultBasics,
    sections: sections_1.defaultSections,
    metadata: metadata_1.defaultMetadata,
};
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 46 */
/***/ ((module) => {

"use strict";
module.exports = require("zod");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultBasics = exports.basicsSchema = void 0;
const tslib_1 = __webpack_require__(1);
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
const custom_1 = __webpack_require__(52);
// Schema
exports.basicsSchema = zod_1.z.object({
    name: zod_1.z.string(),
    headline: zod_1.z.string(),
    email: zod_1.z.literal("").or(zod_1.z.string().email()),
    phone: zod_1.z.string(),
    location: zod_1.z.string(),
    url: shared_1.urlSchema,
    customFields: zod_1.z.array(custom_1.customFieldSchema),
    picture: zod_1.z.object({
        url: zod_1.z.string(),
        size: zod_1.z.number().default(64),
        aspectRatio: zod_1.z.number().default(1),
        borderRadius: zod_1.z.number().default(0),
        effects: zod_1.z.object({
            hidden: zod_1.z.boolean().default(false),
            border: zod_1.z.boolean().default(false),
            grayscale: zod_1.z.boolean().default(false),
        }),
    }),
});
// Defaults
exports.defaultBasics = {
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    url: shared_1.defaultUrl,
    customFields: [],
    picture: {
        url: "",
        size: 64,
        aspectRatio: 1,
        borderRadius: 0,
        effects: {
            hidden: false,
            border: false,
            grayscale: false,
        },
    },
};
tslib_1.__exportStar(__webpack_require__(52), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.idSchema = void 0;
const cuid2_1 = __webpack_require__(31);
const zod_1 = __webpack_require__(46);
exports.idSchema = zod_1.z
    .string()
    .cuid2()
    .default((0, cuid2_1.createId)())
    .describe("Unique identifier for the item in Cuid2 format");


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultItem = exports.itemSchema = void 0;
const zod_1 = __webpack_require__(46);
const id_1 = __webpack_require__(49);
// Schema
exports.itemSchema = zod_1.z.object({
    id: id_1.idSchema,
    visible: zod_1.z.boolean(),
});
// Defaults
exports.defaultItem = {
    id: "",
    visible: true,
};


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultUrl = exports.urlSchema = void 0;
const zod_1 = __webpack_require__(46);
// Schema
exports.urlSchema = zod_1.z.object({
    label: zod_1.z.string(),
    href: zod_1.z.literal("").or(zod_1.z.string().url()),
});
// Defaults
exports.defaultUrl = {
    label: "",
    href: "",
};


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.customFieldsDefault = exports.customFieldSchema = void 0;
const zod_1 = __webpack_require__(46);
exports.customFieldSchema = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    icon: zod_1.z.string(),
    name: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.customFieldsDefault = [];


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultMetadata = exports.metadataSchema = exports.defaultLayout = void 0;
const zod_1 = __webpack_require__(46);
exports.defaultLayout = [
    [
        ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
        ["skills", "interests", "certifications", "awards", "publications", "languages"],
    ],
];
// Schema
exports.metadataSchema = zod_1.z.object({
    template: zod_1.z.string().default("rhyhorn"),
    layout: zod_1.z.array(zod_1.z.array(zod_1.z.array(zod_1.z.string()))).default(exports.defaultLayout), // pages -> columns -> sections
    css: zod_1.z.object({
        value: zod_1.z.string().default(".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}"),
        visible: zod_1.z.boolean().default(false),
    }),
    page: zod_1.z.object({
        margin: zod_1.z.number().default(18),
        format: zod_1.z.enum(["a4", "letter"]).default("a4"),
        options: zod_1.z.object({
            breakLine: zod_1.z.boolean().default(true),
            pageNumbers: zod_1.z.boolean().default(true),
        }),
    }),
    theme: zod_1.z.object({
        background: zod_1.z.string().default("#ffffff"),
        text: zod_1.z.string().default("#000000"),
        primary: zod_1.z.string().default("#dc2626"),
    }),
    typography: zod_1.z.object({
        font: zod_1.z.object({
            family: zod_1.z.string().default("IBM Plex Serif"),
            subset: zod_1.z.string().default("latin"),
            variants: zod_1.z.array(zod_1.z.string()).default(["regular"]),
            size: zod_1.z.number().default(14),
        }),
        lineHeight: zod_1.z.number().default(1.5),
        hideIcons: zod_1.z.boolean().default(false),
        underlineLinks: zod_1.z.boolean().default(true),
    }),
    notes: zod_1.z.string().default(""),
});
// Defaults
exports.defaultMetadata = {
    template: "rhyhorn",
    layout: exports.defaultLayout,
    css: {
        value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
        visible: false,
    },
    page: {
        margin: 18,
        format: "a4",
        options: {
            breakLine: true,
            pageNumbers: true,
        },
    },
    theme: {
        background: "#ffffff",
        text: "#000000",
        primary: "#dc2626",
    },
    typography: {
        font: {
            family: "IBM Plex Serif",
            subset: "latin",
            variants: ["regular", "italic", "600"],
            size: 14,
        },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true,
    },
    notes: "",
};


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultSections = exports.defaultSection = exports.sectionsSchema = exports.customSchema = exports.sectionSchema = void 0;
const tslib_1 = __webpack_require__(1);
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
const award_1 = __webpack_require__(55);
const certification_1 = __webpack_require__(56);
const custom_section_1 = __webpack_require__(57);
const education_1 = __webpack_require__(58);
const experience_1 = __webpack_require__(59);
const interest_1 = __webpack_require__(60);
const language_1 = __webpack_require__(61);
const profile_1 = __webpack_require__(62);
const project_1 = __webpack_require__(63);
const publication_1 = __webpack_require__(64);
const reference_1 = __webpack_require__(65);
const skill_1 = __webpack_require__(66);
const volunteer_1 = __webpack_require__(67);
// Schema
exports.sectionSchema = zod_1.z.object({
    name: zod_1.z.string(),
    columns: zod_1.z.number().min(1).max(5).default(1),
    visible: zod_1.z.boolean().default(true),
});
// Schema
exports.customSchema = exports.sectionSchema.extend({
    id: shared_1.idSchema,
    items: zod_1.z.array(custom_section_1.customSectionSchema),
});
exports.sectionsSchema = zod_1.z.object({
    summary: exports.sectionSchema.extend({
        id: zod_1.z.literal("summary"),
        content: zod_1.z.string().default(""),
    }),
    awards: exports.sectionSchema.extend({
        id: zod_1.z.literal("awards"),
        items: zod_1.z.array(award_1.awardSchema),
    }),
    certifications: exports.sectionSchema.extend({
        id: zod_1.z.literal("certifications"),
        items: zod_1.z.array(certification_1.certificationSchema),
    }),
    education: exports.sectionSchema.extend({
        id: zod_1.z.literal("education"),
        items: zod_1.z.array(education_1.educationSchema),
    }),
    experience: exports.sectionSchema.extend({
        id: zod_1.z.literal("experience"),
        items: zod_1.z.array(experience_1.experienceSchema),
    }),
    volunteer: exports.sectionSchema.extend({
        id: zod_1.z.literal("volunteer"),
        items: zod_1.z.array(volunteer_1.volunteerSchema),
    }),
    interests: exports.sectionSchema.extend({
        id: zod_1.z.literal("interests"),
        items: zod_1.z.array(interest_1.interestSchema),
    }),
    languages: exports.sectionSchema.extend({
        id: zod_1.z.literal("languages"),
        items: zod_1.z.array(language_1.languageSchema),
    }),
    profiles: exports.sectionSchema.extend({
        id: zod_1.z.literal("profiles"),
        items: zod_1.z.array(profile_1.profileSchema),
    }),
    projects: exports.sectionSchema.extend({
        id: zod_1.z.literal("projects"),
        items: zod_1.z.array(project_1.projectSchema),
    }),
    publications: exports.sectionSchema.extend({
        id: zod_1.z.literal("publications"),
        items: zod_1.z.array(publication_1.publicationSchema),
    }),
    references: exports.sectionSchema.extend({
        id: zod_1.z.literal("references"),
        items: zod_1.z.array(reference_1.referenceSchema),
    }),
    skills: exports.sectionSchema.extend({
        id: zod_1.z.literal("skills"),
        items: zod_1.z.array(skill_1.skillSchema),
    }),
    custom: zod_1.z.record(zod_1.z.string(), exports.customSchema),
});
// Defaults
exports.defaultSection = {
    name: "",
    columns: 1,
    visible: true,
};
exports.defaultSections = {
    summary: { ...exports.defaultSection, id: "summary", name: "Summary", content: "" },
    awards: { ...exports.defaultSection, id: "awards", name: "Awards", items: [] },
    certifications: { ...exports.defaultSection, id: "certifications", name: "Certifications", items: [] },
    education: { ...exports.defaultSection, id: "education", name: "Education", items: [] },
    experience: { ...exports.defaultSection, id: "experience", name: "Experience", items: [] },
    volunteer: { ...exports.defaultSection, id: "volunteer", name: "Volunteering", items: [] },
    interests: { ...exports.defaultSection, id: "interests", name: "Interests", items: [] },
    languages: { ...exports.defaultSection, id: "languages", name: "Languages", items: [] },
    profiles: { ...exports.defaultSection, id: "profiles", name: "Profiles", items: [] },
    projects: { ...exports.defaultSection, id: "projects", name: "Projects", items: [] },
    publications: { ...exports.defaultSection, id: "publications", name: "Publications", items: [] },
    references: { ...exports.defaultSection, id: "references", name: "References", items: [] },
    skills: { ...exports.defaultSection, id: "skills", name: "Skills", items: [] },
    custom: {},
};
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultAward = exports.awardSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.awardSchema = shared_1.itemSchema.extend({
    title: zod_1.z.string().min(1),
    awarder: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultAward = {
    ...shared_1.defaultItem,
    title: "",
    awarder: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultCertification = exports.certificationSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.certificationSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    issuer: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultCertification = {
    ...shared_1.defaultItem,
    name: "",
    issuer: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultCustomSection = exports.customSectionSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.customSectionSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    location: zod_1.z.string(),
    summary: zod_1.z.string(),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultCustomSection = {
    ...shared_1.defaultItem,
    name: "",
    description: "",
    date: "",
    location: "",
    summary: "",
    keywords: [],
    url: shared_1.defaultUrl,
};


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultEducation = exports.educationSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.educationSchema = shared_1.itemSchema.extend({
    institution: zod_1.z.string().min(1),
    studyType: zod_1.z.string(),
    area: zod_1.z.string(),
    score: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultEducation = {
    ...shared_1.defaultItem,
    id: "",
    institution: "",
    studyType: "",
    area: "",
    score: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultExperience = exports.experienceSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.experienceSchema = shared_1.itemSchema.extend({
    company: zod_1.z.string().min(1),
    position: zod_1.z.string(),
    location: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultExperience = {
    ...shared_1.defaultItem,
    company: "",
    position: "",
    location: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultInterest = exports.interestSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.interestSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
});
// Defaults
exports.defaultInterest = {
    ...shared_1.defaultItem,
    name: "",
    keywords: [],
};


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultLanguage = exports.languageSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.languageSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    level: zod_1.z.number().min(0).max(5).default(1),
});
// Defaults
exports.defaultLanguage = {
    ...shared_1.defaultItem,
    name: "",
    description: "",
    level: 1,
};


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultProfile = exports.profileSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.profileSchema = shared_1.itemSchema.extend({
    network: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    icon: zod_1.z
        .string()
        .describe('Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultProfile = {
    ...shared_1.defaultItem,
    network: "",
    username: "",
    icon: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultProject = exports.projectSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.projectSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultProject = {
    ...shared_1.defaultItem,
    name: "",
    description: "",
    date: "",
    summary: "",
    keywords: [],
    url: shared_1.defaultUrl,
};


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultPublication = exports.publicationSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.publicationSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    publisher: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultPublication = {
    ...shared_1.defaultItem,
    name: "",
    publisher: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultReference = exports.referenceSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.referenceSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultReference = {
    ...shared_1.defaultItem,
    name: "",
    description: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultSkill = exports.skillSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.skillSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    level: zod_1.z.number().min(0).max(5).default(1),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
});
// Defaults
exports.defaultSkill = {
    ...shared_1.defaultItem,
    name: "",
    description: "",
    level: 1,
    keywords: [],
};


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultVolunteer = exports.volunteerSchema = void 0;
const zod_1 = __webpack_require__(46);
const shared_1 = __webpack_require__(48);
// Schema
exports.volunteerSchema = shared_1.itemSchema.extend({
    organization: zod_1.z.string().min(1),
    position: zod_1.z.string(),
    location: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultVolunteer = {
    ...shared_1.defaultItem,
    organization: "",
    position: "",
    location: "",
    date: "",
    summary: "",
    url: shared_1.defaultUrl,
};


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sampleResume = void 0;
exports.sampleResume = {
    basics: {
        name: "John Doe",
        headline: "Creative and Innovative Web Developer",
        email: "john.doe@gmail.com",
        phone: "(555) 123-4567",
        location: "Pleasantville, CA 94588",
        url: {
            label: "",
            href: "https://johndoe.me/",
        },
        customFields: [],
        picture: {
            url: "https://i.imgur.com/HgwyOuJ.jpg",
            size: 120,
            aspectRatio: 1,
            borderRadius: 0,
            effects: {
                hidden: false,
                border: false,
                grayscale: false,
            },
        },
    },
    sections: {
        summary: {
            name: "Summary",
            columns: 1,
            visible: true,
            id: "summary",
            content: "<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>",
        },
        awards: {
            name: "Awards",
            columns: 1,
            visible: true,
            id: "awards",
            items: [],
        },
        certifications: {
            name: "Certifications",
            columns: 1,
            visible: true,
            id: "certifications",
            items: [
                {
                    id: "spdhh9rrqi1gvj0yqnbqunlo",
                    visible: true,
                    name: "Full-Stack Web Development",
                    issuer: "CodeAcademy",
                    date: "2020",
                    summary: "",
                    url: {
                        label: "",
                        href: "",
                    },
                },
                {
                    id: "n838rddyqv47zexn6cxauwqp",
                    visible: true,
                    name: "AWS Certified Developer",
                    issuer: "Amazon Web Services",
                    date: "2019",
                    summary: "",
                    url: {
                        label: "",
                        href: "",
                    },
                },
            ],
        },
        education: {
            name: "Education",
            columns: 1,
            visible: true,
            id: "education",
            items: [
                {
                    id: "yo3p200zo45c6cdqc6a2vtt3",
                    visible: true,
                    institution: "University of California",
                    studyType: "Bachelor's in Computer Science",
                    area: "Berkeley, CA",
                    score: "",
                    date: "August 2012 to May 2016",
                    summary: "",
                    url: {
                        label: "",
                        href: "",
                    },
                },
            ],
        },
        experience: {
            name: "Experience",
            columns: 1,
            visible: true,
            id: "experience",
            items: [
                {
                    id: "lhw25d7gf32wgdfpsktf6e0x",
                    visible: true,
                    company: "Creative Solutions Inc.",
                    position: "Senior Web Developer",
                    location: "San Francisco, CA",
                    date: "January 2019 to Present",
                    summary: "<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>",
                    url: {
                        label: "",
                        href: "https://creativesolutions.inc/",
                    },
                },
                {
                    id: "r6543lil53ntrxmvel53gbtm",
                    visible: true,
                    company: "TechAdvancers",
                    position: "Web Developer",
                    location: "San Jose, CA",
                    date: "June 2016 to December 2018",
                    summary: "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
                    url: {
                        label: "",
                        href: "https://techadvancers.com/",
                    },
                },
            ],
        },
        volunteer: {
            name: "Volunteering",
            columns: 1,
            visible: true,
            id: "volunteer",
            items: [],
        },
        interests: {
            name: "Interests",
            columns: 1,
            visible: true,
            id: "interests",
            items: [],
        },
        languages: {
            name: "Languages",
            columns: 1,
            visible: true,
            id: "languages",
            items: [],
        },
        profiles: {
            name: "Profiles",
            columns: 1,
            visible: true,
            id: "profiles",
            items: [
                {
                    id: "cnbk5f0aeqvhx69ebk7hktwd",
                    visible: true,
                    network: "LinkedIn",
                    username: "johndoe",
                    icon: "linkedin",
                    url: {
                        label: "",
                        href: "https://linkedin.com/in/johndoe",
                    },
                },
                {
                    id: "ukl0uecvzkgm27mlye0wazlb",
                    visible: true,
                    network: "GitHub",
                    username: "johndoe",
                    icon: "github",
                    url: {
                        label: "",
                        href: "https://github.com/johndoe",
                    },
                },
            ],
        },
        projects: {
            name: "Projects",
            columns: 1,
            visible: true,
            id: "projects",
            items: [
                {
                    id: "yw843emozcth8s1ubi1ubvlf",
                    visible: true,
                    name: "E-Commerce Platform",
                    description: "Project Lead",
                    date: "",
                    summary: "<p>Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.</p>",
                    keywords: [],
                    url: {
                        label: "",
                        href: "",
                    },
                },
                {
                    id: "ncxgdjjky54gh59iz2t1xi1v",
                    visible: true,
                    name: "Interactive Dashboard",
                    description: "Frontend Developer",
                    date: "",
                    summary: "<p>Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.</p>",
                    keywords: [],
                    url: {
                        label: "",
                        href: "",
                    },
                },
            ],
        },
        publications: {
            name: "Publications",
            columns: 1,
            visible: true,
            id: "publications",
            items: [],
        },
        references: {
            name: "References",
            columns: 1,
            visible: false,
            id: "references",
            items: [
                {
                    id: "f2sv5z0cce6ztjl87yuk8fak",
                    visible: true,
                    name: "Available upon request",
                    description: "",
                    summary: "",
                    url: {
                        label: "",
                        href: "",
                    },
                },
            ],
        },
        skills: {
            name: "Skills",
            columns: 1,
            visible: true,
            id: "skills",
            items: [
                {
                    id: "hn0keriukh6c0ojktl9gsgjm",
                    visible: true,
                    name: "Web Technologies",
                    description: "Advanced",
                    level: 0,
                    keywords: ["HTML5", "JavaScript", "PHP", "Python"],
                },
                {
                    id: "r8c3y47vykausqrgmzwg5pur",
                    visible: true,
                    name: "Web Frameworks",
                    description: "Intermediate",
                    level: 0,
                    keywords: ["React.js", "Angular", "Vue.js", "Laravel", "Django"],
                },
                {
                    id: "b5l75aseexqv17quvqgh73fe",
                    visible: true,
                    name: "Tools",
                    description: "Intermediate",
                    level: 0,
                    keywords: ["Webpack", "Git", "Jenkins", "Docker", "JIRA"],
                },
            ],
        },
        custom: {},
    },
    metadata: {
        template: "glalie",
        layout: [
            [
                ["summary", "experience", "education", "projects", "references"],
                [
                    "profiles",
                    "skills",
                    "certifications",
                    "interests",
                    "languages",
                    "awards",
                    "volunteer",
                    "publications",
                ],
            ],
        ],
        css: {
            value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
            visible: false,
        },
        page: {
            margin: 14,
            format: "a4",
            options: {
                breakLine: true,
                pageNumbers: true,
            },
        },
        theme: {
            background: "#ffffff",
            text: "#000000",
            primary: "#ca8a04",
        },
        typography: {
            font: {
                family: "Merriweather",
                subset: "latin",
                variants: ["regular"],
                size: 13,
            },
            lineHeight: 1.75,
            hideIcons: false,
            underlineLinks: true,
        },
        notes: "",
    },
};


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(70), exports);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecretsDto = exports.secretsSchema = void 0;
const schema_1 = __webpack_require__(45);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.secretsSchema = z_1.z.object({
    id: schema_1.idSchema,
    password: z_1.z.string().nullable(),
    lastSignedIn: z_1.z.date().nullable(),
    verificationToken: z_1.z.string().nullable(),
    twoFactorSecret: z_1.z.string().nullable(),
    twoFactorBackupCodes: z_1.z.array(z_1.z.string()).default([]),
    refreshToken: z_1.z.string().nullable(),
    resetToken: z_1.z.string().nullable(),
    userId: schema_1.idSchema,
});
class SecretsDto extends (0, dto_1.createZodDto)(exports.secretsSchema) {
}
exports.SecretsDto = SecretsDto;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDto = exports.messageSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.messageSchema = z_1.z.object({ message: z_1.z.string() });
class MessageDto extends (0, dto_1.createZodDto)(exports.messageSchema) {
}
exports.MessageDto = MessageDto;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthProvidersDto = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const authProvidersSchema = z_1.z.array(z_1.z.enum(["email", "github", "google"]));
class AuthProvidersDto extends (0, dto_1.createZodDto)(authProvidersSchema) {
}
exports.AuthProvidersDto = AuthProvidersDto;


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = exports.registerSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const user_1 = __webpack_require__(42);
exports.registerSchema = user_1.userSchema
    .pick({ name: true, email: true, username: true, locale: true })
    .extend({ password: z_1.z.password().min(6) });
class RegisterDto extends (0, dto_1.createZodDto)(exports.registerSchema) {
}
exports.RegisterDto = RegisterDto;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = exports.resetPasswordSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.resetPasswordSchema = z_1.z.object({
    token: z_1.z.string(),
    password: z_1.z.password().min(6),
});
class ResetPasswordDto extends (0, dto_1.createZodDto)(exports.resetPasswordSchema) {
}
exports.ResetPasswordDto = ResetPasswordDto;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResponseDto = exports.authResponseSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const user_1 = __webpack_require__(42);
exports.authResponseSchema = z_1.z.object({
    status: z_1.z.enum(["authenticated", "2fa_required"]),
    user: user_1.userSchema,
});
class AuthResponseDto extends (0, dto_1.createZodDto)(exports.authResponseSchema) {
}
exports.AuthResponseDto = AuthResponseDto;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorBackupDto = exports.twoFactorBackupSchema = exports.BackupCodesDto = exports.backupCodesSchema = exports.TwoFactorDto = exports.twoFactorSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.twoFactorSchema = z_1.z.object({
    code: z_1.z
        .string()
        .length(6)
        .regex(/^[0-9]+$/, { message: "code must be a 6 digit number" }),
});
class TwoFactorDto extends (0, dto_1.createZodDto)(exports.twoFactorSchema) {
}
exports.TwoFactorDto = TwoFactorDto;
exports.backupCodesSchema = z_1.z.object({
    backupCodes: z_1.z.array(z_1.z.string().length(10)),
});
class BackupCodesDto extends (0, dto_1.createZodDto)(exports.backupCodesSchema) {
}
exports.BackupCodesDto = BackupCodesDto;
exports.twoFactorBackupSchema = z_1.z.object({
    code: z_1.z.string().length(10),
});
class TwoFactorBackupDto extends (0, dto_1.createZodDto)(exports.twoFactorBackupSchema) {
}
exports.TwoFactorBackupDto = TwoFactorBackupDto;


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePasswordDto = exports.updatePasswordSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.updatePasswordSchema = z_1.z.object({
    password: z_1.z.string().min(6),
});
class UpdatePasswordDto extends (0, dto_1.createZodDto)(exports.updatePasswordSchema) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributorDto = exports.contributorSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.contributorSchema = z_1.z.object({
    id: z_1.z.number(),
    name: z_1.z.string(),
    url: z_1.z.string(),
    avatar: z_1.z.string(),
});
class ContributorDto extends (0, dto_1.createZodDto)(exports.contributorSchema) {
}
exports.ContributorDto = ContributorDto;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(80), exports);
tslib_1.__exportStar(__webpack_require__(102), exports);
tslib_1.__exportStar(__webpack_require__(103), exports);
tslib_1.__exportStar(__webpack_require__(104), exports);
tslib_1.__exportStar(__webpack_require__(105), exports);
tslib_1.__exportStar(__webpack_require__(106), exports);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateResumeDto = exports.createResumeSchema = void 0;
const utils_1 = __webpack_require__(81);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.createResumeSchema = z_1.z.object({
    title: z_1.z.string().min(1),
    slug: z_1.z.string().min(1).transform(utils_1.kebabCase),
    visibility: z_1.z.enum(["public", "private"]).default("private"),
});
class CreateResumeDto extends (0, dto_1.createZodDto)(exports.createResumeSchema) {
}
exports.CreateResumeDto = CreateResumeDto;


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(82), exports);
tslib_1.__exportStar(__webpack_require__(83), exports);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(86), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);
tslib_1.__exportStar(__webpack_require__(93), exports);
tslib_1.__exportStar(__webpack_require__(94), exports);
tslib_1.__exportStar(__webpack_require__(95), exports);
tslib_1.__exportStar(__webpack_require__(97), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);
tslib_1.__exportStar(__webpack_require__(101), exports);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moveItemInLayout = exports.removeItemInLayout = exports.findItemInLayout = void 0;
// Function to find a specific item in a layout
const findItemInLayout = (item, layout) => {
    for (let page = 0; page < layout.length; page++) {
        for (let column = 0; column < layout[page].length; column++) {
            for (let section = 0; section < layout[page][column].length; section++) {
                if (layout[page][column][section] === item) {
                    return { page, column, section };
                }
            }
        }
    }
    return null;
};
exports.findItemInLayout = findItemInLayout;
// Function to remove a specific item in a layout
const removeItemInLayout = (item, layout) => {
    const locator = (0, exports.findItemInLayout)(item, layout);
    if (locator) {
        layout[locator.page][locator.column].splice(locator.section, 1);
    }
    return locator;
};
exports.removeItemInLayout = removeItemInLayout;
// Function to move an item within a layout
const moveItemInLayout = (current, target, layout) => {
    try {
        // Create a deep copy of the layout to avoid mutating the original array
        const newLayout = JSON.parse(JSON.stringify(layout));
        // Get the item from the current location
        const item = newLayout[current.page][current.column][current.section];
        // Remove the item from the current location
        newLayout[current.page][current.column].splice(current.section, 1);
        // Insert the item at the target location
        newLayout[target.page][target.column].splice(target.section, 0, item);
        return newLayout;
    }
    catch (error) {
        return layout;
    }
};
exports.moveItemInLayout = moveItemInLayout;


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hexToRgb = void 0;
const hexToRgb = (hex, alpha = 0) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    else {
        return `rgb(${r}, ${g}, ${b})`;
    }
};
exports.hexToRgb = hexToRgb;


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseArrayLikeCSVEntry = exports.parseCSV = void 0;
const tslib_1 = __webpack_require__(1);
const papaparse_1 = tslib_1.__importDefault(__webpack_require__(85));
const parseCSV = async (string) => {
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(string, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
        });
    });
};
exports.parseCSV = parseCSV;
/**
 * Parser for cases when we receive an array like structure f.e. a in the LinkedIn Profile.csv import
 * @param csvEntry array-like entry such as [TAG:https://some.link,TAG:https://someother.link]
 * @returns
 */
const parseArrayLikeCSVEntry = (csvEntry) => csvEntry.replace(/^\[/, "").replace(/$\]/, "").split(",");
exports.parseArrayLikeCSVEntry = parseArrayLikeCSVEntry;


/***/ }),
/* 85 */
/***/ ((module) => {

"use strict";
module.exports = require("papaparse");

/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deepSearchAndParseDates = exports.sortByDate = void 0;
const tslib_1 = __webpack_require__(1);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(87));
const sortByDate = (a, b, key, desc = true) => {
    if (!a[key] || !b[key])
        return 0;
    if (!(a[key] instanceof Date) || !(b[key] instanceof Date))
        return 0;
    if ((0, dayjs_1.default)(a[key]).isSame((0, dayjs_1.default)(b[key])))
        return 0;
    if (desc)
        return (0, dayjs_1.default)(a[key]).isBefore((0, dayjs_1.default)(b[key])) ? 1 : -1;
    else
        return (0, dayjs_1.default)(a[key]).isBefore((0, dayjs_1.default)(b[key])) ? -1 : 1;
};
exports.sortByDate = sortByDate;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepSearchAndParseDates = (obj, dateKeys) => {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) {
        return obj;
    }
    for (const key of keys) {
        let value = obj[key];
        if (dateKeys.includes(key)) {
            if (typeof value === "string") {
                const parsedDate = new Date(value);
                if (!isNaN(parsedDate.getTime())) {
                    value = parsedDate;
                }
            }
        }
        obj[key] = (0, exports.deepSearchAndParseDates)(value, dateKeys);
    }
    return obj;
};
exports.deepSearchAndParseDates = deepSearchAndParseDates;


/***/ }),
/* 87 */
/***/ ((module) => {

"use strict";
module.exports = require("dayjs");

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorMessage = void 0;
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["InvalidCredentials"] = "InvalidCredentials";
    ErrorMessage["UserAlreadyExists"] = "UserAlreadyExists";
    ErrorMessage["SecretsNotFound"] = "SecretsNotFound";
    ErrorMessage["OAuthUser"] = "OAuthUser";
    ErrorMessage["InvalidResetToken"] = "InvalidResetToken";
    ErrorMessage["InvalidVerificationToken"] = "InvalidVerificationToken";
    ErrorMessage["EmailAlreadyVerified"] = "EmailAlreadyVerified";
    ErrorMessage["TwoFactorNotEnabled"] = "TwoFactorNotEnabled";
    ErrorMessage["TwoFactorAlreadyEnabled"] = "TwoFactorAlreadyEnabled";
    ErrorMessage["InvalidTwoFactorCode"] = "InvalidTwoFactorCode";
    ErrorMessage["InvalidTwoFactorBackupCode"] = "InvalidTwoFactorBackupCode";
    ErrorMessage["InvalidBrowserConnection"] = "InvalidBrowserConnection";
    ErrorMessage["ResumeSlugAlreadyExists"] = "ResumeSlugAlreadyExists";
    ErrorMessage["ResumeNotFound"] = "ResumeNotFound";
    ErrorMessage["ResumeLocked"] = "ResumeLocked";
    ErrorMessage["ResumePrinterError"] = "ResumePrinterError";
    ErrorMessage["ResumePreviewError"] = "ResumePreviewError";
    ErrorMessage["SomethingWentWrong"] = "SomethingWentWrong";
})(ErrorMessage || (exports.ErrorMessage = ErrorMessage = {}));


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFontUrls = exports.fonts = void 0;
exports.fonts = [
    {
        family: "Roboto",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "700",
            "700italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf",
            "300": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf",
            "500": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
            "700": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
            "900": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf",
            "100italic": "http://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrIzcXLsnzjYk.ttf",
            "300italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf",
            regular: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
            italic: "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
            "500italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf",
            "700italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
            "900italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf",
        },
    },
    {
        family: "Open Sans",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4nY1M2xLER.ttf",
            "500": "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0C4nY1M2xLER.ttf",
            "600": "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1y4nY1M2xLER.ttf",
            "700": "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf",
            "800": "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1y4nY1M2xLER.ttf",
            regular: "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
            "300italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkaVcUwaERZjA.ttf",
            italic: "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkaVcUwaERZjA.ttf",
            "500italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk_RkaVcUwaERZjA.ttf",
            "600italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjaVcUwaERZjA.ttf",
            "700italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjaVcUwaERZjA.ttf",
            "800italic": "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjaVcUwaERZjA.ttf",
        },
    },
    {
        family: "Noto Sans JP",
        category: "sans-serif",
        subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEi75vY0rw-oME.ttf",
            "200": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEj75vY0rw-oME.ttf",
            "300": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFE8j75vY0rw-oME.ttf",
            "500": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFCMj75vY0rw-oME.ttf",
            "600": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFM8k75vY0rw-oME.ttf",
            "700": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75vY0rw-oME.ttf",
            "800": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEk75vY0rw-oME.ttf",
            "900": "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFLgk75vY0rw-oME.ttf",
            regular: "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf",
        },
    },
    {
        family: "Montserrat",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf",
            "200": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf",
            "300": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf",
            "500": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf",
            "600": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf",
            "700": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf",
            "800": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf",
            "900": "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf",
            regular: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
            "100italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf",
            "200italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf",
            "300italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf",
            italic: "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf",
            "500italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf",
            "600italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf",
            "700italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf",
            "800italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf",
            "900italic": "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf",
        },
    },
    {
        family: "Lato",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "700",
            "700italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
            "300": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
            "700": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
            "900": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
            "100italic": "http://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
            "300italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
            regular: "http://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf",
            italic: "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
            "700italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
            "900italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf",
        },
    },
    {
        family: "Poppins",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTed3FBGPaTSQ.ttf",
            "200": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_V1tvFP-KUEg.ttf",
            "300": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
            "500": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf",
            "600": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
            "700": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
            "800": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4V1tvFP-KUEg.ttf",
            "900": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5V1tvFP-KUEg.ttf",
            "100italic": "http://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE3tFOvODSVFF.ttf",
            "200italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1plEN2PQEhcqw.ttf",
            "300italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21llEN2PQEhcqw.ttf",
            regular: "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
            italic: "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hlEN2PQEhcqw.ttf",
            "600italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19lEN2PQEhcqw.ttf",
            "700italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15lEN2PQEhcqw.ttf",
            "800italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111lEN2PQEhcqw.ttf",
            "900italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xlEN2PQEhcqw.ttf",
        },
    },
    {
        family: "Roboto Condensed",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZKCMSbvtdYyQ.ttf",
            "700": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meKCMSbvtdYyQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDpCEYatlYcyRi4A.ttf",
            regular: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVl2ZhZI2eCN5jzbjEETS9weq8-59WxDCs5cvI.ttf",
            italic: "http://fonts.gstatic.com/s/robotocondensed/v25/ieVj2ZhZI2eCN5jzbjEETS9weq8-19e7CAk8YvJEeg.ttf",
            "700italic": "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDtCYYatlYcyRi4A.ttf",
        },
    },
    {
        family: "Inter",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
            "200": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
            "300": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
            "500": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
            "600": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
            "700": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
            "800": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
            "900": "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
            regular: "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
        },
    },
    {
        family: "Roboto Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vuPQ--5Ip2sSQ.ttf",
            "200": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_XvqPQ--5Ip2sSQ.ttf",
            "300": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_gPqPQ--5Ip2sSQ.ttf",
            "500": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7PqPQ--5Ip2sSQ.ttf",
            "600": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_AP2PQ--5Ip2sSQ.ttf",
            "700": "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQ--5Ip2sSQ.ttf",
            regular: "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQ--5Ip2sSQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAeW9AJi8SZwt.ttf",
            "200italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrnnAOW9AJi8SZwt.ttf",
            "300italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrk5AOW9AJi8SZwt.ttf",
            italic: "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAOW9AJi8SZwt.ttf",
            "500italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlVAOW9AJi8SZwt.ttf",
            "600italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrm5B-W9AJi8SZwt.ttf",
            "700italic": "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrmAB-W9AJi8SZwt.ttf",
        },
    },
    {
        family: "Oswald",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs13FvgUFoZAaRliE.ttf",
            "300": "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs169vgUFoZAaRliE.ttf",
            "500": "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf",
            "600": "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf",
            "700": "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf",
            regular: "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf",
        },
    },
    {
        family: "Noto Sans",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "devanagari",
            "greek",
            "greek-ext",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNjhjRFSfiM7HBj.ttf",
            "200": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjKhVlY9aA5Wl6PQ.ttf",
            "300": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjThZlY9aA5Wl6PQ.ttf",
            "500": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjFhdlY9aA5Wl6PQ.ttf",
            "600": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjOhBlY9aA5Wl6PQ.ttf",
            "700": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf",
            "800": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjQhJlY9aA5Wl6PQ.ttf",
            "900": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjZhNlY9aA5Wl6PQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/notosans/v30/o-0MIpQlx3QUlC5A4PNr4AwhQ_yu6WBjJLE.ttf",
            "200italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyNYtyEx2xqPaif.ttf",
            "300italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzpYdyEx2xqPaif.ttf",
            regular: "http://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNb4j5Ba_2c7A.ttf",
            italic: "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNr4DRFSfiM7HBj.ttf",
            "500italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyxYNyEx2xqPaif.ttf",
            "600italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AydZ9yEx2xqPaif.ttf",
            "700italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4Az5ZtyEx2xqPaif.ttf",
            "800italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzlZdyEx2xqPaif.ttf",
            "900italic": "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzBZNyEx2xqPaif.ttf",
        },
    },
    {
        family: "Raleway",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao4CPNLA3JC9c.ttf",
            "200": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtaooCPNLA3JC9c.ttf",
            "300": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVuEooCPNLA3JC9c.ttf",
            "500": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCPNLA3JC9c.ttf",
            "600": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpYCPNLA3JC9c.ttf",
            "700": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCPNLA3JC9c.ttf",
            "800": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapYCPNLA3JC9c.ttf",
            "900": "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtzpYCPNLA3JC9c.ttf",
            regular: "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCPNLA3JC9c.ttf",
            "100italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjNPrQVIT9c2c8.ttf",
            "200italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejMPrQVIT9c2c8.ttf",
            "300italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
            italic: "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
            "500italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
            "600italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
            "700italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
            "800italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejLPrQVIT9c2c8.ttf",
            "900italic": "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4cHLPrQVIT9c2c8.ttf",
        },
    },
    {
        family: "Nunito Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVilntF8kA_Ykqw.ttf",
            "300": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GiClntF8kA_Ykqw.ttf",
            "500": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G5ClntF8kA_Ykqw.ttf",
            "600": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GCC5ntF8kA_Ykqw.ttf",
            "700": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GMS5ntF8kA_Ykqw.ttf",
            "800": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVi5ntF8kA_Ykqw.ttf",
            "900": "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4Gfy5ntF8kA_Ykqw.ttf",
            regular: "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilntF8kA_Ykqw.ttf",
            "200italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP91UgIfM0qxVd.ttf",
            "300italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmrR91UgIfM0qxVd.ttf",
            italic: "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmqP91UgIfM0qxVd.ttf",
            "500italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmq991UgIfM0qxVd.ttf",
            "600italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpR8FUgIfM0qxVd.ttf",
            "700italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpo8FUgIfM0qxVd.ttf",
            "800italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP8FUgIfM0qxVd.ttf",
            "900italic": "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmom8FUgIfM0qxVd.ttf",
        },
    },
    {
        family: "Roboto Slab",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojIWWaG5iddG-1A.ttf",
            "200": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDISWaG5iddG-1A.ttf",
            "300": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjo0oSWaG5iddG-1A.ttf",
            "500": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjovoSWaG5iddG-1A.ttf",
            "600": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoUoOWaG5iddG-1A.ttf",
            "700": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoa4OWaG5iddG-1A.ttf",
            "800": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDIOWaG5iddG-1A.ttf",
            "900": "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoJYOWaG5iddG-1A.ttf",
            regular: "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf",
        },
    },
    {
        family: "Ubuntu",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["300", "300italic", "regular", "italic", "500", "500italic", "700", "700italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzTt2aMH4V_gg.ttf",
            "500": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCjC3Tt2aMH4V_gg.ttf",
            "700": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTt2aMH4V_gg.ttf",
            "300italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftWyIPYBvgpUI.ttf",
            regular: "http://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eAT3v02QFg.ttf",
            italic: "http://fonts.gstatic.com/s/ubuntu/v20/4iCu6KVjbNBYlgoKeg7znUiAFpxm.ttf",
            "500italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejYHtGyIPYBvgpUI.ttf",
            "700italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPsmyIPYBvgpUI.ttf",
        },
    },
    {
        family: "Nunito",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDshRTM9jo7eTWk.ttf",
            "300": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhRTM9jo7eTWk.ttf",
            "500": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhRTM9jo7eTWk.ttf",
            "600": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDGUmRTM9jo7eTWk.ttf",
            "700": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf",
            "800": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmRTM9jo7eTWk.ttf",
            "900": "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDBImRTM9jo7eTWk.ttf",
            regular: "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM9jo7eTWk.ttf",
            "200italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXA3iqzbXWnoeg.ttf",
            "300italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNi83A3iqzbXWnoeg.ttf",
            italic: "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNirXA3iqzbXWnoeg.ttf",
            "500italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNin3A3iqzbXWnoeg.ttf",
            "600italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNic3c3iqzbXWnoeg.ttf",
            "700italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiSnc3iqzbXWnoeg.ttf",
            "800italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXc3iqzbXWnoeg.ttf",
            "900italic": "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiBHc3iqzbXWnoeg.ttf",
        },
    },
    {
        family: "Playfair Display",
        category: "serif",
        subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "500": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQZNLo_U2r.ttf",
            "600": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebukDQZNLo_U2r.ttf",
            "700": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQZNLo_U2r.ttf",
            "800": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfFukDQZNLo_U2r.ttf",
            "900": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfsukDQZNLo_U2r.ttf",
            regular: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
            italic: "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf",
            "500italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqTbtbK-F2rA0s.ttf",
            "600italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf",
            "700italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_k-UbtbK-F2rA0s.ttf",
            "800italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_iiUbtbK-F2rA0s.ttf",
            "900italic": "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_gGUbtbK-F2rA0s.ttf",
        },
    },
    {
        family: "Rubik",
        category: "sans-serif",
        subsets: ["arabic", "cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.ttf",
            "500": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80V4bVkA.ttf",
            "600": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-2Y-1UE80V4bVkA.ttf",
            "700": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UE80V4bVkA.ttf",
            "800": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-h4-1UE80V4bVkA.ttf",
            "900": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-ro-1UE80V4bVkA.ttf",
            regular: "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UE80V4bVkA.ttf",
            "300italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8sDE0UwdYPFkJ1O.ttf",
            italic: "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tdE0UwdYPFkJ1O.ttf",
            "500italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tvE0UwdYPFkJ1O.ttf",
            "600italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8uDFEUwdYPFkJ1O.ttf",
            "700italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8u6FEUwdYPFkJ1O.ttf",
            "800italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8vdFEUwdYPFkJ1O.ttf",
            "900italic": "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8v0FEUwdYPFkJ1O.ttf",
        },
    },
    {
        family: "Merriweather",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["300", "300italic", "regular", "italic", "700", "700italic", "900", "900italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRpX837pvjxPA.ttf",
            "700": "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf",
            "900": "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52_wFpX837pvjxPA.ttf",
            "300italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7lXcf_hP3hPGWH.ttf",
            regular: "http://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf",
            italic: "http://fonts.gstatic.com/s/merriweather/v30/u-4m0qyriQwlOrhSvowK_l5-eSZJdeP3r-Ho.ttf",
            "700italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR71Wsf_hP3hPGWH.ttf",
            "900italic": "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7NWMf_hP3hPGWH.ttf",
        },
    },
    {
        family: "PT Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh4OmnLD0Z4zM.ttf",
            regular: "http://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.ttf",
            italic: "http://fonts.gstatic.com/s/ptsans/v17/jizYRExUiTo99u79D0eEwMOJIDQA-g.ttf",
            "700italic": "http://fonts.gstatic.com/s/ptsans/v17/jizdRExUiTo99u79D0e8fOytKB8c8zMrig.ttf",
        },
    },
    {
        family: "Noto Sans KR",
        category: "sans-serif",
        subsets: ["cyrillic", "korean", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuozeLTq8H4hfeE.ttf",
            "200": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmoyeLTq8H4hfeE.ttf",
            "300": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzrQyeLTq8H4hfeE.ttf",
            "500": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzztgyeLTq8H4hfeE.ttf",
            "600": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzjQ1eLTq8H4hfeE.ttf",
            "700": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLTq8H4hfeE.ttf",
            "800": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmo1eLTq8H4hfeE.ttf",
            "900": "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzkM1eLTq8H4hfeE.ttf",
            regular: "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.ttf",
        },
    },
    {
        family: "Kanit",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72GwWKcaxALFs.ttf",
            "200": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOiWgX6BJNUJy.ttf",
            "300": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-OSWgX6BJNUJy.ttf",
            "500": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOCWgX6BJNUJy.ttf",
            "600": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPyWgX6BJNUJy.ttf",
            "700": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPiWgX6BJNUJy.ttf",
            "800": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPSWgX6BJNUJy.ttf",
            "900": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPCWgX6BJNUJy.ttf",
            "100italic": "http://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GAdY5FPFtrGw.ttf",
            "200italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hVaRrMFJyAu4.ttf",
            "300italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miVaRrMFJyAu4.ttf",
            regular: "http://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcoaSEQGodLxA.ttf",
            italic: "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQGwWKcaxALFs.ttf",
            "500italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjVaRrMFJyAu4.ttf",
            "600italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kVaRrMFJyAu4.ttf",
            "700italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlVaRrMFJyAu4.ttf",
            "800italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmVaRrMFJyAu4.ttf",
            "900italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnVaRrMFJyAu4.ttf",
        },
    },
    {
        family: "Work Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nWNigDp6_cOyA.ttf",
            "200": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nXNigDp6_cOyA.ttf",
            "300": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXNigDp6_cOyA.ttf",
            "500": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K3vXNigDp6_cOyA.ttf",
            "600": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K5fQNigDp6_cOyA.ttf",
            "700": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K67QNigDp6_cOyA.ttf",
            "800": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nQNigDp6_cOyA.ttf",
            "900": "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K-DQNigDp6_cOyA.ttf",
            regular: "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXNigDp6_cOyA.ttf",
            "100italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3moJo43ZKyDSQQ.ttf",
            "200italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmsJo43ZKyDSQQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUgGsJo43ZKyDSQQ.ttf",
            italic: "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3msJo43ZKyDSQQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU7GsJo43ZKyDSQQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUAGwJo43ZKyDSQQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUOWwJo43ZKyDSQQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmwJo43ZKyDSQQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUd2wJo43ZKyDSQQ.ttf",
        },
    },
    {
        family: "Lora",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787wsuyJGmKxemMeZ.ttf",
            "600": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJGmKxemMeZ.ttf",
            "700": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf",
            regular: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuyJGmKxemMeZ.ttf",
            italic: "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqh8ndeZzZ0.ttf",
            "500italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-PgFkqh8ndeZzZ0.ttf",
            "600italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-BQCkqh8ndeZzZ0.ttf",
            "700italic": "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-C0Ckqh8ndeZzZ0.ttf",
        },
    },
    {
        family: "Mukta",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEOjFma-2HW7ZB_.ttf",
            "300": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFqj1ma-2HW7ZB_.ttf",
            "500": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEyjlma-2HW7ZB_.ttf",
            "600": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEeiVma-2HW7ZB_.ttf",
            "700": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbF6iFma-2HW7ZB_.ttf",
            "800": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFmi1ma-2HW7ZB_.ttf",
            regular: "http://fonts.gstatic.com/s/mukta/v14/iJWKBXyXfDDVXYnGp32S0H3f.ttf",
        },
    },
    {
        family: "Noto Sans TC",
        category: "sans-serif",
        subsets: ["chinese-traditional", "cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cz_CpOtma3uNQ.ttf",
            "200": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yCy_CpOtma3uNQ.ttf",
            "300": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7_6y_CpOtma3uNQ.ttf",
            "500": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz75Ky_CpOtma3uNQ.ttf",
            "600": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7361_CpOtma3uNQ.ttf",
            "700": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz70e1_CpOtma3uNQ.ttf",
            "800": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yC1_CpOtma3uNQ.ttf",
            "900": "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7wm1_CpOtma3uNQ.ttf",
            regular: "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_CpOtma3uNQ.ttf",
        },
    },
    {
        family: "Fira Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9IjOazP3dUTP.ttf",
            "200": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKnuQR37fF3Wlg.ttf",
            "300": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKruQR37fF3Wlg.ttf",
            "500": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKvuQR37fF3Wlg.ttf",
            "600": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzuQR37fF3Wlg.ttf",
            "700": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3uQR37fF3Wlg.ttf",
            "800": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7uQR37fF3Wlg.ttf",
            "900": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_uQR37fF3Wlg.ttf",
            "100italic": "http://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.ttf",
            "200italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQBf_XljGllLX.ttf",
            "300italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQxf_XljGllLX.ttf",
            regular: "http://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VfkILKSTbndQ.ttf",
            italic: "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkojOazP3dUTP.ttf",
            "500italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qhf_XljGllLX.ttf",
            "600italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRRf_XljGllLX.ttf",
            "700italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRBf_XljGllLX.ttf",
            "800italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRxf_XljGllLX.ttf",
            "900italic": "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRhf_XljGllLX.ttf",
        },
    },
    {
        family: "Quicksand",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkKEo18G0wx40QDw.ttf",
            "500": "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkM0o18G0wx40QDw.ttf",
            "600": "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkCEv18G0wx40QDw.ttf",
            "700": "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv18G0wx40QDw.ttf",
            regular: "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf",
        },
    },
    {
        family: "Barlow",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E3b8s8yn4hnCci.ttf",
            "200": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3w-oc4FAtlT47dw.ttf",
            "300": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3p-kc4FAtlT47dw.ttf",
            "500": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3_-gc4FAtlT47dw.ttf",
            "600": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E30-8c4FAtlT47dw.ttf",
            "700": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4c4FAtlT47dw.ttf",
            "800": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3q-0c4FAtlT47dw.ttf",
            "900": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3j-wc4FAtlT47dw.ttf",
            "100italic": "http://fonts.gstatic.com/s/barlow/v12/7cHtv4kjgoGqM7E_CfNYwHoDmTcibrA.ttf",
            "200italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfP04Voptzsrd6m9.ttf",
            "300italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOQ4loptzsrd6m9.ttf",
            regular: "http://fonts.gstatic.com/s/barlow/v12/7cHpv4kjgoGqM7EPC8E46HsxnA.ttf",
            italic: "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E_Ccs8yn4hnCci.ttf",
            "500italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPI41optzsrd6m9.ttf",
            "600italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPk5Foptzsrd6m9.ttf",
            "700italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOA5Voptzsrd6m9.ttf",
            "800italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOc5loptzsrd6m9.ttf",
            "900italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfO451optzsrd6m9.ttf",
        },
    },
    {
        family: "Inconsolata",
        category: "monospace",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU8aRr8lleY2co.ttf",
            "300": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp9s8aRr8lleY2co.ttf",
            "500": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp7c8aRr8lleY2co.ttf",
            "600": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp1s7aRr8lleY2co.ttf",
            "700": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp2I7aRr8lleY2co.ttf",
            "800": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU7aRr8lleY2co.ttf",
            "900": "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lppyw7aRr8lleY2co.ttf",
            regular: "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8aRr8lleY2co.ttf",
        },
    },
    {
        family: "IBM Plex Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKjbLeEKxIedbzDw.ttf",
            "200": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjR7_MIZmdd_qFmo.ttf",
            "300": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjXr8MIZmdd_qFmo.ttf",
            "500": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9MIZmdd_qFmo.ttf",
            "600": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76MIZmdd_qFmo.ttf",
            "700": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjWr7MIZmdd_qFmo.ttf",
            "100italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX8KVElMYYaJe8bpLHnCwDKhdTmdKZMW9PjD3N8.ttf",
            "200italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm2Idscf3vBmpl8A.ttf",
            "300italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRscf3vBmpl8A.ttf",
            regular: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKtdbUFI5NadY.ttf",
            italic: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKhdTeEKxIedbzDw.ttf",
            "500italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm5IVscf3vBmpl8A.ttf",
            "600italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJscf3vBmpl8A.ttf",
            "700italic": "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmrINscf3vBmpl8A.ttf",
        },
    },
    {
        family: "Mulish",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNRwaClGrw-PTY.ttf",
            "300": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexc1RwaClGrw-PTY.ttf",
            "500": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexaFRwaClGrw-PTY.ttf",
            "600": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexU1WwaClGrw-PTY.ttf",
            "700": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexXRWwaClGrw-PTY.ttf",
            "800": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNWwaClGrw-PTY.ttf",
            "900": "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexTpWwaClGrw-PTY.ttf",
            regular: "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNRwaClGrw-PTY.ttf",
            "200italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeOvHp47LTZFwA.ttf",
            "300italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSd-OvHp47LTZFwA.ttf",
            italic: "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSKeOvHp47LTZFwA.ttf",
            "500italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSG-OvHp47LTZFwA.ttf",
            "600italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsS9-SvHp47LTZFwA.ttf",
            "700italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSzuSvHp47LTZFwA.ttf",
            "800italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeSvHp47LTZFwA.ttf",
            "900italic": "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSgOSvHp47LTZFwA.ttf",
        },
    },
    {
        family: "PT Serif",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/ptserif/v18/EJRSQgYoZZY2vCFuvAnt65qVXSr3pNNB.ttf",
            regular: "http://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvDFRxL6ddjb-.ttf",
            italic: "http://fonts.gstatic.com/s/ptserif/v18/EJRTQgYoZZY2vCFuvAFTzrq_cyb-vco.ttf",
            "700italic": "http://fonts.gstatic.com/s/ptserif/v18/EJRQQgYoZZY2vCFuvAFT9gaQVy7VocNB6Iw.ttf",
        },
    },
    {
        family: "DM Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTmf3ZGMZpg.ttf",
            "200": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTmf3ZGMZpg.ttf",
            "300": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTmf3ZGMZpg.ttf",
            "500": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTmf3ZGMZpg.ttf",
            "600": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTmf3ZGMZpg.ttf",
            "700": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTmf3ZGMZpg.ttf",
            "800": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTmf3ZGMZpg.ttf",
            "900": "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTmf3ZGMZpg.ttf",
            regular: "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf",
            "100italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3zRmYJpso5.ttf",
            "200italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3zRmYJpso5.ttf",
            "300italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3zRmYJpso5.ttf",
            italic: "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3zRmYJpso5.ttf",
            "500italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3zRmYJpso5.ttf",
            "600italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3zRmYJpso5.ttf",
            "700italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3zRmYJpso5.ttf",
            "800italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3zRmYJpso5.ttf",
            "900italic": "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3zRmYJpso5.ttf",
        },
    },
    {
        family: "Heebo",
        category: "sans-serif",
        subsets: ["hebrew", "latin"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiS2cckOnz02SXQ.ttf",
            "200": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSycckOnz02SXQ.ttf",
            "300": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yycckOnz02SXQ.ttf",
            "500": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EuyycckOnz02SXQ.ttf",
            "600": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EVyucckOnz02SXQ.ttf",
            "700": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EbiucckOnz02SXQ.ttf",
            "800": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSucckOnz02SXQ.ttf",
            "900": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EICucckOnz02SXQ.ttf",
            regular: "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSycckOnz02SXQ.ttf",
        },
    },
    {
        family: "Noto Serif",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFGjwM0Lhq_Szw.ttf",
            "200": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFCjwM0Lhq_Szw.ttf",
            "300": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZ9lCjwM0Lhq_Szw.ttf",
            "500": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZmlCjwM0Lhq_Szw.ttf",
            "600": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZdlejwM0Lhq_Szw.ttf",
            "700": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZT1ejwM0Lhq_Szw.ttf",
            "800": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFejwM0Lhq_Szw.ttf",
            "900": "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZAVejwM0Lhq_Szw.ttf",
            regular: "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwM0Lhq_Szw.ttf",
            "100italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLgscPpKrCzyUi.ttf",
            "200italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLg8cPpKrCzyUi.ttf",
            "300italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBMVg8cPpKrCzyUi.ttf",
            italic: "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLg8cPpKrCzyUi.ttf",
            "500italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBN5g8cPpKrCzyUi.ttf",
            "600italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOVhMcPpKrCzyUi.ttf",
            "700italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOshMcPpKrCzyUi.ttf",
            "800italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLhMcPpKrCzyUi.ttf",
            "900italic": "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPihMcPpKrCzyUi.ttf",
        },
    },
    {
        family: "Titillium Web",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "900",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffAzHKIx5YrSYqWM.ttf",
            "300": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffGjEKIx5YrSYqWM.ttf",
            "600": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffBzCKIx5YrSYqWM.ttf",
            "700": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffHjDKIx5YrSYqWM.ttf",
            "900": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffEDBKIx5YrSYqWM.ttf",
            "200italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbewI1zZpaduWMmxA.ttf",
            "300italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbepI5zZpaduWMmxA.ttf",
            regular: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPecZTIAOhVxoMyOr9n_E7fRMTsDIRSfr0.ttf",
            italic: "http://fonts.gstatic.com/s/titilliumweb/v17/NaPAcZTIAOhVxoMyOr9n_E7fdMbmCKZXbr2BsA.ttf",
            "600italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbe0IhzZpaduWMmxA.ttf",
            "700italic": "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbetIlzZpaduWMmxA.ttf",
        },
    },
    {
        family: "Manrope",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.ttf",
            "300": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk6jFO_F87jxeN7B.ttf",
            "500": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F87jxeN7B.ttf",
            "600": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F87jxeN7B.ttf",
            "700": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F87jxeN7B.ttf",
            "800": "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F87jxeN7B.ttf",
            regular: "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F87jxeN7B.ttf",
        },
    },
    {
        family: "Hind Siliguri",
        category: "sans-serif",
        subsets: ["bengali", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRDf44uEfKiGvxts.ttf",
            "500": "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRG_54uEfKiGvxts.ttf",
            "600": "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoREP-4uEfKiGvxts.ttf",
            "700": "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRCf_4uEfKiGvxts.ttf",
            regular: "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwTs5juQtsyLLR5jN4cxBEofJvQxuk0Nig.ttf",
        },
    },
    {
        family: "Libre Franklin",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsSUB9rIb-JH1g.ttf",
            "200": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsWUB9rIb-JH1g.ttf",
            "300": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhcMWUB9rIb-JH1g.ttf",
            "500": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhHMWUB9rIb-JH1g.ttf",
            "600": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduh8MKUB9rIb-JH1g.ttf",
            "700": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhycKUB9rIb-JH1g.ttf",
            "800": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsKUB9rIb-JH1g.ttf",
            "900": "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhh8KUB9rIb-JH1g.ttf",
            regular: "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsWUB9rIb-JH1g.ttf",
            "100italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RdDMTedX1sGE.ttf",
            "200italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8RNDMTedX1sGE.ttf",
            "300italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oYiRNDMTedX1sGE.ttf",
            italic: "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RNDMTedX1sGE.ttf",
            "500italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZORNDMTedX1sGE.ttf",
            "600italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oaiQ9DMTedX1sGE.ttf",
            "700italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oabQ9DMTedX1sGE.ttf",
            "800italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8Q9DMTedX1sGE.ttf",
            "900italic": "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05obVQ9DMTedX1sGE.ttf",
        },
    },
    {
        family: "Karla",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJqqFENLR7fHGw.ttf",
            "300": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDppqqFENLR7fHGw.ttf",
            "500": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDypqqFENLR7fHGw.ttf",
            "600": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDJp2qFENLR7fHGw.ttf",
            "700": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDH52qFENLR7fHGw.ttf",
            "800": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJ2qFENLR7fHGw.ttf",
            regular: "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTD-JqqFENLR7fHGw.ttf",
            "200italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCV0lPZbLXGxGR.ttf",
            "300italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNkcV0lPZbLXGxGR.ttf",
            italic: "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlCV0lPZbLXGxGR.ttf",
            "500italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlwV0lPZbLXGxGR.ttf",
            "600italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmcUElPZbLXGxGR.ttf",
            "700italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmlUElPZbLXGxGR.ttf",
            "800italic": "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCUElPZbLXGxGR.ttf",
        },
    },
    {
        family: "Nanum Gothic",
        category: "sans-serif",
        subsets: ["korean", "latin"],
        variants: ["regular", "700", "800"],
        files: {
            "700": "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LQv37zlEn14YEUQ.ttf",
            "800": "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LXv77zlEn14YEUQ.ttf",
            regular: "http://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno73g.ttf",
        },
    },
    {
        family: "Material Icons Outlined",
        category: "monospace",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/materialiconsoutlined/v109/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcdl5GuI2Ze.otf",
        },
    },
    {
        family: "Josefin Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjRXMFrLgTsQV0.ttf",
            "200": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_LjQXMFrLgTsQV0.ttf",
            "300": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_GbQXMFrLgTsQV0.ttf",
            "500": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ArQXMFrLgTsQV0.ttf",
            "600": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ObXXMFrLgTsQV0.ttf",
            "700": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XXMFrLgTsQV0.ttf",
            regular: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf",
            "100italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtINhKibpUV3MEQ.ttf",
            "200italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTNIJhKibpUV3MEQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCT6oJhKibpUV3MEQ.ttf",
            italic: "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtIJhKibpUV3MEQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCThoJhKibpUV3MEQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTaoVhKibpUV3MEQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTU4VhKibpUV3MEQ.ttf",
        },
    },
    {
        family: "Arimo",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk338xsBxDAVQI4aA.ttf",
            "600": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3M8tsBxDAVQI4aA.ttf",
            "700": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3CstsBxDAVQI4aA.ttf",
            regular: "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk37cxsBxDAVQI4aA.ttf",
            italic: "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-ERBrEdwcoaKww.ttf",
            "500italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-2RBrEdwcoaKww.ttf",
            "600italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9aQxrEdwcoaKww.ttf",
            "700italic": "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9jQxrEdwcoaKww.ttf",
        },
    },
    {
        family: "Noto Color Emoji",
        category: "sans-serif",
        subsets: ["emoji"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/notocoloremoji/v25/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFab5s79iz64w.ttf",
        },
    },
    {
        family: "Libre Baskerville",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/librebaskerville/v14/kmKiZrc3Hgbbcjq75U4uslyuy4kn0qviTjYwI8Gcw6Oi.ttf",
            regular: "http://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.ttf",
            italic: "http://fonts.gstatic.com/s/librebaskerville/v14/kmKhZrc3Hgbbcjq75U4uslyuy4kn0qNcaxYaDc2V2ro.ttf",
        },
    },
    {
        family: "Dosis",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7MV3BkFTq4EPw.ttf",
            "300": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJabMV3BkFTq4EPw.ttf",
            "500": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJBbMV3BkFTq4EPw.ttf",
            "600": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ6bQV3BkFTq4EPw.ttf",
            "700": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ0LQV3BkFTq4EPw.ttf",
            "800": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7QV3BkFTq4EPw.ttf",
            regular: "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJN7MV3BkFTq4EPw.ttf",
        },
    },
    {
        family: "PT Sans Narrow",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngSUXNadjH0qYEzV7ab-oWlsbg95DiCUfzgRd-3.ttf",
            regular: "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngRUXNadjH0qYEzV7ab-oWlsYCByxyKeuDp.ttf",
        },
    },
    {
        family: "Source Code Pro",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyQhM5hTXUcdJg.ttf",
            "300": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQhM5hTXUcdJg.ttf",
            "500": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DP6QhM5hTXUcdJg.ttf",
            "600": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DBKXhM5hTXUcdJg.ttf",
            "700": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DCuXhM5hTXUcdJg.ttf",
            "800": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyXhM5hTXUcdJg.ttf",
            "900": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DGWXhM5hTXUcdJg.ttf",
            regular: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DMyQhM5hTXUcdJg.ttf",
            "200italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7I1rSVcZZJiGpw.ttf",
            "300italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTMo1rSVcZZJiGpw.ttf",
            italic: "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTbI1rSVcZZJiGpw.ttf",
            "500italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTXo1rSVcZZJiGpw.ttf",
            "600italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTsoprSVcZZJiGpw.ttf",
            "700italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTi4prSVcZZJiGpw.ttf",
            "800italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7IprSVcZZJiGpw.ttf",
            "900italic": "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTxYprSVcZZJiGpw.ttf",
        },
    },
    {
        family: "Bitter",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbeCL_EXFh2reU.ttf",
            "200": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbfCL_EXFh2reU.ttf",
            "300": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8ajfCL_EXFh2reU.ttf",
            "500": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8cTfCL_EXFh2reU.ttf",
            "600": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8SjYCL_EXFh2reU.ttf",
            "700": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYCL_EXFh2reU.ttf",
            "800": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbYCL_EXFh2reU.ttf",
            "900": "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8V_YCL_EXFh2reU.ttf",
            regular: "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL_EXFh2reU.ttf",
            "100italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4P3OWHpzveWxBw.ttf",
            "200italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPzOWHpzveWxBw.ttf",
            "300italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cvvzOWHpzveWxBw.ttf",
            italic: "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4PzOWHpzveWxBw.ttf",
            "500italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c0vzOWHpzveWxBw.ttf",
            "600italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cPvvOWHpzveWxBw.ttf",
            "700italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cB_vOWHpzveWxBw.ttf",
            "800italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPvOWHpzveWxBw.ttf",
            "900italic": "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cSfvOWHpzveWxBw.ttf",
        },
    },
    {
        family: "Cabin",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkW-EL7Gvxm7rE_s.ttf",
            "600": "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkYODL7Gvxm7rE_s.ttf",
            "700": "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDL7Gvxm7rE_s.ttf",
            regular: "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EL7Gvxm7rE_s.ttf",
            italic: "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHx_KlwkzuA_u1Bg.ttf",
            "500italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXH9fKlwkzuA_u1Bg.ttf",
            "600italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHGfWlwkzuA_u1Bg.ttf",
            "700italic": "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHIPWlwkzuA_u1Bg.ttf",
        },
    },
    {
        family: "Assistant",
        category: "sans-serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZnEGGf3qGuvM4.ttf",
            "300": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtrhnEGGf3qGuvM4.ttf",
            "500": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
            "600": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
            "700": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
            "800": "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZgEGGf3qGuvM4.ttf",
            regular: "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf",
        },
    },
    {
        family: "Oxygen",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["300", "regular", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCJW8Db2-4C7wFZQ.ttf",
            "700": "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCNWgDb2-4C7wFZQ.ttf",
            regular: "http://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4Lcnbu6iUcnZ0SkAg.ttf",
        },
    },
    {
        family: "Bebas Neue",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.ttf",
        },
    },
    {
        family: "EB Garamond",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "500": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-2fRUA4V-e6yHgQ.ttf",
            "600": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-NfNUA4V-e6yHgQ.ttf",
            "700": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUA4V-e6yHgQ.ttf",
            "800": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-a_NUA4V-e6yHgQ.ttf",
            regular: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUA4V-e6yHgQ.ttf",
            italic: "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96WamXgXFI.ttf",
            "500italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7eOQI96WamXgXFI.ttf",
            "600italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7diR496WamXgXFI.ttf",
            "700italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7dbR496WamXgXFI.ttf",
            "800italic": "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7c8R496WamXgXFI.ttf",
        },
    },
    {
        family: "Cairo",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-W1ToLQ-HmkA.ttf",
            "300": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hL4-W1ToLQ-HmkA.ttf",
            "500": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hNI-W1ToLQ-HmkA.ttf",
            "600": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hD45W1ToLQ-HmkA.ttf",
            "700": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hAc5W1ToLQ-HmkA.ttf",
            "800": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA5W1ToLQ-HmkA.ttf",
            "900": "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hEk5W1ToLQ-HmkA.ttf",
            regular: "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-W1ToLQ-HmkA.ttf",
        },
    },
    {
        family: "Anton",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm0K08i4gS7lu.ttf",
        },
    },
    {
        family: "Abel",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf",
        },
    },
    {
        family: "Dancing Script",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BAyoHTeB9ptDqpw.ttf",
            "600": "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTeB9ptDqpw.ttf",
            "700": "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B1i0HTeB9ptDqpw.ttf",
            regular: "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
        },
    },
    {
        family: "Barlow Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B43LT31vytKgbaw.ttf",
            "200": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B497y_3HcuKECcrs.ttf",
            "300": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47rx_3HcuKECcrs.ttf",
            "500": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4-Lw_3HcuKECcrs.ttf",
            "600": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4873_3HcuKECcrs.ttf",
            "700": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3HcuKECcrs.ttf",
            "800": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47b1_3HcuKECcrs.ttf",
            "900": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B45L0_3HcuKECcrs.ttf",
            "100italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxzL3I-JCGChYJ8VI-L6OO_au7B6xTru1H2lq0La6JN.ttf",
            "200italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrF3DWvIMHYrtUxg.ttf",
            "300italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrc3PWvIMHYrtUxg.ttf",
            regular: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTx3L3I-JCGChYJ8VI-L6OO_au7B2xbZ23n3pKg.ttf",
            italic: "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B6xTT31vytKgbaw.ttf",
            "500italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrK3LWvIMHYrtUxg.ttf",
            "600italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrB3XWvIMHYrtUxg.ttf",
            "700italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrY3TWvIMHYrtUxg.ttf",
            "800italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrf3fWvIMHYrtUxg.ttf",
            "900italic": "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrW3bWvIMHYrtUxg.ttf",
        },
    },
    {
        family: "Hind",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfMJaIRuYjDpf5Vw.ttf",
            "500": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfJpbIRuYjDpf5Vw.ttf",
            "600": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfLZcIRuYjDpf5Vw.ttf",
            "700": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfNJdIRuYjDpf5Vw.ttf",
            regular: "http://fonts.gstatic.com/s/hind/v16/5aU69_a8oxmIRG5yBROzkDM.ttf",
        },
    },
    {
        family: "Material Symbols Outlined",
        category: "monospace",
        subsets: ["latin"],
        variants: ["100", "200", "300", "regular", "500", "600", "700"],
        files: {
            "100": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHeembd5zrTgt.ttf",
            "200": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDAvHOembd5zrTgt.ttf",
            "300": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDDxHOembd5zrTgt.ttf",
            "500": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCdHOembd5zrTgt.ttf",
            "600": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBxG-embd5zrTgt.ttf",
            "700": "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBIG-embd5zrTgt.ttf",
            regular: "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOembd5zrTgt.ttf",
        },
    },
    {
        family: "Space Grotesk",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj62UUsjNsFjTDJK.ttf",
            "500": "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsjNsFjTDJK.ttf",
            "600": "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj42VksjNsFjTDJK.ttf",
            "700": "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
            regular: "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
        },
    },
    {
        family: "Noto Sans SC",
        category: "sans-serif",
        subsets: ["chinese-simplified", "cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_EnYxNbPzS5HE.ttf",
            "200": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_FnYxNbPzS5HE.ttf",
            "300": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG4HFnYxNbPzS5HE.ttf",
            "500": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG-3FnYxNbPzS5HE.ttf",
            "600": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGwHCnYxNbPzS5HE.ttf",
            "700": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYxNbPzS5HE.ttf",
            "800": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_CnYxNbPzS5HE.ttf",
            "900": "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG3bCnYxNbPzS5HE.ttf",
            regular: "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.ttf",
        },
    },
    {
        family: "Jost",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJAVGPokMmuHL.ttf",
            "200": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjJQVGPokMmuHL.ttf",
            "300": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mz9JQVGPokMmuHL.ttf",
            "500": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myRJQVGPokMmuHL.ttf",
            "600": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mx9IgVGPokMmuHL.ttf",
            "700": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mxEIgVGPokMmuHL.ttf",
            "800": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjIgVGPokMmuHL.ttf",
            "900": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwKIgVGPokMmuHL.ttf",
            regular: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJQVGPokMmuHL.ttf",
            "100italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0ENI0un_HLMEo.ttf",
            "200italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0FNI0un_HLMEo.ttf",
            "300italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZrMFNI0un_HLMEo.ttf",
            italic: "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0FNI0un_HLMEo.ttf",
            "500italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZt8FNI0un_HLMEo.ttf",
            "600italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZjMCNI0un_HLMEo.ttf",
            "700italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZgoCNI0un_HLMEo.ttf",
            "800italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0CNI0un_HLMEo.ttf",
            "900italic": "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZkQCNI0un_HLMEo.ttf",
        },
    },
    {
        family: "Noto Serif JP",
        category: "serif",
        subsets: ["japanese", "latin"],
        variants: ["200", "300", "regular", "500", "600", "700", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZBaPRkgfU8fEwb0.otf",
            "300": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZHKMRkgfU8fEwb0.otf",
            "500": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZCqNRkgfU8fEwb0.otf",
            "600": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZAaKRkgfU8fEwb0.otf",
            "700": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZGKLRkgfU8fEwb0.otf",
            "900": "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZFqJRkgfU8fEwb0.otf",
            regular: "http://fonts.gstatic.com/s/notoserifjp/v21/xn7mYHs72GKoTvER4Gn3b5eMXNikYkY0T84.otf",
        },
    },
    {
        family: "Crimson Text",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "600", "600italic", "700", "700italic"],
        files: {
            "600": "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJXsCx2C9lR1LFffg.ttf",
            "700": "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJX1C12C9lR1LFffg.ttf",
            regular: "http://fonts.gstatic.com/s/crimsontext/v19/wlp2gwHKFkZgtmSR3NB0oRJvaAJSA_JN3Q.ttf",
            italic: "http://fonts.gstatic.com/s/crimsontext/v19/wlpogwHKFkZgtmSR3NB0oRJfaghWIfdd3ahG.ttf",
            "600italic": "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajCOD9NV9rRPfrKu.ttf",
            "700italic": "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajDqDtNV9rRPfrKu.ttf",
        },
    },
    {
        family: "Lobster",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
        },
    },
    {
        family: "Pacifico",
        category: "handwriting",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
        },
    },
    {
        family: "Exo 2",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvOcPtq-rpvLpQ.ttf",
            "200": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvKcPtq-rpvLpQ.ttf",
            "300": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8j4PKcPtq-rpvLpQ.ttf",
            "500": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jjPKcPtq-rpvLpQ.ttf",
            "600": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jYPWcPtq-rpvLpQ.ttf",
            "700": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jWfWcPtq-rpvLpQ.ttf",
            "800": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvWcPtq-rpvLpQ.ttf",
            "900": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jF_WcPtq-rpvLpQ.ttf",
            regular: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPtq-rpvLpQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fNC6jJ7bpQBL.ttf",
            "200italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0fdC6jJ7bpQBL.ttf",
            "300italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drEqfdC6jJ7bpQBL.ttf",
            italic: "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fdC6jJ7bpQBL.ttf",
            "500italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drFGfdC6jJ7bpQBL.ttf",
            "600italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGqetC6jJ7bpQBL.ttf",
            "700italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGTetC6jJ7bpQBL.ttf",
            "800italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0etC6jJ7bpQBL.ttf",
            "900italic": "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drHdetC6jJ7bpQBL.ttf",
        },
    },
    {
        family: "Teko",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN9JG7Sy3TKEvkCF.ttf",
            "500": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8lG7Sy3TKEvkCF.ttf",
            "600": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_JHLSy3TKEvkCF.ttf",
            "700": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_wHLSy3TKEvkCF.ttf",
            regular: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8XG7Sy3TKEvkCF.ttf",
        },
    },
    {
        family: "Prompt",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA9oYREcjeo0k.ttf",
            "200": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_s4bmkvc5Q9dw.ttf",
            "300": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_g4bmkvc5Q9dw.ttf",
            "500": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_k4bmkvc5Q9dw.ttf",
            "600": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_44bmkvc5Q9dw.ttf",
            "700": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_84bmkvc5Q9dw.ttf",
            "800": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_w4bmkvc5Q9dw.ttf",
            "900": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_04bmkvc5Q9dw.ttf",
            "100italic": "http://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8TkMBf50kbiM.ttf",
            "200italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb2MrUZEtdzow.ttf",
            "300italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bGMrUZEtdzow.ttf",
            regular: "http://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB26Z9AcZkIzeg.ttf",
            italic: "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZdoYREcjeo0k.ttf",
            "500italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbWMrUZEtdzow.ttf",
            "600italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAamMrUZEtdzow.ttf",
            "700italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf",
            "800italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aGMrUZEtdzow.ttf",
            "900italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaWMrUZEtdzow.ttf",
        },
    },
    {
        family: "Comfortaa",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
            "500": "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
            "600": "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
            "700": "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
            regular: "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
        },
    },
    {
        family: "Material Icons Round",
        category: "monospace",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/materialiconsround/v108/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmMq_fTTvg-.otf",
        },
    },
    {
        family: "Maven Pro",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "800", "900"],
        files: {
            "500": "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Rf25nCpozp5GvU.ttf",
            "600": "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8fvx5nCpozp5GvU.ttf",
            "700": "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8cLx5nCpozp5GvU.ttf",
            "800": "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8aXx5nCpozp5GvU.ttf",
            "900": "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Yzx5nCpozp5GvU.ttf",
            regular: "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX25nCpozp5GvU.ttf",
        },
    },
    {
        family: "Archivo",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDJp8B1oJ0vyVQ.ttf",
            "200": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDNp8B1oJ0vyVQ.ttf",
            "300": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTajNp8B1oJ0vyVQ.ttf",
            "500": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTBjNp8B1oJ0vyVQ.ttf",
            "600": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT6jRp8B1oJ0vyVQ.ttf",
            "700": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT0zRp8B1oJ0vyVQ.ttf",
            "800": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDRp8B1oJ0vyVQ.ttf",
            "900": "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTnTRp8B1oJ0vyVQ.ttf",
            regular: "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDNp8B1oJ0vyVQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBshdsBU7iVdxQ.ttf",
            "200italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABsxdsBU7iVdxQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HDfsxdsBU7iVdxQ.ttf",
            italic: "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBsxdsBU7iVdxQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCzsxdsBU7iVdxQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBftBdsBU7iVdxQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBmtBdsBU7iVdxQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABtBdsBU7iVdxQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HAotBdsBU7iVdxQ.ttf",
        },
    },
    {
        family: "Fjalla One",
        category: "sans-serif",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/fjallaone/v15/Yq6R-LCAWCX3-6Ky7FAFnOZwkxgtUb8.ttf",
        },
    },
    {
        family: "Signika Negative",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAr5S73st9hiuEq8.ttf",
            "500": "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqVS73st9hiuEq8.ttf",
            "600": "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAp5TL3st9hiuEq8.ttf",
            "700": "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RApATL3st9hiuEq8.ttf",
            regular: "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqnS73st9hiuEq8.ttf",
        },
    },
    {
        family: "Varela Round",
        category: "sans-serif",
        subsets: ["hebrew", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIvoMGOD9gxZw.ttf",
        },
    },
    {
        family: "Rajdhani",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pasEcOsc-bGkqIw.ttf",
            "500": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EMOsc-bGkqIw.ttf",
            "600": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pbYF8Osc-bGkqIw.ttf",
            "700": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FsOsc-bGkqIw.ttf",
            regular: "http://fonts.gstatic.com/s/rajdhani/v15/LDIxapCSOBg7S-QT7q4AOeekWPrP.ttf",
        },
    },
    {
        family: "IBM Plex Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n3kwq0n1hj-sNFQ.ttf",
            "200": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3uAL8ldPg-IUDNg.ttf",
            "300": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3oQI8ldPg-IUDNg.ttf",
            "500": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3twJ8ldPg-IUDNg.ttf",
            "600": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3vAO8ldPg-IUDNg.ttf",
            "700": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3pQP8ldPg-IUDNg.ttf",
            "100italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6rfjptAgt5VM-kVkqdyU8n1ioStndlre4dFcFh.ttf",
            "200italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSGlZFh8ARHNh4zg.ttf",
            "300italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSflVFh8ARHNh4zg.ttf",
            regular: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5igg1l9kn-s.ttf",
            italic: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n1ioq0n1hj-sNFQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSJlRFh8ARHNh4zg.ttf",
            "600italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSClNFh8ARHNh4zg.ttf",
            "700italic": "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSblJFh8ARHNh4zg.ttf",
        },
    },
    {
        family: "Outfit",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.ttf",
            "200": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bC1C4G-EiAou6Y.ttf",
            "300": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4G-EiAou6Y.ttf",
            "500": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4G-EiAou6Y.ttf",
            "600": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4G-EiAou6Y.ttf",
            "700": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4deyC4G-EiAou6Y.ttf",
            "800": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4G-EiAou6Y.ttf",
            "900": "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4ZmyC4G-EiAou6Y.ttf",
            regular: "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.ttf",
        },
    },
    {
        family: "DM Serif Display",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf",
            italic: "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFhOHM81r4j6k0gjAW3mujVU2B2G_Vx1_r352np3Q.ttf",
        },
    },
    {
        family: "Arvo",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/arvo/v22/tDbM2oWUg0MKoZw1yLTA8vL7lAE.ttf",
            regular: "http://fonts.gstatic.com/s/arvo/v22/tDbD2oWUg0MKmSAa7Lzr7vs.ttf",
            italic: "http://fonts.gstatic.com/s/arvo/v22/tDbN2oWUg0MKqSIQ6J7u_vvijQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/arvo/v22/tDbO2oWUg0MKqSIoVLHK9tD-hAHkGg.ttf",
        },
    },
    {
        family: "Overpass",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PLrOZCLtce-og.ttf",
            "200": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPPrOZCLtce-og.ttf",
            "300": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6ovPrOZCLtce-og.ttf",
            "500": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6zvPrOZCLtce-og.ttf",
            "600": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6IvTrOZCLtce-og.ttf",
            "700": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6G_TrOZCLtce-og.ttf",
            "800": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPTrOZCLtce-og.ttf",
            "900": "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6VfTrOZCLtce-og.ttf",
            regular: "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPrOZCLtce-og.ttf",
            "100italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADe5qPl8Kuosgz.ttf",
            "200italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDepqPl8Kuosgz.ttf",
            "300italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLBdepqPl8Kuosgz.ttf",
            italic: "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADepqPl8Kuosgz.ttf",
            "500italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLAxepqPl8Kuosgz.ttf",
            "600italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDdfZqPl8Kuosgz.ttf",
            "700italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDkfZqPl8Kuosgz.ttf",
            "800italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDfZqPl8Kuosgz.ttf",
            "900italic": "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCqfZqPl8Kuosgz.ttf",
        },
    },
    {
        family: "Caveat",
        category: "handwriting",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjcB9SIKjYBxPigs.ttf",
            "600": "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIKjYBxPigs.ttf",
            "700": "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SIKjYBxPigs.ttf",
            regular: "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.ttf",
        },
    },
    {
        family: "Public Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpi5ww0pX189fg.ttf",
            "200": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulpm5ww0pX189fg.ttf",
            "300": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuSJm5ww0pX189fg.ttf",
            "500": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuJJm5ww0pX189fg.ttf",
            "600": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuyJ65ww0pX189fg.ttf",
            "700": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymu8Z65ww0pX189fg.ttf",
            "800": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulp65ww0pX189fg.ttf",
            "900": "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuv565ww0pX189fg.ttf",
            regular: "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpm5ww0pX189fg.ttf",
            "100italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgQctfVotfj7j.ttf",
            "200italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRgActfVotfj7j.ttf",
            "300italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673toPgActfVotfj7j.ttf",
            italic: "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgActfVotfj7j.ttf",
            "500italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpjgActfVotfj7j.ttf",
            "600italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tqPhwctfVotfj7j.ttf",
            "700italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tq2hwctfVotfj7j.ttf",
            "800italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRhwctfVotfj7j.ttf",
            "900italic": "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tr4hwctfVotfj7j.ttf",
        },
    },
    {
        family: "Cormorant Garamond",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.ttf",
            "500": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQWlhvuQWJ5heb_w.ttf",
            "600": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQdl9vuQWJ5heb_w.ttf",
            "700": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQEl5vuQWJ5heb_w.ttf",
            "300italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw-NxBKL_y94.ttf",
            regular: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.ttf",
            italic: "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrHtPkyuF7w6C.ttf",
            "500italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEO7ug-NxBKL_y94.ttf",
            "600italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEOXvQ-NxBKL_y94.ttf",
            "700italic": "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPzvA-NxBKL_y94.ttf",
        },
    },
    {
        family: "M PLUS Rounded 1c",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "japanese",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["100", "300", "regular", "500", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGCAYIAV6gnpUpoWwNkYvrugw9RuM3ixLsg6-av1x0.ttf",
            "300": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0q5psKxeqmzgRK.ttf",
            "500": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM1y55sKxeqmzgRK.ttf",
            "700": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM064ZsKxeqmzgRK.ttf",
            "800": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0m4psKxeqmzgRK.ttf",
            "900": "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0C45sKxeqmzgRK.ttf",
            regular: "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGEAYIAV6gnpUpoWwNkYvrugw9RuPWGzr8C7vav.ttf",
        },
    },
    {
        family: "Slabo 27px",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/slabo27px/v14/mFT0WbgBwKPR_Z4hGN2qsxgJ1EJ7i90.ttf",
        },
    },
    {
        family: "Abril Fatface",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf",
        },
    },
    {
        family: "Satisfy",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
        },
    },
    {
        family: "Asap",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqQsLmOXoA7Glw.ttf",
            "200": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqUsLmOXoA7Glw.ttf",
            "300": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYzKUsLmOXoA7Glw.ttf",
            "500": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYoKUsLmOXoA7Glw.ttf",
            "600": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYTKIsLmOXoA7Glw.ttf",
            "700": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYdaIsLmOXoA7Glw.ttf",
            "800": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqIsLmOXoA7Glw.ttf",
            "900": "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYO6IsLmOXoA7Glw.ttf",
            regular: "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqUsLmOXoA7Glw.ttf",
            "100italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbGmTggvWl0Qn.ttf",
            "200italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEbWmTggvWl0Qn.ttf",
            "300italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmTggvWl0Qn.ttf",
            italic: "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmTggvWl0Qn.ttf",
            "500italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmTggvWl0Qn.ttf",
            "600italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYaammTggvWl0Qn.ttf",
            "700italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammTggvWl0Qn.ttf",
            "800italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEammTggvWl0Qn.ttf",
            "900italic": "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf",
        },
    },
    {
        family: "Red Hat Display",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbjKWckg5-Xecg3w.ttf",
            "500": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbl6Wckg5-Xecg3w.ttf",
            "600": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbrKRckg5-Xecg3w.ttf",
            "700": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbouRckg5-Xecg3w.ttf",
            "800": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbuyRckg5-Xecg3w.ttf",
            "900": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbsWRckg5-Xecg3w.ttf",
            regular: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbmyWckg5-Xecg3w.ttf",
            "300italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVxAsz_VWZk3zJGg.ttf",
            italic: "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVmgsz_VWZk3zJGg.ttf",
            "500italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVqAsz_VWZk3zJGg.ttf",
            "600italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVRAwz_VWZk3zJGg.ttf",
            "700italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVfQwz_VWZk3zJGg.ttf",
            "800italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVGgwz_VWZk3zJGg.ttf",
            "900italic": "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVMwwz_VWZk3zJGg.ttf",
        },
    },
    {
        family: "Shadows Into Light",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/shadowsintolight/v19/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQDcsr4xzSMYA.ttf",
        },
    },
    {
        family: "Noto Sans Arabic",
        category: "sans-serif",
        subsets: ["arabic"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.ttf",
            "200": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGyvu3CBFQLaig.ttf",
            "300": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCflmyvu3CBFQLaig.ttf",
            "500": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCf-myvu3CBFQLaig.ttf",
            "600": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfFmuvu3CBFQLaig.ttf",
            "700": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfL2uvu3CBFQLaig.ttf",
            "800": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGuvu3CBFQLaig.ttf",
            "900": "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfYWuvu3CBFQLaig.ttf",
            regular: "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.ttf",
        },
    },
    {
        family: "Merriweather Sans",
        category: "sans-serif",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZ_O4ljuEG7xFHnQ.ttf",
            "500": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZkO4ljuEG7xFHnQ.ttf",
            "600": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZfOkljuEG7xFHnQ.ttf",
            "700": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZRekljuEG7xFHnQ.ttf",
            "800": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZIukljuEG7xFHnQ.ttf",
            regular: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZou4ljuEG7xFHnQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq2TzesCzRRXnaur.ttf",
            italic: "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3NzesCzRRXnaur.ttf",
            "500italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3_zesCzRRXnaur.ttf",
            "600italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0TyusCzRRXnaur.ttf",
            "700italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0qyusCzRRXnaur.ttf",
            "800italic": "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq1NyusCzRRXnaur.ttf",
        },
    },
    {
        family: "Fira Sans Condensed",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarWZXtqOlQfx9CjA.ttf",
            "200": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWTnMiMN-cxZblY4.ttf",
            "300": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWV3PiMN-cxZblY4.ttf",
            "500": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWQXOiMN-cxZblY4.ttf",
            "600": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWSnJiMN-cxZblY4.ttf",
            "700": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWU3IiMN-cxZblY4.ttf",
            "800": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWVHLiMN-cxZblY4.ttf",
            "900": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWXXKiMN-cxZblY4.ttf",
            "100italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOtEADFm8hSaQTFG18FErVhsC9x-tarUfPVzONUXRpSjJcu.ttf",
            "200italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVYMJ0dzRehY43EA.ttf",
            "300italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVBMF0dzRehY43EA.ttf",
            regular: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOhEADFm8hSaQTFG18FErVhsC9x-tarYfHnrMtVbx8.ttf",
            italic: "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarUfPtqOlQfx9CjA.ttf",
            "500italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVXMB0dzRehY43EA.ttf",
            "600italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVcMd0dzRehY43EA.ttf",
            "700italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVFMZ0dzRehY43EA.ttf",
            "800italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVCMV0dzRehY43EA.ttf",
            "900italic": "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVLMR0dzRehY43EA.ttf",
        },
    },
    {
        family: "Material Icons Sharp",
        category: "monospace",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/materialiconssharp/v109/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvSImEyc0vd.otf",
        },
    },
    {
        family: "Zilla Slab",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYpEY2HSjWlhzbaw.ttf",
            "500": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYskZ2HSjWlhzbaw.ttf",
            "600": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYuUe2HSjWlhzbaw.ttf",
            "700": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYoEf2HSjWlhzbaw.ttf",
            "300italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CVHapXnp2fazkfg.ttf",
            regular: "http://fonts.gstatic.com/s/zillaslab/v11/dFa6ZfeM_74wlPZtksIFWj0w_HyIRlE.ttf",
            italic: "http://fonts.gstatic.com/s/zillaslab/v11/dFa4ZfeM_74wlPZtksIFaj86-F6NVlFqdA.ttf",
            "500italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CDHepXnp2fazkfg.ttf",
            "600italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CIHCpXnp2fazkfg.ttf",
            "700italic": "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CRHGpXnp2fazkfg.ttf",
        },
    },
    {
        family: "Tajawal",
        category: "sans-serif",
        subsets: ["arabic", "latin"],
        variants: ["200", "300", "regular", "500", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l_6gLrZjiLlJ-G0.ttf",
            "300": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5qjLrZjiLlJ-G0.ttf",
            "500": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l8KiLrZjiLlJ-G0.ttf",
            "700": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l4qkLrZjiLlJ-G0.ttf",
            "800": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5anLrZjiLlJ-G0.ttf",
            "900": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l7KmLrZjiLlJ-G0.ttf",
            regular: "http://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf",
        },
    },
    {
        family: "Material Symbols Rounded",
        category: "monospace",
        subsets: ["latin"],
        variants: ["100", "200", "300", "regular", "500", "600", "700"],
        files: {
            "100": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIekXxKJKJBjAa8.ttf",
            "200": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rAelXxKJKJBjAa8.ttf",
            "300": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rNmlXxKJKJBjAa8.ttf",
            "500": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rLWlXxKJKJBjAa8.ttf",
            "600": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rFmiXxKJKJBjAa8.ttf",
            "700": "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rGCiXxKJKJBjAa8.ttf",
            regular: "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIelXxKJKJBjAa8.ttf",
        },
    },
    {
        family: "Play",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/play/v19/6ae84K2oVqwItm4TOpc423nTJTM.ttf",
            regular: "http://fonts.gstatic.com/s/play/v19/6aez4K2oVqwIjtI8Hp8Tx3A.ttf",
        },
    },
    {
        family: "Hind Madurai",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "tamil"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfXaUnecsoMJ0b_g.ttf",
            "500": "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfBaQnecsoMJ0b_g.ttf",
            "600": "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfKaMnecsoMJ0b_g.ttf",
            "700": "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfTaInecsoMJ0b_g.ttf",
            regular: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xx0e2p98ZvDXdZQIOcpqjn8Y0DceA0OQ.ttf",
        },
    },
    {
        family: "Indie Flower",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
        },
    },
    {
        family: "Barlow Semi Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfG4qvKk8ogoSP.ttf",
            "200": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRft6uPAGEki52WfA.ttf",
            "300": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf06iPAGEki52WfA.ttf",
            "500": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfi6mPAGEki52WfA.ttf",
            "600": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfp66PAGEki52WfA.ttf",
            "700": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfw6-PAGEki52WfA.ttf",
            "800": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf36yPAGEki52WfA.ttf",
            "900": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf-62PAGEki52WfA.ttf",
            "100italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpjgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbLLIEsKh5SPZWs.ttf",
            "200italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJnAWsgqZiGfHK5.ttf",
            "300italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIDAmsgqZiGfHK5.ttf",
            regular: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpvgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRnf4CrCEo4gg.ttf",
            italic: "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfYqvKk8ogoSP.ttf",
            "500italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJbA2sgqZiGfHK5.ttf",
            "600italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJ3BGsgqZiGfHK5.ttf",
            "700italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbITBWsgqZiGfHK5.ttf",
            "800italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIPBmsgqZiGfHK5.ttf",
            "900italic": "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIrB2sgqZiGfHK5.ttf",
        },
    },
    {
        family: "Chakra Petch",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeNIhFQJXE3AY00g.ttf",
            "500": "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkebIlFQJXE3AY00g.ttf",
            "600": "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeQI5FQJXE3AY00g.ttf",
            "700": "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeJI9FQJXE3AY00g.ttf",
            "300italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLJQp_A_gMk0izH.ttf",
            regular: "http://fonts.gstatic.com/s/chakrapetch/v11/cIf6MapbsEk7TDLdtEz1BwkmmKBhSL7Y1Q.ttf",
            italic: "http://fonts.gstatic.com/s/chakrapetch/v11/cIfkMapbsEk7TDLdtEz1BwkWmqplarvI1R8t.ttf",
            "500italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpKRQ5_A_gMk0izH.ttf",
            "600italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpK9RJ_A_gMk0izH.ttf",
            "700italic": "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLZRZ_A_gMk0izH.ttf",
        },
    },
    {
        family: "Nanum Myeongjo",
        category: "serif",
        subsets: ["korean", "latin"],
        variants: ["regular", "700", "800"],
        files: {
            "700": "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pXV1A0pfCs5Kos.ttf",
            "800": "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pLVFA0pfCs5Kos.ttf",
            regular: "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Btx3DZF0dXLMZlywRbVRNhxy1LreHQ8juyl.ttf",
        },
    },
    {
        family: "IBM Plex Sans Arabic",
        category: "sans-serif",
        subsets: ["arabic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700"],
        files: {
            "100": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3MZRtWPQCuHme67tEYUIx3Kh0PHR9N6YNe3PC5eMlAMg0.ttf",
            "200": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPy_dCTVsVJKxTs.ttf",
            "300": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOW_tCTVsVJKxTs.ttf",
            "500": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPO_9CTVsVJKxTs.ttf",
            "600": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPi-NCTVsVJKxTs.ttf",
            "700": "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOG-dCTVsVJKxTs.ttf",
            regular: "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6bs61vSbfdlA.ttf",
        },
    },
    {
        family: "Material Icons Two Tone",
        category: "monospace",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/materialiconstwotone/v112/hESh6WRmNCxEqUmNyh3JDeGxjVVyMg4tHGctNCu3NjDrH_77.otf",
        },
    },
    {
        family: "Archivo Black",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/archivoblack/v21/HTxqL289NzCGg4MzN6KJ7eW6OYuP_x7yx3A.ttf",
        },
    },
    {
        family: "Noto Sans HK",
        category: "sans-serif",
        subsets: ["chinese-hongkong", "cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB_-oWTiYjNvVA.ttf",
            "200": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB--oWTiYjNvVA.ttf",
            "300": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qC5--oWTiYjNvVA.ttf",
            "500": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qEJ--oWTiYjNvVA.ttf",
            "600": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qK55-oWTiYjNvVA.ttf",
            "700": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qJd5-oWTiYjNvVA.ttf",
            "800": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB5-oWTiYjNvVA.ttf",
            "900": "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qNl5-oWTiYjNvVA.ttf",
            regular: "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB--oWTiYjNvVA.ttf",
        },
    },
    {
        family: "Catamaran",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "tamil"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjc1anXuluiLyw.ttf",
            "200": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPjd1anXuluiLyw.ttf",
            "300": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPCbd1anXuluiLyw.ttf",
            "500": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPErd1anXuluiLyw.ttf",
            "600": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPKba1anXuluiLyw.ttf",
            "700": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPJ_a1anXuluiLyw.ttf",
            "800": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPja1anXuluiLyw.ttf",
            "900": "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPNHa1anXuluiLyw.ttf",
            regular: "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjd1anXuluiLyw.ttf",
        },
    },
    {
        family: "Asap Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9DSWlEgGqgp-pO.ttf",
            "300": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8nSmlEgGqgp-pO.ttf",
            "500": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9_S2lEgGqgp-pO.ttf",
            "600": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9TTGlEgGqgp-pO.ttf",
            "700": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO83TWlEgGqgp-pO.ttf",
            "800": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8rTmlEgGqgp-pO.ttf",
            "900": "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8PT2lEgGqgp-pO.ttf",
            "200italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUIFFim6CovpOkXA.ttf",
            "300italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOVGim6CovpOkXA.ttf",
            regular: "http://fonts.gstatic.com/s/asapcondensed/v17/pxidypY1o9NHyXh3WvSbGSggdNeLYk1Mq3ap.ttf",
            italic: "http://fonts.gstatic.com/s/asapcondensed/v17/pxifypY1o9NHyXh3WvSbGSggdOeJaElurmapvvM.ttf",
            "500italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUL1Him6CovpOkXA.ttf",
            "600italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUJFAim6CovpOkXA.ttf",
            "700italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUPVBim6CovpOkXA.ttf",
            "800italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOlCim6CovpOkXA.ttf",
            "900italic": "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUM1Dim6CovpOkXA.ttf",
        },
    },
    {
        family: "Black Ops One",
        category: "display",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/blackopsone/v20/qWcsB6-ypo7xBdr6Xshe96H3WDzRtjkho4M.ttf",
        },
    },
    {
        family: "Yanone Kaffeesatz",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftodtWpcGuLCnXkVA.ttf",
            "300": "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoqNWpcGuLCnXkVA.ttf",
            "500": "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoxNWpcGuLCnXkVA.ttf",
            "600": "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoKNKpcGuLCnXkVA.ttf",
            "700": "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoEdKpcGuLCnXkVA.ttf",
            regular: "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWpcGuLCnXkVA.ttf",
        },
    },
    {
        family: "Lilita One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbUEZ2RFq7AwU.ttf",
        },
    },
    {
        family: "IBM Plex Serif",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTi182zIZj1bIkNo.ttf",
            "200": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3Q-hIzoVrBicOg.ttf",
            "300": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi20-RIzoVrBicOg.ttf",
            "500": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3s-BIzoVrBicOg.ttf",
            "600": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3A_xIzoVrBicOg.ttf",
            "700": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi2k_hIzoVrBicOg.ttf",
            "100italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizHREVNn1dOx-zrZ2X3pZvkTiUa41YTi3TNgNq55w.ttf",
            "200italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4_oyq17jjNOg_oc.ttf",
            "300italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xq17jjNOg_oc.ttf",
            regular: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizDREVNn1dOx-zrZ2X3pZvkThUY0TY7ikbI.ttf",
            italic: "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTiUa2zIZj1bIkNo.ttf",
            "500italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa48Ywq17jjNOg_oc.ttf",
            "600italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3q17jjNOg_oc.ttf",
            "700italic": "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4442q17jjNOg_oc.ttf",
        },
    },
    {
        family: "Plus Jakarta Sans",
        category: "sans-serif",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXUEKi4Rw.ttf",
            "300": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_907NShXUEKi4Rw.ttf",
            "500": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NShXUEKi4Rw.ttf",
            "600": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNShXUEKi4Rw.ttf",
            "700": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNShXUEKi4Rw.ttf",
            "800": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNShXUEKi4Rw.ttf",
            regular: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NShXUEKi4Rw.ttf",
            "200italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lCR_QMq2oR82k.ttf",
            "300italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ17CR_QMq2oR82k.ttf",
            italic: "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0lCR_QMq2oR82k.ttf",
            "500italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0XCR_QMq2oR82k.ttf",
            "600italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ37Dh_QMq2oR82k.ttf",
            "700italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ3CDh_QMq2oR82k.ttf",
            "800italic": "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lDh_QMq2oR82k.ttf",
        },
    },
    {
        family: "Questrial",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/questrial/v18/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
        },
    },
    {
        family: "Domine",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X0DAI10VErGuW8Q.ttf",
            "600": "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X6zHI10VErGuW8Q.ttf",
            "700": "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X5XHI10VErGuW8Q.ttf",
            regular: "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X3LAI10VErGuW8Q.ttf",
        },
    },
    {
        family: "Permanent Marker",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004HaqIfrT5nlk.ttf",
        },
    },
    {
        family: "Signika",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r93zuYzTMngt4xjw.ttf",
            "500": "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9szuYzTMngt4xjw.ttf",
            "600": "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9XzyYzTMngt4xjw.ttf",
            "700": "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9ZjyYzTMngt4xjw.ttf",
            regular: "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9gTuYzTMngt4xjw.ttf",
        },
    },
    {
        family: "Frank Ruhl Libre",
        category: "serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "300": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw6bYVqQPxR2EUR_.ttf",
            "500": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw73YVqQPxR2EUR_.ttf",
            "600": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4bZlqQPxR2EUR_.ttf",
            "700": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4iZlqQPxR2EUR_.ttf",
            "800": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5FZlqQPxR2EUR_.ttf",
            "900": "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5sZlqQPxR2EUR_.ttf",
            regular: "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw7FYVqQPxR2EUR_.ttf",
        },
    },
    {
        family: "M PLUS 1p",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "japanese",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["100", "300", "regular", "500", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/mplus1p/v28/e3tleuShHdiFyPFzBRrQnDQAUW3aq-5N.ttf",
            "300": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQVBYge0PWovdU4w.ttf",
            "500": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQDBcge0PWovdU4w.ttf",
            "700": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQRBEge0PWovdU4w.ttf",
            "800": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQWBIge0PWovdU4w.ttf",
            "900": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQfBMge0PWovdU4w.ttf",
            regular: "http://fonts.gstatic.com/s/mplus1p/v28/e3tjeuShHdiFyPFzBRro-D4Ec2jKqw.ttf",
        },
    },
    {
        family: "Acme",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/acme/v25/RrQfboBx-C5_bx3Lb23lzLk.ttf",
        },
    },
    {
        family: "Almarai",
        category: "sans-serif",
        subsets: ["arabic"],
        variants: ["300", "regular", "700", "800"],
        files: {
            "300": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_anhnicoq72sXg.ttf",
            "700": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS-aghnicoq72sXg.ttf",
            "800": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_qjhnicoq72sXg.ttf",
            regular: "http://fonts.gstatic.com/s/almarai/v12/tsstApxBaigK_hnnc1qPonC3vqc.ttf",
        },
    },
    {
        family: "Chivo",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB7ul2DSFXjQiQ.ttf",
            "200": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PB_ul2DSFXjQiQ.ttf",
            "300": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_4h_ul2DSFXjQiQ.ttf",
            "500": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_jh_ul2DSFXjQiQ.ttf",
            "600": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Yhjul2DSFXjQiQ.ttf",
            "700": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Wxjul2DSFXjQiQ.ttf",
            "800": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PBjul2DSFXjQiQ.ttf",
            "900": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_FRjul2DSFXjQiQ.ttf",
            regular: "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ul2DSFXjQiQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1WrWN33AiasJ.ttf",
            "200italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG1GrWN33AiasJ.ttf",
            "300italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFxY1GrWN33AiasJ.ttf",
            italic: "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1GrWN33AiasJ.ttf",
            "500italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFw01GrWN33AiasJ.ttf",
            "600italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzY02rWN33AiasJ.ttf",
            "700italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzh02rWN33AiasJ.ttf",
            "800italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG02rWN33AiasJ.ttf",
            "900italic": "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyv02rWN33AiasJ.ttf",
        },
    },
    {
        family: "Bree Serif",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/breeserif/v17/4UaHrEJCrhhnVA3DgluAx63j5pN1MwI.ttf",
        },
    },
    {
        family: "Sarabun",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9YHZJmnYI5gnOpg.ttf",
            "200": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YNpoulwm6gDXvwE.ttf",
            "300": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YL5rulwm6gDXvwE.ttf",
            "500": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YOZqulwm6gDXvwE.ttf",
            "600": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YMptulwm6gDXvwE.ttf",
            "700": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf",
            "800": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YLJvulwm6gDXvwE.ttf",
            "100italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVnJx26TKEr37c9aBBx_nwMxAzephhN.ttf",
            "200italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxUl0s7iLSrwFUlw.ttf",
            "300italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxNl4s7iLSrwFUlw.ttf",
            regular: "http://fonts.gstatic.com/s/sarabun/v15/DtVjJx26TKEr37c9WBJDnlQN9gk.ttf",
            italic: "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9aBBJmnYI5gnOpg.ttf",
            "500italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxbl8s7iLSrwFUlw.ttf",
            "600italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxQlgs7iLSrwFUlw.ttf",
            "700italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxJlks7iLSrwFUlw.ttf",
            "800italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxOlos7iLSrwFUlw.ttf",
        },
    },
    {
        family: "Didact Gothic",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/didactgothic/v20/ahcfv8qz1zt6hCC5G4F_P4ASpUySp0LlcyQ.ttf",
        },
    },
    {
        family: "Russo One",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/russoone/v16/Z9XUDmZRWg6M1LvRYsH-yMOInrib9Q.ttf",
        },
    },
    {
        family: "Lexend",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsX_LBte6KuGEo.ttf",
            "200": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sW_LBte6KuGEo.ttf",
            "300": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
            "500": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
            "600": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
            "700": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC9wR_LBte6KuGEo.ttf",
            "800": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sR_LBte6KuGEo.ttf",
            "900": "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC5IR_LBte6KuGEo.ttf",
            regular: "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsW_LBte6KuGEo.ttf",
        },
    },
    {
        family: "Urbanist",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx8fFpOrS8SlKw.ttf",
            "200": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSx4fFpOrS8SlKw.ttf",
            "300": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDlR4fFpOrS8SlKw.ttf",
            "500": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqD-R4fFpOrS8SlKw.ttf",
            "600": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkfFpOrS8SlKw.ttf",
            "700": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDLBkfFpOrS8SlKw.ttf",
            "800": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSxkfFpOrS8SlKw.ttf",
            "900": "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDYhkfFpOrS8SlKw.ttf",
            regular: "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4fFpOrS8SlKw.ttf",
            "100italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VJmvacG1K4S1.ttf",
            "200italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113VZmvacG1K4S1.ttf",
            "300italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA12pVZmvacG1K4S1.ttf",
            italic: "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VZmvacG1K4S1.ttf",
            "500italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA13FVZmvacG1K4S1.ttf",
            "600italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10pUpmvacG1K4S1.ttf",
            "700italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10QUpmvacG1K4S1.ttf",
            "800italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113UpmvacG1K4S1.ttf",
            "900italic": "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA11eUpmvacG1K4S1.ttf",
        },
    },
    {
        family: "Amatic SC",
        category: "handwriting",
        subsets: ["cyrillic", "hebrew", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/amaticsc/v26/TUZ3zwprpvBS1izr_vOMscG6eb8D3WTy-A.ttf",
            regular: "http://fonts.gstatic.com/s/amaticsc/v26/TUZyzwprpvBS1izr_vO0De6ecZQf1A.ttf",
        },
    },
    {
        family: "Alegreya",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "500": "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGxBUI_KCisSGVrw.ttf",
            "600": "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGKBII_KCisSGVrw.ttf",
            "700": "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGERII_KCisSGVrw.ttf",
            "800": "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGdhII_KCisSGVrw.ttf",
            "900": "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGXxII_KCisSGVrw.ttf",
            regular: "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hUI_KCisSGVrw.ttf",
            italic: "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbgv6qmkySFr9V9.ttf",
            "500italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbSv6qmkySFr9V9.ttf",
            "600italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlY-uKqmkySFr9V9.ttf",
            "700italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlYHuKqmkySFr9V9.ttf",
            "800italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZguKqmkySFr9V9.ttf",
            "900italic": "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZJuKqmkySFr9V9.ttf",
        },
    },
    {
        family: "Archivo Narrow",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvHlGKpHOtFCQ76Q.ttf",
            "600": "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhv8laKpHOtFCQ76Q.ttf",
            "700": "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvy1aKpHOtFCQ76Q.ttf",
            regular: "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvLFGKpHOtFCQ76Q.ttf",
            italic: "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJi53mpNiEr6T6Y.ttf",
            "500italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJQ53mpNiEr6T6Y.ttf",
            "600italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BK84HmpNiEr6T6Y.ttf",
            "700italic": "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BKF4HmpNiEr6T6Y.ttf",
        },
    },
    {
        family: "Cinzel",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "500", "600", "700", "800", "900"],
        files: {
            "500": "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnTYrvDE5ZdqU.ttf",
            "600": "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-gjgTYrvDE5ZdqU.ttf",
            "700": "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYrvDE5ZdqU.ttf",
            "800": "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-lbgTYrvDE5ZdqU.ttf",
            "900": "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-n_gTYrvDE5ZdqU.ttf",
            regular: "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.ttf",
        },
    },
    {
        family: "ABeeZee",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
            italic: "http://fonts.gstatic.com/s/abeezee/v22/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf",
        },
    },
    {
        family: "Rowdies",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219hth5O7yKQNute8.ttf",
            "700": "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219gtm5O7yKQNute8.ttf",
            regular: "http://fonts.gstatic.com/s/rowdies/v17/ptRJTieMYPNBAK21zrdJwObZNQo.ttf",
        },
    },
    {
        family: "Vollkorn",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "500": "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2AnGuGWOdEbD63w.ttf",
            "600": "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df27nauGWOdEbD63w.ttf",
            "700": "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df213auGWOdEbD63w.ttf",
            "800": "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2sHauGWOdEbD63w.ttf",
            "900": "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2mXauGWOdEbD63w.ttf",
            regular: "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGWOdEbD63w.ttf",
            italic: "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJGWmmZM7Xq34g9.ttf",
            "500italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJ0WmmZM7Xq34g9.ttf",
            "600italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKYXWmZM7Xq34g9.ttf",
            "700italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKhXWmZM7Xq34g9.ttf",
            "800italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLGXWmZM7Xq34g9.ttf",
            "900italic": "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLvXWmZM7Xq34g9.ttf",
        },
    },
    {
        family: "Sora",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "100": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSn3-KIwNhBti0.ttf",
            "200": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSnn-KIwNhBti0.ttf",
            "300": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmScMnn-KIwNhBti0.ttf",
            "500": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdgnn-KIwNhBti0.ttf",
            "600": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSeMmX-KIwNhBti0.ttf",
            "700": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSe1mX-KIwNhBti0.ttf",
            "800": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSmX-KIwNhBti0.ttf",
            regular: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnn-KIwNhBti0.ttf",
        },
    },
    {
        family: "Saira Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRMQgErUN8XuHNEtX81i9TmEkrnwetA2omSrzS8.ttf",
            "200": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnbcpg8Keepi2lHw.ttf",
            "300": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnCclg8Keepi2lHw.ttf",
            "500": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnUchg8Keepi2lHw.ttf",
            "600": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnfc9g8Keepi2lHw.ttf",
            "700": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnGc5g8Keepi2lHw.ttf",
            "800": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnBc1g8Keepi2lHw.ttf",
            "900": "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnIcxg8Keepi2lHw.ttf",
            regular: "http://fonts.gstatic.com/s/sairacondensed/v11/EJROQgErUN8XuHNEtX81i9TmEkrfpeFE-IyCrw.ttf",
        },
    },
    {
        family: "Exo",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM2CwNsOl4p5Is.ttf",
            "200": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tM3CwNsOl4p5Is.ttf",
            "300": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4g03CwNsOl4p5Is.ttf",
            "500": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4mE3CwNsOl4p5Is.ttf",
            "600": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4o0wCwNsOl4p5Is.ttf",
            "700": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4rQwCwNsOl4p5Is.ttf",
            "800": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tMwCwNsOl4p5Is.ttf",
            "900": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4vowCwNsOl4p5Is.ttf",
            regular: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM3CwNsOl4p5Is.ttf",
            "100italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040FmPnws9Iu-uA.ttf",
            "200italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0BmPnws9Iu-uA.ttf",
            "300italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0vUBmPnws9Iu-uA.ttf",
            italic: "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040BmPnws9Iu-uA.ttf",
            "500italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t00UBmPnws9Iu-uA.ttf",
            "600italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0PUdmPnws9Iu-uA.ttf",
            "700italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0BEdmPnws9Iu-uA.ttf",
            "800italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0dmPnws9Iu-uA.ttf",
            "900italic": "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0SkdmPnws9Iu-uA.ttf",
        },
    },
    {
        family: "Orbitron",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular", "500", "600", "700", "800", "900"],
        files: {
            "500": "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6xpmIyXjU1pg.ttf",
            "600": "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyxSmxpmIyXjU1pg.ttf",
            "700": "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_CmxpmIyXjU1pg.ttf",
            "800": "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nymymxpmIyXjU1pg.ttf",
            "900": "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nysimxpmIyXjU1pg.ttf",
            regular: "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.ttf",
        },
    },
    {
        family: "Kalam",
        category: "handwriting",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtD6GgLLmCUItqGt.ttf",
            "700": "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtDqHQLLmCUItqGt.ttf",
            regular: "http://fonts.gstatic.com/s/kalam/v16/YA9dr0Wd4kDdMuhWMibDszkB.ttf",
        },
    },
    {
        family: "Figtree",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_chQF5ewkEU4HTy.ttf",
            "500": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_dNQF5ewkEU4HTy.ttf",
            "600": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_ehR15ewkEU4HTy.ttf",
            "700": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_eYR15ewkEU4HTy.ttf",
            "800": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_f_R15ewkEU4HTy.ttf",
            "900": "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_fWR15ewkEU4HTy.ttf",
            regular: "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU4HTy.ttf",
            "300italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A-gdyEU25WTybO8.ttf",
            italic: "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A7YdyEU25WTybO8.ttf",
            "500italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A4QdyEU25WTybO8.ttf",
            "600italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A2gayEU25WTybO8.ttf",
            "700italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A1EayEU25WTybO8.ttf",
            "800italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3AzYayEU25WTybO8.ttf",
            "900italic": "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3Ax8ayEU25WTybO8.ttf",
        },
    },
    {
        family: "Montserrat Alternates",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU0xiKfVKphL03l4.ttf",
            "200": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xJIb1ALZH2mBhkw.ttf",
            "300": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIX1ALZH2mBhkw.ttf",
            "500": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xGIT1ALZH2mBhkw.ttf",
            "600": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIP1ALZH2mBhkw.ttf",
            "700": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xUIL1ALZH2mBhkw.ttf",
            "800": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xTIH1ALZH2mBhkw.ttf",
            "900": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xaID1ALZH2mBhkw.ttf",
            "100italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTjWacfw6zH4dthXcyms1lPpC8I_b0juU057p-xIJxp1ml4imo.ttf",
            "200italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8dAbxD-GVxk3Nd.ttf",
            "300italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p95ArxD-GVxk3Nd.ttf",
            regular: "http://fonts.gstatic.com/s/montserratalternates/v17/mFTvWacfw6zH4dthXcyms1lPpC8I_b0juU0J7K3RCJ1b0w.ttf",
            italic: "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU057qfVKphL03l4.ttf",
            "500italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8hA7xD-GVxk3Nd.ttf",
            "600italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8NBLxD-GVxk3Nd.ttf",
            "700italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9pBbxD-GVxk3Nd.ttf",
            "800italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p91BrxD-GVxk3Nd.ttf",
            "900italic": "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9RB7xD-GVxk3Nd.ttf",
        },
    },
    {
        family: "Yantramanav",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["100", "300", "regular", "500", "700", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/yantramanav/v13/flU-Rqu5zY00QEpyWJYWN5-QXeNzDB41rZg.ttf",
            "300": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59Yf8NZIhI8tIHh.ttf",
            "500": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN58AfsNZIhI8tIHh.ttf",
            "700": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59IeMNZIhI8tIHh.ttf",
            "900": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59wesNZIhI8tIHh.ttf",
            regular: "http://fonts.gstatic.com/s/yantramanav/v13/flU8Rqu5zY00QEpyWJYWN6f0V-dRCQ41.ttf",
        },
    },
    {
        family: "Source Serif 4",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdqrhxXD-wGvjU.ttf",
            "300": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiklqrhxXD-wGvjU.ttf",
            "500": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiiVqrhxXD-wGvjU.ttf",
            "600": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjisltrhxXD-wGvjU.ttf",
            "700": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjivBtrhxXD-wGvjU.ttf",
            "800": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdtrhxXD-wGvjU.ttf",
            "900": "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjir5trhxXD-wGvjU.ttf",
            regular: "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjihdqrhxXD-wGvjU.ttf",
            "200italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxl9dC84DrjXEXw.ttf",
            "300italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pGF9dC84DrjXEXw.ttf",
            italic: "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pRl9dC84DrjXEXw.ttf",
            "500italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pdF9dC84DrjXEXw.ttf",
            "600italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pmFhdC84DrjXEXw.ttf",
            "700italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98poVhdC84DrjXEXw.ttf",
            "800italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxlhdC84DrjXEXw.ttf",
            "900italic": "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98p71hdC84DrjXEXw.ttf",
        },
    },
    {
        family: "Alfa Slab One",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alfaslabone/v19/6NUQ8FmMKwSEKjnm5-4v-4Jh6dVretWvYmE.ttf",
        },
    },
    {
        family: "Alegreya Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt5TltuGdShm5bsg.ttf",
            "300": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5fFPmE18imdCqxI.ttf",
            "500": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5alOmE18imdCqxI.ttf",
            "700": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5eFImE18imdCqxI.ttf",
            "800": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5f1LmE18imdCqxI.ttf",
            "900": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5dlKmE18imdCqxI.ttf",
            "100italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUv9_-1phKLFgshYDvh6Vwt7V9V3G1WpGtLsgu7.ttf",
            "300italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VFE92jkVHuxKiBA.ttf",
            regular: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUz9_-1phKLFgshYDvh6Vwt3V1nvEVXlm4.ttf",
            italic: "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt7V9tuGdShm5bsg.ttf",
            "500italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VTE52jkVHuxKiBA.ttf",
            "700italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VBEh2jkVHuxKiBA.ttf",
            "800italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VGEt2jkVHuxKiBA.ttf",
            "900italic": "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VPEp2jkVHuxKiBA.ttf",
        },
    },
    {
        family: "Zeyada",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
        },
    },
    {
        family: "Source Sans 3",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw461EN_io6npfB.ttf",
            "300": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kzm61EN_io6npfB.ttf",
            "500": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KyK61EN_io6npfB.ttf",
            "600": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxm7FEN_io6npfB.ttf",
            "700": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxf7FEN_io6npfB.ttf",
            "800": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw47FEN_io6npfB.ttf",
            "900": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KwR7FEN_io6npfB.ttf",
            regular: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN_io6npfB.ttf",
            "200italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlO9C4Ym4fB3Ts.ttf",
            "300italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqOdO9C4Ym4fB3Ts.ttf",
            italic: "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqLlO9C4Ym4fB3Ts.ttf",
            "500italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqItO9C4Ym4fB3Ts.ttf",
            "600italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqGdJ9C4Ym4fB3Ts.ttf",
            "700italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqF5J9C4Ym4fB3Ts.ttf",
            "800italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlJ9C4Ym4fB3Ts.ttf",
            "900italic": "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqBBJ9C4Ym4fB3Ts.ttf",
        },
    },
    {
        family: "Righteous",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
        },
    },
    {
        family: "Cormorant",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFk9TQ7Rg7A2uwYs.ttf",
            "500": "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFiNTQ7Rg7A2uwYs.ttf",
            "600": "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFs9UQ7Rg7A2uwYs.ttf",
            "700": "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFvZUQ7Rg7A2uwYs.ttf",
            regular: "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Rg7A2uwYs.ttf",
            "300italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQ9fdq6C-r0YvxdA.ttf",
            italic: "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQq_dq6C-r0YvxdA.ttf",
            "500italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQmfdq6C-r0YvxdA.ttf",
            "600italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQdfBq6C-r0YvxdA.ttf",
            "700italic": "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQTPBq6C-r0YvxdA.ttf",
        },
    },
    {
        family: "Neuton",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["200", "300", "regular", "italic", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKAKkfegD5Drog6Q.ttf",
            "300": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKZKofegD5Drog6Q.ttf",
            "700": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKdK0fegD5Drog6Q.ttf",
            "800": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKaK4fegD5Drog6Q.ttf",
            regular: "http://fonts.gstatic.com/s/neuton/v22/UMBTrPtMoH62xUZyyII7civlBw.ttf",
            italic: "http://fonts.gstatic.com/s/neuton/v22/UMBRrPtMoH62xUZCyog_UC71B6M5.ttf",
        },
    },
    {
        family: "Noticia Text",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/noticiatext/v15/VuJpdNDF2Yv9qppOePKYRP1-3R59v2HRrDH0eA.ttf",
            regular: "http://fonts.gstatic.com/s/noticiatext/v15/VuJ2dNDF2Yv9qppOePKYRP1GYTFZt0rNpQ.ttf",
            italic: "http://fonts.gstatic.com/s/noticiatext/v15/VuJodNDF2Yv9qppOePKYRP12YztdlU_dpSjt.ttf",
            "700italic": "http://fonts.gstatic.com/s/noticiatext/v15/VuJrdNDF2Yv9qppOePKYRP12YwPhumvVjjTkeMnz.ttf",
        },
    },
    {
        family: "Noto Kufi Arabic",
        category: "sans-serif",
        subsets: ["arabic"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v3obPnLSmf5yD.ttf",
            "200": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v34bPnLSmf5yD.ttf",
            "300": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh4x34bPnLSmf5yD.ttf",
            "500": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5d34bPnLSmf5yD.ttf",
            "600": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6x2IbPnLSmf5yD.ttf",
            "700": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6I2IbPnLSmf5yD.ttf",
            "800": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v2IbPnLSmf5yD.ttf",
            "900": "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7G2IbPnLSmf5yD.ttf",
            regular: "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v34bPnLSmf5yD.ttf",
        },
    },
    {
        family: "Great Vibes",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/greatvibes/v18/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf",
        },
    },
    {
        family: "Cantarell",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/cantarell/v17/B50IF7ZDq37KMUvlO01xN4dOFISeJY8GgQ.ttf",
            regular: "http://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Ji6hqHK-CLA.ttf",
            italic: "http://fonts.gstatic.com/s/cantarell/v17/B50LF7ZDq37KMUvlO015iaJuPqqSLJYf.ttf",
            "700italic": "http://fonts.gstatic.com/s/cantarell/v17/B50WF7ZDq37KMUvlO015iZrSEY6aB4oWgWHB.ttf",
        },
    },
    {
        family: "Cardo",
        category: "serif",
        subsets: ["greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/cardo/v19/wlpygwjKBV1pqhND-aQR82JHaTBX.ttf",
            regular: "http://fonts.gstatic.com/s/cardo/v19/wlp_gwjKBV1pqiv_1oAZ2H5O.ttf",
            italic: "http://fonts.gstatic.com/s/cardo/v19/wlpxgwjKBV1pqhv93IQ73W5OcCk.ttf",
        },
    },
    {
        family: "Martel",
        category: "serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVqekahRbX9vnDzw.ttf",
            "300": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVzeoahRbX9vnDzw.ttf",
            "600": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVuewahRbX9vnDzw.ttf",
            "700": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV3e0ahRbX9vnDzw.ttf",
            "800": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVwe4ahRbX9vnDzw.ttf",
            "900": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV5e8ahRbX9vnDzw.ttf",
            regular: "http://fonts.gstatic.com/s/martel/v10/PN_xRfK9oXHga0XtYcI-jT3L_w.ttf",
        },
    },
    {
        family: "Passion One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700", "900"],
        files: {
            "700": "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMq037owpYcuH8y.ttf",
            "900": "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMS0X7owpYcuH8y.ttf",
            regular: "http://fonts.gstatic.com/s/passionone/v18/PbynFmL8HhTPqbjUzux3JHuW_Frg6YoV.ttf",
        },
    },
    {
        family: "Courgette",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/courgette/v17/wEO_EBrAnc9BLjLQAUkFUfAL3EsHiA.ttf",
        },
    },
    {
        family: "Spectral",
        category: "serif",
        subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9v2s13GY_etWWIJ.ttf",
            "300": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uSsF3GY_etWWIJ.ttf",
            "500": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vKsV3GY_etWWIJ.ttf",
            "600": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vmtl3GY_etWWIJ.ttf",
            "700": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uCt13GY_etWWIJ.ttf",
            "800": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uetF3GY_etWWIJ.ttf",
            "200italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qrXHafOPXHIJErY.ttf",
            "300italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qtHEafOPXHIJErY.ttf",
            regular: "http://fonts.gstatic.com/s/spectral/v13/rnCr-xNNww_2s0amA-M-mHnOSOuk.ttf",
            italic: "http://fonts.gstatic.com/s/spectral/v13/rnCt-xNNww_2s0amA9M8kn3sTfukQHs.ttf",
            "500italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qonFafOPXHIJErY.ttf",
            "600italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qqXCafOPXHIJErY.ttf",
            "700italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qsHDafOPXHIJErY.ttf",
            "800italic": "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qt3AafOPXHIJErY.ttf",
        },
    },
    {
        family: "Yellowtail",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/yellowtail/v22/OZpGg_pnoDtINPfRIlLotlzNwED-b4g.ttf",
        },
    },
    {
        family: "Space Mono",
        category: "monospace",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/spacemono/v13/i7dMIFZifjKcF5UAWdDRaPpZYFKQHwyVd3U.ttf",
            regular: "http://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRUEZ2RFq7AwU.ttf",
            italic: "http://fonts.gstatic.com/s/spacemono/v13/i7dNIFZifjKcF5UAWdDRYER8QHi-EwWMbg.ttf",
            "700italic": "http://fonts.gstatic.com/s/spacemono/v13/i7dSIFZifjKcF5UAWdDRYERE_FeaGy6QZ3WfYg.ttf",
        },
    },
    {
        family: "Amiri",
        category: "serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf",
            regular: "http://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf",
            italic: "http://fonts.gstatic.com/s/amiri/v27/J7afnpd8CGxBHpUrtLYS6pNLAjk.ttf",
            "700italic": "http://fonts.gstatic.com/s/amiri/v27/J7aanpd8CGxBHpUrjAo9zptgHjAavCA.ttf",
        },
    },
    {
        family: "Tinos",
        category: "serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/tinos/v24/buE1poGnedXvwj1AW0Fp2i43-cxL.ttf",
            regular: "http://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf",
            italic: "http://fonts.gstatic.com/s/tinos/v24/buE2poGnedXvwjX-fmFD9CI-4NU.ttf",
            "700italic": "http://fonts.gstatic.com/s/tinos/v24/buEzpoGnedXvwjX-Rt1s0CoV_NxLeiw.ttf",
        },
    },
    {
        family: "Philosopher",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/philosopher/v19/vEFI2_5QCwIS4_Dhez5jcWjVamgc-NaXXq7H.ttf",
            regular: "http://fonts.gstatic.com/s/philosopher/v19/vEFV2_5QCwIS4_Dhez5jcVBpRUwU08qe.ttf",
            italic: "http://fonts.gstatic.com/s/philosopher/v19/vEFX2_5QCwIS4_Dhez5jcWBrT0g21tqeR7c.ttf",
            "700italic": "http://fonts.gstatic.com/s/philosopher/v19/vEFK2_5QCwIS4_Dhez5jcWBrd_QZ8tK1W77HtMo.ttf",
        },
    },
    {
        family: "Lobster Two",
        category: "display",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/lobstertwo/v20/BngRUXZGTXPUvIoyV6yN5-92w4CByxyKeuDp.ttf",
            regular: "http://fonts.gstatic.com/s/lobstertwo/v20/BngMUXZGTXPUvIoyV6yN59fK7KSJ4ACD.ttf",
            italic: "http://fonts.gstatic.com/s/lobstertwo/v20/BngOUXZGTXPUvIoyV6yN5-fI5qCr5RCDY_k.ttf",
            "700italic": "http://fonts.gstatic.com/s/lobstertwo/v20/BngTUXZGTXPUvIoyV6yN5-fI3hyEwRiof_DpXMY.ttf",
        },
    },
    {
        family: "Titan One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/titanone/v15/mFTzWbsGxbbS_J5cQcjykzIn2Etikg.ttf",
        },
    },
    {
        family: "Patua One",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/patuaone/v20/ZXuke1cDvLCKLDcimxBI5PNvNA9LuA.ttf",
        },
    },
    {
        family: "Changa",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy2xQjDp9htf1ZM.ttf",
            "300": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ_OxQjDp9htf1ZM.ttf",
            "500": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ5-xQjDp9htf1ZM.ttf",
            "600": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ3O2QjDp9htf1ZM.ttf",
            "700": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ0q2QjDp9htf1ZM.ttf",
            "800": "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy22QjDp9htf1ZM.ttf",
            regular: "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ62xQjDp9htf1ZM.ttf",
        },
    },
    {
        family: "Roboto Flex",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/robotoflex/v9/NaN4epOXO_NexZs0b5QrzlOHb8wCikXpYqmZsWI-__OGfttPZktqc2VdZ80KvCLZaPcSBZtOx2MifRuWR28sPJtUMbsFEK6cRrleUx9Xgbm3WLHa_F4Ep4Fm0PN19Ik5Dntczx0wZGzhPlL1YNMYKbv9_1IQXOw7AiUJVXpRJ6cXW4O8TNGoXjC79QRyaLshNDUf3e0O-gn5rrZCu20YNYG0EACUTNK-QKavMlxGIY8dxef0jQ.ttf",
        },
    },
    {
        family: "Ubuntu Condensed",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/ubuntucondensed/v16/u-4k0rCzjgs5J7oXnJcM_0kACGMtf-fVqvHoJXw.ttf",
        },
    },
    {
        family: "Paytone One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/paytoneone/v23/0nksC9P7MfYHj2oFtYm2CiTqivr9iBq_.ttf",
        },
    },
    {
        family: "PT Sans Caption",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlJVP6Hrxmt7-fsUFhlFXNIlpcSwSrUSwWuz38Tgg.ttf",
            regular: "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlMVP6Hrxmt7-fsUFhlFXNIlpcqfQXwQy6yxg.ttf",
        },
    },
    {
        family: "Noto Serif TC",
        category: "serif",
        subsets: ["chinese-traditional", "latin"],
        variants: ["200", "300", "regular", "500", "600", "700", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvr8vbX9GTsoOAX4.otf",
            "300": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvtssbX9GTsoOAX4.otf",
            "500": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvoMtbX9GTsoOAX4.otf",
            "600": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvq8qbX9GTsoOAX4.otf",
            "700": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvssrbX9GTsoOAX4.otf",
            "900": "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvvMpbX9GTsoOAX4.otf",
            regular: "http://fonts.gstatic.com/s/notoseriftc/v23/XLYgIZb5bJNDGYxLBibeHZ0BhnEESXFtUsM.otf",
        },
    },
    {
        family: "Crete Round",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/creteround/v14/55xoey1sJNPjPiv1ZZZrxJ1827zAKnxN.ttf",
            italic: "http://fonts.gstatic.com/s/creteround/v14/55xqey1sJNPjPiv1ZZZrxK1-0bjiL2xNhKc.ttf",
        },
    },
    {
        family: "Encode Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHiZtWP7FJCt2c.ttf",
            "200": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHjZtWP7FJCt2c.ttf",
            "300": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGD_jZtWP7FJCt2c.ttf",
            "500": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGFPjZtWP7FJCt2c.ttf",
            "600": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGL_kZtWP7FJCt2c.ttf",
            "700": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGIbkZtWP7FJCt2c.ttf",
            "800": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHkZtWP7FJCt2c.ttf",
            "900": "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGMjkZtWP7FJCt2c.ttf",
            regular: "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHjZtWP7FJCt2c.ttf",
        },
    },
    {
        family: "Eczar",
        category: "serif",
        subsets: ["devanagari", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXL96WqTIVKWJKWg.ttf",
            "600": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXw9mWqTIVKWJKWg.ttf",
            "700": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDX-tmWqTIVKWJKWg.ttf",
            "800": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXndmWqTIVKWJKWg.ttf",
            regular: "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXHd6WqTIVKWJKWg.ttf",
        },
    },
    {
        family: "Prata",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/prata/v20/6xKhdSpbNNCT-vWIAG_5LWwJ.ttf",
        },
    },
    {
        family: "Noto Serif KR",
        category: "serif",
        subsets: ["korean", "latin"],
        variants: ["200", "300", "regular", "500", "600", "700", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTihC8O1ZNH1ahck.otf",
            "300": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTkxB8O1ZNH1ahck.otf",
            "500": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXThRA8O1ZNH1ahck.otf",
            "600": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTjhH8O1ZNH1ahck.otf",
            "700": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTlxG8O1ZNH1ahck.otf",
            "900": "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTmRE8O1ZNH1ahck.otf",
            regular: "http://fonts.gstatic.com/s/notoserifkr/v20/3Jn7SDn90Gmq2mr3blnHaTZXduZp1ONyKHQ.otf",
        },
    },
    {
        family: "Kaushan Script",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/kaushanscript/v16/vm8vdRfvXFLG3OLnsO15WYS5DF7_ytN3M48a.ttf",
        },
    },
    {
        family: "Francois One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/francoisone/v21/_Xmr-H4zszafZw3A-KPSZutNxgKQu_avAg.ttf",
        },
    },
    {
        family: "Sawarabi Mincho",
        category: "serif",
        subsets: ["japanese", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sawarabimincho/v17/8QIRdiDaitzr7brc8ahpxt6GcIJTLahP46UDUw.ttf",
        },
    },
    {
        family: "Macondo",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/macondo/v25/RrQQboN9-iB1IXmOS2XO0LBBd4Y.ttf",
        },
    },
    {
        family: "Sacramento",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
        },
    },
    {
        family: "Alice",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alice/v20/OpNCnoEEmtHa6FcJpA_chzJ0.ttf",
        },
    },
    {
        family: "Marcellus",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/marcellus/v13/wEO_EBrOk8hQLDvIAF8FUfAL3EsHiA.ttf",
        },
    },
    {
        family: "Arsenal",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/arsenal/v12/wXKuE3kQtZQ4pF3D7-P5JeQAmX8yrdk.ttf",
            regular: "http://fonts.gstatic.com/s/arsenal/v12/wXKrE3kQtZQ4pF3D11_WAewrhXY.ttf",
            italic: "http://fonts.gstatic.com/s/arsenal/v12/wXKpE3kQtZQ4pF3D513cBc4ulXYrtA.ttf",
            "700italic": "http://fonts.gstatic.com/s/arsenal/v12/wXKsE3kQtZQ4pF3D513kueEKnV03vdnKjw.ttf",
        },
    },
    {
        family: "Architects Daughter",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/architectsdaughter/v18/KtkxAKiDZI_td1Lkx62xHZHDtgO_Y-bvfY5q4szgE-Q.ttf",
        },
    },
    {
        family: "El Messiri",
        category: "sans-serif",
        subsets: ["arabic", "cyrillic", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXCe65ghj3OoapG.ttf",
            "600": "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUufK5ghj3OoapG.ttf",
            "700": "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUXfK5ghj3OoapG.ttf",
            regular: "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXwe65ghj3OoapG.ttf",
        },
    },
    {
        family: "Noto Sans Display",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cLVTGQ2iHrvWM.ttf",
            "200": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cKVTGQ2iHrvWM.ttf",
            "300": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_ykKVTGQ2iHrvWM.ttf",
            "500": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_0UKVTGQ2iHrvWM.ttf",
            "600": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_6kNVTGQ2iHrvWM.ttf",
            "700": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_5ANVTGQ2iHrvWM.ttf",
            "800": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cNVTGQ2iHrvWM.ttf",
            "900": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_94NVTGQ2iHrvWM.ttf",
            regular: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf",
            "100italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXOa3gPurWM9uQ.ttf",
            "200italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXKa3gPurWM9uQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9J43Ka3gPurWM9uQ.ttf",
            italic: "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXKa3gPurWM9uQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9Jj3Ka3gPurWM9uQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JY3Wa3gPurWM9uQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JWnWa3gPurWM9uQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXWa3gPurWM9uQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JFHWa3gPurWM9uQ.ttf",
        },
    },
    {
        family: "Gloria Hallelujah",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/gloriahallelujah/v21/LYjYdHv3kUk9BMV96EIswT9DIbW-MLSy3TKEvkCF.ttf",
        },
    },
    {
        family: "Alata",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alata/v9/PbytFmztEwbIofe6xKcRQEOX.ttf",
        },
    },
    {
        family: "Bodoni Moda",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "500": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oXzawIBytVjMYwE.ttf",
            "600": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oZDdwIBytVjMYwE.ttf",
            "700": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oandwIBytVjMYwE.ttf",
            "800": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oc7dwIBytVjMYwE.ttf",
            "900": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oefdwIBytVjMYwE.ttf",
            regular: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oU7awIBytVjMYwE.ttf",
            italic: "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZKMN4sXrJcwHqoQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZGsN4sXrJcwHqoQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZ9sR4sXrJcwHqoQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZz8R4sXrJcwHqoQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZqMR4sXrJcwHqoQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZgcR4sXrJcwHqoQ.ttf",
        },
    },
    {
        family: "Cookie",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/cookie/v21/syky-y18lb0tSbfNlQCT9tPdpw.ttf",
        },
    },
    {
        family: "Lexend Deca",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48MxArBPCqLNflg.ttf",
            "200": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cM1ArBPCqLNflg.ttf",
            "300": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4rs1ArBPCqLNflg.ttf",
            "500": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4ws1ArBPCqLNflg.ttf",
            "600": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4LspArBPCqLNflg.ttf",
            "700": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4F8pArBPCqLNflg.ttf",
            "800": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cMpArBPCqLNflg.ttf",
            "900": "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4WcpArBPCqLNflg.ttf",
            regular: "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48M1ArBPCqLNflg.ttf",
        },
    },
    {
        family: "Gruppo",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/gruppo/v21/WwkfxPmzE06v_ZWFWXDAOIEQUQ.ttf",
        },
    },
    {
        family: "Creepster",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/creepster/v13/AlZy_zVUqJz4yMrniH4hdXf4XB0Tow.ttf",
        },
    },
    {
        family: "Alegreya Sans SC",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Dipl8g5FPYtmMg.ttf",
            "300": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DuJH0iRrMYJ_K-4.ttf",
            "500": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DrpG0iRrMYJ_K-4.ttf",
            "700": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DvJA0iRrMYJ_K-4.ttf",
            "800": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1Du5D0iRrMYJ_K-4.ttf",
            "900": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DspC0iRrMYJ_K-4.ttf",
            "100italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGl4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdlgRBH452Mvds.ttf",
            "300italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdXiZhNaB6O-51OA.ttf",
            regular: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGh4-RGJqfMvt7P8FUr0Q1j-Hf1Nk5v9ixALYs.ttf",
            italic: "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Bkxl8g5FPYtmMg.ttf",
            "500italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdBidhNaB6O-51OA.ttf",
            "700italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdTiFhNaB6O-51OA.ttf",
            "800italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdUiJhNaB6O-51OA.ttf",
            "900italic": "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxddiNhNaB6O-51OA.ttf",
        },
    },
    {
        family: "Pathway Gothic One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pathwaygothicone/v15/MwQrbgD32-KAvjkYGNUUxAtW7pEBwx-dTFxeb80flQ.ttf",
        },
    },
    {
        family: "Concert One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/concertone/v21/VEM1Ro9xs5PjtzCu-srDqRTlhv-CuVAQ.ttf",
        },
    },
    {
        family: "Old Standard TT",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQrbh3o1vLImiwAVvYawgcf2eVWEX-dTFxeb80flQ.ttf",
            regular: "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQubh3o1vLImiwAVvYawgcf2eVurVC5RHdCZg.ttf",
            italic: "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQsbh3o1vLImiwAVvYawgcf2eVer1q9ZnJSZtQG.ttf",
        },
    },
    {
        family: "Advent Pro",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyJPTJoonw1aBA.ttf",
            "200": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyNPTJoonw1aBA.ttf",
            "300": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLHSNPTJoonw1aBA.ttf",
            "500": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLcSNPTJoonw1aBA.ttf",
            "600": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLnSRPTJoonw1aBA.ttf",
            "700": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLpCRPTJoonw1aBA.ttf",
            "800": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyRPTJoonw1aBA.ttf",
            "900": "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpL6iRPTJoonw1aBA.ttf",
            regular: "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyNPTJoonw1aBA.ttf",
            "100italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnDpAsvQhKBH4C.ttf",
            "200italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnD5AsvQhKBH4C.ttf",
            "300italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2D5D5AsvQhKBH4C.ttf",
            italic: "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnD5AsvQhKBH4C.ttf",
            "500italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CVD5AsvQhKBH4C.ttf",
            "600italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2B5CJAsvQhKBH4C.ttf",
            "700italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2BACJAsvQhKBH4C.ttf",
            "800italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnCJAsvQhKBH4C.ttf",
            "900italic": "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AOCJAsvQhKBH4C.ttf",
        },
    },
    {
        family: "Rokkitt",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rydpDLE76HvN6n.ttf",
            "200": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pyd5DLE76HvN6n.ttf",
            "300": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1qsd5DLE76HvN6n.ttf",
            "500": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rAd5DLE76HvN6n.ttf",
            "600": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oscJDLE76HvN6n.ttf",
            "700": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oVcJDLE76HvN6n.ttf",
            "800": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pycJDLE76HvN6n.ttf",
            "900": "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pbcJDLE76HvN6n.ttf",
            regular: "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1ryd5DLE76HvN6n.ttf",
            "100italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiJGbqluc6nu9E.ttf",
            "200italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiIGbqluc6nu9E.ttf",
            "300italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NCaIGbqluc6nu9E.ttf",
            italic: "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiIGbqluc6nu9E.ttf",
            "500italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NEqIGbqluc6nu9E.ttf",
            "600italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NKaPGbqluc6nu9E.ttf",
            "700italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NJ-PGbqluc6nu9E.ttf",
            "800italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiPGbqluc6nu9E.ttf",
            "900italic": "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NNGPGbqluc6nu9E.ttf",
        },
    },
    {
        family: "Luckiest Guy",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/luckiestguy/v22/_gP_1RrxsjcxVyin9l9n_j2RStR3qDpraA.ttf",
        },
    },
    {
        family: "Gothic A1",
        category: "sans-serif",
        subsets: ["korean", "latin"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/gothica1/v13/CSR74z5ZnPydRjlCCwlCCMcqYtd2vfwk.ttf",
            "200": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCpOYKSPl6tOU9Eg.ttf",
            "300": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCwOUKSPl6tOU9Eg.ttf",
            "500": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCmOQKSPl6tOU9Eg.ttf",
            "600": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCtOMKSPl6tOU9Eg.ttf",
            "700": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC0OIKSPl6tOU9Eg.ttf",
            "800": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCzOEKSPl6tOU9Eg.ttf",
            "900": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC6OAKSPl6tOU9Eg.ttf",
            regular: "http://fonts.gstatic.com/s/gothica1/v13/CSR94z5ZnPydRjlCCwl6bM0uQNJmvQ.ttf",
        },
    },
    {
        family: "Sanchez",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/sanchez/v15/Ycm2sZJORluHnXbITm5b_BwE1l0.ttf",
            italic: "http://fonts.gstatic.com/s/sanchez/v15/Ycm0sZJORluHnXbIfmxR-D4Bxl3gkw.ttf",
        },
    },
    {
        family: "Mate",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/mate/v17/m8JdjftRd7WZ2z28WoXSaLU.ttf",
            italic: "http://fonts.gstatic.com/s/mate/v17/m8JTjftRd7WZ6z-2XqfXeLVdbw.ttf",
        },
    },
    {
        family: "Quattrocento Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/quattrocentosans/v18/va9Z4lja2NVIDdIAAoMR5MfuElaRB0RykmrWN33AiasJ.ttf",
            regular: "http://fonts.gstatic.com/s/quattrocentosans/v18/va9c4lja2NVIDdIAAoMR5MfuElaRB3zOvU7eHGHJ.ttf",
            italic: "http://fonts.gstatic.com/s/quattrocentosans/v18/va9a4lja2NVIDdIAAoMR5MfuElaRB0zMt0r8GXHJkLI.ttf",
            "700italic": "http://fonts.gstatic.com/s/quattrocentosans/v18/va9X4lja2NVIDdIAAoMR5MfuElaRB0zMj_bTPXnijLsJV7E.ttf",
        },
    },
    {
        family: "Crimson Pro",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTm18OJE_VNWoyQ.ttf",
            "300": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZkG18OJE_VNWoyQ.ttf",
            "500": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ_G18OJE_VNWoyQ.ttf",
            "600": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZEGp8OJE_VNWoyQ.ttf",
            "700": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZKWp8OJE_VNWoyQ.ttf",
            "800": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTmp8OJE_VNWoyQ.ttf",
            "900": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZZ2p8OJE_VNWoyQ.ttf",
            regular: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18OJE_VNWoyQ.ttf",
            "200italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4Ue5s7dtC4yZNE.ttf",
            "300italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi7Ke5s7dtC4yZNE.ttf",
            italic: "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6Ue5s7dtC4yZNE.ttf",
            "500italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6me5s7dtC4yZNE.ttf",
            "600italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5KfJs7dtC4yZNE.ttf",
            "700italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5zfJs7dtC4yZNE.ttf",
            "800italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4UfJs7dtC4yZNE.ttf",
            "900italic": "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi49fJs7dtC4yZNE.ttf",
        },
    },
    {
        family: "Antic Slab",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/anticslab/v16/bWt97fPFfRzkCa9Jlp6IWcJWXW5p5Qo.ttf",
        },
    },
    {
        family: "Khand",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bL5cFE3ZwaH__-C.ttf",
            "500": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKhcVE3ZwaH__-C.ttf",
            "600": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKNdlE3ZwaH__-C.ttf",
            "700": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bLpd1E3ZwaH__-C.ttf",
            regular: "http://fonts.gstatic.com/s/khand/v17/TwMA-IINQlQQ0YpVWHU_TBqO.ttf",
        },
    },
    {
        family: "Press Start 2P",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580.ttf",
        },
    },
    {
        family: "Sawarabi Gothic",
        category: "sans-serif",
        subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sawarabigothic/v12/x3d4ckfVaqqa-BEj-I9mE65u3k3NBSk3E2YljQ.ttf",
        },
    },
    {
        family: "Saira",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rDosg7lwYmUVY.ttf",
            "200": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rCosg7lwYmUVY.ttf",
            "300": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7wTCosg7lwYmUVY.ttf",
            "500": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA72jCosg7lwYmUVY.ttf",
            "600": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA74TFosg7lwYmUVY.ttf",
            "700": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA773Fosg7lwYmUVY.ttf",
            "800": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rFosg7lwYmUVY.ttf",
            "900": "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7_PFosg7lwYmUVY.ttf",
            regular: "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rCosg7lwYmUVY.ttf",
            "100italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSooxkyQjQVYmxA.ttf",
            "200italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByosxkyQjQVYmxA.ttf",
            "300italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBFIsxkyQjQVYmxA.ttf",
            italic: "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSosxkyQjQVYmxA.ttf",
            "500italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBeIsxkyQjQVYmxA.ttf",
            "600italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBlIwxkyQjQVYmxA.ttf",
            "700italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBrYwxkyQjQVYmxA.ttf",
            "800italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByowxkyQjQVYmxA.ttf",
            "900italic": "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKB44wxkyQjQVYmxA.ttf",
        },
    },
    {
        family: "Ubuntu Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/ubuntumono/v17/KFO-CneDtsqEr0keqCMhbC-BL-Hyv4xGemO1.ttf",
            regular: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOjCneDtsqEr0keqCMhbBc9AMX6lJBP.ttf",
            italic: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOhCneDtsqEr0keqCMhbCc_CsHYkYBPY3o.ttf",
            "700italic": "http://fonts.gstatic.com/s/ubuntumono/v17/KFO8CneDtsqEr0keqCMhbCc_Mn33tYhkf3O1GVg.ttf",
        },
    },
    {
        family: "Yeseva One",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/yesevaone/v22/OpNJno4ck8vc-xYpwWWxpipfWhXD00c.ttf",
        },
    },
    {
        family: "Josefin Slab",
        category: "serif",
        subsets: ["latin"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71mtd3k3K6CcEyI.ttf",
            "200": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W79msd3k3K6CcEyI.ttf",
            "300": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W7wesd3k3K6CcEyI.ttf",
            "500": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W72usd3k3K6CcEyI.ttf",
            "600": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W74erd3k3K6CcEyI.ttf",
            "700": "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W776rd3k3K6CcEyI.ttf",
            regular: "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71msd3k3K6CcEyI.ttf",
            "100italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzs9L4KZAyK43w.ttf",
            "200italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvHzo9L4KZAyK43w.ttf",
            "300italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvwTo9L4KZAyK43w.ttf",
            italic: "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzo9L4KZAyK43w.ttf",
            "500italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvrTo9L4KZAyK43w.ttf",
            "600italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvQT09L4KZAyK43w.ttf",
            "700italic": "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHveD09L4KZAyK43w.ttf",
        },
    },
    {
        family: "Unna",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/unna/v23/AYCLpXzofN0NMiQusGnpRFpr3vc.ttf",
            regular: "http://fonts.gstatic.com/s/unna/v23/AYCEpXzofN0NCpgBlGHCWFM.ttf",
            italic: "http://fonts.gstatic.com/s/unna/v23/AYCKpXzofN0NOpoLkEPHSFNyxw.ttf",
            "700italic": "http://fonts.gstatic.com/s/unna/v23/AYCJpXzofN0NOpozLGzjQHhuzvef5Q.ttf",
        },
    },
    {
        family: "Patrick Hand",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/patrickhand/v23/LDI1apSQOAYtSuYWp8ZhfYeMWcjKm7sp8g.ttf",
        },
    },
    {
        family: "Quattrocento",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/quattrocento/v21/OZpbg_xvsDZQL_LKIF7q4jP_eE3fd6PZsXcM9w.ttf",
            regular: "http://fonts.gstatic.com/s/quattrocento/v21/OZpEg_xvsDZQL_LKIF7q4jPHxGL7f4jFuA.ttf",
        },
    },
    {
        family: "Handlee",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/handlee/v18/-F6xfjBsISg9aMakDmr6oilJ3ik.ttf",
        },
    },
    {
        family: "IBM Plex Sans Condensed",
        category: "sans-serif",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY7KyKvBgYsMDhM.ttf",
            "200": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5m6Yvrr4cFFwq5.ttf",
            "300": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4C6ovrr4cFFwq5.ttf",
            "500": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5a64vrr4cFFwq5.ttf",
            "600": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY527Ivrr4cFFwq5.ttf",
            "700": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4S7Yvrr4cFFwq5.ttf",
            "100italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8hN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8M_LhakJHhOgBg.ttf",
            "200italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8GPqpYMnEhq5H1w.ttf",
            "300italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8AfppYMnEhq5H1w.ttf",
            regular: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8lN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHbauwq_jhJsM.ttf",
            italic: "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYasyKvBgYsMDhM.ttf",
            "500italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8F_opYMnEhq5H1w.ttf",
            "600italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8HPvpYMnEhq5H1w.ttf",
            "700italic": "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8BfupYMnEhq5H1w.ttf",
        },
    },
    {
        family: "Gelasio",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "500", "500italic", "600", "600italic", "700", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_N2CRGEsnIJkWL4.ttf",
            "600": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_PGFRGEsnIJkWL4.ttf",
            "700": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_JWERGEsnIJkWL4.ttf",
            regular: "http://fonts.gstatic.com/s/gelasio/v10/cIf9MaFfvUQxTTqSxCmrYGkHgIs.ttf",
            italic: "http://fonts.gstatic.com/s/gelasio/v10/cIf_MaFfvUQxTTqS9CuhZEsCkIt9QQ.ttf",
            "500italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZkGImmKBhSL7Y1Q.ttf",
            "600italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZvGUmmKBhSL7Y1Q.ttf",
            "700italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZ2GQmmKBhSL7Y1Q.ttf",
        },
    },
    {
        family: "Poiret One",
        category: "display",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/poiretone/v16/UqyVK80NJXN4zfRgbdfbk5lWVscxdKE.ttf",
        },
    },
    {
        family: "Staatliches",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/staatliches/v13/HI_OiY8KO6hCsQSoAPmtMbectJG9O9PS.ttf",
        },
    },
    {
        family: "Mate SC",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/matesc/v22/-nF8OGQ1-uoVr2wKyiXZ95OkJwA.ttf",
        },
    },
    {
        family: "Noto Sans Thai",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RspzF-QRvzzXg.ttf",
            "200": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRtpzF-QRvzzXg.ttf",
            "300": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU8ptpzF-QRvzzXg.ttf",
            "500": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU6ZtpzF-QRvzzXg.ttf",
            "600": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf",
            "700": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU3NqpzF-QRvzzXg.ttf",
            "800": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRqpzF-QRvzzXg.ttf",
            "900": "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUz1qpzF-QRvzzXg.ttf",
            regular: "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtpzF-QRvzzXg.ttf",
        },
    },
    {
        family: "Cuprum",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg9f6ZjzSJjQjgnU.ttf",
            "600": "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgzv9ZjzSJjQjgnU.ttf",
            "700": "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgwL9ZjzSJjQjgnU.ttf",
            regular: "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6ZjzSJjQjgnU.ttf",
            italic: "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25jn_YIhYmknUPEA.ttf",
            "500italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25vH_YIhYmknUPEA.ttf",
            "600italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25UHjYIhYmknUPEA.ttf",
            "700italic": "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25aXjYIhYmknUPEA.ttf",
        },
    },
    {
        family: "Encode Sans Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_76_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-5a-JLQoFI2KR.ttf",
            "200": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-SY6pByQJKnuIFA.ttf",
            "300": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-LY2pByQJKnuIFA.ttf",
            "500": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-dYypByQJKnuIFA.ttf",
            "600": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-WYupByQJKnuIFA.ttf",
            "700": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-PYqpByQJKnuIFA.ttf",
            "800": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-IYmpByQJKnuIFA.ttf",
            "900": "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-BYipByQJKnuIFA.ttf",
            regular: "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_16_LD37rqfuwxyIuaZhE6cRXOLtm2gfTGgaWNDw8VIw.ttf",
        },
    },
    {
        family: "Rubik Mono One",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rubikmonoone/v18/UqyJK8kPP3hjw6ANTdfRk9YSN-8wRqQrc_j9.ttf",
        },
    },
    {
        family: "Yatra One",
        category: "display",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/yatraone/v14/C8ch4copsHzj8p7NaF0xw1OBbRDvXw.ttf",
        },
    },
    {
        family: "Bangers",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bangers/v24/FeVQS0BTqb0h60ACL5la2bxii28.ttf",
        },
    },
    {
        family: "Special Elite",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/specialelite/v18/XLYgIZbkc4JPUL5CVArUVL0nhncESXFtUsM.ttf",
        },
    },
    {
        family: "Readex Pro",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCYUSmgmsglvjkag.ttf",
            "300": "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCv0Smgmsglvjkag.ttf",
            "500": "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC00Smgmsglvjkag.ttf",
            "600": "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCP0Omgmsglvjkag.ttf",
            "700": "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCBkOmgmsglvjkag.ttf",
            regular: "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC4USmgmsglvjkag.ttf",
        },
    },
    {
        family: "Vidaloka",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/vidaloka/v18/7cHrv4c3ipenMKlEass8yn4hnCci.ttf",
        },
    },
    {
        family: "Roboto Serif",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosp6d2Af5fR4k.ttf",
            "200": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqotp6d2Af5fR4k.ttf",
            "300": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElnQtp6d2Af5fR4k.ttf",
            "500": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElhgtp6d2Af5fR4k.ttf",
            "600": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElvQqp6d2Af5fR4k.ttf",
            "700": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEls0qp6d2Af5fR4k.ttf",
            "800": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqoqp6d2Af5fR4k.ttf",
            "900": "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEloMqp6d2Af5fR4k.ttf",
            regular: "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliotp6d2Af5fR4k.ttf",
            "100italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-V8BdxaV4nUFw.ttf",
            "200italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-R8BdxaV4nUFw.ttf",
            "300italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuEeR8BdxaV4nUFw.ttf",
            italic: "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-R8BdxaV4nUFw.ttf",
            "500italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JufeR8BdxaV4nUFw.ttf",
            "600italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JukeN8BdxaV4nUFw.ttf",
            "700italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuqON8BdxaV4nUFw.ttf",
            "800italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-N8BdxaV4nUFw.ttf",
            "900italic": "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Ju5uN8BdxaV4nUFw.ttf",
        },
    },
    {
        family: "Fira Sans Extra Condensed",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3Zyuv1WarE9ncg.ttf",
            "200": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3TCPn3-0oEZ-a2Q.ttf",
            "300": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3VSMn3-0oEZ-a2Q.ttf",
            "500": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3QyNn3-0oEZ-a2Q.ttf",
            "600": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3SCKn3-0oEZ-a2Q.ttf",
            "700": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3USLn3-0oEZ-a2Q.ttf",
            "800": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3ViIn3-0oEZ-a2Q.ttf",
            "900": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3XyJn3-0oEZ-a2Q.ttf",
            "100italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPOcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqW21-ejkp3cn22.ttf",
            "200italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWd36-pGR7e2SvJQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWE32-pGR7e2SvJQ.ttf",
            regular: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPKcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda5fiku3efvE8.ttf",
            italic: "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fquv1WarE9ncg.ttf",
            "500italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWS3y-pGR7e2SvJQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWZ3u-pGR7e2SvJQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWA3q-pGR7e2SvJQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWH3m-pGR7e2SvJQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWO3i-pGR7e2SvJQ.ttf",
        },
    },
    {
        family: "News Cycle",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/newscycle/v23/CSR54z1Qlv-GDxkbKVQ_dFsvaNNUuOwkC2s.ttf",
            regular: "http://fonts.gstatic.com/s/newscycle/v23/CSR64z1Qlv-GDxkbKVQ_TOcATNt_pOU.ttf",
        },
    },
    {
        family: "Commissioner",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNcGPe7Fu0jUdk.ttf",
            "200": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENdGPe7Fu0jUdk.ttf",
            "300": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTJ1dGPe7Fu0jUdk.ttf",
            "500": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTPFdGPe7Fu0jUdk.ttf",
            "600": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTB1aGPe7Fu0jUdk.ttf",
            "700": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTCRaGPe7Fu0jUdk.ttf",
            "800": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENaGPe7Fu0jUdk.ttf",
            "900": "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTGpaGPe7Fu0jUdk.ttf",
            regular: "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNdGPe7Fu0jUdk.ttf",
        },
    },
    {
        family: "Unbounded",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65jx043HgP6LR0Y.ttf",
            "300": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG60bx043HgP6LR0Y.ttf",
            "500": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6yrx043HgP6LR0Y.ttf",
            "600": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG68b2043HgP6LR0Y.ttf",
            "700": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6__2043HgP6LR0Y.ttf",
            "800": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65j2043HgP6LR0Y.ttf",
            "900": "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG67H2043HgP6LR0Y.ttf",
            regular: "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx043HgP6LR0Y.ttf",
        },
    },
    {
        family: "Tangerine",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/tangerine/v17/Iurd6Y5j_oScZZow4VO5srNpjJtM6G0t9w.ttf",
            regular: "http://fonts.gstatic.com/s/tangerine/v17/IurY6Y5j_oScZZow4VOBDpxNhLBQ4Q.ttf",
        },
    },
    {
        family: "Sen",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISBi5H47KlD9q78A.ttf",
            "600": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISPS-H47KlD9q78A.ttf",
            "700": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISM2-H47KlD9q78A.ttf",
            "800": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISKq-H47KlD9q78A.ttf",
            regular: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISCq5H47KlD9q78A.ttf",
        },
    },
    {
        family: "Be Vietnam Pro",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HRUBX8YYbAiah8.ttf",
            "200": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HT4JF8yT7wrcwap.ttf",
            "300": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HScJ18yT7wrcwap.ttf",
            "500": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HTEJl8yT7wrcwap.ttf",
            "600": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HToIV8yT7wrcwap.ttf",
            "700": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSMIF8yT7wrcwap.ttf",
            "800": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSQI18yT7wrcwap.ttf",
            "900": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HS0Il8yT7wrcwap.ttf",
            "100italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVLSTAyLFyeg_IDWvOJmVES_HwyPRsSZZIneh-waA.ttf",
            "200italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPbczRbgJdhapcUU.ttf",
            "300italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPdMwRbgJdhapcUU.ttf",
            regular: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVPSTAyLFyeg_IDWvOJmVES_EwwD3s6ZKAi.ttf",
            italic: "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HwyBX8YYbAiah8.ttf",
            "500italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPYsxRbgJdhapcUU.ttf",
            "600italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPac2RbgJdhapcUU.ttf",
            "700italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPcM3RbgJdhapcUU.ttf",
            "800italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPd80RbgJdhapcUU.ttf",
            "900italic": "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPfs1RbgJdhapcUU.ttf",
        },
    },
    {
        family: "Caladea",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/caladea/v7/kJE2BugZ7AAjhybUtaNY39oYqO52FZ0.ttf",
            regular: "http://fonts.gstatic.com/s/caladea/v7/kJEzBugZ7AAjhybUjR93-9IztOc.ttf",
            italic: "http://fonts.gstatic.com/s/caladea/v7/kJExBugZ7AAjhybUvR19__A2pOdvDA.ttf",
            "700italic": "http://fonts.gstatic.com/s/caladea/v7/kJE0BugZ7AAjhybUvR1FQ98SrMxzBZ2lDA.ttf",
        },
    },
    {
        family: "Aleo",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3G2P9HI4qCBtJ.ttf",
            "200": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3GmP9HI4qCBtJ.ttf",
            "300": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KIpGmP9HI4qCBtJ.ttf",
            "500": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJFGmP9HI4qCBtJ.ttf",
            "600": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKpHWP9HI4qCBtJ.ttf",
            "700": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKQHWP9HI4qCBtJ.ttf",
            "800": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3HWP9HI4qCBtJ.ttf",
            "900": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KLeHWP9HI4qCBtJ.ttf",
            regular: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3GmP9HI4qCBtJ.ttf",
            "100italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu_FooIDQtJbok.ttf",
            "200italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu-FooIDQtJbok.ttf",
            "300italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WdW-FooIDQtJbok.ttf",
            italic: "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu-FooIDQtJbok.ttf",
            "500italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_Wbm-FooIDQtJbok.ttf",
            "600italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WVW5FooIDQtJbok.ttf",
            "700italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WWy5FooIDQtJbok.ttf",
            "800italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu5FooIDQtJbok.ttf",
            "900italic": "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WSK5FooIDQtJbok.ttf",
        },
    },
    {
        family: "Mukta Malar",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "tamil"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMwBtAB62ruoAZW.ttf",
            "300": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINUBdAB62ruoAZW.ttf",
            "500": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMMBNAB62ruoAZW.ttf",
            "600": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMgA9AB62ruoAZW.ttf",
            "700": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINEAtAB62ruoAZW.ttf",
            "800": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINYAdAB62ruoAZW.ttf",
            regular: "http://fonts.gstatic.com/s/muktamalar/v12/MCoXzAXyz8LOE2FpJMxZqLv4LfQJwHbn.ttf",
        },
    },
    {
        family: "Secular One",
        category: "sans-serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/secularone/v12/8QINdiTajsj_87rMuMdKypDlMul7LJpK.ttf",
        },
    },
    {
        family: "Playfair Display SC",
        category: "serif",
        subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nQIpNcsdL4IUMyE.ttf",
            "900": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nTorNcsdL4IUMyE.ttf",
            regular: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke85OhoaMkR6-hSn7kbHVoFf7ZfgMPr_pb4GEcM2M4s.ttf",
            italic: "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke87OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbwMFeEzI4sNKg.ttf",
            "700italic": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0qc4XK6ARIyH5IA.ttf",
            "900italic": "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0kcwXK6ARIyH5IA.ttf",
        },
    },
    {
        family: "Noto Naskh Arabic",
        category: "serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwj85krK0z9_Mnuw.ttf",
            "600": "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwY8lkrK0z9_Mnuw.ttf",
            "700": "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwWslkrK0z9_Mnuw.ttf",
            regular: "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwvc5krK0z9_Mnuw.ttf",
        },
    },
    {
        family: "Baloo 2",
        category: "display",
        subsets: ["devanagari", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgozapv9Fat7WcN.ttf",
            "600": "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdjEyqpv9Fat7WcN.ttf",
            "700": "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdj9yqpv9Fat7WcN.ttf",
            "800": "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdiayqpv9Fat7WcN.ttf",
            regular: "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgazapv9Fat7WcN.ttf",
        },
    },
    {
        family: "Faustina",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHls3IEvGVWWe8tbEg.ttf",
            "500": "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlssIEvGVWWe8tbEg.ttf",
            "600": "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsXIYvGVWWe8tbEg.ttf",
            "700": "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsZYYvGVWWe8tbEg.ttf",
            "800": "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsAoYvGVWWe8tbEg.ttf",
            regular: "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsgoEvGVWWe8tbEg.ttf",
            "300italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsKZWl-SWc5LEnoF.ttf",
            italic: "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsLHWl-SWc5LEnoF.ttf",
            "500italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsL1Wl-SWc5LEnoF.ttf",
            "600italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIZXV-SWc5LEnoF.ttf",
            "700italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIgXV-SWc5LEnoF.ttf",
            "800italic": "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsJHXV-SWc5LEnoF.ttf",
        },
    },
    {
        family: "Mitr",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8fMZFJDUc1NECPY.ttf",
            "300": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8ZcaFJDUc1NECPY.ttf",
            "500": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8c8bFJDUc1NECPY.ttf",
            "600": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8eMcFJDUc1NECPY.ttf",
            "700": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8YcdFJDUc1NECPY.ttf",
            regular: "http://fonts.gstatic.com/s/mitr/v11/pxiLypw5ucZFyTsyMJj_b1o.ttf",
        },
    },
    {
        family: "Allura",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/allura/v21/9oRPNYsQpS4zjuAPjAIXPtrrGA.ttf",
        },
    },
    {
        family: "Literata",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG_F_bcTWCWp8g.ttf",
            "300": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbE-_F_bcTWCWp8g.ttf",
            "500": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbCO_F_bcTWCWp8g.ttf",
            "600": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbM-4F_bcTWCWp8g.ttf",
            "700": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbPa4F_bcTWCWp8g.ttf",
            "800": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG4F_bcTWCWp8g.ttf",
            "900": "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbLi4F_bcTWCWp8g.ttf",
            regular: "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbBG_F_bcTWCWp8g.ttf",
            "200italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7XWSUKTt8iVow.ttf",
            "300italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8obXWSUKTt8iVow.ttf",
            italic: "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8_7XWSUKTt8iVow.ttf",
            "500italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8zbXWSUKTt8iVow.ttf",
            "600italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8IbLWSUKTt8iVow.ttf",
            "700italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8GLLWSUKTt8iVow.ttf",
            "800italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7LWSUKTt8iVow.ttf",
            "900italic": "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8VrLWSUKTt8iVow.ttf",
        },
    },
    {
        family: "Volkhov",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/volkhov/v17/SlGVmQieoJcKemNeeY4hoHRYbDQUego.ttf",
            regular: "http://fonts.gstatic.com/s/volkhov/v17/SlGQmQieoJcKemNeQTIOhHxzcD0.ttf",
            italic: "http://fonts.gstatic.com/s/volkhov/v17/SlGSmQieoJcKemNecTAEgF52YD0NYw.ttf",
            "700italic": "http://fonts.gstatic.com/s/volkhov/v17/SlGXmQieoJcKemNecTA8PHFSaBYRagrQrA.ttf",
        },
    },
    {
        family: "DM Serif Text",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.ttf",
            italic: "http://fonts.gstatic.com/s/dmseriftext/v12/rnCw-xZa_krGokauCeNq1wWyWfGFWFAMArZKqQ.ttf",
        },
    },
    {
        family: "Kosugi Maru",
        category: "sans-serif",
        subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/kosugimaru/v14/0nksC9PgP_wGh21A2KeqGiTqivr9iBq_.ttf",
        },
    },
    {
        family: "Ultra",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/ultra/v23/zOLy4prXmrtY-tT6yLOD6NxF.ttf",
        },
    },
    {
        family: "PT Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/ptmono/v13/9oRONYoBnWILk-9ArCg5MtPyAcg.ttf",
        },
    },
    {
        family: "Carter One",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/carterone/v17/q5uCsoe5IOB2-pXv9UcNIxR2hYxREMs.ttf",
        },
    },
    {
        family: "Nanum Gothic Coding",
        category: "handwriting",
        subsets: ["korean", "latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIYdjzHisX_8vv59_xMxtPFW4IXROws8xgecsV88t5V9r4.ttf",
            regular: "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIVdjzHisX_8vv59_xMxtPFW4IXROwsy6QxVs1X7tc.ttf",
        },
    },
    {
        family: "Viga",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/viga/v14/xMQbuFFdSaiX_QIjD4e2OX8.ttf",
        },
    },
    {
        family: "Libre Caslon Text",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/librecaslontext/v5/DdT578IGsGw1aF1JU10PUbTvNNaDMfID8sdjNR-8ssPt.ttf",
            regular: "http://fonts.gstatic.com/s/librecaslontext/v5/DdT878IGsGw1aF1JU10PUbTvNNaDMcq_3eNrHgO1.ttf",
            italic: "http://fonts.gstatic.com/s/librecaslontext/v5/DdT678IGsGw1aF1JU10PUbTvNNaDMfq91-dJGxO1q9o.ttf",
        },
    },
    {
        family: "Tenor Sans",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/tenorsans/v19/bx6ANxqUneKx06UkIXISr3JyC22IyqI.ttf",
        },
    },
    {
        family: "Ropa Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/ropasans/v15/EYqxmaNOzLlWtsZSScyKWjloU5KP2g.ttf",
            italic: "http://fonts.gstatic.com/s/ropasans/v15/EYq3maNOzLlWtsZSScy6WDNscZef2mNE.ttf",
        },
    },
    {
        family: "Voltaire",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/voltaire/v20/1Pttg8PcRfSblAvGvQooYKVnBOif.ttf",
        },
    },
    {
        family: "Red Hat Text",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML-ZwVrbacYVFtIY.ttf",
            "500": "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML4pwVrbacYVFtIY.ttf",
            "600": "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML2Z3VrbacYVFtIY.ttf",
            "700": "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML193VrbacYVFtIY.ttf",
            regular: "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML7hwVrbacYVFtIY.ttf",
            "300italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAz4PXQdadApIYv_g.ttf",
            italic: "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzvvXQdadApIYv_g.ttf",
            "500italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzjPXQdadApIYv_g.ttf",
            "600italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzYPLQdadApIYv_g.ttf",
            "700italic": "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzWfLQdadApIYv_g.ttf",
        },
    },
    {
        family: "Marck Script",
        category: "handwriting",
        subsets: ["cyrillic", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/marckscript/v20/nwpTtK2oNgBA3Or78gapdwuCzyI-aMPF7Q.ttf",
        },
    },
    {
        family: "Fugaz One",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/fugazone/v19/rax_HiWKp9EAITukFslMBBJek0vA8A.ttf",
        },
    },
    {
        family: "Baskervville",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/baskervville/v16/YA9Ur0yU4l_XOrogbkun3kQgt5OohvbJ9A.ttf",
            italic: "http://fonts.gstatic.com/s/baskervville/v16/YA9Kr0yU4l_XOrogbkun3kQQtZmspPPZ9Mlt.ttf",
        },
    },
    {
        family: "Bungee",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bungee/v13/N0bU2SZBIuF2PU_ECn50Kd_PmA.ttf",
        },
    },
    {
        family: "League Spartan",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oXpBMdcFguczA.ttf",
            "200": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoTpBMdcFguczA.ttf",
            "300": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMoITpBMdcFguczA.ttf",
            "500": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMzITpBMdcFguczA.ttf",
            "600": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMIIPpBMdcFguczA.ttf",
            "700": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMGYPpBMdcFguczA.ttf",
            "800": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoPpBMdcFguczA.ttf",
            "900": "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMV4PpBMdcFguczA.ttf",
            regular: "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oTpBMdcFguczA.ttf",
        },
    },
    {
        family: "Inter Tight",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw6qXCRToK8EPg.ttf",
            "200": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjw-qXCRToK8EPg.ttf",
            "300": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjUQ-qXCRToK8EPg.ttf",
            "500": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjPQ-qXCRToK8EPg.ttf",
            "600": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj0QiqXCRToK8EPg.ttf",
            "700": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj6AiqXCRToK8EPg.ttf",
            "800": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjwiqXCRToK8EPg.ttf",
            "900": "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjpgiqXCRToK8EPg.ttf",
            regular: "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw-qXCRToK8EPg.ttf",
            "100italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHi5XgqoUPvi5.ttf",
            "200italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCHy5XgqoUPvi5.ttf",
            "300italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0wcHy5XgqoUPvi5.ttf",
            italic: "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHy5XgqoUPvi5.ttf",
            "500italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xwHy5XgqoUPvi5.ttf",
            "600italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ycGC5XgqoUPvi5.ttf",
            "700italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ylGC5XgqoUPvi5.ttf",
            "800italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCGC5XgqoUPvi5.ttf",
            "900italic": "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zrGC5XgqoUPvi5.ttf",
        },
    },
    {
        family: "Antonio",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700"],
        files: {
            "100": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8BtIY2DwSXlM.ttf",
            "200": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVzx8RtIY2DwSXlM.ttf",
            "300": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVwv8RtIY2DwSXlM.ttf",
            "500": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxD8RtIY2DwSXlM.ttf",
            "600": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyv9htIY2DwSXlM.ttf",
            "700": "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyW9htIY2DwSXlM.ttf",
            regular: "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8RtIY2DwSXlM.ttf",
        },
    },
    {
        family: "Gudea",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/gudea/v15/neIIzCqgsI0mp9gz26WGHK06UY30.ttf",
            regular: "http://fonts.gstatic.com/s/gudea/v15/neIFzCqgsI0mp-CP9IGON7Ez.ttf",
            italic: "http://fonts.gstatic.com/s/gudea/v15/neILzCqgsI0mp9CN_oWsMqEzSJQ.ttf",
        },
    },
    {
        family: "Parisienne",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/parisienne/v13/E21i_d3kivvAkxhLEVZpcy96DuKuavM.ttf",
        },
    },
    {
        family: "Adamina",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/adamina/v21/j8_r6-DH1bjoc-dwu-reETl4Bno.ttf",
        },
    },
    {
        family: "Taviraj",
        category: "serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzRIorV8N1jU2gog.ttf",
            "200": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRCYKd-lbgUS5u0s.ttf",
            "300": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzREIJd-lbgUS5u0s.ttf",
            "500": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRBoId-lbgUS5u0s.ttf",
            "600": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRDYPd-lbgUS5u0s.ttf",
            "700": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRFIOd-lbgUS5u0s.ttf",
            "800": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRE4Nd-lbgUS5u0s.ttf",
            "900": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRGoMd-lbgUS5u0s.ttf",
            "100italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcdv8Cj3ylylTXzTOwTM8lxr0iwolLl.ttf",
            "200italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTn-hRhWa8q0v8ag.ttf",
            "300italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT--tRhWa8q0v8ag.ttf",
            regular: "http://fonts.gstatic.com/s/taviraj/v13/ahcZv8Cj3ylylTXzfO4hU-FwnU0.ttf",
            italic: "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzTOwrV8N1jU2gog.ttf",
            "500italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTo-pRhWa8q0v8ag.ttf",
            "600italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTj-1RhWa8q0v8ag.ttf",
            "700italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT6-xRhWa8q0v8ag.ttf",
            "800italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT9-9RhWa8q0v8ag.ttf",
            "900italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT0-5RhWa8q0v8ag.ttf",
        },
    },
    {
        family: "Sriracha",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sriracha/v14/0nkrC9D4IuYBgWcI9ObYRQDioeb0.ttf",
        },
    },
    {
        family: "Blinker",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/blinker/v13/cIf_MaFatEE-VTaP_E2hZEsCkIt9QQ.ttf",
            "200": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_OGARGEsnIJkWL4.ttf",
            "300": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_IWDRGEsnIJkWL4.ttf",
            "600": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_PGFRGEsnIJkWL4.ttf",
            "700": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_JWERGEsnIJkWL4.ttf",
            "800": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_ImHRGEsnIJkWL4.ttf",
            "900": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_K2GRGEsnIJkWL4.ttf",
            regular: "http://fonts.gstatic.com/s/blinker/v13/cIf9MaFatEE-VTaPxCmrYGkHgIs.ttf",
        },
    },
    {
        family: "Rock Salt",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rocksalt/v22/MwQ0bhv11fWD6QsAVOZbsEk7hbBWrA.ttf",
        },
    },
    {
        family: "Hind Vadodara",
        category: "sans-serif",
        subsets: ["gujarati", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSDn3iXM0oSOL2Yw.ttf",
            "500": "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSGH2iXM0oSOL2Yw.ttf",
            "600": "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSE3xiXM0oSOL2Yw.ttf",
            "700": "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSCnwiXM0oSOL2Yw.ttf",
            regular: "http://fonts.gstatic.com/s/hindvadodara/v13/neINzCKvrIcn5pbuuuriV9tTcJXfrXsfvSo.ttf",
        },
    },
    {
        family: "Kumbh Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "math"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZcA8bTuUkqaLg.ttf",
            "200": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZYA8bTuUkqaLg.ttf",
            "300": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQz5YA8bTuUkqaLg.ttf",
            "500": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQo5YA8bTuUkqaLg.ttf",
            "600": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQT5EA8bTuUkqaLg.ttf",
            "700": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQdpEA8bTuUkqaLg.ttf",
            "800": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZEA8bTuUkqaLg.ttf",
            "900": "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQOJEA8bTuUkqaLg.ttf",
            regular: "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZYA8bTuUkqaLg.ttf",
        },
    },
    {
        family: "Amaranth",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/amaranth/v18/KtkpALODe433f0j1zMF-OPWi6WDfFpuc.ttf",
            regular: "http://fonts.gstatic.com/s/amaranth/v18/KtkuALODe433f0j1zPnCF9GqwnzW.ttf",
            italic: "http://fonts.gstatic.com/s/amaranth/v18/KtkoALODe433f0j1zMnAHdWIx2zWD4I.ttf",
            "700italic": "http://fonts.gstatic.com/s/amaranth/v18/KtkrALODe433f0j1zMnAJWmn42T9E4ucRY8.ttf",
        },
    },
    {
        family: "Mada",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOkHkw2-m9x2iC.ttf",
            "300": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFmQkHkw2-m9x2iC.ttf",
            "500": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFn8kHkw2-m9x2iC.ttf",
            "600": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkQl3kw2-m9x2iC.ttf",
            "700": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkpl3kw2-m9x2iC.ttf",
            "800": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOl3kw2-m9x2iC.ttf",
            "900": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlnl3kw2-m9x2iC.ttf",
            regular: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFnOkHkw2-m9x2iC.ttf",
        },
    },
    {
        family: "Neucha",
        category: "handwriting",
        subsets: ["cyrillic", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/neucha/v17/q5uGsou0JOdh94bvugNsCxVEgA.ttf",
        },
    },
    {
        family: "Homemade Apple",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/homemadeapple/v22/Qw3EZQFXECDrI2q789EKQZJob3x9Vnksi4M7.ttf",
        },
    },
    {
        family: "Epilogue",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDLiDJXVigHPVA.ttf",
            "200": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDPiDJXVigHPVA.ttf",
            "300": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXbjPiDJXVigHPVA.ttf",
            "500": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXAjPiDJXVigHPVA.ttf",
            "600": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX7jTiDJXVigHPVA.ttf",
            "700": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX1zTiDJXVigHPVA.ttf",
            "800": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDTiDJXVigHPVA.ttf",
            "900": "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXmTTiDJXVigHPVA.ttf",
            regular: "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDPiDJXVigHPVA.ttf",
            "100italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKTp_RqATfVHNU.ttf",
            "200italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKT5_RqATfVHNU.ttf",
            "300italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HBUT5_RqATfVHNU.ttf",
            italic: "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKT5_RqATfVHNU.ttf",
            "500italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HA4T5_RqATfVHNU.ttf",
            "600italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDUSJ_RqATfVHNU.ttf",
            "700italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDtSJ_RqATfVHNU.ttf",
            "800italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKSJ_RqATfVHNU.ttf",
            "900italic": "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCjSJ_RqATfVHNU.ttf",
        },
    },
    {
        family: "Cabin Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwilMH97F15-K1oqQ.ttf",
            "600": "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwiuMb97F15-K1oqQ.ttf",
            "700": "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwi3Mf97F15-K1oqQ.ttf",
            regular: "http://fonts.gstatic.com/s/cabincondensed/v20/nwpMtK6mNhBK2err_hqkYhHRqmwaYOjZ5HZl8Q.ttf",
        },
    },
    {
        family: "Abhaya Libre",
        category: "serif",
        subsets: ["latin", "latin-ext", "sinhala"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYj2ryqtxI6oYtBA.ttf",
            "600": "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYo23yqtxI6oYtBA.ttf",
            "700": "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYx2zyqtxI6oYtBA.ttf",
            "800": "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEY22_yqtxI6oYtBA.ttf",
            regular: "http://fonts.gstatic.com/s/abhayalibre/v14/e3tmeuGtX-Co5MNzeAOqinEge0PWovdU4w.ttf",
        },
    },
    {
        family: "Istok Web",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/istokweb/v24/3qTqojGmgSyUukBzKslhvU5a_mkUYBfcMw.ttf",
            regular: "http://fonts.gstatic.com/s/istokweb/v24/3qTvojGmgSyUukBzKslZAWF-9kIIaQ.ttf",
            italic: "http://fonts.gstatic.com/s/istokweb/v24/3qTpojGmgSyUukBzKslpA2t61EcYaQ7F.ttf",
            "700italic": "http://fonts.gstatic.com/s/istokweb/v24/3qT0ojGmgSyUukBzKslpA1PG-2MQQhLMMygN.ttf",
        },
    },
    {
        family: "Noto Sans Devanagari",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQky-AzoFoW4Ow.ttf",
            "200": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQly-AzoFoW4Ow.ttf",
            "300": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlSoly-AzoFoW4Ow.ttf",
            "500": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlUYly-AzoFoW4Ow.ttf",
            "600": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Alaoiy-AzoFoW4Ow.ttf",
            "700": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlZMiy-AzoFoW4Ow.ttf",
            "800": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQiy-AzoFoW4Ow.ttf",
            "900": "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Ald0iy-AzoFoW4Ow.ttf",
            regular: "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQly-AzoFoW4Ow.ttf",
        },
    },
    {
        family: "Zen Kaku Gothic New",
        category: "sans-serif",
        subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "700", "900"],
        files: {
            "300": "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqpdKaWTSTGlMyd8.ttf",
            "500": "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqs9LaWTSTGlMyd8.ttf",
            "700": "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqodNaWTSTGlMyd8.ttf",
            "900": "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqr9PaWTSTGlMyd8.ttf",
            regular: "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMYW2drQpDw0GjzrVNFf_valaDBcznOkjtiTWz5UGA.ttf",
        },
    },
    {
        family: "Alex Brush",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
        },
    },
    {
        family: "Itim",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/itim/v14/0nknC9ziJOYewARKkc7ZdwU.ttf",
        },
    },
    {
        family: "Albert Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5L_rI32TxAj1g.ttf",
            "200": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5P_rI32TxAj1g.ttf",
            "300": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSH9ZP_rI32TxAj1g.ttf",
            "500": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHmZP_rI32TxAj1g.ttf",
            "600": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHdZT_rI32TxAj1g.ttf",
            "700": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHTJT_rI32TxAj1g.ttf",
            "800": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5T_rI32TxAj1g.ttf",
            "900": "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHApT_rI32TxAj1g.ttf",
            regular: "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5P_rI32TxAj1g.ttf",
            "100italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX7ofybRUz1r5t.ttf",
            "200italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX74fybRUz1r5t.ttf",
            "300italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9BJ74fybRUz1r5t.ttf",
            italic: "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX74fybRUz1r5t.ttf",
            "500italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Al74fybRUz1r5t.ttf",
            "600italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9DJ6IfybRUz1r5t.ttf",
            "700italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Dw6IfybRUz1r5t.ttf",
            "800italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX6IfybRUz1r5t.ttf",
            "900italic": "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9C-6IfybRUz1r5t.ttf",
        },
    },
    {
        family: "Cousine",
        category: "monospace",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "hebrew",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/cousine/v27/d6lNkaiiRdih4SpP9Z8K6T7G09BlnmQ.ttf",
            regular: "http://fonts.gstatic.com/s/cousine/v27/d6lIkaiiRdih4SpPzSMlzTbtz9k.ttf",
            italic: "http://fonts.gstatic.com/s/cousine/v27/d6lKkaiiRdih4SpP_SEvyRTo39l8hw.ttf",
            "700italic": "http://fonts.gstatic.com/s/cousine/v27/d6lPkaiiRdih4SpP_SEXdTvM1_JgjmRpOA.ttf",
        },
    },
    {
        family: "Courier Prime",
        category: "monospace",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/courierprime/v9/u-4k0q2lgwslOqpF_6gQ8kELY7pMf-fVqvHoJXw.ttf",
            regular: "http://fonts.gstatic.com/s/courierprime/v9/u-450q2lgwslOqpF_6gQ8kELWwZjW-_-tvg.ttf",
            italic: "http://fonts.gstatic.com/s/courierprime/v9/u-4n0q2lgwslOqpF_6gQ8kELawRpX837pvjxPA.ttf",
            "700italic": "http://fonts.gstatic.com/s/courierprime/v9/u-4i0q2lgwslOqpF_6gQ8kELawRR4-LfrtPtNXyeAg.ttf",
        },
    },
    {
        family: "Mr Dafoe",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/mrdafoe/v14/lJwE-pIzkS5NXuMMrGiqg7MCxz_C.ttf",
        },
    },
    {
        family: "Playball",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/playball/v20/TK3gWksYAxQ7jbsKcj8Dl-tPKo2t.ttf",
        },
    },
    {
        family: "Anonymous Pro",
        category: "monospace",
        subsets: ["cyrillic", "greek", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/anonymouspro/v21/rP2cp2a15UIB7Un-bOeISG3pFuAT0CnW7KOywKo.ttf",
            regular: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pLlw89CH98Ko.ttf",
            italic: "http://fonts.gstatic.com/s/anonymouspro/v21/rP2fp2a15UIB7Un-bOeISG3pHl428AP44Kqr2Q.ttf",
            "700italic": "http://fonts.gstatic.com/s/anonymouspro/v21/rP2ap2a15UIB7Un-bOeISG3pHl4OTCzc6IG30KqB9Q.ttf",
        },
    },
    {
        family: "Bad Script",
        category: "handwriting",
        subsets: ["cyrillic", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/badscript/v16/6NUT8F6PJgbFWQn47_x7lOwuzd1AZtw.ttf",
        },
    },
    {
        family: "Nanum Pen Script",
        category: "handwriting",
        subsets: ["korean", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/nanumpenscript/v19/daaDSSYiLGqEal3MvdA_FOL_3FkN2z7-aMFCcTU.ttf",
        },
    },
    {
        family: "Merienda",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "300": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5JHhoSU78QGBV0A.ttf",
            "500": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5SHhoSU78QGBV0A.ttf",
            "600": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5pH9oSU78QGBV0A.ttf",
            "700": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5nX9oSU78QGBV0A.ttf",
            "800": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5-n9oSU78QGBV0A.ttf",
            "900": "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5039oSU78QGBV0A.ttf",
            regular: "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5enhoSU78QGBV0A.ttf",
        },
    },
    {
        family: "Hammersmith One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/hammersmithone/v17/qWcyB624q4L_C4jGQ9IK0O_dFlnbshsks4MRXw.ttf",
        },
    },
    {
        family: "Ruda",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "800", "900"],
        files: {
            "500": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJ3si_-2KiSGg-H.ttf",
            "600": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKbtS_-2KiSGg-H.ttf",
            "700": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKitS_-2KiSGg-H.ttf",
            "800": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLFtS_-2KiSGg-H.ttf",
            "900": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLstS_-2KiSGg-H.ttf",
            regular: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJFsi_-2KiSGg-H.ttf",
        },
    },
    {
        family: "Monoton",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/monoton/v19/5h1aiZUrOngCibe4fkbBQ2S7FU8.ttf",
        },
    },
    {
        family: "Lusitana",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/lusitana/v13/CSR74z9ShvucWzsMKyDmaccqYtd2vfwk.ttf",
            regular: "http://fonts.gstatic.com/s/lusitana/v13/CSR84z9ShvucWzsMKxhaRuMiSct_.ttf",
        },
    },
    {
        family: "Comic Neue",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_wHLwpteLwtHJlc.ttf",
            "700": "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_xHMwpteLwtHJlc.ttf",
            "300italic": "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RTplUKylCNlcw_Q.ttf",
            regular: "http://fonts.gstatic.com/s/comicneue/v8/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
            italic: "http://fonts.gstatic.com/s/comicneue/v8/4UaFrEJDsxBrF37olUeD96_p4rFwIwJePw.ttf",
            "700italic": "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RXp5UKylCNlcw_Q.ttf",
        },
    },
    {
        family: "Bai Jamjuree",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0kePuk5A1-yiSgA.ttf",
            "300": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa09eDuk5A1-yiSgA.ttf",
            "500": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0reHuk5A1-yiSgA.ttf",
            "600": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0gebuk5A1-yiSgA.ttf",
            "700": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa05efuk5A1-yiSgA.ttf",
            "200italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oGkpox2S2CgOva.ttf",
            "300italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pikZox2S2CgOva.ttf",
            regular: "http://fonts.gstatic.com/s/baijamjuree/v11/LDI1apSCOBt_aeQQ7ftydoaMWcjKm7sp8g.ttf",
            italic: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIrapSCOBt_aeQQ7ftydoa8W8LOub458jGL.ttf",
            "500italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_o6kJox2S2CgOva.ttf",
            "600italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oWl5ox2S2CgOva.ttf",
            "700italic": "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pylpox2S2CgOva.ttf",
        },
    },
    {
        family: "Pragati Narrow",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8sdRf0T0bS1ffgsPB7WZ-mD2ZD5fd_GJMTlo_4.ttf",
            regular: "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8vdRf0T0bS1ffgsPB7WZ-mD17_ytN3M48a.ttf",
        },
    },
    {
        family: "BIZ UDPGothic",
        category: "sans-serif",
        subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/bizudpgothic/v9/hESq6X5pHAIBjmS84VL0Bue85skjZWEnTABCSQo.ttf",
            regular: "http://fonts.gstatic.com/s/bizudpgothic/v9/hES36X5pHAIBjmS84VL0Bue83nUMQWkMUAk.ttf",
        },
    },
    {
        family: "Noto Sans Malayalam",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "malayalam"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuH9BFzEr6HxEA.ttf",
            "200": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuD9BFzEr6HxEA.ttf",
            "300": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_GOD9BFzEr6HxEA.ttf",
            "500": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_dOD9BFzEr6HxEA.ttf",
            "600": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_mOf9BFzEr6HxEA.ttf",
            "700": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_oef9BFzEr6HxEA.ttf",
            "800": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuf9BFzEr6HxEA.ttf",
            "900": "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_7-f9BFzEr6HxEA.ttf",
            regular: "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuD9BFzEr6HxEA.ttf",
        },
    },
    {
        family: "Varela",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/varela/v16/DPEtYwqExx0AWHXJBBQFfvzDsQ.ttf",
        },
    },
    {
        family: "Lalezar",
        category: "display",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/lalezar/v14/zrfl0HLVx-HwTP82UaDyIiL0RCg.ttf",
        },
    },
    {
        family: "Noto Serif SC",
        category: "serif",
        subsets: ["chinese-simplified", "latin"],
        variants: ["200", "300", "regular", "500", "600", "700", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mm63SzZBEtERe7U.otf",
            "300": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mgq0SzZBEtERe7U.otf",
            "500": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mlK1SzZBEtERe7U.otf",
            "600": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mn6ySzZBEtERe7U.otf",
            "700": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mhqzSzZBEtERe7U.otf",
            "900": "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7miKxSzZBEtERe7U.otf",
            regular: "http://fonts.gstatic.com/s/notoserifsc/v22/H4chBXePl9DZ0Xe7gG9cyOj7oqCcbzhqDtg.otf",
        },
    },
    {
        family: "Saira Semi Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MN6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXdvaOM8rXT-8V8.ttf",
            "200": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfDScMWg3j36Ebz.ttf",
            "300": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXenSsMWg3j36Ebz.ttf",
            "500": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXf_S8MWg3j36Ebz.ttf",
            "600": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfTTMMWg3j36Ebz.ttf",
            "700": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TcMWg3j36Ebz.ttf",
            "800": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXerTsMWg3j36Ebz.ttf",
            "900": "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXePT8MWg3j36Ebz.ttf",
            regular: "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MD6c-2-nnJkHxyCjRcnMHcWVWV1cWRRU8LYuceqGT-.ttf",
        },
    },
    {
        family: "Alexandria",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7T6bHHJ8BRq0b.ttf",
            "200": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7TqbHHJ8BRq0b.ttf",
            "300": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9qlTqbHHJ8BRq0b.ttf",
            "500": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9rJTqbHHJ8BRq0b.ttf",
            "600": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9olSabHHJ8BRq0b.ttf",
            "700": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9ocSabHHJ8BRq0b.ttf",
            "800": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7SabHHJ8BRq0b.ttf",
            "900": "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9pSSabHHJ8BRq0b.ttf",
            regular: "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7TqbHHJ8BRq0b.ttf",
        },
    },
    {
        family: "Mandali",
        category: "sans-serif",
        subsets: ["latin", "telugu"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/mandali/v14/LhWlMVbYOfASNfNUVFk1ZPdcKtA.ttf",
        },
    },
    {
        family: "Calistoga",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/calistoga/v15/6NUU8F2OJg6MeR7l4e0vtMYAwdRZfw.ttf",
        },
    },
    {
        family: "Jura",
        category: "sans-serif",
        subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "kayah-li",
            "latin",
            "latin-ext",
            "vietnamese",
        ],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP0D7auhTfmrH_rt.ttf",
            "500": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1v7auhTfmrH_rt.ttf",
            "600": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP2D6quhTfmrH_rt.ttf",
            "700": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP266quhTfmrH_rt.ttf",
            regular: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7auhTfmrH_rt.ttf",
        },
    },
    {
        family: "Audiowide",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/audiowide/v20/l7gdbjpo0cum0ckerWCtkQXPExpQBw.ttf",
        },
    },
    {
        family: "Unica One",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/unicaone/v18/DPEuYwWHyAYGVTSmalshdtffuEY7FA.ttf",
        },
    },
    {
        family: "Fira Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["regular", "500", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDto1d33mf3VaZBRBQ.ttf",
            "700": "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDtondv3mf3VaZBRBQ.ttf",
            regular: "http://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1weGeLZDtQIfTTkdbJYA.ttf",
        },
    },
    {
        family: "Zen Maru Gothic",
        category: "sans-serif",
        subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "700", "900"],
        files: {
            "300": "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cQWpCPJqa_ajlvw.ttf",
            "500": "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cGWtCPJqa_ajlvw.ttf",
            "700": "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cUW1CPJqa_ajlvw.ttf",
            "900": "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-caW9CPJqa_ajlvw.ttf",
            regular: "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0SIpIxzW5b-RxT-6A8jWAtCp-k7UJmNLGG9A.ttf",
        },
    },
    {
        family: "Reem Kufi",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
            "600": "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
            "700": "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
            regular: "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf",
        },
    },
    {
        family: "Castoro",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/castoro/v19/1q2GY5yMCld3-O4cHYhEzOYenEU.ttf",
            italic: "http://fonts.gstatic.com/s/castoro/v19/1q2EY5yMCld3-O4cLYpOyMQbjEX5fw.ttf",
        },
    },
    {
        family: "Petrona",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsARBH452Mvds.ttf",
            "200": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NsQRBH452Mvds.ttf",
            "300": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk7TsQRBH452Mvds.ttf",
            "500": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6_sQRBH452Mvds.ttf",
            "600": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5TtgRBH452Mvds.ttf",
            "700": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5qtgRBH452Mvds.ttf",
            "800": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NtgRBH452Mvds.ttf",
            "900": "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4ktgRBH452Mvds.ttf",
            regular: "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsQRBH452Mvds.ttf",
            "100italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwDFYpUN-dsIWs.ttf",
            "200italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwCFYpUN-dsIWs.ttf",
            "300italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8rICFYpUN-dsIWs.ttf",
            italic: "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwCFYpUN-dsIWs.ttf",
            "500italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8t4CFYpUN-dsIWs.ttf",
            "600italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8jIFFYpUN-dsIWs.ttf",
            "700italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8gsFFYpUN-dsIWs.ttf",
            "800italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwFFYpUN-dsIWs.ttf",
            "900italic": "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8kUFFYpUN-dsIWs.ttf",
        },
    },
    {
        family: "BenchNine",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["300", "regular", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT--tRhWa8q0v8ag.ttf",
            "700": "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT6-xRhWa8q0v8ag.ttf",
            regular: "http://fonts.gstatic.com/s/benchnine/v16/ahcbv8612zF4jxrwMosrV8N1jU2gog.ttf",
        },
    },
    {
        family: "Niramit",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVXx7tiiEr5_BdZ8.ttf",
            "300": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVRh4tiiEr5_BdZ8.ttf",
            "500": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVUB5tiiEr5_BdZ8.ttf",
            "600": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVWx-tiiEr5_BdZ8.ttf",
            "700": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVQh_tiiEr5_BdZ8.ttf",
            "200italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiXimOq73EZZ_f6w.ttf",
            "300italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiOiqOq73EZZ_f6w.ttf",
            regular: "http://fonts.gstatic.com/s/niramit/v10/I_uuMpWdvgLdNxVLbbRQkiCvs5Y.ttf",
            italic: "http://fonts.gstatic.com/s/niramit/v10/I_usMpWdvgLdNxVLXbZalgKqo5bYbA.ttf",
            "500italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiYiuOq73EZZ_f6w.ttf",
            "600italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiTiyOq73EZZ_f6w.ttf",
            "700italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiKi2Oq73EZZ_f6w.ttf",
        },
    },
    {
        family: "Krub",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZo47KLF4R6gWaf8.ttf",
            "300": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZuo4KLF4R6gWaf8.ttf",
            "500": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZrI5KLF4R6gWaf8.ttf",
            "600": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZp4-KLF4R6gWaf8.ttf",
            "700": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZvo_KLF4R6gWaf8.ttf",
            "200italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQiwLByQ4oTef_6gQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQipLNyQ4oTef_6gQ.ttf",
            regular: "http://fonts.gstatic.com/s/krub/v9/sZlLdRyC6CRYXkYQDLlTW6E.ttf",
            italic: "http://fonts.gstatic.com/s/krub/v9/sZlFdRyC6CRYbkQaCJtWS6EPcA.ttf",
            "500italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi_LJyQ4oTef_6gQ.ttf",
            "600italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi0LVyQ4oTef_6gQ.ttf",
            "700italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQitLRyQ4oTef_6gQ.ttf",
        },
    },
    {
        family: "Jaldi",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/jaldi/v12/or3hQ67z0_CI33voSbT3LLQ1niPn.ttf",
            regular: "http://fonts.gstatic.com/s/jaldi/v12/or3sQ67z0_CI30NUZpD_B6g8.ttf",
        },
    },
    {
        family: "Big Shoulders Display",
        category: "display",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY86JF46SRP4yZQ.ttf",
            "200": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ87JF46SRP4yZQ.ttf",
            "300": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YddE7JF46SRP4yZQ.ttf",
            "500": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0Ydb07JF46SRP4yZQ.ttf",
            "600": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdVE8JF46SRP4yZQ.ttf",
            "700": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdWg8JF46SRP4yZQ.ttf",
            "800": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ88JF46SRP4yZQ.ttf",
            "900": "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8JF46SRP4yZQ.ttf",
            regular: "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY87JF46SRP4yZQ.ttf",
        },
    },
    {
        family: "Monda",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/monda/v16/TK3gWkYFABsmjsLaGz8Dl-tPKo2t.ttf",
            regular: "http://fonts.gstatic.com/s/monda/v16/TK3tWkYFABsmjvpmNBsLvPdG.ttf",
        },
    },
    {
        family: "Days One",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/daysone/v18/mem9YaCnxnKRiYZOCLYVeLkWVNBt.ttf",
        },
    },
    {
        family: "Actor",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/actor/v17/wEOzEBbCkc5cO3ekXygtUMIO.ttf",
        },
    },
    {
        family: "Laila",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzxogNAh14nVcfe.ttf",
            "500": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLypowNAh14nVcfe.ttf",
            "600": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLyFpANAh14nVcfe.ttf",
            "700": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzhpQNAh14nVcfe.ttf",
            regular: "http://fonts.gstatic.com/s/laila/v15/LYjMdG_8nE8jDIRdiidIrEIu.ttf",
        },
    },
    {
        family: "Reenie Beanie",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/reeniebeanie/v20/z7NSdR76eDkaJKZJFkkjuvWxbP2_qoOgf_w.ttf",
        },
    },
    {
        family: "Julius Sans One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/juliussansone/v18/1Pt2g8TAX_SGgBGUi0tGOYEga5W-xXEW6aGXHw.ttf",
        },
    },
    {
        family: "Shippori Mincho",
        category: "serif",
        subsets: ["japanese", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4L9am5JEO5--2zg.ttf",
            "600": "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4A9Gm5JEO5--2zg.ttf",
            "700": "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4Z9Cm5JEO5--2zg.ttf",
            "800": "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4e9Om5JEO5--2zg.ttf",
            regular: "http://fonts.gstatic.com/s/shipporimincho/v14/VdGGAZweH5EbgHY6YExcZfDoj0BA2_-C7LoS7g.ttf",
        },
    },
    {
        family: "Economica",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/economica/v15/Qw3aZQZaHCLgIWa29ZBTjeckCnZ5dHw8iw.ttf",
            regular: "http://fonts.gstatic.com/s/economica/v15/Qw3fZQZaHCLgIWa29ZBrMcgAAl1lfQ.ttf",
            italic: "http://fonts.gstatic.com/s/economica/v15/Qw3ZZQZaHCLgIWa29ZBbM8IEIFh1fWUl.ttf",
            "700italic": "http://fonts.gstatic.com/s/economica/v15/Qw3EZQZaHCLgIWa29ZBbM_q4D3x9Vnksi4M7.ttf",
        },
    },
    {
        family: "Pridi",
        category: "serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1SiE0jRUG0AqUc.ttf",
            "300": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc02i00jRUG0AqUc.ttf",
            "500": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1uik0jRUG0AqUc.ttf",
            "600": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1CjU0jRUG0AqUc.ttf",
            "700": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc0mjE0jRUG0AqUc.ttf",
            regular: "http://fonts.gstatic.com/s/pridi/v13/2sDQZG5JnZLfkfWao2krbl29.ttf",
        },
    },
    {
        family: "Fraunces",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxqjDvTShUtWNg.ttf",
            "200": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxujDvTShUtWNg.ttf",
            "300": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIc6RujDvTShUtWNg.ttf",
            "500": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIchRujDvTShUtWNg.ttf",
            "600": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcaRyjDvTShUtWNg.ttf",
            "700": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcUByjDvTShUtWNg.ttf",
            "800": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxyjDvTShUtWNg.ttf",
            "900": "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcHhyjDvTShUtWNg.ttf",
            regular: "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxujDvTShUtWNg.ttf",
            "100italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTP7Wp05GNi3k.ttf",
            "200italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLTf7Wp05GNi3k.ttf",
            "300italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1gVTf7Wp05GNi3k.ttf",
            italic: "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTf7Wp05GNi3k.ttf",
            "500italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tf7Wp05GNi3k.ttf",
            "600italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1iVSv7Wp05GNi3k.ttf",
            "700italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1isSv7Wp05GNi3k.ttf",
            "800italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLSv7Wp05GNi3k.ttf",
            "900italic": "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jiSv7Wp05GNi3k.ttf",
        },
    },
    {
        family: "Rufina",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/rufina/v15/Yq6W-LyURyLy-aKKHztAvMxenxE0SA.ttf",
            regular: "http://fonts.gstatic.com/s/rufina/v15/Yq6V-LyURyLy-aKyoxRktOdClg.ttf",
        },
    },
    {
        family: "Gochi Hand",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/gochihand/v23/hES06XlsOjtJsgCkx1PkTo71-n0nXWA.ttf",
        },
    },
    {
        family: "Forum",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/forum/v18/6aey4Ky-Vb8Ew_IWMJMa3mnT.ttf",
        },
    },
    {
        family: "Newsreader",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-I_ADOxEPjCggA.ttf",
            "300": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wJo_ADOxEPjCggA.ttf",
            "500": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADOxEPjCggA.ttf",
            "600": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wpojADOxEPjCggA.ttf",
            "700": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wn4jADOxEPjCggA.ttf",
            "800": "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-IjADOxEPjCggA.ttf",
            regular: "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADOxEPjCggA.ttf",
            "200italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoT-ZAHDWwgECi.ttf",
            "300italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMx2T-ZAHDWwgECi.ttf",
            italic: "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwoT-ZAHDWwgECi.ttf",
            "500italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwaT-ZAHDWwgECi.ttf",
            "600italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMz2SOZAHDWwgECi.ttf",
            "700italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMzPSOZAHDWwgECi.ttf",
            "800italic": "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoSOZAHDWwgECi.ttf",
        },
    },
    {
        family: "Allerta Stencil",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/allertastencil/v22/HTx0L209KT-LmIE9N7OR6eiycOeF-zz313DuvQ.ttf",
        },
    },
    {
        family: "Sorts Mill Goudy",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3GZR9MED_6PSuS_50nEaVrfzgEXH0OjpM75PE.ttf",
            italic: "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3AZR9MED_6PSuS_50nEaVrfzgEbH8EirE-9PGLfQ.ttf",
        },
    },
    {
        family: "Pontano Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOSzMncaMp9gzWsE.ttf",
            "500": "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOUDMncaMp9gzWsE.ttf",
            "600": "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOazLncaMp9gzWsE.ttf",
            "700": "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOZXLncaMp9gzWsE.ttf",
            regular: "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOXLMncaMp9gzWsE.ttf",
        },
    },
    {
        family: "Martel Sans",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAX5suHFUknqMxQ.ttf",
            "300": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBz5cuHFUknqMxQ.ttf",
            "600": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAH48uHFUknqMxQ.ttf",
            "700": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBj4suHFUknqMxQ.ttf",
            "800": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hB_4cuHFUknqMxQ.ttf",
            "900": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBb4MuHFUknqMxQ.ttf",
            regular: "http://fonts.gstatic.com/s/martelsans/v12/h0GsssGi7VdzDgKjM-4d8ijfze-PPlUu.ttf",
        },
    },
    {
        family: "Alef",
        category: "sans-serif",
        subsets: ["hebrew", "latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/alef/v21/FeVQS0NQpLYglo50L5la2bxii28.ttf",
            regular: "http://fonts.gstatic.com/s/alef/v21/FeVfS0NQpLYgrjJbC5FxxbU.ttf",
        },
    },
    {
        family: "Londrina Solid",
        category: "display",
        subsets: ["latin"],
        variants: ["100", "300", "regular", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/londrinasolid/v17/flUjRq6sw40kQEJxWNgkLuudGfs9KBYesZHhV64.ttf",
            "300": "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfv1CjY0n53oTrcL.ttf",
            "900": "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfvdDzY0n53oTrcL.ttf",
            regular: "http://fonts.gstatic.com/s/londrinasolid/v17/flUhRq6sw40kQEJxWNgkLuudGcNZIhI8tIHh.ttf",
        },
    },
    {
        family: "Noto Serif Bengali",
        category: "serif",
        subsets: ["bengali", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAH3qn4LjQH8yD.ttf",
            "200": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAHnqn4LjQH8yD.ttf",
            "300": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfdeHnqn4LjQH8yD.ttf",
            "500": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcyHnqn4LjQH8yD.ttf",
            "600": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffeGXqn4LjQH8yD.ttf",
            "700": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffnGXqn4LjQH8yD.ttf",
            "800": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAGXqn4LjQH8yD.ttf",
            "900": "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfepGXqn4LjQH8yD.ttf",
            regular: "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn4LjQH8yD.ttf",
        },
    },
    {
        family: "Squada One",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/squadaone/v18/BCasqZ8XsOrx4mcOk6MtWaA8WDBkHgs.ttf",
        },
    },
    {
        family: "Pangolin",
        category: "handwriting",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pangolin/v11/cY9GfjGcW0FPpi-tWPfK5d3aiLBG.ttf",
        },
    },
    {
        family: "Palanquin",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700"],
        files: {
            "100": "http://fonts.gstatic.com/s/palanquin/v13/9XUhlJ90n1fBFg7ceXwUEltI7rWmZzTH.ttf",
            "200": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUvnpoxJuqbi3ezg.ttf",
            "300": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwU2nloxJuqbi3ezg.ttf",
            "500": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUgnhoxJuqbi3ezg.ttf",
            "600": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUrn9oxJuqbi3ezg.ttf",
            "700": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUyn5oxJuqbi3ezg.ttf",
            regular: "http://fonts.gstatic.com/s/palanquin/v13/9XUnlJ90n1fBFg7ceXwsdlFMzLC2Zw.ttf",
        },
    },
    {
        family: "Nothing You Could Do",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/nothingyoucoulddo/v19/oY1B8fbBpaP5OX3DtrRYf_Q2BPB1SnfZb0OJl1ol2Ymo.ttf",
        },
    },
    {
        family: "Sarala",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/sarala/v12/uK_x4riEZv4o1w9ptjI3OtWYVkMpXA.ttf",
            regular: "http://fonts.gstatic.com/s/sarala/v12/uK_y4riEZv4o1w9RCh0TMv6EXw.ttf",
        },
    },
    {
        family: "Khula",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "600", "700", "800"],
        files: {
            "300": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-ljCvUrC59XwXD.ttf",
            "600": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G_RiivUrC59XwXD.ttf",
            "700": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-1iyvUrC59XwXD.ttf",
            "800": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-piCvUrC59XwXD.ttf",
            regular: "http://fonts.gstatic.com/s/khula/v12/OpNCnoEOns3V7FcJpA_chzJ0.ttf",
        },
    },
    {
        family: "Electrolize",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/electrolize/v18/cIf5Ma1dtE0zSiGSiED7AUEGso5tQafB.ttf",
        },
    },
    {
        family: "Sansita",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic", "800", "800italic", "900", "900italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JKWUaXl0wqVv3_g.ttf",
            "800": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JLmXaXl0wqVv3_g.ttf",
            "900": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JJ2WaXl0wqVv3_g.ttf",
            regular: "http://fonts.gstatic.com/s/sansita/v11/QldONTRRphEb_-V7HBm7TXFf3qw.ttf",
            italic: "http://fonts.gstatic.com/s/sansita/v11/QldMNTRRphEb_-V7LBuxSVNazqx2xg.ttf",
            "700italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ9Xx-xodqz_joDQ.ttf",
            "800italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ6X9-xodqz_joDQ.ttf",
            "900italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJzX5-xodqz_joDQ.ttf",
        },
    },
    {
        family: "Gilda Display",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/gildadisplay/v18/t5tmIRoYMoaYG0WEOh7HwMeR7TnFrpOHYh4.ttf",
        },
    },
    {
        family: "Damion",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/damion/v14/hv-XlzJ3KEUe_YZUbWY3MTFgVg.ttf",
        },
    },
    {
        family: "Italianno",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/italianno/v17/dg4n_p3sv6gCJkwzT6Rnj5YpQwM-gg.ttf",
        },
    },
    {
        family: "Oleo Script",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/oleoscript/v14/raxkHieDvtMOe0iICsUccCDmnmrY2zqUKafv.ttf",
            regular: "http://fonts.gstatic.com/s/oleoscript/v14/rax5HieDvtMOe0iICsUccBhasU7Q8Cad.ttf",
        },
    },
    {
        family: "Noto Sans Tamil",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "tamil"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGor0RqKDt_EvT.ttf",
            "200": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGo70RqKDt_EvT.ttf",
            "300": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7uYo70RqKDt_EvT.ttf",
            "500": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7v0o70RqKDt_EvT.ttf",
            "600": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7sYpL0RqKDt_EvT.ttf",
            "700": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7shpL0RqKDt_EvT.ttf",
            "800": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGpL0RqKDt_EvT.ttf",
            "900": "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tvpL0RqKDt_EvT.ttf",
            regular: "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70RqKDt_EvT.ttf",
        },
    },
    {
        family: "Share Tech Mono",
        category: "monospace",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFc7pAsEIc3Xew.ttf",
        },
    },
    {
        family: "Syne",
        category: "sans-serif",
        subsets: ["greek", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700", "800"],
        files: {
            "500": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_0KuT6kR47NCV5Z.ttf",
            "600": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3mvj6kR47NCV5Z.ttf",
            "700": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6kR47NCV5Z.ttf",
            "800": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6kR47NCV5Z.ttf",
            regular: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6kR47NCV5Z.ttf",
        },
    },
    {
        family: "Shrikhand",
        category: "display",
        subsets: ["gujarati", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/shrikhand/v15/a8IbNovtLWfR7T7bMJwbBIiQ0zhMtA.ttf",
        },
    },
    {
        family: "DM Mono",
        category: "monospace",
        subsets: ["latin", "latin-ext"],
        variants: ["300", "300italic", "regular", "italic", "500", "500italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvrGyIYSnbKX9Rlk.ttf",
            "500": "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvumzIYSnbKX9Rlk.ttf",
            "300italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-orYataIf4VllXuA.ttf",
            regular: "http://fonts.gstatic.com/s/dmmono/v14/aFTU7PB1QTsUX8KYhh2aBYyMcKw.ttf",
            italic: "http://fonts.gstatic.com/s/dmmono/v14/aFTW7PB1QTsUX8KYth-QAa6JYKzkXw.ttf",
            "500italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-o9YetaIf4VllXuA.ttf",
        },
    },
    {
        family: "Cabin Sketch",
        category: "display",
        subsets: ["latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/cabinsketch/v21/QGY2z_kZZAGCONcK2A4bGOj0I_1o4dLyI4CMFw.ttf",
            regular: "http://fonts.gstatic.com/s/cabinsketch/v21/QGYpz_kZZAGCONcK2A4bGOjMn9JM6fnuKg.ttf",
        },
    },
    {
        family: "Black Han Sans",
        category: "sans-serif",
        subsets: ["korean", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/blackhansans/v17/ea8Aad44WunzF9a-dL6toA8r8nqVIXSkH-Hc.ttf",
        },
    },
    {
        family: "Ramabhadra",
        category: "sans-serif",
        subsets: ["latin", "telugu"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/ramabhadra/v15/EYq2maBOwqRW9P1SQ83LehNGX5uWw3o.ttf",
        },
    },
    {
        family: "Armata",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/armata/v20/gokvH63_HV5jQ-E9lD53Q2u_mQ.ttf",
        },
    },
    {
        family: "Six Caps",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/sixcaps/v20/6ae_4KGrU7VR7bNmabcS9XXaPCop.ttf",
        },
    },
    {
        family: "Cutive Mono",
        category: "monospace",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/cutivemono/v20/m8JWjfRfY7WVjVi2E-K9H5RFRG-K3Mud.ttf",
        },
    },
    {
        family: "Pinyon Script",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pinyonscript/v21/6xKpdSJbL9-e9LuoeQiDRQR8aOLQO4bhiDY.ttf",
        },
    },
    {
        family: "Quantico",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/quantico/v17/rax5HiSdp9cPL3KIF7TQARhasU7Q8Cad.ttf",
            regular: "http://fonts.gstatic.com/s/quantico/v17/rax-HiSdp9cPL3KIF4xsLjxSmlLZ.ttf",
            italic: "http://fonts.gstatic.com/s/quantico/v17/rax4HiSdp9cPL3KIF7xuJDhwn0LZ6T8.ttf",
            "700italic": "http://fonts.gstatic.com/s/quantico/v17/rax7HiSdp9cPL3KIF7xuHIRfu0ry9TadML4.ttf",
        },
    },
    {
        family: "Libre Barcode 39",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/librebarcode39/v21/-nFnOHM08vwC6h8Li1eQnP_AHzI2K_d709jy92k.ttf",
        },
    },
    {
        family: "Glegoo",
        category: "serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/glegoo/v16/_Xmu-HQyrTKWaw2xN4a9CKRpzimMsg.ttf",
            regular: "http://fonts.gstatic.com/s/glegoo/v16/_Xmt-HQyrTKWaw2Ji6mZAI91xw.ttf",
        },
    },
    {
        family: "Sintony",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/sintony/v15/XoHj2YDqR7-98cVUGYgIn9cDkjLp6C8.ttf",
            regular: "http://fonts.gstatic.com/s/sintony/v15/XoHm2YDqR7-98cVUITQnu98ojjs.ttf",
        },
    },
    {
        family: "Chewy",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wk5xIDMfO-ed.ttf",
        },
    },
    {
        family: "Antic",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/antic/v19/TuGfUVB8XY5DRaZLodgzydtk.ttf",
        },
    },
    {
        family: "Noto Sans Bengali",
        category: "sans-serif",
        subsets: ["bengali", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKudCk8izI0lc.ttf",
            "200": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglLudCk8izI0lc.ttf",
            "300": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmstdLudCk8izI0lc.ttf",
            "500": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsrtLudCk8izI0lc.ttf",
            "600": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsldMudCk8izI0lc.ttf",
            "700": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6Kmsm5MudCk8izI0lc.ttf",
            "800": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglMudCk8izI0lc.ttf",
            "900": "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsiBMudCk8izI0lc.ttf",
            regular: "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolLudCk8izI0lc.ttf",
        },
    },
    {
        family: "VT323",
        category: "monospace",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2hsYHpT2dkNE.ttf",
        },
    },
    {
        family: "Short Stack",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/shortstack/v15/bMrzmS2X6p0jZC6EcmPFX-SScX8D0nq6.ttf",
        },
    },
    {
        family: "Leckerli One",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/leckerlione/v20/V8mCoQH8VCsNttEnxnGQ-1itLZxcBtItFw.ttf",
        },
    },
    {
        family: "Karma",
        category: "serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY8Z_uqzGQC_-.ttf",
            "500": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLibYsZ_uqzGQC_-.ttf",
            "600": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLi3ZcZ_uqzGQC_-.ttf",
            "700": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjTZMZ_uqzGQC_-.ttf",
            regular: "http://fonts.gstatic.com/s/karma/v16/va9I4kzAzMZRGIBvS-J3kbDP.ttf",
        },
    },
    {
        family: "Koulen",
        category: "display",
        subsets: ["khmer", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/koulen/v27/AMOQz46as3KIBPeWgnA9kuYMUg.ttf",
        },
    },
    {
        family: "Holtwood One SC",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/holtwoodonesc/v20/yYLx0hLR0P-3vMFSk1TCq3Txg5B3cbb6LZttyg.ttf",
        },
    },
    {
        family: "Aclonica",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/aclonica/v22/K2FyfZJVlfNNSEBXGb7TCI6oBjLz.ttf",
        },
    },
    {
        family: "Oxanium",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["200", "300", "regular", "500", "600", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JfniMBXQ7d67x.ttf",
            "300": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G80XfniMBXQ7d67x.ttf",
            "500": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G817fniMBXQ7d67x.ttf",
            "600": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82XeXiMBXQ7d67x.ttf",
            "700": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82ueXiMBXQ7d67x.ttf",
            "800": "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JeXiMBXQ7d67x.ttf",
            regular: "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G81JfniMBXQ7d67x.ttf",
        },
    },
    {
        family: "Basic",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/basic/v17/xfu_0WLxV2_XKQN34lDVyR7D.ttf",
        },
    },
    {
        family: "K2D",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0ErE6UpvrIw74NL.ttf",
            "200": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erv4QJlJw85ppSGw.ttf",
            "300": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er24cJlJw85ppSGw.ttf",
            "500": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erg4YJlJw85ppSGw.ttf",
            "600": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Err4EJlJw85ppSGw.ttf",
            "700": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Ery4AJlJw85ppSGw.ttf",
            "800": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er14MJlJw85ppSGw.ttf",
            "100italic": "http://fonts.gstatic.com/s/k2d/v11/J7afnpF2V0EjdZ1NtLYS6pNLAjk.ttf",
            "200italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3hlZY4xJ9CGyAa.ttf",
            "300italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2FlpY4xJ9CGyAa.ttf",
            regular: "http://fonts.gstatic.com/s/k2d/v11/J7aTnpF2V0ETd68tnLcg7w.ttf",
            italic: "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0EjdaUpvrIw74NL.ttf",
            "500italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3dl5Y4xJ9CGyAa.ttf",
            "600italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3xkJY4xJ9CGyAa.ttf",
            "700italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2VkZY4xJ9CGyAa.ttf",
            "800italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2JkpY4xJ9CGyAa.ttf",
        },
    },
    {
        family: "JetBrains Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yK1jPVmUsaaDhw.ttf",
            "200": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKxjPVmUsaaDhw.ttf",
            "300": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8lqxjPVmUsaaDhw.ttf",
            "500": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPVmUsaaDhw.ttf",
            "600": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8FqtjPVmUsaaDhw.ttf",
            "700": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPVmUsaaDhw.ttf",
            "800": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKtjPVmUsaaDhw.ttf",
            regular: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf",
            "100italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-Lf1OQk6OThxPA.ttf",
            "200italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LflOQk6OThxPA.ttf",
            "300italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO_VflOQk6OThxPA.ttf",
            italic: "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-LflOQk6OThxPA.ttf",
            "500italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-5flOQk6OThxPA.ttf",
            "600italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9VeVOQk6OThxPA.ttf",
            "700italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9seVOQk6OThxPA.ttf",
            "800italic": "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LeVOQk6OThxPA.ttf",
        },
    },
    {
        family: "Arapey",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/arapey/v16/-W__XJn-UDDA2RC6Z9AcZkIzeg.ttf",
            italic: "http://fonts.gstatic.com/s/arapey/v16/-W_9XJn-UDDA2RCKZdoYREcjeo0k.ttf",
        },
    },
    {
        family: "Alatsi",
        category: "sans-serif",
        subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alatsi/v11/TK3iWkUJAxQ2nLNGHjUHte5fKg.ttf",
        },
    },
    {
        family: "Playfair",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPlKetgdoSMw5ifm.ttf",
            "500": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkmetgdoSMw5ifm.ttf",
            "600": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnKfdgdoSMw5ifm.ttf",
            "700": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnzfdgdoSMw5ifm.ttf",
            "800": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPmUfdgdoSMw5ifm.ttf",
            "900": "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPm9fdgdoSMw5ifm.ttf",
            regular: "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkUetgdoSMw5ifm.ttf",
            "300italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOW5eqycS4zfmNrE.ttf",
            italic: "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOTBeqycS4zfmNrE.ttf",
            "500italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOQJeqycS4zfmNrE.ttf",
            "600italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOe5ZqycS4zfmNrE.ttf",
            "700italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOddZqycS4zfmNrE.ttf",
            "800italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcObBZqycS4zfmNrE.ttf",
            "900italic": "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOZlZqycS4zfmNrE.ttf",
        },
    },
    {
        family: "Athiti",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["200", "300", "regular", "500", "600", "700"],
        files: {
            "200": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAxDNyAv2-C99ycg.ttf",
            "300": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAoDByAv2-C99ycg.ttf",
            "500": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA-DFyAv2-C99ycg.ttf",
            "600": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA1DZyAv2-C99ycg.ttf",
            "700": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAsDdyAv2-C99ycg.ttf",
            regular: "http://fonts.gstatic.com/s/athiti/v12/pe0vMISdLIZIv1w4DBhWCtaiAg.ttf",
        },
    },
    {
        family: "Rammetto One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rammettoone/v18/LhWiMV3HOfMbMetJG3lQDpp9Mvuciu-_SQ.ttf",
        },
    },
    {
        family: "Berkshire Swash",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/berkshireswash/v20/ptRRTi-cavZOGqCvnNJDl5m5XmNPrcQybX4pQA.ttf",
        },
    },
    {
        family: "Noto Sans Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNI49rXVEQQL8Y.ttf",
            "200": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNJ49rXVEQQL8Y.ttf",
            "300": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_A1J49rXVEQQL8Y.ttf",
            "500": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_GFJ49rXVEQQL8Y.ttf",
            "600": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_I1O49rXVEQQL8Y.ttf",
            "700": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_LRO49rXVEQQL8Y.ttf",
            "800": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNO49rXVEQQL8Y.ttf",
            "900": "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_PpO49rXVEQQL8Y.ttf",
            regular: "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNJ49rXVEQQL8Y.ttf",
        },
    },
    {
        family: "Saira Extra Condensed",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFsOHYr-vcC7h8MklGBkrvmUG9rbpkisrTri0jx9i5ss3a3.ttf",
            "200": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrJ2nR3ABgum-uoQ.ttf",
            "300": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrQ2rR3ABgum-uoQ.ttf",
            "500": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrG2vR3ABgum-uoQ.ttf",
            "600": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrN2zR3ABgum-uoQ.ttf",
            "700": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrU23R3ABgum-uoQ.ttf",
            "800": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrT27R3ABgum-uoQ.ttf",
            "900": "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTra2_R3ABgum-uoQ.ttf",
            regular: "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFiOHYr-vcC7h8MklGBkrvmUG9rbpkisrTT70L11Ct8sw.ttf",
        },
    },
    {
        family: "Kreon",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvPNimejUfp2dWNg.ttf",
            "500": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvUNimejUfp2dWNg.ttf",
            "600": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvvN-mejUfp2dWNg.ttf",
            "700": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2Dnvhd-mejUfp2dWNg.ttf",
            regular: "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvYtimejUfp2dWNg.ttf",
        },
    },
    {
        family: "Hind Guntur",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "telugu"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yGn1czn9zaj5Ju.ttf",
            "500": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zenlczn9zaj5Ju.ttf",
            "600": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zymVczn9zaj5Ju.ttf",
            "700": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yWmFczn9zaj5Ju.ttf",
            regular: "http://fonts.gstatic.com/s/hindguntur/v12/wXKvE3UZrok56nvamSuJd8Qqt3M7tMDT.ttf",
        },
    },
    {
        family: "STIX Two Text",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YihS2SOYWxFMN1WD.ttf",
            "600": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yii-3iOYWxFMN1WD.ttf",
            "700": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YiiH3iOYWxFMN1WD.ttf",
            regular: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yihg2SOYWxFMN1WD.ttf",
            italic: "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omsvbURVuMkWDmSo.ttf",
            "500italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omvnbURVuMkWDmSo.ttf",
            "600italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omhXcURVuMkWDmSo.ttf",
            "700italic": "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omizcURVuMkWDmSo.ttf",
        },
    },
    {
        family: "Amita",
        category: "handwriting",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/amita/v18/HhyXU5si9Om7PTHTLtCCOopCTKkI.ttf",
            regular: "http://fonts.gstatic.com/s/amita/v18/HhyaU5si9Om7PQlvAfSKEZZL.ttf",
        },
    },
    {
        family: "PT Serif Caption",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVl2ZhbGCW-JoW6S34pSDpqYKU059WxDCs5cvI.ttf",
            italic: "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVj2ZhbGCW-JoW6S34pSDpqYKU019e7CAk8YvJEeg.ttf",
        },
    },
    {
        family: "Caveat Brush",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/caveatbrush/v11/EYq0maZfwr9S9-ETZc3fKXtMW7mT03pdQw.ttf",
        },
    },
    {
        family: "Lemonada",
        category: "display",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGJOt2mfWc3Z2pTg.ttf",
            "500": "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGSOt2mfWc3Z2pTg.ttf",
            "600": "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGpOx2mfWc3Z2pTg.ttf",
            "700": "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGnex2mfWc3Z2pTg.ttf",
            regular: "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGeut2mfWc3Z2pTg.ttf",
        },
    },
    {
        family: "Racing Sans One",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/racingsansone/v15/sykr-yRtm7EvTrXNxkv5jfKKyDCwL3rmWpIBtA.ttf",
        },
    },
    {
        family: "Atkinson Hyperlegible",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt73C1KxNDXMspQ1lPyU89-1h6ONRlW45G8WbcNcy-OZFy-FA.ttf",
            regular: "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt23C1KxNDXMspQ1lPyU89-1h6ONRlW45GE5ZgpewSSbQ.ttf",
            italic: "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt43C1KxNDXMspQ1lPyU89-1h6ONRlW45G055ItWQGCbUWn.ttf",
            "700italic": "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt93C1KxNDXMspQ1lPyU89-1h6ONRlW45G056qRdiWKRlmuFH24.ttf",
        },
    },
    {
        family: "Markazi Text",
        category: "serif",
        subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtcaQT4MlBekmJLo.ttf",
            "600": "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtSqXT4MlBekmJLo.ttf",
            "700": "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtROXT4MlBekmJLo.ttf",
            regular: "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtfSQT4MlBekmJLo.ttf",
        },
    },
    {
        family: "GFS Didot",
        category: "serif",
        subsets: ["greek"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/gfsdidot/v15/Jqzh5TybZ9vZMWFssvwiF-fGFSCGAA.ttf",
        },
    },
    {
        family: "Charm",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/charm/v11/7cHrv4oii5K0Md6TDss8yn4hnCci.ttf",
            regular: "http://fonts.gstatic.com/s/charm/v11/7cHmv4oii5K0MeYvIe804WIo.ttf",
        },
    },
    {
        family: "Changa One",
        category: "display",
        subsets: ["latin"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/changaone/v20/xfu00W3wXn3QLUJXhzq46AbouLfbK64.ttf",
            italic: "http://fonts.gstatic.com/s/changaone/v20/xfu20W3wXn3QLUJXhzq42ATivJXeO67ISw.ttf",
        },
    },
    {
        family: "Boogaloo",
        category: "display",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
        },
    },
    {
        family: "Julee",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/julee/v25/TuGfUVB3RpZPQ6ZLodgzydtk.ttf",
        },
    },
    {
        family: "Covered By Your Grace",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/coveredbyyourgrace/v15/QGYwz-AZahWOJJI9kykWW9mD6opopoqXSOS0FgItq6bFIg.ttf",
        },
    },
    {
        family: "Cantata One",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/cantataone/v15/PlI5Fl60Nb5obNzNe2jslVxEt8CwfGaD.ttf",
        },
    },
    {
        family: "Yrsa",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCjASNNV9rRPfrKu.ttf",
            "500": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCisSNNV9rRPfrKu.ttf",
            "600": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaChAT9NV9rRPfrKu.ttf",
            "700": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCh5T9NV9rRPfrKu.ttf",
            regular: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCieSNNV9rRPfrKu.ttf",
            "300italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
            italic: "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCzsW_LBte6KuGEo.ttf",
            "500italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
            "600italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
            "700italic": "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC9wR_LBte6KuGEo.ttf",
        },
    },
    {
        family: "Nanum Brush Script",
        category: "handwriting",
        subsets: ["korean", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/nanumbrushscript/v22/wXK2E2wfpokopxzthSqPbcR5_gVaxazyjqBr1lO97Q.ttf",
        },
    },
    {
        family: "Trirong",
        category: "serif",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "800",
            "800italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOl-go3YRl6ujngw.ttf",
            "200": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl0QJ_a5L5uH-mts.ttf",
            "300": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlyAK_a5L5uH-mts.ttf",
            "500": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl3gL_a5L5uH-mts.ttf",
            "600": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl1QM_a5L5uH-mts.ttf",
            "700": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlzAN_a5L5uH-mts.ttf",
            "800": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlywO_a5L5uH-mts.ttf",
            "900": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlwgP_a5L5uH-mts.ttf",
            "100italic": "http://fonts.gstatic.com/s/trirong/v15/7r3CqXNgp8wxdOdOn44QuY5hyO33g8IY.ttf",
            "200italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QFa9B4sP7itsB5g.ttf",
            "300italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QcaxB4sP7itsB5g.ttf",
            regular: "http://fonts.gstatic.com/s/trirong/v15/7r3GqXNgp8wxdOdOr4wi2aZg-ug.ttf",
            italic: "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOn44o3YRl6ujngw.ttf",
            "500italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QKa1B4sP7itsB5g.ttf",
            "600italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QBapB4sP7itsB5g.ttf",
            "700italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QYatB4sP7itsB5g.ttf",
            "800italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QfahB4sP7itsB5g.ttf",
            "900italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QWalB4sP7itsB5g.ttf",
        },
    },
    {
        family: "Mali",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "thai", "vietnamese"],
        variants: [
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "200": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QOLlKlRaJdbWgdY.ttf",
            "300": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QIbmKlRaJdbWgdY.ttf",
            "500": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QN7nKlRaJdbWgdY.ttf",
            "600": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QPLgKlRaJdbWgdY.ttf",
            "700": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QJbhKlRaJdbWgdY.ttf",
            "200italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8wlVQIfTTkdbJYA.ttf",
            "300italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8plZQIfTTkdbJYA.ttf",
            regular: "http://fonts.gstatic.com/s/mali/v10/N0ba2SRONuN4eCrODlxxOd8.ttf",
            italic: "http://fonts.gstatic.com/s/mali/v10/N0bU2SRONuN4SCjECn50Kd_PmA.ttf",
            "500italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8_ldQIfTTkdbJYA.ttf",
            "600italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj80lBQIfTTkdbJYA.ttf",
            "700italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8tlFQIfTTkdbJYA.ttf",
        },
    },
    {
        family: "Quintessential",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/quintessential/v22/fdNn9sOGq31Yjnh3qWU14DdtjY5wS7kmAyxM.ttf",
        },
    },
    {
        family: "Cinzel Decorative",
        category: "display",
        subsets: ["latin"],
        variants: ["regular", "700", "900"],
        files: {
            "700": "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZoaelDQzCLlQXE.ttf",
            "900": "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZQa-lDQzCLlQXE.ttf",
            regular: "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaCSScvJGqLYhG8nNt8KPPswUAPnh7URs1LaCyC.ttf",
        },
    },
    {
        family: "Carrois Gothic",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/carroisgothic/v16/Z9XPDmFATg-N1PLtLOOxvIHl9ZmD3i7ajcJ-.ttf",
        },
    },
    {
        family: "Just Another Hand",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/justanotherhand/v19/845CNN4-AJyIGvIou-6yJKyptyOpOcr_BmmlS5aw.ttf",
        },
    },
    {
        family: "La Belle Aurore",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/labelleaurore/v20/RrQIbot8-mNYKnGNDkWlocovHeIIG-eFNVmULg.ttf",
        },
    },
    {
        family: "Candal",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/candal/v15/XoHn2YH6T7-t_8cNAR4Jt9Yxlw.ttf",
        },
    },
    {
        family: "Fredericka the Great",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/frederickathegreat/v21/9Bt33CxNwt7aOctW2xjbCstzwVKsIBVV-9Skz7Ylch2L.ttf",
        },
    },
    {
        family: "Syncopate",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/syncopate/v21/pe0pMIuPIYBCpEV5eFdKvtKaA_Rue1UwVg.ttf",
            regular: "http://fonts.gstatic.com/s/syncopate/v21/pe0sMIuPIYBCpEV5eFdyAv2-C99ycg.ttf",
        },
    },
    {
        family: "Aldrich",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/aldrich/v21/MCoTzAn-1s3IGyJMZaAS3pP5H_E.ttf",
        },
    },
    {
        family: "Libre Bodoni",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
        files: {
            "500": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6L9fwWzZcOb3U3s.ttf",
            "600": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6FNYwWzZcOb3U3s.ttf",
            "700": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6GpYwWzZcOb3U3s.ttf",
            regular: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6I1fwWzZcOb3U3s.ttf",
            italic: "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcKS_TdMTyQ3syLg.ttf",
            "500italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcGy_TdMTyQ3syLg.ttf",
            "600italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUc9yjTdMTyQ3syLg.ttf",
            "700italic": "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUczijTdMTyQ3syLg.ttf",
        },
    },
    {
        family: "Michroma",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/michroma/v19/PN_zRfy9qWD8fEagAMg6rzjb_-Da.ttf",
        },
    },
    {
        family: "Palanquin Dark",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8Z6ZW41fcvN2KT4.ttf",
            "600": "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8ZWYm41fcvN2KT4.ttf",
            "700": "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8YyY241fcvN2KT4.ttf",
            regular: "http://fonts.gstatic.com/s/palanquindark/v14/xn75YHgl1nqmANMB-26xC7yuF_6OTEo9VtfE.ttf",
        },
    },
    {
        family: "Fira Code",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf",
            "500": "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVfxN87gsj0.ttf",
            "600": "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_ONrFVfxN87gsj0.ttf",
            "700": "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf",
            regular: "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf",
        },
    },
    {
        family: "Capriola",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/capriola/v14/wXKoE3YSppcvo1PDln_8L-AinG8y.ttf",
        },
    },
    {
        family: "Mrs Saint Delafield",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/mrssaintdelafield/v13/v6-IGZDIOVXH9xtmTZfRagunqBw5WC62cK4tLsubB2w.ttf",
        },
    },
    {
        family: "Averia Serif Libre",
        category: "display",
        subsets: ["latin"],
        variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
        files: {
            "300": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGCSmqwacqdrKvbQ.ttf",
            "700": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGGS6qwacqdrKvbQ.ttf",
            "300italic": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzMmw60uVLe_bXHq.ttf",
            regular: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIWzD2ms4wxr6GvjeD0X88SHPyX2xY-pQGOyYw2fw.ttf",
            italic: "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIUzD2ms4wxr6GvjeD0X88SHPyX2xYOpwuK64kmf6u2.ttf",
            "700italic": "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzM2xK0uVLe_bXHq.ttf",
        },
    },
    {
        family: "Herr Von Muellerhoff",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/herrvonmuellerhoff/v21/WBL6rFjRZkREW8WqmCWYLgCkQKXb4CAft3c6_qJY3QPQ.ttf",
        },
    },
    {
        family: "Coda",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "800"],
        files: {
            "800": "http://fonts.gstatic.com/s/coda/v21/SLXIc1jY5nQ8HeIgTp6mw9t1cX8.ttf",
            regular: "http://fonts.gstatic.com/s/coda/v21/SLXHc1jY5nQ8JUIMapaN39I.ttf",
        },
    },
    {
        family: "Krona One",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/kronaone/v14/jAnEgHdjHcjgfIb1ZcUCMY-h3cWkWg.ttf",
        },
    },
    {
        family: "Balsamiq Sans",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sZzZiAbNrN8SB3lQQX7PncyWUyBY9mAzLFRQI.ttf",
            regular: "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sEzZiAbNrN8SB3lQQX7Pnc8dkdIYdNHzs.ttf",
            italic: "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sazZiAbNrN8SB3lQQX7PncwdsXJaVIDzvcXA.ttf",
            "700italic": "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sfzZiAbNrN8SB3lQQX7PncwdsvmYpsBxDAVQI4aA.ttf",
        },
    },
    {
        family: "Livvic",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "100italic",
            "200",
            "200italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
            "900",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlffC-M-mHnOSOuk.ttf",
            "200": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffp8IeslfCQfK9WQ.ttf",
            "300": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffw8EeslfCQfK9WQ.ttf",
            "500": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffm8AeslfCQfK9WQ.ttf",
            "600": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlfft8ceslfCQfK9WQ.ttf",
            "700": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff08YeslfCQfK9WQ.ttf",
            "900": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff68QeslfCQfK9WQ.ttf",
            "100italic": "http://fonts.gstatic.com/s/livvic/v14/rnCt-x1S2hzjrlfXbdtakn3sTfukQHs.ttf",
            "200italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdv2s13GY_etWWIJ.ttf",
            "300italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduSsF3GY_etWWIJ.ttf",
            regular: "http://fonts.gstatic.com/s/livvic/v14/rnCp-x1S2hzjrlfnb-k6unzeSA.ttf",
            italic: "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlfXbeM-mHnOSOuk.ttf",
            "500italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvKsV3GY_etWWIJ.ttf",
            "600italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvmtl3GY_etWWIJ.ttf",
            "700italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduCt13GY_etWWIJ.ttf",
            "900italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdu6tV3GY_etWWIJ.ttf",
        },
    },
    {
        family: "Scada",
        category: "sans-serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/scada/v15/RLp8K5Pv5qumeVrU6BEgRVfmZOE5.ttf",
            regular: "http://fonts.gstatic.com/s/scada/v15/RLpxK5Pv5qumeWJoxzUobkvv.ttf",
            italic: "http://fonts.gstatic.com/s/scada/v15/RLp_K5Pv5qumeVJqzTEKa1vvffg.ttf",
            "700italic": "http://fonts.gstatic.com/s/scada/v15/RLp6K5Pv5qumeVJq9Y0lT1PEYfE5p6g.ttf",
        },
    },
    {
        family: "Shadows Into Light Two",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/shadowsintolighttwo/v17/4iC86LVlZsRSjQhpWGedwyOoW-0A6_kpsyNmlAvNGLNnIF0.ttf",
        },
    },
    {
        family: "Telex",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/telex/v17/ieVw2Y1fKWmIO9fTB1piKFIf.ttf",
        },
    },
    {
        family: "Rancho",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rancho/v21/46kulbzmXjLaqZRlbWXgd0RY1g.ttf",
        },
    },
    {
        family: "Bowlby One SC",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bowlbyonesc/v25/DtVlJxerQqQm37tzN3wMug9Pzgj8owhNjuE.ttf",
        },
    },
    {
        family: "Graduate",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/graduate/v17/C8cg4cs3o2n15t_2YxgR6X2NZAn2.ttf",
        },
    },
    {
        family: "Oranienbaum",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/oranienbaum/v15/OZpHg_txtzZKMuXLIVrx-3zn7kz3dpHc.ttf",
        },
    },
    {
        family: "Miriam Libre",
        category: "sans-serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/miriamlibre/v14/DdT-798HsHwubBAqfkcBTL_X3LbbRcC7_-Z7Hg.ttf",
            regular: "http://fonts.gstatic.com/s/miriamlibre/v14/DdTh798HsHwubBAqfkcBTL_vYJn_Teun9g.ttf",
        },
    },
    {
        family: "Vazirmatn",
        category: "sans-serif",
        subsets: ["arabic", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgyOReZ72DF_QY.ttf",
            "200": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklegzOReZ72DF_QY.ttf",
            "300": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklTYzOReZ72DF_QY.ttf",
            "500": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklVozOReZ72DF_QY.ttf",
            "600": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklbY0OReZ72DF_QY.ttf",
            "700": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklY80OReZ72DF_QY.ttf",
            "800": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRkleg0OReZ72DF_QY.ttf",
            "900": "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklcE0OReZ72DF_QY.ttf",
            regular: "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgzOReZ72DF_QY.ttf",
        },
    },
    {
        family: "Corben",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/corben/v21/LYjAdGzzklQtCMpFHCZgrXArXN7HWQ.ttf",
            regular: "http://fonts.gstatic.com/s/corben/v21/LYjDdGzzklQtCMp9oAlEpVs3VQ.ttf",
        },
    },
    {
        family: "Cormorant Infant",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "300",
            "300italic",
            "regular",
            "italic",
            "500",
            "500italic",
            "600",
            "600italic",
            "700",
            "700italic",
        ],
        files: {
            "300": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9951w3_DMrQqcdJrk.ttf",
            "500": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995wQ2_DMrQqcdJrk.ttf",
            "600": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995ygx_DMrQqcdJrk.ttf",
            "700": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9950ww_DMrQqcdJrk.ttf",
            "300italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItcDEhRoUYNrn_Ig.ttf",
            regular: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyPU44g9vKiM1sORYSiWeAsLN993_Af2DsAXq4.ttf",
            italic: "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyJU44g9vKiM1sORYSiWeAsLN997_IV3BkFTq4EPw.ttf",
            "500italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItKDAhRoUYNrn_Ig.ttf",
            "600italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItBDchRoUYNrn_Ig.ttf",
            "700italic": "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItYDYhRoUYNrn_Ig.ttf",
        },
    },
    {
        family: "Belleza",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/belleza/v17/0nkoC9_pNeMfhX4BtcbyawzruP8.ttf",
        },
    },
    {
        family: "Annie Use Your Telescope",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/annieuseyourtelescope/v18/daaLSS4tI2qYYl3Jq9s_Hu74xwktnlKxH6osGVGjlDfB3UUVZA.ttf",
        },
    },
    {
        family: "Jua",
        category: "sans-serif",
        subsets: ["korean", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/jua/v15/co3KmW9ljjAjc-DZCsKgsg.ttf",
        },
    },
    {
        family: "Bevan",
        category: "serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular", "italic"],
        files: {
            regular: "http://fonts.gstatic.com/s/bevan/v24/4iCj6KZ0a9NXjF8aUir7tlSJ.ttf",
            italic: "http://fonts.gstatic.com/s/bevan/v24/4iCt6KZ0a9NXjG8YWC7Zs0SJD4U.ttf",
        },
    },
    {
        family: "BioRhyme",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["200", "300", "regular", "700", "800"],
        files: {
            "200": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ESOjnGAq8Sk1PoH.ttf",
            "300": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETqjXGAq8Sk1PoH.ttf",
            "700": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ET6inGAq8Sk1PoH.ttf",
            "800": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETmiXGAq8Sk1PoH.ttf",
            regular: "http://fonts.gstatic.com/s/biorhyme/v16/1cXwaULHBpDMsHYW_HxGpVWIgNit.ttf",
        },
    },
    {
        family: "Kiwi Maru",
        category: "serif",
        subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
        variants: ["300", "regular", "500"],
        files: {
            "300": "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gNCi0Vxn9R5ShnA.ttf",
            "500": "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gbCm0Vxn9R5ShnA.ttf",
            regular: "http://fonts.gstatic.com/s/kiwimaru/v14/R70YjykGkuuDep-hRg6YmACQXzLhTg.ttf",
        },
    },
    {
        family: "Average Sans",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/averagesans/v16/1Ptpg8fLXP2dlAXR-HlJJNJPBdqazVoK4A.ttf",
        },
    },
    {
        family: "Overpass Mono",
        category: "monospace",
        subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700"],
        files: {
            "300": "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EWKokzzXur-SmIr.ttf",
            "500": "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXmokzzXur-SmIr.ttf",
            "600": "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUKpUzzXur-SmIr.ttf",
            "700": "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUzpUzzXur-SmIr.ttf",
            regular: "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXUokzzXur-SmIr.ttf",
        },
    },
    {
        family: "Noto Sans Hebrew",
        category: "sans-serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4utoiJltutR2g.ttf",
            "200": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX94qtoiJltutR2g.ttf",
            "300": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXKYqtoiJltutR2g.ttf",
            "500": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXRYqtoiJltutR2g.ttf",
            "600": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXqY2toiJltutR2g.ttf",
            "700": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXkI2toiJltutR2g.ttf",
            "800": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX942toiJltutR2g.ttf",
            "900": "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX3o2toiJltutR2g.ttf",
            regular: "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4qtoiJltutR2g.ttf",
        },
    },
    {
        family: "Bellefair",
        category: "serif",
        subsets: ["hebrew", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19__A2pOdvDA.ttf",
        },
    },
    {
        family: "Bubblegum Sans",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/bubblegumsans/v20/AYCSpXb_Z9EORv1M5QTjEzMEtdaHzoPPb7R4.ttf",
        },
    },
    {
        family: "Marvel",
        category: "sans-serif",
        subsets: ["latin"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/marvel/v16/nwpWtKeoNgBV0qawLXHgB1WmxwkiYQ.ttf",
            regular: "http://fonts.gstatic.com/s/marvel/v16/nwpVtKeoNgBV0qaIkV7ED366zg.ttf",
            italic: "http://fonts.gstatic.com/s/marvel/v16/nwpXtKeoNgBV0qa4k1TALXuqzhA7.ttf",
            "700italic": "http://fonts.gstatic.com/s/marvel/v16/nwpQtKeoNgBV0qa4k2x8Al-i5QwyYdrc.ttf",
        },
    },
    {
        family: "Noto Serif Devanagari",
        category: "serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-og-HMUe1u_dv.ttf",
            "200": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-ow-HMUe1u_dv.ttf",
            "300": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTBgow-HMUe1u_dv.ttf",
            "500": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTAMow-HMUe1u_dv.ttf",
            "600": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDgpA-HMUe1u_dv.ttf",
            "700": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDZpA-HMUe1u_dv.ttf",
            "800": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-pA-HMUe1u_dv.ttf",
            "900": "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTCXpA-HMUe1u_dv.ttf",
            regular: "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-ow-HMUe1u_dv.ttf",
        },
    },
    {
        family: "Rozha One",
        category: "serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rozhaone/v15/AlZy_zVFtYP12Zncg2khdXf4XB0Tow.ttf",
        },
    },
    {
        family: "Knewave",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/knewave/v14/sykz-yx0lLcxQaSItSq9-trEvlQ.ttf",
        },
    },
    {
        family: "Pattaya",
        category: "sans-serif",
        subsets: ["cyrillic", "latin", "latin-ext", "thai", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/pattaya/v16/ea8ZadcqV_zkHY-XNdCn92ZEmVs.ttf",
        },
    },
    {
        family: "Enriqueta",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "500", "600", "700"],
        files: {
            "500": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrv2mHmNZEq6TTFw.ttf",
            "600": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrk26HmNZEq6TTFw.ttf",
            "700": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVr92-HmNZEq6TTFw.ttf",
            regular: "http://fonts.gstatic.com/s/enriqueta/v17/goksH6L7AUFrRvV44HVTS0CjkP1Yog.ttf",
        },
    },
    {
        family: "Lustria",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/lustria/v13/9oRONYodvDEyjuhOrCg5MtPyAcg.ttf",
        },
    },
    {
        family: "Rambla",
        category: "sans-serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/rambla/v13/snfos0ip98hx6mrMn50qPvN4yJuDYQ.ttf",
            regular: "http://fonts.gstatic.com/s/rambla/v13/snfrs0ip98hx6mr0I7IONthkwQ.ttf",
            italic: "http://fonts.gstatic.com/s/rambla/v13/snfps0ip98hx6mrEIbgKFN10wYKa.ttf",
            "700italic": "http://fonts.gstatic.com/s/rambla/v13/snfus0ip98hx6mrEIYC2O_l86p6TYS-Y.ttf",
        },
    },
    {
        family: "Darker Grotesque",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["300", "regular", "500", "600", "700", "800", "900"],
        files: {
            "300": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXxpqn7y-XFyZFUB.ttf",
            "500": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXwFqn7y-XFyZFUB.ttf",
            "600": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzprX7y-XFyZFUB.ttf",
            "700": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzQrX7y-XFyZFUB.ttf",
            "800": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXy3rX7y-XFyZFUB.ttf",
            "900": "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXyerX7y-XFyZFUB.ttf",
            regular: "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXw3qn7y-XFyZFUB.ttf",
        },
    },
    {
        family: "Overlock",
        category: "display",
        subsets: ["latin", "latin-ext"],
        variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
        files: {
            "700": "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xizcmMvL2L9TLT.ttf",
            "900": "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xaz8mMvL2L9TLT.ttf",
            regular: "http://fonts.gstatic.com/s/overlock/v17/Z9XVDmdMWRiN1_T9Z4Te4u2El6GC.ttf",
            italic: "http://fonts.gstatic.com/s/overlock/v17/Z9XTDmdMWRiN1_T9Z7Tc6OmmkrGC7Cs.ttf",
            "700italic": "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0FWJtrmp8CLTlNs.ttf",
            "900italic": "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0G2Ltrmp8CLTlNs.ttf",
        },
    },
    {
        family: "Arizonia",
        category: "handwriting",
        subsets: ["latin", "latin-ext", "vietnamese"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv6WGHK06UY30.ttf",
        },
    },
    {
        family: "Arbutus Slab",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/arbutusslab/v16/oY1Z8e7OuLXkJGbXtr5ba7ZVa68dJlaFAQ.ttf",
        },
    },
    {
        family: "Headland One",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/headlandone/v16/yYLu0hHR2vKnp89Tk1TCq3Tx0PlTeZ3mJA.ttf",
        },
    },
    {
        family: "Noto Serif Display",
        category: "serif",
        subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
        variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
        ],
        files: {
            "100": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd49gKaDU9hvzC.ttf",
            "200": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd4tgKaDU9hvzC.ttf",
            "300": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVoD4tgKaDU9hvzC.ttf",
            "500": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpv4tgKaDU9hvzC.ttf",
            "600": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVqD5dgKaDU9hvzC.ttf",
            "700": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVq65dgKaDU9hvzC.ttf",
            "800": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd5dgKaDU9hvzC.ttf",
            "900": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVr05dgKaDU9hvzC.ttf",
            regular: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd4tgKaDU9hvzC.ttf",
            "100italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBIYjEfg-zCmf4.ttf",
            "200italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBJYjEfg-zCmf4.ttf",
            "300italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoW5JYjEfg-zCmf4.ttf",
            italic: "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBJYjEfg-zCmf4.ttf",
            "500italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoQJJYjEfg-zCmf4.ttf",
            "600italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-Voe5OYjEfg-zCmf4.ttf",
            "700italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoddOYjEfg-zCmf4.ttf",
            "800italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBOYjEfg-zCmf4.ttf",
            "900italic": "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoZlOYjEfg-zCmf4.ttf",
        },
    },
    {
        family: "Do Hyeon",
        category: "sans-serif",
        subsets: ["korean", "latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/dohyeon/v18/TwMN-I8CRRU2zM86HFE3ZwaH__-C.ttf",
        },
    },
    {
        family: "Alike",
        category: "serif",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/alike/v20/HI_EiYEYI6BIoEjBSZXAQ4-d.ttf",
        },
    },
    {
        family: "Coming Soon",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/comingsoon/v19/qWcuB6mzpYL7AJ2VfdQR1u-SUjjzsykh.ttf",
        },
    },
    {
        family: "Cedarville Cursive",
        category: "handwriting",
        subsets: ["latin"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/cedarvillecursive/v17/yYL00g_a2veiudhUmxjo5VKkoqA-B_neJbBxw8BeTg.ttf",
        },
    },
    {
        family: "Marcellus SC",
        category: "serif",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/marcellussc/v13/ke8iOgUHP1dg-Rmi6RWjbLEPgdydGKikhA.ttf",
        },
    },
    {
        family: "Rubik Moonrocks",
        category: "display",
        subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/rubikmoonrocks/v5/845ANMAmAI2VUZMLu_W0M7HqlDHnXcD7JGy1Sw.ttf",
        },
    },
    {
        family: "Niconne",
        category: "handwriting",
        subsets: ["latin", "latin-ext"],
        variants: ["regular"],
        files: {
            regular: "http://fonts.gstatic.com/s/niconne/v15/w8gaH2QvRug1_rTfrQut2F4OuOo.ttf",
        },
    },
    {
        family: "Padauk",
        category: "sans-serif",
        subsets: ["latin", "latin-ext", "myanmar"],
        variants: ["regular", "700"],
        files: {
            "700": "http://fonts.gstatic.com/s/padauk/v16/RrQSboJg-id7Onb512DE1JJEZ4YwGg.ttf",
            regular: "http://fonts.gstatic.com/s/padauk/v16/RrQRboJg-id7OnbBa0_g3LlYbg.ttf",
        },
    },
    {
        family: "Biryani",
        category: "sans-serif",
        subsets: ["devanagari", "latin", "latin-ext"],
        variants: ["200", "300", "regular", "600", "700", "800", "900"],
        files: {
            "200": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddYQyGTBSU-J-RxQ.ttf",
            "300": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddeAxGTBSU-J-RxQ.ttf",
            "600": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddZQ3GTBSU-J-RxQ.ttf",
            "700": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddfA2GTBSU-J-RxQ.ttf",
            "800": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddew1GTBSU-J-RxQ.ttf",
            "900": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddcg0GTBSU-J-RxQ.ttf",
            regular: "http://fonts.gstatic.com/s/biryani/v13/hv-WlzNxIFoO84YdTUwZPTh5T-s.ttf",
        },
    },
    {
        family: "Hanuman",
        category: "serif",
        subsets: ["khmer", "latin"],
        variants: ["100", "300", "regular", "700", "900"],
        files: {
            "100": "http://fonts.gstatic.com/s/hanuman/v22/VuJzdNvD15HhpJJBQMLdPKNiaRpFvg.ttf",
            "300": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQAr_HIlMZRNcp0o.ttf",
            "700": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQBr4HIlMZRNcp0o.ttf",
            "900": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQCL6HIlMZRNcp0o.ttf",
            regular: "http://fonts.gstatic.com/s/hanuman/v22/VuJxdNvD15HhpJJBeKbXOIFneRo.ttf",
        },
    },
];
const getFontUrls = (family, variants) => {
    const font = exports.fonts.find((font) => font.family === family);
    if (!font)
        return [];
    return Object.entries(font.files)
        .filter(([variant]) => variants.includes(variant))
        .map(([, url]) => url);
};
exports.getFontUrls = getFontUrls;


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.languages = void 0;
exports.languages = [
    {
        id: "af",
        name: "Afrikaans",
        editorCode: "af",
        locale: "af-ZA",
    },
    {
        id: "am",
        name: "Amharic",
        editorCode: "am",
        locale: "am-ET",
    },
    {
        id: "ar",
        name: "Arabic",
        editorCode: "ar",
        locale: "ar-SA",
    },
    {
        id: "bg",
        name: "Bulgarian",
        editorCode: "bg",
        locale: "bg-BG",
    },
    {
        id: "bn",
        name: "Bengali",
        editorCode: "bn",
        locale: "bn-BD",
    },
    {
        id: "ca",
        name: "Catalan",
        editorCode: "ca",
        locale: "ca-ES",
    },
    {
        id: "cs",
        name: "Czech",
        editorCode: "cs",
        locale: "cs-CZ",
    },
    {
        id: "da",
        name: "Danish",
        editorCode: "da",
        locale: "da-DK",
    },
    {
        id: "de",
        name: "German",
        editorCode: "de",
        locale: "de-DE",
    },
    {
        id: "el",
        name: "Greek",
        editorCode: "el",
        locale: "el-GR",
    },
    {
        id: "en",
        name: "English",
        editorCode: "en",
        locale: "en-US",
    },
    {
        id: "es-ES",
        name: "Spanish",
        editorCode: "es",
        locale: "es-ES",
    },
    {
        id: "fa",
        name: "Persian",
        editorCode: "fa",
        locale: "fa-IR",
    },
    {
        id: "fi",
        name: "Finnish",
        editorCode: "fi",
        locale: "fi-FI",
    },
    {
        id: "fr",
        name: "French",
        editorCode: "fr",
        locale: "fr-FR",
    },
    {
        id: "he",
        name: "Hebrew",
        editorCode: "he",
        locale: "he-IL",
    },
    {
        id: "hi",
        name: "Hindi",
        editorCode: "hi",
        locale: "hi-IN",
    },
    {
        id: "hu",
        name: "Hungarian",
        editorCode: "hu",
        locale: "hu-HU",
    },
    {
        id: "id",
        name: "Indonesian",
        editorCode: "id",
        locale: "id-ID",
    },
    {
        id: "it",
        name: "Italian",
        editorCode: "it",
        locale: "it-IT",
    },
    {
        id: "ja",
        name: "Japanese",
        editorCode: "ja",
        locale: "ja-JP",
    },
    {
        id: "km",
        name: "Khmer",
        editorCode: "km",
        locale: "km-KH",
    },
    {
        id: "kn",
        name: "Kannada",
        editorCode: "kn",
        locale: "kn-IN",
    },
    {
        id: "ko",
        name: "Korean",
        editorCode: "ko",
        locale: "ko-KR",
    },
    {
        id: "lt",
        name: "Lithuanian",
        editorCode: "lt",
        locale: "lt-LT",
    },
    {
        id: "ml-IN",
        name: "Malayalam",
        editorCode: "mlin",
        locale: "ml-IN",
    },
    {
        id: "mr",
        name: "Marathi",
        editorCode: "mr",
        locale: "mr-IN",
    },
    {
        id: "ne-NP",
        name: "Nepali",
        editorCode: "nenp",
        locale: "ne-NP",
    },
    {
        id: "nl",
        name: "Dutch",
        editorCode: "nl",
        locale: "nl-NL",
    },
    {
        id: "no",
        name: "Norwegian",
        editorCode: "no",
        locale: "no-NO",
    },
    {
        id: "or",
        name: "Odia",
        editorCode: "or",
        locale: "or-IN",
    },
    {
        id: "pl",
        name: "Polish",
        editorCode: "pl",
        locale: "pl-PL",
    },
    {
        id: "pt-BR",
        name: "Portuguese, Brazilian",
        editorCode: "ptbr",
        locale: "pt-BR",
    },
    {
        id: "pt-PT",
        name: "Portuguese",
        editorCode: "pt",
        locale: "pt-PT",
    },
    {
        id: "ro",
        name: "Romanian",
        editorCode: "ro",
        locale: "ro-RO",
    },
    {
        id: "ru",
        name: "Russian",
        editorCode: "ru",
        locale: "ru-RU",
    },
    {
        id: "sr",
        name: "Serbian (Cyrillic)",
        editorCode: "sr",
        locale: "sr-SP",
    },
    {
        id: "sv-SE",
        name: "Swedish",
        editorCode: "sv",
        locale: "sv-SE",
    },
    {
        id: "ta",
        name: "Tamil",
        editorCode: "ta",
        locale: "ta-IN",
    },
    {
        id: "te",
        name: "Telugu",
        editorCode: "te",
        locale: "te-IN",
    },
    {
        id: "th",
        name: "Thai",
        editorCode: "th",
        locale: "th-TH",
    },
    {
        id: "tr",
        name: "Turkish",
        editorCode: "tr",
        locale: "tr-TR",
    },
    {
        id: "uk",
        name: "Ukrainian",
        editorCode: "uk",
        locale: "uk-UA",
    },
    {
        id: "vi",
        name: "Vietnamese",
        editorCode: "vi",
        locale: "vi-VN",
    },
    {
        id: "zh-CN",
        name: "Chinese Simplified",
        editorCode: "zhcn",
        locale: "zh-CN",
    },
    {
        id: "zh-TW",
        name: "Chinese Traditional",
        editorCode: "zhtw",
        locale: "zh-TW",
    },
];


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.linearTransform = void 0;
const linearTransform = (value, inMin, inMax, outMin, outMax) => {
    if (inMax === inMin)
        return value === inMax ? outMin : NaN;
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
exports.linearTransform = linearTransform;


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exclude = void 0;
const exclude = (object, keys) => {
    if (!object)
        return object;
    return Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
};
exports.exclude = exclude;


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pageSizeMap = void 0;
exports.pageSizeMap = {
    a4: {
        width: 210,
        height: 297,
    },
    letter: {
        width: 216,
        height: 279,
    },
};


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delay = void 0;
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
exports.delay = delay;


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseLayoutLocator = exports.processUsername = exports.generateRandomName = exports.kebabCase = exports.extractUrl = exports.isEmptyString = exports.isUrl = exports.getInitials = void 0;
const unique_names_generator_1 = __webpack_require__(96);
const getInitials = (name) => {
    const regex = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    const initials = [...name.matchAll(regex)] || [];
    return ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
};
exports.getInitials = getInitials;
const isUrl = (string) => {
    if (!string)
        return false;
    const urlRegex = /https?:\/\/[^ \n]+/i;
    return urlRegex.test(string);
};
exports.isUrl = isUrl;
const isEmptyString = (string) => {
    if (string === "<p></p>")
        return true;
    return string.trim().length === 0;
};
exports.isEmptyString = isEmptyString;
const extractUrl = (string) => {
    const urlRegex = /https?:\/\/[^ \n]+/i;
    const result = string.match(urlRegex);
    return result ? result[0] : null;
};
exports.extractUrl = extractUrl;
const kebabCase = (string) => {
    if (!string)
        return "";
    return (string
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.join("-")
        .toLowerCase() ?? "");
};
exports.kebabCase = kebabCase;
const generateRandomName = () => {
    return (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.adjectives, unique_names_generator_1.animals],
        style: "capital",
        separator: " ",
        length: 3,
    });
};
exports.generateRandomName = generateRandomName;
const processUsername = (string) => {
    if (!string)
        return "";
    return string.replace(/[^a-zA-Z0-9-.]/g, "").toLowerCase();
};
exports.processUsername = processUsername;
const parseLayoutLocator = (payload) => {
    if (!payload)
        return { page: 0, column: 0, section: 0 };
    const section = payload.index;
    const [page, column] = payload.containerId.split(".").map(Number);
    return { page, column, section };
};
exports.parseLayoutLocator = parseLayoutLocator;


/***/ }),
/* 96 */
/***/ ((module) => {

"use strict";
module.exports = require("unique-names-generator");

/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cn = exports.breakpoints = void 0;
const clsx_1 = __webpack_require__(98);
const tailwind_merge_1 = __webpack_require__(99);
exports.breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1400,
};
const cn = (...inputs) => (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
exports.cn = cn;


/***/ }),
/* 98 */
/***/ ((module) => {

"use strict";
module.exports = require("clsx");

/***/ }),
/* 99 */
/***/ ((module) => {

"use strict";
module.exports = require("tailwind-merge");

/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.templatesList = void 0;
exports.templatesList = [
    "azurill",
    "bronzor",
    "chikorita",
    "ditto",
    "gengar",
    "glalie",
    "kakuna",
    "leafish",
    "nosepass",
    "onyx",
    "pikachu",
    "rhyhorn",
];


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteResumeDto = exports.deleteResumeSchema = void 0;
const schema_1 = __webpack_require__(45);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.deleteResumeSchema = z_1.z.object({
    id: schema_1.idSchema,
});
class DeleteResumeDto extends (0, dto_1.createZodDto)(exports.deleteResumeSchema) {
}
exports.DeleteResumeDto = DeleteResumeDto;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportResumeDto = exports.importResumeSchema = void 0;
const schema_1 = __webpack_require__(45);
const utils_1 = __webpack_require__(81);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.importResumeSchema = z_1.z.object({
    title: z_1.z.string().optional(),
    slug: z_1.z.string().min(1).transform(utils_1.kebabCase).optional(),
    visibility: z_1.z.enum(["public", "private"]).default("private").optional(),
    data: schema_1.resumeDataSchema,
});
class ImportResumeDto extends (0, dto_1.createZodDto)(exports.importResumeSchema) {
}
exports.ImportResumeDto = ImportResumeDto;


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeDto = exports.resumeSchema = void 0;
const schema_1 = __webpack_require__(45);
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
const user_1 = __webpack_require__(42);
exports.resumeSchema = z_1.z.object({
    id: schema_1.idSchema,
    title: z_1.z.string(),
    slug: z_1.z.string(),
    data: schema_1.resumeDataSchema.default(schema_1.defaultResumeData),
    visibility: z_1.z.enum(["private", "public"]).default("private"),
    locked: z_1.z.boolean().default(false),
    userId: schema_1.idSchema,
    user: user_1.userSchema.optional(),
    createdAt: z_1.z.date().or(z_1.z.dateString()),
    updatedAt: z_1.z.date().or(z_1.z.dateString()),
});
class ResumeDto extends (0, dto_1.createZodDto)(exports.resumeSchema) {
}
exports.ResumeDto = ResumeDto;


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateResumeDto = exports.updateResumeSchema = void 0;
const dto_1 = __webpack_require__(39);
const resume_1 = __webpack_require__(104);
exports.updateResumeSchema = resume_1.resumeSchema.partial();
class UpdateResumeDto extends (0, dto_1.createZodDto)(exports.updateResumeSchema) {
}
exports.UpdateResumeDto = UpdateResumeDto;


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UrlDto = exports.urlSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.urlSchema = z_1.z.object({ url: z_1.z.string().url() });
class UrlDto extends (0, dto_1.createZodDto)(exports.urlSchema) {
}
exports.UrlDto = UrlDto;


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticsDto = exports.statisticsSchema = void 0;
const dto_1 = __webpack_require__(39);
const z_1 = __webpack_require__(40);
exports.statisticsSchema = z_1.z.object({
    views: z_1.z.number().int().default(0),
    downloads: z_1.z.number().int().default(0),
});
class StatisticsDto extends (0, dto_1.createZodDto)(exports.statisticsSchema) {
}
exports.StatisticsDto = StatisticsDto;


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(16);
const library_1 = __webpack_require__(35);
const utils_1 = __webpack_require__(81);
const bcryptjs = tslib_1.__importStar(__webpack_require__(109));
const crypto_1 = __webpack_require__(110);
const otplib_1 = __webpack_require__(111);
const mail_service_1 = __webpack_require__(21);
const user_service_1 = __webpack_require__(112);
const utils_service_1 = __webpack_require__(113);
let AuthService = class AuthService {
    constructor(configService, userService, mailService, jwtService, utils) {
        this.configService = configService;
        this.userService = userService;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.utils = utils;
    }
    hash(password) {
        return bcryptjs.hash(password, 10);
    }
    compare(password, hash) {
        return bcryptjs.compare(password, hash);
    }
    async validatePassword(password, hashedPassword) {
        const isValid = await this.compare(password, hashedPassword);
        if (!isValid) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
        }
    }
    generateToken(grantType, payload) {
        switch (grantType) {
            case "access":
                if (!payload)
                    throw new common_1.InternalServerErrorException("InvalidTokenPayload");
                return this.jwtService.sign(payload, {
                    secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
                    expiresIn: "15m", // 15 minutes
                });
            case "refresh":
                if (!payload)
                    throw new common_1.InternalServerErrorException("InvalidTokenPayload");
                return this.jwtService.sign(payload, {
                    secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
                    expiresIn: "2d", // 2 days
                });
            case "reset":
            case "verification":
                return (0, crypto_1.randomBytes)(32).toString("base64url");
            default:
                throw new common_1.InternalServerErrorException("InvalidGrantType: " + grantType);
        }
    }
    async setRefreshToken(email, token) {
        await this.userService.updateByEmail(email, {
            secrets: {
                update: {
                    refreshToken: token,
                    lastSignedIn: token ? new Date() : undefined,
                },
            },
        });
    }
    async validateRefreshToken(payload, token) {
        const user = await this.userService.findOneById(payload.id);
        const storedRefreshToken = user.secrets?.refreshToken;
        if (!storedRefreshToken || storedRefreshToken !== token)
            throw new common_1.ForbiddenException();
        if (!user.twoFactorEnabled)
            return user;
        if (payload.isTwoFactorAuth)
            return user;
    }
    async register(registerDto) {
        const hashedPassword = await this.hash(registerDto.password);
        try {
            const user = await this.userService.create({
                name: registerDto.name,
                email: registerDto.email,
                username: registerDto.username,
                locale: registerDto.locale,
                provider: "email",
                emailVerified: false, // Set to true if you don't want to verify user's email
                secrets: { create: { password: hashedPassword } },
            });
            // Send verification email (non-blocking - don't await)
            // Registration should succeed even if email sending fails
            this.sendVerificationEmail(user.email).catch((error) => {
                common_1.Logger.error(`Failed to send verification email during registration: ${error instanceof Error ? error.message : String(error)}`, "AuthService#register");
            });
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.UserAlreadyExists);
            }
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async authenticate({ identifier, password }) {
        try {
            const user = await this.userService.findOneByIdentifier(identifier);
            if (!user) {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
            }
            if (!user.secrets?.password) {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.OAuthUser);
            }
            await this.validatePassword(password, user.secrets?.password);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
        }
    }
    // Password Reset Flows
    async forgotPassword(email) {
        const token = this.generateToken("reset");
        await this.userService.updateByEmail(email, {
            secrets: { update: { resetToken: token } },
        });
        const url = `http://internvista.com/auth/reset-password?token=${token}`;
        const subject = "Reset your Reactive Resume password";
        const text = `Please click on the link below to reset your password:\n\n${url}`;
        await this.mailService.sendEmail({ to: email, subject, text });
    }
    async updatePassword(email, password) {
        const hashedPassword = await this.hash(password);
        await this.userService.updateByEmail(email, {
            secrets: { update: { password: hashedPassword } },
        });
    }
    async resetPassword(token, password) {
        const hashedPassword = await this.hash(password);
        await this.userService.updateByResetToken(token, {
            resetToken: null,
            password: hashedPassword,
        });
    }
    getAuthProviders() {
        const providers = [];
        if (!this.configService.get("DISABLE_EMAIL_AUTH")) {
            providers.push("email");
        }
        if (this.configService.get("GITHUB_CLIENT_ID") &&
            this.configService.get("GITHUB_CLIENT_SECRET") &&
            this.configService.get("GITHUB_CALLBACK_URL")) {
            providers.push("github");
        }
        if (this.configService.get("GOOGLE_CLIENT_ID") &&
            this.configService.get("GOOGLE_CLIENT_SECRET") &&
            this.configService.get("GOOGLE_CALLBACK_URL")) {
            providers.push("google");
        }
        return providers;
    }
    // Email Verification Flows
    /**
     * Generate a verification token (20-byte hex string)
     */
    generateVerificationToken() {
        return (0, crypto_1.randomBytes)(20).toString("hex");
    }
    /**
     * Get token expiration date (24 hours from now)
     */
    getTokenExpiration() {
        return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    }
    /**
     * Send verification email to user
     * Non-blocking: errors are logged but don't throw
     */
    async sendVerificationEmail(email) {
        try {
            // Find user to get their name
            const user = await this.userService.findOneByIdentifier(email);
            if (!user) {
                common_1.Logger.warn(`User not found for email: ${email}`, "AuthService#sendVerificationEmail");
                return;
            }
            // Generate verification token (20-byte hex)
            const token = this.generateVerificationToken();
            const expiration = this.getTokenExpiration();
            // Set the verification token and expiration in the database
            await this.userService.updateByEmail(email, {
                secrets: {
                    update: {
                        verificationToken: token,
                        verificationTokenExpire: expiration,
                    },
                },
            });
            // Send verification email (non-blocking)
            // Don't await to avoid blocking registration flow
            this.mailService
                .sendVerificationEmail(email, user.name, token)
                .catch((error) => {
                common_1.Logger.error(`Failed to send verification email to ${email}: ${error instanceof Error ? error.message : String(error)}`, "AuthService#sendVerificationEmail");
                // Don't throw - registration should succeed even if email fails
            });
        }
        catch (error) {
            common_1.Logger.error(`Error in sendVerificationEmail for ${email}: ${error instanceof Error ? error.message : String(error)}`, "AuthService#sendVerificationEmail");
            // Don't throw - allow registration to continue even if email setup fails
        }
    }
    /**
     * Verify email using token
     * Checks token validity and expiration
     */
    async verifyEmail(token) {
        if (!token) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
        // Find user by verification token
        const user = await this.userService.findByVerificationToken(token);
        if (!user) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
        const storedToken = user.secrets?.verificationToken;
        const tokenExpire = user.secrets?.verificationTokenExpire;
        // Validate token matches
        if (!storedToken || storedToken !== token) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
        // Check if token has expired
        if (!tokenExpire || new Date() > tokenExpire) {
            throw new common_1.BadRequestException("Verification token has expired. Please request a new verification email.");
        }
        // Verify email and clear token
        await this.userService.updateByEmail(user.email, {
            emailVerified: true,
            secrets: {
                update: {
                    verificationToken: null,
                    verificationTokenExpire: null,
                },
            },
        });
        // Send welcome email (non-blocking)
        this.mailService
            .sendWelcomeEmail(user.email, user.name)
            .catch((error) => {
            common_1.Logger.error(`Failed to send welcome email to ${user.email}: ${error instanceof Error ? error.message : String(error)}`, "AuthService#verifyEmail");
            // Don't throw - verification should succeed even if welcome email fails
        });
    }
    /**
     * Resend verification email
     * Generates new token and expiration
     */
    async resendVerificationEmail(email) {
        // Find user by email
        const user = await this.userService.findOneByIdentifier(email);
        if (!user) {
            // Don't reveal if user exists or not for security
            common_1.Logger.warn(`Resend verification requested for non-existent email: ${email}`, "AuthService#resendVerificationEmail");
            return; // Silently succeed to prevent email enumeration
        }
        // Check if already verified
        if (user.emailVerified) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.EmailAlreadyVerified);
        }
        // Generate new verification token and expiration
        const token = this.generateVerificationToken();
        const expiration = this.getTokenExpiration();
        // Update token in database
        await this.userService.updateByEmail(email, {
            secrets: {
                update: {
                    verificationToken: token,
                    verificationTokenExpire: expiration,
                },
            },
        });
        // Send verification email
        await this.mailService.sendVerificationEmail(email, user.name, token);
    }
    // Two-Factor Authentication Flows
    async setup2FASecret(email) {
        // If the user already has 2FA enabled, throw an error
        const user = await this.userService.findOneByIdentifier(email);
        if (user.twoFactorEnabled) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorAlreadyEnabled);
        }
        const secret = otplib_1.authenticator.generateSecret();
        const uri = otplib_1.authenticator.keyuri(email, "Reactive Resume", secret);
        await this.userService.updateByEmail(email, {
            secrets: { update: { twoFactorSecret: secret } },
        });
        return { message: uri };
    }
    async enable2FA(email, code) {
        const user = await this.userService.findOneByIdentifier(email);
        // If the user already has 2FA enabled, throw an error
        if (user.twoFactorEnabled) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorAlreadyEnabled);
        }
        // If the user doesn't have a 2FA secret set, throw an error
        if (!user.secrets?.twoFactorSecret) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
        }
        const verified = otplib_1.authenticator.verify({
            secret: user.secrets?.twoFactorSecret,
            token: code,
        });
        if (!verified) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorCode);
        }
        // Create backup codes and store them in the database
        const backupCodes = Array.from({ length: 8 }, () => (0, crypto_1.randomBytes)(5).toString("hex"));
        await this.userService.updateByEmail(email, {
            twoFactorEnabled: true,
            secrets: { update: { twoFactorBackupCodes: backupCodes } },
        });
        return { backupCodes };
    }
    async disable2FA(email) {
        const user = await this.userService.findOneByIdentifier(email);
        // If the user doesn't have 2FA enabled, throw an error
        if (!user.twoFactorEnabled) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
        }
        await this.userService.updateByEmail(email, {
            twoFactorEnabled: false,
            secrets: { update: { twoFactorSecret: null, twoFactorBackupCodes: [] } },
        });
    }
    async verify2FACode(email, code) {
        const user = await this.userService.findOneByIdentifier(email);
        // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
        if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
        }
        const verified = otplib_1.authenticator.verify({
            secret: user.secrets?.twoFactorSecret,
            token: code,
        });
        if (!verified) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorCode);
        }
        return user;
    }
    async useBackup2FACode(email, code) {
        const user = await this.userService.findOneByIdentifier(email);
        // If the user doesn't have 2FA enabled, or does not have a 2FA secret set, throw an error
        if (!user.twoFactorEnabled || !user.secrets?.twoFactorSecret) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.TwoFactorNotEnabled);
        }
        const verified = user.secrets?.twoFactorBackupCodes.includes(code);
        if (!verified) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidTwoFactorBackupCode);
        }
        // Remove the used backup code from the database
        const backupCodes = user.secrets?.twoFactorBackupCodes.filter((c) => c !== code);
        await this.userService.updateByEmail(email, {
            secrets: { update: { twoFactorBackupCodes: backupCodes } },
        });
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object, typeof (_c = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object, typeof (_e = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _e : Object])
], AuthService);


/***/ }),
/* 109 */
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),
/* 110 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 111 */
/***/ ((module) => {

"use strict";
module.exports = require("otplib");

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(81);
const nestjs_redis_1 = __webpack_require__(32);
const nestjs_prisma_1 = __webpack_require__(9);
const storage_service_1 = __webpack_require__(30);
let UserService = class UserService {
    constructor(prisma, storageService, redisService) {
        this.prisma = prisma;
        this.storageService = storageService;
        this.redisService = redisService;
        this.redis = this.redisService.getClient();
    }
    async findOneById(id) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id },
            include: { secrets: true },
        });
        if (!user.secrets) {
            throw new common_1.InternalServerErrorException(utils_1.ErrorMessage.SecretsNotFound);
        }
        return user;
    }
    async findOneByIdentifier(identifier) {
        const user = await (async (identifier) => {
            // First, find the user by email
            const user = await this.prisma.user.findUnique({
                where: { email: identifier },
                include: { secrets: true },
            });
            // If the user exists, return it
            if (user)
                return user;
            // Otherwise, find the user by username
            // If the user doesn't exist, throw an error
            return await this.prisma.user.findUniqueOrThrow({
                where: { username: identifier },
                include: { secrets: true },
            });
        })(identifier);
        if (!user.secrets) {
            throw new common_1.InternalServerErrorException(utils_1.ErrorMessage.SecretsNotFound);
        }
        return user;
    }
    async create(data) {
        return await this.prisma.user.create({ data, include: { secrets: true } });
    }
    async updateByEmail(email, data) {
        return await this.prisma.user.update({ where: { email }, data });
    }
    async updateByResetToken(resetToken, data) {
        await this.prisma.secrets.update({ where: { resetToken }, data });
    }
    async findByVerificationToken(verificationToken) {
        const secrets = await this.prisma.secrets.findFirst({
            where: { verificationToken },
            include: { user: true },
        });
        if (!secrets || !secrets.user) {
            return null;
        }
        return {
            ...secrets.user,
            secrets,
        };
    }
    async deleteOneById(id) {
        await Promise.all([this.redis.del(`user:${id}:*`), this.storageService.deleteFolder(id)]);
        return await this.prisma.user.delete({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_prisma_1.PrismaService !== "undefined" && nestjs_prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _b : Object, typeof (_c = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _c : Object])
], UserService);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var UtilsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const nestjs_redis_1 = __webpack_require__(32);
let UtilsService = UtilsService_1 = class UtilsService {
    constructor(redisService, configService) {
        this.redisService = redisService;
        this.configService = configService;
        this.logger = new common_1.Logger(UtilsService_1.name);
        this.redis = this.redisService.getClient();
    }
    getUrl() {
        const url = this.configService.get("NODE_ENV") === "production"
            ? this.configService.get("PUBLIC_URL")
            : this.configService.get("__DEV__CLIENT_URL");
        if (!url) {
            throw new common_1.InternalServerErrorException("No PUBLIC_URL or __DEV__CLIENT_URL was found.");
        }
        return url;
    }
    async getCachedOrSet(key, callback, ttl = 1000 * 60 * 60 * 24, // 24 hours
    type = "json") {
        // Try to get the value from the cache
        const start = performance.now();
        const cachedValue = await this.redis.get(key);
        const duration = Number(performance.now() - start).toFixed(0);
        if (!cachedValue) {
            this.logger.debug(`Cache Key "${key}": miss`);
        }
        else {
            this.logger.debug(`Cache Key "${key}": hit - ${duration}ms`);
        }
        // If the value is in the cache, return it
        if (cachedValue) {
            return (type === "string" ? cachedValue : JSON.parse(cachedValue));
        }
        // If the value is not in the cache, run the callback
        const value = await callback();
        const valueToCache = (type === "string" ? value : JSON.stringify(value));
        // Store the value in the cache
        await this.redis.set(key, valueToCache, "PX", ttl);
        // Return the value
        return value;
    }
};
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = UtilsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], UtilsService);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(5);
const dto_1 = __webpack_require__(36);
const mailer_1 = __webpack_require__(19);
const utils_1 = __webpack_require__(81);
const user_decorator_1 = __webpack_require__(29);
const utils_service_1 = __webpack_require__(113);
const auth_service_1 = __webpack_require__(108);
const github_guard_1 = __webpack_require__(115);
const google_guard_1 = __webpack_require__(116);
const jwt_guard_1 = __webpack_require__(117);
const local_guard_1 = __webpack_require__(118);
const refresh_guard_1 = __webpack_require__(119);
const two_factor_guard_1 = __webpack_require__(28);
const cookie_1 = __webpack_require__(120);
const payload_1 = __webpack_require__(121);
const mail_service_1 = __webpack_require__(21);
let AuthController = class AuthController {
    constructor(authService, utils, mailservice, mailService) {
        this.authService = authService;
        this.utils = utils;
        this.mailservice = mailservice;
        this.mailService = mailService;
    }
    async exchangeToken(id, email, isTwoFactorAuth = false) {
        try {
            const payload = payload_1.payloadSchema.parse({ id, isTwoFactorAuth });
            const accessToken = this.authService.generateToken("access", payload);
            const refreshToken = this.authService.generateToken("refresh", payload);
            // Set Refresh Token in Database
            await this.authService.setRefreshToken(email, refreshToken);
            return { accessToken, refreshToken };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error, utils_1.ErrorMessage.SomethingWentWrong);
        }
    }
    async handleAuthenticationResponse(user, response, isTwoFactorAuth = false, redirect = false) {
        let status = "authenticated";
        const redirectUrl = new URL(`${this.utils.getUrl()}/auth/callback`);
        const { accessToken, refreshToken } = await this.exchangeToken(user.id, user.email, isTwoFactorAuth);
        response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
        response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
        if (user.twoFactorEnabled && !isTwoFactorAuth)
            status = "2fa_required";
        const responseData = dto_1.authResponseSchema.parse({ status, user });
        redirectUrl.searchParams.set("status", status);
        if (redirect)
            response.redirect(redirectUrl.toString());
        else
            response.status(200).send(responseData);
    }
    async register(registerDto, response) {
        const user = await this.authService.register(registerDto);
        return this.handleAuthenticationResponse(user, response);
    }
    async login(user, response) {
        return this.handleAuthenticationResponse(user, response);
    }
    getAuthProviders() {
        return this.authService.getAuthProviders();
    }
    // OAuth Flows
    githubLogin() {
        return;
    }
    async githubCallback(user, response) {
        return this.handleAuthenticationResponse(user, response, false, true);
    }
    googleLogin() {
        return;
    }
    async googleCallback(user, response) {
        return this.handleAuthenticationResponse(user, response, false, true);
    }
    async refresh(user, response) {
        return this.handleAuthenticationResponse(user, response, true);
    }
    async updatePassword(email, { password }) {
        await this.authService.updatePassword(email, password);
        return { message: "Your password has been successfully updated." };
    }
    async logout(user, response) {
        await this.authService.setRefreshToken(user.email, null);
        response.clearCookie("Authentication");
        response.clearCookie("Refresh");
        const data = dto_1.messageSchema.parse({ message: "You have been logged out, tschüss!" });
        response.status(200).send(data);
    }
    // Two-Factor Authentication Flows
    async setup2FASecret(email) {
        return this.authService.setup2FASecret(email);
    }
    async enable2FA(id, email, { code }, response) {
        const { backupCodes } = await this.authService.enable2FA(email, code);
        const { accessToken, refreshToken } = await this.exchangeToken(id, email, true);
        response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
        response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
        const data = dto_1.backupCodesSchema.parse({ backupCodes });
        response.status(200).send(data);
    }
    async disable2FA(email) {
        await this.authService.disable2FA(email);
        return { message: "Two-factor authentication has been successfully disabled on your account." };
    }
    async verify2FACode(user, { code }, response) {
        await this.authService.verify2FACode(user.email, code);
        const { accessToken, refreshToken } = await this.exchangeToken(user.id, user.email, true);
        response.cookie("Authentication", accessToken, (0, cookie_1.getCookieOptions)("access"));
        response.cookie("Refresh", refreshToken, (0, cookie_1.getCookieOptions)("refresh"));
        response.status(200).send(dto_1.userSchema.parse(user));
    }
    async useBackup2FACode(id, email, { code }, response) {
        const user = await this.authService.useBackup2FACode(email, code);
        return this.handleAuthenticationResponse(user, response, true);
    }
    // Password Recovery Flows
    async forgotPassword({ email }) {
        try {
            await this.authService.forgotPassword(email);
        }
        catch (error) {
            // pass
        }
        return {
            message: "A password reset link should have been sent to your inbox, if an account existed with the email you provided.",
        };
    }
    async resetPassword({ token, password }) {
        try {
            await this.authService.resetPassword(token, password);
            return { message: "Your password has been successfully reset." };
        }
        catch (error) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidResetToken);
        }
    }
    // Email Verification Flows
    /**
     * GET /api/auth/verify-email/:token
     * Verify email using token from URL path
     */
    async verifyEmailGet(token) {
        if (!token) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
        try {
            await this.authService.verifyEmail(token);
            return { message: "Your email has been successfully verified." };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            common_1.Logger.error(error, "Failed to verify email");
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
    }
    /**
     * POST /api/auth/verify-email
     * Alternative POST endpoint for email verification (for compatibility)
     */
    async verifyEmailPost(token) {
        if (!token) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
        try {
            await this.authService.verifyEmail(token);
            return { message: "Your email has been successfully verified." };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            common_1.Logger.error(error, "Failed to verify email");
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidVerificationToken);
        }
    }
    /**
     * POST /api/auth/resend-verification
     * Resend verification email
     * Can be called by authenticated users or with email in body
     */
    async resendVerificationEmail(email, emailVerified, body) {
        // Get email from authenticated user or request body
        const userEmail = email || body?.email;
        if (!userEmail) {
            throw new common_1.BadRequestException("Email is required. Please provide your email address.");
        }
        // If user is authenticated, check if already verified
        if (email && emailVerified) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.EmailAlreadyVerified);
        }
        try {
            await this.authService.resendVerificationEmail(userEmail);
            return {
                message: "A verification email has been sent to your email address. Please check your inbox.",
            };
        }
        catch (error) {
            // Log the full error for debugging
            common_1.Logger.error(error, "Failed to resend verification email");
            // If it's a known error (like already verified), throw it
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            // Return a generic error message that doesn't reveal too much
            // Don't reveal if email exists or not for security
            return {
                message: "If an account exists with this email, a verification email has been sent.",
            };
        }
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)("register"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.RegisterDto !== "undefined" && dto_1.RegisterDto) === "function" ? _e : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.UseGuards)(local_guard_1.LocalGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _f : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Get)("providers"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "getAuthProviders", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("OAuth", "GitHub"),
    (0, common_1.Get)("github"),
    (0, common_1.UseGuards)(github_guard_1.GitHubGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "githubLogin", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("OAuth", "GitHub"),
    (0, common_1.Get)("github/callback"),
    (0, common_1.UseGuards)(github_guard_1.GitHubGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _g : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "githubCallback", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("OAuth", "Google"),
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("OAuth", "Google"),
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _h : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
tslib_1.__decorate([
    (0, common_1.Post)("refresh"),
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _j : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
tslib_1.__decorate([
    (0, common_1.Patch)("password"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("email")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_k = typeof dto_1.UpdatePasswordDto !== "undefined" && dto_1.UpdatePasswordDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
tslib_1.__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _l : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Two-Factor Auth"),
    (0, common_1.Post)("2fa/setup"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("email")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "setup2FASecret", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Two-Factor Auth"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("2fa/enable"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, user_decorator_1.User)("email")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__param(3, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_m = typeof dto_1.TwoFactorDto !== "undefined" && dto_1.TwoFactorDto) === "function" ? _m : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "enable2FA", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Two-Factor Auth"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("2fa/disable"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("email")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "disable2FA", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Two-Factor Auth"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("2fa/verify"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof dto_1.UserWithSecrets !== "undefined" && dto_1.UserWithSecrets) === "function" ? _o : Object, typeof (_p = typeof dto_1.TwoFactorDto !== "undefined" && dto_1.TwoFactorDto) === "function" ? _p : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verify2FACode", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Two-Factor Auth"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("2fa/backup"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, user_decorator_1.User)("email")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__param(3, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_q = typeof dto_1.TwoFactorBackupDto !== "undefined" && dto_1.TwoFactorBackupDto) === "function" ? _q : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "useBackup2FACode", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Password Reset"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("forgot-password"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof dto_1.ForgotPasswordDto !== "undefined" && dto_1.ForgotPasswordDto) === "function" ? _r : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Password Reset"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("reset-password"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof dto_1.ResetPasswordDto !== "undefined" && dto_1.ResetPasswordDto) === "function" ? _s : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Email Verification"),
    (0, common_1.Get)("verify-email/:token"),
    tslib_1.__param(0, (0, common_1.Param)("token")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailGet", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Email Verification"),
    (0, common_1.Post)("verify-email"),
    tslib_1.__param(0, (0, common_1.Query)("token")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailPost", null);
tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Email Verification"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("resend-verification"),
    tslib_1.__param(0, (0, user_decorator_1.User)("email")),
    tslib_1.__param(1, (0, user_decorator_1.User)("emailVerified")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationEmail", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _b : Object, typeof (_c = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _c : Object, typeof (_d = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _d : Object])
], AuthController);


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHubGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let GitHubGuard = class GitHubGuard extends (0, passport_1.AuthGuard)("github") {
};
exports.GitHubGuard = GitHubGuard;
exports.GitHubGuard = GitHubGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GitHubGuard);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let GoogleGuard = class GoogleGuard extends (0, passport_1.AuthGuard)("google") {
};
exports.GoogleGuard = GoogleGuard;
exports.GoogleGuard = GoogleGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GoogleGuard);


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let JwtGuard = class JwtGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtGuard);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let LocalGuard = class LocalGuard extends (0, passport_1.AuthGuard)("local") {
};
exports.LocalGuard = LocalGuard;
exports.LocalGuard = LocalGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalGuard);


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let RefreshGuard = class RefreshGuard extends (0, passport_1.AuthGuard)("refresh") {
};
exports.RefreshGuard = RefreshGuard;
exports.RefreshGuard = RefreshGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RefreshGuard);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCookieOptions = void 0;
const common_1 = __webpack_require__(2);
const getCookieOptions = (grantType) => {
    // Options For Access Token
    if (grantType === "access") {
        return {
            httpOnly: true,
            sameSite: "strict",
            secure: (process.env.PUBLIC_URL ?? "").includes("https://"),
            expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
        };
    }
    // Options For Refresh Token
    if (grantType === "refresh") {
        return {
            httpOnly: true,
            sameSite: "strict",
            secure: (process.env.PUBLIC_URL ?? "").includes("https://"),
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
        };
    }
    throw new common_1.InternalServerErrorException("InvalidGrantType: " + grantType);
};
exports.getCookieOptions = getCookieOptions;


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.payloadSchema = void 0;
const schema_1 = __webpack_require__(45);
const z_1 = __webpack_require__(40);
exports.payloadSchema = z_1.z.object({
    id: schema_1.idSchema,
    isTwoFactorAuth: z_1.z.boolean().optional(),
});


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DummyStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
const passport_2 = __webpack_require__(123);
let DummyStrategy = class DummyStrategy extends (0, passport_1.PassportStrategy)(passport_2.Strategy, "dummy") {
    constructor() {
        super();
    }
    authenticate() {
        this.fail();
    }
};
exports.DummyStrategy = DummyStrategy;
exports.DummyStrategy = DummyStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], DummyStrategy);


/***/ }),
/* 123 */
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHubStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(81);
const utils_2 = __webpack_require__(81);
const passport_github2_1 = __webpack_require__(125);
const user_service_1 = __webpack_require__(112);
let GitHubStrategy = class GitHubStrategy extends (0, passport_1.PassportStrategy)(passport_github2_1.Strategy, "github") {
    constructor(clientID, clientSecret, callbackURL, userService) {
        super({ clientID, clientSecret, callbackURL, scope: ["user:email"] });
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.callbackURL = callbackURL;
        this.userService = userService;
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { displayName, emails, photos, username } = profile;
        const email = emails?.[0].value ?? `${username}@github.com`;
        const picture = photos?.[0].value;
        let user = null;
        if (!email)
            throw new common_1.BadRequestException();
        try {
            const user = await this.userService.findOneByIdentifier(email);
            if (!user)
                throw new common_1.UnauthorizedException();
            done(null, user);
        }
        catch (error) {
            try {
                user = await this.userService.create({
                    email,
                    picture,
                    locale: "en-US",
                    name: displayName,
                    provider: "github",
                    emailVerified: true, // auto-verify emails
                    username: (0, utils_1.processUsername)(username ?? email.split("@")[0]),
                    secrets: { create: {} },
                });
                done(null, user);
            }
            catch (error) {
                throw new common_1.BadRequestException(utils_2.ErrorMessage.UserAlreadyExists);
            }
        }
    }
};
exports.GitHubStrategy = GitHubStrategy;
exports.GitHubStrategy = GitHubStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String, String, String, typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], GitHubStrategy);


/***/ }),
/* 125 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-github2");

/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(81);
const utils_2 = __webpack_require__(81);
const passport_google_oauth20_1 = __webpack_require__(127);
const user_service_1 = __webpack_require__(112);
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "google") {
    constructor(clientID, clientSecret, callbackURL, userService) {
        super({ clientID, clientSecret, callbackURL, scope: ["email", "profile"] });
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.callbackURL = callbackURL;
        this.userService = userService;
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { displayName, emails, photos, username } = profile;
        const email = emails?.[0].value ?? `${username}@google.com`;
        const picture = photos?.[0].value;
        let user = null;
        if (!email)
            throw new common_1.BadRequestException();
        try {
            const user = await this.userService.findOneByIdentifier(email);
            if (!user)
                throw new common_1.UnauthorizedException();
            done(null, user);
        }
        catch (error) {
            try {
                user = await this.userService.create({
                    email,
                    picture,
                    locale: "en-US",
                    name: displayName,
                    provider: "google",
                    emailVerified: true, // auto-verify emails
                    username: (0, utils_1.processUsername)(username ?? email.split("@")[0]),
                    secrets: { create: {} },
                });
                done(null, user);
            }
            catch (error) {
                throw new common_1.BadRequestException(utils_2.ErrorMessage.UserAlreadyExists);
            }
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [String, String, String, typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),
/* 127 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-google-oauth20");

/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(17);
const passport_jwt_1 = __webpack_require__(129);
const user_service_1 = __webpack_require__(112);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt") {
    constructor(configService, userService) {
        const extractors = [(request) => request?.cookies?.Authentication];
        super({
            secretOrKey: configService.get("ACCESS_TOKEN_SECRET"),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors(extractors),
            ignoreExpiration: false,
        });
        this.configService = configService;
        this.userService = userService;
    }
    async validate(payload) {
        return this.userService.findOneById(payload.id);
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 129 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(81);
const passport_local_1 = __webpack_require__(131);
const auth_service_1 = __webpack_require__(108);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, "local") {
    constructor(authService) {
        super({ usernameField: "identifier" });
        this.authService = authService;
    }
    async validate(identifier, password) {
        try {
            return await this.authService.authenticate({ identifier, password });
        }
        catch (error) {
            throw new common_1.BadRequestException(utils_1.ErrorMessage.InvalidCredentials);
        }
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 131 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-local");

/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(17);
const passport_jwt_1 = __webpack_require__(129);
const auth_service_1 = __webpack_require__(108);
let RefreshStrategy = class RefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "refresh") {
    constructor(configService, authService) {
        const extractors = [(request) => request?.cookies?.Refresh];
        super({
            secretOrKey: configService.getOrThrow("REFRESH_TOKEN_SECRET"),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors(extractors),
            passReqToCallback: true,
            ignoreExpiration: false,
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(request, payload) {
        const refreshToken = request.cookies?.Refresh;
        return this.authService.validateRefreshToken(payload, refreshToken);
    }
};
exports.RefreshStrategy = RefreshStrategy;
exports.RefreshStrategy = RefreshStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], RefreshStrategy);


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(17);
const passport_jwt_1 = __webpack_require__(129);
const user_service_1 = __webpack_require__(112);
let TwoFactorStrategy = class TwoFactorStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "two-factor") {
    constructor(configService, userService) {
        const extractors = [(request) => request?.cookies?.Authentication];
        super({
            secretOrKey: configService.get("ACCESS_TOKEN_SECRET"),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors(extractors),
            ignoreExpiration: false,
        });
        this.configService = configService;
        this.userService = userService;
    }
    async validate(payload) {
        const user = await this.userService.findOneById(payload.id);
        // If the user has 2FA disabled, this will follow the same route as JWT Strategy
        if (!user.twoFactorEnabled)
            return user;
        if (payload.isTwoFactorAuth)
            return user;
    }
};
exports.TwoFactorStrategy = TwoFactorStrategy;
exports.TwoFactorStrategy = TwoFactorStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], TwoFactorStrategy);


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const nestjs_redis_1 = __webpack_require__(32);
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_redis_1.RedisModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    config: { url: configService.getOrThrow("REDIS_URL") },
                }),
            }),
        ],
    })
], CacheModule);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const path_1 = __webpack_require__(14);
const schema_1 = __webpack_require__(136);
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                validate: schema_1.configSchema.parse,
                // Explicitly set env file paths to ensure .env is loaded
                envFilePath: [
                    (0, path_1.join)(process.cwd(), ".env.local"),
                    (0, path_1.join)(process.cwd(), ".env"),
                    (0, path_1.join)(process.cwd(), "..", ".env"),
                    (0, path_1.join)(process.cwd(), "..", "..", ".env"),
                ],
            }),
        ],
    })
], ConfigModule);


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configSchema = void 0;
const z_1 = __webpack_require__(40);
exports.configSchema = z_1.z.object({
    NODE_ENV: z_1.z.enum(["development", "production"]).default("production"),
    // Ports
    PORT: z_1.z.coerce.number().default(3000),
    // Client URL (only for development environments)
    __DEV__CLIENT_URL: z_1.z.string().url().optional(),
    // URLs
    PUBLIC_URL: z_1.z.string().url(),
    STORAGE_URL: z_1.z.string().url(),
    // Database (Prisma)
    DATABASE_URL: z_1.z.string().url().startsWith("postgresql://"),
    // Authentication Secrets
    ACCESS_TOKEN_SECRET: z_1.z.string(),
    REFRESH_TOKEN_SECRET: z_1.z.string(),
    // Browser
    CHROME_TOKEN: z_1.z.string(),
    CHROME_URL: z_1.z.string().url(),
    // Mail Server
    SMTP_SERVICE: z_1.z.string().optional(),
    SMTP_HOST: z_1.z.string().optional(),
    SMTP_PORT: z_1.z.coerce.number().optional(),
    SMTP_MAIL: z_1.z.string().optional(),
    SMTP_PASSWORD: z_1.z.string().optional(),
    // Storage
    STORAGE_ENDPOINT: z_1.z.string(),
    STORAGE_PORT: z_1.z.coerce.number(),
    STORAGE_REGION: z_1.z.string().default("us-east-1"),
    STORAGE_BUCKET: z_1.z.string(),
    STORAGE_ACCESS_KEY: z_1.z.string(),
    STORAGE_SECRET_KEY: z_1.z.string(),
    STORAGE_USE_SSL: z_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    STORAGE_SKIP_CREATE_BUCKET: z_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    // Redis
    REDIS_URL: z_1.z.string().url().startsWith("redis://").optional(),
    // Sentry
    VITE_SENTRY_DSN: z_1.z.string().url().startsWith("https://").optional(),
    // Crowdin (Optional)
    CROWDIN_PROJECT_ID: z_1.z.coerce.number().optional(),
    CROWDIN_PERSONAL_TOKEN: z_1.z.string().optional(),
    // Email (Optional)
    DISABLE_EMAIL_AUTH: z_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    // GitHub (OAuth)
    GITHUB_CLIENT_ID: z_1.z.string().optional(),
    GITHUB_CLIENT_SECRET: z_1.z.string().optional(),
    GITHUB_CALLBACK_URL: z_1.z.string().url().optional(),
    // Google (OAuth)
    GOOGLE_CLIENT_ID: z_1.z.string().optional(),
    GOOGLE_CLIENT_SECRET: z_1.z.string().optional(),
    GOOGLE_CALLBACK_URL: z_1.z.string().url().optional(),
});


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributorsModule = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const contributors_controller_1 = __webpack_require__(139);
const contributors_service_1 = __webpack_require__(140);
let ContributorsModule = class ContributorsModule {
};
exports.ContributorsModule = ContributorsModule;
exports.ContributorsModule = ContributorsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [contributors_controller_1.ContributorsController],
        providers: [contributors_service_1.ContributorsService],
    })
], ContributorsModule);


/***/ }),
/* 138 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/axios");

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributorsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const utils_service_1 = __webpack_require__(113);
const contributors_service_1 = __webpack_require__(140);
let ContributorsController = class ContributorsController {
    constructor(contributorsService, utils) {
        this.contributorsService = contributorsService;
        this.utils = utils;
    }
    async githubContributors() {
        return this.utils.getCachedOrSet(`contributors:github`, async () => this.contributorsService.fetchGitHubContributors(), 1000 * 60 * 60 * 24);
    }
    async crowdinContributors() {
        return this.utils.getCachedOrSet(`contributors:crowdin`, async () => this.contributorsService.fetchCrowdinContributors(), 1000 * 60 * 60 * 24);
    }
};
exports.ContributorsController = ContributorsController;
tslib_1.__decorate([
    (0, common_1.Get)("/github"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ContributorsController.prototype, "githubContributors", null);
tslib_1.__decorate([
    (0, common_1.Get)("/crowdin"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ContributorsController.prototype, "crowdinContributors", null);
exports.ContributorsController = ContributorsController = tslib_1.__decorate([
    (0, common_1.Controller)("contributors"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof contributors_service_1.ContributorsService !== "undefined" && contributors_service_1.ContributorsService) === "function" ? _a : Object, typeof (_b = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _b : Object])
], ContributorsController);


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributorsService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
let ContributorsService = class ContributorsService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async fetchGitHubContributors() {
        const response = await this.httpService.axiosRef.get(`https://api.github.com/repos/AmruthPillai/Reactive-Resume/contributors`);
        const data = response.data;
        return data.map((user) => {
            return {
                id: user.id,
                name: user.login,
                url: user.html_url,
                avatar: user.avatar_url,
            };
        });
    }
    async fetchCrowdinContributors() {
        try {
            const projectId = this.configService.getOrThrow("CROWDIN_PROJECT_ID");
            const accessToken = this.configService.getOrThrow("CROWDIN_PERSONAL_TOKEN");
            const response = await this.httpService.axiosRef.get(`https://api.crowdin.com/api/v2/projects/${projectId}/members`, { headers: { Authorization: `Bearer ${accessToken}` } });
            const { data } = response.data;
            return data.map(({ data }) => {
                return {
                    id: data.id,
                    name: data.username,
                    url: `https://crowdin.com/profile/${data.username}`,
                    avatar: data.avatarUrl,
                };
            });
        }
        catch (error) {
            return [];
        }
    }
};
exports.ContributorsService = ContributorsService;
exports.ContributorsService = ContributorsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], ContributorsService);


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const nestjs_prisma_1 = __webpack_require__(9);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prisma_1.PrismaModule.forRootAsync({
                isGlobal: true,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    prismaOptions: { datasourceUrl: configService.get("DATABASE_URL") },
                    middlewares: [
                        (0, nestjs_prisma_1.loggingMiddleware)({
                            logLevel: "debug", // only in development
                            logger: new common_1.Logger(nestjs_prisma_1.PrismaService.name),
                            logMessage: (query) => `[Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
                        }),
                    ],
                }),
            }),
        ],
        providers: [(0, nestjs_prisma_1.providePrismaClientExceptionFilter)()],
    })
], DatabaseModule);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(143);
const nestjs_redis_health_1 = __webpack_require__(144);
const printer_module_1 = __webpack_require__(145);
const storage_module_1 = __webpack_require__(24);
const browser_health_1 = __webpack_require__(151);
const database_health_1 = __webpack_require__(152);
const health_controller_1 = __webpack_require__(153);
const storage_health_1 = __webpack_require__(154);
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule, printer_module_1.PrinterModule, storage_module_1.StorageModule, nestjs_redis_health_1.RedisHealthModule],
        controllers: [health_controller_1.HealthController],
        providers: [database_health_1.DatabaseHealthIndicator, browser_health_1.BrowserHealthIndicator, storage_health_1.StorageHealthIndicator],
    })
], HealthModule);


/***/ }),
/* 143 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/terminus");

/***/ }),
/* 144 */
/***/ ((module) => {

"use strict";
module.exports = require("@songkeys/nestjs-redis-health");

/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrinterModule = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const storage_module_1 = __webpack_require__(24);
const printer_service_1 = __webpack_require__(146);
let PrinterModule = class PrinterModule {
};
exports.PrinterModule = PrinterModule;
exports.PrinterModule = PrinterModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, storage_module_1.StorageModule],
        providers: [printer_service_1.PrinterService],
        exports: [printer_service_1.PrinterService],
    })
], PrinterModule);


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var PrinterService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrinterService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const fontkit_1 = tslib_1.__importDefault(__webpack_require__(147));
const utils_1 = __webpack_require__(81);
const utils_2 = __webpack_require__(81);
const async_retry_1 = tslib_1.__importDefault(__webpack_require__(148));
const pdf_lib_1 = __webpack_require__(149);
const puppeteer_1 = __webpack_require__(150);
const storage_service_1 = __webpack_require__(30);
const utils_service_1 = __webpack_require__(113);
let PrinterService = PrinterService_1 = class PrinterService {
    constructor(configService, storageService, httpService, utils) {
        this.configService = configService;
        this.storageService = storageService;
        this.httpService = httpService;
        this.utils = utils;
        this.logger = new common_1.Logger(PrinterService_1.name);
        const chromeUrl = this.configService.getOrThrow("CHROME_URL");
        const chromeToken = this.configService.getOrThrow("CHROME_TOKEN");
        this.browserURL = `${chromeUrl}?token=${chromeToken}`;
    }
    async getBrowser() {
        try {
            return await (0, puppeteer_1.connect)({ browserWSEndpoint: this.browserURL });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(utils_2.ErrorMessage.InvalidBrowserConnection, error.message);
        }
    }
    async getVersion() {
        const browser = await this.getBrowser();
        const version = await browser.version();
        browser.disconnect();
        return version;
    }
    async printResume(resume) {
        return this.utils.getCachedOrSet(`user:${resume.userId}:storage:resumes:${resume.id}`, async () => {
            const start = performance.now();
            const url = await (0, async_retry_1.default)(() => this.generateResume(resume), {
                retries: 3,
                randomize: true,
                onRetry: (_, attempt) => {
                    this.logger.log(`Retrying to print resume #${resume.id}, attempt #${attempt}`);
                },
            });
            const duration = Number(performance.now() - start).toFixed(0);
            const numPages = resume.data.metadata.layout.length;
            this.logger.debug(`Chrome took ${duration}ms to print ${numPages} page(s)`);
            return url;
        });
    }
    async printPreview(resume) {
        return this.utils.getCachedOrSet(`user:${resume.userId}:storage:previews:${resume.id}`, async () => {
            const start = performance.now();
            const url = await (0, async_retry_1.default)(() => this.generatePreview(resume), {
                retries: 3,
                randomize: true,
                onRetry: (_, attempt) => {
                    this.logger.log(`Retrying to generate preview of resume #${resume.id}, attempt #${attempt}`);
                },
            });
            const duration = Number(performance.now() - start).toFixed(0);
            this.logger.debug(`Chrome took ${duration}ms to generate preview`);
            return url;
        });
    }
    async generateResume(resume) {
        try {
            const browser = await this.getBrowser();
            const page = await browser.newPage();
            let url = this.utils.getUrl();
            const publicUrl = this.configService.getOrThrow("PUBLIC_URL");
            const storageUrl = this.configService.getOrThrow("STORAGE_URL");
            if ([publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
                // Switch client URL from `localhost` to `host.docker.internal` in development
                // This is required because the browser is running in a container and the client is running on the host machine.
                url = url.replace("localhost", "host.docker.internal");
                await page.setRequestInterception(true);
                // Intercept requests of `localhost` to `host.docker.internal` in development
                page.on("request", (request) => {
                    if (request.url().startsWith(storageUrl)) {
                        const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);
                        request.continue({ url: modifiedUrl });
                    }
                    else {
                        request.continue();
                    }
                });
            }
            // Set the data of the resume to be printed in the browser's session storage
            const numPages = resume.data.metadata.layout.length;
            await page.evaluateOnNewDocument((data) => {
                window.localStorage.setItem("resume", JSON.stringify(data));
            }, resume.data);
            await page.goto(`${url}/artboard/preview`, { waitUntil: "networkidle0" });
            const pagesBuffer = [];
            const processPage = async (index) => {
                const pageElement = await page.$(`[data-page="${index}"]`);
                const width = (await (await pageElement?.getProperty("scrollWidth"))?.jsonValue()) ?? 0;
                const height = (await (await pageElement?.getProperty("scrollHeight"))?.jsonValue()) ?? 0;
                const tempHtml = await page.evaluate((element) => {
                    const clonedElement = element.cloneNode(true);
                    const tempHtml = document.body.innerHTML;
                    document.body.innerHTML = `${clonedElement.outerHTML}`;
                    return tempHtml;
                }, pageElement);
                pagesBuffer.push(await page.pdf({ width, height, printBackground: true }));
                await page.evaluate((tempHtml) => {
                    document.body.innerHTML = tempHtml;
                }, tempHtml);
            };
            // Loop through all the pages and print them, by first displaying them, printing the PDF and then hiding them back
            for (let index = 1; index <= numPages; index++) {
                await processPage(index);
            }
            // Using 'pdf-lib', merge all the pages from their buffers into a single PDF
            const pdf = await pdf_lib_1.PDFDocument.create();
            pdf.registerFontkit(fontkit_1.default);
            // Get information about fonts used in the resume from the metadata
            const fontData = resume.data.metadata.typography.font;
            const fontUrls = (0, utils_1.getFontUrls)(fontData.family, fontData.variants);
            // Load all the fonts from the URLs using HttpService
            const responses = await Promise.all(fontUrls.map((url) => this.httpService.axiosRef.get(url, {
                responseType: "arraybuffer",
            })));
            const fontsBuffer = responses.map((response) => response.data);
            // Embed all the fonts in the PDF
            await Promise.all(fontsBuffer.map((buffer) => pdf.embedFont(buffer)));
            for (let index = 0; index < pagesBuffer.length; index++) {
                const page = await pdf_lib_1.PDFDocument.load(pagesBuffer[index]);
                const [copiedPage] = await pdf.copyPages(page, [0]);
                pdf.addPage(copiedPage);
            }
            // Save the PDF to storage and return the URL to download the resume
            // Store the URL in cache for future requests, under the previously generated hash digest
            const buffer = Buffer.from(await pdf.save());
            // This step will also save the resume URL in cache
            const resumeUrl = await this.storageService.uploadObject(resume.userId, "resumes", buffer, resume.id);
            // Close all the pages and disconnect from the browser
            await page.close();
            browser.disconnect();
            return resumeUrl;
        }
        catch (error) {
            console.trace(error);
        }
    }
    async generatePreview(resume) {
        const browser = await this.getBrowser();
        const page = await browser.newPage();
        let url = this.utils.getUrl();
        const publicUrl = this.configService.getOrThrow("PUBLIC_URL");
        const storageUrl = this.configService.getOrThrow("STORAGE_URL");
        if ([publicUrl, storageUrl].some((url) => url.includes("localhost"))) {
            // Switch client URL from `localhost` to `host.docker.internal` in development
            // This is required because the browser is running in a container and the client is running on the host machine.
            url = url.replace("localhost", "host.docker.internal");
            await page.setRequestInterception(true);
            // Intercept requests of `localhost` to `host.docker.internal` in development
            page.on("request", (request) => {
                if (request.url().startsWith(storageUrl)) {
                    const modifiedUrl = request.url().replace("localhost", `host.docker.internal`);
                    request.continue({ url: modifiedUrl });
                }
                else {
                    request.continue();
                }
            });
        }
        // Set the data of the resume to be printed in the browser's session storage
        await page.evaluateOnNewDocument((data) => {
            window.localStorage.setItem("resume", JSON.stringify(data));
        }, resume.data);
        await page.setViewport({ width: 794, height: 1123 });
        await page.goto(`${url}/artboard/preview`, { waitUntil: "networkidle0" });
        // Save the JPEG to storage and return the URL
        // Store the URL in cache for future requests, under the previously generated hash digest
        const buffer = await page.screenshot({ quality: 80, type: "jpeg" });
        // Generate a hash digest of the resume data, this hash will be used to check if the resume has been updated
        const previewUrl = await this.storageService.uploadObject(resume.userId, "previews", buffer, resume.id);
        // Close all the pages and disconnect from the browser
        await page.close();
        browser.disconnect();
        return previewUrl;
    }
};
exports.PrinterService = PrinterService;
exports.PrinterService = PrinterService = PrinterService_1 = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object, typeof (_d = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _d : Object])
], PrinterService);


/***/ }),
/* 147 */
/***/ ((module) => {

"use strict";
module.exports = require("@pdf-lib/fontkit");

/***/ }),
/* 148 */
/***/ ((module) => {

"use strict";
module.exports = require("async-retry");

/***/ }),
/* 149 */
/***/ ((module) => {

"use strict";
module.exports = require("pdf-lib");

/***/ }),
/* 150 */
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer");

/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrowserHealthIndicator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(143);
const printer_service_1 = __webpack_require__(146);
let BrowserHealthIndicator = class BrowserHealthIndicator extends terminus_1.HealthIndicator {
    constructor(printerService) {
        super();
        this.printerService = printerService;
    }
    async isHealthy() {
        try {
            const version = await this.printerService.getVersion();
            return this.getStatus("browser", true, { version });
        }
        catch (error) {
            return this.getStatus("browser", false, { message: error.message });
        }
    }
};
exports.BrowserHealthIndicator = BrowserHealthIndicator;
exports.BrowserHealthIndicator = BrowserHealthIndicator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof printer_service_1.PrinterService !== "undefined" && printer_service_1.PrinterService) === "function" ? _a : Object])
], BrowserHealthIndicator);


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseHealthIndicator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(143);
const nestjs_prisma_1 = __webpack_require__(9);
let DatabaseHealthIndicator = class DatabaseHealthIndicator extends terminus_1.HealthIndicator {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async isHealthy() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return this.getStatus("database", true);
        }
        catch (error) {
            return this.getStatus("database", false, { message: error.message });
        }
    }
};
exports.DatabaseHealthIndicator = DatabaseHealthIndicator;
exports.DatabaseHealthIndicator = DatabaseHealthIndicator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_prisma_1.PrismaService !== "undefined" && nestjs_prisma_1.PrismaService) === "function" ? _a : Object])
], DatabaseHealthIndicator);


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(5);
const terminus_1 = __webpack_require__(143);
const nestjs_redis_1 = __webpack_require__(32);
const nestjs_redis_health_1 = __webpack_require__(144);
const schema_1 = __webpack_require__(136);
const utils_service_1 = __webpack_require__(113);
const browser_health_1 = __webpack_require__(151);
const database_health_1 = __webpack_require__(152);
const storage_health_1 = __webpack_require__(154);
let HealthController = class HealthController {
    constructor(health, database, browser, storage, redisService, redis, utils) {
        this.health = health;
        this.database = database;
        this.browser = browser;
        this.storage = storage;
        this.redisService = redisService;
        this.redis = redis;
        this.utils = utils;
    }
    run() {
        return this.health.check([
            () => this.database.isHealthy(),
            () => this.storage.isHealthy(),
            () => this.browser.isHealthy(),
            () => {
                return this.redis.checkHealth("redis", {
                    type: "redis",
                    timeout: 1000,
                    client: this.redisService.getClient(),
                });
            },
        ]);
    }
    check() {
        return this.utils.getCachedOrSet(`health:check`, () => this.run(), 1000 * 30); // 30 seconds
    }
    environment() {
        if (process.env.NODE_ENV === "production")
            throw new common_1.NotFoundException();
        return schema_1.configSchema.parse(process.env);
    }
};
exports.HealthController = HealthController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
tslib_1.__decorate([
    (0, common_1.Get)("environment"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "environment", null);
exports.HealthController = HealthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Health"),
    (0, common_1.Controller)("health"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof terminus_1.HealthCheckService !== "undefined" && terminus_1.HealthCheckService) === "function" ? _a : Object, typeof (_b = typeof database_health_1.DatabaseHealthIndicator !== "undefined" && database_health_1.DatabaseHealthIndicator) === "function" ? _b : Object, typeof (_c = typeof browser_health_1.BrowserHealthIndicator !== "undefined" && browser_health_1.BrowserHealthIndicator) === "function" ? _c : Object, typeof (_d = typeof storage_health_1.StorageHealthIndicator !== "undefined" && storage_health_1.StorageHealthIndicator) === "function" ? _d : Object, typeof (_e = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _e : Object, typeof (_f = typeof nestjs_redis_health_1.RedisHealthIndicator !== "undefined" && nestjs_redis_health_1.RedisHealthIndicator) === "function" ? _f : Object, typeof (_g = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _g : Object])
], HealthController);


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageHealthIndicator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(143);
const storage_service_1 = __webpack_require__(30);
let StorageHealthIndicator = class StorageHealthIndicator extends terminus_1.HealthIndicator {
    constructor(storageService) {
        super();
        this.storageService = storageService;
    }
    async isHealthy() {
        try {
            await this.storageService.bucketExists();
            return this.getStatus("storage", true);
        }
        catch (error) {
            return this.getStatus("storage", false, { message: error.message });
        }
    }
};
exports.StorageHealthIndicator = StorageHealthIndicator;
exports.StorageHealthIndicator = StorageHealthIndicator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _a : Object])
], StorageHealthIndicator);


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_module_1 = __webpack_require__(15);
const printer_module_1 = __webpack_require__(145);
const storage_module_1 = __webpack_require__(24);
const resume_controller_1 = __webpack_require__(156);
const resume_service_1 = __webpack_require__(162);
let ResumeModule = class ResumeModule {
};
exports.ResumeModule = ResumeModule;
exports.ResumeModule = ResumeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, printer_module_1.PrinterModule, storage_module_1.StorageModule],
        controllers: [resume_controller_1.ResumeController],
        providers: [resume_service_1.ResumeService],
        exports: [resume_service_1.ResumeService],
    })
], ResumeModule);


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(5);
const client_1 = __webpack_require__(157);
const library_1 = __webpack_require__(35);
const dto_1 = __webpack_require__(36);
const schema_1 = __webpack_require__(45);
const utils_1 = __webpack_require__(81);
const zod_to_json_schema_1 = __webpack_require__(158);
const user_decorator_1 = __webpack_require__(29);
const optional_guard_1 = __webpack_require__(159);
const two_factor_guard_1 = __webpack_require__(28);
const utils_service_1 = __webpack_require__(113);
const resume_decorator_1 = __webpack_require__(160);
const resume_guard_1 = __webpack_require__(161);
const resume_service_1 = __webpack_require__(162);
let ResumeController = class ResumeController {
    constructor(resumeService, utils) {
        this.resumeService = resumeService;
        this.utils = utils;
    }
    getSchema() {
        return this.utils.getCachedOrSet(`resume:schema`, () => (0, zod_to_json_schema_1.zodToJsonSchema)(schema_1.resumeDataSchema), 1000 * 60 * 60 * 24);
    }
    async create(user, createResumeDto) {
        try {
            return await this.resumeService.create(user.id, createResumeDto);
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.ResumeSlugAlreadyExists);
            }
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async import(user, importResumeDto) {
        try {
            return await this.resumeService.import(user.id, importResumeDto);
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new common_1.BadRequestException(utils_1.ErrorMessage.ResumeSlugAlreadyExists);
            }
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    findAll(user) {
        return this.resumeService.findAll(user.id);
    }
    findOne(resume) {
        return resume;
    }
    findOneStatistics(userId, id) {
        return this.resumeService.findOneStatistics(userId, id);
    }
    findOneByUsernameSlug(username, slug, userId) {
        return this.resumeService.findOneByUsernameSlug(username, slug, userId);
    }
    update(user, id, updateResumeDto) {
        return this.resumeService.update(user.id, id, updateResumeDto);
    }
    lock(user, id, set = true) {
        return this.resumeService.lock(user.id, id, set);
    }
    remove(user, id) {
        return this.resumeService.remove(user.id, id);
    }
    async printResume(userId, resume) {
        try {
            const url = await this.resumeService.printResume(resume, userId);
            return { url };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async printPreview(resume) {
        try {
            const url = await this.resumeService.printPreview(resume);
            return { url };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.ResumeController = ResumeController;
tslib_1.__decorate([
    (0, common_1.Get)("schema"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "getSchema", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, typeof (_d = typeof dto_1.CreateResumeDto !== "undefined" && dto_1.CreateResumeDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ResumeController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)("import"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object, typeof (_f = typeof dto_1.ImportResumeDto !== "undefined" && dto_1.ImportResumeDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ResumeController.prototype, "import", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard, resume_guard_1.ResumeGuard),
    tslib_1.__param(0, (0, resume_decorator_1.Resume)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof dto_1.ResumeDto !== "undefined" && dto_1.ResumeDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id/statistics"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "findOneStatistics", null);
tslib_1.__decorate([
    (0, common_1.Get)("/public/:username/:slug"),
    (0, common_1.UseGuards)(optional_guard_1.OptionalGuard),
    tslib_1.__param(0, (0, common_1.Param)("username")),
    tslib_1.__param(1, (0, common_1.Param)("slug")),
    tslib_1.__param(2, (0, user_decorator_1.User)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "findOneByUsernameSlug", null);
tslib_1.__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _j : Object, String, typeof (_k = typeof dto_1.UpdateResumeDto !== "undefined" && dto_1.UpdateResumeDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Patch)(":id/lock"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__param(2, (0, common_1.Body)("set")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _l : Object, String, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "lock", null);
tslib_1.__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)()),
    tslib_1.__param(1, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _m : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ResumeController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Get)("/print/:id"),
    (0, common_1.UseGuards)(optional_guard_1.OptionalGuard, resume_guard_1.ResumeGuard),
    tslib_1.__param(0, (0, user_decorator_1.User)("id")),
    tslib_1.__param(1, (0, resume_decorator_1.Resume)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_o = typeof dto_1.ResumeDto !== "undefined" && dto_1.ResumeDto) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ResumeController.prototype, "printResume", null);
tslib_1.__decorate([
    (0, common_1.Get)("/print/:id/preview"),
    (0, common_1.UseGuards)(two_factor_guard_1.TwoFactorGuard, resume_guard_1.ResumeGuard),
    tslib_1.__param(0, (0, resume_decorator_1.Resume)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof dto_1.ResumeDto !== "undefined" && dto_1.ResumeDto) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ResumeController.prototype, "printPreview", null);
exports.ResumeController = ResumeController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("Resume"),
    (0, common_1.Controller)("resume"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof resume_service_1.ResumeService !== "undefined" && resume_service_1.ResumeService) === "function" ? _a : Object, typeof (_b = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _b : Object])
], ResumeController);


/***/ }),
/* 157 */
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),
/* 158 */
/***/ ((module) => {

"use strict";
module.exports = require("zod-to-json-schema");

/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OptionalGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(17);
let OptionalGuard = class OptionalGuard extends (0, passport_1.AuthGuard)("two-factor") {
    handleRequest(error, user) {
        return user;
    }
};
exports.OptionalGuard = OptionalGuard;
exports.OptionalGuard = OptionalGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], OptionalGuard);


/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resume = void 0;
const common_1 = __webpack_require__(2);
exports.Resume = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const resume = request.payload?.resume;
    return data ? resume?.[data] : resume;
});


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(81);
const resume_service_1 = __webpack_require__(162);
let ResumeGuard = class ResumeGuard {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        try {
            const resume = await this.resumeService.findOne(request.params.id, user ? user.id : undefined);
            // First check if the resume is public, if yes, attach the resume to the request payload.
            if (resume.visibility === "public") {
                request.payload = { resume };
            }
            // If the resume is private and the user is authenticated and is the owner of the resume, attach the resume to the request payload.
            // Else, if either the user is not authenticated or is not the owner of the resume, throw a 404 error.
            if (resume.visibility === "private") {
                if (user && user && user.id === resume.userId) {
                    request.payload = { resume };
                }
                else {
                    throw new common_1.NotFoundException(utils_1.ErrorMessage.ResumeNotFound);
                }
            }
            return true;
        }
        catch (error) {
            throw new common_1.NotFoundException(utils_1.ErrorMessage.ResumeNotFound);
        }
    }
};
exports.ResumeGuard = ResumeGuard;
exports.ResumeGuard = ResumeGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof resume_service_1.ResumeService !== "undefined" && resume_service_1.ResumeService) === "function" ? _a : Object])
], ResumeGuard);


/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const schema_1 = __webpack_require__(45);
const utils_1 = __webpack_require__(81);
const utils_2 = __webpack_require__(81);
const nestjs_redis_1 = __webpack_require__(32);
const deepmerge_1 = tslib_1.__importDefault(__webpack_require__(163));
const nestjs_prisma_1 = __webpack_require__(9);
const printer_service_1 = __webpack_require__(146);
const storage_service_1 = __webpack_require__(30);
const utils_service_1 = __webpack_require__(113);
let ResumeService = class ResumeService {
    constructor(prisma, printerService, storageService, redisService, utils) {
        this.prisma = prisma;
        this.printerService = printerService;
        this.storageService = storageService;
        this.redisService = redisService;
        this.utils = utils;
        this.redis = this.redisService.getClient();
    }
    async create(userId, createResumeDto) {
        const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { name: true, email: true, picture: true },
        });
        const data = (0, deepmerge_1.default)(schema_1.defaultResumeData, {
            basics: { name, email, picture: { url: picture ?? "" } },
        });
        const resume = await this.prisma.resume.create({
            data: {
                data,
                userId,
                title: createResumeDto.title,
                visibility: createResumeDto.visibility,
                slug: createResumeDto.slug ?? (0, utils_1.kebabCase)(createResumeDto.title),
            },
        });
        await Promise.all([
            this.redis.del(`user:${userId}:resumes`),
            this.redis.set(`user:${userId}:resume:${resume.id}`, JSON.stringify(resume)),
        ]);
        return resume;
    }
    async import(userId, importResumeDto) {
        const randomTitle = (0, utils_1.generateRandomName)();
        const resume = await this.prisma.resume.create({
            data: {
                userId,
                visibility: "private",
                data: importResumeDto.data,
                title: importResumeDto.title || randomTitle,
                slug: importResumeDto.slug || (0, utils_1.kebabCase)(randomTitle),
            },
        });
        await Promise.all([
            this.redis.del(`user:${userId}:resumes`),
            this.redis.set(`user:${userId}:resume:${resume.id}`, JSON.stringify(resume)),
        ]);
        return resume;
    }
    findAll(userId) {
        return this.utils.getCachedOrSet(`user:${userId}:resumes`, () => this.prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
        }));
    }
    findOne(id, userId) {
        if (userId) {
            return this.utils.getCachedOrSet(`user:${userId}:resume:${id}`, () => this.prisma.resume.findUniqueOrThrow({
                where: { userId_id: { userId, id } },
            }));
        }
        return this.utils.getCachedOrSet(`user:public:resume:${id}`, () => this.prisma.resume.findUniqueOrThrow({
            where: { id },
        }));
    }
    async findOneStatistics(userId, id) {
        const result = await Promise.all([
            this.redis.get(`user:${userId}:resume:${id}:views`),
            this.redis.get(`user:${userId}:resume:${id}:downloads`),
        ]);
        const [views, downloads] = result.map((value) => Number(value) || 0);
        return { views, downloads };
    }
    async findOneByUsernameSlug(username, slug, userId) {
        const resume = await this.prisma.resume.findFirstOrThrow({
            where: { user: { username }, slug, visibility: "public" },
        });
        // Update statistics: increment the number of views by 1
        if (!userId)
            await this.redis.incr(`user:${resume.userId}:resume:${resume.id}:views`);
        return resume;
    }
    async update(userId, id, updateResumeDto) {
        try {
            const { locked } = await this.prisma.resume.findUniqueOrThrow({
                where: { id },
                select: { locked: true },
            });
            if (locked)
                throw new common_1.BadRequestException(utils_2.ErrorMessage.ResumeLocked);
            const resume = await this.prisma.resume.update({
                data: {
                    title: updateResumeDto.title,
                    slug: updateResumeDto.slug,
                    visibility: updateResumeDto.visibility,
                    data: updateResumeDto.data,
                },
                where: { userId_id: { userId, id } },
            });
            await Promise.all([
                this.redis.set(`user:${userId}:resume:${id}`, JSON.stringify(resume)),
                this.redis.del(`user:${userId}:resumes`),
                this.redis.del(`user:${userId}:storage:resumes:${id}`),
                this.redis.del(`user:${userId}:storage:previews:${id}`),
            ]);
            return resume;
        }
        catch (error) {
            if (error.code === "P2025") {
                common_1.Logger.error(error);
                throw new common_1.InternalServerErrorException(error);
            }
        }
    }
    async lock(userId, id, set) {
        const resume = await this.prisma.resume.update({
            data: { locked: set },
            where: { userId_id: { userId, id } },
        });
        await Promise.all([
            this.redis.set(`user:${userId}:resume:${id}`, JSON.stringify(resume)),
            this.redis.del(`user:${userId}:resumes`),
        ]);
        return resume;
    }
    async remove(userId, id) {
        await Promise.all([
            // Remove cached keys
            this.redis.del(`user:${userId}:resumes`),
            this.redis.del(`user:${userId}:resume:${id}`),
            // Remove files in storage, and their cached keys
            this.storageService.deleteObject(userId, "resumes", id),
            this.storageService.deleteObject(userId, "previews", id),
        ]);
        return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
    }
    async printResume(resume, userId) {
        const url = await this.printerService.printResume(resume);
        // Update statistics: increment the number of downloads by 1
        if (!userId)
            await this.redis.incr(`user:${resume.userId}:resume:${resume.id}:downloads`);
        return url;
    }
    printPreview(resume) {
        return this.printerService.printPreview(resume);
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_prisma_1.PrismaService !== "undefined" && nestjs_prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof printer_service_1.PrinterService !== "undefined" && printer_service_1.PrinterService) === "function" ? _b : Object, typeof (_c = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _c : Object, typeof (_d = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _d : Object, typeof (_e = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _e : Object])
], ResumeService);


/***/ }),
/* 163 */
/***/ ((module) => {

"use strict";
module.exports = require("deepmerge");

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationModule = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const translation_controller_1 = __webpack_require__(165);
const translation_service_1 = __webpack_require__(166);
let TranslationModule = class TranslationModule {
};
exports.TranslationModule = TranslationModule;
exports.TranslationModule = TranslationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [translation_controller_1.TranslationController],
        providers: [translation_service_1.TranslationService],
    })
], TranslationModule);


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const utils_service_1 = __webpack_require__(113);
const translation_service_1 = __webpack_require__(166);
let TranslationController = class TranslationController {
    constructor(translationService, utils) {
        this.translationService = translationService;
        this.utils = utils;
    }
    async languages() {
        return this.utils.getCachedOrSet(`translation:languages`, async () => this.translationService.fetchLanguages(), 1000 * 60 * 60 * 24);
    }
};
exports.TranslationController = TranslationController;
tslib_1.__decorate([
    (0, common_1.Get)("/languages"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TranslationController.prototype, "languages", null);
exports.TranslationController = TranslationController = tslib_1.__decorate([
    (0, common_1.Controller)("translation"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof translation_service_1.TranslationService !== "undefined" && translation_service_1.TranslationService) === "function" ? _a : Object, typeof (_b = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _b : Object])
], TranslationController);


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const utils_1 = __webpack_require__(81);
let TranslationService = class TranslationService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async fetchLanguages() {
        try {
            const projectId = this.configService.getOrThrow("CROWDIN_PROJECT_ID");
            const accessToken = this.configService.getOrThrow("CROWDIN_PERSONAL_TOKEN");
            const response = await this.httpService.axiosRef.get(`https://api.crowdin.com/api/v2/projects/${projectId}/languages/progress?limit=100`, { headers: { Authorization: `Bearer ${accessToken}` } });
            const { data } = response.data;
            // Add English Locale
            data.push({
                data: {
                    language: {
                        id: "en-US",
                        locale: "en-US",
                        editorCode: "en",
                        name: "English",
                    },
                    translationProgress: 100,
                },
            });
            data.sort((a, b) => a.data.language.name.localeCompare(b.data.language.name));
            return data.map(({ data }) => {
                return {
                    id: data.language.id,
                    name: data.language.name,
                    progress: data.translationProgress,
                    editorCode: data.language.editorCode,
                    locale: data.language.locale,
                };
            });
        }
        catch (error) {
            return utils_1.languages;
        }
    }
};
exports.TranslationService = TranslationService;
exports.TranslationService = TranslationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TranslationService);


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const utils_service_1 = __webpack_require__(113);
let UtilsModule = class UtilsModule {
};
exports.UtilsModule = UtilsModule;
exports.UtilsModule = UtilsModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [utils_service_1.UtilsService],
        exports: [utils_service_1.UtilsService],
    })
], UtilsModule);


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailController = void 0;
const tslib_1 = __webpack_require__(1);
const mailer_1 = __webpack_require__(19);
const common_1 = __webpack_require__(2);
let EmailController = class EmailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async plainTextEmail(body) {
        const { name, phoneNumber, email, message } = body;
        // Define the two email addresses you want to send the mail to
        const toEmails = ['mustkeem1310hussain@gmail.com', email];
        // Format the message content
        const formattedMessage = `
            New Contact Form Submission:

            Name: ${name}
            Phone Number: ${phoneNumber}
            Email: ${email}
            Message: ${message}
        `;
        // Use the two email addresses in the to field
        await this.mailService.sendMail({
            to: toEmails,
            from: email, // Use the sender's email as the "from" address
            subject: 'New Contact Form Submission',
            text: formattedMessage,
        });
        return 'success';
    }
};
exports.EmailController = EmailController;
tslib_1.__decorate([
    (0, common_1.Post)(''),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "plainTextEmail", null);
exports.EmailController = EmailController = tslib_1.__decorate([
    (0, common_1.Controller)('email'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], EmailController);


/***/ }),
/* 169 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * compression
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Negotiator = __webpack_require__(170)
var Buffer = (__webpack_require__(175).Buffer)
var bytes = __webpack_require__(177)
var compressible = __webpack_require__(178)
var debug = __webpack_require__(181)('compression')
var onHeaders = __webpack_require__(190)
var vary = __webpack_require__(192)
var zlib = __webpack_require__(193)

/**
 * Module exports.
 */

module.exports = compression
module.exports.filter = shouldCompress

/**
 * @const
 * whether current node version has brotli support
 */
var hasBrotliSupport = 'createBrotliCompress' in zlib

/**
 * Module variables.
 * @private
 */
var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/
var SUPPORTED_ENCODING = hasBrotliSupport ? ['br', 'gzip', 'deflate', 'identity'] : ['gzip', 'deflate', 'identity']
var PREFERRED_ENCODING = hasBrotliSupport ? ['br', 'gzip'] : ['gzip']

var encodingSupported = ['gzip', 'deflate', 'identity', 'br']

/**
 * Compress response data with gzip / deflate.
 *
 * @param {Object} [options]
 * @return {Function} middleware
 * @public
 */

function compression (options) {
  var opts = options || {}
  var optsBrotli = {}

  if (hasBrotliSupport) {
    Object.assign(optsBrotli, opts.brotli)

    var brotliParams = {}
    brotliParams[zlib.constants.BROTLI_PARAM_QUALITY] = 4

    // set the default level to a reasonable value with balanced speed/ratio
    optsBrotli.params = Object.assign(brotliParams, optsBrotli.params)
  }

  // options
  var filter = opts.filter || shouldCompress
  var threshold = bytes.parse(opts.threshold)
  var enforceEncoding = opts.enforceEncoding || 'identity'

  if (threshold == null) {
    threshold = 1024
  }

  return function compression (req, res, next) {
    var ended = false
    var length
    var listeners = []
    var stream

    var _end = res.end
    var _on = res.on
    var _write = res.write

    // flush
    res.flush = function flush () {
      if (stream) {
        stream.flush()
      }
    }

    // proxy

    res.write = function write (chunk, encoding) {
      if (ended) {
        return false
      }

      if (!headersSent(res)) {
        this.writeHead(this.statusCode)
      }

      return stream
        ? stream.write(toBuffer(chunk, encoding))
        : _write.call(this, chunk, encoding)
    }

    res.end = function end (chunk, encoding) {
      if (ended) {
        return false
      }

      if (!headersSent(res)) {
        // estimate the length
        if (!this.getHeader('Content-Length')) {
          length = chunkLength(chunk, encoding)
        }

        this.writeHead(this.statusCode)
      }

      if (!stream) {
        return _end.call(this, chunk, encoding)
      }

      // mark ended
      ended = true

      // write Buffer for Node.js 0.8
      return chunk
        ? stream.end(toBuffer(chunk, encoding))
        : stream.end()
    }

    res.on = function on (type, listener) {
      if (!listeners || type !== 'drain') {
        return _on.call(this, type, listener)
      }

      if (stream) {
        return stream.on(type, listener)
      }

      // buffer listeners for future stream
      listeners.push([type, listener])

      return this
    }

    function nocompress (msg) {
      debug('no compression: %s', msg)
      addListeners(res, _on, listeners)
      listeners = null
    }

    onHeaders(res, function onResponseHeaders () {
      // determine if request is filtered
      if (!filter(req, res)) {
        nocompress('filtered')
        return
      }

      // determine if the entity should be transformed
      if (!shouldTransform(req, res)) {
        nocompress('no transform')
        return
      }

      // vary
      vary(res, 'Accept-Encoding')

      // content-length below threshold
      if (Number(res.getHeader('Content-Length')) < threshold || length < threshold) {
        nocompress('size below threshold')
        return
      }

      var encoding = res.getHeader('Content-Encoding') || 'identity'

      // already encoded
      if (encoding !== 'identity') {
        nocompress('already encoded')
        return
      }

      // head
      if (req.method === 'HEAD') {
        nocompress('HEAD request')
        return
      }

      // compression method
      var negotiator = new Negotiator(req)
      var method = negotiator.encoding(SUPPORTED_ENCODING, PREFERRED_ENCODING)

      // if no method is found, use the default encoding
      if (!req.headers['accept-encoding'] && encodingSupported.indexOf(enforceEncoding) !== -1) {
        method = enforceEncoding
      }

      // negotiation failed
      if (!method || method === 'identity') {
        nocompress('not acceptable')
        return
      }

      // compression stream
      debug('%s compression', method)
      stream = method === 'gzip'
        ? zlib.createGzip(opts)
        : method === 'br'
          ? zlib.createBrotliCompress(optsBrotli)
          : zlib.createDeflate(opts)

      // add buffered listeners to stream
      addListeners(stream, stream.on, listeners)

      // header fields
      res.setHeader('Content-Encoding', method)
      res.removeHeader('Content-Length')

      // compression
      stream.on('data', function onStreamData (chunk) {
        if (_write.call(res, chunk) === false) {
          stream.pause()
        }
      })

      stream.on('end', function onStreamEnd () {
        _end.call(res)
      })

      _on.call(res, 'drain', function onResponseDrain () {
        stream.resume()
      })
    })

    next()
  }
}

/**
 * Add bufferred listeners to stream
 * @private
 */

function addListeners (stream, on, listeners) {
  for (var i = 0; i < listeners.length; i++) {
    on.apply(stream, listeners[i])
  }
}

/**
 * Get the length of a given chunk
 */

function chunkLength (chunk, encoding) {
  if (!chunk) {
    return 0
  }

  return Buffer.isBuffer(chunk)
    ? chunk.length
    : Buffer.byteLength(chunk, encoding)
}

/**
 * Default filter function.
 * @private
 */

function shouldCompress (req, res) {
  var type = res.getHeader('Content-Type')

  if (type === undefined || !compressible(type)) {
    debug('%s not compressible', type)
    return false
  }

  return true
}

/**
 * Determine if the entity should be transformed.
 * @private
 */

function shouldTransform (req, res) {
  var cacheControl = res.getHeader('Cache-Control')

  // Don't compress for Cache-Control: no-transform
  // https://tools.ietf.org/html/rfc7234#section-5.2.2.4
  return !cacheControl ||
    !cacheControlNoTransformRegExp.test(cacheControl)
}

/**
 * Coerce arguments to Buffer
 * @private
 */

function toBuffer (chunk, encoding) {
  return Buffer.isBuffer(chunk)
    ? chunk
    : Buffer.from(chunk, encoding)
}

/**
 * Determine if the response headers have been sent.
 *
 * @param {object} res
 * @returns {boolean}
 * @private
 */

function headersSent (res) {
  return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent
}


/***/ }),
/* 170 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



var preferredCharsets = __webpack_require__(171)
var preferredEncodings = __webpack_require__(172)
var preferredLanguages = __webpack_require__(173)
var preferredMediaTypes = __webpack_require__(174)

/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;

/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available) {
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available, preferred) {
  var set = this.encodings(available, preferred);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available, preferred) {
  return preferredEncodings(this.request.headers['accept-encoding'], available, preferred);
};

Negotiator.prototype.language = function language(available) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available) {
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  return preferredMediaTypes(this.request.headers.accept, available);
};

// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;


/***/ }),
/* 171 */
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;

/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */

function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match) return null;

  var charset = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';')
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a charset.
 * @private
 */

function getCharsetPriority(charset, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the charset.
 * @private
 */

function specify(charset, spec, index) {
  var s = 0;
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1;
  } else if (spec.charset !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */

function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getCharsetPriority(type, accepts, index);
  });

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full charset string.
 * @private
 */

function getFullCharset(spec) {
  return spec.charset;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 172 */
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;

/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(',');
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */

function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';');
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}

/**
 * Get the priority of an encoding.
 * @private
 */

function getEncodingPriority(encoding, accepted, index) {
  var priority = {encoding: encoding, o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 * @private
 */

function specify(encoding, spec, index) {
  var s = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== '*' ) {
    return null
  }

  return {
    encoding: encoding,
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept, provided, preferred) {
  var accepts = parseAcceptEncoding(accept || '');

  var comparator = preferred ? function comparator (a, b) {
    if (a.q !== b.q) {
      return b.q - a.q // higher quality first
    }

    var aPreferred = preferred.indexOf(a.encoding)
    var bPreferred = preferred.indexOf(b.encoding)

    if (aPreferred === -1 && bPreferred === -1) {
      // consider the original specifity/order
      return (b.s - a.s) || (a.o - b.o) || (a.i - b.i)
    }

    if (aPreferred !== -1 && bPreferred !== -1) {
      return aPreferred - bPreferred // consider the preferred order
    }

    return aPreferred === -1 ? 1 : -1 // preferred first
  } : compareSpecs;

  if (!provided) {
    // sorted list of all encodings
    return accepts
      .filter(isQuality)
      .sort(comparator)
      .map(getFullEncoding);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getEncodingPriority(type, accepts, index);
  });

  // sorted list of accepted encodings
  return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i);
}

/**
 * Get full encoding string.
 * @private
 */

function getFullEncoding(spec) {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 173 */
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;

/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var language = parseLanguage(accepts[i].trim(), i);

    if (language) {
      accepts[j++] = language;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a language from the Accept-Language header.
 * @private
 */

function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  var prefix = match[1]
  var suffix = match[2]
  var full = prefix

  if (suffix) full += "-" + suffix;

  var q = 1;
  if (match[3]) {
    var params = match[3].split(';')
    for (var j = 0; j < params.length; j++) {
      var p = params[j].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}

/**
 * Get the priority of a language.
 * @private
 */

function getLanguagePriority(language, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the language.
 * @private
 */

function specify(language, spec, index) {
  var p = parseLanguage(language)
  if (!p) return null;
  var s = 0;
  if(spec.full.toLowerCase() === p.full.toLowerCase()){
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept, provided) {
  // RFC 2616 sec 14.4: no header = *
  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullLanguage);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getLanguagePriority(type, accepts, index);
  });

  // sorted list of accepted languages
  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full language string.
 * @private
 */

function getFullLanguage(spec) {
  return spec.full;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 174 */
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;

/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept) {
  var accepts = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a media type from the Accept header.
 * @private
 */

function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;

  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];

  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1];

      // get the value, unwrapping quotes
      var value = val && val[0] === '"' && val[val.length - 1] === '"'
        ? val.slice(1, -1)
        : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      }

      // store parameter
      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a media type.
 * @private
 */

function getMediaTypePriority(type, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the media type.
 * @private
 */

function specify(type, spec, index) {
  var p = parseMediaType(type);
  var s = 0;

  if (!p) {
    return null;
  }

  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4
  } else if(spec.type != '*') {
    return null;
  }

  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2
  } else if(spec.subtype != '*') {
    return null;
  }

  var keys = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function (k) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1
    } else {
      return null
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  }
}

/**
 * Get the preferred media types from an Accept header.
 * @public
 */

function preferredMediaTypes(accept, provided) {
  // RFC 2616 sec 14.2: no header = */*
  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullType);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getMediaTypePriority(type, accepts, index);
  });

  // sorted list of accepted types
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full type string.
 * @private
 */

function getFullType(spec) {
  return spec.type + '/' + spec.subtype;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

/**
 * Count the number of quotes in a string.
 * @private
 */

function quoteCount(string) {
  var count = 0;
  var index = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

/**
 * Split a key value pair.
 * @private
 */

function splitKeyValuePair(str) {
  var index = str.indexOf('=');
  var key;
  var val;

  if (index === -1) {
    key = str;
  } else {
    key = str.slice(0, index);
    val = str.slice(index + 1);
  }

  return [key, val];
}

/**
 * Split an Accept header into media types.
 * @private
 */

function splitMediaTypes(accept) {
  var accepts = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  }

  // trim accepts
  accepts.length = j + 1;

  return accepts;
}

/**
 * Split a string of parameters.
 * @private
 */

function splitParameters(str) {
  var parameters = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  }

  // trim parameters
  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}


/***/ }),
/* 175 */
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(176)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 176 */
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),
/* 177 */
/***/ ((module) => {

"use strict";
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = bytes;
module.exports.format = format;
module.exports.parse = parse;

/**
 * Module variables.
 * @private
 */

var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;

var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;

var map = {
  b:  1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5),
};

var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;

/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  if (typeof value === 'string') {
    return parse(value);
  }

  if (typeof value === 'number') {
    return format(value, options);
  }

  return null;
}

/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */

function format(value, options) {
  if (!Number.isFinite(value)) {
    return null;
  }

  var mag = Math.abs(value);
  var thousandsSeparator = (options && options.thousandsSeparator) || '';
  var unitSeparator = (options && options.unitSeparator) || '';
  var decimalPlaces = (options && options.decimalPlaces !== undefined) ? options.decimalPlaces : 2;
  var fixedDecimals = Boolean(options && options.fixedDecimals);
  var unit = (options && options.unit) || '';

  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.pb) {
      unit = 'PB';
    } else if (mag >= map.tb) {
      unit = 'TB';
    } else if (mag >= map.gb) {
      unit = 'GB';
    } else if (mag >= map.mb) {
      unit = 'MB';
    } else if (mag >= map.kb) {
      unit = 'KB';
    } else {
      unit = 'B';
    }
  }

  var val = value / map[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }

  if (thousandsSeparator) {
    str = str.split('.').map(function (s, i) {
      return i === 0
        ? s.replace(formatThousandsRegExp, thousandsSeparator)
        : s
    }).join('.');
  }

  return str + unitSeparator + unit;
}

/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {number|null}
 * @public
 */

function parse(val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }

  if (typeof val !== 'string') {
    return null;
  }

  // Test if the string passed is valid
  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = 'b';

  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(val, 10);
    unit = 'b'
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }

  if (isNaN(floatValue)) {
    return null;
  }

  return Math.floor(map[unit] * floatValue);
}


/***/ }),
/* 178 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * compressible
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Jeremiah Senkpiel
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __webpack_require__(179)

/**
 * Module variables.
 * @private
 */

var COMPRESSIBLE_TYPE_REGEXP = /^text\/|\+(?:json|text|xml)$/i
var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/

/**
 * Module exports.
 * @public
 */

module.exports = compressible

/**
 * Checks if a type is compressible.
 *
 * @param {string} type
 * @return {Boolean} compressible
 * @public
 */

function compressible (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // strip parameters
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && match[1].toLowerCase()
  var data = db[mime]

  // return database information
  if (data && data.compressible !== undefined) {
    return data.compressible
  }

  // fallback to regexp or unknown
  return COMPRESSIBLE_TYPE_REGEXP.test(mime) || undefined
}


/***/ }),
/* 179 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__(180)


/***/ }),
/* 180 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ }),
/* 181 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(182);
} else {
  module.exports = __webpack_require__(185);
}


/***/ }),
/* 182 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(183);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 183 */
/***/ ((module, exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(184);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 184 */
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 185 */
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(186);
var util = __webpack_require__(187);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(183);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(188);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(189);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 186 */
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),
/* 187 */
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),
/* 188 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 189 */
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),
/* 190 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * on-headers
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = onHeaders

var http = __webpack_require__(191)

// older node versions don't have appendHeader
var isAppendHeaderSupported = typeof http.ServerResponse.prototype.appendHeader === 'function'
var set1dArray = isAppendHeaderSupported ? set1dArrayWithAppend : set1dArrayWithSet

/**
 * Create a replacement writeHead method.
 *
 * @param {function} prevWriteHead
 * @param {function} listener
 * @private
 */

function createWriteHead (prevWriteHead, listener) {
  var fired = false

  // return function with core name and argument list
  return function writeHead (statusCode) {
    // set headers from arguments
    var args = setWriteHeadHeaders.apply(this, arguments)

    // fire listener
    if (!fired) {
      fired = true
      listener.call(this)

      // pass-along an updated status code
      if (typeof args[0] === 'number' && this.statusCode !== args[0]) {
        args[0] = this.statusCode
        args.length = 1
      }
    }

    return prevWriteHead.apply(this, args)
  }
}

/**
 * Execute a listener when a response is about to write headers.
 *
 * @param {object} res
 * @return {function} listener
 * @public
 */

function onHeaders (res, listener) {
  if (!res) {
    throw new TypeError('argument res is required')
  }

  if (typeof listener !== 'function') {
    throw new TypeError('argument listener must be a function')
  }

  res.writeHead = createWriteHead(res.writeHead, listener)
}

/**
 * Set headers contained in array on the response object.
 *
 * @param {object} res
 * @param {array} headers
 * @private
 */

function setHeadersFromArray (res, headers) {
  if (headers.length && Array.isArray(headers[0])) {
    // 2D
    set2dArray(res, headers)
  } else {
    // 1D
    if (headers.length % 2 !== 0) {
      throw new TypeError('headers array is malformed')
    }

    set1dArray(res, headers)
  }
}

/**
 * Set headers contained in object on the response object.
 *
 * @param {object} res
 * @param {object} headers
 * @private
 */

function setHeadersFromObject (res, headers) {
  var keys = Object.keys(headers)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    if (k) res.setHeader(k, headers[k])
  }
}

/**
 * Set headers and other properties on the response object.
 *
 * @param {number} statusCode
 * @private
 */

function setWriteHeadHeaders (statusCode) {
  var length = arguments.length
  var headerIndex = length > 1 && typeof arguments[1] === 'string'
    ? 2
    : 1

  var headers = length >= headerIndex + 1
    ? arguments[headerIndex]
    : undefined

  this.statusCode = statusCode

  if (Array.isArray(headers)) {
    // handle array case
    setHeadersFromArray(this, headers)
  } else if (headers) {
    // handle object case
    setHeadersFromObject(this, headers)
  }

  // copy leading arguments
  var args = new Array(Math.min(length, headerIndex))
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i]
  }

  return args
}

function set2dArray (res, headers) {
  var key
  for (var i = 0; i < headers.length; i++) {
    key = headers[i][0]
    if (key) {
      res.setHeader(key, headers[i][1])
    }
  }
}

function set1dArrayWithAppend (res, headers) {
  for (var i = 0; i < headers.length; i += 2) {
    res.removeHeader(headers[i])
  }

  var key
  for (var j = 0; j < headers.length; j += 2) {
    key = headers[j]
    if (key) {
      res.appendHeader(key, headers[j + 1])
    }
  }
}

function set1dArrayWithSet (res, headers) {
  var key
  for (var i = 0; i < headers.length; i += 2) {
    key = headers[i]
    if (key) {
      res.setHeader(key, headers[i + 1])
    }
  }
}


/***/ }),
/* 191 */
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),
/* 192 */
/***/ ((module) => {

"use strict";
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = vary
module.exports.append = append

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */

function append (header, field) {
  if (typeof header !== 'string') {
    throw new TypeError('header argument is required')
  }

  if (!field) {
    throw new TypeError('field argument is required')
  }

  // get fields array
  var fields = !Array.isArray(field)
    ? parse(String(field))
    : field

  // assert on invalid field names
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError('field argument contains an invalid header name')
    }
  }

  // existing, unspecified vary
  if (header === '*') {
    return header
  }

  // enumerate current values
  var val = header
  var vals = parse(header.toLowerCase())

  // unspecified vary
  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
    return '*'
  }

  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase()

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld)
      val = val
        ? val + ', ' + fields[i]
        : fields[i]
    }
  }

  return val
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */

function parse (header) {
  var end = 0
  var list = []
  var start = 0

  // gather tokens
  for (var i = 0, len = header.length; i < len; i++) {
    switch (header.charCodeAt(i)) {
      case 0x20: /*   */
        if (start === end) {
          start = end = i + 1
        }
        break
      case 0x2c: /* , */
        list.push(header.substring(start, end))
        start = end = i + 1
        break
      default:
        end = i + 1
        break
    }
  }

  // final token
  list.push(header.substring(start, end))

  return list
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */

function vary (res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError('res argument is required')
  }

  // get existing header
  var val = res.getHeader('Vary') || ''
  var header = Array.isArray(val)
    ? val.join(', ')
    : String(val)

  // set new header
  if ((val = append(header, field))) {
    res.setHeader('Vary', val)
  }
}


/***/ }),
/* 193 */
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const core_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const Sentry = tslib_1.__importStar(__webpack_require__(6));
const compression_1 = tslib_1.__importDefault(__webpack_require__(169));
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__(7));
const helmet_1 = tslib_1.__importDefault(__webpack_require__(8));
const nestjs_prisma_1 = __webpack_require__(9);
const nestjs_zod_1 = __webpack_require__(10);
const app_module_1 = __webpack_require__(11);
(0, nestjs_zod_1.patchNestJsSwagger)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
    });
    const configService = app.get((config_1.ConfigService));
    const prisma = app.get(nestjs_prisma_1.PrismaService);
    // Sentry
    // Error Reporting and Performance Monitoring
    const sentryDsn = configService.get("VITE_SENTRY_DSN");
    if (sentryDsn) {
        const express = app.getHttpAdapter().getInstance();
        Sentry.init({
            dsn: sentryDsn,
            tracesSampleRate: 1.0,
            profilesSampleRate: 1.0,
            integrations: [
                new Sentry.Integrations.Http({ tracing: true }),
                new Sentry.Integrations.Express({ app: express }),
                new Sentry.Integrations.Prisma({ client: prisma }),
                ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
            ],
        });
    }
    // Compression - Enable gzip compression for faster response times
    if (process.env.NODE_ENV === "production") {
        app.use((0, compression_1.default)({
            level: 6, // Compression level (1-9, 6 is a good balance)
            filter: (req, res) => {
                // Compress all responses except if explicitly disabled
                if (req.headers["x-no-compression"]) {
                    return false;
                }
                return compression_1.default.filter(req, res);
            },
        }));
    }
    // Cookie Parser
    app.use((0, cookie_parser_1.default)());
    // CORS
    app.enableCors({
        credentials: true,
        origin: process.env.NODE_ENV === "production",
    });
    // Helmet - enabled only in production
    if (process.env.NODE_ENV === "production") {
        app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    }
    // Global Prefix
    const globalPrefix = "api";
    app.setGlobalPrefix(globalPrefix);
    // Enable Shutdown Hooks
    app.enableShutdownHooks();
    // Swagger (OpenAPI Docs)
    // This can be accessed by visiting {SERVER_URL}/api/docs
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Reactive Resume")
        .setDescription("Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3.")
        .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
        .setVersion("4.0.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("docs", app, document);
    // Port
    const port = configService.get("PORT") || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Server is up and running on port ${port}`, "Bootstrap");
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;