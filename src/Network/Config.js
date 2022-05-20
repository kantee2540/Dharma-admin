import crypto from 'crypto'

// const baseURL = "http://api.xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com:8080/admin";
//const baseResource = "http://api.xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com/sound_resource"
const baseURL = "http://localhost:8080/admin"
const baseResource = "http://localhost:8080/file"
const clientId = "dharma51848406";
const clientSecret = crypto.randomBytes(10).toString('hex');

export { baseURL, baseResource, clientId, clientSecret }