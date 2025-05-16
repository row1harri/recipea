const searchtInput = document.getElementById('search');
const results = document.getElementById('results');

searchtInput.addEventListener('input', debounce(searchRecipes, 500));

function searchRecipes(){
    //get the value from the search input
    const query = searchtInput.value.trim();
    //if there is no input then clear the results content and exit
    if(!query){
        results.innerHTML = '';
        return;
    }
    //fetch the recipes from the MealDB API using the search meal by name query
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json()) // parse the response as JSON
    .then(data => {
      results.innerHTML = ''; //clear previous results to make space
      //if no meals found then show a message and exit
      if (!data.meals) {
        results.innerHTML = '<p>No results found</p>'; 
        return;
      }
    //for each meal in the results
    data.meals.forEach(meal => {
        //create a new div for the recipe(creating a recipe element)
        const recipeEl = document.createElement('div');
        //add a class of 'recipe' to the recipe for styling in css
        recipeEl.classList.add('recipe'); 
        recipeEl.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        `;
        //add the recipe element to the results container
        results.appendChild(recipeEl);
    });
    })
    .catch(err => {
        //if there's an error then log it and show an error message
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