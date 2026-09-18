/**
 * PRONUNCIATION WITH MISS NGUYET — CONTROLLER & AUDIO ENGINE
 * Hệ Thống Sidebar Trái & 19 Units Bài Học Học Theo Cặp (Pair-by-Pair Studio)
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    accent: localStorage.getItem("miss_nguyet_accent") || "UK",
    speed: parseFloat(localStorage.getItem("miss_nguyet_speed")) || 1.0,
    currentView: "overview",
    currentUnitId: "unit_1",
    activeSoundId: "i_long",
    quiz: {
      score: 0,
      total: 0,
      streak: 0,
      currentQuestion: null,
      answered: false
    }
  };

  // ==========================================================================
  // 1. REAL AUDIO ENGINE (PHÁT ÂM RIÊNG BIỆT TỪNG ÂM ĐƠN LẬP & TỪ PHÒNG THU)
  // ==========================================================================
  const AudioEngine = {
    currentAudio: null,

    // Phát Âm Đơn Lập Gốc từ file MP3 trích xuất của cô giáo
    playPhoneme(sound) {
      this.stop();

      if (sound && sound.phonemeAudioUrl) {
        this.currentAudio = new Audio(sound.phonemeAudioUrl);
        this.currentAudio.playbackRate = state.speed;

        this.currentAudio.play().catch(() => {
          this.playWord(sound.sampleWord || sound.keyWord);
        });
      } else if (sound) {
        this.playWord(sound.sampleWord || sound.keyWord);
      }
    },

    // Phát Âm Từ Vựng Mẫu chuẩn phòng thu Oxford / Google CDN
    playWord(wordText) {
      if (!wordText) return;
      this.stop();

      const clean = wordText.toLowerCase().trim().replace(/[^a-z]/g, "");
      const langSuffix = state.accent === "US" ? "_us_1" : "_gb_1";
      const audioUrl = `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${clean}--${langSuffix}.mp3`;

      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.playbackRate = state.speed;

      this.currentAudio.play().catch(() => {
        this.fallbackTTS(wordText);
      });
    },

    // Phát Câu Ngữ Cảnh
    playSentence(sentenceText) {
      this.stop();
      this.fallbackTTS(sentenceText);
    },

    stop() {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },

    fallbackTTS(text) {
      if (!("speechSynthesis" in window)) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = state.speed;
      utterance.lang = state.accent === "US" ? "en-US" : "en-GB";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Global Helpers for HTML inline onclicks
  window.__playPhonemeAudio = function(soundId) {
    const sound = IPA_DATA.sounds.find(s => s.id === soundId);
    if (sound) AudioEngine.playPhoneme(sound);
  };
  window.__playWordAudio = function(word) {
    AudioEngine.playWord(word);
  };
  window.__playSentenceAudio = function(sentence) {
    AudioEngine.playSentence(sentence);
  };

  // ==========================================================================
  // UNIT LISTENING TEST STATE & ACTIONS (BÀI TẬP LUYỆN TAI NGHE THEO TỪNG UNIT)
  // ==========================================================================
  const unitTests = {};

  function getOrInitUnitTest(unit) {
    if (!unitTests[unit.id]) {
      const sourcePairs = unit.testPairs && unit.testPairs.length > 0 ? unit.testPairs : unit.minimalPairs;
      unitTests[unit.id] = sourcePairs.map((p, idx) => {
        const isChoiceA = Math.random() > 0.5;
        return {
          qIndex: idx,
          pair: p,
          targetChoice: isChoiceA ? "A" : "B",
          targetWord: isChoiceA ? p.wordA : p.wordB,
          userChoice: null,
          isCorrect: null
        };
      });
    }
    return unitTests[unit.id];
  }

  window.__playUnitTestAudio = function(unitId, qIndex) {
    const questions = unitTests[unitId];
    if (questions && questions[qIndex]) {
      AudioEngine.playWord(questions[qIndex].targetWord);
    }
  };

  window.__submitUnitTestChoice = function(unitId, qIndex, choice) {
    const questions = unitTests[unitId];
    if (!questions || !questions[qIndex]) return;
    const q = questions[qIndex];
    if (q.userChoice !== null) return;

    q.userChoice = choice;
    q.isCorrect = (choice === q.targetChoice);

    renderPairedUnit(unitId);
    AudioEngine.playWord(q.targetWord);
  };

  window.__resetUnitTest = function(unitId) {
    const unit = IPA_DATA.pairedUnits.find(u => u.id === unitId);
    if (!unit) return;
    const sourcePairs = unit.testPairs && unit.testPairs.length > 0 ? unit.testPairs : unit.minimalPairs;
    unitTests[unitId] = sourcePairs.map((p, idx) => {
      const isChoiceA = Math.random() > 0.5;
      return {
        qIndex: idx,
        pair: p,
        targetChoice: isChoiceA ? "A" : "B",
        targetWord: isChoiceA ? p.wordA : p.wordB,
        userChoice: null,
        isCorrect: null
      };
    });
    renderPairedUnit(unitId);
  };

  // ==========================================================================
  // 2. SVG ARTICULATION VISUALIZER (ẢNH MINH HỌA KHẨU HÌNH)
  // ==========================================================================
  const MouthVisualizer = {
    getSVG(mouthType) {
      if (mouthType === "spread" || mouthType === "spread-half" || mouthType === "glide-open-spread" || mouthType === "glide-spread-neutral") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#F0F7FC" stroke="#BCD8ED" stroke-width="2.5"/>
            <path d="M 30 70 Q 70 52 110 70 Q 70 94 30 70 Z" fill="#FFAAA6" stroke="#D36B66" stroke-width="2.5" />
            <path d="M 40 70 Q 70 60 100 70 Q 70 82 40 70 Z" fill="#6A1B29" />
            <rect x="52" y="62" width="36" height="7" rx="3" fill="#FFFFFF" />
            <rect x="56" y="72" width="28" height="6" rx="2" fill="#FFFFFF" />
            <path d="M 22 70 L 14 70 M 17 66 L 13 70 L 17 74" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 118 70 L 126 70 M 123 66 L 127 70 L 123 74" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
            <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#0B4468" text-anchor="middle">Môi cười bè rộng</text>
          </svg>
        `;
      }

      if (mouthType === "round-small" || mouthType === "round-loose" || mouthType === "glide-neutral-round" || mouthType === "labial-velar") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#F8F5FD" stroke="#D8C7F6" stroke-width="2.5"/>
            <circle cx="70" cy="70" r="26" fill="#FFAAA6" stroke="#D36B66" stroke-width="2.5"/>
            <circle cx="70" cy="70" r="11" fill="#6A1B29" />
            <path d="M 70 30 L 70 38 M 66 34 L 70 38 L 74 34" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 70 110 L 70 102 M 66 106 L 70 102 L 74 106" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
            <text x="70" y="126" font-family="system-ui" font-size="10" font-weight="700" fill="#4C1D95" text-anchor="middle">Chu tròn nhỏ xíu</text>
          </svg>
        `;
      }

      if (mouthType === "open-wide" || mouthType === "open-wide-flat" || mouthType === "open-mid" || mouthType === "glide-open-round") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#FFF5F2" stroke="#FDC7B8" stroke-width="2.5"/>
            <ellipse cx="70" cy="68" rx="34" ry="28" fill="#FFAAA6" stroke="#D36B66" stroke-width="2.5"/>
            <ellipse cx="70" cy="68" rx="24" ry="18" fill="#6A1B29"/>
            <path d="M 52 74 Q 70 82 88 74" fill="#FF8B8B" stroke="#D36B66" stroke-width="2"/>
            <rect x="56" y="52" width="28" height="6" rx="2" fill="#FFFFFF"/>
            <path d="M 70 104 L 70 116 M 66 112 L 70 116 L 74 112" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"/>
            <text x="70" y="130" font-family="system-ui" font-size="10" font-weight="700" fill="#7C2D12" text-anchor="middle">Hạ hàm mở rộng</text>
          </svg>
        `;
      }

      if (mouthType === "round-oval" || mouthType === "round-mid" || mouthType === "glide-round-spread" || mouthType === "glide-round-neutral") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#F2FAF5" stroke="#BCEAC9" stroke-width="2.5"/>
            <ellipse cx="70" cy="68" rx="24" ry="24" fill="#FFAAA6" stroke="#D36B66" stroke-width="2.5"/>
            <ellipse cx="70" cy="68" rx="14" ry="15" fill="#6A1B29"/>
            <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#14532D" text-anchor="middle">Môi tròn bầu dục</text>
          </svg>
        `;
      }

      if (mouthType === "dental-fricative") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#FFFBEB" stroke="#FDE68A" stroke-width="2.5"/>
            <ellipse cx="70" cy="68" rx="36" ry="18" fill="#FFAAA6" stroke="#D36B66" stroke-width="2"/>
            <rect x="46" y="56" width="48" height="8" fill="#FFFFFF" stroke="#CBD5E1"/>
            <rect x="48" y="74" width="44" height="8" fill="#FFFFFF" stroke="#CBD5E1"/>
            <ellipse cx="70" cy="69" rx="16" ry="7" fill="#FF7E79" stroke="#E11D48" stroke-width="2"/>
            <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#92400E" text-anchor="middle">Thè đầu lưỡi kẹp 2 răng</text>
          </svg>
        `;
      }

      if (mouthType === "labiodental-fricative") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="2.5"/>
            <path d="M 40 60 Q 70 50 100 60" fill="none" stroke="#D36B66" stroke-width="4" stroke-linecap="round"/>
            <rect x="52" y="58" width="36" height="12" rx="2" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>
            <path d="M 38 72 Q 70 82 102 72 Q 70 66 38 72 Z" fill="#FFAAA6" stroke="#D36B66" stroke-width="2"/>
            <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#1E40AF" text-anchor="middle">Răng trên cắn môi dưới</text>
          </svg>
        `;
      }

      if (mouthType === "bilabial-plosive" || mouthType === "bilabial-nasal") {
        return `
          <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="64" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="2.5"/>
            <path d="M 34 70 Q 70 58 106 70" fill="none" stroke="#D36B66" stroke-width="6" stroke-linecap="round"/>
            <path d="M 34 70 Q 70 82 106 70" fill="none" stroke="#D36B66" stroke-width="6" stroke-linecap="round"/>
            <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#9D174D" text-anchor="middle">Mím 2 môi rồi bật hơi</text>
          </svg>
        `;
      }

      return `
        <svg viewBox="0 0 140 140" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="70" r="64" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2.5"/>
          <path d="M 32 50 Q 70 38 108 50" fill="none" stroke="#64748B" stroke-width="3"/>
          <path d="M 42 88 Q 62 82 72 52 Q 80 68 96 88" fill="#FF8B8B" stroke="#D36B66" stroke-width="2.5"/>
          <text x="70" y="122" font-family="system-ui" font-size="10" font-weight="700" fill="#334155" text-anchor="middle">Đầu lưỡi tì nướu trên</text>
        </svg>
      `;
    }
  };

  // ==========================================================================
  // 3. NAVIGATION ROUTER (CHUYỂN TAB & BÀI HỌC)
  // ==========================================================================
  function isUnitLocked(unitId) {
    if (!unitId) return false;
    const match = unitId.match(/unit_(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return num > 9; // Đã mở khóa hết Nguyên Âm Đơn (Unit 1-6) và Nguyên Âm Đôi (Unit 7-9). Khóa từ Unit 10 đến 19 (Phụ âm).
    }
    return false;
  }

  window.navigateTo = function(viewId, unitId = null) {
    state.currentView = viewId;
    if (unitId) state.currentUnitId = unitId;

    // 1. Cập nhật Sidebar items active
    document.querySelectorAll(".sidebar-nav-item").forEach(item => {
      const v = item.getAttribute("data-view");
      const u = item.getAttribute("data-unit-id");
      if (viewId === "unit") {
        item.classList.toggle("active", v === "unit" && u === unitId);
      } else {
        item.classList.toggle("active", v === viewId);
      }
    });

    // 2. Ẩn hiện các view
    document.querySelectorAll(".app-view").forEach(view => {
      view.classList.toggle("active", view.id === `view_${viewId}`);
    });

    // 3. Tải nội dung view tương ứng
    if (viewId === "unit") {
      renderPairedUnit(unitId || state.currentUnitId);
    } else if (viewId === "chart") {
      renderIPAChart();
      updateLiveInspector(state.activeSoundId);
    } else if (viewId === "quiz") {
      setupNewQuizQuestion();
    } else if (viewId === "rules") {
      renderRules();
    }

    // 4. Cuộn lên đầu trang & đóng sidebar trên Mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
    const sidebar = document.getElementById("appSidebar");
    if (sidebar) sidebar.classList.remove("sidebar-open");
  };

  // Bind click vào toàn bộ sidebar nav items
  document.querySelectorAll(".sidebar-nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view");
      const unit = btn.getAttribute("data-unit-id");
      if (view === "unit" && isUnitLocked(unit)) {
        if (typeof AUTH !== "undefined" && AUTH.showToast) {
          AUTH.showToast("🔒 Phần Phụ Âm đang tạm khóa theo tiến độ của cô giáo.");
        }
      }
      window.navigateTo(view, unit);
    });
  });

  // Toggle Sidebar trên Mobile
  const mobileToggle = document.getElementById("mobileSidebarToggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const sidebar = document.getElementById("appSidebar");
      if (sidebar) sidebar.classList.toggle("sidebar-open");
    });
  }

  // ==========================================================================
  // 4. RENDER HỌC THEO CẶP (PAIR-BY-PAIR LESSON ARENA)
  // ==========================================================================
  function renderPairedUnit(unitId) {
    const container = document.getElementById("unitLessonContent");
    if (!container || !window.IPA_DATA) return;

    const unit = IPA_DATA.pairedUnits.find(u => u.id === unitId) || IPA_DATA.pairedUnits[0];

    // Kiểm tra nếu Unit bị khóa (Phụ âm: Unit 10 đến 19)
    if (isUnitLocked(unit.id)) {
      container.innerHTML = `
        <div class="locked-unit-wrapper">
          <div class="locked-unit-card">
            <div class="locked-icon-badge">🔒</div>
            <h2 class="locked-title">${unit.title}</h2>
            <div class="locked-brand">NỘI DUNG ĐANG TẠM KHÓA • MISS NGUYET</div>
            <p class="locked-desc">
              Phần bài học <strong>${unit.sectionName}</strong> đang được tạm khóa theo kế hoạch giảng dạy của cô giáo.<br>
              Bạn hãy hoàn thành xuất sắc <strong>các bài học Nguyên Âm Đơn &amp; Nguyên Âm Đôi (Unit 1 – Unit 9)</strong> để nắm thật vững kiến thức nền tảng trước nhé!
            </p>
            <div class="locked-btn-group">
              <button class="btn-back-unlocked" onclick="window.navigateTo('unit', 'unit_1')">
                <span>⬅️ Về Học Unit 1 (/iː/ &amp; /ɪ/)</span>
              </button>
              <button class="btn-back-unlocked btn-quiz" onclick="window.navigateTo('quiz')">
                <span>🏆 Luyện Trắc Nghiệm Tai Nghe</span>
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const sounds = unit.soundIds.map(sid => IPA_DATA.sounds.find(s => s.id === sid)).filter(Boolean);

    // 1. Tạo các cột thẻ âm (2 hoặc 3 cột song song)
    const soundCardsHtml = sounds.map((sound, idx) => `
      <div class="unit-sound-card">
        <span class="sound-card-top-tag">${idx === 0 ? "ÂM ĐẦU TIÊN (A)" : idx === 1 ? "ÂM ĐỐI TRỌNG (B)" : "ÂM THỨ BA (C)"}</span>
        <div class="unit-sound-symbol">/${sound.symbol}/</div>
        <div class="unit-sound-name">${sound.name}</div>
        
        <div class="unit-mouth-img-box">
          <img src="${sound.mouthImage || `images/mouth/${sound.id}.png`}" alt="Khẩu hình /${sound.symbol}/" class="unit-mouth-img" onerror="this.src='images/mouth/${sound.id}.png'">
        </div>

        <div class="unit-audio-buttons-row">
          <button class="btn-play-action btn-play-phoneme" onclick="window.__playPhonemeAudio('${sound.id}')">
            <span>🔊</span> Nghe Âm /${sound.symbol}/
          </button>
          <button class="btn-play-action btn-play-word" onclick="window.__playWordAudio('${sound.keyWord}')">
            <span>🔊</span> Nghe Từ "${sound.keyWord}" ${sound.keyWordIPA}
          </button>
        </div>

        <div class="unit-steps-box">
          <div style="font-size:0.78rem; font-weight:800; color:var(--text-muted); margin-bottom:6px;">👄 4 Bước Khẩu Hình:</div>
          ${sound.fourSteps.map(st => `
            <div class="unit-step-row">
              <strong>${st.step}. ${st.title}:</strong> ${st.desc}
            </div>
          `).join("")}
        </div>

        <div class="unit-chips-container">
          <div class="unit-chips-label">📌 Bấm để nghe ví dụ:</div>
          <div class="unit-chips-flex">
            ${sound.examples.map(ex => `
              <div class="unit-chip-item" onclick="window.__playWordAudio('${ex.word}')">
                <span>🔊</span> <strong>${ex.word}</strong> <small style="color:var(--text-muted);">${ex.ipa}</small>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");

    // 2. Tạo bảng so sánh đối lập
    const contrastRowsHtml = unit.contrastTable.map(row => `
      <tr>
        <td>${row.feature}</td>
        <td class="side-a-col">${row.sideA}</td>
        <td class="side-b-col">${row.sideB}</td>
      </tr>
    `).join("");

    // 3. Tạo các dòng từ Minimal Pairs
    const minimalPairsHtml = unit.minimalPairs.map(p => `
      <div class="pair-word-row">
        <div class="pair-item-col" style="flex:1;">
          <div class="pair-word-text">${p.wordA}</div>
          <div class="pair-word-ipa">${p.ipaA}</div>
          <div class="pair-word-mean">${p.meanA}</div>
        </div>

        <button class="card-mini-btn" onclick="window.__playWordAudio('${p.wordA}')" title="Nghe ${p.wordA}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>

        <span style="font-size:0.75rem; font-weight:800; color:var(--brand-primary); margin:0 8px;">VS</span>

        <button class="card-mini-btn" onclick="window.__playWordAudio('${p.wordB}')" title="Nghe ${p.wordB}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>

        <div class="pair-item-col" style="flex:1; text-align:right;">
          <div class="pair-word-text">${p.wordB}</div>
          <div class="pair-word-ipa">${p.ipaB}</div>
          <div class="pair-word-mean">${p.meanB}</div>
        </div>
      </div>
    `).join("");

    // 4. Tạo các câu ngữ cảnh
    const sentencesHtml = unit.minimalPairs.slice(0, 3).map(p => `
      <div class="sentence-grid-row">
        <div class="sentence-box">
          <div class="sentence-en">
            "${p.sentenceA.replace(new RegExp(`\\b${p.wordA}\\b`, "i"), `<span class="sentence-highlight">${p.wordA}</span>`)}"
          </div>
          <div class="sentence-action-row">
            <span style="font-size:0.8rem; color:var(--text-muted);">${p.wordA} (${p.meanA})</span>
            <button class="btn-play-sentence" onclick="window.__playSentenceAudio('${p.sentenceA}')">
              <span>🔊</span> Nghe câu
            </button>
          </div>
        </div>

        <div class="sentence-box">
          <div class="sentence-en">
            "${p.sentenceB.replace(new RegExp(`\\b${p.wordB}\\b`, "i"), `<span class="sentence-highlight">${p.wordB}</span>`)}"
          </div>
          <div class="sentence-action-row">
            <span style="font-size:0.8rem; color:var(--text-muted);">${p.wordB} (${p.meanB})</span>
            <button class="btn-play-sentence" onclick="window.__playSentenceAudio('${p.sentenceB}')">
              <span>🔊</span> Nghe câu
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // 5. Tạo Bài Tập Luyện Tai Nghe Theo Unit (Ear Training & Word Checking)
    const testQuestions = getOrInitUnitTest(unit);
    const answeredCount = testQuestions.filter(q => q.userChoice !== null).length;
    const correctCount = testQuestions.filter(q => q.isCorrect === true).length;
    const totalQuestions = testQuestions.length;
    const isCompleted = answeredCount === totalQuestions;

    const listeningQuestionsHtml = testQuestions.map((q, idx) => {
      const answered = q.userChoice !== null;
      const isCorrect = q.isCorrect;

      const choiceAClass = answered
        ? (q.userChoice === "A" ? (isCorrect ? "selected-correct" : "selected-incorrect") : (q.targetChoice === "A" ? "reveal-correct" : ""))
        : "";
      const choiceBClass = answered
        ? (q.userChoice === "B" ? (isCorrect ? "selected-correct" : "selected-incorrect") : (q.targetChoice === "B" ? "reveal-correct" : ""))
        : "";

      const checkMarkA = answered && q.userChoice === "A" ? (isCorrect ? "✓" : "✕") : (answered && q.targetChoice === "A" ? "✓" : "");
      const checkMarkB = answered && q.userChoice === "B" ? (isCorrect ? "✓" : "✕") : (answered && q.targetChoice === "B" ? "✓" : "");

      let statusMsg = "";
      if (answered) {
        statusMsg = isCorrect
          ? `<span class="q-feedback-status q-status-correct">🎉 Chính xác! (Từ: "${q.targetWord}")</span>`
          : `<span class="q-feedback-status q-status-incorrect">❌ Chưa đúng! Từ đọc là "${q.targetWord}".</span>`;
      } else {
        statusMsg = `<span style="font-size:0.8rem; color:var(--text-light);">(Chưa stick)</span>`;
      }

      return `
        <div class="listening-q-card">
          <span class="q-num-tag">Câu ${idx + 1}</span>

          <button class="btn-q-audio" onclick="window.__playUnitTestAudio('${unit.id}', ${idx})" title="Nghe từ câu ${idx + 1}">
            <span>🔊</span> Nghe từ
          </button>

          <div class="tick-options-row">
            <button class="tick-choice-btn ${choiceAClass}" onclick="window.__submitUnitTestChoice('${unit.id}', ${idx}, 'A')" ${answered ? "disabled" : ""}>
              <span class="tick-box-indicator">${checkMarkA}</span>
              <strong>${q.pair.wordA}</strong> <small style="color:var(--text-muted); font-family:var(--font-ipa);">${q.pair.ipaA}</small> <span style="font-size:0.76rem; color:var(--text-muted);">(${q.pair.meanA})</span>
            </button>

            <button class="tick-choice-btn ${choiceBClass}" onclick="window.__submitUnitTestChoice('${unit.id}', ${idx}, 'B')" ${answered ? "disabled" : ""}>
              <span class="tick-box-indicator">${checkMarkB}</span>
              <strong>${q.pair.wordB}</strong> <small style="color:var(--text-muted); font-family:var(--font-ipa);">${q.pair.ipaB}</small> <span style="font-size:0.76rem; color:var(--text-muted);">(${q.pair.meanB})</span>
            </button>
          </div>

          <div>${statusMsg}</div>
        </div>
      `;
    }).join("");

    // 6. Xác định Unit tiếp theo
    const currentIndex = IPA_DATA.pairedUnits.findIndex(u => u.id === unit.id);
    let nextUnit = IPA_DATA.pairedUnits[currentIndex + 1] || null;
    if (nextUnit && isUnitLocked(nextUnit.id)) {
      nextUnit = null; // Đã học hết các bài mở, chuyển hướng sang làm Quiz tổng hợp
    }
    const prevUnit = IPA_DATA.pairedUnits[currentIndex - 1] || null;

    container.innerHTML = `
      <div class="unit-lesson-wrapper">
        
        <!-- Top Hero -->
        <div class="unit-top-hero">
          <div class="unit-title-group">
            <div class="hero-badge">${unit.sectionName.toUpperCase()} • ${unit.badge}</div>
            <h2 class="unit-hero-heading">${unit.title}</h2>
            <div class="unit-hero-sub">${unit.subtitle}</div>
          </div>
        </div>

        <!-- Contrast Summary Box -->
        <div class="unit-contrast-summary-box">
          <span class="contrast-summary-icon">💡</span>
          <span class="contrast-summary-text">${unit.contrastSummary}</span>
        </div>

        <!-- 2 Cột Đối Chiếu Song Song -->
        <div class="unit-dual-grid" style="grid-template-columns: repeat(${sounds.length}, 1fr);">
          ${soundCardsHtml}
        </div>

        <!-- Bảng So Sánh Đối Lập -->
        <div class="unit-contrast-section">
          <h3 class="section-sub-title">
            <span>⚖️ Bảng So Sánh Đối Chiếu Khẩu Hình &amp; Lỗi Thường Gặp</span>
          </h3>
          <table class="unit-contrast-table">
            <thead>
              <tr>
                <th>Đặc điểm cấu âm</th>
                <th class="side-a-col">Âm /${sounds[0]?.symbol}/</th>
                <th class="side-b-col">Âm /${sounds[1]?.symbol}/</th>
              </tr>
            </thead>
            <tbody>
              ${contrastRowsHtml}
            </tbody>
          </table>
        </div>

        <!-- Minimal Pairs Practice -->
        <div class="unit-pairs-section">
          <h3 class="section-sub-title">
            <span>🎯 Luyện Phân Biệt Cặp Từ Tối Thiểu (Minimal Pairs)</span>
          </h3>
          <div class="pair-words-grid">
            ${minimalPairsHtml}
          </div>
        </div>

        <!-- Context Sentences Practice -->
        <div class="unit-contrast-section">
          <h3 class="section-sub-title">
            <span>💬 Luyện Đọc Cặp Câu Phân Biệt Ngữ Cảnh</span>
          </h3>
          <div>
            ${sentencesHtml}
          </div>
        </div>

        <!-- BÀI TẬP LUYỆN TAI NGHE & TICK TỪ THEO UNIT -->
        <div class="unit-listening-test-section">
          <div class="listening-test-header">
            <div class="test-header-left">
              <div class="hero-badge" style="background:#DBEAFE; border-color:#93C5FD; color:#1E40AF;">🎧 BÀI TẬP LUYỆN TAI NGHE THEO BÀI</div>
              <h3 class="listening-test-title">Luyện Nghe &amp; Stick Vào Từ Bạn Nghe Được</h3>
              <p class="listening-test-desc">Bấm vào nút loa <strong>"🔊 Nghe từ"</strong> ở từng câu, sau đó stick (chọn) từ chính xác để rèn luyện phản xạ phân biệt 2 âm.</p>
            </div>
            <div class="test-score-badge">
              🎯 Kết quả: <strong style="color:var(--brand-primary-dark); font-size:1.15rem;">${correctCount} / ${totalQuestions}</strong> câu đúng
            </div>
          </div>

          <div class="listening-test-list">
            ${listeningQuestionsHtml}
          </div>

          <div class="test-summary-footer">
            <span style="font-size:0.9rem; color:var(--text-muted);">
              ${isCompleted ? (correctCount === totalQuestions ? "🌟 Tuyệt đỉnh! Bạn đã phân biệt chính xác 100% các từ của Unit này!" : "💪 Hãy bấm 'Làm lại bài nghe' để luyện thêm cho đến khi đạt 100% nhé!") : `👉 Đã làm: ${answeredCount}/${totalQuestions} câu. Hãy nghe và chọn hết các câu nhé!`}
            </span>
            <button class="btn-retry-test" onclick="window.__resetUnitTest('${unit.id}')">
              <span>🔄</span> Làm lại bài nghe (Đổi từ ngẫu nhiên)
            </button>
          </div>
        </div>

        <!-- Unit Footer Navigation -->
        <div class="unit-nav-footer">
          ${prevUnit ? `
            <button class="btn-unit-nav btn-unit-nav-prev" onclick="window.navigateTo('unit', '${prevUnit.id}')">
              <span>⬅️</span> ${prevUnit.title}
            </button>
          ` : `<div></div>`}

          ${nextUnit ? `
            <button class="btn-unit-nav" onclick="window.navigateTo('unit', '${nextUnit.id}')">
              <span>Học tiếp: ${nextUnit.title}</span> <span>➡️</span>
            </button>
          ` : `
            <button class="btn-unit-nav" onclick="window.navigateTo('quiz')">
              <span>Thử Thách Trắc Nghiệm Tai Nghe Tổng Hợp 🏆</span>
            </button>
          `}
        </div>

      </div>
    `;
  }

  // ==========================================================================
  // 5. RENDER BẢNG 44 ÂM TỔNG THỂ & LIVE INSPECTOR
  // ==========================================================================
  function updateLiveInspector(soundId) {
    if (!window.IPA_DATA) return;
    const sound = IPA_DATA.sounds.find(s => s.id === soundId) || IPA_DATA.sounds[0];
    state.activeSoundId = sound.id;

    const svgBox = document.getElementById("inspSvgBox");
    if (svgBox) {
      svgBox.innerHTML = `<img src="${sound.mouthImage || `images/mouth/${sound.id}.png`}" alt="Khẩu hình /${sound.symbol}/" class="inspector-mouth-img" onerror="this.src='images/mouth/${sound.id}.png'">`;
    }

    const symbEl = document.getElementById("inspSymbol");
    const nameEl = document.getElementById("inspSoundName");
    const kwEl = document.getElementById("inspKeyWord");
    const kwIpaEl = document.getElementById("inspKeyWordIPA");
    const meanEl = document.getElementById("inspMeaning");

    if (symbEl) symbEl.textContent = `/${sound.symbol}/`;
    if (nameEl) nameEl.textContent = sound.name;
    if (kwEl) kwEl.textContent = sound.keyWord;
    if (kwIpaEl) kwIpaEl.textContent = sound.keyWordIPA;
    if (meanEl) meanEl.textContent = sound.meaning ? `(${sound.meaning})` : "";

    const pitEl = document.getElementById("inspPitfall");
    const tipEl = document.getElementById("inspProTip");
    if (pitEl) pitEl.textContent = sound.vietnamesePitfall;
    if (tipEl) tipEl.textContent = sound.proTip;

    const stepsContainer = document.getElementById("inspFourSteps");
    if (stepsContainer && sound.fourSteps) {
      stepsContainer.innerHTML = sound.fourSteps.map(st => `
        <div class="step-card-item">
          <div class="step-badge-row">
            <span class="step-number-tag">${st.step}</span>
            <span class="step-name">${st.title}</span>
          </div>
          <p class="step-text">${st.desc}</p>
        </div>
      `).join("");
    }

    const lipsEl = document.getElementById("inspLips");
    const tongueEl = document.getElementById("inspTongue");
    const jawEl = document.getElementById("inspJaw");
    const voiceEl = document.getElementById("inspVoicing");

    if (lipsEl) lipsEl.textContent = sound.mechanics.lips;
    if (tongueEl) tongueEl.textContent = sound.mechanics.tongue;
    if (jawEl) jawEl.textContent = sound.mechanics.jaw;
    if (voiceEl) voiceEl.textContent = sound.mechanics.voicing;

    const exListContainer = document.getElementById("inspExamplesList");
    if (exListContainer && sound.examples) {
      exListContainer.innerHTML = sound.examples.map(ex => `
        <div class="example-item-chip" onclick="window.__playWordAudio('${ex.word}')">
          <span class="example-chip-speaker">🔊</span>
          <strong class="example-chip-word">${ex.word}</strong>
          <span class="example-chip-ipa">${ex.ipa}</span>
          <span class="example-chip-vn">${ex.vn}</span>
        </div>
      `).join("");
    }

    document.querySelectorAll(".sound-card").forEach(c => {
      c.classList.toggle("active-sound", c.getAttribute("data-sound-id") === sound.id);
    });

    const btnPhoneme = document.getElementById("inspBtnPlayPhoneme");
    if (btnPhoneme) {
      btnPhoneme.innerHTML = `<span>🔊</span> Nghe Âm /${sound.symbol}/`;
      btnPhoneme.onclick = () => AudioEngine.playPhoneme(sound);
    }

    const btnWord = document.getElementById("inspBtnPlayWord");
    if (btnWord) {
      btnWord.innerHTML = `<span>🔊</span> Nghe Từ "${sound.keyWord}"`;
      btnWord.onclick = () => AudioEngine.playWord(sound.keyWord);
    }
  }

  function renderIPAChart() {
    const container = document.getElementById("ipaBoardContainer");
    if (!container || !window.IPA_DATA) return;

    container.innerHTML = "";

    const categories = [
      { id: "monophthongs_long", title: "1. Nguyên âm đơn dài (5 âm)", badge: "Ngân 1.5 - 2s", colorClass: "category-blue", filter: s => s.type === "monophthong" && s.subtype === "long" },
      { id: "monophthongs_short", title: "2. Nguyên âm đơn ngắn (7 âm)", badge: "Dứt khoát <0.5s", colorClass: "category-blue", filter: s => s.type === "monophthong" && s.subtype === "short" },
      { id: "diphthongs", title: "3. Nguyên âm đôi (8 âm)", badge: "Trượt mượt 2 âm", colorClass: "category-purple", filter: s => s.type === "diphthong" },
      { id: "consonants_unvoiced", title: "4. Phụ âm vô thanh (8 âm)", badge: "Bật hơi gió", colorClass: "category-peach", filter: s => s.type === "consonant" && s.subtype === "unvoiced" },
      { id: "consonants_voiced", title: "5. Phụ âm hữu thanh (16 âm)", badge: "Rung cổ họng", colorClass: "category-green", filter: s => s.type === "consonant" && s.subtype === "voiced" }
    ];

    categories.forEach(cat => {
      const sounds = IPA_DATA.sounds.filter(cat.filter);
      const block = document.createElement("div");
      block.className = `category-block ${cat.colorClass}`;

      block.innerHTML = `
        <div class="category-header">
          <div class="category-title-group">
            <span class="category-color-dot"></span>
            <h3 class="category-title">${cat.title}</h3>
            <span class="category-count-badge">${cat.badge}</span>
          </div>
        </div>
        <div class="sounds-grid" id="grid_${cat.id}"></div>
      `;

      const grid = block.querySelector(`#grid_${cat.id}`);

      sounds.forEach(sound => {
        const isActive = state.activeSoundId === sound.id;
        const card = document.createElement("div");
        card.className = `sound-card ${isActive ? "active-sound" : ""}`;
        card.setAttribute("data-sound-id", sound.id);

        card.innerHTML = `
          <span class="sound-symbol">/${sound.symbol}/</span>
          <span class="sound-keyword">${sound.keyWord}</span>
          <span class="sound-keyword-ipa">${sound.keyWordIPA}</span>
          <div class="sound-card-actions">
            <button class="card-mini-btn play-card-phoneme" title="Nghe âm /${sound.symbol}/">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button class="card-mini-btn play-card-word" title="Nghe từ ${sound.keyWord}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </button>
          </div>
        `;

        card.querySelector(".play-card-phoneme").addEventListener("click", (e) => {
          e.stopPropagation();
          updateLiveInspector(sound.id);
          AudioEngine.playPhoneme(sound);
        });

        card.querySelector(".play-card-word").addEventListener("click", (e) => {
          e.stopPropagation();
          updateLiveInspector(sound.id);
          AudioEngine.playWord(sound.keyWord);
        });

        card.addEventListener("click", () => {
          updateLiveInspector(sound.id);
          AudioEngine.playPhoneme(sound);
        });

        grid.appendChild(card);
      });

      container.appendChild(block);
    });
  }

  // ==========================================================================
  // 6. QUIZ ARENA (TRẮC NGHIỆM TAI NGHE)
  // ==========================================================================
  function setupNewQuizQuestion() {
    state.quiz.answered = false;

    const allPairs = [];
    IPA_DATA.pairedUnits.forEach(u => {
      u.minimalPairs.forEach(p => {
        allPairs.push({ unit: u, pair: p });
      });
    });

    const randomItem = allPairs[Math.floor(Math.random() * allPairs.length)];
    const isChoiceA = Math.random() > 0.5;
    const targetWord = isChoiceA ? randomItem.pair.wordA : randomItem.pair.wordB;

    state.quiz.currentQuestion = {
      unit: randomItem.unit,
      pair: randomItem.pair,
      targetWord: targetWord,
      correctChoice: isChoiceA ? "A" : "B"
    };

    const tagEl = document.getElementById("quizUnitTag");
    if (tagEl) tagEl.textContent = `${randomItem.unit.title}: ${randomItem.unit.subtitle}`;

    const wordAEl = document.getElementById("quizWordA");
    const ipaAEl = document.getElementById("quizIpaA");
    const meanAEl = document.getElementById("quizMeanA");

    const wordBEl = document.getElementById("quizWordB");
    const ipaBEl = document.getElementById("quizIpaB");
    const meanBEl = document.getElementById("quizMeanB");

    if (wordAEl) wordAEl.textContent = randomItem.pair.wordA;
    if (ipaAEl) ipaAEl.textContent = randomItem.pair.ipaA;
    if (meanAEl) meanAEl.textContent = randomItem.pair.meanA;

    if (wordBEl) wordBEl.textContent = randomItem.pair.wordB;
    if (ipaBEl) ipaBEl.textContent = randomItem.pair.ipaB;
    if (meanBEl) meanBEl.textContent = randomItem.pair.meanB;

    const choiceCardA = document.getElementById("quizChoiceA");
    const choiceCardB = document.getElementById("quizChoiceB");
    if (choiceCardA) choiceCardA.className = "quiz-choice-card";
    if (choiceCardB) choiceCardB.className = "quiz-choice-card";

    const feedbackBox = document.getElementById("quizFeedbackBox");
    if (feedbackBox) feedbackBox.style.display = "none";

    setTimeout(() => {
      AudioEngine.playWord(targetWord);
    }, 200);
  }

  const quizPlayAudioBtn = document.getElementById("quizPlayAudioBtn");
  if (quizPlayAudioBtn) {
    quizPlayAudioBtn.addEventListener("click", () => {
      if (state.quiz.currentQuestion) {
        AudioEngine.playWord(state.quiz.currentQuestion.targetWord);
      }
    });
  }

  function handleQuizAnswer(userChoice) {
    if (state.quiz.answered || !state.quiz.currentQuestion) return;
    state.quiz.answered = true;

    const q = state.quiz.currentQuestion;
    const isCorrect = userChoice === q.correctChoice;

    state.quiz.total++;
    if (isCorrect) {
      state.quiz.score++;
      state.quiz.streak++;
    } else {
      state.quiz.streak = 0;
    }

    const scoreText = document.getElementById("quizScoreText");
    const streakText = document.getElementById("quizStreakText");
    if (scoreText) scoreText.textContent = `${state.quiz.score} / ${state.quiz.total}`;
    if (streakText) streakText.textContent = `${state.quiz.streak}`;

    const choiceCardA = document.getElementById("quizChoiceA");
    const choiceCardB = document.getElementById("quizChoiceB");

    if (q.correctChoice === "A") {
      choiceCardA.classList.add("correct");
      if (userChoice === "B") choiceCardB.classList.add("incorrect");
    } else {
      choiceCardB.classList.add("correct");
      if (userChoice === "A") choiceCardA.classList.add("incorrect");
    }

    const feedbackBox = document.getElementById("quizFeedbackBox");
    const statusRow = document.getElementById("feedbackStatusRow");
    const expRow = document.getElementById("feedbackExplanation");

    if (statusRow) {
      statusRow.innerHTML = isCorrect 
        ? `<span style="color:#16A34A;">🎉 CHÍNH XÁC! Bạn nghe rất chuẩn từ <strong>"${q.targetWord}"</strong>!</span>`
        : `<span style="color:#DC2626;">❌ CHƯA CHÍNH XÁC! Từ vừa phát âm là <strong>"${q.targetWord}"</strong>.</span>`;
    }

    if (expRow) {
      expRow.innerHTML = `
        <div style="margin-top:6px; background:#FFF; border:1px solid var(--border-card); border-radius:6px; padding:10px; text-align:left;">
          <strong>💡 Mẹo phân biệt ${q.unit.title}:</strong><br>
          ${q.unit.contrastSummary}
        </div>
      `;
    }

    if (feedbackBox) feedbackBox.style.display = "block";
  }

  const choiceCardA = document.getElementById("quizChoiceA");
  const choiceCardB = document.getElementById("quizChoiceB");
  if (choiceCardA) choiceCardA.addEventListener("click", () => handleQuizAnswer("A"));
  if (choiceCardB) choiceCardB.addEventListener("click", () => handleQuizAnswer("B"));

  const quizNextBtn = document.getElementById("quizNextBtn");
  if (quizNextBtn) quizNextBtn.addEventListener("click", setupNewQuizQuestion);

  const quizResetBtn = document.getElementById("quizResetBtn");
  if (quizResetBtn) {
    quizResetBtn.addEventListener("click", () => {
      state.quiz.score = 0;
      state.quiz.total = 0;
      state.quiz.streak = 0;
      const scoreText = document.getElementById("quizScoreText");
      const streakText = document.getElementById("quizStreakText");
      if (scoreText) scoreText.textContent = "0 / 0";
      if (streakText) streakText.textContent = "0";
      setupNewQuizQuestion();
    });
  }

  // ==========================================================================
  // 7. RENDER RULES (-S/ES, -ED)
  // ==========================================================================
  function renderRules() {
    const container = document.getElementById("rulesContainer");
    if (!container || !window.IPA_DATA) return;

    container.innerHTML = "";

    IPA_DATA.rules.forEach(rule => {
      const card = document.createElement("div");
      card.className = "pair-card";

      const sectionsHtml = rule.sections.map(sec => `
        <div style="background:var(--bg-body); border:1.5px solid var(--border-subtle); border-radius:var(--radius-xs); padding:16px; margin-bottom:12px;">
          <h4 style="font-weight:800; font-size:1rem; color:var(--brand-primary-dark); margin-bottom:6px;">${sec.heading}</h4>
          <p style="font-size:0.88rem; font-weight:600; margin-bottom:8px;">${sec.condition}</p>
          ${sec.mnemonic ? `<div style="background:#FFFBEB; border:1px solid #FDE68A; color:#92400E; padding:6px 12px; border-radius:6px; font-size:0.82rem; font-weight:700; margin-bottom:10px;">${sec.mnemonic}</div>` : ""}
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${sec.examples.map(ex => `
              <button class="control-btn play-rule-word" onclick="window.__playWordAudio('${ex.word}')" style="background:#FFF; border:1px solid var(--border-card); font-size:0.82rem; padding:4px 10px;">
                🔊 ${ex.word} <small style="color:var(--text-muted);">${ex.ipa}</small>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("");

      card.innerHTML = `
        <span class="hero-badge" style="margin-bottom:8px;">${rule.badge}</span>
        <h3 class="pair-title" style="margin-bottom:8px;">${rule.title}</h3>
        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">${rule.intro}</p>
        <div>${sectionsHtml}</div>
      `;

      container.appendChild(card);
    });
  }

  // Accent & Speed
  document.querySelectorAll("[data-accent]").forEach(btn => {
    btn.addEventListener("click", () => {
      const acc = btn.getAttribute("data-accent");
      state.accent = acc;
      localStorage.setItem("miss_nguyet_accent", acc);
      document.querySelectorAll("[data-accent]").forEach(b => b.classList.toggle("active", b === btn));
    });
  });

  const speedSelect = document.getElementById("speedSelect");
  if (speedSelect) {
    speedSelect.value = state.speed;
    speedSelect.addEventListener("change", () => {
      state.speed = parseFloat(speedSelect.value);
      localStorage.setItem("miss_nguyet_speed", state.speed);
    });
  }

  // ==========================================================================
  // MODULE ĐĂNG NHẬP HỌ TÊN & THEO DÕI QUA GOOGLE FORMS
  // ==========================================================================
  const AUTH = {
    FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScQBlm_zmKc-JoUbvOjsUg2wf9vRarM2_v2nkJmVdbsT_R7_Q/formResponse",
    ENTRY_NAME: "entry.388968236",
    STORAGE_KEY: "miss_nguyet_student_name",

    getUserName() {
      try {
        return localStorage.getItem(this.STORAGE_KEY) || "";
      } catch (e) {
        return "";
      }
    },

    saveUser(fullName) {
      const trimmed = fullName.trim();
      if (!trimmed) return false;

      try {
        localStorage.setItem(this.STORAGE_KEY, trimmed);
      } catch (e) {}

      this.updateHeaderUI(trimmed);
      this.sendToGoogleForm(trimmed);
      this.showToast(`🎉 Chào mừng bạn ${trimmed}! Chúc bạn có buổi học thật hiệu quả.`);
      this.closeModal();
      return true;
    },

    sendToGoogleForm(fullName) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " - " + now.toLocaleDateString("vi-VN");
      const submissionText = `${fullName} (Đăng nhập: ${timeStr})`;

      // Cách 1: Submit qua hidden iframe (không bị chặn CORS, cực kỳ mượt mà)
      try {
        const hiddenForm = document.getElementById("hiddenGoogleForm");
        const entryInput = document.getElementById("googleFormEntryFullName");
        if (hiddenForm && entryInput) {
          entryInput.value = submissionText;
          hiddenForm.submit();
        }
      } catch (err) {
        console.warn("Hidden form log warning:", err);
      }

      // Cách 2: Fetch no-cors dự phòng
      try {
        const bodyParams = new URLSearchParams();
        bodyParams.append(this.ENTRY_NAME, submissionText);
        fetch(this.FORM_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: bodyParams.toString()
        }).catch(() => {});
      } catch (e) {}
    },

    updateHeaderUI(fullName) {
      const btn = document.getElementById("btnUserAuth");
      const nameEl = document.getElementById("userNameText");
      if (!btn || !nameEl) return;

      if (fullName) {
        nameEl.textContent = fullName;
        btn.classList.add("logged-in");
        btn.title = `Học viên: ${fullName} (Bấm để đổi tên)`;
      } else {
        nameEl.textContent = "Đăng Nhập";
        btn.classList.remove("logged-in");
        btn.title = "Bấm để đăng nhập Họ Tên";
      }
    },

    openModal() {
      const overlay = document.getElementById("loginModalOverlay");
      const input = document.getElementById("inputFullName");
      if (!overlay) return;

      const currentName = this.getUserName();
      if (input) {
        input.value = currentName;
        setTimeout(() => input.focus(), 200);
      }

      overlay.classList.add("active");
    },

    closeModal() {
      const overlay = document.getElementById("loginModalOverlay");
      if (overlay) {
        overlay.classList.remove("active");
      }
    },

    showToast(msg) {
      const toast = document.getElementById("loginToast");
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);
    },

    init() {
      const currentName = this.getUserName();
      if (currentName) {
        this.updateHeaderUI(currentName);
      } else {
        // Tự động bật modal đăng nhập sau 500ms nếu chưa nhập họ tên
        setTimeout(() => {
          this.openModal();
        }, 500);
      }
    }
  };

  // Global functions cho HTML gọi trực tiếp
  window.openLoginModal = function() {
    AUTH.openModal();
  };

  window.closeLoginModal = function() {
    AUTH.closeModal();
  };

  window.handleLoginSubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById("inputFullName");
    if (!input || !input.value.trim()) {
      alert("Vui lòng nhập họ và tên của bạn để tiếp tục.");
      return;
    }
    AUTH.saveUser(input.value);
  };

  // Khởi tạo app & đăng nhập
  window.navigateTo("overview");
  AUTH.init();

});
