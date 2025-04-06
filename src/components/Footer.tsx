import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Leão Parts</h2>
          <p>Peças automotivas de confiança.</p>
        </div>

        <div className="footer-links">
          <a href="/">Início</a>
          {/* <a href="/sobre">Sobre</a> */}
          {/* <a href="/contato">Contato</a> */}
          {/* <a href="/suporte">Suporte</a> */}
        </div>

        <div className="footer-socials">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a> */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Leão Parts. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
