const dialog = document.getElementById("publish-dialog");
const showButton = document.getElementById("publish-btn"); //publish-btn
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");


showButton.addEventListener("click", () => {
    dialog.showModal();
});
noButton.addEventListener("click", () => {
    dialog.close();
});
yesButton.addEventListener("click", () => {
    dialog.close();
});