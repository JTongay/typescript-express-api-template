const DB_CONFIG  = {
  development: {
    uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME_DEV}`
  },
  test: {
    uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME_TEST}`
  },
  production: {},
  ci: {
    uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME_CI}`
  }
};
export default DB_CONFIG;
