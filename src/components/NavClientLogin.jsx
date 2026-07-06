import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearClientSession,
  getClientSession,
  loginClient,
} from "../lib/clientSession";

const USER_EMOJI = "👤";

function LoginFields({ username, password, onUsername, onPassword, error, onLinkClick }) {
  const handleLink = () => onLinkClick?.();

  return (
    <>
      <div className="nav-client-login__fields">
        <label className="nav-client-login__label" htmlFor="nav-user">
          Usuário
        </label>
        <input
          id="nav-user"
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Seu usuário ou e-mail"
          value={username}
          onChange={(e) => onUsername(e.target.value)}
        />
        <label className="nav-client-login__label" htmlFor="nav-pass">
          Senha
        </label>
        <input
          id="nav-pass"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
        />
      </div>
      {error && (
        <p className="nav-client-login__error" role="alert">
          {error}
        </p>
      )}
      <div className="nav-client-login__actions">
        <button type="submit" className="btn btn-primary btn-sm btn-block">
          Entrar
        </button>
        <Link to="/cadastro" className="btn btn-outline btn-sm btn-block" onClick={handleLink}>
          Cadastrar
        </Link>
        <Link to="/atendimento" className="nav-client-login__help" onClick={handleLink}>
          Esqueci minha senha
        </Link>
      </div>
    </>
  );
}

export default function NavClientLogin() {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [session, setSession] = useState(() => getClientSession());
  const [panelOpen, setPanelOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = () => setSession(getClientSession());
    window.addEventListener("client-session:updated", sync);
    return () => window.removeEventListener("client-session:updated", sync);
  }, []);

  useEffect(() => {
    if (!panelOpen) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setPanelOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setPanelOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panelOpen]);

  const closePanel = () => setPanelOpen(false);

  const handleLinkNavigate = () => {
    closePanel();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const result = loginClient(username, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSession(getClientSession());
    setPassword("");
    closePanel();
    navigate("/area-cliente");
  };

  const handleLogout = () => {
    clearClientSession();
    setSession(null);
    setUsername("");
    setPassword("");
    setError("");
    closePanel();
  };

  const triggerLabel = session ? session.username : "Área do cliente";

  return (
    <div className="nav-client-login" ref={rootRef}>
      <button
        type="button"
        className={`nav-client-login__trigger${session ? " nav-client-login__trigger--session" : ""}`}
        aria-expanded={panelOpen}
        aria-haspopup={session ? "menu" : "dialog"}
        aria-label={session ? `Conta de ${session.username}` : "Área do cliente — entrar"}
        title={triggerLabel}
        onClick={() => setPanelOpen((open) => !open)}
      >
        <span className="nav-client-login__icon" aria-hidden="true">
          {USER_EMOJI}
        </span>
        <span className="nav-client-login__label-text">{triggerLabel}</span>
      </button>

      {panelOpen && session && (
        <div className="nav-client-login__panel" role="menu">
          <p className="nav-client-login__panel-greet">Bem-vindo de volta</p>
          <Link
            to="/area-cliente"
            className="btn btn-primary btn-sm btn-block"
            role="menuitem"
            onClick={closePanel}
          >
            Área do cliente
          </Link>
          <button
            type="button"
            className="btn btn-outline btn-sm btn-block"
            role="menuitem"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      )}

      {panelOpen && !session && (
        <div className="nav-client-login__panel" role="dialog" aria-labelledby="nav-login-title">
          <div className="nav-client-login__panel-head">
            <span className="nav-client-login__panel-emoji" aria-hidden="true">
              {USER_EMOJI}
            </span>
            <div>
              <p id="nav-login-title" className="nav-client-login__panel-title">
                Área do cliente
              </p>
              <p className="nav-client-login__panel-lead">
                Entre com usuário e senha para acessar sua conta.
              </p>
            </div>
          </div>
          <form onSubmit={handleLogin} noValidate>
            <LoginFields
              username={username}
              password={password}
              onUsername={setUsername}
              onPassword={setPassword}
              error={error}
              onLinkClick={handleLinkNavigate}
            />
          </form>
        </div>
      )}
    </div>
  );
}
