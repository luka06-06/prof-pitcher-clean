# 🎓 Prof Pitcher – Akademische Aussagen verständlich gemacht

Prof Pitcher ist eine Web-App, die komplexe wissenschaftliche Aussagen vereinfacht – entweder in klar verständlicher Alltagssprache oder modernem Gen Z Slang. Entwickelt im Rahmen des Moduls **Web Engineering** an der DHBW.

---

## 🚀 Features

- 🧠 **Einfach erklärt** – akademische Sprache in verständliche Worte übersetzen  
- 😎 **Gen Z Slang** – Aussagen mit Emojis und Jugendsprache umformulieren  
- 🗣️ **Vorlesefunktion** – lässt beide Ausgaben vorlesen  
- 🧪 **Eingabevalidierung** – prüft Länge und Inhalt  
- 🌙 **Dark Mode Toggle**  
- ♿ **Barrierefreiheit** – Skip-Link, ARIA-Labels, Tastaturbedienung  
- 📱 **Responsive Design** – mobil, Tablet und Desktop optimiert  

---

## 📁 Projektstruktur

```
prof-pitcher/
├── api/
│   └── translate.js             # Übersetzungslogik (OpenAI)
├── public/
│   ├── index.html               # HTML Oberfläche
│   ├── styles.css               # Styling
│   ├── script.js                # Hauptlogik 
│   ├── main.js                  # App-Initialisierung 
│   ├── validation.js            # Eingabeprüfung
│   └── ...
├── server.js                    # Express Webserver
├── package.json                 # npm-Konfiguration
├── README.md                    # Diese Datei
└── tests/
    └── validation.test.js       # Eingabetests 
```

---

## ⚙️ Installation & Start

### 🔧 Voraussetzungen

- [Node.js](https://nodejs.org) (empfohlen: aktuelle LTS-Version)
- alternativ im Browser öffnen

### 💻 Lokale Ausführung

```bash
# Projektverzeichnis öffnen
cd prof-pitcher

# Abhängigkeiten installieren
npm install und über live Server öffnen
```

---

## 🧪 Eingabevalidierung

Die Funktion `validateInput()` prüft:

- ✅ Text ist vorhanden  
- ✅ Mindestens 5 Zeichen  
- ✅ Maximal 1000 Zeichen  
- ✅ Rückgabe: getrimmter Text  

Fehler werden benutzerfreundlich im Interface angezeigt.

---

## 🗂️ API-Routing

### POST `/api/translate`

**Request:**

```json
{
  "text": "Die differenzierte Perspektive ist essenziell.",
  "type": "genz" | "simple"
}
```

**Response:**

```json
{
  "result": "OMG wie deep ist das denn? 🧠🔥"
}
```

---

## 🧠 Technischer Überblick

- **Frontend:** HTML5, CSS3, Vanilla JS (modularisiert)  
- **Backend:** Node.js mit Express  
- **API-Anbindung:** OpenAI (GPT 3.5)   
- **Design:** Mobile-First mit Media Queries (ab 768px, 1024px)

---

## 📝 ToDo / Weiterentwicklung

- [ ] Feedback-Bestätigung nach erfolgreicher Übersetzung  
- [ ] Verlauf oder Verlauf speichern  
- [ ] Weitere Übersetzungsstile (z. B. ironisch, kindgerecht)  
- [ ] UI/UX-Optimierung mit Animationen  

---

## 👨‍💻 Autoren

- **Luka B.**
- **Lukas B.**

Projekt im Rahmen des Studiengangs **Angewandte Informatik (DHBW)**  
Modul: **Web Engineering**  
---
