import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

pool.connect((err, client) => {
  if (err) console.log(err);
  client
    .query(
      `
      CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
      DECLARE
      BEGIN
        PERFORM pg_notify('watch_incidents', row_to_json(NEW)::text);
        RETURN new;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS watch_incidents_trigger ON incident;

      CREATE TRIGGER watch_incidents_trigger AFTER INSERT ON incident
      FOR EACH ROW EXECUTE PROCEDURE notify_trigger();
      `
    )
    .then(() => {
      client.on('notification', msg => {
        let parsed;
        try {
          parsed = JSON.parse(msg.payload);
          const description: string = parsed.description;
          if (description.includes('#vip')) {
            console.log('A VERY IMPORTANT INCIDENT ARRIVED', msg.payload);
          }
        } catch (err) {
          console.log(err);
        }
      });
      client.query(`LISTEN watch_incidents`);
    });
});
