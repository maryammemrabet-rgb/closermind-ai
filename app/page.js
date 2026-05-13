export default function Home() {
  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>
        ObjectionOS 🚀
      </h1>

      <p style={styles.subtitle}>
        Turn objections into closed deals using AI-powered responses.
      </p>

      <div style={styles.card}>
        <h2>Enter Objection</h2>
        <textarea
          placeholder="e.g. It's too expensive..."
          style={styles.textarea}
        />

        <button style={styles.button}>
          Generate Response
        </button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    padding: "60px",
    textAlign: "center",
    background: "#0a0a0a",
    minHeight: "100vh",
    color: "white"
  },
  title: {
    fontSize: "42px",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "40px"
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    margin: "0 auto"
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginTop: "10px",
    marginBottom: "20px",
    padding: "10px"
  },
  button: {
    background: "#4f46e5",
    color: "white",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};
