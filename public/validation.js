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

module.exports = { validateInput };
