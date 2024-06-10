let closebtn = document.getElementById("close-btn");


  closebtn.addEventListener("click", (event) => {
   // Find the closest parent element with the class 'box'
   let box = event.target.closest('.box');
   if (box) {
       if (confirm("Are you sure you want to remove this item from your wishlist?")) {
           box.remove(); // Remove the 'box' element
       }
   }
});

 