"use client";

import React, { useEffect } from 'react';
import './cherry-blossom.css';

export default function CherryBlossom() {
  useEffect(() => {
    // コンテナを指定
    const section = document.querySelector('.cherry-blossom-container');
    if (!section) return;

    // 花びらを生成する関数
    const createPetal = () => {
      const petalEl = document.createElement('span');
      petalEl.className = 'petal';
      
      // 花びらのサイズをランダムに設定
      const minSize = 8;
      const maxSize = 15;
      const size = Math.random() * (maxSize - minSize) + minSize;
      petalEl.style.width = `${size}px`;
      petalEl.style.height = `${size}px`;
      
      // 花びらの開始位置をランダムに設定
      petalEl.style.left = Math.random() * window.innerWidth + 'px';
      
      // 花びらの透明度をランダムに設定
      petalEl.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      
      section.appendChild(petalEl);

      // 一定時間が経てば花びらを消す
      setTimeout(() => {
        petalEl.remove();
      }, 15000);
    };

    // 花びらを生成する間隔をミリ秒で指定
    const interval = setInterval(createPetal, 200);

    // クリーンアップ関数
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="cherry-blossom-container" />;
}


