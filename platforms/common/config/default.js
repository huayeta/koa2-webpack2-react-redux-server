import path from 'path';

const rootPath = path.join(__dirname, '../../..');
export default {
    rootPath,
    publicPath: '/public',
    staticPath: '/public/static',
    port: 3000,
    db: {
        dialect: 'sqlite',
        username: '',
        password: '',
        database: 'main',
        storage: 'path/to/db.sqlite'
    }
}
