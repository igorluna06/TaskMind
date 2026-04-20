import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './interfaces/layouts/MainLayout';
import CalendarPage from './interfaces/pages/CalendarPage';
import ChatPage from './interfaces/pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;