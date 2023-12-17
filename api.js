'use strict'
let search_input = document.querySelector('#search_input');
let search_button = document.querySelector('#search_button');
let tooling = document.querySelector('#tooling');
let display_dom = document.querySelector('#display');
let display_image = document.querySelector('#display_image');
let image_div = document.querySelector('#image_div');
let timing = document.querySelector('#timing');
let serving = document.querySelector('#serving');
let duration_header = document.querySelector('#duration_header');
let div1 = document.querySelector('#div1');
let div2 = document.querySelector('#div2');
let ingredient = document.querySelector('#ingredient');
let heading_div = document.querySelector('#heading_div');
let source = document.querySelector('#source');
let source_para = document.querySelector('#source_para');
let source_a = document.querySelector('#source_a');
let increase = document.querySelector('#increase');
let decrease = document.querySelector('#decrease');
let title = document.querySelector('#title');
let inside_title = document.querySelector('#inside_title');
let add_recepie = document.querySelector('#add_recepie');
let main_div = document.querySelector('#main_div');
let modal = document.querySelector('#modal')

let temp = 0;
let data1; // for putting the api data
let d1;
let i; //for iteration of loop
let mystr = ""; //for checking the limit of string
let recepie_id;
let present_recepie;
let initial_num = 4
let global_recepie_id;
let arr = []

let serving_num = document.querySelector('#serving_num').innerHTML = initial_num;
increase.addEventListener('click', increase_serv);
decrease.addEventListener('click', decrease_serv);
add_recepie.addEventListener('click', show_modal);

