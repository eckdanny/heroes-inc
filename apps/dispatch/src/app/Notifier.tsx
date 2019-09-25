import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from './core/MqttClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOPIC = 'VIP';

export const Notifier: React.FC = withRouter(({ history }) => {
  const client = useContext(Context);
  useEffect(() => {
    client.on('connect', () => {
      console.log('mqtt client connected');
      client.subscribe(
        TOPIC,
        {
          qos: 0
        },
        err => {
          if (err) console.log(err);
          console.log('mqtt subscribed to VIP msgs');
        }
      );
    });

    client.on('message', (_, payload: Buffer) => {
      const msg = JSON.parse(payload.toString());
      console.log(msg);
      toast.warn(msg.name, {
        toastId: msg.id,
        position: toast.POSITION.BOTTOM_RIGHT,
        closeOnClick: false,
        onClick: () => history.push(`/intake/${msg.id}`)
      });
    });

    return () => client.subscribe(TOPIC);
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
});
