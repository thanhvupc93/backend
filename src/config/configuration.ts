export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: '123456',
    DATABASE: process.env.DB_DATABASE_NAME,
    TYPE: process.env.DB_TYPE,
  },
});
