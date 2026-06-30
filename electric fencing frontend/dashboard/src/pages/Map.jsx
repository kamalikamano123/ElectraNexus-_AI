import React, { useMemo } from 'react';
import { MapPin, Activity, ShieldAlert, CheckCircle2, AlertTriangle, Phone, Zap } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const createSensorIcon = (status) => {
  let bgColorClass = '';
  let dropShadow = '';

  if (status === 'Blue') {
    bgColorClass = 'bg-blue-500';
    dropShadow = 'shadow-[0_0_8px_rgba(59,130,246,0.8)]';
  } else if (status === 'Yellow') {
    bgColorClass = 'bg-yellow-500';
    dropShadow = 'shadow-[0_0_8px_rgba(234,179,8,0.8)]';
  } else {
    bgColorClass = 'bg-red-500 animate-pulse';
    dropShadow = 'shadow-[0_0_12px_rgba(248,113,113,0.9)]';
  }
  
  return new L.divIcon({
    className: 'bg-transparent border-0',
    html: `<div class="relative w-3 h-3 rounded-full border border-surface-900 ${bgColorClass} ${dropShadow}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -6]
  });
};

export default function Map() {
  // Use a fixed center for KSEB / local area
  const mapCenter = [10.8495, 76.2720];

  const poles = useMemo(() => {
    const generatedPoles = [];
    
    // We want 100 poles with exact color counts
    const statuses = Array(80).fill('Blue')
      .concat(Array(15).fill('Yellow'))
      .concat(Array(5).fill('Red'));
      
    // Fisher-Yates shuffle to randomize status positions along the lines
    for (let i = statuses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [statuses[i], statuses[j]] = [statuses[j], statuses[i]];
    }

    let id = 1;
    let statusIndex = 0;

    let currentLat = mapCenter[0];
    let currentLng = mapCenter[1];

    // Fix angle constraints so lines wander naturally but never criss-cross
    let baseAngle = Math.PI / 4; // Generally move North-East
    
    for (let i = 0; i < 100; i++) {
      // Wiggle more aggressively to prevent straight lines, nesting them more tightly
      const wiggle = (Math.random() - 0.5) * (Math.PI / 1.2); // Wider angle variation (up to 75 degrees)
      const currentAngle = baseAngle + wiggle;

      // Shorter, more scattered step distances to put poles 'in between' prior long stretches
      const step = 0.0015 + (Math.random() * 0.0015); 
      currentLat += Math.cos(currentAngle) * step;
      currentLng += Math.sin(currentAngle) * step;
      
      const status = statuses[statusIndex++];
      
      let voltage;
      if (status === 'Red') voltage = (Math.random() * 2).toFixed(1) + ' kV';
      else if (status === 'Yellow') voltage = (Math.random() * 2 + 5).toFixed(1) + ' kV';
      else voltage = (Math.random() * 2 + 9).toFixed(1) + ' kV';

      generatedPoles.push({
          id: id,
          lat: currentLat,
          lng: currentLng,
          name: `Transmission Pole - Sector ${String(id).padStart(3, '0')}`,
          status: status,
          voltage: voltage,
          lastPing: status === 'Red' ? '5 mins ago' : (status === 'Yellow' ? '30 sec ago' : '2 sec ago'),
          contactInfo: status === 'Red' ? '+91 94470 12345 (Line Inspector)' : null
      });
      id++;
    }

    return generatedPoles;
  }, [mapCenter[0], mapCenter[1]]);

  return (
    <div className="w-full flex-1 flex flex-col pt-4 pb-12 animate-in fade-in duration-500" style={{ minHeight: 'calc(100vh - 8rem)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="text-blue-500" size={28} />
          <h1 className="text-3xl font-extrabold text-white">Live Grid Map</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm text-surface-300 bg-surface-800/50 px-3 py-1.5 rounded-full border border-surface-700">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            Normal (80)
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-300 bg-surface-800/50 px-3 py-1.5 rounded-full border border-surface-700">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            Warning (15)
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-300 bg-surface-800/50 px-3 py-1.5 rounded-full border border-surface-700">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Alert (5)
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-2 rounded-xl border border-surface-700 w-full flex-1 relative overflow-hidden flex flex-col min-h-[600px]">
        <div className="bg-surface-800/50 p-3 rounded-t-lg border-b border-surface-700/50 flex items-center justify-between z-10">
          <span className="text-sm font-mono text-surface-400 flex items-center gap-2">
            <Activity size={14} className="text-blue-500" />
            Control Room: Substation Alpha
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-surface-900 rounded-b-lg relative z-0">
          <MapContainer 
            center={mapCenter} 
            zoom={14} 
            className="w-full h-full rounded-b-lg absolute inset-0 z-0 leaflet-container-dark"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {poles.map((pole, index) => {
              const nextPole = poles[index + 1];
              const isAffected = pole.status !== 'Blue' || (nextPole && nextPole.status !== 'Blue');
              const lineColor = isAffected ? '#ef4444' : '#3b82f6';
              
              return (
                <React.Fragment key={pole.id}>
                  {nextPole && (
                    <Polyline 
                      positions={[ [pole.lat, pole.lng], [nextPole.lat, nextPole.lng] ]}
                      pathOptions={{ 
                        color: lineColor, 
                        weight: 2, 
                        opacity: 0.8,
                        dashArray: isAffected ? '5, 5' : 'none' 
                      }} 
                    />
                  )}
                  <Marker 
                    position={[pole.lat, pole.lng]} 
                    icon={createSensorIcon(pole.status)}
                  >
                    <Popup className="dark-popup">
                      <div className="p-1 min-w-[220px]">
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-surface-700">
                          {pole.status === 'Blue' && <CheckCircle2 size={18} className="text-blue-500" />}
                          {pole.status === 'Yellow' && <AlertTriangle size={18} className="text-yellow-500 animate-pulse" />}
                          {pole.status === 'Red' && <ShieldAlert size={18} className="text-red-500 animate-pulse" />}
                          
                          <h3 className="font-bold text-white m-0 text-base">{pole.name}</h3>
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex justify-between items-center bg-surface-800 p-2 rounded-lg border border-surface-700/50">
                            <span className="text-surface-400">Status</span>
                            <span className={
                              pole.status === 'Blue' ? 'text-blue-400 font-semibold' : 
                              pole.status === 'Yellow' ? 'text-yellow-400 font-bold' :
                              'text-red-400 font-bold animate-pulse'
                            }>
                              {pole.status === 'Blue' ? 'Normal' : pole.status === 'Yellow' ? 'Warning' : 'Critical'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-surface-800 p-2 rounded-lg border border-surface-700/50">
                            <span className="text-surface-400">Voltage</span>
                            <span className="text-white font-mono">{pole.voltage}</span>
                          </div>
                          <div className="flex justify-between items-center bg-surface-800 p-2 rounded-lg border border-surface-700/50">
                            <span className="text-surface-400">Last Ping</span>
                            <span className="text-white">{pole.lastPing}</span>
                          </div>

                          {pole.status === 'Red' && (
                            <div className="mt-2 pt-2 border-t border-surface-700 flex flex-col gap-2">
                               <div className="flex items-center gap-2 text-xs bg-surface-900 p-2 rounded border border-surface-700">
                                 <Phone size={14} className="text-surface-400" />
                                 <span className="text-surface-300">Crew:</span>
                                 <span className="text-white font-mono font-medium tracking-wide">{pole.contactInfo}</span>
                               </div>
                               <div className="grid grid-cols-2 gap-2 mt-1">
                                 <button className="flex items-center justify-center gap-1 w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-bold transition-colors cursor-pointer">
                                   <Zap size={12} /> TRIP SECTOR
                                 </button>
                                 <button className="flex items-center justify-center gap-1 w-full py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs font-bold transition-colors cursor-pointer">
                                   DISPATCH CREW
                                 </button>
                               </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
