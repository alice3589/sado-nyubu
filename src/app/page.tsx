"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from "react";

export default function Home() {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false); // ← モーダル表示制御用

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      grade: gradeRef.current?.value,
      group: groupRef.current?.value,
    }

    await fetch("api/sendGmail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        console.log("メール送信成功");
        setShowModal(true); // ← モーダル表示
      } else {
        alert("送信に失敗しました");
      }
    }).catch(() => {
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
            <input type="text" className="form-control" id="name" required ref={nameRef}/>
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
            <input type="text" className="form-control" id="group" required ref={groupRef}/>
          </div>
          <button type="submit" className="btn btn-danger">送信</button>
        </form>
      </div>

      {/* モーダル */}
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>閉じる</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
