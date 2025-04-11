// src/app/api/sendGmail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// nodemailer で使う環境変数は .env に設定
//   GMAILUSER=<アカウント>
//   GMAILPASSWORD=<パスワード>

export async function POST(req: Request) {
  try {
    // リクエスト body の取り出し
    const body = await req.json();
    const { name, email, grade, group, date } = body;

    // nodemailer で SMTP 接続を作成
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD, 
      },
    });

    // 送信用の情報を作成
    const mailData = {
      from: email,
      to: 'ryutoiwa2929@gmail.com',
      subject: `[茶道部-入部届] ${name} 様より`,
      text: `【名前】${name}\n【学年】${grade}\n【組】${group}\n【メールアドレス】${email}\n 【日付】${date}`,
      html: `
        <p>【名前】</p>
        <p>${name}</p>
        <p>【学年】</p>
        <p>${grade}</p>
        <p>【組】</p>
        <p>${group}</p>
        <p>【メールアドレス】</p>
        <p>${email}</p>
        <p>【日付】</p>
        <p>${date}</p>
      `,
    };

    // メール送信
    await transporter.sendMail(mailData);

    // 正常終了レスポンスを返す
    return NextResponse.json({ message: 'メール送信に成功しました' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '送信に失敗しました' }, { status: 500 });
  }
}
