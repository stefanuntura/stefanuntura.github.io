var fuel_bar = document.querySelector('.progress-bar');
var fuel_bar_value = document.querySelector('.progress-bar-value');
var fuel_bar_fill = document.querySelector('.progress-bar-fill');

$(function() {

    var anim_id;

    //saving dom objects to variables
    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var coin_1 = $('#coin_1');
    var coin_2 = $('#coin_2');
    var coin_3 = $('#coin_3');
    var speed_item = $('#speed_item');
    var fuel_item = $('#fuel_item');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');

    var score = $('#score');
    var high_score = localStorage.getItem('high_score');
    $('#high_score').text(high_score);

    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var coin_width = parseInt(50);
    var coin_height = parseInt(50);
    var speed_item_width = parseInt(30);
    var fuel_item_width = parseInt(40);
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

    //some other declarations
    var game_over = false;

    var fuel_total = 100;
    var fuel_added = 20;

    var fuel_current;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

    /* Move the cars */
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the objects */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {

        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }

        if (collision(car, coin_1) || collision(car, coin_2) || collision(car, coin_3)) {
            score_counter += 10;
            if (score_counter % 20 == 0) {
                score.text(parseInt(score.text()) + 5);
            }
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }

        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        if (score_counter % 30 == 0) {
          fuel_current = fuel_total--;
          if(fuel_current == 0){
            stop_the_game();
            return;
          }
        }

        if (collision(car, speed_item)) {
            speed += 0.1;
            line_speed += 0.1;
        }

        if (collision(car, fuel_item)) {
          fuel_total = 100;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        coin_down(coin_1);
        coin_down(coin_2);
        coin_down(coin_3);

        speed_item_down(speed_item);

        fuel_item_down(fuel_item);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        fuel_bar_fill.style.width = fuel_current + "%";

        anim_id = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    function coin_down(coin) {
        var coin_current_top = parseInt(coin.css('top'));
        if (coin_current_top > container_height) {
            coin_current_top = -200;
            var coin_left = parseInt(Math.random() * (container_width - coin_width));
            coin.css('left', coin_left);
        }
        coin.css('top', coin_current_top + speed);
    }

    function speed_item_down(speed_item) {
        var speed_item_current_top = parseInt(speed_item.css('top'));
        if (speed_item_current_top > container_height) {
            speed_item_current_top = -200;
            var speed_item_left = parseInt(Math.random() * (container_width - speed_item_width));
            speed_item.css('left', speed_item_left);
        }
        speed_item.css('top', speed_item_current_top + speed);
    }

    function fuel_item_down(fuel_item) {
        var fuel_item_current_top = parseInt(fuel_item.css('top'));
        if (fuel_item_current_top > container_height) {
            fuel_item_current_top = -200;
            var fuel_item_left = parseInt(Math.random() * (container_width - fuel_item_width));
            fuel_item.css('left', fuel_item_left);
        }
        fuel_item.css('top', fuel_item_current_top + speed);
    }

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
        setHighScore();
    }

    function setHighScore() {
        if (high_score < parseInt(score.text())) {
            high_score = parseInt(score.text());
            localStorage.setItem('high_score', parseInt(score.text()));
        }
        $('#high_score').text(high_score);
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});
