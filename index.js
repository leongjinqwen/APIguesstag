const list = document.getElementById('list-data');
const random1 = ['rice','pizza','france','tokyo','cat','horse','dog','tree'];
const random2 = ['italy','bird','elephant','noodles','cake','sunset','radio','flower'];
const random3 = ['ice cream','maldives','hong kong','softdrink','burger','fish','tiger','sun'];
const random4 = ['temple','england','vehicle','boat','singapore','bread','bicycle','moon'];
const reSet = document.getElementById('reset');
let randomArray = [];
const myButtons = document.getElementsByClassName('buttons');

function randomColor (){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return 'rgba(' + r + ',' + g +',' + b + ','+0.5+')'
}

// to random pick a tag from array
function pickRandom(array){
    let result = array[Math.floor(Math.random()*(array.length))];
    randomArray.push(result);
    return result;
}

function getTaggedPhotos(){ 
    fetch('https://api.tumblr.com/v2/tagged?tag='+tagName+'&api_key=M0pifK4GlKQLNxkQ4FJw76tKP4pCeOzbMeRwQdGyjVYFHWhqtq')
        .then(function(response){
            if (!response.ok){
                alert('Hey, seems like something gone wrong, please contact help at <email address>');
                return;
            }
            return response.json();
        }) 
        .then(function(result){
            if(!result){
                return;
            }
            list.innerHTML = "";
            const items = result.response;
            let masonry;
            for(let i = 0;i < items.length;i++){
                const item = items[i];
                if (item.photos != undefined){
                    const altSizes = item.photos[0].alt_sizes;
                    const imgSrc = altSizes[altSizes.length - 3].url;
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.onload = function(){
                        masonry.layout();
                    }
                    const li = document.createElement('li');
                    li.appendChild(img);
                    list.appendChild(li);
                }
            }
            masonry = new Masonry(list, {
                itemSelector: 'li',
             })
             masonry.layout();
        })
        .catch(function(err){
            alert('Hey, seems like the Tumblr API is down, please try again later.');
            console.log('message:',err);
        })
}

function setup(){
    randomArray = [];
    pickRandom(random1);
    pickRandom(random2);
    pickRandom(random3);
    pickRandom(random4);
    console.log(randomArray);
    // button to show answer
    for (let i=0;i<myButtons.length;i++){
        myButtons[i].innerHTML = randomArray[i];
        myButtons[i].style.backgroundColor = randomColor();
        myButtons[i].onclick = matchAnswer;
    }
    tagName = randomArray[Math.floor(Math.random()*(randomArray.length))];
    getTaggedPhotos();
}

setup()
getTaggedPhotos();

function matchAnswer(button){
    if (button.target.innerHTML == tagName){
        alert('You choose the correct tag!');
        setup();
    }
    else {
        alert("You choose the wrong tag! The answer is " +tagName +".");
        setup();
    }
}
