import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import "../styles/Header.css";

import { LogIn, User, HelpCircle, Search, X, Menu } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  const disableSearch =
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/adicionar-produto");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Leão Parts
        </Link>

        {!disableSearch && (
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-button"
                onClick={clearSearch}
              >
                <X size={16} />
              </button>
            )}
            <button type="submit" className="search-button">
              <Search size={16} />
            </button>
          </form>
        )}

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {user ? (
            <>
              {/* <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                <User size={16} /> {user.name}
              </Link> */}
              <Link to="/adicionar-produto" onClick={() => setMenuOpen(false)}>
                + Produto
              </Link>
              <button className="logout-button" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <LogIn size={16} /> Entrar
              </Link>
              {/* <Link to="/cadastro" onClick={() => setMenuOpen(false)}>
                <User size={16} /> Cadastro
              </Link> */}
              {/* <Link to="/ajuda" onClick={() => setMenuOpen(false)}>
                <HelpCircle size={16} /> Ajuda
              </Link> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
