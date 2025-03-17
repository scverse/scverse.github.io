const filterPackages = () => {
  const trs = document.querySelectorAll('.eco-table-row');
  const filter = document.querySelector('#eco-filter').value;
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

// Core member hover functionality
const setupCoreMemberHovers = () => {
  // Hide all additional info boxes immediately
  const allInfoBoxes = document.querySelectorAll('.additional-info')
  allInfoBoxes.forEach(box => {
    box.style.display = 'none'
  })
  
  // Find all core members
  const coreMembers = document.querySelectorAll('.core-member')
  
  // Add event listeners for both mouse and touch events
  coreMembers.forEach(member => {
    // Mouse events
    member.addEventListener('mouseenter', function() {
      const info = this.querySelector('.additional-info')
      if (info) info.style.display = 'block'
    })
    
    member.addEventListener('mouseleave', function() {
      const info = this.querySelector('.additional-info')
      if (info) info.style.display = 'none'
    })
    
    // Touch events for mobile
    member.addEventListener('touchstart', function(e) {
      const info = this.querySelector('.additional-info')
      if (info) {
        if (info.style.display === 'block') {
          info.style.display = 'none'
        } else {
          // Hide all other info boxes
          document.querySelectorAll('.additional-info').forEach(box => {
            box.style.display = 'none'
          })
          info.style.display = 'block'
        }
      }
    }, { passive: true })
  })
  
  // Close all info boxes when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.core-member')) {
      document.querySelectorAll('.additional-info').forEach(box => {
        box.style.display = 'none'
      })
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners for filters if they exist
  const ecoFilter = document.querySelector('#eco-filter')
  if (ecoFilter) {
    ecoFilter.addEventListener('input', filterPackages)
  }
  
  const tutorialFilter = document.querySelector('#tutorial-filter')
  if (tutorialFilter) {
    tutorialFilter.addEventListener('input', filterTutorials)
  }
  
  // Setup core member hover functionality
  setupCoreMemberHovers()
})

// Run again when window loads to ensure all elements are fully rendered
window.addEventListener('load', function() {
  // Hide all info boxes again to be absolutely sure
  document.querySelectorAll('.additional-info').forEach(box => {
    box.style.display = 'none'
  })
})
