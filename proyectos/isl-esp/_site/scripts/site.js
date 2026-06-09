// scripts/site.js — Inicialización del sitio (tema claro/oscuro)

(function() {
  'use strict';

  // ── Cambio de tema claro/oscuro ──

  var THEME_KEY = 'isl-theme';

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch(e) { return null; }
  }

  function setStoredTheme(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    setStoredTheme(theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-bs-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Inyectar botón en la barra de navegación
  function injectToggle() {
    var nav = document.querySelector('.navbar-nav, .navbar-tools');
    if (!nav) return;
    var li = document.createElement('li');
    li.className = 'nav-item';
    li.style.marginLeft = '8px';
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'btn btn-link nav-link py-1 px-2';
    btn.setAttribute('aria-label', 'Cambiar tema');
    btn.style.cssText = 'font-size:1.3rem;line-height:1;cursor:pointer;text-decoration:none;border:none;background:none;';
    btn.onclick = toggleTheme;
    li.appendChild(btn);
    nav.appendChild(li);
  }

  // Inicializar: respetar preferencia del sistema o almacenamiento
  var stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  // Esperar a que el DOM cargue para inyectar el botón
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(injectToggle, 100);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectToggle, 100);
    });
  }
})();
