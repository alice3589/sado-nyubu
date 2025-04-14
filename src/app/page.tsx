"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from "react";
import CherryBlossom from "./cherry-blossom/cherry-blossom";
import ActivitySchedule from './components/ActivitySchedule';

export default function Home() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // メールアドレスの検証
    const email = emailRef.current?.value;
    if (email && !email.endsWith('@ktc.ac.jp')) {
      alert('メールアドレスは@ktc.ac.jpで終わる必要があります');
      return;
    }

    try {
      const response = await fetch('/api/sendGmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          grade: gradeRef.current?.value,
          group: groupRef.current?.value,
          date: dateRef.current?.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error('サーバーエラー:', data);
        alert(`送信に失敗しました: ${data.error || data.message}`);
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="container mt-5">
        <h2 className="mb-3">茶道部入部届フォーム</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">お名前</label>
            <input type="text" className="form-control" id="name" required ref={nameRef} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">メールアドレス</label>
            <input type="email" className="form-control" id="email" required ref={emailRef} />
          </div>
          <div className="mb-3">
            <label htmlFor="grade" className="form-label">学年</label>
            <input type="text" className="form-control" id="grade" required ref={gradeRef} />
          </div>
          <div className="mb-3">
            <label htmlFor="group" className="form-label">組</label>
            <input type="text" className="form-control" id="group" required ref={groupRef} />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">体験入部希望日（金曜日のみ選択）</label>
            <input 
              type="date" 
              className="form-control" 
              id="date" 
              required 
              ref={dateRef} 
            />
          </div>
          <button type="submit" className="btn btn-primary">送信</button>
        </form>
      </div>

      <ActivitySchedule />

      {/* モーダル表示 */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">確認</h5>
                <button type="button" className="btn-close" aria-label="閉じる" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>送信しました！</p>
                <p className="mt-3">活動場所はここ！</p>
                <img src="/images/campusmap.png" alt="活動場所の地図" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn " onClick={closeModal}>閉じる</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CherryBlossom />
    </main>
  );
}

