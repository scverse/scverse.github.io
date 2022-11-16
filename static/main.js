const filterPackages = () => {
  trs = document.querySelectorAll('.eco-table-entry');
  filter = document.querySelector('#eco-filter').value;
  regex = new RegExp(filter, 'i');
  function toggleTrs(tr) {
    if (regex.test(tr.innerText)) {
      tr.style.display = ""
      // tr.classList.add("grid-hiderows")
    } else {
      tr.style.display = "none"
      // tr.classList.remove("grid-hiderows")
    }
  };
  trs.forEach(toggleTrs);
}

// trs = document.querySelectorAll('.eco-table-entry');
// tr = trs[0]
// regex = new RegExp("oracle", 'i');
// function toggleTrs(tr) {
//     console.log(regex.test(tr.innerText))
//     if (regex.test(tr.innerText)) {
//       tr.classList.add("grid-hiderows")
//       console.log("hid")
//     } else {
//       tr.classList.remove("grid-hiderows")
//       console.log("revealed")
//     }
// }
// toggleTrs2 = (tr) => {
//     console.log(regex.test(tr.innerText))
//     // if (pkgFound([...tr.children])) {
//     if (regex.test(tr.innerText)) {
//       tr.classList.add("grid-hiderows")
//     } else {
//       tr.classList.remove("grid-hiderows")
//     }
//   };


// const filterPackages = () => {
//   const trs = document.querySelectorAll('.eco-table-entry');
//   console.log(trs)
//   const filter = document.querySelector('#eco-filter').value;
//   const regex = new RegExp(filter, 'i');
//   function pkgFound(childrenArr) { return childrenArr.some(td => regex.test(td.innerHTML)) };
//   const toggleTrs = ({ style, children }) => {
//     console.log(children.length)
//     console.log(pkgFound([...children]))
//     style.display = pkgFound([
//       ...children
//     ]) ? '' : 'none' ;
//     console.log(style)
//   };
//   trs.forEach(toggleTrs);
// }
