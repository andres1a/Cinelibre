const arrows = document.querySelectorAll('.arrow');
const movieLists = document.querySelectorAll('.movie-list');

arrows.forEach((arrow,i) => {
    arrow.addEventListener('click',()=>{
        movieLists[i].style.transform = "translateX(-100px)";
    })
});