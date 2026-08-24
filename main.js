// Ecosystem package registry: free-text search, one active category, one active tag.
// Categories and tags both come from the controlled vocabulary in the registry schema.
const initEcosystemRegistry = () => {
  const root = document.querySelector('#ecosystem-packages');
  if (!root) return;

  const input = root.querySelector('#eco-filter');
  const chipRow = root.querySelector('#eco-chips');
  const grid = root.querySelector('#eco-grid');
  const counter = root.querySelector('#eco-count');
  const empty = root.querySelector('#eco-empty');
  const clearButton = root.querySelector('#eco-clear');
  const cards = Array.from(grid.querySelectorAll('.eco-card'));
  let activeCategory = '';
  let activeTag = '';

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    cards.forEach(card => {
      const visible =
        terms.every(term => card.dataset.search.includes(term)) &&
        (!activeCategory || card.dataset.category === activeCategory) &&
        (!activeTag || card.dataset.tags.includes(`|${activeTag}|`));
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    counter.textContent = shown;
    empty.hidden = shown !== 0;
    clearButton.hidden = !terms.length && !activeCategory && !activeTag;
    root.querySelectorAll('.eco-tag').forEach(tag => {
      tag.classList.toggle('is-active', tag.dataset.tag === activeTag);
    });
  };

  const syncChips = () => {
    chipRow.querySelectorAll('.eco-chip').forEach(chip => {
      const isActive = chip.dataset.category === activeCategory;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });
  };

  const reset = () => {
    input.value = '';
    activeCategory = '';
    activeTag = '';
    syncChips();
    apply();
  };

  input.addEventListener('input', apply);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') reset();
  });
  clearButton.addEventListener('click', () => {
    reset();
    input.focus();
  });
  empty.querySelector('.eco-empty-reset').addEventListener('click', reset);

  chipRow.addEventListener('click', event => {
    const chip = event.target.closest('.eco-chip');
    if (!chip) return;
    activeCategory = activeCategory === chip.dataset.category ? '' : chip.dataset.category;
    syncChips();
    apply();
  });

  // Tags are not in the chip row — there are too many — so they filter from the cards themselves.
  grid.addEventListener('click', event => {
    const tag = event.target.closest('.eco-tag');
    if (!tag) return;
    event.preventDefault();
    activeTag = activeTag === tag.dataset.tag ? '' : tag.dataset.tag;
    apply();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
};

// Table of contents for long pages. These headings come from templates rather than markdown, so
// Hugo's .TableOfContents cannot see them and the list is built from the rendered page instead.
const initTableOfContents = () => {
  const toc = document.querySelector('.toc');
  const body = document.querySelector('.with-toc-body');
  if (!toc || !body) return;

  // Headings inside a nested <article> belong to a component, not to the page: the package cards
  // are articles with their own <h3> title and must not become sections of the contents.
  const scope = body.querySelector('article.post') || body;
  const nested = heading => {
    const article = heading.closest('article');
    return article !== null && article !== scope;
  };
  const headings = [...scope.querySelectorAll('h2, h3')].filter(
    heading => heading.textContent.trim() && !nested(heading),
  );
  if (headings.length < 3) return; // too short to be worth a sidebar

  const list = toc.querySelector('ul');
  const used = new Set();
  const links = new Map();

  headings.forEach(heading => {
    if (!heading.id) {
      const slug = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let id = slug;
      for (let n = 2; used.has(id) || document.getElementById(id); n += 1) id = `${slug}-${n}`;
      heading.id = id;
    }
    used.add(heading.id);

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();

    const item = document.createElement('li');
    item.className = `toc-${heading.tagName.toLowerCase()}`;
    item.append(link);
    list.append(item);
    links.set(heading, link);
  });

  toc.hidden = false;

  // Highlight the last heading scrolled past. A handful of rect reads per scroll is cheap enough
  // to do directly, and avoids a throttle that can wedge if its callback never runs.
  const markCurrent = () => {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > 120) break;
      current = heading;
    }
    links.forEach((link, heading) => link.classList.toggle('is-current', heading === current));
  };
  window.addEventListener('scroll', markCurrent, { passive: true });
  markCurrent();
};

