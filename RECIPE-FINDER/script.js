const searchInput=document.getElementById("search-input");
const searchBtn=document.getElementById("search-btn")
const mealsContainer=document.getElementById("meals");
const resultHeading=document.getElementById("result-heading")
const errorContainer=document.getElementById("error-container")
const mealDetails=document.getElementById("meals-details");           
const mealDetailsContent=document.querySelector(".meal-detail-content");
const backBtn=document.getElementById("back-btn")

const BASE_URL="https://www.themealdb.com/api/json/v1/1/"
const SEARCH_URL=`${BASE_URL}search.php?s=`
const LOOKUP_URL=`${BASE_URL}lookup.php?i=`

searchBtn.addEventListener("click",searchMeals)
mealsContainer.addEventListener("click",handleMealClick);

backBtn.addEventListener("click",()=>mealDetails.classList.add("hidden"));

searchInput.addEventListener("keypress",(e)=>{
    if (e.key==="Enter") searchMeals()
})

async function searchMeals(){
    const searchTerm=searchInput.value.trim()

    if(!searchTerm){
        errorContainer.textContent="Please enter a search term"  
        errorContainer.classList.remove("hidden");
        return;
    }

    try{
        resultHeading.textContent=`Searching for "${searchTerm}"...`
        mealsContainer.innerHTML="";
        errorContainer.classList.add("hidden");

        const response=await fetch(`${SEARCH_URL}${searchTerm}`)
        const data=await response.json(); 

        if(!data.meals){  
            resultHeading.textContent=``
            mealsContainer.innerHTML="";
            errorContainer.textContent=`No recipes found for "${searchTerm}". Try another search term!`
            errorContainer.classList.remove("hidden");
        }
        else{
            resultHeading.textContent=`Search results for "${searchTerm}":`
            displayMeals(data.meals);
            searchInput.value="";
        }
    }
    catch{
        errorContainer.textContent="Something went wrong. Please try again later"
        errorContainer.classList.remove("hidden");
    }
}

function displayMeals(meals){
    mealsContainer.innerHTML="";

    meals.forEach(meal=>{
        mealsContainer.innerHTML+= `
            <div class="meal" data-meal-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info">
                    <h3 class="meal-title">${meal.strMeal}</h3>
                    ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
                </div>
            </div>`;
    });
}

async function handleMealClick(e){                      
    const mealEl=e.target.closest(".meal");
    if(!mealEl){
        return;
    }
    const mealId=mealEl.getAttribute("data-meal-id");
 
    try{
        const response=await fetch(`${LOOKUP_URL}${mealId}`);
        const data=await response.json();
 
        if(data.meals && data.meals[0]){
            const meal=data.meals[0]
 
            const ingredients=[]                          
 
            for(let i=1;i<=20;i++){
                if(meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !==""){
                    ingredients.push({
                        ingredient: meal[`strIngredient${i}`],
                        measure: meal[`strMeasure${i}`]
                    })
                }
            }
 
            mealDetailsContent.innerHTML=`
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(item => `<li>${item.measure} ${item.ingredient}</li>`).join("")}
                </ul>
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
            `;                                          
 
            mealDetails.classList.remove("hidden");
            mealDetails.scrollIntoView({behavior: "smooth"}); 
        }
        else{
            errorContainer.textContent="Could not load recipe details. Please try again later."
            errorContainer.classList.remove("hidden");
        }
    }
    catch(error){                                     
        errorContainer.textContent="Could not load recipe details. Please try again later."
        errorContainer.classList.remove("hidden");
    }
}
 
mealsContainer.addEventListener("click",handleMealClick);
