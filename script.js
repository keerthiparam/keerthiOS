const output = document.getElementById("output");
const commandInput = document.getElementById("command");
const inputLine = document.getElementById("input-line"); // Added reference
const commandHistory =[];
let historyIndex = -1;
let isBooting = true;

// Define prompt layout with colors
const promptHTML = '<span class="prompt-user">guest@keerthiOS</span><span class="prompt-colon">:</span><span class="prompt-tilde">~</span><span class="prompt-dollar">$ </span>';

const commands = {
  help: `Available commands:

  [+] bio
  [+] skills
  [+] projects
  [+] resume
  [+] contact
  [+] hobbies
  [+] source
  [-] clear
  `,

  bio: `<div class="section-title">== [+] BIO ==</div>  [+] <span class="clickable" data-cmd="degree">degree</span>
  [+] <span class="clickable" data-cmd="location">location</span>
  [+] <span class="clickable" data-cmd="college">college</span>
  `,

"degree": `[::] <strong>Degree</strong>         : B.E. Computer Science and Engineering with specialization in Cybersecurity and Honors in Artificial Intelligence`,
"location": `[::] <strong>Location</strong>       : Chennai, Tamil Nadu, India`,
"college": `[::] <strong>College</strong>        : R.M.D. Engineering College`,

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
      <td data-label="Languages" style="vertical-align: top;">- Python</td>
      <td data-label="Frameworks" style="vertical-align: top;">- Flask</td>
      <td data-label="Databases" style="vertical-align: top;">- MySQL</td>
      <td data-label="Tools" style="vertical-align: top;">- Github</td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- Java</td>
      <td data-label="Frameworks" style="vertical-align: top;">- Selenium</td>
      <td data-label="Databases"></td>
      <td data-label="Tools" style="vertical-align: top;">- Linux</td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- C++</td>
      <td data-label="Frameworks"></td>
      <td data-label="Databases"></td>
      <td data-label="Tools" style="vertical-align: top;">- VS Code</td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- C</td>
      <td data-label="Frameworks"></td>
      <td data-label="Databases"></td>
      <td data-label="Tools" style="vertical-align: top;">- Wireshark</td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- HTML</td>
      <td data-label="Frameworks"></td>
      <td data-label="Databases"></td>
      <td data-label="Tools"></td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- CSS</td>
      <td data-label="Frameworks"></td>
      <td data-label="Databases"></td>
      <td data-label="Tools"></td>
    </tr>
    <tr>
      <td data-label="Languages" style="vertical-align: top;">- JavaScript</td>
      <td data-label="Frameworks"></td>
      <td data-label="Databases"></td>
      <td data-label="Tools"></td>
    </tr>
  </tbody>
</table>
`,

projects: `
<div class="section-title">== [+] PROJECTS ==</div>
[+] <a href="https://github.com/keerthiparam/ParamStock/blob/main/README.md" target="_blank" class="project-link"><strong>ParamStock</strong></a>      : Web App for real-time stock alerts (In Progress)
[+] <a href="https://github.com/keerthiparam/TimeCapsule/blob/main/README.md" target="_blank" class="project-link"><strong>TimeCapsule</strong></a>     : Decentralized Internet Archive
[+] <a href="https://github.com/Aravind-808/yapformer/blob/main/README.md" target="_blank" class="project-link"><strong>YapFormer</strong></a>       : Transformer with Modern Optimizations
[+] <a href="https://github.com/keerthiparam/PhishMate/blob/main/README.md" target="_blank" class="project-link"><strong>PhishMate</strong></a>       : AI-powered phishing detection browser extension
[+] <a href="https://github.com/keerthiparam/TalentDAO/blob/main/README.md" target="_blank" class="project-link"><strong>TalentDAO</strong></a>       : Web3 freelancer platform with decentralized reputation
[+] <a href="https://github.com/keerthiparam/Dust-Buster/blob/main/README.md" target="_blank" class="project-link"><strong>DustBuster</strong></a>      : Arduino-based automation for cleaning tasks
[+] <a href="https://github.com/keerthiparam/Password-Manager/blob/main/README.md" target="_blank" class="project-link"><strong>PasswordManager</strong></a> : Python & MySQL app for secure password management
`,

resume: () => {
  const url = 'https://docs.google.com/document/d/1_8awqWlxdFw7RIELNcMUJ54haw1jOJGvTQTLFg4NBT8/export?format=pdf';
  window.open(url, '_blank');
  
  return `[::] Fetching Keerthi_KP_Resume_2026.pdf\n\nIf it doesn't work, try pasting this link into your browser: ${url}`;
},

contact: `
<div class="section-title">== [+] CONTACT ==</div>
[+] <a href="mailto:parami.keerthi@gmail.com" class="contact-link"><strong>Email</strong></a>         : parami.keerthi@gmail.com
[+] <a href="https://github.com/keerthiparam" target="_blank" class="contact-link"><strong>GitHub</strong></a>        : github.com/keerthiparam
[+] <a href="https://linkedin.com/in/keerthiparam" target="_blank" class="contact-link"><strong>LinkedIn</strong></a>      : linkedin.com/in/keerthiparam
[+] <a href="https://instagram.com/keerthiparam_" target="_blank" class="contact-link"><strong>Instagram</strong></a>     : instagram.com/keerthiparam_
[+] <a href="https://discord.com/users/1154052200260194425" target="_blank" class="contact-link"><strong>Discord</strong></a>       : discord.com/users/1154052200260194425
[+] <a href="https://leetcode.com/u/keerthiparam/" target="_blank" class="contact-link"><strong>LeetCode</strong></a>      : leetcode.com/u/keerthiparam
`,

hobbies: `
<div class="section-title">== [+] HOBBIES ==</div>
[::] Check out my hobbies<a href="https://keerthiparam.github.io/photodump/" target="_blank" class="project-link"><strong>here</strong></a>.
For the best experience, view on desktop!
`,

source: `[::] View the source code on <a href="https://github.com/keerthiparam/KeerthiOS" target="_blank" class="source-link"><strong>GitHub</strong></a>`,

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
[~] Type or click <b class="clickable" data-cmd="help">'help'</b> to see what you can break.
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

const bootSequence =[
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
    .replace(/==\s*\[(.+?)\]\s*(.*?)\s*==/g, (_, symbol, title) => `<div class="section-header">==[${symbol}] <b>${title}</b> ==</div>`);
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
  const[firstCmd, ...args] = input.trim().split(" ");
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

  if (raw.length > 150 && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
    e.preventDefault();
    return;
  }

  if (e.key === "Enter") {
    if (!cmd) return;

    if (!isBooting) {
      appendOutput(`<span class="prompt">${promptHTML}</span><span class="cmd-echo">${escapeHTML(cmd)}</span>`, true);
    } else {
      appendOutput(`<span class="cmd-echo">${escapeHTML(cmd)}</span>`, true);
    }

    commandHistory.push(raw.trim()); // Save exact string the user typed for history
    historyIndex = commandHistory.length;
    const response = handleCommand(cmd);
    if (response) typeOutput(response, cmd);
    commandInput.value = "";
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
    return;
  }

  if (e.key === "Tab") {
    e.preventDefault();
    const input = commandInput.value.trim();
    if (!input) return;
    const matches = Object.keys(commands).filter(c => c.startsWith(input) && c !== input);
    if (matches.length === 1) {
      commandInput.value = matches[0];  // replace fully
    } else if (matches.length > 1) {
      appendOutput(`<span class="prompt">${promptHTML}</span><span class="cmd-echo">${escapeHTML(input)}</span>`, true);
      // Convert each match to a clickable span
      const clickableMatchesHTML = matches.map(cmd => 
      `<span class="clickable" data-cmd="${escapeHTML(cmd)}">${escapeHTML(cmd)}</span>`
      ).join('\n'); // add some spaces between

      appendOutput(clickableMatchesHTML, true);
    }
    return;
  }

  // RESTORED ARROW KEY NAVIGATION
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    } else if (historyIndex === 0 && commandHistory.length > 0) {
      commandInput.value = commandHistory[0];
    }
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex >= 0 && historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      commandInput.value = "";
    }
    return;
  }
});

output.addEventListener("click", (e) => {
  if (e.target.classList.contains("clickable")) {
    const cmd = e.target.getAttribute("data-cmd");
    if (cmd) {
      appendOutput(`<span class="prompt">${promptHTML}</span><span class="cmd-echo">${escapeHTML(cmd)}</span>`, true);
      
      // FIXED: Push clicked commands into history so arrow keys still work properly!
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;

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
  
  // Reveal input line and focus
  inputLine.style.display = "flex";
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
  inputLine.style.display = "none"; // Make sure it stays hidden during boot

  for (const line of bootSequence) {
    await typeLine(line, 150); // 1.5 seconds delay between parts
    await sleep(400);           // extra wait between lines
  }

  await sleep(100);
  output.innerHTML = ""; // clear output after boot

  appendOutput(commands.banner.trim(), true);
  appendOutput(commands.greet.trim(), true);

  isBooting = false;
  
  // Terminal Boot Finished! Show the prompt and focus it.
  inputLine.style.display = "flex";
  commandInput.disabled = false;
  commandInput.focus();
  window.scrollTo(0, document.body.scrollHeight);
}

window.onload = () => {
  const bootAlreadyShown = sessionStorage.getItem("bootShown");

  if (!bootAlreadyShown) {
    sessionStorage.setItem("bootShown", "true");
    bootAnimation(); // run boot once per session
  } else {
    isBooting = false;
    initializeTerminal(); // skip boot, go straight to terminal
    commandInput.disabled = false;
  }
};

function searchProfile(term) {
  const results =[];
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
        if (!sectionHits[section]) sectionHits[section] =[];
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