let buttons = document.querySelector(".bottom_half");

buttons.addEventListener('click', test);

function test(e) {
    console.log(e.target.value);
}