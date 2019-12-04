import users from './users';
import incidents from './incidents';

export default async (client) => {
  try {
    await client.query(users.CREATE_TABLE);
    await client.query(incidents.CREATE_TABLE);
    console.log(`
    ----------------------
    | created tables      |
    ----------------------`);
  } catch (error) {
    console.log(error);
  }
};