function searching() {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search_input.value}`).then(function (response) {
        return response.json();
    }).then(function (data) {

        data1 = data;
        if (tooling.innerHTML == "") {
            for (i = 1; i < data.data.recipes.length; i++) {

                //checking recepie title length
                if (data.data.recipes[i].title.length > 24) {
                    mystr = data.data.recipes[i].title.substring(0, 25) + "....."
                }
                else {
                    mystr = data.data.recipes[i].title
                }

                //creating div dynamically
                global_recepie_id = i;
                console.log(i);
                let tooling_div = `<div id=${i} onclick="display(${i}); telling_i(${i})" style="display: flex;align-items: center; margin: 20px 0px 20px 0px; ">
                <img src="${data.data.recipes[i].image_url}"
                alt="" height="58" width="58" style="border-radius: 100%; margin: 10px 15px;">
                <span style="color: rgb(255, 68, 0);">${mystr}<div style="color:black;">${data.data.recipes[i].publisher}</div></span>
                </div>`
                tooling.innerHTML += tooling_div;
            }
        }
        else {
            tooling.innerHTML = "";
            for (i = 1; i < data.data.recipes.length; i++) {


                //checking recepie title length
                if (data.data.recipes[i].title.length > 24) {
                    mystr = data.data.recipes[i].title.substring(0, 25) + "....."
                }
                else {
                    mystr = data.data.recipes[i].title
                }

                //creating div dynamically
                let tooling_div = `<div onclick="display(${i}); telling_i(${i})" style="display: flex;align-items: center; margin: 20px 0px 20px 0px; ">
            <img src="${data.data.recipes[i].image_url}"
                alt="" height="58" width="58" style="border-radius: 100%; margin: 10px 15px;">
            <span style="color: rgb(255, 68, 0);">${mystr}<div style="color:black;">${data.data.recipes[i].publisher}</div></span>
            </div>`
                tooling.innerHTML += tooling_div;
            }
        }

    }).catch(err => alert(err));
}

search_button.addEventListener('click', searching)

function display(num) {
    document.querySelector('#greetings').style.display = "none";
    display_image.style.display = "inline-block";
    display_image.style.margin = "0px"
    display_image.src = data1.data.recipes[num].image_url;
    image_div.style.background = 'linear-gradient(to right bottom, #fbdb89, #f48982)';
    recepie_id = data1.data.recipes[num].id;
    duration_header.style.visibility = 'visible';

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recepie_id}`).then(function (response) {
        return response.json();
    }).then(function (second_data) {
        console.log(second_data);
        inside_title.innerHTML = second_data.data.recipe.title;
        title.style.visibility = 'visible';
        d1 = second_data;
        timing.innerHTML = `${second_data.data.recipe.cooking_time} Minutes`;
        if (div1.innerHTML == '' && div2.innerHTML == '') {
            heading_div.style.display = 'block';
            for (i = 0; i < second_data.data.recipe.ingredients.length; i++) {
                if (i % 2 == 0) {
                    if (second_data.data.recipe.ingredients[i].quantity != null) {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/><span>${(1 / second_data.data.recipe.ingredients[i].quantity * initial_num).toFixed(1)}</span> ${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div1.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;

                    }
                    else {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/> ${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div1.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px'
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                }
                else {
                    if (second_data.data.recipe.ingredients[i].quantity != null) {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/><span>${(1 / second_data.data.recipe.ingredients[i].quantity * initial_num).toFixed(1)}</span> ${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div2.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px'
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                    else {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/>${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div2.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                }
            }
        }
        else {
            div1.innerHTML = '';
            div2.innerHTML = '';
            heading_div.style.display = 'block';
            for (i = 0; i < second_data.data.recipe.ingredients.length; i++) {
                if (i % 2 == 0) {
                    if (second_data.data.recipe.ingredients[i].quantity != null) {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/><span>${(1 / second_data.data.recipe.ingredients[i].quantity * initial_num).toFixed(1)}</span> ${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div1.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                    else {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/>${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div1.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                }
                else {
                    if (second_data.data.recipe.ingredients[i].quantity != null) {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/><span>${(1 / second_data.data.recipe.ingredients[i].quantity * initial_num).toFixed(1)}<span> ${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div2.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                    else {
                        let ingr_div = `<div style="font-size:1.1em; height: 50px;"> <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FD7E14/checkmark--v1.png" alt="checkmark--v1"/>${second_data.data.recipe.ingredients[i].unit} ${second_data.data.recipe.ingredients[i].description}</div>`
                        div2.innerHTML += ingr_div;
                        let t_height = tooling.clientHeight;
                        let d_height = display_dom.clientHeight;
                        document.querySelector('#tooling').style.height = d_height + 'px';
                        source_para.innerHTML = `This Recepie was carefully designed and tested by <b>${second_data.data.recipe.publisher}</b>. Please check out direction at their website.`;
                        source_a.href = `${second_data.data.recipe.source_url}`;
                        source.style.display = 'block';
                        present_recepie = second_data.data.recipe.ingredients[i].quantity;
                    }
                }
            }
        }
    }).catch(err => alert(err));
}

function increase_serv() {
    initial_num += 1
    serving_num = document.querySelector('#serving_num').innerHTML = initial_num;
    display(global_recepie_id);
}
function decrease_serv() {
    if (initial_num > 1) {
        initial_num -= 1
        serving_num = document.querySelector('#serving_num').innerHTML = initial_num;
        display(global_recepie_id);
    }
}
function telling_i(num) {
    global_recepie_id = num
    initial_num = 4
    serving_num = document.querySelector('#serving_num').innerHTML = initial_num;
}
function bookmark_content() {
    let str;
    let e = document.querySelector(`#empty`)

    if (e) {
        e.parentNode.removeChild(e)
    }
    if (data1.data.recipes[global_recepie_id].title.length > 24) {
        str = data1.data.recipes[global_recepie_id].title.substring(0, 25) + "....."
    }
    else {
        str = data1.data.recipes[global_recepie_id].title
    }
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == data1.data.recipes[global_recepie_id].id) {
            break;
        }
    }
    if (i == arr.length) {
        let bookmark = `<div id="t${temp}" style="display: flex;align-items: center; margin: 20px 0px 20px 0px; background-color:white; margin-left:1em; margin-right:1em">
                <img src="${data1.data.recipes[global_recepie_id].image_url}"
                alt="" height="58" width="58" style="border-radius: 100%; margin: 10px 15px;">
                <span style="color: rgb(255, 68, 0);">${str}<div style="color:black;">${data1.data.recipes[global_recepie_id].publisher}</div></span>
                <div id="t${temp}" onclick="remove(this.id)" style="text-align:right; margin-left:auto; margin-right:15px;"><img style="float:right;" width="30" height="30" src="https://img.icons8.com/ios/50/FD7E14/waste.png" alt="waste"/></div>
                </div>`
        arr.push(data1.data.recipes[global_recepie_id].id)
        document.querySelector('#bookmark_div').innerHTML += bookmark;
        temp += 1;
    }

}
function show_bookmark() {
    if (document.querySelector('#bookmark_div').innerHTML == '\n\n            ' || document.querySelector("#bookmark_div").innerHTML == '') {
        let empty = `<div id="empty" style="text-align:center;color:red;font-size:1.3em;background-color: white;margin: 10px 15px;font-weight: 700;">List is empty</div>`
        document.querySelector('#bookmark_div').innerHTML = empty
    }

    if (document.querySelector('#bookmark_div').style.display == "none")
        document.querySelector('#bookmark_div').style.display = "block";
    else
        document.querySelector('#bookmark_div').style.display = "none";
}
function remove(element) {
    let t = document.querySelector(`#${element}`)
    t.parentNode.removeChild(t);
}
function key_enter(event) {
    if (event.key === 'Enter') {
        searching();
    }
}
function show_modal() {
    if (modal.style.display == "block") {
        modal.style.display = "none";
        main_div.style.filter = "blur(0px)"
    }
    else {
        modal.style.display = "block";
        main_div.style.filter = "blur(5px)"
    }

}
function recipe_upload() {
    alert("your recepie is added")
}