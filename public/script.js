function validateInput(text) {
    if (!text || text.trim().length === 0) {
        throw new Error("Text ist erforderlich.");
    }

    const trimmed = text.trim();

    if (trimmed.length < 5) {
        throw new Error("Text muss mindestens 5 Zeichen lang sein.");
    }

    if (trimmed.length > 1000) {
        throw new Error("Text darf maximal 1000 Zeichen lang sein.");
    }

    return trimmed;
}

class ProfPitcher {
    constructor() {
        this.inputText = document.getElementById('input-text');
        this.genzBtn = document.getElementById('genz-btn');
        this.simpleBtn = document.getElementById('simple-btn');
        this.genzOutput = document.getElementById('genz-output');
        this.simpleOutput = document.getElementById('simple-output');

        this.initEventListeners();
    }

    initEventListeners() {
        this.genzBtn.addEventListener('click', () => this.handleTranslation('genz'));
        this.simpleBtn.addEventListener('click', () => this.handleTranslation('simple'));

        this.inputText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleTranslation('genz');
            }
        });
    }

    async handleTranslation(type) {
        let text;

        const outputElement = type === 'genz' ? this.genzOutput : this.simpleOutput;
        const button = type === 'genz' ? this.genzBtn : this.simpleBtn;

        try {
            text = validateInput(this.inputText.value);
        } catch (validationError) {
            this.displayError(outputElement, validationError.message);
            this.inputText.focus();
            return;
        }

        this.setLoadingState(button, outputElement, true);

        try {
            const response = await fetch('https://prof-pitching.onrender.com/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, type })
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Übersetzung');
            }

            const data = await response.json();

            outputElement.innerText = '';
            setTimeout(() => {
                const label = type === 'genz' ? 'Gen Z: ' : 'Einfach erklärt: ';
                outputElement.innerText = label + data.result;
            }, 10);
        } catch (error) {
            this.displayError(outputElement, 'Fehler beim Übersetzen. Bitte versuche es erneut.');
            console.error(error);
        } finally {
            this.setLoadingState(button, outputElement, false);
        }
    }

    setLoadingState(button, output, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.textContent = button.textContent.replace(/[😎🧠]/, '⏳');
            output.classList.add('loading');
            output.textContent = 'Wird übersetzt...';
        } else {
            button.disabled = false;
            button.textContent = button.id === 'genz-btn' ? '😎' : '🧠';
            output.classList.remove('loading');
        }
    }

    displayResult(element, text) {
        element.textContent = text;
        element.setAttribute('aria-live', 'polite');
    }

    displayError(element, message) {
        element.textContent = message;
        element.style.color = '#dc3545';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfPitcher();

    const toggleBtn = document.getElementById('darkmode-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('darkmode');
    });

    // Ctrl+A Begrenzung auf Ausgabefelder
    const outputs = [document.getElementById('simple-output'), document.getElementById('genz-output')];

    outputs.forEach(output => {
        output.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                const range = document.createRange();
                range.selectNodeContents(output);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    });
});
