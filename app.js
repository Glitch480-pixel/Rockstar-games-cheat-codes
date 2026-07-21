(function () {
  const root = document.getElementById('root');

  const CARD_STYLE = {
    gta5: { accent: '#39ff6a', bg: '#000000', glow: 'rgba(57, 255, 106, 0.25)' },
    gta4: { accent: '#ff8c2b', bg: '#0b0f17', glow: 'rgba(255, 140, 43, 0.25)' },
    rdr2: { accent: '#8a1f11', bg: '#f4eedd', glow: 'rgba(138, 31, 17, 0.25)' },
  };

  const state = {
    platform: 'pc',
    query: '',
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setTheme(themeId) {
    document.documentElement.dataset.theme = themeId || 'default';
  }

  function renderHome() {
    setTheme('default');
    document.title = "AJC's Cheat Codes";

    const cards = GAMES.map((game) => {
      const style = CARD_STYLE[game.id];
      return `
        <button
          class="game-card"
          data-game="${game.id}"
          style="--card-accent:${style.accent}; --card-bg:${style.bg}; --card-glow:${style.glow};"
        >
          <span class="swatch"><span class="swatch-dot"></span></span>
          <span class="info">
            <h3>${escapeHtml(game.title)}</h3>
            <p>${escapeHtml(game.subtitle)}</p>
          </span>
          <span class="chevron">&rsaquo;</span>
        </button>
      `;
    }).join('');

    root.innerHTML = `
      <div class="view">
        <div class="banner">
          <p class="banner-title accent">AJC'S</p>
          <p class="banner-title">CHEAT CODES</p>
          <div class="banner-rule"></div>
        </div>
        <div class="container">
          <p class="section-label">Select a game</p>
          <div class="game-grid">${cards}</div>
        </div>
      </div>
    `;

    root.querySelectorAll('.game-card').forEach((el) => {
      el.addEventListener('click', () => {
        window.location.hash = el.dataset.game;
      });
    });
  }

  function filterCheats(cheats, query) {
    const q = query.trim().toLowerCase();
    if (!q) return cheats;
    return cheats.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.category || '').toLowerCase().includes(q)
      );
    });
  }

  function copyToClipboard(text, el) {
    const done = () => {
      el.classList.add('copied');
      const hint = el.querySelector('.copy-hint');
      const original = hint.textContent;
      hint.textContent = 'Copied!';
      setTimeout(() => {
        hint.textContent = original;
        el.classList.remove('copied');
      }, 1200);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) {
      /* clipboard unavailable; silently ignore */
    }
    document.body.removeChild(textarea);
  }

  function renderGame(gameId) {
    const game = GAMES.find((g) => g.id === gameId);
    const data = CHEAT_DATA[gameId];
    if (!game || !data) {
      window.location.hash = '';
      return;
    }

    setTheme(gameId);
    document.title = `${game.shortTitle} — AJC's Cheat Codes`;

    const note = state.platform === 'pc' ? data.pcNote : data.consoleNote;
    const filtered = filterCheats(data.cheats, state.query);

    const cardsHtml = filtered.length
      ? filtered
          .map((cheat) => {
            const code = cheat[state.platform];
            return `
              <div class="cheat-card">
                <div class="cheat-card-head">
                  <h3>${escapeHtml(cheat.name)}</h3>
                  ${cheat.category ? `<span class="category-tag">${escapeHtml(cheat.category)}</span>` : ''}
                </div>
                <p class="cheat-desc">${escapeHtml(cheat.description)}</p>
                <div class="code-box" data-code="${escapeHtml(code)}" title="Click to copy">
                  ${escapeHtml(code)}
                  <span class="copy-hint">Copy</span>
                </div>
                ${cheat.extra ? `<p class="extra-note">${escapeHtml(cheat.extra)}</p>` : ''}
              </div>
            `;
          })
          .join('')
      : `<p class="empty-state">No cheats match "${escapeHtml(state.query)}".</p>`;

    root.innerHTML = `
      <div class="view">
        <div class="game-header">
          <div class="game-header-inner">
            <button class="back-link" id="back-btn"><span class="arrow">&lsaquo;</span> Home</button>
            <h1 class="game-title">${escapeHtml(game.shortTitle)}</h1>
            <div class="game-rule"></div>
            <div class="toggle">
              <button data-platform="pc" class="${state.platform === 'pc' ? 'active' : ''}">PC</button>
              <button data-platform="console" class="${state.platform === 'console' ? 'active' : ''}">Console</button>
            </div>
            <div class="search-wrap">
              <span class="search-icon">&#8981;</span>
              <input type="text" id="search-input" placeholder="Search by name or effect..." value="${escapeHtml(state.query)}" autocomplete="off" />
              ${state.query ? '<button class="clear-btn" id="clear-search">&#10005;</button>' : ''}
            </div>
            ${note ? `<p class="entry-note">${escapeHtml(note)}</p>` : ''}
          </div>
        </div>
        <div class="container">
          <div class="cheat-grid">${cardsHtml}</div>
        </div>
      </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
      window.location.hash = '';
    });

    root.querySelectorAll('.toggle button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.platform = btn.dataset.platform;
        renderGame(gameId);
      });
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value;
      renderGame(gameId);
      const el = document.getElementById('search-input');
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });

    const clearBtn = document.getElementById('clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.query = '';
        renderGame(gameId);
        document.getElementById('search-input').focus();
      });
    }

    root.querySelectorAll('.code-box').forEach((el) => {
      el.addEventListener('click', () => copyToClipboard(el.dataset.code, el));
    });
  }

  function route() {
    const hash = window.location.hash.replace('#', '');
    if (hash && CHEAT_DATA[hash]) {
      renderGame(hash);
    } else {
      state.platform = 'pc';
      state.query = '';
      renderHome();
    }
  }

  window.addEventListener('hashchange', route);
  route();
})();
