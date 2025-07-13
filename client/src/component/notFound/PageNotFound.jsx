import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-desc">הדף שחיפשת לא נמצא</p>
                <p className="notfound-note">ייתכן שהכתובת שגויה או שהדף הוסר מהאתר.</p>
            </div>
        </div>
    );
}

export default PageNotFound;
