const preloadImages = [
  'static/1outcome.png',
  'static/2outcome.png',
  'static/3outcome.png',
  'static/4outcome.png',
  'static/5outcome.png',
  'static/6outcome.png'
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});


const clickSound = new Audio('static/click.mp3');
clickSound.volume = 0.4;

const heartbeatSound = new Audio('static/heartbeat.mp3');
heartbeatSound.volume = 0.6;
heartbeatSound.loop = true; // Loop heartbeat until user acts

const app = document.getElementById("app");

// Partner compatibility data (no names)
const partners = {
  a: [
    { id: "1a", gene: 94, personality: 32 },
    { id: "2a", gene: 55, personality: 88 }
  ],
  b: [
    { id: "1b", gene: 88, personality: 24 },
    { id: "2b", gene: 49, personality: 91 }
  ],
  c: [
    { id: "1c", gene: 73, personality: 64 },
    { id: "2c", gene: 99, personality: 15 }
  ]
};

// Outcome stories and background images
const outcomes = {
  "1a": {
    text: "10 years from now, you have 3 adorable children. However, your partner is not by your side. You have not talked to them for 2 years due to disagreements earlier in the relationship that did not seem trivial.",
    img: "static/1outcome.png"
  },
  "2a": {
    text: "After 10 years, you are finally blessed with a strong, healthy baby after trying again after 1 miscarriage. But you and your partner have been very supportive in this journey, and you are excited for the next chapter of your life with your baby.",
    img: "static/2outcome.png"
  },
  "1b": {
    text: "You and your partner start strong, but as the years go by, you both focus on your own careers. Eventually, you grow apart and live almost separate lives. You often wonder what life would’ve been like if you'd prioritized connection over compatibility.",
    img: "static/3outcome.png"
  },
  "2b": {
    text: "Despite genetic differences, you and your partner feel like soulmates. You adopt two children, travel the world together, and grow closer every year. Life isn’t perfect, but your support for each other helps you overcome any challenge.",
    img: "static/4outcome.png"
  },
  "1c": {
    text: "You and your partner are balanced—sometimes you disagree, sometimes you click perfectly. You raise one happy child, enjoy weekend picnics, and find peace in the life you’ve created together.",
    img: "static/5outcome.png"
  },
  "2c": {
    text: "Your child is a top-performing athlete and aces every exam. But your relationship feels cold. You're seen as a “power couple,” but inside your home, the silence says more than words. You both feel empty despite the success.",
    img: "static/6outcome.png"
  }
};

let currentStage = "a";

