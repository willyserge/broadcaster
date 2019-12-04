export default {
  CREATE_TABLE: `
  CREATE TABLE IF NOT EXISTS users (
    id  SERIAL PRIMARY KEY,
    firstname  VARCHAR(255) NOT NULL,
    lastname  VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email  VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber  VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    isAdmin  BOOLEAN NOT NULL,
    registered  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
 );`,
};
