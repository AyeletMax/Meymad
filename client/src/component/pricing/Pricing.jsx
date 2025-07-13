import React from "react";
import "./Pricing.css";

const PRICING = {
  BASE_UP_TO_2: 200,
  BASE_UP_TO_5: 250,
  ADDITIONAL_PER_5: 50,
  MINIMUM_DURATION: 2
};

function getPrice(numPeople, hours) {
  let basePrice;
  if (numPeople <= 2) {
    basePrice = PRICING.BASE_UP_TO_2;
  } else if (numPeople <= 5) {
    basePrice = PRICING.BASE_UP_TO_5;
  } else {
    const additionalGroups = Math.ceil((numPeople - 5) / 5);
    basePrice = PRICING.BASE_UP_TO_5 + additionalGroups * PRICING.ADDITIONAL_PER_5;
  }
  const ratio = (hours || PRICING.MINIMUM_DURATION) / PRICING.MINIMUM_DURATION;
  return Math.round(basePrice * ratio);
}

const examples = [
  { people: 2, hours: 2 },
  { people: 5, hours: 2 },
  { people: 8, hours: 2 },
  { people: 12, hours: 3 },
];

const Pricing = () => (
  <div className="pricing-container">
    <div className="pricing-content">
      <h1 className="pricing-title">מחירון הזמנת בריכה</h1>
      <div className="pricing-table">
        <table>
          <thead>
            <tr>
              <th>מספר אנשים</th>
              <th>משך (שעות)</th>
              <th>מחיר</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((ex, i) => (
              <tr key={i}>
                <td>{ex.people}</td>
                <td>{ex.hours}</td>
                <td>₪{getPrice(ex.people, ex.hours)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pricing-note">
        <ul>
          <li>המחיר הבסיסי הוא לשעתיים. כל שעה נוספת מחושבת באופן יחסי.</li>
          <li>עד 2 אנשים: ₪{PRICING.BASE_UP_TO_2} לשעתיים.</li>
          <li>3-5 אנשים: ₪{PRICING.BASE_UP_TO_5} לשעתיים.</li>
          <li>כל 5 אנשים נוספים: תוספת ₪{PRICING.ADDITIONAL_PER_5}.</li>
          <li>המחיר הסופי יוצג אוטומטית בעת ההזמנה לפי מספר האנשים והזמן שתבחרו.</li>
        </ul>
        <div style={{ marginTop: "1.5rem", color: "#0097a7", fontWeight: 600 }}>
          כל המחירים כוללים מע״מ.
        </div>
      </div>
    </div>
  </div>
);

export default Pricing;