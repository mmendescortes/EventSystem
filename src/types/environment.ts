declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PROTOCOL : string;
            APP_HOST : string;
            APP_PORT : number;
            API_VERSION : string;
            MONGODB_CONNECTION_STRING : string;
            SALT_WORK_FACTOR : number;
            MAIL_HOSTNAME : string;
            MAIL_USER : string;
            MAIL_PASS : string;
            MAIL_PORT : number;
            MAIL_REQUIRE_TLS : boolean;
            MAIL_SECURE : boolean;
            USER_JWT_SECRET : string;
            MAIL_TLS_CIPHERS : string;
        }
    }
}
  
export {};  