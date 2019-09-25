import React, { useContext, useEffect } from 'react';
import { Context } from './core/MqttClient';

const TOPIC = 'VIP';

export const Notifier: React.FC = () => {
  const client = useContext(Context);
  useEffect(() => {
    client.on('connect', () => {
      console.log('mqtt client connected');
      client.subscribe(TOPIC, err => {
        if (err) console.log(err);
        console.log('mqtt subscribed to VIP msgs');
      });
    });

    client.on('message', (_, payload: Buffer) => {
      console.log(JSON.parse(payload.toString()));
    });

    return () => client.subscribe(TOPIC);
  });
  return null;
};
