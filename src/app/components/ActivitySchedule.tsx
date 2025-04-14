import React from 'react';

const ActivitySchedule: React.FC = () => {
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">次の活動予定</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-3">
          <h4 className="font-bold">日時</h4>
          <p>2024年4月12日（金）15:30〜17:00</p>
        </div>
        <div className="mb-3">
          <h4 className="font-bold">場所</h4>
          <p>茶道室（3号館1階）</p>
        </div>
        <div>
          <h4 className="font-bold">持ち物</h4>
          <ul className="list-disc pl-5">
            <li>上履き</li>
            <li>白い靴下</li>
            <li>筆記用具</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivitySchedule; 