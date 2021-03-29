const mongodbUser = process.env.WISHLIST_APP_DB_USER;
const mongodbPassword = process.env.WISHLIST_APP_DB_PASS;
const mongodbUlr = process.env.WISHLIST_APP_DB_URL;
const mongodbProtocol = process.env.WISHLIST_APP_DB_PROTOCOL;
const password_secret = process.env.WISHLIST_APP_PASS_SECRET;

export default {
    secret: password_secret,
    mongodb_url: `${mongodbProtocol}://${mongodbUser}:${mongodbPassword}@${mongodbUlr}/wishlist`,
    token_expiration: 86400
};