const filterTutorials = () => {
  const trs = document.querySelectorAll('.tutorial-item');
  const filter = document.querySelector('#tutorial-filter').value;
  const regex = new RegExp(filter, 'i');
  const tdFound = td => regex.test(td.innerHTML);
  const pkgFound = childrenArr => childrenArr.some(tdFound);
  const toggleTrs = ({ style, children }) => {
    style.display = pkgFound([
      ...children
    ]) ? '' : 'none' ;
  };
  trs.forEach(toggleTrs);
}

// Initialize interactive UMAP visualization
const initInteractiveViz = () => {
  const container = document.getElementById('interactive-container');
  const card = document.getElementById('interactive-card');
  const visualization = document.getElementById('visualization');
  const runCmd1 = document.getElementById('run-cmd1');
  const runCmd2 = document.getElementById('run-cmd2');
  const statusCmd1 = document.getElementById('status-cmd1');
  const statusCmd2 = document.getElementById('status-cmd2');
  const execAnim1 = document.getElementById('exec-anim-1');
  const execAnim2 = document.getElementById('exec-anim-2');

  // Exit early if visualization elements don't exist on this page
  if (!visualization || !card) return;

  // Color clusters for UMAP visualization
  const colorClusters = [
    { color: '#4285F4', count: 14, name: 'Cluster A' },
    { color: '#34A853', count: 12, name: 'Cluster B' },
    { color: '#FBBC05', count: 10, name: 'Cluster C' },
    { color: '#EA4335', count: 8, name: 'Cluster D' },
    { color: '#FF00FF', count: 11, name: 'Cluster E' },
    { color: '#00BCD4', count: 9, name: 'Cluster F' },
    { color: '#9C27B0', count: 7, name: 'Cluster G' },
    { color: '#FF9800', count: 13, name: 'Cluster H' }
  ];

  // 3D tilt effect
  const MAX_ROTATION = 2;

  document.addEventListener('mousemove', function(e) {
    const headerRect = document.querySelector('.demo-header').getBoundingClientRect();
    const vizRect = visualization.getBoundingClientRect();
    
    // Don't apply 3D transform when hovering over header or visualization
    if ((e.clientY >= headerRect.top && e.clientY <= headerRect.bottom &&
        e.clientX >= headerRect.left && e.clientX <= headerRect.right) ||
        (e.clientY >= vizRect.top && e.clientY <= vizRect.bottom &&
        e.clientX >= vizRect.left && e.clientX <= vizRect.right)) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      return;
    }

    const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

    const xRotation = Math.max(Math.min(yAxis, MAX_ROTATION), -MAX_ROTATION);
    const yRotation = Math.max(Math.min(-xAxis, MAX_ROTATION), -MAX_ROTATION);

    if (Math.abs(xRotation) < 0.2 && Math.abs(yRotation) < 0.2) {
      return;
    }

    card.style.transition = "transform 0.3s ease-out";
    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  });

  document.addEventListener('mouseleave', function() {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  function generateUMAP() {
    visualization.querySelectorAll('.dot').forEach(dot => dot.remove());

    const width = visualization.clientWidth;
    const height = visualization.clientHeight;

    colorClusters.forEach(cluster => {
      const centerX = Math.random() * 0.6 * width + 0.2 * width;
      const centerY = Math.random() * 0.6 * height + 0.2 * height;

      for (let i = 0; i < cluster.count; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.dataset.cluster = cluster.name;
        dot.dataset.color = cluster.color;

        const size = Math.floor(Math.random() * 12) + 8;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        let u = 0, v = 0;
        for (let j = 0; j < 6; j++) {
          u += Math.random();
          v += Math.random();
        }
        u = u / 6 - 0.5;
        v = v / 6 - 0.5;

        const distance = Math.random() * 70 + 10;
        const dx = u * distance * 2;
        const dy = v * distance * 2;
        const x = centerX + dx;
        const y = centerY + dy;

        const safeX = Math.min(Math.max(size, x), width - size);
        const safeY = Math.min(Math.max(size, y), height - size);

        dot.style.left = `${safeX}px`;
        dot.style.top = `${safeY}px`;
        dot.style.backgroundColor = cluster.color;

        visualization.appendChild(dot);

        const dataPoint = Math.floor(Math.random() * 1000);
        dot.dataset.id = `point-${dataPoint}`;

        setTimeout(() => {
          dot.style.transform = 'scale(1)';
          dot.style.opacity = '1';
        }, i * 50 + Math.random() * 200);
      }
    });

    setupDotInteractions();
  }

  function setupDotInteractions() {
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
      dot.addEventListener('mouseenter', function(e) {
        const thisColor = this.dataset.color;

        dots.forEach(otherDot => {
          if (otherDot.dataset.color === thisColor) {
            otherDot.style.transform = 'scale(1.4)';
            otherDot.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
            otherDot.style.zIndex = '5';
          } else {
            otherDot.style.opacity = '0.4';
          }
        });
      });

      dot.addEventListener('mouseleave', function() {
        dots.forEach(otherDot => {
          otherDot.style.transform = 'scale(1)';
          otherDot.style.opacity = '1';
          otherDot.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
          otherDot.style.zIndex = '1';
        });
      });

      dot.addEventListener('click', function() {
        const thisColor = this.dataset.color;
        let clusterDots = [];

        dots.forEach(otherDot => {
          if (otherDot.dataset.color === thisColor) {
            clusterDots.push(otherDot);
          }
        });

        clusterDots.forEach((dot, i) => {
          dot.classList.add('animation-pulse');

          setTimeout(() => {
            dot.classList.remove('animation-pulse');
          }, 1500);
        });
      });
    });
  }

  // These are divs, not buttons, so the keyboard behaviour has to be added by hand.
  [runCmd1, runCmd2].forEach(function(control) {
    control.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        control.click();
      }
    });
  });

  runCmd1.addEventListener('click', function() {
    statusCmd1.style.width = '0';
    execAnim1.style.width = '0';

    setTimeout(() => {
      execAnim1.style.width = '100%';
    }, 50);

    setTimeout(() => {
      statusCmd1.style.width = '100%';
      runCmd1.style.backgroundColor = '#34A853';

      setTimeout(() => {
        runCmd1.style.backgroundColor = '';
      }, 2000);
    }, 800);
  });

  runCmd2.addEventListener('click', function() {
    statusCmd2.style.width = '0';
    execAnim2.style.width = '0';

    setTimeout(() => {
      execAnim2.style.width = '100%';
    }, 50);

    visualization.querySelectorAll('.dot').forEach(dot => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0)';
    });

    setTimeout(() => {
      generateUMAP();

      statusCmd2.style.width = '100%';
      runCmd2.style.backgroundColor = '#34A853';

      setTimeout(() => {
        runCmd2.style.backgroundColor = '';
      }, 2000);
    }, 1200);
  });

  // Initial generation
  generateUMAP();

  // Responsive regeneration
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateUMAP, 250);
  });
}


