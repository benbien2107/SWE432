// publish button


// check search validation
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM is ready.");
  // You can manipulate the DOM safely here.
  function searchValidation() {
    let searchType = document.getElementById("searchType");
  
    if (searchType.value.trim() === "") {
      searchType.focus();
      alert("Search cannot be empty");
      return false;
    }
    return true;
  }
  
  var form = document.querySelector("form");
  if (form)
    form.addEventListener("submit", (event) => {
      if (!searchValidation()) {
        event.preventDefault(); // Prevent form submission if validation fails.
      }
    });
  
  
});
