// Fonction pour gérer les finalistes
function displayFinalists() {
  const finalistsList = JSON.parse(localStorage.getItem('finalists')) || [];
  const finalistsTable = document.getElementById('finalists-list');
  
  // Effacer le contenu actuel de la table
  finalistsTable.innerHTML = '';

  finalistsList.forEach((finalist, index) => {
      const row = finalistsTable.insertRow();
      const photoUrl = URL.createObjectURL(finalist.photo);
      row.innerHTML = `
          <td>${finalist.name}</td>
          <td>${finalist.contact}</td>
          <td><img src="${photoUrl}" alt="Photo" style="width: 50px; height: 50px;"></td>
          <td><button onclick="deleteFinalist(${index})">Supprimer</button></td>
      `;
  });
}

// Fonction pour ajouter un finaliste
document.getElementById('add-finalist-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('finalist-name').value;
  const contact = document.getElementById('finalist-contact').value;
  const photo = document.getElementById('finalist-photo').files[0];

  const newFinalist = { name, contact, photo };
  
  // Obtenir les finalistes existants depuis le localStorage
  const finalistsList = JSON.parse(localStorage.getItem('finalists')) || [];
  
  // Ajouter le nouveau finaliste
  finalistsList.push(newFinalist);
  
  // Sauvegarder la nouvelle liste dans le localStorage
  localStorage.setItem('finalists', JSON.stringify(finalistsList));

  // Réinitialiser le formulaire
  document.getElementById('add-finalist-form').reset();
  
  // Recharger la liste des finalistes
  displayFinalists();
});

// Fonction pour supprimer un finaliste
function deleteFinalist(index) {
  const finalistsList = JSON.parse(localStorage.getItem('finalists')) || [];
  
  // Supprimer le finaliste à l'index spécifié
  finalistsList.splice(index, 1);
  
  // Sauvegarder la nouvelle liste sans le finaliste supprimé
  localStorage.setItem('finalists', JSON.stringify(finalistsList));
  
  // Recharger la liste des finalistes
  displayFinalists();
}

// Fonction pour afficher un rappel aléatoire à chaque visite
function showRandomReminder() {
  const reminders = [
      "Rappelez-vous de prier 5 fois par jour.",
      "Le Coran est notre guide, lisons-le chaque jour.",
      "Soyons généreux dans nos actions et nos paroles.",
      "La patience est une vertu précieuse dans l'Islam.",
      "Chaque jour est une nouvelle chance pour s'améliorer."
  ];

  const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
  document.getElementById('daily-reminder').innerText = randomReminder;
}

// Afficher un rappel et les finalistes dès que la page est chargée
window.onload = function () {
  displayFinalists();
  showRandomReminder();
};
