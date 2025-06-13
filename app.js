const arrows = document.querySelectorAll('.arrow');
const movieLists = document.querySelectorAll('.movie-list');

arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener('click', () => {
    // 1) obtenemos el estilo computado
    const style = window.getComputedStyle(movieLists[i]);
    // 2) extraemos la transform actual como DOMMatrix
    const matrix = new DOMMatrixReadOnly(style.transform);
    const currentX = matrix.m41;           // el desplazamiento X actual
    const nextX    = currentX - 300;       

    // 3) lo aplicamos de nuevo
    clickCounter++;
    if(itemNumber - (4 + clickCounter) > 0){
        movieLists[i].style.transform = `translateX(${nextX}px)`;
    } else{
       movieLists[i].style.transform = "translateX(0px)"; 
       clickCounter = 0; // Reiniciar el contador si no hay más elementos
    }
    
  });


  console.log(movieLists[i].querySelectorAll("img"))


});
