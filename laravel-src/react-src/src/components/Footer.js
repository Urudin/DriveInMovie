import React from "react";
import "../styles.css"

export default function Footer(){

    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            © {currentYear} MovieGarage, All rights reserved.
        </footer>
    );
}
