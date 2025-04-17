// src/app/api/sendGmail/route.ts
import nodemailer from 'nodemailer';

// nodemailer で使う環境変数は .env に設定
//   GMAILUSER=<アカウント>
//   GMAILPASSWORD=<パスワード>
//   SECOND_EMAIL=<2つ目のメールアドレス>

export async function POST(request: Request) {
  try {
    const { name, email, grade, group, date } = await request.json();

    console.log('環境変数:', {
      user: process.env.GMAILUSER,
      hasPassword: !!process.env.GMAILPASSWORD,
      hasSecondEmail: !!process.env.SECOND_EMAIL
    });

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
      to: `${process.env.GMAILUSER}, ${process.env.SECOND_EMAIL}, ${process.env.THIRD_EMAIL}`,
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
