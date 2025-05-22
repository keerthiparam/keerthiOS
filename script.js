const output = document.getElementById("output");
const commandInput = document.getElementById("command");
const commandHistory = [];
let historyIndex = -1;

const commands = {
  help: `Available commands:

  [+] bio
  [+] skills
  [+] projects
  [+] contact
  [+] hobbies
  [-] clear
  `,

  bio: `== [+] BIO ==

  [+] degree
  [+] specialization
  [+] honors
  [+] location
  [+] college
  `,

  "bio degree": `[::] Degree        : B.E. Computer Science and Engineering`,
  "bio specialization": `[::] Specialization: Cybersecurity`,
  "bio honors": `[::] Honors        : Artificial Intelligence`,
  "bio location": `[::] Location      : Chennai`,
  "bio college": `[::] College       : R.M.D. Engineering College`,

  skills: `== [+] SKILLS ==

  [+] Languages :
  - Python
  - Java
  - C++
  - JavaScript

  [+] Frameworks :
  - Flask
  - React
  - Selenium

  [+] Databases :
  - MySQL
  `,

  projects: `
== [+] PROJECTS ==

<div>[+] <a href="https://github.com/keerthiparam/PhishMate" target="_blank" class="project-link">PhishMate : AI-powered phishing detection browser extension</a></div>
<div>[+] <a href="https://github.com/keerthiparam/TalentDAO" target="_blank" class="project-link">TalentDAO : Web3 freelancer platform with decentralized reputation</a></div>
<div>[+] <a href="https://github.com/keerthiparam/DustBuster" target="_blank" class="project-link">DustBuster : Arduino-based automation for cleaning tasks</a></div>
<div>[+] <a href="https://github.com/keerthiparam/PasswordManager" target="_blank" class="project-link">PasswordManager : Python & MySQL application for secure password management</a></div>
`,

  contact: `
== [+] CONTACT ==

<div>[+] <a href="mailto:parami.keerthi@gmail.com" class="contact-link">Email : parami.keerthi@gmail.com</a></div>
<div>[+] <a href="https://github.com/keerthiparam" target="_blank" class="contact-link">GitHub : github.com/keerthiparam</a></div>
<div>[+] <a href="https://linkedin.com/in/keerthiparam" target="_blank" class="contact-link">LinkedIn : linkedin.com/in/keerthiparam</a></div>
<div>[+] <a href="https://discord.com/users/1154052200260194425" target="_blank" class="contact-link">Discord : discord.com/users/1154052200260194425</a></div>
`,

  hobbies: `== [+] HOBBIES ==

  [+] Gaming      : Genshin Impact, Minecraft
  [+] Editing     : Short videos and content creation
  [+] Volunteering: Campus & community events
  [+] Design      : Minimalist aesthetics and layouts
  `,

  clear: () => {
    output.innerHTML = '';
  },

  banner: `<pre class="ascii-art permanent-flicker">
 _                  _   _     _  ____   _____ 
| |                | | | |   (_)/ __ \\ / ____|
| | _____  ___ _ __| |_| |__  _| |  | | (___  
| |/ / _ \\/ _ \\ '__| __| '_ \\| | |  | |\\___ \\ 
|   <  __/  __/ |  | |_| | | | | |__| |____) |
|_|\\_\\___|\\___|_|   \\__|_| |_|_|\\____/|_____/ 
</pre>`,

  greet: `<pre class="ascii-art permanent-flicker">
> run ./KeerthiOS --boot

[boot] Loading identity kernel...
[sys] Parsing mind.modules... OK
[env] Spawning terminal... READY
[KeerthiOS] :: system online.

[~] Type <span class="clickable" data-cmd="help">'help'</span> to see what you can break.
</pre>`
};

const easterEggs = {
  "sudo make me a sandwich": "[::] Okay. You're the boss. 🥪",
  "rm -rf /": "[!] Error: This is not *that* kind of terminal.",
  "hi": "[::] Hi! I'm Keerthi's terminal assistant.",
  "hello": "[::] Hi! I'm Keerthi's terminal assistant.",
  "why": "[::] Why not?",
  "banner": "🎉 Welcome to keerthiOS Terminal 🎉",
  "fortune": "[::] You will debug successfully on the first try today. 🍀",
  "whoami": "[::] You are Keerthi. Obviously.",
  "date": "[::] It's always a good time to code.",
  "cowsay hello": '🐮 "Hello!"',
  "sudo hug": "[::] Permission granted. 🤗 Virtual hug sent!",
  "exit": "[::] Nice try. This terminal is forever.",
  "quit": "[::] Nice try. This terminal is forever.",
  "inspire": "[::] Push yourself, because no one else is going to do it for you.",
  "motto": "[::] Code. Debug. Repeat. 💻",
  "neofetch": "[::] keerthiOS 1.0 | Uptime: All-nighter | Mood: 💪",
  "bye": "Bye."
};

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Helper to safely add output and scroll to bottom
function appendOutput(html, isHTML = false) {
  if (isHTML) {
    output.innerHTML += html + '<br>';
  } else {
    const escaped = escapeHTML(html);
    output.innerHTML += escaped + '<br>';
  }
  
  // More reliable scrolling - scroll the entire window
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 0);
}

function makeClickable(cmdText) {
  const cmdLower = cmdText.toLowerCase();
  return `<span class="clickable" data-cmd="${escapeHTML(cmdLower)}">${escapeHTML(cmdText)}</span>`;
}

