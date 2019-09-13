$(document).ready(function()
{
    var randomNumber = Math.floor(Math.random() * 99) + 1;
    var guesses = document.querySelector('#guesses');
    var lastResult = document.querySelector('#lastResult');
    var lowOrHigh = document.querySelector('#lowOrHigh');
    var losses = document.querySelector('#losses');
    var wins = document.querySelector('#wins');
    
    var guessSubmit = document.querySelector('.guessSubmit');
    var guessField = document.querySelector('.guessField');
    
    var guessCount = 1;
    var wonCount = 0;
    var lostCount = 0;
    
    var resetButton = document.querySelector('#reset');
    resetButton.style.display = 'none';
    guessField.focus();
    
    function checkGuess()
    {
        var userGuess = Number(guessField.value);
        if (userGuess > 99 || userGuess < 1 || isNaN(userGuess))
        {
            alert("Number must be greater than 0 and less than 100.");
        }
        else
        {
            if(guessCount === 1)
            {
                $("#guesses").text('Previous guesses: ');
            }
            guesses.innerHTML += userGuess + ' ';
            if (userGuess === randomNumber)
            {
                lastResult.innerHTML = 'Congrats! You got it right!';
                lastResult.style.backgroundColor = 'green';
                wonCount++;
                wins.innerHTML = "Wins: " + wonCount;
                $("#lowOrHigh").text('');
                setGameOver();
            }
            else if (guessCount === 7)
            {
                lastResult.innerHTML = 'Sorry, you lost!';
                lostCount++;
                losses.innerHTML = "Losses: " + lostCount;
                setGameOver();
            }
            else
            {
                $("#lastResult").text("Wrong!");
                lastResult.style.backgroundColor = 'red';
                if (userGuess < randomNumber) { $("#lowOrHigh").text("Last guess was too low!");}
                else if (userGuess > randomNumber) { $("#lowOrHigh").text("Last guess was too high!");}
            }
            guessCount++;
        }
        guessField.value = '';
        guessField.focus();
    }
    guessSubmit.addEventListener('click', checkGuess);
            
    function setGameOver()
    {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton.style.display = 'inline';
        resetButton.addEventListener('click', resetGame);
    }
    function resetGame()
    {
        guessCount = 1;
        
        var resetParas = document.querySelectorAll('.resultParas p');
        for (var i = 0; i < resetParas.length; i++)
        {
            resetParas[i].textContent = '';
        }
        resetButton.style.display = 'none';
        
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = ' ';
        guessField.focus();
        
        lastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * 99) + 1;
    }
})