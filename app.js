const searchtInput = document.getElementById('search');
const results = document.getElementById('results');

searchtInput.addEventListener('input', debounce(searchRecipes, 500));

function searchRecipes(){
    const query = searchtInput.value.trim();
    if(!query){
        results.innerHTML = '';
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      results.innerHTML = '';
      if (!data.meals) {
        results.innerHTML = '<p>No results found</p>';
        return;
      }

    data.meals.forEach(meal => {
        const recipeEl = document.createElement('div');
        recipeEl.classList.add('recipe');
        recipeEl.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        `;
        results.appendChild(recipeEl);
    });
    })
    .catch(err => {
        console.error(err);
        results.innerHTML ='<p>Error fetching recipes</p>';
    });

}

//Debounce function from line 4 to limit API calls so that the app doesn't keep doing multiple calls whilst a key is being pressed down during search
function debounce(func, delay){
    let timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}