// Entry point
function renderIntro() {
    document.body.style.background = "#f7c8d4";
    document.body.style.backgroundImage = "url('static/bg-main.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    app.innerHTML = `
      <div class="fade-in">
      <h1>GeneMate Life Simulator</h1>
      <h2 class="subheading">A simulator that lets you explore how genetic matchmaking might shape your relationships, values, and future.</h2>
      <p class="intro-description">
        GeneMate is an interactive simulator that explores the ethical dilemmas of genetic-based dating apps. By choosing between partners with different levels of genetic and personality compatibility, you’ll uncover how your values influence the trajectory of your life.
      </p>
      <button class="continue-btn" onclick="startSimulation()">Upload DNA</button>
    `;
  }
  

// Start after DNA upload
function startSimulation() {
    renderDNAProfile();
  }

function renderDNAProfile() {
    // Randomly generate a genetic score between 50 and 100
    const geneticScore = Math.floor(Math.random() * 51) + 50;
  
    const traits = [
      { label: "Trait", value: "High resilience" },
      { label: "Mood", value: "Emotionally balanced" },
      { label: "Lifestyle", value: "Creative and curious" },
      { label: "Genetic Quirk", value: "Unusual sleep cycle 🌙" }
    ];
  
    let profileHTML = traits.map(t => `
      <p><strong>${t.label}:</strong> ${t.value}</p>
    `).join("");
  
    app.innerHTML = `
      <div class="fade-in">
      <h2>DNA Uploaded...</h2>
      <h3>Your Genetic Profile</h3>
      <div class="dna-card">
        <p class="genetic-score"><strong>Genetic Score:</strong> ${geneticScore}/100</p>
        ${profileHTML}
      </div>
      <button class="continue-btn" onclick="renderIdealPartnerScreen()">Continue</button>

    `;
  }

let chosenTraits = [];

function renderIdealPartnerScreen() {
    const traits = ["Emotionally Supportive", "Genetically Healthy", "Adventurous", "Highly Intelligent", "Attractive", "Loyal", "Calm", "Ambitious"];
  
    app.innerHTML = `
      <h2>Design Your Ideal Partner</h2>
      <p>Select up to <strong>3 traits</strong> you value most in a partner:</p>
      <div class="traits-container">
        ${traits.map(trait => `
          <button class="trait-btn" onclick="toggleTrait(this, '${trait}')">${trait}</button>
        `).join("")}
      </div>
      <br>
      <button class="continue-btn" id="startSimBtn" onclick="renderPartnerOptions('a')" disabled>Start Simulation</button>
    `;
  }
  
  
// Render current partner choices
function renderPartnerOptions(stage) {
    currentStage = stage;
  
    // Reset background
    document.body.style.background = "#f7c8d4";
    document.body.style.backgroundImage = "url('static/bg-main.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

  
    const labels = ["A", "B"];
  
    app.innerHTML = `<h2>Choose a partner (Round ${stage.toUpperCase()})</h2>`;
  
    partners[stage].forEach((partner, index) => {
      app.innerHTML += `
        <div class="partner-card">
          <h3>Partner ${labels[index]}</h3>
          <p>Genetic Compatibility: ${partner.gene}%</p>
          <p>Personality Compatibility: ${partner.personality}%</p>
          <button class="choice-btn" onclick="showOutcome('${partner.id}')">Choose Partner ${labels[index]}</button>
        </div>
      `;
    });
  
    // Stop heartbeat sound if still playing
    heartbeatSound.pause();
    heartbeatSound.currentTime = 0;
  }
  
  

// Show life outcome screen with image + options
function showOutcome(id) {
    const outcome = outcomes[id];
  
    // Start heartbeat sound
    heartbeatSound.currentTime = 0;
    heartbeatSound.play();
  
    // Set background image
    document.body.style.backgroundImage = `url('${outcome.img}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  
    // Show outcome
    app.innerHTML = `
      <div class="outcome-card">
        <h2>Based on your choice, this is what your life looks like...</h2>
        <p>${outcome.text}</p>
        ${
          currentStage === "c"
            ? `<button class="action-btn" onclick="renderReflection()">Commit to Life</button>`
            : `
              <button class="action-btn" onclick="renderPartnerOptions('${currentStage === 'a' ? 'b' : 'c'}')">Try Again</button>
              <button class="action-btn" onclick="renderReflection()">Commit to Life</button>
            `
        }
      </div>
    `;
  }
  
// Placeholder for reflection page (to be implemented next)
function renderReflection() {
    heartbeatSound.pause();
    heartbeatSound.currentTime = 0;

    // Reset background
    document.body.style.background = "#F7C8D4";
    document.body.style.backgroundImage = "";
  
    // Render the reflection content

    app.innerHTML = `
    <h2>Reflection</h2>
    <div class="fade-in">
    <p>Looking back, what mattered most to you when making decisions?</p>
    <button class="reflection-btn" onclick="showProfile('fairness')">Fairness & Equality</button>
    <button class="reflection-btn" onclick="showProfile('outcomes')">Optimization & Outcomes</button>
    <button class="reflection-btn" onclick="showProfile('autonomy')">Autonomy & Individual Rights</button>
    <button class="reflection-btn" onclick="showProfile('compassion')">Compassion & Emotional Connection</button>
    `;
   
  }

// Start the simulation on page load
renderIntro();

function showProfile(choice) {
    const profiles = {
      fairness: {
        title: "The Empathetic Equalizer",
        description: "You wanted everyone to have a fair shot, regardless of genetic traits or advantage. You value equality above all.",
      },
      outcomes: {
        title: "The Efficient Optimizer",
        description: "You focused on maximizing compatibility and improving life outcomes, aiming for the best possible results.",
      },
      autonomy: {
        title: "The Autonomy Defender",
        description: "You prioritized freedom, privacy, and the right to choose freely without being judged by your genes.",
      },
      compassion: {
        title: "The Compassionate Connector",
        description: "You cared most about emotional well-being and how people feel — valuing empathy and meaningful connection.",
      }
    };
  
    const profile = profiles[choice];
  
    app.innerHTML = 
        `
      <h2>Your Ethical Profile</h2>
      <div class="fade-in">
      <h3>${profile.title}</h3>
      <p>${profile.description}</p>
      <button class="continue-btn" onclick="showEthicsPage()">Learn More About the Ethical Dilemma</button>
    `;
  }

  
  function showEthicsPage() {
    app.innerHTML = `
      <h2>Ethical Dilemmas of Genetic-Based Dating</h2>
      <div class="fade-in">
      <p>
        GeneMate is more than a game — it reflects a real ethical dilemma at the intersection of love, science, and society.
        Imagine a world where algorithms filter your potential partners not by shared experiences or emotional chemistry, but by DNA markers and probability scores.
      </p>
  
      <p>
        While genetic matching may promise better health, stronger relationships, and fewer surprises, it also raises critical questions:
        Who gets to define what’s "desirable"? What happens to people with lower compatibility scores? Are we designing love or discriminating with data?
      </p>
  
      <hr style="margin: 2rem 0;">
  
      <h3>Deontology (Duty & Rights)</h3>
      <p>
        A deontological view reminds us that people should never be treated as means to an end. Using genetics to filter love may violate privacy, consent, and dignity, turning human connection into a transaction.
      </p>
  
      <h3>Care Ethics (Relationships & Empathy)</h3>
      <p>
        Care ethics values vulnerability, compassion, and the messiness of real relationships. It warns against systems that ignore emotional nuance in favor of cold optimization.
      </p>
  
      <h3>Utilitarianism (Maximize Happiness)</h3>
      <p>
        From a utilitarian lens, genetic matching could improve collective outcomes, healthier families, happier couples. But it also risks marginalizing those who don’t fit the "ideal" profile. Is the harm worth the gain?
      </p>
  
      <h3>Justice as Fairness (Systemic Perspective)</h3>
      <p>
        A just system is one you'd accept even if you didn't know your own position in it. Genetic dating apps may benefit the genetically privileged, but would you support it if you were born with lower compatibility scores?
      </p>
  
      <hr style="margin: 2rem 0;">
  
      <h3>🔎 Questions Worth Asking</h3>
      <ul style="text-align: left; max-width: 700px; margin: 0 auto;">
        <li>Should genes define who we love?</li>
        <li>Is this empowering or invasive?</li>
        <li>Do these tools reinforce inequality? or reduce uncertainty?</li>
        <li>Are we choosing for ourselves? or being shaped by invisible algorithms?</li>
      </ul>
  
      <br><br>
      <button class="continue-btn" onclick="showAboutPage()">About the Project</button>
      <button class="continue-btn" onclick="renderIntro()">Restart Simulation</button>

      
    `;
  }
  
  function showAboutPage() {
    app.innerHTML = `
      <h2>About the Project</h2>
      <div class="fade-in">
      <p>Hello! I'm <strong>Gadis Masita</strong>, a student in Computational Social Science. I designed this genetic-based dating simulator to explore the ethical dilemmas surrounding the use of genetic data in romantic matchmaking.</p>
      <p>
      The aim of this project is to raise awareness about how emerging technologies especially those involving genetics and algorithms, can impact human relationships, autonomy, and social justice. By presenting life outcomes based on users' choices, the simulation forces reflection on how genetic compatibility is perceived and prioritized. It challenges users to confront the ethical weight of their decisions, questioning whether value is placed on emotional connection, fairness, or genetic advantage and what kind of future that value system might create.
      </p>
  
      <h3>📚 Additional Information you might find Useful</h3>
      <ul style="text-align: left; max-width: 800px; margin: 0 auto;">
        <li>Beckstein, M., & De Vries, B. (2024). Dating Apps as Tools for Social Engineering. Ethics and Information Technology.</li>
        <li>Comfort, N. C. (2018). Can We Cure Genetic Diseases Without Slipping into Eugenics? Nature.</li>
        <li>Conley, D., Fletcher, J., & Dawes, C. (2014). The Emergence of Socio-Genomics. Contemporary Sociology.</li>
        <li>Farrelly, C. (2002). Genes and Social Justice: A Rawlsian Reply to Moore. Bioethics.</li>
        <li>Held, V. (2006). The Ethics of Care: Personal, Political, and Global. Oxford University Press.</li>
        <li>Narr, G. (2023). The Uncanny Swipe Drive*. Media Theory.</li>
        <li>Nuffield Council on Bioethics. (2018). *Genome Editing and Human Reproduction: Social and Ethical Issues.</li>
        <li>Rawls, J. (1971). A Theory of Justice. Harvard University Press.</li>
        <li>Savulescu, J., & Kahane, G. (2009). The Moral Obligation to Create Children with the Best Chance of the Best Life. Bioethics.</li>
        <li>Tronto, J. C. (1993). Moral Boundaries: A Political Argument for an Ethic of Care. Routledge.</li>
      </ul>
  
      <br><br>
      <button class="continue-btn" onclick="renderIntro()">Restart Simulation</button>
    `;
  }
  
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      clickSound.play();
    }
  });
  
function toggleTrait(button, trait) {
    if (chosenTraits.includes(trait)) {
      chosenTraits = chosenTraits.filter(t => t !== trait);
      button.classList.remove("selected");
    } else {
      if (chosenTraits.length < 3) {
        chosenTraits.push(trait);
        button.classList.add("selected");
      }
    }
  
    // Enable continue button if at least 1 trait is selected
    const startBtn = document.getElementById("startSimBtn");
    startBtn.disabled = chosenTraits.length === 0;
  }
  
