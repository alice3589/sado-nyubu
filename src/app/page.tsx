"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from "react";
import CherryBlossom from "./cherry-blossom/cherry-blossom";

export default function Home() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // メールアドレスのバリデーション
    if (emailRef.current?.value && !emailRef.current.value.endsWith('@ktc.ac.jp')) {
      alert('メールアドレスは@ktc.ac.jpドメインのみ使用可能です。');
      return;
    }

    // 送信時に金曜日かどうかを検証
    if (dateRef.current) {
      const selectedDate = new Date(dateRef.current.value);
      // JavaScriptの getDay() では 0:日曜, 1:月曜, …, 5:金曜, 6:土曜
      if (selectedDate.getDay() !== 5) {
        alert("金曜日の日付を選択してください。");
        return;
      }
    }

    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      grade: gradeRef.current?.value,
      group: groupRef.current?.value,
      date: dateRef.current?.value,
    };

    await fetch("api/sendGmail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("メール送信成功");
          setShowModal(true);
        } else {
          alert("送信に失敗しました");
        }
      })
      .catch(() => {
        alert("送信中にエラーが発生しました");
      });
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

      {/* 活動予定セクション */}
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

