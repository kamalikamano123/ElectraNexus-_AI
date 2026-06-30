import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Truck, Phone, Send, AlertTriangle, ShieldAlert, CheckCircle2, Crosshair } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createSensorIcon = () => {
  return new L.divIcon({
    className: 'bg-transparent border-0 flex items-center justify-center',
    html: `<div class="relative w-8 h-8 flex items-center justify-center" style="filter: drop-shadow(0 0 6px rgba(248,113,113,0.8))">
             <svg viewBox="0 0 24 24" fill="none" class="w-8 h-8 stroke-current text-red-500 animate-pulse" stroke-width="2">
               <line x1="12" y1="2" x2="12" y2="22" />
               <line x1="8" y1="6" x2="16" y2="6" stroke-width="3" />
               <line x1="6" y1="10" x2="18" y2="10" stroke-width="3" />
               <circle cx="12" cy="12" r="4" fill="currentColor" class="opacity-80" />
             </svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const createCrewIcon = () => {
  return new L.divIcon({
    className: 'bg-transparent border-0',
    html: `<div class="relative w-10 h-10 flex flex-col items-center justify-center bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.9)] text-white z-[9999]">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const RED_POLES = [
  { id: 101, lat: 10.8490, lng: 76.2620, name: "Transmission Pole - Sector 014", voltage: "0.4 kV", crew: "Rakesh K.", phone: "+91 94470 12345", distance: "2.4 km" },
  { id: 102, lat: 10.8520, lng: 76.2750, name: "Transmission Pole - Sector 029", voltage: "1.2 kV", crew: "Suresh P.", phone: "+91 94470 54321", distance: "4.1 km" },
  { id: 103, lat: 10.8540, lng: 76.2880, name: "Transmission Pole - Sector 042", voltage: "0.0 kV", crew: "Arun M.", phone: "+91 98460 98765", distance: "1.2 km" }
];

export default function Dispatch() {
  const [selectedAlert, setSelectedAlert] = useState(RED_POLES[0]);
  const [crewPos, setCrewPos] = useState(null);
  const [isDispatched, setIsDispatched] = useState(false);
  const [messages, setMessages] = useState([]);
  
  // Setup initial crew position when alert is selected
  useEffect(() => {
    if (selectedAlert) {
      setIsDispatched(false);
      setMessages([{ text: "System ready. Select 'Send Message' to dispatch crew to this pole.", time: new Date().toLocaleTimeString(), type: 'system' }]);
      const offsetLat = (Math.random() > 0.5 ? 1 : -1) * 0.015;
      const offsetLng = (Math.random() > 0.5 ? 1 : -1) * 0.015;
      setCrewPos([selectedAlert.lat + offsetLat, selectedAlert.lng + offsetLng]);
    }
  }, [selectedAlert]);

  // Tracking animation
  useEffect(() => {
    let interval;
    if (isDispatched && selectedAlert) {
      interval = setInterval(() => {
        setCrewPos(prev => {
          if (!prev) return prev;
          const tLat = selectedAlert.lat;
          const tLng = selectedAlert.lng;
          
          const dLat = tLat - prev[0];
          const dLng = tLng - prev[1];
          const dist = Math.sqrt(dLat*dLat + dLng*dLng);
          
          if (dist < 0.0005) {
            clearInterval(interval);
            setMessages(m => [...m, { text: `${selectedAlert.crew}: Arrived at location. Beginning fault isolation.`, time: new Date().toLocaleTimeString(), type: 'in' }]);
            return [tLat, tLng];
          }
          
          const stepSize = 0.0004;
          return [
            prev[0] + (dLat / dist) * stepSize,
            prev[1] + (dLng / dist) * stepSize
          ];
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDispatched, selectedAlert]);

  const handleSendMessage = () => {
    if (!selectedAlert || isDispatched) return;
    setMessages(prev => [
      ...prev, 
      { text: `System: Urgent. Please report to ${selectedAlert.name}. Fault detected.`, time: new Date().toLocaleTimeString(), type: 'out' }
    ]);
    setTimeout(() => {
       setMessages(prev => [
         ...prev, 
         { text: `${selectedAlert.crew}: Received. En route to location now.`, time: new Date().toLocaleTimeString(), type: 'in' }
       ]);
       setIsDispatched(true);
    }, 1500);
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 pt-4 pb-12 animate-in fade-in duration-500" style={{ minHeight: 'calc(100vh - 8rem)' }}>
      {/* Left Sidebar - Alerts & Chat */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="glass-panel p-5 rounded-xl border border-surface-700">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="text-red-500" />
            <h2 className="text-xl font-bold text-white">Critical Alerts</h2>
          </div>
          <div className="flex flex-col gap-3">
            {RED_POLES.map(pole => (
              <button 
                key={pole.id}
                onClick={() => setSelectedAlert(pole)}
                className={`flex flex-col gap-1 p-3 rounded-lg border text-left transition-all ${
                  selectedAlert?.id === pole.id 
                    ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.15)]' 
                    : 'bg-surface-800/50 border-surface-700 hover:border-surface-600'
                }`}
              >
                <div className="font-bold text-white text-sm">{pole.name}</div>
                <div className="flex justify-between items-center text-xs text-surface-400 mt-1">
                  <span>Assigned: <strong className="text-surface-300">{pole.crew}</strong></span>
                  <span className="text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">0.0 kV Fault</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messaging & Dispatch */}
        {selectedAlert && (
          <div className="glass-panel p-5 rounded-xl border border-surface-700 flex-1 flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-surface-700 mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-surface-800 p-2 rounded-full border border-surface-600">
                  <Truck size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{selectedAlert.crew}</div>
                  <div className="text-xs text-surface-400 flex items-center gap-1"><Phone size={10} /> {selectedAlert.phone}</div>
                </div>
              </div>
              <div className="text-xs font-mono font-medium text-surface-300 bg-surface-800 px-2 py-1 rounded">
                Est: {selectedAlert.distance}
              </div>
            </div>
            
            <div className="flex-1 min-h-[150px] max-h-[250px] overflow-y-auto mb-4 flex flex-col gap-2 p-2">
              {messages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                  msg.type === 'system' ? 'bg-surface-800 text-surface-400 self-center text-center italic w-full' :
                  msg.type === 'out' ? 'bg-blue-600 text-white self-end rounded-br-none' :
                  'bg-surface-700 text-surface-50 self-start rounded-bl-none border border-surface-600'
                }`}>
                  <div className="mb-1">{msg.text}</div>
                  <div className={`text-[9px] opacity-70 ${msg.type === 'out' ? 'text-blue-200 text-right' : 'text-surface-400 text-right'}`}>{msg.time}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSendMessage}
              disabled={isDispatched}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-sm transition-all ${
                isDispatched 
                  ? 'bg-surface-800 text-surface-500 cursor-not-allowed border border-surface-700' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              {isDispatched ? <><CheckCircle2 size={16} /> Crew En Route</> : <><Send size={16} /> Dispatch & Track Crew</>}
            </button>
          </div>
        )}
      </div>

      {/* Right Map */}
      <div className="glass-panel p-2 rounded-xl border border-surface-700 w-full lg:w-2/3 relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="bg-surface-800/50 p-3 rounded-t-lg border-b border-surface-700/50 flex items-center justify-between z-10">
          <span className="text-sm font-mono text-surface-400 flex items-center gap-2">
            <Crosshair size={14} className="text-blue-500" />
            Live Crew Telemetry
          </span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] text-surface-400 uppercase tracking-widest font-bold">Tracking Active</span>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-surface-900 rounded-b-lg relative z-0">
          {selectedAlert && crewPos ? (
            <MapContainer 
               key={`${selectedAlert.id}-${isDispatched ? 'track' : 'init'}`}
               bounds={[ [selectedAlert.lat, selectedAlert.lng], [crewPos[0], crewPos[1]] ]}
               boundsOptions={{ padding: [50, 50] }}
               className="w-full h-full rounded-b-lg absolute inset-0 z-0 leaflet-container-dark"
               zoomControl={false}
             >
               <TileLayer
                 url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
               />
               
               <Marker position={[selectedAlert.lat, selectedAlert.lng]} icon={createSensorIcon()}>
                 <Popup className="dark-popup">
                   <div className="font-bold text-white p-1">{selectedAlert.name}</div>
                   <div className="text-xs text-red-400 p-1 font-mono uppercase font-bold tracking-widest">AFFECTED POLE</div>
                 </Popup>
               </Marker>
               
               <Marker position={crewPos} icon={createCrewIcon()}>
                 <Popup className="dark-popup">
                   <div className="font-bold text-white p-1">{selectedAlert.crew}'s Crew</div>
                   <div className="text-xs text-blue-400 p-1">{isDispatched ? 'En Route to Fault' : 'Awaiting Dispatch'}</div>
                 </Popup>
               </Marker>

               {/* Draw dotted line connecting them */}
               <Polyline positions={[ [selectedAlert.lat, selectedAlert.lng], crewPos ]} pathOptions={{ color: '#3b82f6', dashArray: '5, 10', weight: 2, opacity: 0.5 }} />

             </MapContainer>
          ) : (
             <div className="w-full h-full flex items-center justify-center text-surface-500 text-sm">Select an alert to view telemetry map</div>
          )}
        </div>
      </div>
    </div>
  );
}
