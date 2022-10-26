import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mi Home API</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Huawei Home API</a>
        </h1>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Mi Home &rarr;</h2>
            <p>จัดการ Mi Home Device แบบง่ายๆ ผ่านเว็บ</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Mi Fit &rarr;</h2>
            <p>
              ดูข้อมูลการใช้งาน Smart Watch และรับ Auth Token
              สำหรับการใช้งานผ่าน Gadgetbride
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Mi Fitness (Coming Soon) &rarr;</h2>
            <p>
              ดูข้อมูลสุขภาพของคุณ และปรับแต่งสมาร์ทวอชของคุณ / ดาวน์โหลด
              Firmware
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>XiaoAI (Coming Soon) &rarr;</h2>
            <p>ดาวน์โหลด / อัปเดทเฟิร์มแวร์สำหรับอุปกรณ์ที่รองรับ XiaoAI</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="" target="_blank" rel="noopener noreferrer">
          Powered by PleumkungZ (Xiaomi's Fan)
        </a>
      </footer>
    </div>
  );
};

export default Home;
