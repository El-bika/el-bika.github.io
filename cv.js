document.addEventListener('DOMContentLoaded', () => {
    // Load skills from localStorage if available
    let competences = JSON.parse(localStorage.getItem('competences')) || [
        { name: 'HTML', level: 'Avancé', description: 'Langage de base pour le web.' },
        { name: 'CSS', level: 'Intermédiaire', description: 'Design des pages web.' },
        { name: 'JavaScript', level: 'Débutant', description: 'Interactivité sur les sites web.' },
    ];

    const competencesList = document.getElementById('competences-list');
    const selectedSkill = document.getElementById('selectedSkill');
    const addSkillBtn = document.getElementById('addSkill');
    const modifySkillBtn = document.getElementById('modifySkill');
    const deleteSkillBtn = document.getElementById('deleteSkill');
    const niveauLabel = document.getElementById('niveauLabel');

    const levels = ["Débutant", "Intermédiaire", "Avancé", "Professionnel"];

    function updateDropdown() {
        selectedSkill.innerHTML = '';
        competences.forEach((comp, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = comp.name;
            selectedSkill.appendChild(option);
        });
    }

    function displayCompetences() {
        competencesList.innerHTML = '';
        competences.forEach(comp => {
            const compElement = document.createElement('div');
            compElement.classList.add('competence-item');
            const levelClass = comp.level.toLowerCase();  // Level-based class
            compElement.innerHTML = `
                <h3>${comp.name}</h3>
                <div class="competence-bar">
                    <div class="competence-progress" style="width: ${getLevelPercentage(comp.level)}%"></div>
                </div>
                <p class="competence-level ${levelClass}">Niveau : ${comp.level}</p>
                <p>${comp.description}</p>
            `;
            competencesList.appendChild(compElement);
        });
    }

    function getLevelPercentage(level) {
        switch(level) {
            case 'Débutant': return 25;
            case 'Intermédiaire': return 50;
            case 'Avancé': return 75;
            case 'Professionnel': return 100;
            default: return 0;
        }
    }

    function saveCompetences() {
        localStorage.setItem('competences', JSON.stringify(competences));
    }

    window.updateLevelLabel = function () {
        const niveau = document.getElementById('niveau');
        niveauLabel.textContent = niveau.options[niveau.selectedIndex].text;
    };

    addSkillBtn.addEventListener('click', () => {
        const name = document.getElementById('nom').value.trim();
        const level = document.getElementById('niveau').value;
        const description = document.getElementById('description').value.trim();

        if (!name) {
            alert('Le nom de la compétence est obligatoire pour ajouter une nouvelle compétence.');
            return;
        }

        competences.push({ name, level, description });
        saveCompetences();
        updateDropdown();
        displayCompetences();
        document.getElementById('competenceForm').reset();
    });

    modifySkillBtn.addEventListener('click', () => {
        const selectedIndex = selectedSkill.value;
        if (selectedIndex === '') {
            alert('Veuillez sélectionner une compétence à modifier.');
            return;
        }

        const skill = competences[selectedIndex];
        const newName = document.getElementById('nom').value.trim();
        const newLevel = document.getElementById('niveau').value;
        const newDescription = document.getElementById('description').value.trim();

        skill.name = newName || skill.name;
        skill.level = newLevel || skill.level;
        skill.description = newDescription || skill.description;

        saveCompetences();
        updateDropdown();
        displayCompetences();
        document.getElementById('competenceForm').reset();
    });

    deleteSkillBtn.addEventListener('click', () => {
        const selectedIndex = selectedSkill.value;
        if (selectedIndex === '') {
            alert('Veuillez sélectionner une compétence à supprimer.');
            return;
        }

        competences.splice(selectedIndex, 1);
        saveCompetences();
        updateDropdown();
        displayCompetences();
        document.getElementById('competenceForm').reset();
    });

    updateDropdown();
    displayCompetences();
});

function openModal(element) {
    var imageSrc = element.src;
    
    document.getElementById('modalImage').src = imageSrc;
    
    document.getElementById('projectModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

window.onclick = function(event) {
    var modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
};
