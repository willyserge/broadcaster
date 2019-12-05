const modal = document.querySelector('#myModal');
const image_display = document.querySelectorAll('.img-display');
const span = document.querySelectorAll(".close")[0];

image_display.forEach((img)=>{
	img.addEventListener('click',()=>{
	modal.style.display = "block";
})
})
span.addEventListener('click',()=>{
	modal.style.display = "none";
})

window.onclick = (event)=> {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function displayAlert(){
    confirm('are you sure you want to delete this incident?')
  }