function initSearch() {
  const openButton = document.getElementById('search-open')
  const overlay = document.getElementById('search-overlay')
  const dialog = document.getElementById('search-dialog')
  const input = document.getElementById('search-input')
  const status = document.getElementById('search-status')
  const results = document.getElementById('search-results')
  const closeButton = document.getElementById('search-close')
  if (!openButton || !overlay) return

  let pagefindPromise = null
  let lastQuery = ''
  let selected = -1
  let debounce

  let entitiesPromise = null

  function loadEntities() {
    if (!entitiesPromise) {
      entitiesPromise = fetch('/search-entities.json')
        .then(response => response.json())
        .catch(() => [])
    }
    return entitiesPromise
  }

  function matchEntities(entities, query) {
    const terms = normalise(query)
    if (!terms.length) return []
    return entities
      .map(entity => {
        const name = entity.name.toLowerCase()
        const words = normalise(entity.name)
        let rank = -1
        if (name === query.toLowerCase()) rank = 0
        else if (name.startsWith(query.toLowerCase())) rank = 1
        else if (terms.every(term => words.some(word => word.startsWith(term)))) rank = 2
        return { entity, rank }
      })
      .filter(scored => scored.rank >= 0)
      .sort((a, b) => a.rank - b.rank || a.entity.name.length - b.entity.name.length)
      .slice(0, 3)
      .map(scored => scored.entity)
  }

  // Memoises the promise, not the module: two concurrent init() calls never resolve.
  function loadPagefind() {
    if (!pagefindPromise) {
      pagefindPromise = (async () => {
        const engine = await import('/pagefind/pagefind.js')
        await engine.options({ excerptLength: 25 })
        await engine.init()
        return engine
      })().catch(() => {
        // The index is written after `hugo` by `npx pagefind`.
        status.textContent = 'Search index unavailable. Run `npx pagefind --site public` after building.'
        return null
      })
    }
    return pagefindPromise
  }

  function open() {
    overlay.hidden = false
    document.body.style.overflow = 'hidden'
    input.focus()
    input.select()
    loadPagefind()
  }

  function close() {
    overlay.hidden = true
    document.body.style.overflow = ''
    openButton.focus()
  }

  function setSelected(next) {
    const items = results.querySelectorAll('a')
    if (!items.length) return
    if (selected >= 0 && items[selected]) items[selected].removeAttribute('aria-selected')
    selected = (next + items.length) % items.length
    items[selected].setAttribute('aria-selected', 'true')
    items[selected].scrollIntoView({ block: 'nearest' })
  }

  // Pagefind matches when an indexed word is a prefix of the search term, so
  // "xylophone" comes back matching "x" on seventeen pages.
  function relevant(hit) {
    const terms = normalise(lastQuery)
    if (!terms.length) return true
    const matched = [...hit.excerpt.matchAll(/<mark>(.*?)<\/mark>/g)].flatMap(m => normalise(m[1]))
    return terms.some(term => matched.some(word => word.startsWith(term)))
  }

  // Both sides must be split the same way, or "rapids-singlecell" fails to match itself.
  function normalise(text) {
    return text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(word => word.length > 1)
  }

  async function render(query) {
    if (query === lastQuery) return
    lastQuery = query
    selected = -1

    if (query.length < 2) {
      results.innerHTML = ''
      status.textContent = ''
      return
    }

    const pinned = matchEntities(await loadEntities(), query)
    if (query !== lastQuery) return

    const engine = await loadPagefind()
    if (!engine) return

    status.textContent = 'Searching…'
    const search = await engine.search(query)
    if (query !== lastQuery) return

    const candidates = await Promise.all(search.results.slice(0, 30).map(result => result.data()))
    if (query !== lastQuery) return

    const top = candidates.filter(relevant).slice(0, 12)

    results.innerHTML = ''
    if (!top.length && !pinned.length) {
      status.textContent = `No results for “${query}”`
      return
    }
    const total = top.length + pinned.length
    status.textContent = `${total} result${total === 1 ? '' : 's'}`

    pinned.forEach(entity => {
      const item = document.createElement('li')
      const link = document.createElement('a')
      link.href = entity.url
      link.target = '_blank'
      link.rel = 'noopener'
      link.className = 'search-result-entity'
      link.innerHTML =
        '<span class="search-result-title"></span> <span class="search-result-kind"></span>' +
        '<span class="search-result-excerpt"></span>'
      link.querySelector('.search-result-title').textContent = entity.name
      link.querySelector('.search-result-kind').textContent = entity.kind
      link.querySelector('.search-result-excerpt').textContent = entity.detail
      item.appendChild(link)
      results.appendChild(item)
    })

    top.forEach(hit => {
      const item = document.createElement('li')
      const link = document.createElement('a')
      link.href = hit.url
      link.innerHTML =
        '<span class="search-result-title"></span> <span class="search-result-url"></span>' +
        '<span class="search-result-excerpt"></span>'
      link.querySelector('.search-result-title').textContent = hit.meta.title || hit.url
      link.querySelector('.search-result-url').textContent = hit.url
      link.querySelector('.search-result-excerpt').innerHTML = hit.excerpt
      item.appendChild(link)
      results.appendChild(item)
    })
  }

  openButton.addEventListener('click', open)
  closeButton.addEventListener('click', close)

  overlay.addEventListener('mousedown', event => {
    if (!dialog.contains(event.target)) close()
  })

  input.addEventListener('input', () => {
    clearTimeout(debounce)
    debounce = setTimeout(() => render(input.value.trim()), 150)
  })

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected(selected + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected(selected - 1)
    } else if (event.key === 'Enter') {
      const items = results.querySelectorAll('a')
      if (selected >= 0 && items[selected]) {
        event.preventDefault()
        items[selected].click()
      }
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog while it is open.
      const focusable = dialog.querySelectorAll('input, button, a')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.hidden) {
      close()
    } else if (overlay.hidden && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key === 'k'))) {
      const tag = document.activeElement && document.activeElement.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      event.preventDefault()
      open()
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initEcosystemRegistry()

  const tutorialFilter = document.querySelector('#tutorial-filter')
  if (tutorialFilter) {
    tutorialFilter.addEventListener('input', filterTutorials)
  }

  initTableOfContents()

  initSearch()

  // Initialize interactive visualization if on home page
  initInteractiveViz()
})
