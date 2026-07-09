import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniversityTalks from './components/UniversityTalks';
import GraduationMenu from './components/GraduationMenu';
import GraduationCeremoniesOverview from './components/GraduationCeremoniesOverview';
import GraduationSchedule from './components/GraduationSchedule';
import SchoolReceptions from './components/SchoolReceptions';
import SchoolReceptionsOverview from './components/SchoolReceptionsOverview';
import ceremonies20July2026 from './data/ceremonies-20-july-2026.json';
import ceremonies21July2026 from './data/ceremonies-21-july-2026.json';
import ceremonies22July2026 from './data/ceremonies-22-july-2026.json';
import ceremonies23July2026 from './data/ceremonies-23-july-2026.json';
import ceremonies24July2026 from './data/ceremonies-24-july-2026.json';
import receptions20July2026 from './data/receptions-20-july-2026.json';
import receptions21July2026 from './data/receptions-21-july-2026.json';
import receptions22July2026 from './data/receptions-22-july-2026.json';
import receptions23July2026 from './data/receptions-23-july-2026.json';
import receptions24July2026 from './data/receptions-24-july-2026.json';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversityTalks />} />
        <Route path="/menu" element={<GraduationMenu />} />
        <Route path="/ceremonies" element={<GraduationCeremoniesOverview />} />
        <Route path="/ceremonies/20-july-2026" element={<GraduationSchedule day={ceremonies20July2026} />} />
        <Route path="/ceremonies/21-july-2026" element={<GraduationSchedule day={ceremonies21July2026} />} />
        <Route path="/ceremonies/22-july-2026" element={<GraduationSchedule day={ceremonies22July2026} />} />
        <Route path="/ceremonies/23-july-2026" element={<GraduationSchedule day={ceremonies23July2026} />} />
        <Route path="/ceremonies/24-july-2026" element={<GraduationSchedule day={ceremonies24July2026} />} />
        <Route path="/receptions" element={<SchoolReceptionsOverview />} />
        <Route path="/receptions/20-july-2026" element={<SchoolReceptions day={receptions20July2026} />} />
        <Route path="/receptions/21-july-2026" element={<SchoolReceptions day={receptions21July2026} />} />
        <Route path="/receptions/22-july-2026" element={<SchoolReceptions day={receptions22July2026} />} />
        <Route path="/receptions/23-july-2026" element={<SchoolReceptions day={receptions23July2026} />} />
        <Route path="/receptions/24-july-2026" element={<SchoolReceptions day={receptions24July2026} />} />
      </Routes>
    </BrowserRouter>
  );
}
