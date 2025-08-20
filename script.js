function updateTimerDisplay(timerValue) {
    let minutes = Math.floor(timerValue / 60);
    let seconds = timerValue % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.querySelector(".timer").textContent = minutes + ":" + seconds;
}

window.electronAPI.onUpdateTimer((value) => {
    // stato iniziale
    document.getElementById("doneButton").disabled = true;
    document.getElementById("workingText").classList.remove("hidden");
    document.getElementById("pauseText").classList.add("hidden");
    document.getElementById("workingImage").classList.remove("hidden");
    document.getElementById("pauseImage").classList.add("hidden");
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("doneButton").classList.remove("hidden");
    updateTimerDisplay(value);
});

window.electronAPI.onTimerFinished(() => {
    document.getElementById("sound").play();
    document.getElementById("workingImage").classList.add("hidden");
    document.getElementById("pauseImage").classList.remove("hidden");
    document.getElementById("workingText").classList.add("hidden");
    document.getElementById("pauseText").classList.remove("hidden");
    document.getElementById("doneButton").disabled = false;
});


// collego i bottoni
document.getElementById("startButton").addEventListener("click", () => {
  window.electronAPI.startTimer();
});

document.getElementById("doneButton").addEventListener("click", () => {
  window.electronAPI.resetTimer();
});
