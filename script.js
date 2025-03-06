document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio-Seite geladen!");

    // Farbwechsel-Button hinzufügen
    const button = document.getElementById("colorChangeButton");
    
    if (button) {
        button.addEventListener("click", () => {
            document.body.style.backgroundColor = "#8284bb"; // Mittelblau
            setTimeout(() => {
                document.body.style.backgroundColor = "#f8fafc"; // Zurücksetzen auf helles Grau
            }, 1000);
        });
    }
});
