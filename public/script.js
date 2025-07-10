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
        const text = this.inputText.value.trim();

        if (!text) {
            this.showError('Bitte gib zuerst einen Text ein!');
            this.inputText.focus();
            return;
        }

        const outputElement = type === 'genz' ? this.genzOutput : this.simpleOutput;
        const button = type === 'genz' ? this.genzBtn : this.simpleBtn;

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
            this.displayResult(outputElement, data.result);
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

    showError(message) {
        alert(message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfPitcher();
});
