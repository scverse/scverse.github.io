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
