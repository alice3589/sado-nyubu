// src/app/api/sendGmail/route.ts
import nodemailer from 'nodemailer';

// nodemailer で使う環境変数は .env に設定
//   GMAILUSER=<アカウント>
//   GMAILPASSWORD=<パスワード>
//   SECOND_EMAIL=<2つ目のメールアドレス>

const SPREADSHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8XNM7hd0tMWTy0vadF3Q-UMtffIV2bku5a3Psadty2DoOfXU_YIgS-s-PFKACKbuN/exec';

export async function POST(request: Request) {
  try {
    const { name, email, grade, group, date } = await request.json();

    // Googleスプレッドシートへのデータ書き込み
    const scriptResponse = await fetch(
      `${SPREADSHEET_SCRIPT_URL}?spreadsheetId=12UKrT6rz6VC6qGM6uPfUib2ROknaDx8WW3dkBhPyDgg&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&grade=${encodeURIComponent(grade)}&group=${encodeURIComponent(group)}&date=${encodeURIComponent(date)}`
    );

    if (!scriptResponse.ok) {
      throw new Error('スプレッドシートへの書き込みに失敗しました');
    }

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD,
      }
    });

    // 接続テスト
    await transporter.verify().catch(error => {
      console.error('SMTP接続エラー:', error);
      throw error;
    });

    // メールの内容
    const mailOptions = {
      from: process.env.GMAILUSER,
      to: process.env.SECOND_EMAIL,
      subject: '茶道部入部届',
      html: `
        <h2>茶道部入部届</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>学年:</strong> ${grade}</p>
        <p><strong>組:</strong> ${group}</p>
        <p><strong>体験入部希望日:</strong> ${date}</p>
      `,
    };

    console.log('送信設定:', mailOptions);

    // メール送信
    const info = await transporter.sendMail(mailOptions);
    console.log('送信成功:', info);

    return new Response(JSON.stringify({ message: 'メール送信成功', info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return new Response(JSON.stringify({ 
      message: 'メール送信失敗',
      error: error instanceof Error ? error.message : '不明なエラー',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
