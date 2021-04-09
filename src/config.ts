const mongodbUser = process.env.WISHLIST_APP_DB_USER;
const mongodbPassword = process.env.WISHLIST_APP_DB_PASS;
const mongodbUlr = process.env.WISHLIST_APP_DB_URL;
const mongodbProtocol = process.env.WISHLIST_APP_DB_PROTOCOL;
const passwordSecret = process.env.WISHLIST_APP_PASS_SECRET;

export default {
    secret: passwordSecret,
    mongodb_url: `${mongodbProtocol}://${mongodbUser}:${mongodbPassword}@${mongodbUlr}/wishlist`,
    token_expiration: 86400
};