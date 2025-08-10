const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'game.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Remove all \n characters from emoji lines
content = content.replace(/emoji: '[^']*',\\n\s*video: '[^']*'/g, (match) => {
  return match.replace(/,\\n\s*/, ',\n            ');
});

// Fix 2: Fix all corrupted correct properties in quiz options
content = content.replace(/correct: \{ video: '[^']*', text: '[^']*', correct: \{ [^}]* \}\.split\("correct: "\)\[1\]\.split\("}"\)\[0\]\}\.split\("correct: "\)\[1\]\.split\("}"\)\[0\]/g, (match) => {
  // Extract the boolean value from the nested structure
  const booleanMatch = match.match(/correct: (true|false)/);
  return booleanMatch ? `correct: ${booleanMatch[1]}` : 'correct: false';
});

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed all syntax errors in game.html'); 