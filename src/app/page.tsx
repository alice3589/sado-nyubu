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
    if (emailRef.current?.value) {
      const email = emailRef.current.value;
      if (!email.endsWith('@ktc.ac.jp')) {
        alert('メールアドレスは@ktc.ac.jpドメインのみ使用可能です。');
        return;
      }
      if (!email.startsWith('g') && !email.startsWith('s')) {
        alert('メールアドレスはgまたはsから始まるもののみ使用可能です。');
        return;
      }
      // gまたはsの後から@までの部分が数字のみかチェック
      const middlePart = email.substring(1, email.indexOf('@'));
      if (!/^\d+$/.test(middlePart)) {
        alert('メールアドレスの最初の文字の後は数字のみ使用可能です。');
        return;
      }
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
          alert("送信しました！");
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
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="grade" className="form-label">学年</label>
              <input type="text" className="form-control" id="grade" required ref={gradeRef} />
            </div>
            <div className="col-md-6">
              <label htmlFor="group" className="form-label">組</label>
              <input type="text" className="form-control" id="group" required ref={groupRef} />
            </div>
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
                <div className="mt-4">
                  <h5 className="text-center mb-3">部活の活動場所はここ！</h5>
                  <img 
                    src="/images/campusmap.png" 
                    alt="キャンパスマップ" 
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>閉じる</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CherryBlossom />
    </main>
  );
}

