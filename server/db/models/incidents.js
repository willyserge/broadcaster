export default {
  CREATE_TABLE: `
  CREATE TABLE IF NOT EXISTS incidents (
    id  SERIAL PRIMARY KEY,
    createdBy INT NOT NULL,
    title VARCHAR(20) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    type VARCHAR(255) DEFAULT 'draft' NOT NULL,
    location VARCHAR(255) NOT NULL,
    images VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    createdOn TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            --relationship-- 
   FOREIGN KEY( createdBy ) REFERENCES users( id ) ON DELETE CASCADE
 );`,
};
