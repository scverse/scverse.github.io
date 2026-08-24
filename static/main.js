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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initEcosystemRegistry()

  const tutorialFilter = document.querySelector('#tutorial-filter')
  if (tutorialFilter) {
    tutorialFilter.addEventListener('input', filterTutorials)
  }

  initTableOfContents()

  // Initialize interactive visualization if on home page
  initInteractiveViz()
})
