import React from 'react';
import CalendarView from './CalendarView';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Integrated Scheduling and Records Management System</h1>
        <CalendarView />
      </div>
    </div>
  );
}

export default App;
