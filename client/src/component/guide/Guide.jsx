import React from "react";

const Guide = () => (
  <div
    style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        maxWidth: 420,
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#0097a7", fontWeight: 800, marginBottom: "1.5rem" }}>
        המדריך שלנו בדרך אליכם!
      </h1>
      <p style={{ color: "#007c91", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
        אנו עובדים בימים אלו על מדריך מקצועי ומפורט שיסייע לכם בכל שלבי המדידה, ההזמנה והתחזוקה של הבריכה.
      </p>
      <p style={{ color: "#0097a7", fontWeight: 600 }}>
        בקרוב תוכלו ליהנות ממדריך דיגיטלי עשיר, נוח ויעיל – הישארו מעודכנים!
      </p>
    </div>
  </div>
);

export default Guide;