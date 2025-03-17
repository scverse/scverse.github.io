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

const setupCoreMemberHovers = () => {
 // Convert email text to mailto links
 const emailElements = document.querySelectorAll('.additional-info p:nth-child(2)')
 emailElements.forEach(element => {
   const emailText = element.textContent.trim()
   if (emailText && emailText.includes('@')) {
     element.innerHTML = `<a href="mailto:${emailText}" class="email-link">${emailText}</a>`
   }
 })

  // Hide all additional info boxes immediately
  const allInfoBoxes = document.querySelectorAll('.additional-info')
  allInfoBoxes.forEach(box => {
    box.style.display = 'none'
    box.addEventListener('mousedown', e => {
      e.stopPropagation()
    })
  })
  
  const coreMembers = document.querySelectorAll('.core-member')
  
  // Add event listeners for both mouse and touch events
  coreMembers.forEach(member => {
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
          document.querySelectorAll('.additional-info').forEach(box => {
            box.style.display = 'none'
          })
          info.style.display = 'block'
        }
      }
    }, { passive: true })
  })

   // Email links should prevent closing the info box when clicked
   document.querySelectorAll('.email-link').forEach(link => {
    link.addEventListener('click', e => {
      e.stopPropagation()
    })
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
  
  setupCoreMemberHovers()
})
