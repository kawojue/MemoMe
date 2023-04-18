export const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.JWT_SECRET as string,
    baseURL: 'http://localhost:1707',
    clientID: process.env.AUTH_CLIENT_ID as string,
    issuerBaseURL: 'https://dev-r80r0y5b5nhd8ca2.us.auth0.com'
}