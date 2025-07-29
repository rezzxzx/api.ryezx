// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>My API Tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ textAlign: "center", padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#0070f3" }}>🔵 API Tester UI</h1>
        <p>Masukkan URL API kamu dan lihat hasilnya langsung di bawah</p>

        <input
          type="text"
          id="api-url"
          placeholder="Tempel URL API disini"
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "8px",
            marginTop: "1rem",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <button
          onClick={() => {
            const url = document.getElementById("api-url").value;
            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                document.getElementById("result").innerText = JSON.stringify(data, null, 2);
              })
              .catch((err) => {
                document.getElementById("result").innerText = `❌ Error: ${err}`;
              });
          }}
          style={{
            marginTop: "1rem",
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Tes API
        </button>

        <pre
          id="result"
          style={{
            marginTop: "2rem",
            textAlign: "left",
            backgroundColor: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            overflowX: "auto",
          }}
        >
        </pre>
      </div>
    </>
  );
}
