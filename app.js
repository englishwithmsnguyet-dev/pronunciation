/**
 * PRONUNCIATION WITH MISS NGUYET — CONTROLLER & AUDIO ENGINE
 * Hệ Thống Sidebar Trái & 19 Units Bài Học Học Theo Cặp (Pair-by-Pair Studio)
 */

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    accent: localStorage.getItem("miss_nguyet_accent") || "UK",
    speed: parseFloat(localStorage.getItem("miss_nguyet_speed")) || 1.0,
    selectedVoice: localStorage.getItem("miss_nguyet_voice") || "auto",
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
  // 1. REAL AUDIO ENGINE (PHÁT ÂM RIÊNG BIỆT TỪNG ÂM ĐƠN LẬP & TỪ PHÒNG THU & CÂU TỰ NHIÊN)
  // ==========================================================================
  const AudioEngine = {
    currentAudio: null,
    currentUtterance: null,
    voices: [],

    init() {
      if ("speechSynthesis" in window) {
        this.updateVoiceList();
        window.speechSynthesis.onvoiceschanged = () => {
          this.updateVoiceList();
        };
      }
    },

    updateVoiceList() {
      if (!("speechSynthesis" in window)) return;
      this.voices = window.speechSynthesis.getVoices() || [];
      this.populateVoiceDropdown();
    },

    // Lọc & Chấm Điểm Thông Minh để tự động chọn Giọng Đọc Bản Xứ Tự Nhiên Nhất (loại bỏ giọng robot rẻ tiền)
    getBestVoice(accent) {
      if (!this.voices || this.voices.length === 0) {
        this.voices = window.speechSynthesis.getVoices() || [];
      }
      if (!this.voices.length) return null;

      // Nếu người dùng chủ động chọn 1 giọng cụ thể trong dropdown
      if (state.selectedVoice && state.selectedVoice !== "auto") {
        const customVoice = this.voices.find(v => (v.voiceURI && v.voiceURI === state.selectedVoice) || v.name === state.selectedVoice);
        if (customVoice) return customVoice;
      }

      // Danh sách đen: Giọng robot cổ xưa, hiệu ứng âm thanh máy móc kỳ quặc trên macOS/Windows
      const blacklist = [
        "albert", "bad news", "bahh", "bells", "boing", "bubbles", "cellos",
        "good news", "jester", "junior", "organ", "superstar", "ralph", "trinoids",
        "whisper", "zarvox", "wobble", "fred", "deranged", "hysterical", "pipe organ",
        "sin-ji", "ting-ting", "xander"
      ];

      const isUS = accent === "US";
      const targetPrefix = isUS ? "en-us" : "en-gb";

      // 1. Lọc giọng khớp mã ngôn ngữ và không nằm trong blacklist
      let candidates = this.voices.filter(v => {
        const name = (v.name || "").toLowerCase();
        const lang = (v.lang || "").toLowerCase().replace(/_/g, "-");
        if (blacklist.some(b => name.includes(b))) return false;
        return lang.startsWith(targetPrefix) || (isUS ? lang === "en-us" : lang === "en-gb");
      });

      // Nếu không tìm thấy exact lang, mở rộng sang các giọng tiếng Anh khác (loại bỏ blacklist)
      if (!candidates.length) {
        candidates = this.voices.filter(v => {
          const name = (v.name || "").toLowerCase();
          const lang = (v.lang || "").toLowerCase();
          return !blacklist.some(b => name.includes(b)) && lang.startsWith("en");
        });
      }

      if (!candidates.length) return null;

      // 2. Chấm điểm độ tự nhiên (AI/Neural/Studio/Cloud Human Voices)
      function scoreVoice(v) {
        let score = 0;
        const name = (v.name || "").toLowerCase();
        const lang = (v.lang || "").toLowerCase().replace(/_/g, "-");

        if (lang.startsWith(targetPrefix)) score += 60;

        // Ưu tiên cao nhất: Giọng Cloud / Neural tự nhiên của Google, Microsoft, Apple
        if (name.includes("online (natural)")) score += 100;
        if (name.includes("natural")) score += 90;
        if (name.includes("enhanced") || name.includes("premium")) score += 80;
        if (name.includes("google")) score += 75; // Google US English, Google UK English Female/Male
        if (name.includes("siri")) score += 70;

        // Giọng người bản xứ chuẩn mực, ấm áp, ngắt câu tự nhiên
        if (isUS) {
          if (name.includes("samantha")) score += 65;
          if (name.includes("ava") || name.includes("allison")) score += 60;
          if (name.includes("jenny") || name.includes("aria") || name.includes("guy")) score += 65;
          if (name.includes("flo") || name.includes("eddy") || name.includes("sandy")) score += 45;
        } else {
          // UK
          if (name.includes("daniel")) score += 70;
          if (name.includes("oliver") || name.includes("serena")) score += 65;
          if (name.includes("libby") || name.includes("ryan") || name.includes("sonia")) score += 65;
          if (name.includes("flo") || name.includes("eddy") || name.includes("sandy")) score += 45;
        }

        if (v.default) score += 5;
        return score;
      }

      candidates.sort((a, b) => scoreVoice(b) - scoreVoice(a));
      return candidates[0];
    },

    populateVoiceDropdown() {
      const voiceSelect = document.getElementById("voiceSelect");
      if (!voiceSelect) return;

      const currentAccent = state.accent;
      const best = this.getBestVoice(currentAccent);

      const blacklist = [
        "albert", "bad news", "bahh", "bells", "boing", "bubbles", "cellos",
        "good news", "jester", "junior", "organ", "superstar", "ralph", "trinoids",
        "whisper", "zarvox", "wobble", "fred", "deranged", "hysterical"
      ];
      const targetPrefix = currentAccent === "US" ? "en-us" : "en-gb";
      const validVoices = (this.voices || []).filter(v => {
        const name = (v.name || "").toLowerCase();
        const lang = (v.lang || "").toLowerCase().replace(/_/g, "-");
        return !blacklist.some(b => name.includes(b)) && (lang.startsWith(targetPrefix) || lang.startsWith("en"));
      });

      voiceSelect.innerHTML = "";

      const autoOpt = document.createElement("option");
      autoOpt.value = "auto";
      const bestLabel = best ? ` (${best.name.replace(/Google |Microsoft /g, "").replace(/\(.*?\)/g, "").trim()})` : "";
      autoOpt.textContent = `🎙️ Giọng: Tự nhiên nhất${bestLabel}`;
      voiceSelect.appendChild(autoOpt);

      validVoices.slice(0, 15).forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.voiceURI || v.name;
        opt.textContent = `🎙️ ${v.name}`;
        if (state.selectedVoice === opt.value) {
          opt.selected = true;
        }
        voiceSelect.appendChild(opt);
      });

      if (state.selectedVoice === "auto" || !state.selectedVoice) {
        voiceSelect.value = "auto";
      }
    },

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

    // Phát Câu Ngữ Cảnh Tự Nhiên (Natural Speech with Native Cadence)
    playSentence(sentenceText, btnEl) {
      if (!sentenceText) return;
      this.stop();

      let activeBtn = btnEl;
      if (!activeBtn && window.event && window.event.currentTarget) {
        activeBtn = window.event.currentTarget;
      }
      if (activeBtn) {
        activeBtn.classList.add("playing");
      }

      // Xử lý câu: loại bỏ dấu ngoặc kép thừa, đảm bảo có dấu câu kết thúc để ngắt nhịp tự nhiên
      let cleanText = sentenceText.trim().replace(/^["']|["']$/g, "").trim();
      if (!cleanText.match(/[.!?]$/)) {
        cleanText += ".";
      }

      if (!("speechSynthesis" in window)) {
        if (activeBtn) activeBtn.classList.remove("playing");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.getBestVoice(state.accent);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = state.accent === "US" ? "en-US" : "en-GB";
      }

      // Điều chỉnh tốc độ và độ cao âm thanh:
      // Tốc độ hơi chậm nhẹ (~0.94) để ngữ điệu ngắt nghỉ tròn vành, tự nhiên, không bị giật cục
      utterance.rate = Math.max(0.6, Math.min(1.4, state.speed * 0.94));
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const clearPlaying = () => {
        if (activeBtn) activeBtn.classList.remove("playing");
        document.querySelectorAll(".btn-play-sentence.playing").forEach(b => b.classList.remove("playing"));
        this.currentUtterance = null;
      };

      utterance.onend = clearPlaying;
      utterance.onerror = clearPlaying;

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
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
      document.querySelectorAll(".btn-play-sentence.playing").forEach(b => b.classList.remove("playing"));
      this.currentUtterance = null;
    },

    fallbackTTS(text) {
      if (!("speechSynthesis" in window)) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestVoice(state.accent);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = state.accent === "US" ? "en-US" : "en-GB";
      }
      utterance.rate = state.speed;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };
  window.AudioEngine = AudioEngine;

  // Global Helpers for HTML inline onclicks
  window.__playPhonemeAudio = function(soundId) {
    const sound = IPA_DATA.sounds.find(s => s.id === soundId);
    if (sound) AudioEngine.playPhoneme(sound);
  };
  window.__playWordAudio = function(word) {
    AudioEngine.playWord(word);
  };
  window.__playSentenceAudio = function(param) {
    if (param instanceof HTMLElement) {
      const sentence = decodeURIComponent(param.dataset.sentence || "");
      AudioEngine.playSentence(sentence, param);
    } else if (typeof param === "string") {
      AudioEngine.playSentence(param);
    }
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
    return false; // Mở khóa toàn bộ 19 Units (100% Nguyên Âm và Phụ Âm)
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
    } else if (viewId === "dictation") {
      DictationManager.start();
    } else if (viewId === "ipa_decoding") {
      IpaDecodingManager.start();
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
          AUTH.showToast("🔒 Các Unit phụ âm từ 15 đến 19 đang tạm khóa theo tiến độ của cô giáo.");
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

    // Kiểm tra nếu Unit bị khóa (Phụ âm nửa sau: Unit 15 đến 19)
    if (isUnitLocked(unit.id)) {
      container.innerHTML = `
        <div class="locked-unit-wrapper">
          <div class="locked-unit-card">
            <div class="locked-icon-badge">🔒</div>
            <h2 class="locked-title">${unit.title}</h2>
            <div class="locked-brand">NỘI DUNG ĐANG TẠM KHÓA • MISS NGUYET</div>
            <p class="locked-desc">
              Phần bài học <strong>${unit.sectionName}</strong> đang được tạm khóa theo kế hoạch giảng dạy của cô giáo.<br>
              Bạn hãy hoàn thành xuất sắc <strong>các bài học từ Unit 1 đến Unit 14</strong> để nắm thật vững kiến thức trước nhé!
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
    const highlightWordInSentence = (sentence, word) => {
      if (!sentence) return "";
      let s = sentence.trim();
      if (s.length > 0) {
        s = s.charAt(0).toUpperCase() + s.slice(1);
      }
      return s.replace(new RegExp(`\\b${word}\\b`, "i"), (matched) => `<span class="sentence-highlight">${matched}</span>`);
    };

    const sentencesHtml = unit.minimalPairs.slice(0, 3).map(p => `
      <div class="sentence-grid-row">
        <div class="sentence-box">
          <div class="sentence-en">
            "${highlightWordInSentence(p.sentenceA, p.wordA)}"
          </div>
          <div class="sentence-action-row">
            <span style="font-size:0.8rem; color:var(--text-muted);">${p.wordA} (${p.meanA})</span>
            <button class="btn-play-sentence" data-sentence="${encodeURIComponent(p.sentenceA)}" onclick="window.__playSentenceAudio(this)">
              <span>🔊</span> Nghe câu
            </button>
          </div>
        </div>

        <div class="sentence-box">
          <div class="sentence-en">
            "${highlightWordInSentence(p.sentenceB, p.wordB)}"
          </div>
          <div class="sentence-action-row">
            <span style="font-size:0.8rem; color:var(--text-muted);">${p.wordB} (${p.meanB})</span>
            <button class="btn-play-sentence" data-sentence="${encodeURIComponent(p.sentenceB)}" onclick="window.__playSentenceAudio(this)">
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
  // MODULE: BÀI TẬP NGHE & ĐÁNH MÁY 50 TỪ (LISTENING DICTATION / SPELLING ARENA)
  // ==========================================================================
  const BUILTIN_DICTATION_WORDS_50 = [
    { id: 1, word: "receipt", ipa: "/rɪˈsiːt/", vn: "hóa đơn, biên nhận", hint: "TOEIC hay bẫy câm âm /p/", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 2, word: "aisle", ipa: "/aɪl/", vn: "lối đi giữa các hàng ghế/kệ", hint: "TOEIC hay bẫy câm âm /s/", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 3, word: "shelf", ipa: "/ʃelf/", vn: "kệ để đồ, giá sách", hint: "Part 1 tranh ảnh kinh điển", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 4, word: "stack", ipa: "/stæk/", vn: "xếp chồng lên nhau", hint: "Part 1 hành động xếp hàng", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 5, word: "lean", ipa: "/liːn/", vn: "tựa vào, dựa vào", hint: "Part 1: leaning against...", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 6, word: "pour", ipa: "/pɔː(r)/", vn: "rót nước, đổ nước", hint: "Part 1: pouring into a cup", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 7, word: "stroll", ipa: "/strəʊl/", vn: "đi dạo thong thả", hint: "Part 1: strolling along the path", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 8, word: "browse", ipa: "/braʊz/", vn: "xem lướt qua hàng hóa", hint: "Part 1: browsing in a shop", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 9, word: "sweep", ipa: "/swiːp/", vn: "quét dọn sàn nhà", hint: "Part 1: sweeping the floor", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 10, word: "railing", ipa: "/ˈreɪlɪŋ/", vn: "lan can, tay vịn", hint: "Part 1: holding the railing", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 11, word: "client", ipa: "/ˈklaɪənt/", vn: "khách hàng, đối tác", hint: "Xuất hiện liên tục Part 3/4", category: "TOEIC Văn Phòng & Họp" },
    { id: 12, word: "staff", ipa: "/stɑːf/", vn: "đội ngũ nhân viên", hint: "Chủ đề nhân sự công ty", category: "TOEIC Văn Phòng & Họp" },
    { id: 13, word: "clerk", ipa: "/klɑːk/", vn: "nhân viên quầy / thu ngân", hint: "Quầy giao dịch, khách sạn", category: "TOEIC Văn Phòng & Họp" },
    { id: 14, word: "brief", ipa: "/briːf/", vn: "bản tóm tắt, ngắn gọn", hint: "brief meeting / briefing", category: "TOEIC Văn Phòng & Họp" },
    { id: 15, word: "draft", ipa: "/drɑːft/", vn: "bản thảo hợp đồng/báo cáo", hint: "first draft of the proposal", category: "TOEIC Văn Phòng & Họp" },
    { id: 16, word: "badge", ipa: "/bædʒ/", vn: "thẻ nhân viên, bảng tên", hint: "security badge", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 17, word: "printer", ipa: "/ˈprɪntə(r)/", vn: "máy in văn phòng", hint: "printer is out of paper", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 18, word: "laptop", ipa: "/ˈlæptɒp/", vn: "máy tính xách tay", hint: "laptop computer", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 19, word: "folder", ipa: "/ˈfəʊldə(r)/", vn: "bìa kẹp tài liệu", hint: "file folder on the desk", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 20, word: "screen", ipa: "/skriːn/", vn: "màn hình hiển thị", hint: "computer screen", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 21, word: "venue", ipa: "/ˈvenjuː/", vn: "địa điểm tổ chức sự kiện", hint: "conference venue", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 22, word: "speech", ipa: "/spiːtʃ/", vn: "bài diễn văn, phát biểu", hint: "give a welcome speech", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 23, word: "guest", ipa: "/ɡest/", vn: "khách mời, khách lưu trú", hint: "special guest speaker", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 24, word: "booth", ipa: "/buːð/", vn: "gian hàng triển lãm", hint: "trade show booth", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 25, word: "notice", ipa: "/ˈnəʊtɪs/", vn: "thông báo, yết thị", hint: "short notice / posted notice", category: "TOEIC Thông Báo Công Ty" },
    { id: 26, word: "survey", ipa: "/ˈsɜːveɪ/", vn: "bài khảo sát ý kiến", hint: "customer satisfaction survey", category: "TOEIC Dịch Vụ Khách Hàng" },
    { id: 27, word: "refund", ipa: "/ˈriːfʌnd/", vn: "tiền hoàn lại, trả tiền lại", hint: "full refund policy", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 28, word: "coupon", ipa: "/ˈkuːpɒn/", vn: "phiếu giảm giá", hint: "discount coupon", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 29, word: "invoice", ipa: "/ˈɪnvɔɪs/", vn: "hóa đơn thanh toán", hint: "send an invoice", category: "TOEIC Tài Chính & Kế Toán" },
    { id: 30, word: "contract", ipa: "/ˈkɒntrækt/", vn: "hợp đồng giao kèo", hint: "sign the contract", category: "TOEIC Hợp Đồng & Kinh Doanh" },
    { id: 31, word: "flight", ipa: "/flaɪt/", vn: "chuyến bay hàng không", hint: "flight was delayed", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 32, word: "seat", ipa: "/siːt/", vn: "chỗ ngồi, ghế ngồi", hint: "window seat / aisle seat", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 33, word: "route", ipa: "/ruːt/", vn: "tuyến đường, lộ trình", hint: "alternative bus route", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 34, word: "shuttle", ipa: "/ˈʃʌtl/", vn: "xe buýt đưa đón chặng ngắn", hint: "airport shuttle bus", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 35, word: "traffic", ipa: "/ˈtræfɪk/", vn: "giao thông, xe cộ", hint: "heavy traffic delay", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 36, word: "curb", ipa: "/kɜːb/", vn: "lề đường, mép vỉa hè", hint: "parked at the curb", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 37, word: "cart", ipa: "/kɑːt/", vn: "xe đẩy hàng hóa/hành lý", hint: "pushing a luggage cart", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 38, word: "dock", ipa: "/dɒk/", vn: "bến tàu, cầu cảng", hint: "tied to the dock", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 39, word: "pier", ipa: "/pɪə(r)/", vn: "cầu tàu nhô ra biển", hint: "walking on the pier", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 40, word: "ferry", ipa: "/ˈferi/", vn: "chuyến phà chở khách", hint: "board the ferry", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 41, word: "lobby", ipa: "/ˈlɒbi/", vn: "sảnh lớn tòa nhà/khách sạn", hint: "meet in the hotel lobby", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 42, word: "branch", ipa: "/brɑːntʃ/", vn: "chi nhánh công ty/ngân hàng", hint: "open a new local branch", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 43, word: "counter", ipa: "/ˈkaʊntə(r)/", vn: "quầy lễ tân/thanh toán", hint: "standing behind the counter", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 44, word: "hallway", ipa: "/ˈhɔːlweɪ/", vn: "hành lang lối đi", hint: "down the hallway", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 45, word: "package", ipa: "/ˈpækɪdʒ/", vn: "kiện hàng, bưu kiện", hint: "deliver a fragile package", category: "TOEIC Vận Chuyển & Đơn Hàng" },
    { id: 46, word: "audit", ipa: "/ˈɔːdɪt/", vn: "cuộc kiểm toán, thanh tra", hint: "annual financial audit", category: "TOEIC Tài Chính & Kế Toán" },
    { id: 47, word: "factory", ipa: "/ˈfæktri/", vn: "nhà máy, xưởng chế tạo", hint: "manufacturing factory", category: "TOEIC Sản Xuất & Nhà Xưởng" },
    { id: 48, word: "board", ipa: "/bɔːd/", vn: "lên máy bay/tàu; ban giám đốc", hint: "board of directors / board the train", category: "TOEIC Văn Phòng & Họp" },
    { id: 49, word: "device", ipa: "/dɪˈvaɪs/", vn: "thiết bị điện tử cầm tay", hint: "mobile electronic device", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 50, word: "vehicle", ipa: "/ˈviːəkl/", vn: "phương tiện giao thông, xe cộ", hint: "motor vehicle inspection", category: "TOEIC Sân Bay & Đi Lại" }
  ];

  const DictationManager = {
    words: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    isAnswered: false,
    showHint: false,
    history: [],

    init() {
      const srcWords = (window.DICTATION_WORDS_50 && window.DICTATION_WORDS_50.length)
        ? window.DICTATION_WORDS_50
        : BUILTIN_DICTATION_WORDS_50;
      this.words = [...srcWords];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
    },

    start(shuffle = false) {
      if (!this.words.length || shuffle) {
        this.init();
      }
      if (shuffle && this.words.length) {
        for (let i = this.words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
      }
      // Reset tiến trình về câu đầu tiên
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];

      this.render();
      setTimeout(() => {
        this.playCurrentAudio();
      }, 350);
    },

    getCurrentWord() {
      return this.words[this.currentIndex] || null;
    },

    playCurrentAudio(slow = false) {
      const cur = this.getCurrentWord();
      if (!cur) return;
      
      const listenBtn = document.getElementById("btnDictationListen");
      if (listenBtn) {
        listenBtn.classList.add("playing");
        setTimeout(() => listenBtn.classList.remove("playing"), 1200);
      }

      const origSpeed = state.speed;
      if (slow) {
        state.speed = 0.75;
      }
      AudioEngine.playWord(cur.word);
      state.speed = origSpeed;
    },

    toggleHint() {
      this.showHint = !this.showHint;
      const hintBox = document.getElementById("dictationHintBox");
      const hintBtn = document.getElementById("btnDictationHint");
      if (hintBox) {
        hintBox.style.display = this.showHint ? "flex" : "none";
      }
      if (hintBtn) {
        hintBtn.textContent = this.showHint ? "🙈 Ẩn Gợi Ý" : "💡 Gợi Ý Nghĩa";
      }
    },

    submitAnswer(event) {
      if (event) event.preventDefault();
      if (this.isAnswered) {
        this.nextWord();
        return;
      }

      const input = document.getElementById("dictationInput");
      if (!input) return;

      const userText = input.value.trim().toLowerCase();
      if (!userText) {
        input.focus();
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) return;

      const targetWord = cur.word.trim().toLowerCase();
      const isCorrect = userText === targetWord;

      this.isAnswered = true;
      if (isCorrect) {
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      } else {
        this.streak = 0;
      }

      this.history.push({
        id: cur.id,
        word: cur.word,
        userWord: userText,
        isCorrect: isCorrect,
        ipa: cur.ipa,
        vn: cur.vn,
        category: cur.category
      });

      this.renderFeedback(isCorrect, cur, userText);
    },

    nextWord() {
      this.currentIndex++;
      this.isAnswered = false;
      this.showHint = false;

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
      } else {
        this.render();
        setTimeout(() => {
          this.playCurrentAudio();
        }, 350);
      }
    },

    render() {
      const container = document.getElementById("dictationContainer");
      if (!container) return;

      if (!this.words || !this.words.length) {
        this.init();
      }

      if (!this.words || !this.words.length) {
        container.innerHTML = `
          <div class="dictation-card" style="text-align:center; padding:40px 20px;">
            <p style="font-size:1.1rem; color:var(--text-muted); margin-bottom:16px;">Đang chuẩn bị bài tập 50 từ cốt lõi...</p>
            <button class="btn-dictation-listen" onclick="DictationManager.start(true)">Bắt Đầu Luyện Tập</button>
          </div>
        `;
        return;
      }

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) {
        this.renderSummary();
        return;
      }

      const total = this.words.length;
      const progressPercent = Math.round((this.currentIndex / total) * 100);

      container.innerHTML = `
        <div class="dictation-card">
          <!-- Header Thống Kê -->
          <div class="dictation-header">
            <span class="dictation-category-badge">🏷️ Nhóm: ${cur.category || "Cốt lõi"}</span>
            <div class="dictation-stats-row">
              <span class="dictation-stat-pill">📊 Câu: <strong>${this.currentIndex + 1}/${total}</strong></span>
              <span class="dictation-stat-pill">🎯 Đúng: <strong>${this.score}</strong></span>
              ${this.streak > 1 ? `<span class="dictation-stat-pill streak">🔥 Chuỗi: <strong>${this.streak}</strong></span>` : ""}
            </div>
          </div>

          <!-- Thanh Tiến Trình -->
          <div class="dictation-progress-bar-bg">
            <div class="dictation-progress-bar-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Khung Nghe Âm Thanh -->
          <div class="dictation-audio-box">
            <button class="btn-dictation-listen" id="btnDictationListen" onclick="DictationManager.playCurrentAudio()">
              <span>🔊</span> <span>Bấm Để Nghe Lại</span>
            </button>
            
            <div class="dictation-audio-subcontrols">
              <button class="btn-dictation-subaction" onclick="DictationManager.playCurrentAudio(true)" title="Phát âm chậm 0.75x để nghe rõ từng phụ âm">
                🐢 Nghe Chậm (0.75x)
              </button>
              <button class="btn-dictation-subaction" id="btnDictationHint" onclick="DictationManager.toggleHint()">
                💡 Gợi Ý Nghĩa
              </button>
            </div>

            <div class="dictation-hint-reveal-box" id="dictationHintBox" style="display: none;">
              <span>💡 Gợi ý: <strong>${cur.vn}</strong> ${cur.hint ? `(${cur.hint})` : ""}</span>
            </div>

            <div class="dictation-audio-hint">Mẹo: Bấm Space để nghe lại, Enter để xác nhận hoặc chuyển câu</div>
          </div>

          <!-- Form Gõ Từ -->
          <form class="dictation-input-form" onsubmit="DictationManager.submitAnswer(event)">
            <div class="dictation-input-row">
              <input 
                type="text" 
                id="dictationInput" 
                class="dictation-text-input" 
                placeholder="Gõ từ tiếng Anh bạn nghe được..." 
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false"
                required
              />
              <button type="submit" class="btn-dictation-submit" id="btnDictationSubmit">
                <span>Kiểm Tra</span> <span>↵</span>
              </button>
            </div>
          </form>

          <!-- Vùng Phản Hồi Kết Quả -->
          <div id="dictationFeedbackArea"></div>
        </div>
      `;

      // Focus input
      setTimeout(() => {
        const input = document.getElementById("dictationInput");
        if (input) input.focus();
      }, 50);
    },

    renderFeedback(isCorrect, cur, userText) {
      const feedbackArea = document.getElementById("dictationFeedbackArea");
      if (!feedbackArea) return;

      const input = document.getElementById("dictationInput");
      const submitBtn = document.getElementById("btnDictationSubmit");
      if (input) {
        input.disabled = true;
        input.style.borderColor = isCorrect ? "#22C55E" : "#EF4444";
      }
      if (submitBtn) {
        submitBtn.style.display = "none";
      }

      feedbackArea.innerHTML = `
        <div class="dictation-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="dictation-feedback-title">
            <span>${isCorrect ? '🎉 Rất Chính Xác!' : '❌ Chưa Đúng Rồi!'}</span>
          </div>

          <div class="dictation-word-detail-box">
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">TỪ CHUẨN XÁC:</small>
              <span class="dictation-correct-word">${cur.word}</span>
            </div>
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">PHIÊN ÂM IPA:</small>
              <span class="dictation-correct-ipa">${cur.ipa}</span>
            </div>
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">Ý NGHĨA:</small>
              <span class="dictation-correct-vn">${cur.vn}</span>
            </div>
            <button class="control-btn" onclick="AudioEngine.playWord('${cur.word}')" style="margin-left:auto; background:#FFF; border:1px solid #CBD5E1; padding:6px 12px; border-radius:var(--radius-pill); font-weight:700;">
              🔊 Nghe lại
            </button>
          </div>

          ${!isCorrect ? `<div style="font-size:0.85rem; margin-top:10px; color:#991B1B;">Bạn đã gõ: <strong>"${userText}"</strong></div>` : ""}

          <button class="btn-dictation-next" id="btnDictationNext" onclick="DictationManager.nextWord()">
            <span>${this.currentIndex + 1 >= this.words.length ? '🏆 Xem Kết Quả Tổng Kết (50 Từ)' : 'Câu Tiếp Theo'}</span> <span>↵</span>
          </button>
        </div>
      `;

      setTimeout(() => {
        const nextBtn = document.getElementById("btnDictationNext");
        if (nextBtn) nextBtn.focus();
      }, 50);
    },

    renderSummary() {
      const container = document.getElementById("dictationContainer");
      if (!container) return;

      const total = this.words.length;
      if (total === 0) {
        this.start(false);
        return;
      }
      const correctCount = this.score;
      const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

      let trophyEmoji = "🌟";
      let evalText = "Rất nỗ lực!";
      if (percent >= 90) {
        trophyEmoji = "👑";
        evalText = "Xuất sắc tuyệt đối! Đôi tai vàng của Miss Nguyệt!";
      } else if (percent >= 75) {
        trophyEmoji = "🎉";
        evalText = "Rất tốt! Phản xạ nghe và chính tả rất vững vàng!";
      } else if (percent >= 50) {
        trophyEmoji = "💪";
        evalText = "Khá tốt! Hãy ôn lại các từ chưa đúng để hoàn thiện hơn nhé!";
      }

      const rowsHtml = this.history.map((h, i) => `
        <tr>
          <td style="font-weight:700; color:var(--text-muted); width:40px;">#${i + 1}</td>
          <td>
            <strong>${h.word}</strong> <span style="color:var(--brand-primary-dark); font-size:0.82rem;">${h.ipa}</span>
            <div style="font-size:0.78rem; color:var(--text-muted);">${h.vn}</div>
          </td>
          <td>
            <span style="font-family:monospace; font-weight:700; color:${h.isCorrect ? '#16A34A' : '#DC2626'}">
              ${h.userWord || "—"}
            </span>
          </td>
          <td>
            <span class="dictation-review-status ${h.isCorrect ? 'correct' : 'incorrect'}">
              ${h.isCorrect ? '✓ Đúng' : '✗ Sai'}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="control-btn" onclick="AudioEngine.playWord('${h.word}')" style="background:#FFF; border:1px solid #CBD5E1; padding:4px 8px; border-radius:var(--radius-pill); font-size:0.75rem;">
              🔊 Nghe
            </button>
          </td>
        </tr>
      `).join("");

      container.innerHTML = `
        <div class="dictation-summary-card">
          <div class="dictation-trophy-badge">${trophyEmoji}</div>
          <h2 class="dictation-summary-title">Hoàn Thành Thử Thách 50 Từ!</h2>
          <p class="dictation-summary-desc">${evalText}</p>

          <div class="dictation-score-grid">
            <div class="dictation-score-item">
              <div class="dictation-score-val">${correctCount}/${total}</div>
              <div class="dictation-score-lbl">SỐ TỪ ĐÚNG</div>
            </div>
            <div class="dictation-score-item">
              <div class="dictation-score-val">${percent}%</div>
              <div class="dictation-score-lbl">ĐỘ CHÍNH XÁC</div>
            </div>
            <div class="dictation-score-item">
              <div class="dictation-score-val">${this.maxStreak}</div>
              <div class="dictation-score-lbl">CHUỖI ĐÚNG DÀI NHẤT</div>
            </div>
          </div>

          <div class="dictation-review-section">
            <h3 class="dictation-review-title">📋 Bảng Chi Tiết Kết Quả 50 Từ:</h3>
            <div class="dictation-review-table-wrapper">
              <table class="dictation-review-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Từ Chuẩn & IPA</th>
                    <th>Bạn Đã Gõ</th>
                    <th>Kết Quả</th>
                    <th style="text-align:right;">Nghe</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <div class="dictation-summary-actions">
            <button class="btn-dictation-restart" onclick="DictationManager.start(false)">
              <span>🔄 Làm Lại Từ Đầu</span>
            </button>
            <button class="btn-dictation-restart" onclick="DictationManager.start(true)" style="background:var(--brand-primary-dark);">
              <span>🔀 Xáo Trộn Thứ Tự 50 Từ</span>
            </button>
          </div>
        </div>
      `;
    }
  };

  window.DictationManager = DictationManager;

  // ==========================================================================
  // MODULE: BÀI TẬP NHÌN PHIÊN ÂM IPA ĐỂ VIẾT TỪ (IPA TO WORD DECODING ARENA)
  // ==========================================================================
  const BUILTIN_IPA_DECODING_WORDS_50 = [
    { id: 1, word: "beautiful", ipa: "/ˈbjuːtɪfl/", vn: "xinh đẹp, tuyệt vời", hint: "Âm /juː/ và âm đuôi /fl/", category: "Tính từ miêu tả" },
    { id: 2, word: "honest", ipa: "/ˈɒnɪst/", vn: "thật thà, trung thực", hint: "Câm chữ 'h', bắt đầu bằng /ɒ/", category: "Phẩm chất & Tính cách" },
    { id: 3, word: "comfortable", ipa: "/ˈkʌmftəbl/", vn: "thoải mái, dễ chịu", hint: "Đọc 3 âm tiết, câm chữ 'or'", category: "Đời sống hàng ngày" },
    { id: 4, word: "success", ipa: "/səkˈses/", vn: "sự thành công", hint: "Trọng âm rơi vào âm tiết 2", category: "Công việc & Thành tựu" },
    { id: 5, word: "purpose", ipa: "/ˈpɜːpəs/", vn: "mục đích, ý định", hint: "Âm dài /ɜː/ và âm schwa /əs/", category: "Công việc & Thành tựu" },
    { id: 6, word: "company", ipa: "/ˈkʌmpəni/", vn: "công ty, doanh nghiệp", hint: "Âm /ʌ/ mở và 3 âm tiết", category: "Công việc & Doanh nghiệp" },
    { id: 7, word: "message", ipa: "/ˈmesɪdʒ/", vn: "tin nhắn, thông điệp", hint: "Âm đuôi bật rung /dʒ/", category: "Giao tiếp & Công nghệ" },
    { id: 8, word: "natural", ipa: "/ˈnætʃrəl/", vn: "tự nhiên, thiên nhiên", hint: "Âm /æ/ hạ hàm & âm /tʃ/", category: "Thiên nhiên & Đời sống" },
    { id: 9, word: "special", ipa: "/ˈspeʃl/", vn: "đặc biệt, riêng biệt", hint: "Âm /e/ & âm xì chu môi /ʃl/", category: "Tính từ miêu tả" },
    { id: 10, word: "wonderful", ipa: "/ˈwʌndəfl/", vn: "tuyệt vời, kỳ diệu", hint: "Âm tròn môi /w/ và đuôi /fl/", category: "Tính từ cảm xúc" },
    { id: 11, word: "favorite", ipa: "/ˈfeɪvərɪt/", vn: "ưa thích, được chuộng", hint: "Âm đôi /eɪ/ và âm /v/", category: "Đời sống hàng ngày" },
    { id: 12, word: "mirror", ipa: "/ˈmɪrə(r)/", vn: "cái gương soi", hint: "Âm ngắn /ɪ/ và âm kết thúc /ə/", category: "Đồ vật gia đình" },
    { id: 13, word: "picture", ipa: "/ˈpɪktʃə(r)/", vn: "bức tranh, bức ảnh", hint: "Âm bật chu môi /tʃə/", category: "Đồ vật gia đình" },
    { id: 14, word: "money", ipa: "/ˈmʌni/", vn: "tiền bạc", hint: "Âm /ʌ/ không phải âm /o/", category: "Đời sống & Tài chính" },
    { id: 15, word: "number", ipa: "/ˈnʌmbə(r)/", vn: "con số, số lượng", hint: "Âm /ʌ/ và kết thúc /bə/", category: "Toán học & Đời sống" },
    { id: 16, word: "little", ipa: "/ˈlɪtl/", vn: "nhỏ bé, một chút", hint: "Âm ngắn /ɪ/ và âm đuôi /tl/", category: "Số lượng & Kích thước" },
    { id: 17, word: "morning", ipa: "/ˈmɔːnɪŋ/", vn: "buổi sáng", hint: "Âm dài /ɔː/ và âm mũi /ŋ/", category: "Thời gian & Lời chào" },
    { id: 18, word: "dinner", ipa: "/ˈdɪnə(r)/", vn: "bữa tối", hint: "Âm ngắn /ɪ/ và kết thúc /nə/", category: "Ẩm thực & Đời sống" },
    { id: 19, word: "window", ipa: "/ˈwɪndəʊ/", vn: "cửa sổ", hint: "Âm đầu /w/ và âm đôi /əʊ/", category: "Nhà cửa & Đồ vật" },
    { id: 20, word: "market", ipa: "/ˈmɑːkɪt/", vn: "khu chợ, thị trường", hint: "Âm dài /ɑː/ và kết thúc /kɪt/", category: "Mua sắm & Địa điểm" },
    { id: 21, word: "summer", ipa: "/ˈsʌmə(r)/", vn: "mùa hè, mùa hạ", hint: "Âm ngắn /ʌ/ và âm /mə/", category: "Thời gian & Thời tiết" },
    { id: 22, word: "winter", ipa: "/ˈwɪntə(r)/", vn: "mùa đông", hint: "Âm /wɪ/ và kết thúc /tə/", category: "Thời gian & Thời tiết" },
    { id: 23, word: "separate", ipa: "/ˈsepəreɪt/", vn: "phân chia, tách rời", hint: "Động từ phát âm đuôi /eɪt/", category: "Hành động & Trạng thái" },
    { id: 24, word: "hospital", ipa: "/ˈhɒspɪtl/", vn: "bệnh viện", hint: "Âm /ɒ/ tròn môi và đuôi /tl/", category: "Y tế & Địa điểm" },
    { id: 25, word: "doctor", ipa: "/ˈdɒktə(r)/", vn: "bác sĩ", hint: "Âm tròn môi /ɒ/ và đuôi /tə/", category: "Nghề nghiệp" },
    { id: 26, word: "student", ipa: "/ˈstjuːdnt/", vn: "học sinh, sinh viên", hint: "Âm /stjuː/ và đuôi /dnt/", category: "Trường học & Giáo dục" },
    { id: 27, word: "kitchen", ipa: "/ˈkɪtʃɪn/", vn: "căn bếp, gian bếp", hint: "Âm ngắn /ɪ/ và âm /tʃɪn/", category: "Nhà cửa & Đời sống" },
    { id: 28, word: "bathroom", ipa: "/ˈbɑːθruːm/", vn: "phòng tắm", hint: "Âm thè lưỡi /θ/ và âm /uː/", category: "Nhà cửa & Đời sống" },
    { id: 29, word: "bedroom", ipa: "/ˈbedruːm/", vn: "phòng ngủ", hint: "Âm /ed/ và âm /ruːm/", category: "Nhà cửa & Đời sống" },
    { id: 30, word: "visit", ipa: "/ˈvɪzɪt/", vn: "thăm hỏi, chuyến thăm", hint: "Âm rung /z/ ở giữa từ", category: "Hành động & Du lịch" },
    { id: 31, word: "person", ipa: "/ˈpɜːsn/", vn: "con người, cá nhân", hint: "Âm dài /ɜː/ và âm đuôi /sn/", category: "Xã hội & Con người" },
    { id: 32, word: "happiness", ipa: "/ˈhæpɪnəs/", vn: "niềm hạnh phúc", hint: "Âm /æ/ mở rộng miệng", category: "Cảm xúc & Tinh thần" },
    { id: 33, word: "paper", ipa: "/ˈpeɪpə(r)/", vn: "tờ giấy", hint: "Âm đôi /eɪ/ và âm bật /p/", category: "Đồ dùng học tập" },
    { id: 34, word: "bottle", ipa: "/ˈbɒtl/", vn: "cái chai, lọ nước", hint: "Âm tròn môi /ɒ/ và đuôi /tl/", category: "Đồ vật hàng ngày" },
    { id: 35, word: "serious", ipa: "/ˈsɪəriəs/", vn: "nghiêm túc, nghiêm trọng", hint: "Âm đôi /ɪə/ và đuôi /əs/", category: "Tính cách & Thái độ" },
    { id: 36, word: "district", ipa: "/ˈdɪstrɪkt/", vn: "quận, huyện, khu vực", hint: "Cụm phụ âm /str/ và đuôi /kt/", category: "Địa lý & Hành chính" },
    { id: 37, word: "simple", ipa: "/ˈsɪmpl/", vn: "đơn giản, dễ hiểu", hint: "Âm ngắn /ɪ/ và đuôi /mpl/", category: "Tính từ miêu tả" },
    { id: 38, word: "modern", ipa: "/ˈmɒdn/", vn: "hiện đại, tân tiến", hint: "Âm /ɒ/ và kết thúc /dn/", category: "Tính từ miêu tả" },
    { id: 39, word: "clever", ipa: "/ˈklevə(r)/", vn: "thông minh, nhanh trí", hint: "Cụm phụ âm /kl/ và đuôi /və/", category: "Tính cách & Trí tuệ" },
    { id: 40, word: "forest", ipa: "/ˈfɒrɪst/", vn: "rừng cây, khu rừng", hint: "Âm /ɒ/ và âm đuôi /st/", category: "Thiên nhiên & Môi trường" },
    { id: 41, word: "river", ipa: "/ˈrɪvə(r)/", vn: "dòng sông", hint: "Âm cắn môi rung /v/", category: "Thiên nhiên & Môi trường" },
    { id: 42, word: "magic", ipa: "/ˈmædʒɪk/", vn: "phép thuật, kỳ diệu", hint: "Âm /æ/ hạ hàm & âm rung /dʒ/", category: "Nghệ thuật & Kỳ ảo" },
    { id: 43, word: "castle", ipa: "/ˈkɑːsl/", vn: "tòa lâu đài", hint: "Câm âm /t/, đọc là /kɑːsl/", category: "Kiến trúc & Lịch sử" },
    { id: 44, word: "journey", ipa: "/ˈdʒɜːni/", vn: "chuyến đi, hành trình", hint: "Âm rung /dʒ/ và âm dài /ɜː/", category: "Du lịch & Khám phá" },
    { id: 45, word: "angry", ipa: "/ˈæŋɡri/", vn: "tức giận, phẫn nộ", hint: "Âm mũi cuống lưỡi /ŋɡr/", category: "Cảm xúc & Tâm lý" },
    { id: 46, word: "island", ipa: "/ˈaɪlənd/", vn: "hòn đảo", hint: "Câm chữ 's', đọc là /ˈaɪlənd/", category: "Địa lý & Du lịch" },
    { id: 47, word: "muscle", ipa: "/ˈmʌsl/", vn: "cơ bắp, bắp thịt", hint: "Câm chữ 'c', đọc là /ˈmʌsl/", category: "Cơ thể & Sức khỏe" },
    { id: 48, word: "climb", ipa: "/klaɪm/", vn: "leo trèo, trèo lên", hint: "Câm chữ 'b', đọc là /klaɪm/", category: "Hành động & Thể thao" },
    { id: 49, word: "subtle", ipa: "/ˈsʌtl/", vn: "tinh tế, khéo léo", hint: "Câm chữ 'b', đọc là /ˈsʌtl/", category: "Tính từ miêu tả" },
    { id: 50, word: "doubt", ipa: "/daʊt/", vn: "sự nghi ngờ, phân vân", hint: "Câm chữ 'b', đọc là /daʊt/", category: "Tâm lý & Cảm xúc" }
  ];

  const IpaDecodingManager = {
    words: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    isAnswered: false,
    showHint: false,
    history: [],

    init() {
      const srcWords = (window.IPA_DECODING_WORDS_50 && window.IPA_DECODING_WORDS_50.length)
        ? window.IPA_DECODING_WORDS_50
        : BUILTIN_IPA_DECODING_WORDS_50;
      this.words = [...srcWords];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
    },

    start(shuffle = false) {
      if (!this.words.length || shuffle) {
        this.init();
      }
      if (shuffle && this.words.length) {
        for (let i = this.words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
      }
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];

      this.render();
    },

    getCurrentWord() {
      return this.words[this.currentIndex] || null;
    },

    playAudio() {
      const cur = this.getCurrentWord();
      if (!cur) return;
      AudioEngine.playWord(cur.word);
    },

    toggleHint() {
      this.showHint = !this.showHint;
      const hintBox = document.getElementById("ipaDecodingHintBox");
      const hintBtn = document.getElementById("btnIpaDecodingHint");
      if (hintBox) {
        hintBox.style.display = this.showHint ? "flex" : "none";
      }
      if (hintBtn) {
        hintBtn.textContent = this.showHint ? "🙈 Ẩn Gợi Ý" : "💡 Gợi Ý Nghĩa";
      }
    },

    submitAnswer(event) {
      if (event) event.preventDefault();
      if (this.isAnswered) {
        this.nextWord();
        return;
      }

      const input = document.getElementById("ipaDecodingInput");
      if (!input) return;

      const userText = input.value.trim().toLowerCase();
      if (!userText) {
        input.focus();
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) return;

      const targetWord = cur.word.trim().toLowerCase();
      const isCorrect = userText === targetWord;

      this.isAnswered = true;
      if (isCorrect) {
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      } else {
        this.streak = 0;
      }

      this.history.push({
        id: cur.id,
        word: cur.word,
        userWord: userText,
        isCorrect: isCorrect,
        ipa: cur.ipa,
        vn: cur.vn,
        category: cur.category
      });

      this.renderFeedback(isCorrect, cur, userText);

      // Tự động phát âm từ chuẩn sau khi nộp bài
      setTimeout(() => {
        AudioEngine.playWord(cur.word);
      }, 200);
    },

    nextWord() {
      this.currentIndex++;
      this.isAnswered = false;
      this.showHint = false;

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
      } else {
        this.render();
      }
    },

    render() {
      const container = document.getElementById("ipaDecodingContainer");
      if (!container) return;

      if (!this.words || !this.words.length) {
        this.init();
      }

      if (!this.words || !this.words.length) {
        container.innerHTML = `
          <div class="dictation-card" style="text-align:center; padding:40px 20px;">
            <p style="font-size:1.1rem; color:var(--text-muted); margin-bottom:16px;">Đang chuẩn bị 50 từ phiên âm IPA...</p>
            <button class="btn-dictation-listen" onclick="IpaDecodingManager.start(true)">Bắt Đầu Luyện Tập</button>
          </div>
        `;
        return;
      }

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) {
        this.renderSummary();
        return;
      }

      const total = this.words.length;
      const progressPercent = Math.round((this.currentIndex / total) * 100);

      container.innerHTML = `
        <div class="dictation-card ipa-decode-card">
          <!-- Header Thống Kê -->
          <div class="dictation-header">
            <span class="dictation-category-badge">🏷️ Nhóm: ${cur.category || "Từ vựng"}</span>
            <div class="dictation-stats-row">
              <span class="dictation-stat-pill">📊 Câu: <strong>${this.currentIndex + 1}/${total}</strong></span>
              <span class="dictation-stat-pill">🎯 Đúng: <strong>${this.score}</strong></span>
              ${this.streak > 1 ? `<span class="dictation-stat-pill streak">🔥 Chuỗi: <strong>${this.streak}</strong></span>` : ""}
            </div>
          </div>

          <!-- Thanh Tiến Trình -->
          <div class="dictation-progress-bar-bg">
            <div class="dictation-progress-bar-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Khung Hiển Thị Phiên Âm IPA Trung Tâm -->
          <div class="ipa-showcase-box">
            <div class="ipa-showcase-badge">🔤 PHIÊN ÂM QUỐC TẾ (IPA):</div>
            <div class="ipa-showcase-text">${cur.ipa}</div>
            <div class="ipa-showcase-sub">Đọc kỹ dấu trọng âm <strong>'</strong> và các ký hiệu ngữ âm để đoán từ tiếng Anh tương ứng</div>
            
            <div class="dictation-audio-subcontrols" style="margin-top: 14px;">
              <button class="btn-dictation-subaction" id="btnIpaDecodingHint" onclick="IpaDecodingManager.toggleHint()">
                💡 Gợi Ý Nghĩa
              </button>
              <button class="btn-dictation-subaction" onclick="IpaDecodingManager.playAudio()" title="Nghe người bản xứ phát âm từ này để trợ giúp">
                🔊 Nghe Phát Âm Trợ Giúp
              </button>
            </div>

            <div class="dictation-hint-reveal-box" id="ipaDecodingHintBox" style="display: none; margin-top: 12px;">
              <span>💡 Gợi ý nghĩa: <strong>${cur.vn}</strong> ${cur.hint ? `(${cur.hint})` : ""}</span>
            </div>

            <div class="dictation-audio-hint" style="margin-top:12px;">Mẹo: Bấm Space để nghe phát âm trợ giúp, Enter để xác nhận hoặc chuyển câu</div>
          </div>

          <!-- Form Gõ Từ -->
          <form class="dictation-input-form" onsubmit="IpaDecodingManager.submitAnswer(event)">
            <div class="dictation-input-row">
              <input 
                type="text" 
                id="ipaDecodingInput" 
                class="dictation-text-input" 
                placeholder="Gõ từ tiếng Anh tương ứng với phiên âm trên..." 
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false" 
                required
              />
              <button type="submit" class="btn-dictation-submit" id="btnIpaDecodingSubmit">
                <span>Kiểm Tra</span> <span>↵</span>
              </button>
            </div>
          </form>

          <!-- Vùng Phản Hồi Kết Quả -->
          <div id="ipaDecodingFeedbackArea"></div>
        </div>
      `;

      // Focus input
      setTimeout(() => {
        const input = document.getElementById("ipaDecodingInput");
        if (input) input.focus();
      }, 50);
    },

    renderFeedback(isCorrect, cur, userText) {
      const feedbackArea = document.getElementById("ipaDecodingFeedbackArea");
      if (!feedbackArea) return;

      const input = document.getElementById("ipaDecodingInput");
      const submitBtn = document.getElementById("btnIpaDecodingSubmit");
      if (input) {
        input.disabled = true;
        input.style.borderColor = isCorrect ? "#22C55E" : "#EF4444";
      }
      if (submitBtn) {
        submitBtn.style.display = "none";
      }

      feedbackArea.innerHTML = `
        <div class="dictation-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="dictation-feedback-title">
            <span>${isCorrect ? '🎉 Chính Xác Tuyệt Vời!' : '❌ Chưa Đúng Rồi!'}</span>
          </div>

          <div class="dictation-word-detail-box">
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">TỪ CHUẨN XÁC:</small>
              <span class="dictation-correct-word">${cur.word}</span>
            </div>
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">PHIÊN ÂM IPA:</small>
              <span class="dictation-correct-ipa">${cur.ipa}</span>
            </div>
            <div>
              <small style="color:var(--text-muted); display:block; font-size:0.75rem;">Ý NGHĨA:</small>
              <span class="dictation-correct-vn">${cur.vn}</span>
            </div>
            <button class="control-btn" onclick="AudioEngine.playWord('${cur.word}')" style="margin-left:auto; background:#FFF; border:1px solid #CBD5E1; padding:6px 12px; border-radius:var(--radius-pill); font-weight:700;">
              🔊 Nghe lại
            </button>
          </div>

          ${!isCorrect ? `<div style="font-size:0.85rem; margin-top:10px; color:#991B1B;">Bạn đã gõ: <strong>"${userText}"</strong></div>` : ""}

          <button class="btn-dictation-next" id="btnIpaDecodingNext" onclick="IpaDecodingManager.nextWord()">
            <span>${this.currentIndex + 1 >= this.words.length ? '🏆 Xem Kết Quả Tổng Kết (50 Từ)' : 'Câu Tiếp Theo'}</span> <span>↵</span>
          </button>
        </div>
      `;

      setTimeout(() => {
        const nextBtn = document.getElementById("btnIpaDecodingNext");
        if (nextBtn) nextBtn.focus();
      }, 50);
    },

    renderSummary() {
      const container = document.getElementById("ipaDecodingContainer");
      if (!container) return;

      const total = this.words.length;
      if (total === 0) {
        this.start(false);
        return;
      }
      const correctCount = this.score;
      const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

      let trophyEmoji = "🌟";
      let evalText = "Rất nỗ lực!";
      if (percent >= 90) {
        trophyEmoji = "👑";
        evalText = "Đỉnh cao ngữ âm! Bậc thầy giải mã ký hiệu IPA!";
      } else if (percent >= 75) {
        trophyEmoji = "🎉";
        evalText = "Rất xuất sắc! Khả năng chuyển đổi từ IPA sang chữ viết rất tốt!";
      } else if (percent >= 50) {
        trophyEmoji = "💪";
        evalText = "Khá tốt! Hãy ôn lại các từ chưa đúng để nhớ sâu hơn mặt chữ và phiên âm!";
      }

      const rowsHtml = this.history.map((h, i) => `
        <tr>
          <td style="font-weight:700; color:var(--text-muted); width:40px;">#${i + 1}</td>
          <td>
            <div style="font-family:'Charis SIL',serif; font-size:1.15rem; font-weight:700; color:var(--brand-primary-dark);">${h.ipa}</div>
            <strong style="font-size:1rem; color:var(--text-main);">${h.word}</strong>
            <div style="font-size:0.78rem; color:var(--text-muted);">${h.vn}</div>
          </td>
          <td>
            <span style="font-family:monospace; font-weight:700; color:${h.isCorrect ? '#16A34A' : '#DC2626'}">
              ${h.userWord || "—"}
            </span>
          </td>
          <td>
            <span class="dictation-review-status ${h.isCorrect ? 'correct' : 'incorrect'}">
              ${h.isCorrect ? '✓ Đúng' : '✗ Sai'}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="control-btn" onclick="AudioEngine.playWord('${h.word}')" style="background:#FFF; border:1px solid #CBD5E1; padding:4px 8px; border-radius:var(--radius-pill); font-size:0.75rem;">
              🔊 Nghe
            </button>
          </td>
        </tr>
      `).join("");

      container.innerHTML = `
        <div class="dictation-summary-card">
          <div class="dictation-trophy-badge">${trophyEmoji}</div>
          <h2 class="dictation-summary-title">Hoàn Thành Thử Thách 50 Từ IPA!</h2>
          <p class="dictation-summary-desc">${evalText}</p>

          <div class="dictation-score-grid">
            <div class="dictation-score-item">
              <div class="dictation-score-val">${correctCount}/${total}</div>
              <div class="dictation-score-lbl">SỐ TỪ ĐÚNG</div>
            </div>
            <div class="dictation-score-item">
              <div class="dictation-score-val">${percent}%</div>
              <div class="dictation-score-lbl">ĐỘ CHÍNH XÁC</div>
            </div>
            <div class="dictation-score-item">
              <div class="dictation-score-val">${this.maxStreak}</div>
              <div class="dictation-score-lbl">CHUỖI ĐÚNG DÀI NHẤT</div>
            </div>
          </div>

          <div class="dictation-review-section">
            <h3 class="dictation-review-title">📋 Bảng Chi Tiết Kết Quả 50 Từ IPA:</h3>
            <div class="dictation-review-table-wrapper">
              <table class="dictation-review-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Phiên Âm IPA & Từ Chuẩn</th>
                    <th>Bạn Đã Gõ</th>
                    <th>Kết Quả</th>
                    <th style="text-align:right;">Nghe</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <div class="dictation-summary-actions">
            <button class="btn-dictation-restart" onclick="IpaDecodingManager.start(false)">
              <span>🔄 Làm Lại Từ Đầu</span>
            </button>
            <button class="btn-dictation-restart" onclick="IpaDecodingManager.start(true)" style="background:var(--brand-primary-dark);">
              <span>🔀 Xáo Trộn Thứ Tự 50 Từ</span>
            </button>
          </div>
        </div>
      `;
    }
  };

  window.IpaDecodingManager = IpaDecodingManager;

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

  // Accent & Speed & Voice
  document.querySelectorAll("[data-accent]").forEach(btn => {
    btn.addEventListener("click", () => {
      const acc = btn.getAttribute("data-accent");
      state.accent = acc;
      localStorage.setItem("miss_nguyet_accent", acc);
      document.querySelectorAll("[data-accent]").forEach(b => b.classList.toggle("active", b === btn));
      AudioEngine.updateVoiceList();
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

  const voiceSelect = document.getElementById("voiceSelect");
  if (voiceSelect) {
    voiceSelect.addEventListener("change", () => {
      state.selectedVoice = voiceSelect.value;
      localStorage.setItem("miss_nguyet_voice", state.selectedVoice);
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

  // Bàn phím nhanh cho bài tập Nghe & Đánh máy và Nhìn IPA Viết Từ
  window.addEventListener("keydown", (e) => {
    if (state.currentView === "dictation") {
      // Phím Space để nghe lại khi không đang gõ text
      if (e.code === "Space" && document.activeElement !== document.getElementById("dictationInput")) {
        e.preventDefault();
        DictationManager.playCurrentAudio();
      }
      // Phím Ctrl+Space hoặc Alt+Space để nghe lại bất cứ lúc nào
      else if (e.code === "Space" && (e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        DictationManager.playCurrentAudio();
      }
    } else if (state.currentView === "ipa_decoding") {
      // Phím Space để nghe phát âm trợ giúp khi không đang gõ text
      if (e.code === "Space" && document.activeElement !== document.getElementById("ipaDecodingInput")) {
        e.preventDefault();
        IpaDecodingManager.playAudio();
      } else if (e.code === "Space" && (e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        IpaDecodingManager.playAudio();
      }
    }
  });

  // Khởi tạo app & giọng đọc & đăng nhập
  AudioEngine.init();
  DictationManager.init();
  IpaDecodingManager.init();
  window.navigateTo("overview");
  AUTH.init();

});
