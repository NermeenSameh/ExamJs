
new WOW().init();
let allCatsList;
let allSearchName;
let allAreaList;
let allIngList;
let allGetMain;

$(document).ready(function(){
    $(".loadScreen").fadeOut(3000) ;
    $("body").css("overflow", "visible")
})

// window.onload = function () {
//     $(".loadScreen").fadeOut(500);
//     $("body").css("overflow", "visible");
// };

$(".fa-bars").click(function () {

    $(".sliderBar").animate({ left: '0px' }, 500);
    $(".fa-bars").css({ display: `none` }, 200);
    $(".fa-x").css({ display: `block` }, 200)
    $(".closeSliderBar").animate({ marginLeft: '250px' }, 500)
})

$(".fa-x").click(function () {
    closeSideBar();
})

function closeSideBar() {
    $(".sliderBar").animate({ left: '-250px' }, 500);
    $(".fa-x").css({ display: `none` }, 200);
    $(".fa-bars").css({ display: `block` }, 200)
    $(".closeSliderBar").animate({ marginLeft: '0px' }, 500)
}

$("#searchId").click(function () {

    $("#searchContainer").css({ display: `block` }, 200);
    $(".content").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);
    closeSideBar();

})

$("#contactId").click(function () {
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `flex` }, 200);
    $(".content").css({ display: `none` }, 200);
    closeSideBar();
})
//get main
async function getMain() {
    $(".content").css({ display: `block` }, 200);
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);
    closeSideBar();

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    allGetMain = await response.json();
    dissplayMain(allGetMain.meals);
}

function dissplayMain(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
            <div class="col-md-3 g-4">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden  rounded-2 cursor-pointer">
                  <a><img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset=""></a>
                    <div class="layer position-absolute text-center start-0 end-0 rounded-2 text-black p-2 d-flex justify-content-start align-items-center">
                        <h3 >${arr[i].strMeal}</h3>
                
                    </div>
                </div>
            </div>`
    }
    document.querySelector(".rowContent").innerHTML = content;
}
getMain();

//get catagery
async function getCat() {
    $(".content").css({ display: `block` }, 200);
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);
    closeSideBar();

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    allCatsList = await response.json();
    displayCats(allCatsList.categories);
}

function displayCats(arr) {
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
            <div class="col-md-3">
                <div onclick="getSelectedCat('${arr[i].strCategory}')" class="meal position-relative overflow-hidden  rounded-2 cursor-pointer">
                  <a><img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset=""></a>
                    <div class="layer position-absolute text-center start-0 end-0 rounded-2 text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    document.querySelector(".rowContent").innerHTML = content;
}

async function getSelectedCat(str) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${str}`);
    allCatsList = await response.json();
    arr = allCatsList.meals;

    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
            <div class="col-md-3 g-5">
                <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden  rounded-2 cursor-pointer">
                  <a><img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset=""></a>
                    <div class="layer position-absolute text-center start-0 end-0 rounded-2 text-black p-2 d-flex justify-content-start align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `
    }
    document.querySelector(".rowContent").innerHTML = content;
}

