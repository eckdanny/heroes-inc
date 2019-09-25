import 'dotenv/config';
import { Pool } from 'pg';

const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => console.log('connected to mqtt'));

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

pool.connect((err, client) => {
  if (err) console.log(err);
  console.log('connected to db');
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
        FOR ROW EXECUTE PROCEDURE notify_trigger();
        `
    )
    .then(() => console.log('created trigger'))
    .then(() => {
      client.on('notification', msg => {
        let parsed;
        try {
          parsed = JSON.parse(msg.payload);
          const description: string = parsed.description;
          if (description.includes('#vip')) {
            console.log(` => #vip message: ${msg.payload}`);
            mqttClient.publish('VIP', msg.payload, {
              qos: 0,
              retain: false
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
      client.query(`LISTEN watch_incidents`);
    });
});
