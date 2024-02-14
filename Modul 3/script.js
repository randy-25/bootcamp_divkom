const start_btn = document.getElementById('start-button');

const form = document.getElementById('form-name');

start_btn.addEventListener('click', ()=> {
    start_btn.style.display = 'none';
    form.style.display = 'flex';
})

let name_box = document.getElementById('fname');

const submit_btn = document.getElementById('submit-button');

const rolling_part = document.getElementById('rolling-part');
const rolling_btn = document.getElementById('roll');

let name;

submit_btn.addEventListener("click", () =>{
    name = name_box.value;
    if (name.length == 0){
        alert("Please Enter Your Name!");
    }else{
        form.style.display = 'none';
        rolling_part.style.display = 'flex';
    }  
})

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const rollDice = () => getRandomNumber(1,6);

function rollingDie() {
    let player_part, bot_part;
    player_part = rollDice();
    bot_part = rollDice();

    document.getElementById('player-roll').innerHTML = name + ' get ' + player_part;
    document.getElementById('bot-roll').innerHTML = 'Computer get ' + bot_part;

    if (player_part > bot_part){
        document.getElementById('result').innerHTML = "You Win";
    }else if(player_part < bot_part){
        document.getElementById('result').innerHTML = "You Lose";
    }else {
        document.getElementById('result').innerHTML = "Tie";
    }
}