async function getMealDetails(mealID) {
    $(".content").css({ display: `block` }, 200);
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    allCatsList = await response.json();
    arr = allCatsList.meals;
    let content = "";
    content += `
    <div class="col-md-4 py-5">
    <img class="w-100" src="${arr[0].strMealThumb}" alt="">
    <h2>${arr[0].strMeal}</h2>
</div>
<div class="col-md-8 py-5">
<h2>Instructions</h2>
 <p>${arr[0].strInstructions}</p>
    <h3>Area : ${arr[0].strArea}</h3>
    <h3>Category : ${arr[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    `;
    for (let i = 1; i <= 20; i++) {
        if (arr[0][`strIngredient${i}`]) {
            content += `<li class="alert alert-info m-2 p-1">${arr[0][`strMeasure${i}`]} ${arr[0][`strIngredient${i}`]}</li>`
        }
    }

    content += `</ul>
    <h3>Tags : </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap ">`;
    let tags = arr[0].strTags?.split(",")
    if (!tags) tags = []

    for (let i = 0; i < tags.length; i++) {
        content += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    content += ` </ul>
    <a href="${arr[0].strSource}" target="_blank"class="btn btn-success">Source</a>
    <a href="${arr[0].strYoutube}" target="_blank"class="btn btn-danger">Youtube</a>
</div>
            `
    document.querySelector(".rowContent").innerHTML = content;

}
//Search By name
async function searchByName(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let allSearchName = await response.json();
    let content = "";
    arr = allSearchName.meals;
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
</div> `
    }
    document.querySelector(".searchRow").innerHTML = content;
}
//Search By latter
async function searchByLetter(letter) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let allSearchLetter = await response.json();
    let content = "";
    for (let i = 0; i < allSearchLetter.meals.length; i++) {
        content += `
     <div class="col-md-3">
     <div onclick="getMealDetails('${allSearchLetter.meals[i].idMeal}')" class="meal rounded-2 cursor-pointer catImg overflow-hidden position-relative">
      <img class="w-100" src="${allSearchLetter.meals[i].strMealThumb}" alt="" srcset="">
       <div class="layer  bg-white position-absolute  start-0 end-0  text-center rounded-2 d-flex justify-content-start align-items-center">
             <h3 class="text-black text-center">${allSearchLetter.meals[i].strMeal}</h3>
         </div>
     </div>
 </div>`
    }
    document.querySelector(".searchRow").innerHTML = content;
}
//get Area
async function getArea() {
    $(".content").css({ display: `block` }, 200);
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    allAreaList = await response.json();
    displayArea(allAreaList.meals);
    closeSideBar();
}

function displayArea(arr) {
    let content = "";
    closeSideBar();
    for (let i = 0; i < allAreaList.meals.length; i++) {
        content += `
        <div onclick="getSelectedArea('${arr[i].strArea}')"  class="col-md-2 offset-md-1 g-5">
        <div>
        <i  id="iconArea"class="fa-solid fa-house-laptop text-white fa-3x"></i>
        <h3>${allAreaList.meals[i].strArea}</h3>
    </div>
</div>`
    }
    document.querySelector(".rowContent").innerHTML = content;

}

async function getSelectedArea(str) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${str}`);
    allAreaList = await response.json();
    arr = allAreaList.meals;

    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
            <div class="col-md-3 g-5">
                <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden  rounded-2 cursor-pointer">
                  <a><img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset=""></a>
                    <div class="layer position-absolute text-center start-0 end-0 rounded-2 text-black p-2 d-flex justify-content-start align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `
    }
    document.querySelector(".rowContent").innerHTML = content;
}
//get Ingredients
async function getIngredients() {
    $(".content").css({ display: `block` }, 200);
    $("#searchContainer").css({ display: `none` }, 200);
    $(".contactDiv").css({ display: `none` }, 200);
    closeSideBar();

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    allIngList = await response.json();
    displayIng(allIngList.meals.slice(0, 20));

}
function displayIng(arr) {

    let content = "";
    closeSideBar();
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div onclick="getSelectedIng('${arr[i].strIngredient}')"  class="col-md-3  g-5">
        <div class="text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3 class="text-center">${arr[i].strIngredient}</h3>
        <p > ${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
</div>`
    }
    document.querySelector(".rowContent").innerHTML = content;
}

async function getSelectedIng(ingredients) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    arr = response.meals.slice(0, 20);
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
            <div class="col-md-3 g-5">
                <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden  rounded-2 cursor-pointer">
                  <a><img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset=""></a>
                    <div class="layer position-absolute text-center start-0 end-0 rounded-2 text-black p-2 d-flex justify-content-start align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `
    }
    document.querySelector(".rowContent").innerHTML = content;
}

//validation
function validateName() {
    if ((/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        return true;
    }
    else {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        return false;
    }

}

function validateEmail() {
    if ((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))) {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        return false;
    }
}

function phoneValidation() {
    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value)) {
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        return false;
    }
}

function ageValidation() {
    if ((/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))) {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        return false;
    }
}

function passwordValidation() {
    if ((/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))) {
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        return false;
    }
}

function repasswordValidation() {
    if (((document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value))) {
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        return false;
    }
}

function inputsValidation() {
    let submitBtn = document.getElementById("submitBtn")

    if (validateName() &&
        validateEmail() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
