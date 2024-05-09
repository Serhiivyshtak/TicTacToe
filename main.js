// true = 'X'
// false = 'Y'

const cells = document.querySelectorAll('.playfield_cell');
let player = null;

let playsX = [];
let playsO = [];

let winner = null;

let moves = 0;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];  

let $ = (selector) => {
    return document.querySelector(selector)
}

let slideElem = (className, direction) => {
    if (direction) {
        $(`.${className}`).classList.add('slide_in');
    } else {
        $(`.${className}`).classList.remove('slide_in');
    }
}

let playerName = (boolean) => {
    if (boolean) {
        return 'X';
    } else {
        return 'O';
    }
}

let playerColor = (boolean) => {
    if (boolean) {
        return "rgb(255, 213, 0)";
    } else {
        return "rgb(89, 6, 89)";
    }
}

let changeHeading = (string) => {
    $('.player_heading').style.opacity = '0%';
    setTimeout(() => {
        $('.player_heading').innerHTML = string;
        setTimeout(() => {
            $('.player_heading').style.opacity = '100%';
        }, 250)
    }, 250)
}

let slideButtons = () => {
    slideElem('restart_button', true);
    setTimeout(() => {
        slideElem('go_to_menu_button', true);
    }, 300);
}

let cleanPlayfield = () => {
    for(everyCell of cells) {
        everyCell.innerText = '';
        everyCell.removeAttribute('disabled');
        everyCell.style.transform = 'rotateX(0deg)';
    }
    winner = null;
    moves = 0;
    playsX = [];
    playsO = [];
    slideElem('restart_button', false);
    slideElem('go_to_menu_button', false);
}

window.addEventListener('load', () => {
    slideElem('welcome_heading', true);
    setTimeout(() => {
        slideElem('welcome_button', true);
    }, 300)
});

$('.welcome_button').addEventListener('click', () => {
    player = Boolean(Math.round(Math.random()));
    slideElem('welcome_heading', false);
    setTimeout(() => {
        slideElem('welcome_button', false);
        setTimeout(() => {
            $('.welcome_background').style.opacity = '0';
            $('.player_heading').innerHTML = `Have a nice game! It's <span style="color: ${playerColor(player)}">${playerName(player)}'s</span> turn`;
            for (let i = 0; i < cells.length; i++) {
                setInterval(() => {
                    cells[i].classList.add('slide_in');
                }, 100);
            }
            setTimeout(() => {
                $('.welcome_background').style.display = 'none';
            }, 1010)
        }, 300)
    }, 300)
});


for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', (e) => {
        e.target.innerText = playerName(player);
        e.target.style.color = playerColor(player);
        e.target.setAttribute('disabled', 'true');
        e.target.style.transform = 'rotateX(180deg)';
        moves++;
        if (player) {
            playsX.push(+e.target.getAttribute('data-cell_number'));
            for (let i = 0; i < wins.length; i++) {
                if (playsX.includes(wins[i][0]) &&
                    playsX.includes(wins[i][1]) &&
                    playsX.includes(wins[i][2])) {
                    winner = 'X';
                }
            }
        } else {
            playsO.push(+e.target.getAttribute('data-cell_number'));
            for (let i = 0; i < wins.length; i++) {
                if (playsO.includes(wins[i][0]) &&
                    playsO.includes(wins[i][1]) &&
                    playsO.includes(wins[i][2])) {
                    winner = 'O';
                }
            }
        }
        if (winner === null) {
            if (moves === 9) {
                changeHeading('It\'s draw! You are both very smart');
                slideButtons();
            } else {
                player = !player;
                changeHeading(`It's <span style="color: ${playerColor(player)}">${playerName(player)}'s</span> turn`);
            }
        } else {
            changeHeading(`Player <span style="color: ${playerColor(player)}">${winner}</span> has won! Congratulations!`);
            for (everyCell of cells) {
                everyCell.setAttribute('disabled', 'true'); 
            }
            slideButtons();
        }
    });
}

$('.go_to_menu_button').addEventListener('click', () => {
    $('.welcome_background').style.display = 'flex';
    $('.welcome_background').style.opacity = '100%';
    setTimeout(() => {
        slideElem('welcome_heading', true);
        setTimeout(() => {
            slideElem('welcome_button', true);
        }, 300)
    }, 800);
    cleanPlayfield();
});

$('.restart_button').addEventListener('click', () => {
    cleanPlayfield();
    player = Boolean(Math.round(Math.random()));
    changeHeading(`Have a nice play! It's <span style="color: ${playerColor(player)}">${playerName(player)}'s</span> turn`);
});


