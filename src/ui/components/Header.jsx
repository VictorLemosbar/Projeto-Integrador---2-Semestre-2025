import React from "react";


//componente de cabeçalho com título e abas de navegação
export default function Header({ title, tabs = [], activeTab, onChangeTab }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => onChangeTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
