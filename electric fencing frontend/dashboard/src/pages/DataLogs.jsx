import React, { useState } from 'react';
import { Filter, Search, Download, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

const mockLogs = [
  { id: 'EVT-9921', time: '10:42:01', date: '2026-03-26', type: 'Fault', location: 'Zone 7 (1,054m)', action: 'Relay Tripped', status: 'Unresolved' },
  { id: 'EVT-9920', time: '10:41:15', date: '2026-03-26', type: 'Theft Warning', location: 'Zone 4 (412m)', action: 'Alert Sent', status: 'Investigating' },
  { id: 'EVT-9919', time: '08:00:00', date: '2026-03-26', type: 'System', location: 'Main Controller', action: 'Initialize', status: 'Success' },
  { id: 'EVT-9854', time: '22:15:44', date: '2026-03-25', type: 'Fault', location: 'Zone 2 (145m)', action: 'Relay Tripped', status: 'Resolved' },
  { id: 'EVT-9830', time: '18:30:00', date: '2026-03-25', type: 'System', location: 'Cloud DB', action: 'Data Sync', status: 'Success' },
  { id: 'EVT-9811', time: '03:12:11', date: '2026-03-25', type: 'Theft Warning', location: 'Zone 9 (2,100m)', action: 'Alert Sent', status: 'Resolved' },
  { id: 'EVT-9799', time: '14:22:05', date: '2026-03-24', type: 'Fault', location: 'Zone 7 (1,050m)', action: 'Relay Tripped', status: 'Resolved' },
];

export default function DataLogs() {
  const [filter, setFilter] = useState('All');

  const filteredLogs = mockLogs.filter(log => {
     if (filter === 'All') return true;
     if (filter === 'Faults') return log.type === 'Fault';
     if (filter === 'Thefts') return log.type === 'Theft Warning';
     if (filter === 'System') return log.type === 'System';
     return true;
  });

  const getIconForType = (type) => {
    switch (type) {
      case 'Fault': return <ShieldAlert size={16} className="text-red-400" />;
      case 'Theft Warning': return <ShieldAlert size={16} className="text-orange-400" />;
      case 'System': return <Cpu size={16} className="text-blue-400" />;
      default: return <CheckCircle size={16} className="text-brand-400" />;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-24 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 w-full max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Event History & Logs</h1>
          <p className="text-surface-400">Database of past incidents, AI classifications, and system actions.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-surface-800 hover:bg-surface-700 rounded-lg text-sm text-white transition-colors border border-surface-700">
             <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-surface-700 w-full max-w-6xl mx-auto overflow-hidden">
         
         {/* Toolbar */}
         <div className="p-4 border-b border-surface-800 flex flex-col sm:flex-row justify-between gap-4 bg-surface-900/50">
            <div className="flex bg-surface-800 p-1 rounded-lg self-start">
               {['All', 'Faults', 'Thefts', 'System'].map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === f ? 'bg-surface-600 text-white shadow' : 'text-surface-400 hover:text-white'}`}
                 >
                   {f}
                 </button>
               ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
              <input 
                type="text" 
                placeholder="Search logs by ID or location..." 
                className="w-full sm:w-64 bg-surface-950 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder-surface-600 transition-all"
              />
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-surface-300">
             <thead className="bg-surface-900/80 text-surface-400 uppercase text-xs border-b border-surface-800">
               <tr>
                 <th className="px-6 py-4 font-medium tracking-wider">Event ID</th>
                 <th className="px-6 py-4 font-medium tracking-wider">Date & Time</th>
                 <th className="px-6 py-4 font-medium tracking-wider">Type</th>
                 <th className="px-6 py-4 font-medium tracking-wider">Location</th>
                 <th className="px-6 py-4 font-medium tracking-wider">Automatic Action</th>
                 <th className="px-6 py-4 font-medium tracking-wider">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-surface-800/60">
               {filteredLogs.map((log) => (
                 <tr key={log.id} className="hover:bg-surface-800/30 transition-colors">
                   <td className="px-6 py-4 font-mono text-surface-200">{log.id}</td>
                   <td className="px-6 py-4">
                     <div className="text-white">{log.date}</div>
                     <div className="text-xs text-surface-500">{log.time}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                       {getIconForType(log.type)}
                       <span className={log.type === 'Fault' ? 'text-red-300' : log.type.includes('Theft') ? 'text-orange-300' : 'text-surface-300'}>{log.type}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">{log.location}</td>
                   <td className="px-6 py-4">{log.action}</td>
                   <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        log.status === 'Resolved' || log.status === 'Success' 
                          ? 'bg-brand-500/10 text-brand-400 border-brand-500/20' 
                          : log.status === 'Investigating'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {log.status}
                      </span>
                   </td>
                 </tr>
               ))}
               
               {filteredLogs.length === 0 && (
                 <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-surface-500">
                     No events found matching the current filter.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>
         
         {/* Footer Pagination */}
         <div className="p-4 border-t border-surface-800 bg-surface-900/50 flex justify-between items-center text-xs text-surface-500">
           <span>Showing {filteredLogs.length} of {mockLogs.length} entries</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 bg-surface-800 rounded hover:bg-surface-700 disabled:opacity-50" disabled>Previous</button>
             <button className="px-3 py-1 bg-surface-800 rounded hover:bg-surface-700 disabled:opacity-50" disabled>Next</button>
           </div>
         </div>
         
      </div>

    </div>
  );
}
