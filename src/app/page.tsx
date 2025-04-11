"use client";

import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useRef } from "react";

export default function Home() {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(nameRef.current?.value);

    let data = {
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
      if(res.status === 200) console.log("メール送信成功");
    })
  };

  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="container mt-5">
          <h2 className="mb-3">茶道部入部届フォーム</h2>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="foem-label">
                お名前
              </label>
              <input type="text" className="form-control" id="name" required ref={nameRef}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="foem-label">
                メールアドレス
              </label>
              <input type="email" className="form-control" id="email" required ref={emailRef} />
            </div>
            <div className="mb-3">
              <label htmlFor="grade" className="foem-label">
                学年
              </label>
              <input type="text" className="form-control" id="grade" required ref={gradeRef} />
            </div>
            <div className="mb-3">
              <label htmlFor="group" className="foem-label">
                組
              </label>
              <input type="text" className="form-control" id="group" required ref={groupRef}/>
            </div>
            <button type="submit" className="btn btn-danger">送信</button>
          </form>
        </div>
      </main>
  );
}
