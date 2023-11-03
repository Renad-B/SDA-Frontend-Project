import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; 2023 TechCompany. All rights reserved.</p>
          <ul className="footer-links"></ul>
        </div>
        <div className="footer-right">
          <ul className="social-media-links">
            <li>
              <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
