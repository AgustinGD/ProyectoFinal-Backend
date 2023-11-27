const SERVER_PORT = '9090';
const MONGO_URL = `mongodb://127.0.0.1:27017/omnitrics`;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
