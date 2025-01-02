const menu = document.querySelector('.main-menu');
const craps = document.querySelector('.craps');

const audio = document.getElementById('bg-music');

function openCraps() {
    audio.play();

    setTimeout(() => {
        menu.style.display = 'none';
        craps.style.display = 'block';
    }, 1700)
}

const rollBtn = document.querySelector('.craps__roll-btn');

const bet1Caption = document.querySelector('.player__bet1');
const bet2Caption = document.querySelector('.player__bet2');

const balance1Caption = document.querySelector('.player1__balance');
const balance2Caption = document.querySelector('.player2__balance');

const bank = document.querySelector('.craps__bank');

const winnerStatus = document.querySelector('.craps__winner-caption');

let balance1 = 0;
let balance2 = 0;

let bet1 = 0;
let bet2 = 0;

let cubesf = [];
let cubess = [];

for(let i = 1; i < 7; i++) {
    cubesf.push(document.getElementById(`f${i}`));
    cubess.push(document.getElementById(`s${i}`));
}

function rollDice() {
    startGame();
    makeBet();

    rollBtn.onclick = function() {
        
        for(let i = 0; i < 6; i++) {
            cubesf[i].style.display = 'none';
            cubess[i].style.display = 'none';
        }
        
        let firstCube = randomDice();
        let secondCube = randomDice();
    
        cubesf[firstCube - 1].style.display = 'block';
        cubess[secondCube - 1].style.display = 'block';
    
        let sum = firstCube + secondCube;
        setTimeout(() => {
            
            if(sum == 2 || 
                sum == 3 ||
                sum == 12
            ) {
                lose();
                return;
            } else if(sum == 7 ||
                    sum == 11
            ) {
                win();
                return;
            } else {
                alert('Внимание: ваша цель - выбить такое же число, при выпадении 7 вы проиграете');
                
                rollBtn.onclick = function() {


                    for(let i = 0; i < 6; i++) {
                        cubesf[i].style.display = 'none';
                        cubess[i].style.display = 'none';
                    }
                    
                    firstCube = randomDice();
                    secondCube = randomDice();
                
                    cubesf[firstCube - 1].style.display = 'block';
                    cubess[secondCube - 1].style.display = 'block';
                
                    let sum2 = firstCube + secondCube;

                    setTimeout(() => {

                        if(sum == sum2) {
                            win();
                            return;
                        } else if(sum2 == 7) {
                            lose()
                            return;
                        }

                    }, 50);
                }
            }
        }, 50);
    }
}

function startGame() {
    if(rollBtn.textContent != 'START GAME') {
        return;
    }

    balance1 = 1500;
    balance2 = 1500;

    makeBet();

    rollBtn.textContent = 'ROLL';
}

function makeBet() {

    if(bet1 == 0) {
        do {

            if(balance1 < 100) {
                alert("ВЫ ОБАНКРОТИЛИСЬ. ИГРА ОКОНЧЕНА");
                location.reload();

                break;
            } else if(balance2 < 100) {
                alert('ПРОТИВНИК ОБАНКРОЧЕН. ИГРА ОКОНЧЕНА');
                location.reload();

                break;
            }

            bet1 = +prompt('Поставьте ставку (от 100)', '');
            bet2 = bet1;
    
            if(balance1 < bet1) {
                alert('Недостаточно средств');
                bet1 = 0;
                continue;
            } else if(balance2 < bet1) {
                bet2 = balance2;
            }
    
        } while (!bet1 || bet1 < 100)

        balance1 -= bet1;
        balance2 -= bet2;

        bet1Caption.textContent = 'bet: ' + bet1 + "$";
        bet2Caption.textContent = 'bet: ' + bet2 + "$";

        balance1Caption.textContent = 'balance: ' + balance1 + '$';
        balance2Caption.textContent = 'balance: ' + balance2 + '$';

        bank.textContent = 'bank: ' + (bet1 + bet2) + '$';
    }
}

function randomDice() {
    return Math.floor(1 + Math.random() * 6);
}

function win() {
    alert('ВЫ ВЫИГРАЛИ')

    balance1 += (bet1 + bet2)
    bank.textContent = 'bank: 0$';
    bet1 = 0;
    bet2 = 0;
    bet1Caption.textContent = 'bet: ' + bet1 + "$";
    bet2Caption.textContent = 'bet: ' + bet2 + "$";

    balance1Caption.textContent = 'balance: ' + balance1 + '$';

    winnerStatus.textContent = 'YOU WIN';
    winnerStatus.classList.add('craps__winner-caption--won');

    rollBtn.onclick = function() {rollDice()};
}

function lose() {
    alert('ВЫ ПРОИГРАЛИ')

    balance2 += (bet1 + bet2);
    bank.textContent = 'bank: 0$';
    bet1 = 0;
    bet2 = 0;
    bet1Caption.textContent = 'bet: ' + bet1 + "$";
    bet2Caption.textContent = 'bet: ' + bet2 + "$";

    balance2Caption.textContent = 'balance: ' + balance2 + '$';

    winnerStatus.textContent = 'YOU LOSE';
    winnerStatus.classList.remove('craps__winner-caption--won');

    rollBtn.onclick = function() {rollDice()};
}

rollBtn.onclick = function() {rollDice()};