// Apply different colors to terminal output based on prefix
function colorizeOutput(text) {
  return text
    .replace(/\[::]/g, '<span class="info-text">[::] </span>')
    .replace(/\[!!]/g, '<span class="error-text">[!!] </span>')
    .replace(/\[~]/g, '<span class="welcome-text">[~] </span>')
    .replace(/\[\+]/g, '<span class="command-text">[+] </span>')
    .replace(/\[\?\?]/g, '<span class="warning-text">[??] </span>')
    .replace(/\[\?]/g, '<span class="question-text">[?] </span>')
    .replace(/==\s\[.\]\s.*\s==/, match => `<span class="section-header">${match}</span>`);
}

function processHelp(helpText) {
  const lines = helpText.split('\n');
  let processedHTML = '';
  
  for (const line of lines) {
    if (line.trim().startsWith('[+]')) {
      // Match the command name that comes after [+]
      const parts = line.trim().split('[+]');
      if (parts.length > 1) {
        const cmdName = parts[1].trim();
        processedHTML += `  [+] ${makeClickable(cmdName)}<br>`;
      } else {
        processedHTML += escapeHTML(line) + '<br>';
      }
    } else if (line.trim().startsWith('[-]')) {
      // For clickable commands like clear
      const parts = line.trim().split('[-]');
      if (parts.length > 1) {
        const cmdName = parts[1].trim();
        processedHTML += `  [-] ${makeClickable(cmdName)}<br>`;
      } else {
        processedHTML += escapeHTML(line) + '<br>';
      }
    } else {
      processedHTML += escapeHTML(line) + '<br>';
    }
  }
  
  return processedHTML;
}

function processBioCommands(bioText) {
  const lines = bioText.split('\n');
  let processedHTML = '';
  
  for (const line of lines) {
    if (line.trim().startsWith('[+]')) {
      // Match the command name that comes after [+]
      const parts = line.trim().split('[+]');
      if (parts.length > 1) {
        const cmdName = parts[1].trim();
        processedHTML += `  [+] ${makeClickable('bio ' + cmdName)}<br>`;
      } else {
        processedHTML += escapeHTML(line) + '<br>';
      }
    } else {
      processedHTML += escapeHTML(line) + '<br>';
    }
  }
  
  return processedHTML;
}

function typeOutput(text, command = '') {
  // If the output contains HTML tags (like projects/contact), just insert HTML directly
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(text.trim());

  if (isHTML) {
    // Insert as HTML directly
    appendOutput(text.trim(), true);
    return;
  }

  // Special processing for help command
  if (command === 'help') {
    appendOutput(processHelp(text), true);
    return;
  }
  
  // Special processing for bio command
  if (command === 'bio') {
    appendOutput(processBioCommands(text), true);
    return;
  }

  // Apply colorization to other text
  let colorized = colorizeOutput(text);
  appendOutput(colorized, true);
}

function initializeTerminal() {
  appendOutput(commands.banner.trim(), true);
  appendOutput(commands.greet.trim(), true);
  
  // Set focus to input and ensure scroll position
  setTimeout(() => {
    commandInput.focus();
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
}

function handleCommand(input) {
  // Limit max length to prevent abuse
  if (input.length > 100) {
    return "[!!] Command too long. Please enter a shorter command.";
  }

  const command = input.trim().toLowerCase();

  if (commands.hasOwnProperty(command)) {
    if (typeof commands[command] === 'function') {
      if (command === 'clear') {
        commands.clear();
        return ''; // no further output after clear
      }
      return commands[command]();
    } else {
      return commands[command];
    }
  } else if (easterEggs.hasOwnProperty(command)) {
    return easterEggs[command];
  } else {
    return `[??] Command not found: ${escapeHTML(command)}`;
  }
}

commandInput.addEventListener("keydown", function(e) {
  const rawInput = commandInput.value;
  const cmd = rawInput.trim().toLowerCase().replace(/\s+/g, ' ');

  // Limit input length at typing time to avoid long pastes
  if (rawInput.length > 150) {
    e.preventDefault();
    return;
  }

  if (e.key === "Enter") {
    if (!cmd) return;

    // Echo the typed command
    appendOutput(`$ ${escapeHTML(cmd)}`, true);

    // Save command to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Handle command and print output
    const response = handleCommand(cmd);
    if (response) typeOutput(response, cmd);

    commandInput.value = "";
    
    // Extra scrolling for typed commands
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }

  if (e.key === "Tab") {
    e.preventDefault();
    const input = commandInput.value.trim();
    const matches = Object.keys(commands).filter(c => c.startsWith(input) && c !== input);

    if (matches.length === 1) {
      commandInput.value = matches[0];
    } else if (matches.length > 1) {
      appendOutput(`$ ${escapeHTML(input)}`, true);
      typeOutput(matches.join("\n"));
    }
  }

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
    e.preventDefault();
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      commandInput.value = "";
    }
    e.preventDefault();
  }
});

// Event delegation for clickable elements
output.addEventListener("click", function(e) {
  if (e.target.classList.contains("clickable")) {
    const cmd = e.target.getAttribute("data-cmd");
    if (cmd) {
      // Echo the command as if it was typed
      appendOutput(`$ ${escapeHTML(cmd)}`, true);
      
      // Execute the command
      const response = handleCommand(cmd);
      if (response) typeOutput(response, cmd);
      
      // Focus the input field for the next command
      commandInput.value = "";
      commandInput.focus();
      
      // Ensure scroll to bottom
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 10);
    }
  }
});

window.onload = () => {
  initializeTerminal();
  commandInput.focus();
};

const banner = document.querySelector('.flicker-effect');

// Add flicker class initially
banner.classList.add('flicker-effect');

// Remove flicker effect after 3 seconds (duration of animation)
setTimeout(() => {
  banner.classList.remove('flicker-effect');
}, 3000);
