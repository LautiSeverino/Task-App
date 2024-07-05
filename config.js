document.addEventListener('DOMContentLoaded', () => {
    const selectVoice = document.getElementById('selectVoice');
    const inputRate = document.getElementById('inputRate');
    const labelInputRate = document.getElementById('labelInputRate');
    const guardarConfigBtn = document.getElementById('guardarConfigBtn');
    const volverBtn = document.getElementById('volverBtn');
    const voicesList = [];
    const synthesis = speechSynthesis;
    
    
    const fetchVoices = () => {
        synthesis.onvoiceschanged = () => {
            const voices = synthesis.getVoices();
            voicesList.push(...voices);
            voicesList.sort((a, b) => a.name.localeCompare(b.name));
            populateVoiceOptions();
        };
        synthesis.getVoices();
    };
    
    volverBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    const populateVoiceOptions = () => {
        const settings = JSON.parse(localStorage.getItem('configSettings')) || {
            voice: 'es-MX', // Valor por defecto si no hay configuración guardada
            rate: 1
        };

        selectVoice.innerHTML = '';
        voicesList.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.lang;
            option.textContent = `${voice.name} (${voice.lang})`;
            selectVoice.appendChild(option);

            // Seleccionar la opción guardada en la configuración
            if (voice.lang === settings.voice) {
                option.selected = true;
            }
        });
    };

    const loadSettings = () => {
        const settings = JSON.parse(localStorage.getItem('configSettings')) || {
            voice: 'es-MX',
            rate: 1
        };
        selectVoice.value = settings.voice;
        inputRate.value = settings.rate;
        labelInputRate.textContent = `Velocidad de reproducción: ${settings.rate}`;
    };

    const saveSettings = () => {
        const settings = {
            voice: selectVoice.value,
            rate: parseFloat(inputRate.value)
        };
        localStorage.setItem('configSettings', JSON.stringify(settings));
        alert('Configuración guardada con éxito');
    };

    inputRate.addEventListener('input', () => {
        labelInputRate.textContent = `Velocidad de reproducción: ${inputRate.value}`;
    });

    guardarConfigBtn.addEventListener('click', saveSettings);

    fetchVoices();
    loadSettings();
});

    
    volverBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });