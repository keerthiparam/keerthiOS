const output = document.getElementById("output");
const commandInput = document.getElementById("command");
const commandHistory = [];
let historyIndex = -1;
let isBooting = true;

const commands = {
  help: `Available commands:

  [+] bio
  [+] skills
  [+] projects
  [+] resume
  [+] contact
  [+] hobbies
  [-] clear
  `,

  bio: `<div class="section-title">== [+] BIO ==</div>  [+] <span class="clickable" data-cmd="bio degree">degree</span>
  [+] <span class="clickable" data-cmd="bio specialization">specialization</span>
  [+] <span class="clickable" data-cmd="bio honors">honors</span>
  [+] <span class="clickable" data-cmd="bio location">location</span>
  [+] <span class="clickable" data-cmd="bio college">college</span>
  `,

"bio degree": `[::] <strong>Degree</strong>         : B.E. Computer Science and Engineering`,
"bio specialization": `[::] <strong>Specialization</strong> : Cybersecurity`,
"bio honors": `[::] <strong>Honors</strong>         : Artificial Intelligence`,
"bio location": `[::] <strong>Location</strong>       : Chennai`,
"bio college": `[::] <strong>College</strong>        : R.M.D. Engineering College`,

  skills: `
<div class="section-title">== [+] SKILLS ==</div><table class="skills-table" style="border-collapse: collapse; width: 100%; font-family: monospace;">
  <thead>
    <tr>
      <th style="text-align: left; padding-right: 20px;">[+] Languages</th>
      <th style="text-align: left; padding-right: 20px;">[+] Frameworks</th>
      <th style="text-align: left;">[+] Databases</th>
      <th style="text-align: left;">[+] Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">- Python</td>
      <td style="vertical-align: top;">- Flask</td>
      <td style="vertical-align: top;">- MySQL</td>
      <td style="vertical-align: top;">- Github</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- Java</td>
      <td style="vertical-align: top;">- React</td>
      <td></td>
      <td style="vertical-align: top;">- Linux</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- C++</td>
      <td style="vertical-align: top;">- Selenium</td>
      <td></td>
      <td style="vertical-align: top;">- VS Code</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- C</td>
      <td></td>
      <td></td>
      <td style="vertical-align: top;">- Wireshark</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- HTML</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- CSS</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="vertical-align: top;">- JavaScript</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
`,

projects: `
<div class="section-title">== [+] PROJECTS ==</div>
[+] <a href="https://github.com/keerthiparam/ParamStock/blob/main/README.md" target="_blank" class="project-link"><strong>ParamStock</strong></a>      : Web App for real-time stock alerts (In Progress)
[+] <a href="https://github.com/keerthiparam/PhishMate/blob/main/README.md" target="_blank" class="project-link"><strong>PhishMate</strong></a>       : AI-powered phishing detection browser extension
[+] <a href="https://github.com/keerthiparam/TalentDAO/blob/main/README.md" target="_blank" class="project-link"><strong>TalentDAO</strong></a>       : Web3 freelancer platform with decentralized reputation
[+] <a href="https://github.com/keerthiparam/Dust-Buster/blob/main/README.md" target="_blank" class="project-link"><strong>DustBuster</strong></a>      : Arduino-based automation for cleaning tasks
[+] <a href="https://github.com/keerthiparam/Password-Manager/blob/main/README.md" target="_blank" class="project-link"><strong>PasswordManager</strong></a> : Python & MySQL app for secure password management
`,

resume: () => {
    window.open('https://docs.google.com/document/d/1_8awqWlxdFw7RIELNcMUJ54haw1jOJGvTQTLFg4NBT8/export?format=pdf', '_blank');
    return '[::] Fetching Keerthi_KP_Resume_2025.pdf';
  },

contact: `
<div class="section-title">== [+] CONTACT ==</div>
[+] <a href="mailto:parami.keerthi@gmail.com" class="contact-link"><strong>Email</strong></a>    : parami.keerthi@gmail.com
[+] <a href="https://github.com/keerthiparam" target="_blank" class="contact-link"><strong>GitHub</strong></a>   : github.com/keerthiparam
[+] <a href="https://linkedin.com/in/keerthiparam" target="_blank" class="contact-link"><strong>LinkedIn</strong></a> : linkedin.com/in/keerthiparam
[+] <a href="https://discord.com/users/1154052200260194425" target="_blank" class="contact-link"><strong>Discord</strong></a>  : discord.com/users/1154052200260194425
`,

hobbies: `
<div class="section-title">== [+] HOBBIES ==</div>
[+] <strong>Gaming</strong>       : Genshin Impact, Minecraft
[+] <strong>Editing</strong>      : Short videos and content creation
[+] <strong>Volunteering</strong> : Campus & community events
[+] <strong>Design</strong>       : Minimalist aesthetics and layouts
`,

  clear: () => {
  output.innerHTML = '';
  appendOutput(commands.banner.trim(), true);
  appendOutput(commands.greet.trim(), true);
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
[~] Type or click<b class="clickable" data-cmd="help">'help'</b>to see what you can break.
</pre>`,

 search: function(args) {
    if (!args) return "[::] Please provide a search term.";
    return searchProfile(args);
  },
};

const easterEggs = {
  "sudo make me a sandwich": "[::] Okay. You're the boss. 🥪",
  "rm -rf /": "[!] Error: This is not <i>that</i> kind of terminal.",
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

const bootSequence = [
  { whole: "> run ./KeerthiOS --boot" }, // whole line instantly
  { prefix: "[boot]", main: " Loading identity kernel..." }, 
  { prefix: "[sys]", main: " Parsing mind.modules...", status: " OK" },
  { prefix: "[env]", main: " Spawning terminal...", status: " READY" },
  { prefix: "[KeerthiOS]", main: " :: system online." },
];

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function appendOutput(html, isHTML = false) {
   const div = document.createElement('div');
  if (isHTML) div.innerHTML = html;
  else div.textContent = html;
  output.appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
}

function makeClickable(cmdText) {
  const cmd = cmdText.toLowerCase();
  return `<span class="clickable" data-cmd="${escapeHTML(cmd)}" role="button" tabindex="0">${escapeHTML(cmdText)}</span>`;
}

function colorizeOutput(text) {
  return text
    .replace(/\[::]/g, '<span class="info-text">[::] </span>')
    .replace(/\[!!]/g, '<span class="error-text">[!!] </span>')
    .replace(/\[~]/g, '<span class="welcome-text">[~] </span>')
    .replace(/\[\+]/g, '<span class="command-text">[+] </span>')
    .replace(/\[\?\?]/g, '<span class="warning-text">[??] </span>')
    .replace(/\[\?]/g, '<span class="question-text">[?] </span>')
    .replace(/==\s*\[(.+?)\]\s*(.*?)\s*==/g, (_, symbol, title) => `<div class="section-header">== [${symbol}] <b>${title}</b> ==</div>`);
}

function processHelp(text) {
  return text.split("\n").map(line => {
    if (line.includes("[+]")) {
      const cmd = line.split("[+]")[1].trim();
      return `  [+] ${makeClickable(cmd)}<br>`;
    }
    if (line.includes("[-]")) {
      const cmd = line.split("[-]")[1].trim();
      return `  [-] ${makeClickable(cmd)}<br>`;
    }
    return escapeHTML(line) + "<br>";
  }).join("");
}

function processBioCommands(text) {
  return text.split("\n").map(line => {
    if (line.trim().startsWith("[+]")) {
      const cmd = line.split("[+]")[1].trim();
      return `  [+] ${makeClickable("bio " + cmd)}<br>`;
    } else {
      return escapeHTML(line) + "<br>";
    }
  }).join("");
}

function typeOutput(text, command = '') {
  if (/<\/?[a-z]/i.test(text)) return appendOutput(text, true);
  if (command === 'help') return appendOutput(processHelp(text), true);
  if (command === 'bio') return appendOutput(processBioCommands(text), true);
  appendOutput(colorizeOutput(text), true);
}

function handleCommand(input) {
  if (input.length > 100) return "[!!] Command too long.";

  const cmd = input.trim().toLowerCase();

  if (commands[cmd]) {
    const command = commands[cmd];
    if (typeof command === "function") {
      if (cmd === "clear") {
        commands.clear();
        return "";
      }
      return command('');
    }
    return command;
  }

  // Otherwise fallback to first word command + args logic:
  const [firstCmd, ...args] = input.trim().split(" ");
  if (commands[firstCmd]) {
    const command = commands[firstCmd];
    if (typeof command === "function") {
      return command(args.join(" "));
    }
    return command;
  }

  if (easterEggs[input]) return easterEggs[input];

  return `[??] Command not found: ${escapeHTML(input)}`;
}

commandInput.addEventListener("keydown", (e) => {
  const raw = commandInput.value;
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');

  if (raw.length > 150) {
    e.preventDefault();
    return;
  }

  if (e.key === "Enter") {
    if (!cmd) return;

    if (!isBooting) {
      appendOutput(`$ ${escapeHTML(cmd)}`, true);  // only show $ prompt if not booting
    } else {
      appendOutput(escapeHTML(cmd), true);  // optionally show command without $
    }

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    const response = handleCommand(cmd);
    if (response) typeOutput(response, cmd);
    commandInput.value = "";
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
  }

  if (e.key === "Tab") {
    e.preventDefault();
    const input = commandInput.value.trim();
    if (!input) return;
    const matches = Object.keys(commands).filter(c => c.startsWith(input) && c !== input);
    if (matches.length === 1) {
      commandInput.value = matches[0];  // replace fully
    } else if (matches.length > 1) {
      appendOutput(`$ ${escapeHTML(input)}`, true);
      // Convert each match to a clickable span
      const clickableMatchesHTML = matches.map(cmd => 
      `<span class="clickable" data-cmd="${escapeHTML(cmd)}">${escapeHTML(cmd)}</span>`
      ).join('\n'); // add some spaces between

      appendOutput(clickableMatchesHTML, true);
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

output.addEventListener("click", (e) => {
  if (e.target.classList.contains("clickable")) {
    const cmd = e.target.getAttribute("data-cmd");
    if (cmd) {
      appendOutput(`$ ${escapeHTML(cmd)}`, true);
      const response = handleCommand(cmd);
      if (response) typeOutput(response, cmd);
      commandInput.value = "";
      commandInput.focus();
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
    }
  }
});

function initializeTerminal() {
  appendOutput(commands.banner.trim(), true);
  appendOutput(commands.greet.trim(), true);
  setTimeout(() => {
    commandInput.focus();
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(lineObj, delay = 2000) {
  // Create a container div for the line
  output.innerHTML += "<div class='boot-line'></div>";
  const lines = output.querySelectorAll(".boot-line");
  const currentLine = lines[lines.length - 1]; // last added line

  // If whole line given, print instantly and add one <br>
  if (lineObj.whole) {
    currentLine.innerHTML = escapeHTML(lineObj.whole);
    window.scrollTo(0, document.body.scrollHeight);
    return;
  }

  // Print prefix (if any), wait
  if (lineObj.prefix) {
    currentLine.innerHTML = `<span class="prefix">${escapeHTML(lineObj.prefix)}</span>`;
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(delay);
  }

  // Append main text (if any), wait
  if (lineObj.main) {
    currentLine.innerHTML += escapeHTML(lineObj.main);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(delay);
  }

  // Append status (if any)
  if (lineObj.status) {
    currentLine.innerHTML += `<span class="status">${escapeHTML(lineObj.status)}</span>`;
  }

  // Finally add one <br> after the whole line is done
  window.scrollTo(0, document.body.scrollHeight);
  await sleep(delay);
}

async function bootAnimation() {
  output.innerHTML = ""; // clear first
  isBooting = true;

  for (const line of bootSequence) {
    await typeLine(line, 150); // 1.5 seconds delay between parts
    await sleep(400);           // extra wait between lines
  }

  await sleep(100);
  output.innerHTML = ""; // clear output after boot

  appendOutput(commands.banner.trim(), true);
  appendOutput(commands.greet.trim(), true);

  isBooting = false;
  commandInput.disabled = false;
  commandInput.focus();
}

window.onload = () => {
  commandInput.disabled = false;
  commandInput.focus();

  const bootAlreadyShown = sessionStorage.getItem("bootShown");

  if (!bootAlreadyShown) {
    sessionStorage.setItem("bootShown", "true");
    bootAnimation(); // run boot once per session
  } else {
    isBooting = false;
    initializeTerminal(); // skip boot, go straight to terminal
    commandInput.disabled = false;
    commandInput.focus();
  }
};

function searchProfile(term) {
  const results = [];
  const searchTerm = term.toLowerCase();
  const sectionHits = {};

  // Highlight match
  const highlight = (line, term) =>
    line.replace(new RegExp(`(${term})`, 'ig'), '<mark>$1</mark>');

  // Extract visible text from project anchor tags
  function extractVisibleText(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    // Replace each <a> with its <strong> text content in brackets
    div.querySelectorAll('a').forEach(a => {
      const label = a.querySelector('strong')?.textContent || a.textContent || '';
      a.replaceWith(`[${label}]`);
    });

    // Return the text content trimmed
    return div.textContent.trim();
  }

  for (const section in commands) {
    const command = commands[section];
    if (typeof command === 'function') continue;

    const textContent = extractVisibleText(command);

    textContent.split('\n').forEach(line => {
      if (line.toLowerCase().includes(searchTerm)) {
        if (!sectionHits[section]) sectionHits[section] = [];
        sectionHits[section].push('   ' + highlight(line.trim(), searchTerm));
      }
    });
  }

  for (const section in sectionHits) {
    results.push(`[::] Found in ${section}:\n` + sectionHits[section].join('\n'));
  }

  return results.length > 0
    ? results.join('\n\n')
    : `[::] No results found for "<mark>${term}</mark>"`;
}
