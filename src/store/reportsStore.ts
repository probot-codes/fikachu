// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Report } from '../types/report';

// interface ReportsState {
//   reports: Report[];
//   addReport: (report: Omit<Report, 'id' | 'dateReported' | 'dateUpdated' | 'status'>) => void;
//   updateReportStatus: (id: string, status: Report['status']) => void;
// }

// export const useReportsStore = create<ReportsState>()(
//   persist(
//     (set) => ({
//       reports: [],
//       addReport: (reportData) => set((state) => ({
//         reports: [
//           ...state.reports,
//           {
//             ...reportData,
//             id: crypto.randomUUID(),
//             status: 'pending',
//             dateReported: new Date().toISOString(),
//             dateUpdated: new Date().toISOString(),
//           },
//         ],
//       })),
//       updateReportStatus: (id, status) => set((state) => ({
//         reports: state.reports.map((report) =>
//           report.id === id
//             ? { ...report, status, dateUpdated: new Date().toISOString() }
//             : report
//         ),
//       })),
//     }),
//     {
//       name: 'reports-storage',
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Report } from '../types/report';

interface ReportsState {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'dateReported' | 'dateUpdated' | 'status'>) => void;
  updateReportStatus: (id: string, status: Report['status']) => void;
  deleteReport: (id: string) => void; 
}

export const useReportsStore = create<ReportsState>()(
  persist(
    (set) => ({
      reports: [],
      addReport: (reportData) => set((state) => ({
        reports: [
          ...state.reports,
          {
            ...reportData,
            id: crypto.randomUUID(),
            status: 'pending',
            dateReported: new Date().toISOString(),
            dateUpdated: new Date().toISOString(),
          },
        ],
      })),
      updateReportStatus: (id, status) => set((state) => ({
        reports: state.reports.map((report) =>
          report.id === id
            ? { ...report, status, dateUpdated: new Date().toISOString() }
            : report
        ),
      })),
      deleteReport: (id) => set((state) => ({ 
        reports: state.reports.filter((report) => report.id !== id) 
      })),
    }),
    {
      name: 'reports-storage',
    }
  )
);