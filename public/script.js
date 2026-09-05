const translations = {
  en: {
    title: "Title",
    content: "Content",
    save: "Save",
    yourNotes: "Your Notes",
    edit: "Edit",
    delete: "Delete"
  },
  gr: {
    title: "Τίτλος",
    content: "Περιεχόμενο",
    save: "Αποθήκευση",
    yourNotes: "Οι Σημειώσεις σου",
    edit: "Επεξεργασία",
    delete: "Διαγραφή"
  }
};

function applyLanguage(lang) {
  document.getElementById("titleLabel").innerText = translations[lang].title;
  document.getElementById("contentLabel").innerText = translations[lang].content;
  document.getElementById("saveBtn").innerText = translations[lang].save;
  document.getElementById("notesHeader").innerText = translations[lang].yourNotes;

  document.querySelectorAll(".editLink").forEach(el => el.innerText = translations[lang].edit);
  document.querySelectorAll(".deleteLink").forEach(el => el.innerText = translations[lang].delete);
}

document.getElementById("langSwitcher").addEventListener("change", (e) => {
  applyLanguage(e.target.value);
});

// default language
applyLanguage("en");
