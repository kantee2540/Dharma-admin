import crypto from 'crypto'

const baseURL = "http://localhost:8080/admin";
const baseResource = "http://localhost:8080/file"
const clientId = "dharma51848406";
const clientSecret = crypto.randomBytes(10).toString('hex');

export { baseURL, baseResource, clientId, clientSecret }