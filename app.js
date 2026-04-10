/* =============================================================
   0xNotes — App Script
   Docsify config + theme toggle + custom plugins
   ============================================================= */

// ── Theme Toggle ─────────────────────────────────────────────
// Apply saved theme immediately to avoid flash of wrong theme
(function () {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }
})();

function _syncThemeIcon() {
  var isDark = document.body.classList.contains('dark-mode');
  var moon   = document.getElementById('icon-moon');
  var sun    = document.getElementById('icon-sun');
  if (moon && sun) {
    moon.style.display = isDark ? 'none'  : 'block';
    sun.style.display  = isDark ? 'block' : 'none';
  }
}

function toggleTheme() {
  var isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  _syncThemeIcon();
}

document.addEventListener('DOMContentLoaded', _syncThemeIcon);

// ── Docsify Config ────────────────────────────────────────────
window.$docsify = {
  name: '0xNotes',
  repo: 'https://github.com/ElCyberCurioso/0xnotes',
  loadSidebar: true,
  loadNavbar: true,
  subMaxLevel: 2,
  auto2top: true,
  homepage: 'README.md',

  search: {
    maxAge: 86400000,
    paths: 'auto',
    placeholder: 'Buscar notas...',
    noData: 'Sin resultados',
    depth: 4,
    hideOtherSidebarContent: false,
    filter: function (array) {
      return array.filter(function (item) {
        return !item.slug || !item.slug.startsWith('_drafts/');
      });
    }
  },

  pagination: {
    previousText: '← Anterior',
    nextText:     'Siguiente →',
    crossChapter: true,
    crossChapterText: true
  },

  copyCode: {
    buttonText:  'Copiar',
    errorText:   'Error',
    successText: '¡Copiado!'
  },

  themeColor: '#059669',

  tabs: {
    persist:     true,
    sync:        true,
    theme:       'classic',
    tabComments: true,
    tabHeadings: true
  },

  // ── Custom Plugins ────────────────────────────────────────
  plugins: [
    function (hook, vm) {

      // After each page render
      hook.doneEach(function () {

        // 1a. Tag <p> wrappers that Docsify uses for active direct links so we
        //     can style them differently from plain section-label <p> elements.
        document.querySelectorAll('.sidebar-nav > ul > li > p').forEach(function (p) {
          if (p.querySelector('a')) {
            p.classList.add('link-wrapper');
          }
        });

        // 1. Hide draft links from sidebar
        document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
          var href = link.getAttribute('href');
          if (href && href.includes('_drafts/')) {
            var li = link.closest('li');
            if (li) li.style.display = 'none';
          }
        });

        // 2. Process GitHub-style alert blockquotes
        var alertMap = {
          '[!NOTE]':      { cls: 'alert-note',      label: 'Nota' },
          '[!TIP]':       { cls: 'alert-tip',        label: 'Consejo' },
          '[!WARNING]':   { cls: 'alert-warning',    label: 'Advertencia' },
          '[!IMPORTANT]': { cls: 'alert-important',  label: 'Importante' },
          '[!CAUTION]':   { cls: 'alert-caution',    label: 'Precaución' },
          '[!DANGER]':    { cls: 'alert-danger',     label: 'Peligro' }
        };

        document.querySelectorAll('.markdown-section blockquote').forEach(function (bq) {
          var firstP = bq.querySelector('p:first-child');
          if (!firstP) return;
          var text = firstP.textContent.trim();

          for (var marker in alertMap) {
            if (text.startsWith(marker)) {
              var info = alertMap[marker];
              bq.classList.add(info.cls);
              firstP.innerHTML = firstP.innerHTML.replace(
                marker,
                '<strong>' + info.label + '</strong>'
              );
              break;
            }
          }
        });

        // 3. Collapsible sidebar — only for section headers (p/strong), not direct links
        document.querySelectorAll('.sidebar-nav > ul > li').forEach(function (item) {
          // Only target items whose direct child is a section label (p or strong),
          // never items whose direct child is an <a> (direct page links like Inicio),
          // and never a <p> that Docsify uses to wrap an active direct link.
          var header  = item.querySelector(':scope > strong, :scope > p');
          var subList = item.querySelector(':scope > ul');

          if (!header || !subList) return;

          // Skip if this <p> wraps an active page link (Docsify behaviour)
          if (header.classList.contains('link-wrapper')) return;

          item.classList.add('collapsible');

          var hasActive = item.querySelector('.active') !== null;
          if (hasActive) {
            item.classList.remove('collapsed');
            subList.style.maxHeight = subList.scrollHeight + 'px';
          } else {
            item.classList.add('collapsed');
            subList.style.maxHeight = '0';
          }

          // Clone to clear any previously attached listeners (doneEach fires on every nav)
          var fresh = header.cloneNode(true);
          header.replaceWith(fresh);
          fresh.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (item.classList.contains('collapsed')) {
              item.classList.remove('collapsed');
              subList.style.maxHeight = subList.scrollHeight + 'px';
            } else {
              item.classList.add('collapsed');
              subList.style.maxHeight = '0';
            }
          });
        });
      }); // end doneEach

      // Block direct access to drafts
      hook.beforeEach(function (content, next) {
        if (vm.route.path.includes('_drafts/')) {
          next('# Acceso denegado\n\nEsta nota está en borrador y no es pública.');
        } else {
          next(content);
        }
      });

    }
  ]
};
