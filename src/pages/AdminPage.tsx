// import React, { useState } from 'react';
// import { Verified, ExternalLink } from 'lucide-react';
// import { useReportsStore } from '../store/reportsStore';
// import { Report } from '../types/report';

// const STATUS_COLORS = {
//   pending: 'bg-yellow-100 text-yellow-800',
//   investigating: 'bg-blue-100 text-blue-800',
//   verified: 'bg-green-100 text-green-800',
//   rejected: 'bg-red-100 text-red-800',
// };

// export function AdminPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const { reports, updateReportStatus } = useReportsStore();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username === 'admin' && password === 'admin') {
//       setIsAuthenticated(true);
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   const handleStatusChange = (report: Report, newStatus: Report['status']) => {
//     updateReportStatus(report.id, newStatus);
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <Verified className="mx-auto h-12 w-12 text-indigo-600" />
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Admin Login
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <input
//                   type="text"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         {reports.length === 0 ? (
//           <div className="p-6 text-center text-gray-500">
//             No reports have been submitted yet.
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {reports.map((report) => (
//               <li key={report.id} className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-medium text-indigo-600 truncate">
//                         Report #{report.id.slice(0, 8)}
//                       </p>
//                       <select
//                         value={report.status}
//                         onChange={(e) => handleStatusChange(report, e.target.value as Report['status'])}
//                         className={`ml-4 text-sm rounded-full px-3 py-1 ${STATUS_COLORS[report.status]}`}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="investigating">Investigating</option>
//                         <option value="verified">Verified</option>
//                         <option value="rejected">Rejected</option>
//                       </select>
//                     </div>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-600">
//                         Reporter: {report.reporterEmail}
//                       </p>
//                       <div className="mt-1 flex items-center">
//                         <p className="text-sm text-gray-600">
//                           Platform: {report.platform}
//                         </p>
//                         <a
//                           href={report.suspectedAccountUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="ml-4 text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
//                         >
//                           View Account <ExternalLink className="h-4 w-4 ml-1" />
//                         </a>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <p className="text-sm text-gray-900 font-medium">Reason:</p>
//                       <p className="mt-1 text-sm text-gray-600">{report.reason}</p>
//                     </div>
//                     {report.evidence && (
//                       <div className="mt-4">
//                         <p className="text-sm text-gray-900 font-medium">Evidence:</p>
//                         <p className="mt-1 text-sm text-gray-600">{report.evidence}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mt-4 text-sm text-gray-500">
//                   Reported: {new Date(report.dateReported).toLocaleString()}
//                   <br />
//                   Last Updated: {new Date(report.dateUpdated).toLocaleString()}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Verified, ExternalLink, Trash } from 'lucide-react';
import { useReportsStore } from '../store/reportsStore';
import { Report } from '../types/report';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  investigating: 'bg-blue-100 text-blue-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { reports, updateReportStatus, deleteReport } = useReportsStore(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleStatusChange = (report: Report, newStatus: Report['status']) => {
    updateReportStatus(report.id, newStatus);
  };

  const handleDeleteReport = (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      deleteReport(reportId); 
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Verified className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {reports.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No reports have been submitted yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        Report #{report.id.slice(0, 8)}
                      </p>
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report, e.target.value as Report['status'])}
                        className={`ml-4 text-sm rounded-full px-3 py-1 ${STATUS_COLORS[report.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="investigating">Investigating</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Reporter: {report.reporterEmail}
                      </p>
                      <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-600">
                          Platform: {report.platform}
                        </p>
                        <a
                          href={report.suspectedAccountUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                          View Account <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-900 font-medium">Reason:</p>
                      <p className="mt-1 text-sm text-gray-600">{report.reason}</p>
                    </div>
                    {report.evidence && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-900 font-medium">Evidence:</p>
                        <p className="mt-1 text-sm text-gray-600">{report.evidence}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2"> 
                    <button 
                      onClick={() => handleDeleteReport(report.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Reported: {new Date(report.dateReported).toLocaleString()}
                  <br />
                  Last Updated: {new Date(report.dateUpdated).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}