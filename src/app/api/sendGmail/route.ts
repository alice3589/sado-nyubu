// src/app/api/sendGmail/route.ts

const SPREADSHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwKyhzEXTxRoUbQlw_WBJALdzTPSZWRllFHRp4QpC6S79qWzxzemc8RZsepZOh-stq6QQ/exec';

export async function POST(request: Request) {
  try {
    const { name, email, grade, group, date } = await request.json();

    console.log('送信データ:', { name, email, grade, group, date });

    // Googleスプレッドシートへのデータ書き込みとメール送信
    const scriptResponse = await fetch(
      `${SPREADSHEET_SCRIPT_URL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&grade=${encodeURIComponent(grade)}&group=${encodeURIComponent(group)}&date=${encodeURIComponent(date)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('スクリプトレスポンス:', scriptResponse.status);

    if (!scriptResponse.ok) {
      throw new Error(`処理に失敗しました: ${scriptResponse.status}`);
    }

    const scriptResult = await scriptResponse.json();
    console.log('スクリプト実行結果:', scriptResult);

    return new Response(JSON.stringify({ message: '処理が完了しました', scriptResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('エラー:', error);
    return new Response(JSON.stringify({ 
      message: 'エラーが発生しました',
      error: error instanceof Error ? error.message : '不明なエラー',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
