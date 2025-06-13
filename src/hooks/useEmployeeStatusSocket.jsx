import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client';

export default function useEmployeeStatusSocket(onStatusUpdate) {
     const clientRef = useRef(null);

     useEffect(() => {
          const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`); 
          const stompClient = new Client({
               webSocketFactory: () => socket,
               reconnectDelay: 5000,
               onConnect: () => {
                    stompClient.subscribe("/topic/status", (message) => {
                         const updates = JSON.parse(message.body);
                         onStatusUpdate(updates);
                    });
               },
          });

          stompClient.activate();
          clientRef.current = stompClient;

          return () => stompClient.deactivate();
     }, [onStatusUpdate]);

     return clientRef;
}