import {Mail} from '../utils/mail';
export default (() : Mail => {
  return new Mail(
    process.env.MAIL_HOSTNAME,
    process.env.MAIL_PORT,
    process.env.MAIL_SECURE,
    process.env.MAIL_REQUIRE_TLS,
    process.env.MAIL_USER,
    process.env.MAIL_PASS,
    process.env.MAIL_TLS_CIPHERS,
  );
});