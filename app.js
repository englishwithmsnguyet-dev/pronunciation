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
    sfxEnabled: localStorage.getItem("miss_nguyet_sfx") !== "false",
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
    intonationAudio: null,
    currentUtterance: null,
    voices: [],
    audioCtx: null,

    getAudioCtx() {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    },

    // Phát âm thanh hiệu ứng sống động (Correct, Incorrect, Complete) bằng Web Audio API
    playSfx(type) {
      if (state.sfxEnabled === false) return;
      try {
        const ctx = this.getAudioCtx();
        if (!ctx) return;

        const now = ctx.currentTime;

        if (type === "correct") {
          // Chuỗi hòa âm arpeggio 3 nốt chuông ngân vang tươi vui (C5 -> E5 -> C6)
          const notes = [
            { freq: 523.25, time: 0.00, dur: 0.12, gain: 0.20, type: "triangle" }, // C5
            { freq: 659.25, time: 0.08, dur: 0.15, gain: 0.22, type: "sine" },     // E5
            { freq: 1046.50, time: 0.16, dur: 0.38, gain: 0.26, type: "sine" }     // C6
          ];

          notes.forEach(n => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = n.type;
            osc.frequency.setValueAtTime(n.freq, now + n.time);

            gain.gain.setValueAtTime(0.001, now + n.time);
            gain.gain.linearRampToValueAtTime(n.gain, now + n.time + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + n.time);
            osc.stop(now + n.time + n.dur);
          });

        } else if (type === "incorrect") {
          // Hai tiếng "bloop-bloop" trầm, mềm mại, thanh lịch, không gây giật mình
          const tones = [
            { startFreq: 310, endFreq: 260, time: 0.00, dur: 0.15, gain: 0.18 },
            { startFreq: 220, endFreq: 175, time: 0.13, dur: 0.22, gain: 0.20 }
          ];

          tones.forEach(t => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(t.startFreq, now + t.time);
            osc.frequency.exponentialRampToValueAtTime(t.endFreq, now + t.time + t.dur);

            gain.gain.setValueAtTime(0.001, now + t.time);
            gain.gain.linearRampToValueAtTime(t.gain, now + t.time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + t.time + t.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + t.time);
            osc.stop(now + t.time + t.dur);
          });

        } else if (type === "complete") {
          // Fanfare mừng chiến thắng hoàn thành chuỗi 100 từ: C5 -> E5 -> G5 -> C6
          const fanfare = [
            { freq: 523.25, time: 0.00, dur: 0.12, gain: 0.18 }, // C5
            { freq: 659.25, time: 0.10, dur: 0.12, gain: 0.20 }, // E5
            { freq: 783.99, time: 0.20, dur: 0.15, gain: 0.22 }, // G5
            { freq: 1046.50, time: 0.32, dur: 0.55, gain: 0.26 } // C6
          ];

          fanfare.forEach(n => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(n.freq, now + n.time);

            gain.gain.setValueAtTime(0.001, now + n.time);
            gain.gain.linearRampToValueAtTime(n.gain, now + n.time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + n.time);
            osc.stop(now + n.time + n.dur);
          });
        }
      } catch (err) {
        console.warn("SFX error:", err);
      }
    },

    // Phát mô phỏng sóng cao độ ngữ điệu bằng MP3 bản xứ (Hỗ trợ 100% Google Meet Tab Sharing)
    playPitchContour(toneType, btnEl) {
      const contourUrl = `audio/intonation/contour_${toneType}.mp3`;
      this.playIntonationAudio(contourUrl, null, 1.0, 1.0, btnEl);
    },

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
        if (!this.phonemeAudio) {
          this.phonemeAudio = new Audio();
        }
        this.currentAudio = this.phonemeAudio;
        this.currentAudio.src = sound.phonemeAudioUrl;
        this.currentAudio.playbackRate = state.speed;

        this.currentAudio.play().catch(() => {
          this.playWord(sound.sampleWord || sound.keyWord);
        });
      } else if (sound) {
        this.playWord(sound.sampleWord || sound.keyWord);
      }
    },

    // Phát Âm Từ Vựng với giọng bản xứ chuẩn xác & tối ưu hóa độ nét âm vị
    playWord(wordText, customRate) {
      if (!wordText) return;
      this.stop();

      if (!("speechSynthesis" in window)) return;

      // Đảm bảo SpeechSynthesis không bị trạng thái paused ngầm (lỗi kinh điển trên Chrome/Safari)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(wordText.trim());
      const voice = this.getBestVoice(state.accent);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = state.accent === "US" ? "en-US" : "en-GB";
      }

      // Tốc độ phát âm:
      // - Nếu truyền customRate (ví dụ slow 0.72x khi nghe chậm), áp dụng trực tiếp.
      // - Mặc định từ vựng đơn lập: đặt 0.88x để phát âm chuẩn từng phụ âm cuối (ending sounds /t/, /d/, /s/, /z/, /p/, /k/)
      //   và nguyên âm đôi rõ ràng, không bị nuốt âm.
      const rate = (customRate !== undefined && customRate !== null)
        ? customRate
        : Math.max(0.65, Math.min(1.3, state.speed * 0.88));

      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Chrome speech queue bug fix: delay 25ms sau khi cancel() để trình duyệt khởi động kênh âm thanh sạch
      setTimeout(() => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          console.warn("Lỗi phát âm SpeechSynthesis:", e);
        }
      }, 25);
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
      setTimeout(() => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          clearPlaying();
        }
      }, 25);
    },

    // Phát âm Ngữ Điệu Bằng MP3 Gốc Chuẩn Phòng Thu (100% Truyền Tải Được Qua Google Meet Khi Share Thẻ)
    playIntonationAudio(audioUrl, fallbackText, customPitch, customRate, btnEl) {
      this.stop();

      let activeBtn = btnEl;
      if (!activeBtn && window.event && window.event.currentTarget) {
        activeBtn = window.event.currentTarget;
      }
      if (activeBtn) activeBtn.classList.add("playing");

      const clearPlaying = () => {
        if (activeBtn) activeBtn.classList.remove("playing");
        document.querySelectorAll(".btn-tone-audio.playing, .btn-dialogue-play.playing, .btn-attitude-listen.playing, .btn-quiz-large-play.playing, .btn-play-tone-pitch.playing, .btn-quiz-contour-play.playing").forEach(b => b.classList.remove("playing"));
      };

      if (audioUrl) {
        try {
          if (!this.intonationAudio) {
            this.intonationAudio = new Audio();
          }
          this.currentAudio = this.intonationAudio;
          this.currentAudio.src = audioUrl;
          this.currentAudio.playbackRate = state.speed || 1.0;

          // Resume Web Audio Context nếu đang suspended
          if (this.audioCtx && this.audioCtx.state === "suspended") {
            this.audioCtx.resume().catch(() => {});
          }

          this.currentAudio.onended = clearPlaying;
          this.currentAudio.onerror = (e) => {
            console.warn("Lỗi tải MP3 intonation, chuyển sang TTS dự phòng:", e);
            clearPlaying();
            if (fallbackText) {
              this.playIntonationSpeech(fallbackText, customPitch, customRate, btnEl);
            }
          };

          const p = this.currentAudio.play();
          if (p && typeof p.then === "function") {
            p.catch(err => {
              console.warn("Audio play() bị chặn hoặc lỗi:", err);
              clearPlaying();
              if (fallbackText) {
                this.playIntonationSpeech(fallbackText, customPitch, customRate, btnEl);
              }
            });
          }
          return;
        } catch (err) {
          console.warn("Exception khi phát audio:", err);
        }
      }

      if (fallbackText) {
        this.playIntonationSpeech(fallbackText, customPitch, customRate, btnEl);
      } else {
        clearPlaying();
      }
    },

    // Phát âm Ngữ Điệu Dự Phòng (Non-Freezing Single Utterance)
    playIntonationSpeech(speechText, customPitch, customRate, btnEl) {
      if (!speechText) return;

      let activeBtn = btnEl;
      if (!activeBtn && window.event && window.event.currentTarget) {
        activeBtn = window.event.currentTarget;
      }
      if (activeBtn) activeBtn.classList.add("playing");

      if (!("speechSynthesis" in window)) {
        if (activeBtn) activeBtn.classList.remove("playing");
        return;
      }

      // Phá băng SpeechSynthesis nếu đang bị kẹt
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {}

      const cleanText = speechText.replace(/[↘↗→─]/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.getBestVoice(state.accent);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = state.accent === "US" ? "en-US" : "en-GB";
      }

      const pitchVal = (customPitch !== undefined && customPitch !== null) ? customPitch : 1.0;
      utterance.pitch = Math.max(0.85, Math.min(1.20, pitchVal));

      const rateVal = (customRate !== undefined && customRate !== null) ? customRate : 0.90;
      utterance.rate = Math.max(0.70, Math.min(1.25, rateVal * state.speed));
      utterance.volume = 1.0;

      const clearPlaying = () => {
        if (activeBtn) activeBtn.classList.remove("playing");
        document.querySelectorAll(".btn-tone-audio.playing, .btn-dialogue-play.playing, .btn-attitude-listen.playing, .btn-quiz-large-play.playing, .btn-play-tone-pitch.playing, .btn-quiz-contour-play.playing").forEach(b => b.classList.remove("playing"));
        this.currentUtterance = null;
      };

      utterance.onend = clearPlaying;
      utterance.onerror = clearPlaying;

      window.__activeUtterance = utterance;
      this.currentUtterance = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        clearPlaying();
      }
    },

    stop() {
      if (this.currentAudio) {
        this.currentAudio.pause();
        try {
          this.currentAudio.currentTime = 0;
        } catch (e) {}
        this.currentAudio = null;
      }
      if (this.intonationAudio) {
        this.intonationAudio.pause();
        try {
          this.intonationAudio.currentTime = 0;
        } catch (e) {}
      }
      if (this.phonemeAudio) {
        this.phonemeAudio.pause();
      }
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      document.querySelectorAll(".btn-play-sentence.playing, .btn-tone-audio.playing, .btn-dialogue-play.playing, .btn-attitude-listen.playing, .btn-quiz-large-play.playing, .btn-play-tone-pitch.playing, .btn-quiz-contour-play.playing").forEach(b => b.classList.remove("playing"));
      this.currentUtterance = null;
    },

    fallbackTTS(text, customRate) {
      this.playWord(text, customRate);
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

    AudioEngine.playSfx(q.isCorrect ? "correct" : "incorrect");
    renderPairedUnit(unitId);

    setTimeout(() => {
      AudioEngine.playWord(q.targetWord);
    }, 450);
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
    } else if (viewId === "ipa_encoding") {
      IpaEncodingManager.start();
    } else if (viewId === "rules") {
      renderRules();
    } else if (viewId === "intonation") {
      IntonationManager.start();
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
          <img src="${sound.mouthImage || `images/mouth/${sound.id}.png`}" alt="Khẩu hình /${sound.symbol}/" class="unit-mouth-img" onerror="this.onerror=null;this.src='images/mouth/${sound.id}.png'">
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
      svgBox.innerHTML = `<img src="${sound.mouthImage || `images/mouth/${sound.id}.png`}" alt="Khẩu hình /${sound.symbol}/" class="inspector-mouth-img" onerror="this.onerror=null;this.src='images/mouth/${sound.id}.png'">`;
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

    AudioEngine.playSfx(isCorrect ? "correct" : "incorrect");

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
  const BUILTIN_DICTATION_WORDS_100 = [
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
    { id: 50, word: "vehicle", ipa: "/ˈviːəkl/", vn: "phương tiện giao thông, xe cộ", hint: "motor vehicle inspection", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 51, word: "apparel", ipa: "/əˈpærəl/", vn: "trang phục, quần áo", hint: "clothing and apparel store", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 52, word: "pedestrian", ipa: "/pəˈdestriən/", vn: "người đi bộ", hint: "pedestrian crosswalk", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 53, word: "fountain", ipa: "/ˈfaʊntn/", vn: "đài phun nước", hint: "sitting by the water fountain", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 54, word: "lawn", ipa: "/lɔːn/", vn: "bãi cỏ, thảm cỏ", hint: "mowing the lawn", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 55, word: "intersection", ipa: "/ˌɪntəˈsekʃn/", vn: "ngã tư, giao lộ", hint: "at the busy intersection", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 56, word: "lamppost", ipa: "/ˈlæmppəʊst/", vn: "cột đèn đường", hint: "next to the street lamppost", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 57, word: "pavement", ipa: "/ˈpeɪvmənt/", vn: "vỉa hè, lề đường đi bộ", hint: "walking along the pavement", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 58, word: "awning", ipa: "/ˈɔːnɪŋ/", vn: "mái hiên che nắng/mưa", hint: "standing under the shop awning", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 59, word: "scaffold", ipa: "/ˈskæfəʊld/", vn: "giàn giáo thi công", hint: "working on the scaffold", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 60, word: "wheelbarrow", ipa: "/ˈwiːlbærəʊ/", vn: "xe rùa chở đất cát", hint: "pushing a wheelbarrow", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 61, word: "bench", ipa: "/bentʃ/", vn: "ghế đá công viên, băng ghế dài", hint: "resting on a park bench", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 62, word: "crate", ipa: "/kreɪt/", vn: "thùng gỗ đựng hàng", hint: "loading wooden crates", category: "TOEIC Vận Chuyển & Đơn Hàng" },
    { id: 63, word: "clipboard", ipa: "/ˈklɪpbɔːd/", vn: "bìa kẹp hồ sơ có kẹp kim loại", hint: "holding a clipboard", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 64, word: "podium", ipa: "/ˈpəʊdiəm/", vn: "bục phát biểu, bục giảng", hint: "speaking from the podium", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 65, word: "escalator", ipa: "/ˈeskəleɪtə(r)/", vn: "thang cuốn siêu thị/nhà ga", hint: "riding on the escalator", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 66, word: "apron", ipa: "/ˈeɪprən/", vn: "tạp dề nấu bếp/phục vụ", hint: "wearing a white apron", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 67, word: "shovel", ipa: "/ˈʃʌvl/", vn: "cái xẻng xúc đất", hint: "digging with a shovel", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 68, word: "ladder", ipa: "/ˈlædə(r)/", vn: "cái thang leo trèo", hint: "climbing up a stepladder", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 69, word: "conveyor", ipa: "/kənˈveɪə(r)/", vn: "băng chuyền hành lý/nhà máy", hint: "luggage conveyor belt", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 70, word: "canopy", ipa: "/ˈkænəpi/", vn: "mái vòm che, tán che râm", hint: "sitting under a large canopy", category: "TOEIC Part 1 Tranh Ảnh" },
    { id: 71, word: "colleague", ipa: "/ˈkɒliːɡ/", vn: "đồng nghiệp cùng cơ quan", hint: "discuss with a colleague", category: "TOEIC Văn Phòng & Họp" },
    { id: 72, word: "supervisor", ipa: "/ˈsuːpəvaɪzə(r)/", vn: "người giám sát, cấp trên", hint: "report to the supervisor", category: "TOEIC Văn Phòng & Họp" },
    { id: 73, word: "promotion", ipa: "/prəˈməʊʃn/", vn: "sự thăng chức; chương trình khuyến mãi", hint: "get a career promotion", category: "TOEIC Văn Phòng & Họp" },
    { id: 74, word: "extension", ipa: "/ɪkˈstenʃn/", vn: "số máy nhánh nội bộ văn phòng", hint: "call extension 402", category: "TOEIC Thiết Bị & Văn Phòng" },
    { id: 75, word: "brochure", ipa: "/ˈbrəʊʃə(r)/", vn: "cuốn sách quảng cáo, tài liệu giới thiệu", hint: "read the product brochure", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 76, word: "catalog", ipa: "/ˈkætəlɒɡ/", vn: "cuốn danh mục sản phẩm", hint: "browse the autumn catalog", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 77, word: "supplier", ipa: "/səˈplaɪə(r)/", vn: "nhà cung cấp nguyên vật liệu", hint: "contact the parts supplier", category: "TOEIC Hợp Đồng & Kinh Doanh" },
    { id: 78, word: "distributor", ipa: "/dɪˈstrɪbjətə(r)/", vn: "nhà phân phối hàng hóa", hint: "authorized local distributor", category: "TOEIC Hợp Đồng & Kinh Doanh" },
    { id: 79, word: "inventory", ipa: "/ˈɪnvəntri/", vn: "hàng tồn kho, bản kiểm kê", hint: "annual inventory check", category: "TOEIC Vận Chuyển & Đơn Hàng" },
    { id: 80, word: "reimburse", ipa: "/ˌriːɪmˈbɜːs/", vn: "hoàn tiền, thanh toán lại chi phí", hint: "reimburse travel expenses", category: "TOEIC Tài Chính & Kế Toán" },
    { id: 81, word: "itinerary", ipa: "/aɪˈtɪnərəri/", vn: "lịch trình chuyến đi chi tiết", hint: "flight and travel itinerary", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 82, word: "reservation", ipa: "/ˌrezəˈveɪʃn/", vn: "sự đặt chỗ trước (vé, phòng, bàn)", hint: "confirm hotel reservation", category: "TOEIC Sân Bay & Đi Lại" },
    { id: 83, word: "maintenance", ipa: "/ˈmeɪntənəns/", vn: "công tác bảo trì, bảo dưỡng thiết bị", hint: "routine maintenance check", category: "TOEIC Sản Xuất & Nhà Xưởng" },
    { id: 84, word: "estimate", ipa: "/ˈestɪmət/", vn: "bản dự toán, ước tính kinh phí", hint: "request a written estimate", category: "TOEIC Tài Chính & Kế Toán" },
    { id: 85, word: "warranty", ipa: "/ˈwɒrənti/", vn: "phiếu bảo hành sản phẩm", hint: "two-year product warranty", category: "TOEIC Mua Sắm & Dịch Vụ" },
    { id: 86, word: "policy", ipa: "/ˈpɒləsi/", vn: "chính sách công ty, quy định bảo hiểm", hint: "company privacy policy", category: "TOEIC Thông Báo Công Ty" },
    { id: 87, word: "regulation", ipa: "/ˌreɡjuˈleɪʃn/", vn: "quy tắc, quy chuẩn pháp lý", hint: "safety regulations compliance", category: "TOEIC Thông Báo Công Ty" },
    { id: 88, word: "deadline", ipa: "/ˈdedlaɪn/", vn: "hạn chót hoàn thành công việc", hint: "meet the tight deadline", category: "TOEIC Văn Phòng & Họp" },
    { id: 89, word: "schedule", ipa: "/ˈʃedjuːl/", vn: "lịch trình, thời gian biểu làm việc", hint: "busy work schedule", category: "TOEIC Văn Phòng & Họp" },
    { id: 90, word: "postpone", ipa: "/pəˈspəʊn/", vn: "trì hoãn, hoãn lại lịch họp", hint: "postpone the staff meeting", category: "TOEIC Văn Phòng & Họp" },
    { id: 91, word: "merger", ipa: "/ˈmɜːdʒə(r)/", vn: "vụ sáp nhập doanh nghiệp", hint: "corporate merger proposal", category: "TOEIC Hợp Đồng & Kinh Doanh" },
    { id: 92, word: "headquarters", ipa: "/ˌhedˈkwɔːtəz/", vn: "trụ sở chính của tập đoàn", hint: "visit company headquarters", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 93, word: "tenant", ipa: "/ˈtenənt/", vn: "người thuê nhà, khách thuê văn phòng", hint: "building tenant agreement", category: "TOEIC Địa Điểm & Cơ Sở" },
    { id: 94, word: "lease", ipa: "/liːs/", vn: "hợp đồng cho thuê bất động sản", hint: "sign a one-year office lease", category: "TOEIC Hợp Đồng & Kinh Doanh" },
    { id: 95, word: "amenity", ipa: "/əˈmiːnəti/", vn: "tiện nghi (hồ bơi, phòng gym, wifi)", hint: "complimentary hotel amenities", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 96, word: "banquet", ipa: "/ˈbæŋkwɪt/", vn: "bữa tiệc lớn, yến tiệc trang trọng", hint: "annual awards banquet", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 97, word: "reception", ipa: "/rɪˈsepʃn/", vn: "tiệc chiêu đãi; quầy tiếp tân", hint: "welcome reception dinner", category: "TOEIC Hội Thảo & Sự Kiện" },
    { id: 98, word: "complaint", ipa: "/kəmˈpleɪnt/", vn: "lời khiếu nại, phản ánh của khách", hint: "file a customer complaint", category: "TOEIC Dịch Vụ Khách Hàng" },
    { id: 99, word: "overtime", ipa: "/ˈəʊvətaɪm/", vn: "giờ làm thêm, tăng ca", hint: "work overtime hours", category: "TOEIC Văn Phòng & Họp" },
    { id: 100, word: "applicant", ipa: "/ˈæplɪkənt/", vn: "ứng viên nộp đơn xin việc", hint: "interview job applicants", category: "TOEIC Văn Phòng & Họp" }
  ];
  const BUILTIN_DICTATION_WORDS_50 = BUILTIN_DICTATION_WORDS_100;

  // Chuẩn hóa và so sánh từ vựng linh hoạt (bảo đảm tính chính xác ngữ âm, chấp nhận biến thể Anh-Mỹ / Anh-Anh hợp lệ)
  function checkWordMatch(userInput, targetWord, item) {
    if (!userInput || !targetWord) return false;
    const cleanUser = userInput.toLowerCase().trim().replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const cleanTarget = targetWord.toLowerCase().trim().replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    if (cleanUser === cleanTarget) return true;

    // Kiểm tra danh sách bí danh/biến thể nếu có trong dữ liệu
    if (item && Array.isArray(item.aliases)) {
      if (item.aliases.some(a => a.toLowerCase().trim().replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "") === cleanUser)) {
        return true;
      }
    }

    // Các cặp biến thể Anh-Anh / Anh-Mỹ phổ biến
    const UK_US_VARIANTS = [
      ["catalog", "catalogue"],
      ["favorite", "favourite"],
      ["color", "colour"],
      ["flavor", "flavour"],
      ["neighbor", "neighbour"],
      ["center", "centre"],
      ["theater", "theatre"],
      ["meter", "metre"],
      ["organize", "organise"],
      ["recognize", "recognise"],
      ["realize", "realise"],
      ["apologize", "apologise"],
      ["analyze", "analyse"],
      ["traveler", "traveller"],
      ["canceled", "cancelled"],
      ["canceling", "cancelling"],
      ["program", "programme"],
      ["dialog", "dialogue"],
      ["defense", "defence"],
      ["license", "licence"],
      ["practice", "practise"]
    ];

    for (const [v1, v2] of UK_US_VARIANTS) {
      if ((cleanTarget === v1 && cleanUser === v2) || (cleanTarget === v2 && cleanUser === v1)) {
        return true;
      }
    }

    return false;
  }

  // Lấy phiên âm IPA phù hợp với giọng đọc đã chọn (US hoặc UK)
  function getWordDisplayIpa(item) {
    if (!item) return "";
    if (state.accent === "UK" && item.ipaUK) return item.ipaUK;
    if (state.accent === "US" && item.ipaUS) return item.ipaUS;
    return item.ipa || "";
  }

  const DictationManager = {
    words: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    isAnswered: false,
    showHint: false,
    history: [],
    storageKey: "miss_nguyet_dictation_100_progress",
    isResumed: false,

    init() {
      const srcWords = (window.DICTATION_WORDS_100 && window.DICTATION_WORDS_100.length)
        ? window.DICTATION_WORDS_100
        : ((window.DICTATION_WORDS_50 && window.DICTATION_WORDS_50.length) ? window.DICTATION_WORDS_50 : BUILTIN_DICTATION_WORDS_100);
      this.words = [...srcWords];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
      this.isResumed = false;
    },

    saveProgress() {
      try {
        if (!this.words || !this.words.length) return;
        const data = {
          currentIndex: this.currentIndex,
          score: this.score,
          streak: this.streak,
          maxStreak: this.maxStreak,
          history: this.history,
          words: this.words,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (err) {
        console.warn("Lỗi lưu tiến độ nghe & đánh máy:", err);
      }
    },

    loadProgress() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.words) && parsed.words.length > 0 && typeof parsed.currentIndex === "number") {
          return parsed;
        }
      } catch (err) {
        console.warn("Lỗi tải tiến độ nghe & đánh máy:", err);
      }
      return null;
    },

    clearProgress() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (err) {}
      this.isResumed = false;
    },

    pauseAndSave() {
      this.saveProgress();
      this.showPauseModal();
    },

    showPauseModal() {
      const existing = document.getElementById("dictationPauseOverlay");
      if (existing) existing.remove();

      const total = this.words.length || 100;
      const curNum = this.currentIndex + 1;
      const overlay = document.createElement("div");
      overlay.id = "dictationPauseOverlay";
      overlay.className = "dictation-pause-overlay";
      overlay.innerHTML = `
        <div class="dictation-pause-card">
          <div class="pause-icon">💾</div>
          <h3 class="pause-title">Tiến Độ Đã Được Sao Lưu!</h3>
          <p class="pause-desc">
            Hệ thống đã lưu lại tiến trình làm bài của bạn an toàn vào trình duyệt:
          </p>
          <div class="pause-stats-box">
            <div class="pause-stat-item">
              <span class="pause-stat-label">Đang ở câu</span>
              <strong class="pause-stat-val">${curNum} / ${total}</strong>
            </div>
            <div class="pause-stat-item">
              <span class="pause-stat-label">Số câu đúng</span>
              <strong class="pause-stat-val">${this.score}</strong>
            </div>
            <div class="pause-stat-item">
              <span class="pause-stat-label">Chuỗi đúng</span>
              <strong class="pause-stat-val">${this.streak}</strong>
            </div>
          </div>
          <p class="pause-note">
            💡 Bạn có thể yên tâm tắt trình duyệt hoặc chuyển sang học phần khác. Lần sau mở lại mục này, bài tập sẽ tự động tiếp tục chính xác từ câu ${curNum}!
          </p>
          <div class="pause-actions">
            <button class="btn-pause-primary" onclick="DictationManager.resumeFromPause()">
              ▶️ Tiếp Tục Làm Bài
            </button>
            <button class="btn-pause-secondary" onclick="DictationManager.exitToOverview()">
              🏠 Thoát Về Bảng IPA
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    },

    resumeFromPause() {
      const overlay = document.getElementById("dictationPauseOverlay");
      if (overlay) overlay.remove();
      const input = document.getElementById("dictationInput");
      if (input && !input.disabled) input.focus();
    },

    exitToOverview() {
      const overlay = document.getElementById("dictationPauseOverlay");
      if (overlay) overlay.remove();
      if (typeof window.switchView === "function") {
        window.switchView("chart");
      }
    },

    resetProgress() {
      if (confirm("Bạn có chắc chắn muốn làm lại từ câu 1 không? Tiến độ đang làm dở sẽ được xoá.")) {
        this.clearProgress();
        this.start(false, true);
      }
    },

    start(shuffle = false, forceReset = false) {
      if (!forceReset && !shuffle) {
        const saved = this.loadProgress();
        if (saved && saved.currentIndex > 0 && saved.currentIndex < saved.words.length) {
          this.words = saved.words;
          this.currentIndex = saved.currentIndex;
          this.score = saved.score || 0;
          this.streak = saved.streak || 0;
          this.maxStreak = saved.maxStreak || 0;
          this.history = saved.history || [];
          this.isAnswered = false;
          this.showHint = false;
          this.isResumed = true;

          this.render();
          setTimeout(() => {
            this.playCurrentAudio();
          }, 350);
          return;
        }
      }

      this.init();
      if (shuffle && this.words.length) {
        for (let i = this.words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
      }
      this.clearProgress();
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
      this.isResumed = false;

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

      // Phát âm với tốc độ tối ưu: slow = 0.72x rõ nét từng âm cuối; thường = 0.88x tự nhiên
      const targetRate = slow ? 0.72 : Math.max(0.65, Math.min(1.3, state.speed * 0.88));
      AudioEngine.playWord(cur.word, targetRate);
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
      const isCorrect = checkWordMatch(userText, targetWord, cur);

      this.isAnswered = true;
      if (isCorrect) {
        AudioEngine.playSfx("correct");
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      } else {
        AudioEngine.playSfx("incorrect");
        this.streak = 0;
      }

      this.history.push({
        id: cur.id,
        word: cur.word,
        userWord: userText,
        isCorrect: isCorrect,
        ipa: cur.ipa,
        ipaUK: cur.ipaUK,
        ipaUS: cur.ipaUS,
        vn: cur.vn,
        category: cur.category
      });

      this.saveProgress();
      this.renderFeedback(isCorrect, cur, userText);

      // Tự động phát âm chuẩn lại từ vừa nộp bài sau 450ms (sau khi hiệu ứng âm thanh vang lên) để củng cố phản xạ
      setTimeout(() => {
        AudioEngine.playWord(cur.word);
      }, 450);
    },

    nextWord() {
      this.currentIndex++;
      this.isAnswered = false;
      this.showHint = false;

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
      } else {
        this.saveProgress();
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
            <p style="font-size:1.1rem; color:var(--text-muted); margin-bottom:16px;">Đang chuẩn bị bài tập 100 từ cốt lõi...</p>
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
          <!-- Banner Tiếp Tục Làm Bài (Nếu Đang Làm Dở) -->
          ${this.isResumed ? `
            <div class="dictation-resume-banner">
              <div class="resume-banner-text">
                📌 <strong>Tiếp tục bài làm dở:</strong> Bạn đang ở câu <strong>${this.currentIndex + 1}/${total}</strong> (Đã tích lũy: <strong>${this.score}</strong> điểm).
              </div>
              <button class="btn-resume-restart" onclick="DictationManager.resetProgress()" title="Bắt đầu lại bài tập từ câu đầu tiên">
                🔄 Làm Lại Từ Câu 1
              </button>
            </div>
          ` : ""}

          <!-- Header Thống Kê & Nút Tạm Dừng -->
          <div class="dictation-header">
            <span class="dictation-category-badge">🏷️ Nhóm: ${cur.category || "Cốt lõi"}</span>
            <div class="dictation-stats-row">
              <span class="dictation-stat-pill">📊 Câu: <strong>${this.currentIndex + 1}/${total}</strong></span>
              <span class="dictation-stat-pill">🎯 Đúng: <strong>${this.score}</strong></span>
              ${this.streak > 1 ? `<span class="dictation-stat-pill streak">🔥 Chuỗi: <strong>${this.streak}</strong></span>` : ""}
              <button class="btn-dictation-pause" onclick="DictationManager.pauseAndSave()" title="Tạm dừng và lưu kết quả để lần sau làm tiếp">
                ⏸️ Tạm Dừng &amp; Lưu
              </button>
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
              <span class="dictation-correct-ipa">${cur.ipaUK && cur.ipaUS && cur.ipaUK !== cur.ipaUS ? `🇺🇸 ${cur.ipaUS} | 🇬🇧 ${cur.ipaUK}` : cur.ipa}</span>
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
            <span>${this.currentIndex + 1 >= this.words.length ? '🏆 Xem Kết Quả Tổng Kết (100 Từ)' : 'Câu Tiếp Theo'}</span> <span>↵</span>
          </button>
        </div>
      `;

      setTimeout(() => {
        const nextBtn = document.getElementById("btnDictationNext");
        if (nextBtn) nextBtn.focus();
      }, 50);
    },

    renderSummary() {
      // Khi đã hoàn thành câu 100, giải phóng bản lưu tạm
      this.clearProgress();

      const container = document.getElementById("dictationContainer");
      if (!container) return;

      AudioEngine.playSfx("complete");

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
            <strong>${h.word}</strong> <span style="color:var(--brand-primary-dark); font-size:0.82rem;">${h.ipaUK && h.ipaUS && h.ipaUK !== h.ipaUS ? `(US: ${h.ipaUS} / UK: ${h.ipaUK})` : h.ipa}</span>
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
          <h2 class="dictation-summary-title">Hoàn Thành Thử Thách 100 Từ!</h2>
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
            <h3 class="dictation-review-title">📋 Bảng Chi Tiết Kết Quả 100 Từ:</h3>
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
            <button class="btn-dictation-restart" onclick="DictationManager.start(false, true)">
              <span>🔄 Làm Lại Từ Đầu</span>
            </button>
            <button class="btn-dictation-restart" onclick="DictationManager.start(true, true)" style="background:var(--brand-primary-dark);">
              <span>🔀 Xáo Trộn Thứ Tự 100 Từ</span>
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
  const BUILTIN_IPA_DECODING_WORDS_100 = [
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
    { id: 50, word: "doubt", ipa: "/daʊt/", vn: "sự nghi ngờ, phân vân", hint: "Câm chữ 'b', đọc là /daʊt/", category: "Tâm lý & Cảm xúc" },
    { id: 51, word: "language", ipa: "/ˈlæŋɡwɪdʒ/", vn: "ngôn ngữ, tiếng nói", hint: "Âm /æ/, âm mũi /ŋɡw/ và đuôi /dʒ/", category: "Giao tiếp & Ngôn ngữ" },
    { id: 52, word: "palace", ipa: "/ˈpæləs/", vn: "cung điện hoàng gia", hint: "Âm /æ/ và đuôi /əs/", category: "Kiến trúc & Địa điểm" },
    { id: 53, word: "stomach", ipa: "/ˈstʌmək/", vn: "dạ dày, bụng", hint: "Âm /ʌ/ và đuôi /k/ (chữ ch đọc là /k/)", category: "Cơ thể & Sức khỏe" },
    { id: 54, word: "anchor", ipa: "/ˈæŋkə(r)/", vn: "mỏ neo tàu thuyền", hint: "Chữ ch phát âm là /k/, âm mũi /ŋk/", category: "Hàng hải & Đồ vật" },
    { id: 55, word: "character", ipa: "/ˈkærəktə(r)/", vn: "tính cách; nhân vật", hint: "Chữ ch đọc là /k/, trọng âm 1", category: "Con người & Văn học" },
    { id: 56, word: "echo", ipa: "/ˈekəʊ/", vn: "tiếng vang, âm dội lại", hint: "Chữ ch đọc là /k/, âm đôi /əʊ/", category: "Âm thanh & Tự nhiên" },
    { id: 57, word: "choir", ipa: "/ˈkwaɪə(r)/", vn: "dàn hợp xướng", hint: "Chữ ch đọc là /kw/ và vần /aɪə/", category: "Âm nhạc & Nghệ thuật" },
    { id: 58, word: "rhythm", ipa: "/ˈrɪðəm/", vn: "nhịp điệu, tiết tấu", hint: "Câm chữ 'h', âm thè lưỡi rung /ð/", category: "Âm nhạc & Nghệ thuật" },
    { id: 59, word: "rhyme", ipa: "/raɪm/", vn: "vần thơ, gieo vần", hint: "Câm chữ 'h', âm đôi /aɪ/", category: "Văn học & Nghệ thuật" },
    { id: 60, word: "chaos", ipa: "/ˈkeɪɒs/", vn: "sự hỗn loạn, náo loạn", hint: "Chữ ch phát âm là /k/, âm đôi /eɪ/", category: "Trạng thái & Đời sống" },
    { id: 61, word: "foreign", ipa: "/ˈfɒrən/", vn: "thuộc về nước ngoài", hint: "Câm chữ 'g', âm tròn môi /ɒ/", category: "Quốc tế & Xã hội" },
    { id: 62, word: "sign", ipa: "/saɪn/", vn: "ký hiệu, biển báo, ký tên", hint: "Câm chữ 'g', âm đôi /aɪ/", category: "Đời sống & Công việc" },
    { id: 63, word: "design", ipa: "/dɪˈzaɪn/", vn: "thiết kế, mẫu vẽ", hint: "Câm chữ 'g', âm rung /z/", category: "Sáng tạo & Nghệ thuật" },
    { id: 64, word: "autumn", ipa: "/ˈɔːtəm/", vn: "mùa thu", hint: "Câm chữ 'n' cuối từ, âm dài /ɔː/", category: "Thời gian & Thời tiết" },
    { id: 65, word: "column", ipa: "/ˈkɒləm/", vn: "cột trụ nhà; chuyên mục báo", hint: "Câm chữ 'n' cuối từ, âm /ɒ/", category: "Kiến trúc & Truyền thông" },
    { id: 66, word: "sword", ipa: "/sɔːd/", vn: "thanh gươm, thanh kiếm", hint: "Câm chữ 'w', đọc là /sɔːd/", category: "Vũ khí & Lịch sử" },
    { id: 67, word: "answer", ipa: "/ˈɑːnsə(r)/", vn: "câu trả lời, hồi đáp", hint: "Câm chữ 'w', âm dài /ɑː/", category: "Giao tiếp & Đời sống" },
    { id: 68, word: "whole", ipa: "/həʊl/", vn: "toàn bộ, trọn vẹn", hint: "Câm chữ 'w', bắt đầu bằng /h/", category: "Số lượng & Tính từ" },
    { id: 69, word: "wrap", ipa: "/ræp/", vn: "gói quà, bọc lại", hint: "Câm chữ 'w', bắt đầu bằng /r/", category: "Hành động & Đời sống" },
    { id: 70, word: "wreck", ipa: "/rek/", vn: "vụ đắm tàu, xác đổ nát", hint: "Câm chữ 'w', âm ngắn /e/", category: "Tai nạn & Giao thông" },
    { id: 71, word: "wrist", ipa: "/rɪst/", vn: "cổ tay", hint: "Câm chữ 'w', đuôi /st/", category: "Cơ thể & Con người" },
    { id: 72, word: "knife", ipa: "/naɪf/", vn: "con dao thái", hint: "Câm chữ 'k', bắt đầu bằng /n/", category: "Đồ dùng nhà bếp" },
    { id: 73, word: "knight", ipa: "/naɪt/", vn: "hiệp sĩ thời trung cổ", hint: "Câm chữ 'k' và 'gh', đọc như night", category: "Lịch sử & Nhân vật" },
    { id: 74, word: "knot", ipa: "/nɒt/", vn: "nút thắt dây", hint: "Câm chữ 'k', âm tròn môi /ɒ/", category: "Đồ vật & Đời sống" },
    { id: 75, word: "knee", ipa: "/niː/", vn: "đầu gối chân", hint: "Câm chữ 'k', âm dài /iː/", category: "Cơ thể & Con người" },
    { id: 76, word: "psychology", ipa: "/saɪˈkɒlədʒi/", vn: "tâm lý học", hint: "Câm chữ 'p' đầu từ, đọc từ /s/", category: "Khoa học & Tâm lý" },
    { id: 77, word: "plumber", ipa: "/ˈplʌmə(r)/", vn: "thợ sửa ống nước", hint: "Câm chữ 'b', âm /ʌ/", category: "Nghề nghiệp & Đời sống" },
    { id: 78, word: "comb", ipa: "/kəʊm/", vn: "cái lược chải đầu", hint: "Câm chữ 'b', âm đôi /əʊ/", category: "Đồ dùng cá nhân" },
    { id: 79, word: "tomb", ipa: "/tuːm/", vn: "ngôi mộ, lăng tẩm", hint: "Câm chữ 'b', âm dài /uː/", category: "Lịch sử & Địa điểm" },
    { id: 80, word: "debt", ipa: "/det/", vn: "món nợ tiền", hint: "Câm chữ 'b', âm ngắn /e/", category: "Tài chính & Kinh tế" },
    { id: 81, word: "crumb", ipa: "/krʌm/", vn: "mẩu vụn bánh", hint: "Câm chữ 'b', âm ngắn /ʌ/", category: "Ẩm thực & Đời sống" },
    { id: 82, word: "lamb", ipa: "/læm/", vn: "con cừu non", hint: "Câm chữ 'b', âm mở /æ/", category: "Động vật & Thiên nhiên" },
    { id: 83, word: "limb", ipa: "/lɪm/", vn: "chi (tay, chân), cành cây", hint: "Câm chữ 'b', âm ngắn /ɪ/", category: "Cơ thể & Tự nhiên" },
    { id: 84, word: "numb", ipa: "/nʌm/", vn: "tê cóng, mất cảm giác", hint: "Câm chữ 'b', âm ngắn /ʌ/", category: "Cảm giác & Sức khỏe" },
    { id: 85, word: "fasten", ipa: "/ˈfɑːsn/", vn: "thắt chặt, cài dây an toàn", hint: "Câm chữ 't', đọc là /ˈfɑːsn/", category: "Hành động & An toàn" },
    { id: 86, word: "soften", ipa: "/ˈsɒfn/", vn: "làm mềm, dịu đi", hint: "Câm chữ 't', đọc là /ˈsɒfn/", category: "Hành động & Biến đổi" },
    { id: 87, word: "whistle", ipa: "/ˈwɪsl/", vn: "cái còi; huýt sáo", hint: "Câm chữ 't' và 'h', đọc là /ˈwɪsl/", category: "Âm thanh & Đồ vật" },
    { id: 88, word: "rustle", ipa: "/ˈrʌsl/", vn: "tiếng lá xào xạc", hint: "Câm chữ 't', đọc là /ˈrʌsl/", category: "Âm thanh & Tự nhiên" },
    { id: 89, word: "bustle", ipa: "/ˈbʌsl/", vn: "sự nhộn nhịp, hối hả", hint: "Câm chữ 't', đọc là /ˈbʌsl/", category: "Đời sống & Xã hội" },
    { id: 90, word: "christmas", ipa: "/ˈkrɪsməs/", vn: "lễ Giáng Sinh", hint: "Câm chữ 't', chữ ch đọc là /k/", category: "Lễ hội & Văn hóa" },
    { id: 91, word: "mortgage", ipa: "/ˈmɔːɡɪdʒ/", vn: "khoản vay thế chấp nhà", hint: "Câm chữ 't', đọc là /ˈmɔːɡɪdʒ/", category: "Tài chính & Ngân hàng" },
    { id: 92, word: "ballet", ipa: "/ˈbæleɪ/", vn: "múa ba lê, vũ kịch", hint: "Câm chữ 't' đuôi kiểu tiếng Pháp", category: "Nghệ thuật & Khiêu vũ" },
    { id: 93, word: "buffet", ipa: "/ˈbʊfeɪ/", vn: "tiệc đứng tự chọn món", hint: "Câm chữ 't' đuôi kiểu tiếng Pháp", category: "Ẩm thực & Nhà hàng" },
    { id: 94, word: "gourmet", ipa: "/ˈɡʊəmeɪ/", vn: "sành ăn, món ăn cao cấp", hint: "Câm chữ 't' đuôi kiểu tiếng Pháp", category: "Ẩm thực cao cấp" },
    { id: 95, word: "depot", ipa: "/ˈdepəʊ/", vn: "nhà ga, kho bãi trung chuyển", hint: "Câm chữ 't' đuôi kiểu tiếng Pháp", category: "Vận tải & Cơ sở" },
    { id: 96, word: "bouquet", ipa: "/buˈkeɪ/", vn: "bó hoa tươi", hint: "Câm chữ 't' đuôi kiểu tiếng Pháp", category: "Quà tặng & Đời sống" },
    { id: 97, word: "debris", ipa: "/ˈdebriː/", vn: "mảnh vụn vỡ, đống đổ nát", hint: "Câm chữ 's' đuôi kiểu tiếng Pháp", category: "Tai nạn & Môi trường" },
    { id: 98, word: "neighbor", ipa: "/ˈneɪbə(r)/", vn: "người hàng xóm láng giềng", hint: "Cụm 'eigh' phát âm là /eɪ/", category: "Xã hội & Đời sống" },
    { id: 99, word: "height", ipa: "/haɪt/", vn: "chiều cao, độ cao", hint: "Cụm 'eigh' phát âm đặc biệt là /aɪ/", category: "Đo lường & Kích thước" },
    { id: 100, word: "significance", ipa: "/sɪɡˈnɪfɪkəns/", vn: "ý nghĩa quan trọng, tầm ảnh hưởng", hint: "Trọng âm âm tiết 2, đuôi /əns/", category: "Tính chất & Tầm vóc" }
  ];
  const BUILTIN_IPA_DECODING_WORDS_50 = BUILTIN_IPA_DECODING_WORDS_100;

  const IpaDecodingManager = {
    words: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    isAnswered: false,
    showHint: false,
    history: [],
    storageKey: "miss_nguyet_ipa_decoding_100_progress",
    isResumed: false,

    init() {
      const srcWords = (window.IPA_DECODING_WORDS_100 && window.IPA_DECODING_WORDS_100.length)
        ? window.IPA_DECODING_WORDS_100
        : ((window.IPA_DECODING_WORDS_50 && window.IPA_DECODING_WORDS_50.length) ? window.IPA_DECODING_WORDS_50 : BUILTIN_IPA_DECODING_WORDS_100);
      this.words = [...srcWords];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
      this.isResumed = false;
    },

    saveProgress() {
      try {
        if (!this.words || !this.words.length) return;
        const data = {
          currentIndex: this.currentIndex,
          score: this.score,
          streak: this.streak,
          maxStreak: this.maxStreak,
          history: this.history,
          words: this.words,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (err) {
        console.warn("Lỗi lưu tiến độ đoán từ IPA:", err);
      }
    },

    loadProgress() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.words) && parsed.words.length > 0 && typeof parsed.currentIndex === "number") {
          return parsed;
        }
      } catch (err) {
        console.warn("Lỗi tải tiến độ đoán từ IPA:", err);
      }
      return null;
    },

    clearProgress() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (err) {}
      this.isResumed = false;
    },

    pauseAndSave() {
      this.saveProgress();
      this.showPauseModal();
    },

    showPauseModal() {
      const existing = document.getElementById("ipaDecodingPauseOverlay");
      if (existing) existing.remove();

      const total = this.words.length || 100;
      const curNum = this.currentIndex + 1;
      const overlay = document.createElement("div");
      overlay.id = "ipaDecodingPauseOverlay";
      overlay.className = "dictation-pause-overlay";
      overlay.innerHTML = `
        <div class="dictation-pause-card">
          <div class="pause-icon">💾</div>
          <h3 class="pause-title">Tiến Độ Đã Được Sao Lưu!</h3>
          <p class="pause-desc">
            Hệ thống đã lưu lại tiến trình giải mã IPA của bạn an toàn vào trình duyệt:
          </p>
          <div class="pause-stats-box">
            <div class="pause-stat-item">
              <span class="pause-stat-label">Đang ở câu</span>
              <strong class="pause-stat-val">${curNum} / ${total}</strong>
            </div>
            <div class="pause-stat-item">
              <span class="pause-stat-label">Số câu đúng</span>
              <strong class="pause-stat-val">${this.score}</strong>
            </div>
            <div class="pause-stat-item">
              <span class="pause-stat-label">Chuỗi đúng</span>
              <strong class="pause-stat-val">${this.streak}</strong>
            </div>
          </div>
          <p class="pause-note">
            💡 Bạn có thể yên tâm tắt trình duyệt hoặc đổi sang học phần khác. Lần sau quay lại mục này, bài tập sẽ tự động tiếp tục chính xác từ câu ${curNum}!
          </p>
          <div class="pause-actions">
            <button class="btn-pause-primary" onclick="IpaDecodingManager.resumeFromPause()">
              ▶️ Tiếp Tục Làm Bài
            </button>
            <button class="btn-pause-secondary" onclick="IpaDecodingManager.exitToOverview()">
              🏠 Thoát Về Bảng IPA
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    },

    resumeFromPause() {
      const overlay = document.getElementById("ipaDecodingPauseOverlay");
      if (overlay) overlay.remove();
      const input = document.getElementById("ipaDecodingInput");
      if (input && !input.disabled) input.focus();
    },

    exitToOverview() {
      const overlay = document.getElementById("ipaDecodingPauseOverlay");
      if (overlay) overlay.remove();
      if (typeof window.switchView === "function") {
        window.switchView("chart");
      }
    },

    resetProgress() {
      if (confirm("Bạn có chắc chắn muốn làm lại từ câu 1 không? Tiến độ đang làm dở sẽ được xoá.")) {
        this.clearProgress();
        this.start(false, true);
      }
    },

    start(shuffle = false, forceReset = false) {
      if (!forceReset && !shuffle) {
        const saved = this.loadProgress();
        if (saved && saved.currentIndex > 0 && saved.currentIndex < saved.words.length) {
          this.words = saved.words;
          this.currentIndex = saved.currentIndex;
          this.score = saved.score || 0;
          this.streak = saved.streak || 0;
          this.maxStreak = saved.maxStreak || 0;
          this.history = saved.history || [];
          this.isAnswered = false;
          this.showHint = false;
          this.isResumed = true;

          this.render();
          return;
        }
      }

      this.init();
      if (shuffle && this.words.length) {
        for (let i = this.words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
      }
      this.clearProgress();
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
      this.isResumed = false;

      this.render();
    },

    getCurrentWord() {
      return this.words[this.currentIndex] || null;
    },

    playAudio(slow = false) {
      const cur = this.getCurrentWord();
      if (!cur) return;
      const targetRate = slow ? 0.72 : Math.max(0.65, Math.min(1.3, state.speed * 0.88));
      AudioEngine.playWord(cur.word, targetRate);
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
      const isCorrect = checkWordMatch(userText, targetWord, cur);

      this.isAnswered = true;
      if (isCorrect) {
        AudioEngine.playSfx("correct");
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      } else {
        AudioEngine.playSfx("incorrect");
        this.streak = 0;
      }

      this.history.push({
        id: cur.id,
        word: cur.word,
        userWord: userText,
        isCorrect: isCorrect,
        ipa: cur.ipa,
        ipaUK: cur.ipaUK,
        ipaUS: cur.ipaUS,
        vn: cur.vn,
        category: cur.category
      });

      this.saveProgress();
      this.renderFeedback(isCorrect, cur, userText);

      // Tự động phát âm từ chuẩn sau 450ms (sau khi hiệu ứng âm thanh vang lên)
      setTimeout(() => {
        AudioEngine.playWord(cur.word);
      }, 450);
    },

    nextWord() {
      this.currentIndex++;
      this.isAnswered = false;
      this.showHint = false;

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
      } else {
        this.saveProgress();
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
            <p style="font-size:1.1rem; color:var(--text-muted); margin-bottom:16px;">Đang chuẩn bị 100 từ phiên âm IPA...</p>
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
          <!-- Banner Tiếp Tục Làm Bài (Nếu Đang Làm Dở) -->
          ${this.isResumed ? `
            <div class="dictation-resume-banner">
              <div class="resume-banner-text">
                📌 <strong>Tiếp tục bài làm dở:</strong> Bạn đang ở câu <strong>${this.currentIndex + 1}/${total}</strong> (Đã tích lũy: <strong>${this.score}</strong> điểm).
              </div>
              <button class="btn-resume-restart" onclick="IpaDecodingManager.resetProgress()" title="Bắt đầu lại bài tập từ câu đầu tiên">
                🔄 Làm Lại Từ Câu 1
              </button>
            </div>
          ` : ""}

          <!-- Header Thống Kê & Nút Tạm Dừng -->
          <div class="dictation-header">
            <span class="dictation-category-badge">🏷️ Nhóm: ${cur.category || "Từ vựng"}</span>
            <div class="dictation-stats-row">
              <span class="dictation-stat-pill">📊 Câu: <strong>${this.currentIndex + 1}/${total}</strong></span>
              <span class="dictation-stat-pill">🎯 Đúng: <strong>${this.score}</strong></span>
              ${this.streak > 1 ? `<span class="dictation-stat-pill streak">🔥 Chuỗi: <strong>${this.streak}</strong></span>` : ""}
              <button class="btn-dictation-pause" onclick="IpaDecodingManager.pauseAndSave()" title="Tạm dừng và lưu kết quả để lần sau làm tiếp">
                ⏸️ Tạm Dừng &amp; Lưu
              </button>
            </div>
          </div>

          <!-- Thanh Tiến Trình -->
          <div class="dictation-progress-bar-bg">
            <div class="dictation-progress-bar-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Khung Hiển Thị Phiên Âm IPA Trung Tâm -->
          <div class="ipa-showcase-box">
            <div class="ipa-showcase-badge">🔤 PHIÊN ÂM QUỐC TẾ (IPA):</div>
            <div class="ipa-showcase-text">${getWordDisplayIpa(cur)}</div>
            ${cur.ipaUK && cur.ipaUS && cur.ipaUK !== cur.ipaUS ? `
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
              <span>🇺🇸 US: <strong style="color:var(--brand-primary-dark);">${cur.ipaUS}</strong></span> &nbsp;•&nbsp; 
              <span>🇬🇧 UK: <strong style="color:var(--brand-primary-dark);">${cur.ipaUK}</strong></span>
            </div>` : ""}
            <div class="ipa-showcase-sub">Đọc kỹ dấu trọng âm <strong>'</strong> và các ký hiệu ngữ âm để đoán từ tiếng Anh tương ứng</div>
            
            <div class="dictation-audio-subcontrols" style="margin-top: 14px;">
              <button class="btn-dictation-subaction" onclick="IpaDecodingManager.playAudio(false)" title="Nghe người bản xứ phát âm từ này để trợ giúp">
                🔊 Nghe Phát Âm Trợ Giúp
              </button>
              <button class="btn-dictation-subaction" onclick="IpaDecodingManager.playAudio(true)" title="Phát âm chậm 0.72x để nghe rõ từng phụ âm">
                🐢 Nghe Chậm (0.72x)
              </button>
              <button class="btn-dictation-subaction" id="btnIpaDecodingHint" onclick="IpaDecodingManager.toggleHint()">
                💡 Gợi Ý Nghĩa
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
              <span class="dictation-correct-ipa">${cur.ipaUK && cur.ipaUS && cur.ipaUK !== cur.ipaUS ? `🇺🇸 ${cur.ipaUS} | 🇬🇧 ${cur.ipaUK}` : cur.ipa}</span>
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
            <span>${this.currentIndex + 1 >= this.words.length ? '🏆 Xem Kết Quả Tổng Kết (100 Từ)' : 'Câu Tiếp Theo'}</span> <span>↵</span>
          </button>
        </div>
      `;

      setTimeout(() => {
        const nextBtn = document.getElementById("btnIpaDecodingNext");
        if (nextBtn) nextBtn.focus();
      }, 50);
    },

    renderSummary() {
      // Khi đã hoàn thành câu 100, giải phóng bản lưu tạm
      this.clearProgress();

      const container = document.getElementById("ipaDecodingContainer");
      if (!container) return;

      AudioEngine.playSfx("complete");

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
            <div style="font-family:'Charis SIL',serif; font-size:1.15rem; font-weight:700; color:var(--brand-primary-dark);">${h.ipaUK && h.ipaUS && h.ipaUK !== h.ipaUS ? `🇺🇸 ${h.ipaUS} | 🇬🇧 ${h.ipaUK}` : h.ipa}</div>
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
          <h2 class="dictation-summary-title">Hoàn Thành Thử Thách 100 Từ IPA!</h2>
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
            <h3 class="dictation-review-title">📋 Bảng Chi Tiết Kết Quả 100 Từ IPA:</h3>
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
            <button class="btn-dictation-restart" onclick="IpaDecodingManager.start(false, true)">
              <span>🔄 Làm Lại Từ Đầu</span>
            </button>
            <button class="btn-dictation-restart" onclick="IpaDecodingManager.start(true, true)" style="background:var(--brand-primary-dark);">
              <span>🔀 Xáo Trộn Thứ Tự 100 Từ</span>
            </button>
          </div>
        </div>
      `;
    }
  };

  window.IpaDecodingManager = IpaDecodingManager;

  // ==========================================================================
  // MODULE: NHÌN TỪ GHÉP PHIÊN ÂM IPA (WORD TO IPA ENCODING ARENA - 100 TỪ)
  // ==========================================================================
  function checkIpaMatch(userText, targetIpa, item) {
    if (!userText || (!targetIpa && !item)) return false;

    function clean(str) {
      if (!str) return "";
      return str
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "") // Bỏ dấu / ở đầu và cuối
        .replace(/['’]/g, "ˈ")     // Đổi nháy đơn thành dấu trọng âm chính ˈ
        .replace(/[,]/g, "ˌ")      // Đổi dấu phẩy thành dấu trọng âm phụ ˌ
        .replace(/[:]/g, "ː")      // Đổi dấu hai chấm bàn phím thành dấu âm dài ː
        .replace(/\s+/g, "")       // Bỏ khoảng trắng thừa
        .replace(/[()]/g, "");     // Bỏ ngoặc đơn (ví dụ /pɔː(r)/ -> pɔːr)
    }

    const u = clean(userText);
    if (!u) return false;

    const validTargets = [];
    if (targetIpa) validTargets.push(clean(targetIpa));
    if (item) {
      if (item.ipa) validTargets.push(clean(item.ipa));
      if (item.ipaUK) validTargets.push(clean(item.ipaUK));
      if (item.ipaUS) validTargets.push(clean(item.ipaUS));
    }

    // 1. So khớp chính xác
    if (validTargets.some(t => t === u)) return true;

    // 2. Chuẩn hóa biến thể nguyên âm (əʊ vs oʊ, âm r cuối, etc.)
    const normVariants = (str) => {
      return str
        .replace(/oʊ/g, "əʊ")
        .replace(/ɜːr/g, "ɜː")
        .replace(/ər/g, "ə")
        .replace(/ɔːr/g, "ɔː")
        .replace(/ɑːr/g, "ɑː")
        .replace(/iː$/g, "i")
        .replace(/uː$/g, "u");
    };

    const uNorm = normVariants(u);
    if (validTargets.some(t => normVariants(t) === uNorm)) return true;

    // 3. Cho phép bỏ qua chữ r ở cuối nếu học viên gõ theo giọng Anh-Anh không r
    const stripR = (str) => str.replace(/r$/, "");
    if (validTargets.some(t => stripR(normVariants(t)) === stripR(uNorm))) return true;

    return false;
  }

  const IpaEncodingManager = {
    words: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    isAnswered: false,
    showHint: false,
    history: [],
    storageKey: "miss_nguyet_word_to_ipa_100_progress",
    isResumed: false,

    init() {
      const srcWords = (window.WORD_TO_IPA_WORDS_100 && window.WORD_TO_IPA_WORDS_100.length)
        ? window.WORD_TO_IPA_WORDS_100
        : ((window.WORD_TO_IPA_WORDS_50 && window.WORD_TO_IPA_WORDS_50.length) ? window.WORD_TO_IPA_WORDS_50 : []);
      this.words = [...srcWords];
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.isAnswered = false;
      this.showHint = false;
      this.history = [];
      this.isResumed = false;
    },

    saveProgress() {
      try {
        if (!this.words || !this.words.length) return;
        const data = {
          currentIndex: this.currentIndex,
          score: this.score,
          streak: this.streak,
          maxStreak: this.maxStreak,
          history: this.history,
          words: this.words,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (err) {
        console.warn("Lỗi lưu tiến độ ghép IPA:", err);
      }
    },

    loadProgress() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.currentIndex === "number" && parsed.words && parsed.words.length) {
          return parsed;
        }
      } catch (e) {
        return null;
      }
      return null;
    },

    clearProgress() {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (e) {}
    },

    resetProgress() {
      this.clearProgress();
      this.start(false, true);
    },

    pauseAndSave() {
      this.saveProgress();
      const modal = document.createElement("div");
      modal.className = "dictation-pause-overlay";
      modal.id = "ipaEncodingPauseModal";
      modal.innerHTML = `
        <div class="dictation-pause-card">
          <div class="dictation-pause-icon">💾</div>
          <h3 class="dictation-pause-title">Đã Lưu Tiến Độ Của Bạn!</h3>
          <p class="dictation-pause-desc">
            Bạn đang ở <strong>Câu ${this.currentIndex + 1} / ${this.words.length}</strong>.<br>
            Điểm hiện tại: <strong>${this.score} từ đúng</strong> (Chuỗi: ${this.streak} từ liên tiếp).<br>
            Lần tới quay lại, bạn chỉ cần bấm nút làm tiếp để hoàn thành 100 câu!
          </p>
          <div class="dictation-pause-actions">
            <button class="btn-pause-primary" onclick="IpaEncodingManager.resumeFromPause()">
              ▶️ Tiếp Tục Làm Bài Ngay
            </button>
            <button class="btn-pause-secondary" onclick="IpaEncodingManager.exitToOverview()">
              🏠 Về Màn Hình Tổng Quan
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    },

    resumeFromPause() {
      const modal = document.getElementById("ipaEncodingPauseModal");
      if (modal) modal.remove();
      this.render();
      setTimeout(() => {
        const input = document.getElementById("ipaEncodingInput");
        if (input) input.focus();
      }, 100);
    },

    exitToOverview() {
      const modal = document.getElementById("ipaEncodingPauseModal");
      if (modal) modal.remove();
      if (typeof window.navigateTo === "function") {
        window.navigateTo("overview");
      }
    },

    start(shuffle = false, forceNew = false) {
      if (!forceNew) {
        const saved = this.loadProgress();
        if (saved && saved.currentIndex > 0 && saved.currentIndex < saved.words.length) {
          this.words = saved.words;
          this.currentIndex = saved.currentIndex;
          this.score = saved.score || 0;
          this.streak = saved.streak || 0;
          this.maxStreak = saved.maxStreak || 0;
          this.history = saved.history || [];
          this.isAnswered = false;
          this.showHint = false;
          this.isResumed = true;
          this.render();
          return;
        }
      }

      const srcWords = (window.WORD_TO_IPA_WORDS_100 && window.WORD_TO_IPA_WORDS_100.length)
        ? window.WORD_TO_IPA_WORDS_100
        : ((window.WORD_TO_IPA_WORDS_50 && window.WORD_TO_IPA_WORDS_50.length) ? window.WORD_TO_IPA_WORDS_50 : []);
      this.words = [...srcWords];

      if (shuffle) {
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
      this.isResumed = false;
      this.clearProgress();
      this.render();
    },

    getCurrentWord() {
      return this.words[this.currentIndex] || null;
    },

    playAudio(slow = false) {
      const cur = this.getCurrentWord();
      if (!cur) return;
      const targetRate = slow ? 0.72 : Math.max(0.65, Math.min(1.3, state.speed * 0.88));
      AudioEngine.playWord(cur.word, targetRate);
    },

    toggleHint() {
      this.showHint = !this.showHint;
      const cur = this.getCurrentWord();
      const hintCard = document.getElementById("ipaEncodingHintCard");
      const hintBtn = document.getElementById("btnIpaEncodingHint");
      if (hintCard && cur) {
        if (this.showHint) {
          hintCard.style.display = "block";
          hintCard.innerHTML = `💡 <strong>Gợi ý ngữ âm:</strong> ${cur.hint}`;
          if (hintBtn) hintBtn.textContent = "🙈 Ẩn Gợi Ý";
        } else {
          hintCard.style.display = "none";
          if (hintBtn) hintBtn.textContent = "💡 Xem Gợi Ý";
        }
      }
    },

    insertSymbol(symbol) {
      const input = document.getElementById("ipaEncodingInput");
      if (!input || this.isAnswered) return;

      const start = input.selectionStart !== null ? input.selectionStart : input.value.length;
      const end = input.selectionEnd !== null ? input.selectionEnd : input.value.length;
      const val = input.value;

      input.value = val.substring(0, start) + symbol + val.substring(end);
      const newPos = start + symbol.length;
      input.setSelectionRange(newPos, newPos);
      input.focus();
    },

    backspace() {
      const input = document.getElementById("ipaEncodingInput");
      if (!input || this.isAnswered) return;

      const start = input.selectionStart !== null ? input.selectionStart : input.value.length;
      const end = input.selectionEnd !== null ? input.selectionEnd : input.value.length;
      const val = input.value;

      if (start !== end) {
        input.value = val.substring(0, start) + val.substring(end);
        input.setSelectionRange(start, start);
      } else if (start > 0) {
        input.value = val.substring(0, start - 1) + val.substring(start);
        input.setSelectionRange(start - 1, start - 1);
      }
      input.focus();
    },

    clearInput() {
      const input = document.getElementById("ipaEncodingInput");
      if (!input || this.isAnswered) return;
      input.value = "";
      input.focus();
    },

    renderIpaKeyboard() {
      const controlKeys = [
        { symbol: "ˈ", label: "ˈ Nhấn chính", class: "stress", title: "Dấu trọng âm chính (Primary Stress)" },
        { symbol: "ˌ", label: "ˌ Nhấn phụ", class: "stress", title: "Dấu trọng âm phụ (Secondary Stress)" },
        { symbol: "/", label: "/", class: "", title: "Dấu gạch chéo phân cách phiên âm" },
        { symbol: "ː", label: "ː Âm dài", class: "", title: "Dấu kéo dài âm" },
        { symbol: ".", label: ".", class: "", title: "Dấu tách âm tiết" },
        { symbol: " ", label: "␣ Cách", class: "action", title: "Phím cách" }
      ];

      const monophthongs = ["iː", "ɪ", "ʊ", "uː", "e", "ə", "ɜː", "ɔː", "æ", "ʌ", "ɑː", "ɒ"];
      const diphthongs = ["eɪ", "aɪ", "ɔɪ", "aʊ", "əʊ", "oʊ", "ɪə", "eə", "ʊə"];
      const consonants = [
        "p", "b", "t", "d", "k", "ɡ", "f", "v", "θ", "ð",
        "s", "z", "ʃ", "ʒ", "tʃ", "dʒ", "m", "n", "ŋ", "h", "l", "r", "w", "j"
      ];

      return `
        <div class="ipa-virtual-keyboard">
          <div class="ipa-kb-header">
            <div class="ipa-kb-title">⌨️ Bàn Phím Ký Hiệu IPA Trực Quan</div>
            <div class="ipa-kb-hint">Bấm các phím bên dưới để ghép phiên âm (có thể gõ phím máy tính)</div>
          </div>

          <!-- Nhóm 1: Dấu trọng âm & Thao tác -->
          <div class="ipa-kb-section">
            <div class="ipa-kb-section-label">⚡ Dấu Trọng Âm & Thao Tác:</div>
            <div class="ipa-kb-keys-grid">
              ${controlKeys.map(k => `
                <button type="button" class="ipa-key-btn ${k.class}" onclick="IpaEncodingManager.insertSymbol('${k.symbol}')" title="${k.title}">
                  ${k.label || k.symbol}
                </button>
              `).join("")}
              <button type="button" class="ipa-key-btn action" onclick="IpaEncodingManager.backspace()" title="Xóa 1 ký tự trước con trỏ">
                ⌫ Xóa
              </button>
              <button type="button" class="ipa-key-btn action danger" onclick="IpaEncodingManager.clearInput()" title="Xóa toàn bộ ô nhập">
                🗑️ Xóa hết
              </button>
            </div>
          </div>

          <!-- Nhóm 2: Nguyên âm đơn (Monophthongs) -->
          <div class="ipa-kb-section">
            <div class="ipa-kb-section-label">👄 Nguyên Âm Đơn (12 Âm):</div>
            <div class="ipa-kb-keys-grid">
              ${monophthongs.map(v => `
                <button type="button" class="ipa-key-btn" onclick="IpaEncodingManager.insertSymbol('${v}')" title="Nguyên âm /${v}/">
                  ${v}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Nhóm 3: Nguyên âm đôi (Diphthongs) -->
          <div class="ipa-kb-section">
            <div class="ipa-kb-section-label">✨ Nguyên Âm Đôi (8 Âm):</div>
            <div class="ipa-kb-keys-grid">
              ${diphthongs.map(d => `
                <button type="button" class="ipa-key-btn" onclick="IpaEncodingManager.insertSymbol('${d}')" title="Nguyên âm đôi /${d}/">
                  ${d}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Nhóm 4: Phụ âm (Consonants) -->
          <div class="ipa-kb-section">
            <div class="ipa-kb-section-label">🗣️ Phụ Âm (24 Âm):</div>
            <div class="ipa-kb-keys-grid">
              ${consonants.map(c => `
                <button type="button" class="ipa-key-btn" onclick="IpaEncodingManager.insertSymbol('${c}')" title="Phụ âm /${c}/">
                  ${c}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      `;
    },

    submitAnswer(event) {
      if (event) event.preventDefault();
      if (this.isAnswered) return;

      const input = document.getElementById("ipaEncodingInput");
      if (!input) return;

      const userText = input.value.trim();
      if (!userText) {
        input.focus();
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) return;

      const isCorrect = checkIpaMatch(userText, cur.ipa, cur);

      this.isAnswered = true;
      if (isCorrect) {
        AudioEngine.playSfx("correct");
        this.score++;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      } else {
        AudioEngine.playSfx("incorrect");
        this.streak = 0;
      }

      this.history.push({
        id: cur.id,
        word: cur.word,
        userIpa: userText,
        isCorrect: isCorrect,
        ipa: cur.ipa,
        ipaUK: cur.ipaUK,
        ipaUS: cur.ipaUS,
        vn: cur.vn,
        category: cur.category
      });

      this.saveProgress();
      this.renderFeedback(isCorrect, cur, userText);

      // Tự động phát âm từ chuẩn sau 450ms (sau khi hiệu ứng âm thanh vang lên)
      setTimeout(() => {
        AudioEngine.playWord(cur.word);
      }, 450);
    },

    nextWord() {
      this.currentIndex++;
      this.isAnswered = false;
      this.showHint = false;

      if (this.currentIndex >= this.words.length) {
        this.renderSummary();
      } else {
        this.saveProgress();
        this.render();
      }
    },

    renderFeedback(isCorrect, cur, userText) {
      const feedbackContainer = document.getElementById("ipaEncodingFeedbackBox");
      const nextBtn = document.getElementById("btnIpaEncodingNext");
      const submitBtn = document.getElementById("btnIpaEncodingSubmit");
      const input = document.getElementById("ipaEncodingInput");

      if (input) {
        input.disabled = true;
        input.style.borderColor = isCorrect ? "#22C55E" : "#EF4444";
      }

      if (submitBtn) {
        submitBtn.style.display = "none";
      }

      const targetDisplayIpa = cur.ipaUK && cur.ipaUS && cur.ipaUK !== cur.ipaUS
        ? `🇬🇧 UK: ${cur.ipaUK} | 🇺🇸 US: ${cur.ipaUS}`
        : cur.ipa;

      if (feedbackContainer) {
        feedbackContainer.style.display = "block";
        feedbackContainer.innerHTML = `
          <div class="dictation-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="dictation-feedback-title">
              <span>${isCorrect ? '🎉 Ghép Phiên Âm Chuẩn Xác!' : '❌ Chưa Chuẩn Ký Hiệu Rồi!'}</span>
            </div>
            <div style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">
              Từ tiếng Anh: <strong style="font-size:1.3rem; color:var(--brand-primary-dark);">${cur.word}</strong> (${cur.vn})
            </div>
            <div class="ipa-breakdown-box">
              <div class="ipa-breakdown-item">
                <span class="ipa-breakdown-val">${targetDisplayIpa}</span>
                <span class="ipa-breakdown-lbl">Phiên âm chuẩn quốc tế</span>
              </div>
            </div>
            ${!isCorrect ? `
              <div style="font-size:0.9rem; margin-top:12px; color:#991B1B; background:#FEE2E2; padding:8px 14px; border-radius:8px;">
                Bạn đã nhập: <strong style="font-family:var(--font-ipa); font-size:1.15rem;">"${userText}"</strong>
              </div>
            ` : ""}
            <div style="font-size:0.86rem; color:var(--text-muted); margin-top:10px;">
              💡 <em>${cur.hint}</em>
            </div>
          </div>
        `;
      }

      if (nextBtn) {
        nextBtn.style.display = "inline-flex";
        nextBtn.focus();
      }
    },

    render() {
      const container = document.getElementById("ipaEncodingContainer");
      if (!container) return;

      const total = this.words.length;
      if (total === 0) {
        container.innerHTML = `
          <div class="dictation-card" style="text-align:center;">
            <p>Đang tải dữ liệu bài tập phiên âm...</p>
            <button class="btn-dictation-listen" onclick="IpaEncodingManager.start(true)">Bắt Đầu Luyện Tập</button>
          </div>
        `;
        return;
      }

      const cur = this.getCurrentWord();
      if (!cur) {
        this.renderSummary();
        return;
      }

      const percent = Math.round((this.currentIndex / total) * 100);

      container.innerHTML = `
        <div class="dictation-card">
          <!-- Header Bar: Tiến độ & Điểm số & Tạm dừng -->
          <div class="dictation-header">
            <div class="dictation-category-badge">
              <span>🎯 ${cur.category || 'Luyện Ký Hiệu IPA'}</span>
              ${this.isResumed ? '<span class="resume-badge-tag">Đang làm tiếp</span>' : ''}
            </div>

            <div class="dictation-stats-row">
              <div class="dictation-stat-pill" title="Tiến độ bài học">
                <span>Câu <strong>${this.currentIndex + 1}</strong> / ${total}</span>
              </div>
              <div class="dictation-stat-pill" title="Số từ đúng">
                <span>✓ <strong>${this.score}</strong></span>
              </div>
              <div class="dictation-stat-pill streak" title="Chuỗi trả lời đúng liên tiếp">
                <span>🔥 <strong>${this.streak}</strong></span>
              </div>

              <button class="btn-resume-restart" onclick="IpaEncodingManager.resetProgress()" title="Bắt đầu lại bài tập từ câu đầu tiên">
                ↺ Làm lại
              </button>

              <button class="btn-dictation-pause" onclick="IpaEncodingManager.pauseAndSave()" title="Tạm dừng và lưu kết quả để lần sau làm tiếp">
                ⏸️ Tạm Dừng
              </button>
            </div>
          </div>

          <!-- Thanh tiến độ bài học -->
          <div class="dictation-progress-bar-bg" title="Tiến độ hoàn thành: ${percent}%">
            <div class="dictation-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>

          <!-- Thẻ hiển thị từ vựng mục tiêu (Target Word Showcase) -->
          <div class="ipa-encoding-target-card">
            <div style="font-size:0.8rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">
              TỪ TIẾNG ANH CẦN GHÉP PHIÊN ÂM
            </div>
            <div class="ipa-encoding-word">${cur.word}</div>
            <div class="ipa-encoding-meaning">${cur.vn}</div>

            <div class="ipa-encoding-actions">
              <button type="button" class="btn-dictation-subaction" onclick="IpaEncodingManager.playAudio(false)" title="Nghe phát âm chuẩn của từ này">
                <span>🔊</span> Nghe Từ
              </button>
              <button type="button" class="btn-dictation-subaction" onclick="IpaEncodingManager.playAudio(true)" title="Phát âm chậm 0.72x để phân tích từng âm tiết">
                <span>🐢</span> Nghe Chậm
              </button>
              <button type="button" class="btn-dictation-subaction" id="btnIpaEncodingHint" onclick="IpaEncodingManager.toggleHint()">
                <span>💡</span> Xem Gợi Ý
              </button>
            </div>

            <div id="ipaEncodingHintCard" class="dictation-hint-box" style="display:none; margin-top:12px;"></div>
          </div>

          <!-- Form nhập phiên âm -->
          <form class="dictation-input-form" onsubmit="IpaEncodingManager.submitAnswer(event)">
            <div class="ipa-encoding-input-wrapper">
              <input
                type="text"
                class="ipa-encoding-input"
                id="ipaEncodingInput"
                placeholder="Ghép phiên âm, VD: /ˈkɒfi/ hoặc ˈkɒfi"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              />
            </div>

            <!-- Bàn phím ký hiệu IPA trực quan -->
            ${this.renderIpaKeyboard()}

            <div class="dictation-submit-row">
              <button type="submit" class="btn-dictation-submit" id="btnIpaEncodingSubmit">
                <span>Kiểm Tra Đáp Án</span> ↵
              </button>
            </div>
          </form>

          <!-- Feedback khi trả lời xong -->
          <div id="ipaEncodingFeedbackBox" style="display:none;"></div>

          <!-- Nút chuyển sang từ kế tiếp -->
          <div style="text-align:center; margin-top:20px;">
            <button class="btn-dictation-next" id="btnIpaEncodingNext" onclick="IpaEncodingManager.nextWord()" style="display:none;">
              <span>Câu Kế Tiếp</span> →
            </button>
          </div>
        </div>
      `;

      // Tự động focus ô nhập & lắng nghe gõ phím nhanh
      setTimeout(() => {
        const input = document.getElementById("ipaEncodingInput");
        if (input) {
          input.focus();
          // Tự động chuyển ký tự nháy đơn ' thành dấu trọng âm ˈ
          input.addEventListener("input", () => {
            const pos = input.selectionStart;
            let val = input.value;
            let replaced = false;
            if (val.includes("'") || val.includes("’")) {
              val = val.replace(/['’]/g, "ˈ");
              replaced = true;
            }
            if (val.includes(":")) {
              val = val.replace(/:/g, "ː");
              replaced = true;
            }
            if (val.includes(",")) {
              val = val.replace(/,/g, "ˌ");
              replaced = true;
            }
            if (replaced) {
              input.value = val;
              input.setSelectionRange(pos, pos);
            }
          });
        }
      }, 50);
    },

    renderSummary() {
      this.clearProgress();

      const container = document.getElementById("ipaEncodingContainer");
      if (!container) return;

      AudioEngine.playSfx("complete");

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
        evalText = "Bậc thầy ngữ âm! Khả năng phiên âm từ vựng đạt độ chính xác gần như tuyệt đối!";
      } else if (percent >= 75) {
        trophyEmoji = "🎉";
        evalText = "Rất xuất sắc! Nắm vững hệ thống 44 ký hiệu IPA và quy tắc đánh trọng âm!";
      } else if (percent >= 50) {
        trophyEmoji = "💪";
        evalText = "Khá tốt! Hãy ôn lại các từ chưa đúng để nhớ sâu hơn mặt chữ và phiên âm!";
      }

      const rowsHtml = this.history.map((h, i) => `
        <tr>
          <td style="font-weight:700; color:var(--text-muted); width:40px;">#${i + 1}</td>
          <td>
            <strong>${h.word}</strong>
            <div style="font-family:'Charis SIL',serif; font-size:0.95rem; font-weight:700; color:var(--brand-primary-dark);">${h.ipaUK && h.ipaUS && h.ipaUK !== h.ipaUS ? `🇺🇸 ${h.ipaUS} | 🇬🇧 ${h.ipaUK}` : h.ipa}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${h.vn}</div>
          </td>
          <td>
            <span style="font-family:'Charis SIL',serif; font-size:1.05rem; font-weight:700; color:${h.isCorrect ? '#16A34A' : '#DC2626'}">
              ${h.userIpa || "—"}
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
          <h2 class="dictation-summary-title">Hoàn Thành Thử Thách 100 Từ Ghép IPA!</h2>
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
            <h3 class="dictation-review-title">📋 Bảng Chi Tiết Kết Quả 100 Từ:</h3>
            <div class="dictation-review-table-wrapper">
              <table class="dictation-review-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Từ vựng &amp; Phiên âm chuẩn</th>
                    <th>Bạn đã ghép</th>
                    <th>Kết quả</th>
                    <th style="text-align:right;">Phát âm</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <div class="dictation-summary-actions">
            <button class="btn-dictation-restart" onclick="IpaEncodingManager.start(false, true)">
              <span>Làm Lại Từ Đầu</span>
            </button>
            <button class="btn-dictation-restart" onclick="IpaEncodingManager.start(true, true)" style="background:var(--brand-primary-dark);">
              <span>🔀 Xáo Trộn Thứ Tự 100 Từ</span>
            </button>
          </div>
        </div>
      `;
    }
  };

  window.IpaEncodingManager = IpaEncodingManager;

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

      // Cập nhật ngay phiên âm hiển thị trên màn hình nếu đang mở bài tập Nhận Diện IPA
      if (typeof IpaDecodingManager !== "undefined" && !IpaDecodingManager.isAnswered && IpaDecodingManager.words && IpaDecodingManager.words.length) {
        const cur = IpaDecodingManager.getCurrentWord();
        const scText = document.querySelector(".ipa-showcase-text");
        if (scText && cur) {
          scText.textContent = getWordDisplayIpa(cur);
        }
      }
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

  // Điều khiển âm hiệu Đúng/Sai sống động
  window.__toggleSfx = function() {
    state.sfxEnabled = !state.sfxEnabled;
    localStorage.setItem("miss_nguyet_sfx", state.sfxEnabled ? "true" : "false");
    updateSfxUi();
    if (state.sfxEnabled) {
      AudioEngine.playSfx("correct");
    }
  };

  function updateSfxUi() {
    const btn = document.getElementById("sfxToggleBtn");
    const icon = document.getElementById("sfxIcon");
    const text = document.getElementById("sfxText");
    if (!btn) return;
    if (state.sfxEnabled) {
      btn.classList.remove("muted");
      if (icon) icon.textContent = "🔔";
      if (text) text.textContent = "Hiệu ứng: Bật";
      btn.title = "Âm hiệu Đúng/Sai đang BẬT. Bấm để tắt.";
    } else {
      btn.classList.add("muted");
      if (icon) icon.textContent = "🔕";
      if (text) text.textContent = "Hiệu ứng: Tắt";
      btn.title = "Âm hiệu Đúng/Sai đang TẮT. Bấm để bật.";
    }
  }

  updateSfxUi();

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

  // ==========================================================================
  // INTONATION MANAGER: CHUYÊN ĐỀ NGỮ ĐIỆU TOÀN DIỆN (WELLS, ROACH, CRYSTAL)
  // ==========================================================================
  const IntonationManager = {
    currentTab: "tones",
    currentRuleFilter: "all",
    selectedAttitudeWord: "Really",
    selectedNucleusIndex: 0,
    selectedPracticeId: "practice_1",
    practiceMode: "marked", // "clean" or "marked"
    examTimerInterval: null,
    examTimerSecondsLeft: 45,
    examTimerTotal: 45,
    examTimerType: null, // "prep" or "speak"
    quizIndex: 0,
    quizScore: 0,
    quizStreak: 0,
    quizAnswered: false,

    filterRules(groupKey, btnEl) {
      this.currentRuleFilter = groupKey;
      const container = document.getElementById("intonationContentContainer");
      if (!container) return;

      const buttons = container.querySelectorAll(".rule-filter-btn");
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-filter") === groupKey);
      });

      const sections = container.querySelectorAll(".rule-group-section");
      sections.forEach(sec => {
        const secGroup = sec.getAttribute("data-group");
        if (groupKey === "all" || secGroup === groupKey) {
          sec.style.display = "block";
        } else {
          sec.style.display = "none";
        }
      });
    },

    init() {
      const tabsNav = document.getElementById("intonationTabsNav");
      if (tabsNav) {
        tabsNav.querySelectorAll(".intonation-tab-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;
            this.switchTab(tab);
          });
        });
      }
    },

    start() {
      this.switchTab(this.currentTab || "tones");
    },

    switchTab(tabName) {
      this.currentTab = tabName;
      const tabsNav = document.getElementById("intonationTabsNav");
      if (tabsNav) {
        tabsNav.querySelectorAll(".intonation-tab-btn").forEach(btn => {
          btn.classList.toggle("active", btn.dataset.tab === tabName);
        });
      }
      this.render();
    },

    render() {
      const container = document.getElementById("intonationContentContainer");
      if (!container) return;

      if (!window.INTONATION_DATA) {
        container.innerHTML = `<div style="padding:40px; text-align:center; color:#64748B;">Đang tải dữ liệu ngữ điệu...</div>`;
        return;
      }

      if (this.currentTab === "tones") {
        this.renderTonesTab(container);
      } else if (this.currentTab === "rules") {
        this.renderRulesTab(container);
      } else if (this.currentTab === "stress") {
        this.renderStressTab(container);
      } else if (this.currentTab === "pausing") {
        this.renderPausingTab(container);
      } else if (this.currentTab === "linking") {
        this.renderLinkingTab(container);
      } else if (this.currentTab === "practice") {
        this.renderPracticeTab(container);
      } else if (this.currentTab === "attitudes") {
        this.renderAttitudesTab(container);
      } else if (this.currentTab === "functions") {
        this.renderFunctionsTab(container);
      } else if (this.currentTab === "quiz") {
        this.renderQuizTab(container);
      } else {
        this.renderTonesTab(container);
      }
    },

    // ------------------------------------------------------------------------
    // TAB 1: 5 LOẠI ĐIỆU CỐT LÕI (5 CORE TONES) & TONE UNIT
    // ------------------------------------------------------------------------
    renderTonesTab(container) {
      const tones = window.INTONATION_DATA.tones;
      const intro = window.INTONATION_DATA.natureIntro;

      let html = "";

      // 1. BÀI GIẢNG DẪN NHẬP & BẢN CHẤT NGỮ ĐIỆU (Dành cho Giáo viên mở đầu bài học)
      if (intro) {
        html += `
          <div class="tones-intro-box" style="margin-bottom:28px;">
            <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
              <span style="font-size:2rem; line-height:1;">🎓</span>
              <div>
                <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; color:var(--text-main); margin-bottom:4px;">
                  ${intro.title}
                </h2>
                <div style="font-size:0.86rem; color:#6D28D9; font-weight:600;">
                  ${intro.subtitle}
                </div>
              </div>
            </div>

            <!-- Nghịch lý cốt lõi -->
            <div class="teacher-tip-box" style="margin:14px 0 18px;">
              <div class="teacher-tip-icon">💡</div>
              <div>
                <div class="teacher-tip-title">Nghịch Lý Cốt Lõi Khi Người Việt Học Tiếng Anh</div>
                <div class="teacher-tip-body">${intro.coreParadox}</div>
              </div>
            </div>

            <!-- Bảng So Sánh Bản Chất: Tiếng Việt vs Tiếng Anh -->
            <h4 style="font-family:var(--font-heading); font-size:0.98rem; font-weight:800; color:#1E293B; margin:16px 0 10px; display:flex; align-items:center; gap:6px;">
              <span>⚖️</span> So Sánh Ngôn Ngữ Học: Tone Language vs Intonation Language
            </h4>
            <div class="pedagogy-table-wrap">
              <table class="pedagogy-table">
                <thead>
                  <tr>
                    <th style="width:20%;">Đặc Điểm</th>
                    <th style="width:32%;">Tiếng Việt (Tone Language)</th>
                    <th style="width:32%;">Tiếng Anh (Intonation Language)</th>
                    <th style="width:16%;">Bản Chất</th>
                  </tr>
                </thead>
                <tbody>
        `;

        intro.linguisticComparison.forEach(row => {
          html += `
            <tr>
              <td style="font-weight:700; color:#0F172A;">${row.aspect}</td>
              <td style="color:#B45309; background:#FFFBEB;">${row.vn}</td>
              <td style="color:#0369A1; background:#F0F9FF; font-weight:600;">${row.en}</td>
              <td style="font-size:0.8rem; color:#64748B;">${row.note}</td>
            </tr>
          `;
        });

        html += `
                </tbody>
              </table>
            </div>

            <!-- Cấu Trúc Tone Unit -->
            <div style="margin-top:20px; padding-top:16px; border-top:1px dashed #CBD5E1;">
              <div class="tones-intro-title">
                <span>📐</span> ${intro.toneUnitLecture ? intro.toneUnitLecture.headline : "Cấu Trúc Đơn Vị Ngữ Điệu (Tone Unit)"}
              </div>
              <p style="font-size:0.88rem; color:#475569; line-height:1.55; margin-bottom:12px;">
                ${intro.toneUnitLecture ? intro.toneUnitLecture.explanation : "Trong tiếng Anh, lời nói được phân tách thành các Đơn vị ngữ điệu (Tone Units). Mỗi đơn vị ngữ điệu hoàn chỉnh có 4 thành phần:"}
              </p>

              <div class="tone-unit-diagram">
        `;

        const components = (intro.toneUnitLecture && intro.toneUnitLecture.components) || [
          { name: "1. Pre-Head", role: "Âm Trước Đầu", example: "in a...", tip: "Đọc lướt nhanh, không nhấn." },
          { name: "2. Head", role: "Âm Đầu", example: "...LIT-tle...", tip: "Giữ cao độ ổn định." },
          { name: "3. NUCLEUS ★", role: "Hạt Nhân Ngữ Điệu", example: "...BOIL-...", tip: "Cao độ trượt mạnh nhất!" },
          { name: "4. Tail", role: "Phần Đuôi", example: "...ing pot.", tip: "Tiếp tục xu hướng cao độ." }
        ];

        components.forEach((comp, cIdx) => {
          const isNucleus = cIdx === 2 || comp.name.includes("NUCLEUS");
          html += `
            <div class="tone-unit-part ${isNucleus ? "nucleus-part" : ""}">
              <div class="tone-unit-badge">${isNucleus ? "★ BẮT BUỘC CÓ" : comp.name.split(" ")[0]}</div>
              <div class="tone-unit-title" ${isNucleus ? 'style="color:#7C3AED;"' : ""}>${comp.name}</div>
              <div class="tone-unit-desc">
                ${comp.role}<br/>
                <strong style="color:${isNucleus ? '#7C3AED' : '#0F172A'};">Ví dụ: <em>${comp.example}</em></strong>
                <div style="font-size:0.75rem; color:#64748B; margin-top:4px;">💡 ${comp.tip}</div>
              </div>
            </div>
          `;
        });

        html += `
              </div>
            </div>

            <!-- Cơ chế cơ thể học (Vocal Mechanism) -->
            ${intro.vocalMechanism ? `
              <div class="context-box" style="margin-top:18px;">
                <div class="context-icon">🫁</div>
                <div>
                  <div class="context-title">${intro.vocalMechanism.headline}</div>
                  <div class="context-body">
                    <ul style="margin:4px 0 0 16px; padding:0; display:flex; flex-direction:column; gap:4px;">
                      ${intro.vocalMechanism.steps.map(s => `<li>${s}</li>`).join("")}
                    </ul>
                  </div>
                </div>
              </div>
            ` : ""}
          </div>
        `;
      }

      // 2. 5 CHUYỂN ĐỘNG CAO ĐỘ CỐT LÕI (BENTO GRID)
      html += `
        <h3 style="font-family:var(--font-heading); font-size:1.18rem; font-weight:800; color:var(--text-main); margin-bottom:16px; display:flex; align-items:center; gap:8px;">
          <span>📉</span> 5 Chuyển Động Cao Độ Cốt Lõi (The 5 Primary Tones)
        </h3>
        <div class="tones-bento-grid">
      `;

      tones.forEach((tone, tIdx) => {
        let pathD = "";
        if (tone.acousticCurve && tone.acousticCurve.length) {
          pathD = tone.acousticCurve.map((pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(" ");
        }

        html += `
          <div class="tone-card-interactive tag-${tone.tagColor}">
            <div class="tone-card-head">
              <div style="display:flex; align-items:center; gap:16px;">
                <div class="tone-card-symbol-badge" title="Ký hiệu: ${tone.symbol}">
                  ${tone.symbol}
                </div>
                <div class="tone-card-title-col" style="margin-left:0;">
                  <div class="tone-card-name">${tIdx + 1}. ${tone.name} <span class="rule-pattern-pill" style="font-size:0.85rem; margin-left:6px;">${tone.symbol}</span></div>
                  <div class="tone-card-meaning-pill">${tone.meaning}</div>
                </div>
              </div>
              <div style="background:#F1F5F9; border:1px solid #E2E8F0; padding:6px 14px; border-radius:20px; font-size:0.8rem; font-weight:700; color:#475569;">
                ${tone.id === 'fall' ? 'Chiếm ~60% Giao Tiếp' : tone.id === 'rise' ? 'Chiếm ~25% Giao Tiếp' : 'Sắc Thái Nâng Cao'}
              </div>
            </div>

            <!-- Visual Pitch Box: Đường Cong Cao Độ To Rõ + Nút Nghe Thử Sóng -->
            <div class="tone-pitch-box">
              <div style="display:flex; align-items:center; gap:18px; flex:1; min-width:280px;">
                <div class="tone-svg-wrapper">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad_${tone.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#0284C7" />
                        <stop offset="100%" stop-color="#7C3AED" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#E2E8F0" stroke-dasharray="2,2" stroke-width="1"/>
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E8F0" stroke-dasharray="2,2" stroke-width="1"/>
                    <line x1="0" y1="80" x2="100" y2="80" stroke="#E2E8F0" stroke-dasharray="2,2" stroke-width="1"/>
                    <path d="${pathD}" fill="none" stroke="url(#grad_${tone.id})" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style="font-family:var(--font-heading); font-size:0.95rem; font-weight:800; color:#1E293B;">
                    Đường Cong Cao Độ Âm Học (${tone.symbol})
                  </div>
                  <div style="font-size:0.84rem; color:#64748B; margin-top:3px; line-height:1.4;">
                    ${tone.shortDesc || tone.meaning}
                  </div>
                  ${tone.acousticDetails ? `
                    <div style="font-size:0.78rem; color:#0369A1; font-weight:600; margin-top:4px;">
                      📊 Thông số vật lý ($F_0$): ${tone.acousticDetails}
                    </div>
                  ` : ""}
                </div>
              </div>
              <button class="btn-play-tone-pitch" onclick="AudioEngine.playPitchContour('${tone.id}', this)" title="Nghe mô phỏng sóng cao độ âm học">
                <span>🔊</span> Nghe Sóng Điệu (${tone.symbol})
              </button>
            </div>

            <p class="tone-card-desc">${tone.detailedExplanation}</p>

            <!-- Khi nào áp dụng? Grid trực quan -->
            ${tone.usageGuide && tone.usageGuide.length ? `
              <div style="margin:14px 0 16px;">
                <div style="font-family:var(--font-heading); font-size:0.88rem; font-weight:800; color:#1E293B; text-transform:uppercase; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                  <span>📌</span> Trường Hợp Sử Dụng Chính:
                </div>
                <div class="tone-usage-grid">
                  ${tone.usageGuide.map(u => `
                    <div class="tone-usage-item">
                      <span style="color:#10B981; font-weight:800; flex-shrink:0;">✓</span>
                      <span>${u}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Bẫy Ngữ Âm Học Viên Việt Thường Mắc -->
            ${tone.vietnamesePitfalls ? `
              <div class="pitfall-box">
                <div class="pitfall-icon">⚠️</div>
                <div>
                  <div class="pitfall-title">Bẫy Ngữ Âm Thường Gặp</div>
                  <div class="pitfall-body">${tone.vietnamesePitfalls}</div>
                </div>
              </div>
            ` : ""}

            <!-- Đoạn Hội Thoại Thực Tế Minh Họa -->
            ${tone.realLifeDialogue ? `
              <div class="dialogue-card">
                <div class="dialogue-card-head">
                  <div class="dialogue-card-label">
                    <span>💬</span> ${tone.realLifeDialogue.title}
                  </div>
                  <div style="font-size:0.75rem; color:#64748B;">${tone.realLifeDialogue.context}</div>
                </div>
                <div class="dialogue-lines">
                  ${tone.realLifeDialogue.lines.map((l, lIdx) => `
                    <div class="dialogue-line">
                      <span class="speaker-badge ${lIdx % 2 === 0 ? "speaker-a" : "speaker-b"}">${l.speaker}</span>
                      <div class="dialogue-text-wrap">
                        <div class="dialogue-en">${l.en}</div>
                        <div class="dialogue-vn">${l.vn}</div>
                      </div>
                      <button class="btn-dialogue-play" onclick="IntonationManager.playToneDialogue('${tone.id}', ${lIdx}, this)" title="Nghe câu này">
                        <span>🔊</span> Nghe
                      </button>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- 3 Câu Ví Dụ Tương Tác Cơ Bản -->
            <div style="font-family:var(--font-heading); font-size:0.88rem; font-weight:800; color:#334155; text-transform:uppercase; margin:16px 0 8px; display:flex; align-items:center; gap:6px;">
              <span>🎧</span> 3 Câu Ví Dụ Mẫu Phát Âm Chuẩn:
            </div>
            <div class="tone-card-examples-list">
        `;

        tone.examples.forEach((ex, exIdx) => {
          html += `
            <div class="tone-example-item">
              <div class="tone-ex-text-col">
                <div class="tone-ex-en">${ex.en}</div>
                <div class="tone-ex-vn">${ex.vn}</div>
                <div class="tone-ex-ipa">${ex.ipa}</div>
              </div>
              <button class="btn-tone-audio" onclick="IntonationManager.playToneExample('${tone.id}', ${exIdx}, this)" title="Nghe phát âm chuẩn với điệu ${tone.symbol}">
                🔊
              </button>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    },

    // ------------------------------------------------------------------------
    // TAB 2: QUY TẮC LÊN & XUỐNG GIỌNG (2 NHÓM: XUỐNG GIỌNG & LÊN GIỌNG)
    // ------------------------------------------------------------------------
    renderRulesTab(container) {
      const rules = window.INTONATION_DATA.rules;
      const filter = this.currentRuleFilter || "all";

      const GROUPS = [
        {
          key: "falling",
          icon: "📉",
          title: "1. Nhóm Xuống Giọng (Falling Tone ↘)",
          badge: "6 Quy Tắc (Quy Tắc 1 – 6)",
          desc: "Bản chất: Hạ sâu cao độ ở âm tiết mang trọng âm cuối cùng để báo hiệu sự dứt khoát, chắc chắn, thông tin đã hoàn tất trọn vẹn hoặc mệnh lệnh.",
          classSuffix: "group-falling"
        },
        {
          key: "rising",
          icon: "📈",
          title: "2. Nhóm Lên Giọng (Rising Tone ↗)",
          badge: "6 Quy Tắc (Quy Tắc 7 – 12)",
          desc: "Bản chất: Vút cao giọng ở âm tiết cuối cùng để thể hiện sự tò mò, cần người nghe xác nhận đúng/sai, lời nhờ vả lịch thiệp hoặc báo hiệu thông tin còn tiếp diễn.",
          classSuffix: "group-rising"
        }
      ];

      let html = `
        <div style="margin-bottom:20px;">
          <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:800; background:#EFF6FF; color:#1E40AF; padding:4px 12px; border-radius:999px; text-transform:uppercase; margin-bottom:8px; border:1px solid #BFDBFE;">
            <span>📖</span> Hệ Thống Ngữ Điệu Thực Chiến (Speaking Mastery)
          </div>
          <h3 style="font-family:var(--font-heading); font-size:1.3rem; font-weight:800; color:var(--text-main); margin-bottom:6px; display:flex; align-items:center; gap:8px;">
            <span>🎯</span> 12 Quy Tắc Lên &amp; Xuống Giọng Theo Kiểu Câu
          </h3>
          <p style="font-size:0.88rem; color:#475569; line-height:1.6;">
            Hệ thống 12 quy tắc ngữ điệu thực chiến chuẩn quốc tế (Cambridge, Oxford) và luyện thi TOEIC Speaking (Collins) được chia rành mạch thành <strong>2 nhóm định hướng ngữ điệu trực quan</strong>: <em>Nhóm Xuống Giọng (Falling ↘)</em> và <em>Nhóm Lên Giọng (Rising ↗)</em>. Giúp học viên nắm chắc bản chất, không bị rối và ứng dụng chuẩn xác vào giao tiếp cũng như phòng thi.
          </p>
        </div>

        <!-- Bộ Lọc Phân Nhóm Ngữ Điệu -->
        <div class="rule-filter-bar">
          <button class="rule-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all" onclick="IntonationManager.filterRules('all', this)">
            <span>🌟</span> Tất Cả (12 Quy Tắc)
          </button>
          <button class="rule-filter-btn ${filter === 'falling' ? 'active' : ''}" data-filter="falling" onclick="IntonationManager.filterRules('falling', this)">
            <span>📉</span> 1. Nhóm Xuống Giọng (6)
          </button>
          <button class="rule-filter-btn ${filter === 'rising' ? 'active' : ''}" data-filter="rising" onclick="IntonationManager.filterRules('rising', this)">
            <span>📈</span> 2. Nhóm Lên Giọng (6)
          </button>
        </div>
      `;

      GROUPS.forEach(g => {
        const groupRules = rules.filter(r => r.group === g.key);
        const isVisible = (filter === "all" || filter === g.key);

        html += `
          <div class="rule-group-section" data-group="${g.key}" style="display: ${isVisible ? 'block' : 'none'};">
            <div class="rule-group-header ${g.classSuffix}">
              <div style="display:flex; align-items:center; justify-content:space-between; width:100%; flex-wrap:wrap; gap:8px;">
                <div class="rule-group-title">
                  <span>${g.icon}</span> ${g.title}
                </div>
                <span class="rule-group-badge">${g.badge}</span>
              </div>
              <div class="rule-group-desc">${g.desc}</div>
            </div>

            <div class="rules-accordion-list">
              ${groupRules.map(r => this.renderSingleRuleCard(r, g.key)).join("")}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    },

    renderSingleRuleCard(r, groupKey) {
      let numBg = "#EFF6FF", numColor = "#1E40AF";
      let pillBg = "#EFF6FF", pillColor = "#1E40AF", pillBorder = "#BFDBFE";

      if (groupKey === "rising") {
        numBg = "#FAF5FF"; numColor = "#7C3AED";
        pillBg = "#FAF5FF"; pillColor = "#7E22CE"; pillBorder = "#E9D5FF";
      }

      return `
        <div class="rule-accordion-card" id="card-${r.id}">
          <div class="rule-card-header">
            <div class="rule-num-circle" style="background:${numBg}; color:${numColor};">${r.num}</div>
            <div class="rule-title-group">
              <div class="rule-title-text">
                ${r.title}
                <span class="rule-pattern-pill" style="background:${pillBg}; color:${pillColor}; border:1px solid ${pillBorder};">${r.tonePattern}</span>
              </div>
              <div class="rule-summary-text">${r.ruleSummary}</div>
            </div>
          </div>

          <!-- Sơ Đồ Cao Độ Trực Quan & Công Thức -->
          <div class="rule-diagram-box">
            <div style="font-family:monospace; font-weight:700; font-size:0.95rem;">${r.diagram}</div>
            ${r.formula ? `<div style="font-size:0.82rem; color:#6D28D9; margin-top:4px; font-weight:600;">📐 Công thức: ${r.formula}</div>` : ""}
          </div>

          <!-- Băng Gốc Collins TOEIC Nếu Có -->
          ${r.collinsTrack ? `
            <div class="collins-track-card" style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #F0FDF4, #DCFCE7); border:1px solid #86EFAC; border-radius:10px; padding:12px 16px; margin:14px 0; box-shadow:0 2px 4px rgba(22,163,74,0.06);">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:1.5rem;">🎙️</span>
                <div>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#166534;">Băng Gốc Collins TOEIC: ${r.collinsTrackTitle || "Native Audio Track"}</div>
                  <div style="font-size:0.75rem; color:#15803D; margin-top:2px;">Bản thu giọng người bản xứ từ NXB Collins Education (Speaking Questions 1–2)</div>
                </div>
              </div>
              <button class="btn-dialogue-play" style="background:#16A34A; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(22,163,74,0.3);" onclick="AudioEngine.playIntonationAudio('${r.collinsTrack}', null, 1.0, 1.0, this)" title="Nghe băng thu âm gốc từ sách Collins">
                <span>▶️</span> Nghe Băng Gốc
              </button>
            </div>
          ` : ""}

          <!-- Cơ Sở Ngôn Ngữ Học (Deep Rationale) -->
          ${r.deepRationale ? `
            <div class="context-box">
              <div class="context-icon">🔬</div>
              <div>
                <div class="context-title">Cơ Sở Ngôn Ngữ Học (Deep Rationale)</div>
                <div class="context-body">${r.deepRationale}</div>
              </div>
            </div>
          ` : ""}

          <!-- Bẫy Ngữ Âm Học Viên Việt Thường Mắc -->
          ${r.vietnamesePitfalls ? `
            <div class="pitfall-box">
              <div class="pitfall-icon">⚠️</div>
              <div>
                <div class="pitfall-title">Bẫy Ngữ Âm Thường Gặp</div>
                <div class="pitfall-body">${r.vietnamesePitfalls}</div>
              </div>
            </div>
          ` : ""}

          <!-- Ghi Chú Sư Phạm Thêm Nếu Có -->
          ${r.note && !r.deepRationale ? `
            <div class="rule-note-box">
              💡 <strong>Lưu ý:</strong> ${r.note.replace(/\n/g, "<br/>")}
            </div>
          ` : ""}

          <!-- Đoạn Hội Thoại Thực Tế Minh Họa -->
          ${r.contextualDialogue ? `
            <div class="dialogue-card">
              <div class="dialogue-card-head">
                <div class="dialogue-card-label">
                  <span>💬</span> ${r.contextualDialogue.title}
                </div>
                <div style="font-size:0.75rem; color:#64748B;">${r.contextualDialogue.context}</div>
              </div>
              <div class="dialogue-lines">
                ${r.contextualDialogue.lines.map((l, lIdx) => `
                  <div class="dialogue-line">
                    <span class="speaker-badge ${lIdx % 2 === 0 ? "speaker-a" : "speaker-b"}">${l.speaker}</span>
                    <div class="dialogue-text-wrap">
                      <div class="dialogue-en">${l.en}</div>
                      <div class="dialogue-vn">${l.vn}</div>
                    </div>
                    <button class="btn-dialogue-play" onclick="IntonationManager.playRuleDialogue('${r.id}', ${lIdx}, this)" title="Nghe câu này">
                      <span>🔊</span> Nghe
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Các Ví Dụ Có Audio Phát Chuẩn -->
          <div style="font-family:var(--font-heading); font-size:0.8rem; font-weight:800; color:#334155; text-transform:uppercase; margin:12px 0 6px;">
            🎧 Ví Dụ Mẫu Câu Chuẩn Bản Xứ:
          </div>
          <div class="rule-examples-box">
            ${r.examples.map((ex, exIdx) => `
              <div class="rule-example-row">
                <div>
                  <div style="font-family:var(--font-heading); font-size:0.92rem; font-weight:700; color:#1E293B;">
                    ${ex.marked}
                  </div>
                  <div style="font-size:0.78rem; color:#64748B; margin-top:2px;">
                    ${ex.vn} • <span style="font-family:var(--font-ipa); color:#7C3AED;">${ex.ipa}</span>
                  </div>
                </div>
                <button class="btn-tone-audio" onclick="IntonationManager.playRuleExample('${r.id}', ${exIdx}, this)" title="Nghe phát âm chuẩn câu này">
                  🔊
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // TAB 3: TRỌNG ÂM CÂU & NHỊP ĐIỆU ĐẲNG THỜI (SENTENCE STRESS & RHYTHM)
    // ------------------------------------------------------------------------
    renderStressTab(container) {
      const data = window.INTONATION_DATA.sentenceStress;
      if (!data) return;

      const p1 = data.contentVsFunction;
      const p2 = data.adverbsEmphasis;
      const p3 = data.contrastiveNumbers;
      const p4 = data.nounVerbShift;

      let html = `
        <div style="margin-bottom:24px;">
          <div style="display:inline-block; font-size:0.75rem; font-weight:800; background:#FEF3C7; color:#B45309; padding:4px 10px; border-radius:999px; text-transform:uppercase; margin-bottom:8px;">
            ⚡ TOEIC Speaking Questions 1–2 Mastery
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            ${data.title}
          </h2>
          <div style="font-size:0.88rem; color:#6D28D9; font-weight:600; margin-bottom:12px;">
            ${data.subtitle}
          </div>
          <p style="font-size:0.88rem; color:#475569; line-height:1.6; background:#F8FAFC; border:1px solid #E2E8F0; padding:14px 16px; border-radius:10px;">
            ${data.overview}
          </p>
        </div>

        <div style="display:flex; flex-direction:column; gap:24px;">

          <!-- SECTION 1: CONTENT VS FUNCTION WORDS -->
          <div class="rule-accordion-card">
            <div class="rule-card-header">
              <div class="rule-num-circle" style="background:#059669;">1</div>
              <div class="rule-title-group">
                <div class="rule-title-text" style="color:#065F46;">
                  ${p1.headline}
                </div>
                <div class="rule-summary-text">${p1.explanation}</div>
              </div>
            </div>

            <!-- Collins Track Badge -->
            ${p1.collinsTrack ? `
              <div class="collins-track-card" style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #F0FDF4, #DCFCE7); border:1px solid #86EFAC; border-radius:10px; padding:12px 16px; margin:14px 0; box-shadow:0 2px 4px rgba(22,163,74,0.06);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:1.5rem;">🎙️</span>
                  <div>
                    <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#166534;">Băng Gốc Collins TOEIC: ${p1.collinsTrackTitle}</div>
                    <div style="font-size:0.75rem; color:#15803D; margin-top:2px;">Lắng nghe người bản xứ đọc mẫu quy tắc Content vs. Function Words</div>
                  </div>
                </div>
                <button class="btn-dialogue-play" style="background:#16A34A; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(22,163,74,0.3);" onclick="AudioEngine.playIntonationAudio('${p1.collinsTrack}', null, 1.0, 1.0, this)">
                  <span>▶️</span> Nghe Băng Gốc
                </button>
              </div>
            ` : ""}

            <!-- Bảng So Sánh 2 Nhóm Từ -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:14px 0;">
              ${p1.categories.map(cat => `
                <div style="background:${cat.badgeColor === 'green' ? '#F0FDF4' : '#F8FAFC'}; border:1px solid ${cat.badgeColor === 'green' ? '#86EFAC' : '#CBD5E1'}; border-radius:10px; padding:14px;">
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.92rem; color:${cat.badgeColor === 'green' ? '#166534' : '#334155'}; margin-bottom:4px;">
                    ${cat.type}
                  </div>
                  <div style="font-size:0.78rem; color:#64748B; margin-bottom:10px;">${cat.desc}</div>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    ${cat.groups.map(g => `
                      <div style="font-size:0.82rem; background:#fff; padding:6px 10px; border-radius:6px; border:1px solid #E2E8F0;">
                        <span style="font-weight:700; color:#1E293B;">${g.pos}:</span>
                        <span style="color:#6B21A8; font-family:var(--font-heading); font-size:0.8rem;"> ${g.examples}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Ví Dụ Có Audio -->
            <div style="font-family:var(--font-heading); font-size:0.8rem; font-weight:800; color:#334155; text-transform:uppercase; margin:14px 0 8px;">
              🎧 Ví Dụ Trọng Âm Câu Điển Hình:
            </div>
            <div class="rule-examples-box">
              ${p1.examples.map(ex => `
                <div class="rule-example-row">
                  <div>
                    <div style="font-family:var(--font-heading); font-size:0.95rem; font-weight:700; color:#1E293B;">
                      ${ex.marked}
                    </div>
                    <div style="font-size:0.78rem; color:#475569; margin-top:3px; line-height:1.4;">
                      💡 ${ex.analysis}
                    </div>
                  </div>
                  <button class="btn-tone-audio" onclick="AudioEngine.playIntonationAudio('${ex.audioUrl}', '${ex.speechText}', 1.0, 0.90, this)" title="Nghe câu này">
                    🔊
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- SECTION 2: ADVERBS FOR EMPHASIS -->
          <div class="rule-accordion-card">
            <div class="rule-card-header">
              <div class="rule-num-circle" style="background:#7C3AED;">2</div>
              <div class="rule-title-group">
                <div class="rule-title-text" style="color:#5B21B6;">
                  ${p2.headline}
                </div>
                <div class="rule-summary-text">${p2.explanation}</div>
              </div>
            </div>

            ${p2.collinsTrack ? `
              <div class="collins-track-card" style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #F5F3FF, #EDE9FE); border:1px solid #C4B5FD; border-radius:10px; padding:12px 16px; margin:14px 0; box-shadow:0 2px 4px rgba(124,58,237,0.06);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:1.5rem;">🎙️</span>
                  <div>
                    <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#5B21B6;">Băng Gốc Collins TOEIC: ${p2.collinsTrackTitle}</div>
                    <div style="font-size:0.75rem; color:#6D28D9; margin-top:2px;">Trọng âm nhấn mạnh vào trạng từ chỉ mức độ (Adverbs for Emphasis)</div>
                  </div>
                </div>
                <button class="btn-dialogue-play" style="background:#7C3AED; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(124,58,237,0.3);" onclick="AudioEngine.playIntonationAudio('${p2.collinsTrack}', null, 1.0, 1.0, this)">
                  <span>▶️</span> Nghe Băng Gốc
                </button>
              </div>
            ` : ""}

            <div class="rule-examples-box">
              ${p2.examples.map(ex => `
                <div class="rule-example-row">
                  <div>
                    <div style="font-family:var(--font-heading); font-size:0.95rem; font-weight:700; color:#1E293B;">
                      ${ex.marked}
                    </div>
                    <div style="font-size:0.8rem; color:#64748B; margin-top:2px;">
                      ${ex.vn}
                    </div>
                  </div>
                  <button class="btn-tone-audio" onclick="AudioEngine.playIntonationAudio('${ex.audioUrl}', '${ex.speechText}', 1.0, 0.90, this)" title="Nghe câu này">
                    🔊
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- SECTION 3: CONTRASTIVE STRESS & NUMBERS (-TEEN VS -TY) -->
          <div class="rule-accordion-card">
            <div class="rule-card-header">
              <div class="rule-num-circle" style="background:#EA580C;">3</div>
              <div class="rule-title-group">
                <div class="rule-title-text" style="color:#C2410C;">
                  ${p3.headline}
                </div>
                <div class="rule-summary-text">${p3.explanation}</div>
              </div>
            </div>

            ${p3.collinsTrack ? `
              <div class="collins-track-card" style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #FFF7ED, #FFEDD5); border:1px solid #FDBA74; border-radius:10px; padding:12px 16px; margin:14px 0; box-shadow:0 2px 4px rgba(234,88,12,0.06);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:1.5rem;">🎙️</span>
                  <div>
                    <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#9A3412;">Băng Gốc Collins TOEIC: ${p3.collinsTrackTitle}</div>
                    <div style="font-size:0.75rem; color:#C2410C; margin-top:2px;">Luyện nghe phân biệt đuôi -teen (âm 2) và -ty (âm 1) chuẩn bản xứ</div>
                  </div>
                </div>
                <button class="btn-dialogue-play" style="background:#EA580C; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(234,88,12,0.3);" onclick="AudioEngine.playIntonationAudio('${p3.collinsTrack}', null, 1.0, 1.0, this)">
                  <span>▶️</span> Nghe Băng Gốc
                </button>
              </div>
            ` : ""}

            <!-- Bảng So Sánh -teen vs -ty -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin:14px 0;">
              ${p3.rulesComparison.map(r => `
                <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:14px;">
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.95rem; color:#92400E; margin-bottom:4px;">
                    ${r.type}
                  </div>
                  <div style="font-size:0.82rem; font-weight:700; color:#B45309; margin-bottom:4px;">${r.rule}</div>
                  <div style="font-size:0.78rem; font-family:var(--font-ipa); color:#7C3AED; margin-bottom:6px;">${r.ipa}</div>
                  <div style="font-size:0.78rem; color:#475569;">Ví dụ: <strong>${r.examples}</strong></div>
                </div>
              `).join("")}
            </div>

            <div class="rule-examples-box">
              ${p3.examples.map(ex => `
                <div class="rule-example-row">
                  <div>
                    <div style="font-family:var(--font-heading); font-size:0.95rem; font-weight:700; color:#1E293B;">
                      ${ex.marked}
                    </div>
                    <div style="font-size:0.8rem; color:#64748B; margin-top:2px;">
                      ${ex.vn}
                    </div>
                  </div>
                  <button class="btn-tone-audio" onclick="AudioEngine.playIntonationAudio('${ex.audioUrl}', '${ex.speechText}', 1.0, 0.90, this)" title="Nghe câu này">
                    🔊
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- SECTION 4: HETERONYMS NOUN VS VERB -->
          <div class="rule-accordion-card">
            <div class="rule-card-header">
              <div class="rule-num-circle" style="background:#2563EB;">4</div>
              <div class="rule-title-group">
                <div class="rule-title-text" style="color:#1E40AF;">
                  ${p4.headline}
                </div>
                <div class="rule-summary-text">${p4.explanation}</div>
              </div>
            </div>

            ${p4.collinsTrack ? `
              <div class="collins-track-card" style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #EFF6FF, #DBEAFE); border:1px solid #93C5FD; border-radius:10px; padding:12px 16px; margin:14px 0; box-shadow:0 2px 4px rgba(37,99,235,0.06);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:1.5rem;">🎙️</span>
                  <div>
                    <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#1E40AF;">Băng Gốc Collins TOEIC: ${p4.collinsTrackTitle}</div>
                    <div style="font-size:0.75rem; color:#2563EB; margin-top:2px;">Danh từ/Tính từ nhấn ÂM 1 vs Động từ nhấn ÂM 2 (Heteronyms)</div>
                  </div>
                </div>
                <button class="btn-dialogue-play" style="background:#2563EB; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(37,99,235,0.3);" onclick="AudioEngine.playIntonationAudio('${p4.collinsTrack}', null, 1.0, 1.0, this)">
                  <span>▶️</span> Nghe Băng Gốc
                </button>
              </div>
            ` : ""}

            <!-- Bảng Tra Cứu Cặp Từ -->
            <div style="overflow-x:auto; margin:14px 0;">
              <table style="width:100%; border-collapse:collapse; font-size:0.84rem; text-align:left;">
                <thead>
                  <tr style="background:#F1F5F9; border-bottom:2px solid #CBD5E1;">
                    <th style="padding:10px; font-weight:800; color:#1E293B;">Từ Vựng</th>
                    <th style="padding:10px; font-weight:800; color:#166534; background:#F0FDF4;">Danh Từ / Tính Từ (Nhấn Âm 1)</th>
                    <th style="padding:10px; font-weight:800; color:#1E40AF; background:#EFF6FF;">Động Từ (Nhấn Âm 2)</th>
                  </tr>
                </thead>
                <tbody>
                  ${p4.pairs.map((pair, idx) => `
                    <tr style="border-bottom:1px solid #E2E8F0; background:${idx % 2 === 0 ? '#fff' : '#F8FAFC'};">
                      <td style="padding:10px; font-weight:800; font-family:var(--font-heading); color:#0F172A;">
                        ${pair.word}
                      </td>
                      <td style="padding:10px; background:${idx % 2 === 0 ? '#F0FDF4' : '#E7F9EE'};">
                        <div style="font-weight:700; color:#15803D;">${pair.nStress}</div>
                        <div style="font-size:0.75rem; color:#475569; margin:2px 0;">${pair.nMeaning}</div>
                        <div style="font-size:0.78rem; font-style:italic; color:#047857;">Ví dụ: "${pair.exN}"</div>
                      </td>
                      <td style="padding:10px; background:${idx % 2 === 0 ? '#EFF6FF' : '#E0EDFE'};">
                        <div style="font-weight:700; color:#1D4ED8;">${pair.vStress}</div>
                        <div style="font-size:0.75rem; color:#475569; margin:2px 0;">${pair.vMeaning}</div>
                        <div style="font-size:0.78rem; font-style:italic; color:#1E40AF;">Ví dụ: "${pair.exV}"</div>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      `;

      container.innerHTML = html;
    },

    // ------------------------------------------------------------------------
    // TAB 4: KỸ THUẬT NGẮT NGHỈ (PAUSING) & PHÂN CỤM TƯ DUY (CHUNKING)
    // ------------------------------------------------------------------------
    renderPausingTab(container) {
      const data = window.INTONATION_DATA.pausingChunking;
      if (!data) {
        container.innerHTML = `<div style="padding:40px; text-align:center; color:#64748B;">Đang tải dữ liệu ngắt nghỉ &amp; phân cụm...</div>`;
        return;
      }

      const s1 = data.section1;
      const s2 = data.section2;
      const s3 = data.section3;

      let html = `
        <div style="margin-bottom:24px;">
          <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:800; background:#FEF3C7; color:#B45309; padding:4px 12px; border-radius:999px; text-transform:uppercase; margin-bottom:8px; border:1px solid #FDE68A;">
            <span>⏸️</span> Trụ Cột Số 3: TOEIC Speaking Questions 1–2 (Collins TOEIC)
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            ${data.title}
          </h2>
          <div style="font-size:0.88rem; color:#6D28D9; font-weight:600; margin-bottom:12px;">
            ${data.subtitle}
          </div>
          <p style="font-size:0.88rem; color:#475569; line-height:1.6; background:#F8FAFC; border:1px solid #E2E8F0; padding:14px 16px; border-radius:10px;">
            ${data.overview}
          </p>
        </div>

        <div style="display:flex; flex-direction:column; gap:28px;">

          <!-- PHẦN 1: NGẮT NGHỈ THEO DẤU CÂU (TRACK 29) -->
          <div class="chunking-card">
            <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:#1E40AF; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
              <span>📝</span> ${s1.title}
            </h3>
            <p style="font-size:0.88rem; color:#334155; line-height:1.55; margin-bottom:16px;">
              ${s1.desc}
            </p>

            <!-- Bảng Quy Ước Nhịp Thở Dấu Câu -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:18px;">
              ${s1.guideBox.map(g => `
                <div style="background:#F1F5F9; border-left:4px solid #3B82F6; padding:12px 14px; border-radius:4px 8px 8px 4px;">
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.92rem; color:#1E293B;">
                    ${g.mark} <span style="font-family:monospace; background:#DBEAFE; color:#1E40AF; padding:1px 6px; border-radius:4px;">${g.symbol}</span>
                  </div>
                  <div style="font-weight:700; color:#2563EB; font-size:0.82rem; margin:2px 0;">${g.pause}</div>
                  <div style="font-size:0.78rem; color:#64748B;">${g.note}</div>
                </div>
              `).join("")}
            </div>

            <!-- Băng Gốc Collins Track 29 Player -->
            <div style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #EFF6FF, #DBEAFE); border:1px solid #93C5FD; border-radius:10px; padding:14px 18px; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:1.6rem;">🎙️</span>
                <div>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.92rem; color:#1E40AF;">${s1.collinsTrackTitle}</div>
                  <div style="font-size:0.78rem; color:#1E3A8A; margin-top:2px;">Bản thu âm gốc người bản xứ từ NXB Collins Education (Speaking Questions 1–2)</div>
                </div>
              </div>
              <button class="btn-dialogue-play" style="background:#2563EB; color:#fff; border:none; padding:9px 18px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 8px rgba(37,99,235,0.3);" onclick="AudioEngine.playIntonationAudio('${s1.collinsTrack}', null, 1.0, 1.0, this)" title="Nghe băng thu âm gốc Track 29 từ sách Collins">
                <span>▶️</span> Nghe Băng Gốc Track 29
              </button>
            </div>

            <!-- Khung Bài Đọc Mẫu Phân Nhịp -->
            <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:10px; padding:18px 20px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-family:var(--font-heading); font-weight:800; font-size:0.85rem; color:#475569; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
                <span>📖 ${s1.passage.title}</span>
                <span style="font-size:0.75rem; text-transform:none; color:#64748B;">Ký hiệu: <span class="pause-pill-light">│ = 0.3s</span> <span class="pause-pill-heavy">‖ = 0.7s</span></span>
              </div>
              <div style="font-family:var(--font-heading); font-size:1.02rem; line-height:2.0; color:#0F172A; margin-bottom:12px;">
                ${s1.passage.chunkedDisplay}
              </div>
              <div style="font-size:0.82rem; color:#475569; border-top:1px dashed #E2E8F0; padding-top:10px; line-height:1.55;">
                💡 <strong>Dịch nghĩa:</strong> ${s1.passage.vn}
              </div>
            </div>
          </div>

          <!-- PHẦN 2: NGẮT NGHỈ SAU TỪ NỐI & CỤM GIỚI TỪ (TRACK 30) -->
          <div class="chunking-card">
            <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:#059669; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
              <span>🔗</span> ${s2.title}
            </h3>
            <p style="font-size:0.88rem; color:#334155; line-height:1.55; margin-bottom:16px;">
              ${s2.desc}
            </p>

            <!-- Băng Gốc Collins Track 30 Player -->
            <div style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #ECFDF5, #D1FAE5); border:1px solid #A7F3D0; border-radius:10px; padding:14px 18px; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:1.6rem;">🎙️</span>
                <div>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.92rem; color:#065F46;">${s2.collinsTrackTitle}</div>
                  <div style="font-size:0.78rem; color:#047857; margin-top:2px;">Bản thu âm gốc người bản xứ từ NXB Collins Education (Speaking Questions 1–2)</div>
                </div>
              </div>
              <button class="btn-dialogue-play" style="background:#059669; color:#fff; border:none; padding:9px 18px; border-radius:8px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 2px 8px rgba(5,150,105,0.3);" onclick="AudioEngine.playIntonationAudio('${s2.collinsTrack}', null, 1.0, 1.0, this)" title="Nghe băng thu âm gốc Track 30 từ sách Collins">
                <span>▶️</span> Nghe Băng Gốc Track 30
              </button>
            </div>

            <!-- Danh Sách 4 Câu Thực Hành -->
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${s2.sentences.map((sent, sIdx) => `
                <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px 16px; gap:12px;">
                  <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                      <span style="font-size:0.72rem; font-weight:800; background:#E0F2FE; color:#0369A1; padding:2px 8px; border-radius:4px; text-transform:uppercase;">${sent.type}</span>
                    </div>
                    <div style="font-family:var(--font-heading); font-size:1rem; font-weight:700; color:#1E293B;">
                      ${sent.marked}
                    </div>
                    <div style="font-size:0.8rem; color:#64748B; margin-top:2px;">
                      ${sent.vn}
                    </div>
                  </div>
                  <button class="btn-tone-audio" onclick="IntonationManager.playPausingSentence(${sIdx}, this)" title="Nghe câu này">
                    🔊
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- PHẦN 3: KỸ THUẬT NGẮT CỤM (CHUNKING) & 3 QUY TẮC VÀNG -->
          <div class="chunking-card" style="border-top:4px solid #7C3AED;">
            <div style="display:inline-block; font-size:0.72rem; font-weight:800; background:#F3E8FF; color:#7E22CE; padding:3px 10px; border-radius:999px; text-transform:uppercase; margin-bottom:6px;">
              ⭐ Phương Pháp Sư Phạm Cốt Lõi
            </div>
            <h3 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; color:#581C87; margin-bottom:8px;">
              ${s3.title}
            </h3>
            <p style="font-size:0.88rem; color:#334155; line-height:1.6; margin-bottom:14px;">
              ${s3.concept.definition}
            </p>

            <!-- So Sánh Bad vs Good Chunking -->
            <div class="chunking-compare-grid">
              <div class="chunking-compare-col bad">
                <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#991B1B; margin-bottom:6px;">
                  ❌ Cách đọc sai (Tách từng từ rời rạc):
                </div>
                <div style="font-family:monospace; font-size:1rem; font-weight:700; color:#DC2626; margin-bottom:6px;">
                  ${s3.concept.comparison.bad}
                </div>
                <div style="font-size:0.78rem; color:#7F1D1D; line-height:1.45;">
                  ${s3.concept.comparison.badDesc}
                </div>
              </div>

              <div class="chunking-compare-col good">
                <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#166534; margin-bottom:6px;">
                  ✅ Cách đọc chuẩn (Nhóm theo cụm tư duy):
                </div>
                <div style="font-family:monospace; font-size:1.05rem; font-weight:800; color:#16A34A; margin-bottom:6px;">
                  ${s3.concept.comparison.good}
                </div>
                <div style="font-size:0.78rem; color:#14532D; line-height:1.45;">
                  ${s3.concept.comparison.goodDesc}
                </div>
              </div>
            </div>

            <!-- 3 QUY TẮC CHUNKING CHI TIẾT -->
            <div style="margin-top:24px; display:flex; flex-direction:column; gap:20px;">
              <h4 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:#1E293B;">
                🎯 3 QUY TẮC CHUNKING BẮT BUỘC PHẢI NHỚ:
              </h4>

              <!-- Quy Tắc 1 -->
              <div style="background:#FAF5FF; border:1px solid #E9D5FF; border-radius:10px; padding:18px 20px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                  <span style="width:28px; height:28px; border-radius:50%; background:#7C3AED; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">1</span>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:1rem; color:#6B21A8;">
                    ${s3.rules[0].name}
                  </div>
                </div>
                <p style="font-size:0.85rem; color:#4C1D95; line-height:1.55; margin-bottom:12px;">
                  👉 <strong>Quy tắc đọc:</strong> ${s3.rules[0].instruction}
                </p>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:14px;">
                  ${s3.rules[0].categories.map(cat => `
                    <div style="background:#FFFFFF; border:1px solid #D8B4FE; padding:8px 12px; border-radius:6px;">
                      <div style="font-size:0.72rem; font-weight:800; color:#7C3AED; text-transform:uppercase;">${cat.label}</div>
                      <div style="font-size:0.82rem; font-weight:600; color:#1E293B; margin-top:2px;">${cat.items}</div>
                    </div>
                  `).join("")}
                </div>
                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:6px; padding:10px 14px; font-size:0.82rem; color:#334155; line-height:1.6;">
                  <strong>🔍 Ví dụ cụ thể:</strong><br/>
                  ${s3.rules[0].doAndDont.map(d => `
                    • <strong>${d.good}</strong> (không đọc: <code>${d.bad}</code>) — <em>${d.note}</em><br/>
                  `).join("")}
                </div>
              </div>

              <!-- Quy Tắc 2 -->
              <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:18px 20px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                  <span style="width:28px; height:28px; border-radius:50%; background:#2563EB; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">2</span>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:1rem; color:#1E40AF;">
                    ${s3.rules[1].name}
                  </div>
                </div>
                <p style="font-size:0.85rem; color:#1E3A8A; line-height:1.55; margin-bottom:10px;">
                  👉 <strong>Áp dụng:</strong> ${s3.rules[1].instruction}
                </p>
                <ul style="font-size:0.85rem; color:#1E40AF; margin-left:18px; margin-bottom:12px; line-height:1.6;">
                  ${s3.rules[1].bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
                <div style="background:#FFFFFF; border:1px solid #BFDBFE; border-radius:6px; padding:10px 14px; font-size:0.84rem; color:#1E293B;">
                  <strong>Ví dụ:</strong> <span style="font-family:monospace; font-weight:700; color:#2563EB;">${s3.rules[1].example.text}</span><br/>
                  <span style="font-size:0.78rem; color:#64748B;">→ ${s3.rules[1].example.note}</span>
                </div>
              </div>

              <!-- Quy Tắc 3 -->
              <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:10px; padding:18px 20px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                  <span style="width:28px; height:28px; border-radius:50%; background:#16A34A; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">3</span>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:1rem; color:#166534;">
                    ${s3.rules[2].name}
                  </div>
                </div>
                <p style="font-size:0.85rem; color:#14532D; line-height:1.55; margin-bottom:10px;">
                  👉 <strong>Quy tắc khi nói tự do:</strong> ${s3.rules[2].instruction}
                </p>
                <ul style="font-size:0.85rem; color:#15803D; margin-left:18px; margin-bottom:12px; line-height:1.6;">
                  ${s3.rules[2].bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
                <div style="background:#FFFFFF; border:1px solid #BBF7D0; border-radius:6px; padding:10px 14px; font-size:0.84rem; color:#1E293B;">
                  <strong>Ví dụ:</strong> <span style="font-family:monospace; font-weight:700; color:#16A34A;">${s3.rules[2].example.text}</span><br/>
                  <span style="font-size:0.78rem; color:#64748B;">→ ${s3.rules[2].example.note}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      `;

      container.innerHTML = html;
    },

    // ------------------------------------------------------------------------
    // TAB 5: KỸ THUẬT NỐI ÂM (LINKING) & DẠNG NÓI TẮT (CONTRACTIONS)
    // ------------------------------------------------------------------------
    renderLinkingTab(container) {
      const data = window.INTONATION_DATA.linkingContractions;
      if (!data) {
        container.innerHTML = `<div style="padding:40px; text-align:center; color:#64748B;">Đang tải dữ liệu nối âm...</div>`;
        return;
      }

      const types = data.linkingTypes;
      const contractions = data.contractions;

      let html = `
        <div style="margin-bottom:24px;">
          <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:800; background:#E0F2FE; color:#0369A1; padding:4px 12px; border-radius:999px; text-transform:uppercase; margin-bottom:8px; border:1px solid #BAE6FD;">
            <span>🔗</span> Dòng Chảy Lời Nói Tự Nhiên (Connected Speech)
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            ${data.title}
          </h2>
          <div style="font-size:0.88rem; color:#6D28D9; font-weight:600; margin-bottom:12px;">
            ${data.subtitle}
          </div>
          <p style="font-size:0.88rem; color:#475569; line-height:1.6; background:#F8FAFC; border:1px solid #E2E8F0; padding:14px 16px; border-radius:10px;">
            ${data.overview}
          </p>
        </div>

        <div style="display:flex; flex-direction:column; gap:28px;">

          <!-- PHẦN 1: 4 DẠNG NỐI ÂM CHÍNH -->
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <h3 style="font-family:var(--font-heading); font-size:1.18rem; font-weight:800; color:#1E293B; display:flex; align-items:center; gap:8px;">
                <span>🎯</span> I. 4 Dạng Nối Âm Cốt Lõi (The 4 Linking Patterns)
              </h3>
              <span style="font-size:0.78rem; font-weight:700; background:#EFF6FF; color:#1E40AF; padding:4px 10px; border-radius:var(--radius-pill); border:1px solid #BFDBFE;">
                Bản chất: Người bản xứ không đọc rời rạc từng từ
              </span>
            </div>

            <div style="display:flex; flex-direction:column; gap:18px;">
              ${types.map(t => `
                <div class="linking-card">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
                    <div style="font-family:var(--font-heading); font-weight:800; font-size:1.05rem; color:#1E40AF;">
                      ${t.title}
                    </div>
                    <span style="font-size:0.75rem; font-weight:700; background:#DBEAFE; color:#1E40AF; padding:3px 10px; border-radius:var(--radius-pill);">
                      ${t.badge}
                    </span>
                  </div>

                  <p style="font-size:0.86rem; color:#475569; line-height:1.55; margin-bottom:10px;">
                    👉 ${t.desc}
                  </p>

                  <div style="font-family:monospace; font-size:0.85rem; font-weight:700; color:#0369A1; background:#F0F9FF; border:1px dashed #BAE6FD; padding:8px 12px; border-radius:6px; margin-bottom:14px;">
                    📐 Quy tắc: ${t.formula}
                  </div>

                  <!-- Grid ví dụ -->
                  <div class="linking-examples-grid">
                    ${t.examples.map((ex, exIdx) => `
                      <div class="linking-example-item">
                        <div style="flex:1;">
                          <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-family:var(--font-heading); font-weight:800; font-size:0.95rem; color:#0F172A;">${ex.original}</span>
                            <span style="font-size:0.82rem; color:#6D28D9; font-weight:700;">→</span>
                            <span style="font-family:monospace; font-weight:700; font-size:0.88rem; color:#2563EB;">${ex.phoneticVi}</span>
                          </div>
                          <div style="font-size:0.75rem; color:#64748B; margin-top:2px;">
                            ${ex.note} • <span style="font-family:var(--font-ipa); color:#7C3AED;">${ex.linkedIpa}</span>
                          </div>
                        </div>
                        <button class="btn-tone-audio" onclick="IntonationManager.playLinkingItem(${t.num}, ${exIdx}, this)" title="Nghe cách phát âm nối âm">
                          🔊
                        </button>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- PHẦN 2: CÁC DẠNG NÓI TẮT PHỔ BIẾN (CONTRACTIONS) -->
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <h3 style="font-family:var(--font-heading); font-size:1.18rem; font-weight:800; color:#1E293B; display:flex; align-items:center; gap:8px;">
                <span>⚡</span> II. Các Dạng Nói Tắt & Rút Gọn (Contractions)
              </h3>
              <span style="font-size:0.78rem; font-weight:700; background:#FAF5FF; color:#7C3AED; padding:4px 10px; border-radius:var(--radius-pill); border:1px solid #E9D5FF;">
                Tiết kiệm hơi & tăng tốc độ nói
              </span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
              ${contractions.map(c => `
                <div class="contraction-group-card">
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.98rem; color:#6D28D9; margin-bottom:4px;">
                    ${c.label}
                  </div>
                  <div style="font-size:0.8rem; color:#475569; line-height:1.45; margin-bottom:10px;">
                    👉 ${c.rule}
                  </div>

                  <div class="contraction-items-grid">
                    ${c.items.map((it, itIdx) => `
                      <button class="contraction-pill-btn" onclick="IntonationManager.playContraction('${c.id}', ${itIdx}, this)" title="Bấm để nghe cách phát âm">
                        <span style="font-weight:800; color:#0F172A; font-size:0.92rem;">${it.text}</span>
                        <span style="font-size:0.75rem; color:#6D28D9; font-family:var(--font-ipa);">${it.ipa}</span>
                        <span style="font-size:0.75rem;">🔊</span>
                      </button>
                    `).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

        </div>
      `;

      container.innerHTML = html;
    },

    // ------------------------------------------------------------------------
    // TAB 6: LUYỆN ĐỀ THỰC CHIẾN TOEIC SPEAKING (QUESTIONS 1–2)
    // ------------------------------------------------------------------------
    renderPracticeTab(container) {
      const data = window.INTONATION_DATA.toeicPractice;
      if (!data) {
        container.innerHTML = `<div style="padding:40px; text-align:center; color:#64748B;">Đang tải dữ liệu bài luyện đề...</div>`;
        return;
      }

      const practices = data.practices;
      const currentPractice = practices.find(p => p.id === this.selectedPracticeId) || practices[0];
      const exam = data.examInfo;

      let html = `
        <div class="toeic-practice-wrapper">

          <!-- BANNER GIỚI THIỆU CHUYÊN ĐỀ -->
          <div style="background: linear-gradient(135deg, #0F172A, #1E293B); border-radius: var(--radius-md); padding: 22px 26px; color: #FFFFFF; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">
            <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:800; background:rgba(59, 130, 246, 0.2); color:#93C5FD; padding:4px 12px; border-radius:999px; text-transform:uppercase; margin-bottom:10px; border:1px solid rgba(147, 197, 253, 0.3);">
              <span>🎙️</span> ${exam.part} • Collins TOEIC Official
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.42rem; font-weight:800; margin-bottom:8px; color:#FFFFFF;">
              ${data.title}
            </h2>
            <p style="font-size:0.9rem; color:#CBD5E1; line-height:1.6; max-width:880px; margin-bottom:14px;">
              ${data.subtitle}
            </p>

            <!-- 4 Tiêu Chí Chấm Điểm ETS Cốt Lõi -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px; margin-top:14px; border-top:1px solid rgba(255,255,255,0.1); padding-top:14px;">
              ${exam.scoringCriteria.map(sc => `
                <div style="background:rgba(255,255,255,0.06); border-radius:8px; padding:10px 12px; border:1px solid rgba(255,255,255,0.08);">
                  <div style="font-size:0.8rem; font-weight:800; color:#60A5FA; display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                    <span>${sc.icon}</span> ${sc.label}
                  </div>
                  <div style="font-size:0.75rem; color:#94A3B8; line-height:1.4;">${sc.desc}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- THANH CHỌN 4 ĐỀ THI THỰC HÀNH -->
          <div>
            <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#475569; text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">
              Chọn Đề Luyện Tập (4 Đề Khảo Thí Collins):
            </div>
            <div class="practice-nav-pills">
              ${practices.map(p => `
                <button class="practice-nav-btn ${p.id === currentPractice.id ? 'active' : ''}" onclick="IntonationManager.selectPractice('${p.id}')">
                  <span>${p.title.split(':')[0]}</span>
                  <span class="practice-nav-sub">${p.title.split(':')[1] || ''} • ${p.badge}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- BĂNG GỐC COLLINS NATIVE SPEAKER AUDIO PLAYER -->
          <div style="display:flex; align-items:center; justify-content:space-between; background:linear-gradient(135deg, #F0FDF4, #DCFCE7); border:1px solid #86EFAC; border-radius:12px; padding:16px 20px; box-shadow:0 2px 8px rgba(22,163,74,0.08); flex-wrap:wrap; gap:14px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <span style="font-size:2rem;">🎙️</span>
              <div>
                <div style="font-family:var(--font-heading); font-weight:800; font-size:1rem; color:#166534;">
                  Băng Gốc Giọng Bản Xứ: ${currentPractice.trackInfo}
                </div>
                <div style="font-size:0.8rem; color:#15803D; margin-top:3px;">
                  Bản thu âm chuẩn khảo thí từ NXB Collins Education (Speaking Questions 1–2). Lắng nghe ngữ điệu và ngắt nghỉ mẫu để đối chiếu.
                </div>
              </div>
            </div>
            <button class="btn-dialogue-play" style="background:#16A34A; color:#fff; border:none; padding:10px 22px; border-radius:8px; font-weight:800; font-size:0.95rem; cursor:pointer; display:flex; align-items:center; gap:8px; box-shadow:0 3px 10px rgba(22,163,74,0.35);" onclick="AudioEngine.playIntonationAudio('${currentPractice.audioUrl}', null, 1.0, 1.0, this)" title="Nghe toàn bộ bài đọc mẫu từ băng gốc Collins">
              <span>▶️</span> Nghe Băng Gốc
            </button>
          </div>

          <!-- PHÒNG THI MÔ PHỎNG ETS (EXAM SIMULATION CARD & TIMER) -->
          <div class="exam-sim-card">
            <!-- Header đề thi -->
            <div class="exam-sim-header">
              <div style="font-family:var(--font-heading); font-weight:800; font-size:1.05rem;">
                ${currentPractice.title}
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                <!-- Chuyển đổi chế độ: Clean đề thi vs Ký hiệu ngữ điệu -->
                <button style="background:${this.practiceMode === 'clean' ? '#FFFFFF' : 'rgba(255,255,255,0.2)'}; color:${this.practiceMode === 'clean' ? '#1E3A8A' : '#FFFFFF'}; border:none; padding:6px 14px; border-radius:6px; font-weight:700; font-size:0.8rem; cursor:pointer;" onclick="IntonationManager.setPracticeMode('clean')">
                  📄 Đề Thi Chuẩn (ETS Mode)
                </button>
                <button style="background:${this.practiceMode === 'marked' ? '#FFFFFF' : 'rgba(255,255,255,0.2)'}; color:${this.practiceMode === 'marked' ? '#1E3A8A' : '#FFFFFF'}; border:none; padding:6px 14px; border-radius:6px; font-weight:700; font-size:0.8rem; cursor:pointer;" onclick="IntonationManager.setPracticeMode('marked')">
                  🎯 Ký Hiệu Ngữ Điệu (Analyzed)
                </button>
              </div>
            </div>

            <!-- Hướng dẫn làm bài (Directions) -->
            <div class="exam-sim-directions">
              <strong>Directions:</strong> In this part, you will read a text aloud. You will have 45 seconds to prepare and 45 seconds to read the text aloud.
            </div>

            <!-- Bộ đếm giờ khảo thí 45 giây (Interactive Exam Timer) -->
            <div class="exam-timer-bar-wrapper">
              <div style="display:flex; align-items:center; gap:14px;">
                <div class="exam-timer-clock ${this.examTimerType === 'prep' ? 'prep-mode' : (this.examTimerType === 'speak' ? 'speak-mode' : '')}" id="examTimerDisplay">
                  ${this.formatTimerTime(this.examTimerSecondsLeft)}
                </div>
                <div>
                  <div style="font-family:var(--font-heading); font-weight:800; font-size:0.88rem; color:#1E293B;" id="examTimerStatus">
                    ${this.examTimerType === 'prep' ? '⏳ Đang trong 45s CHUẨN BỊ (Lướt mắt, gạch chân từ khó)' : (this.examTimerType === 'speak' ? '🎙️ Đang trong 45s ĐỌC TO (Nói to, rõ, dứt khoát)' : 'Đồng hồ bấm giờ mô phỏng phòng thi ETS')}
                  </div>
                  <div style="font-size:0.75rem; color:#64748B;">
                    Luyện tập chuẩn áp lực thời gian thực tế trong phòng thi TOEIC Speaking
                  </div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:8px;">
                <button class="btn-primary" style="background:#D97706; padding:8px 16px; font-size:0.82rem; font-weight:700;" onclick="IntonationManager.startExamTimer('prep', 45)">
                  ⏱️ 45s Chuẩn Bị
                </button>
                <button class="btn-primary" style="background:#DC2626; padding:8px 16px; font-size:0.82rem; font-weight:700;" onclick="IntonationManager.startExamTimer('speak', 45)">
                  🎙️ 45s Đọc To
                </button>
                <button class="btn-primary" style="background:#64748B; padding:8px 14px; font-size:0.82rem; font-weight:700;" onclick="IntonationManager.stopExamTimer()">
                  ⏹️ Đặt Lại
                </button>
              </div>
            </div>

            <!-- Thanh tiến trình thời gian -->
            <div style="width:100%; height:4px; background:#E2E8F0;">
              <div id="examTimerProgressBar" style="width:${(this.examTimerSecondsLeft / this.examTimerTotal) * 100}%; height:100%; background:${this.examTimerType === 'prep' ? '#F59E0B' : '#EF4444'}; transition: width 0.3s linear;"></div>
            </div>

            <!-- Đoạn văn bài đọc đề thi -->
            <div class="exam-passage-box ${this.practiceMode === 'clean' ? 'clean-mode' : 'marked-mode'}">
              ${this.practiceMode === 'clean' ? currentPractice.rawText : currentPractice.markedDisplay}
            </div>

            <!-- Chú thích ký hiệu nếu ở chế độ Marked -->
            ${this.practiceMode === 'marked' ? `
              <div style="background:#F8FAFC; border-top:1px solid #E2E8F0; padding:10px 20px; font-size:0.78rem; color:#475569; display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
                <span><strong>Ký hiệu:</strong></span>
                <span><span class="tone-pill-rise">↗</span> Lên giọng (Rise)</span>
                <span><span class="tone-pill-fall">↘</span> Xuống giọng (Fall)</span>
                <span><span class="pause-pill-light">/</span> Ngắt nhẹ (0.3s)</span>
                <span><span class="pause-pill-heavy">//</span> Ngắt trọn vẹn (0.7s)</span>
              </div>
            ` : ""}
          </div>

          <!-- PHÂN TÍCH CHI TIẾT TỪNG CÂU & HƯỚNG DẪN SƯ PHẠM (SENTENCE-BY-SENTENCE BREAKDOWN) -->
          <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:var(--radius-md); padding:22px 24px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
              <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:#1E293B; display:flex; align-items:center; gap:8px;">
                <span>🔬</span> Phân Tích Kỹ Thuật Chunking &amp; Ngữ Điệu Từng Câu
              </h3>
              <span style="font-size:0.75rem; font-weight:700; background:#F0FDF4; color:#166534; padding:4px 10px; border-radius:var(--radius-pill); border:1px solid #BBF7D0;">
                Bấm 🔊 để luyện đọc từng câu
              </span>
            </div>

            <div style="display:flex; flex-direction:column; gap:12px;">
              ${currentPractice.chunkedSentences.map((sent, sIdx) => `
                <div class="practice-chunk-row">
                  <div style="min-width:28px; height:28px; border-radius:50%; background:#2563EB; color:#fff; font-weight:800; font-size:0.82rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    ${sIdx + 1}
                  </div>
                  <div style="flex:1;">
                    <div style="font-family:var(--font-heading); font-size:1.02rem; font-weight:700; color:#0F172A; line-height:1.6; margin-bottom:4px;">
                      ${sent.text}
                    </div>
                    <div style="font-size:0.82rem; color:#475569; line-height:1.45;">
                      👉 <strong>Phân tích:</strong> ${sent.note}
                    </div>
                  </div>
                  <button class="btn-tone-audio" onclick="IntonationManager.playPracticeSentence('${currentPractice.id}', ${sIdx}, this)" title="Nghe câu này">
                    🔊
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- BẢNG TỪ VỰNG TRỌNG TÂM CỦA BÀI (VOCABULARY TABLE) -->
          <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:var(--radius-md); padding:22px 24px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
              <div>
                <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:#1E293B; display:flex; align-items:center; gap:8px;">
                  <span>📚</span> Bảng Từ Vựng &amp; Trọng Âm Trọng Tâm
                </h3>
                <div style="font-size:0.8rem; color:#64748B; margin-top:2px;">
                  Tập trung xử lý trọng âm âm tiết chính xác và các phụ âm đuôi (/t/, /d/, /s/, /z/, /θ/) để không bị mất điểm phát âm
                </div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; background:#FAF5FF; color:#7C3AED; padding:4px 10px; border-radius:var(--radius-pill); border:1px solid #E9D5FF;">
                ${currentPractice.vocabulary.length} từ vựng then chốt
              </span>
            </div>

            <div style="overflow-x:auto;">
              <table class="practice-vocab-table">
                <thead>
                  <tr>
                    <th style="width:25%;">Từ vựng (Word)</th>
                    <th style="width:25%;">Phiên âm (IPA)</th>
                    <th style="width:12%;">Từ loại</th>
                    <th style="width:30%;">Nghĩa tiếng Việt</th>
                    <th style="width:8%; text-align:center;">Nghe</th>
                  </tr>
                </thead>
                <tbody>
                  ${currentPractice.vocabulary.map((it, vIdx) => `
                    <tr>
                      <td style="font-weight:800; color:#0F172A; font-family:var(--font-heading);">${it.word}</td>
                      <td style="font-family:var(--font-ipa); color:#7C3AED; font-weight:600; font-size:0.92rem;">${it.ipa}</td>
                      <td><span style="font-size:0.72rem; font-weight:800; background:#E2E8F0; color:#334155; padding:2px 8px; border-radius:4px; text-transform:uppercase;">${it.pos}</span></td>
                      <td style="color:#475569;">${it.meaning}</td>
                      <td style="text-align:center;">
                        <button class="btn-tone-audio" style="width:32px; height:32px; font-size:0.75rem;" onclick="IntonationManager.playPracticeWord('${it.word.replace(/'/g, "\\'")}', this)" title="Nghe phát âm từ này">
                          🔊
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      `;

      container.innerHTML = html;
    },

    // ------------------------------------------------------------------------
    // TAB 7: PHÒNG THÍ NGHIỆM THÁI ĐỘ (ATTITUDINAL LAB)
    // ------------------------------------------------------------------------
    renderAttitudesTab(container) {
      const attitudes = window.INTONATION_DATA.attitudes;
      const currentWordObj = attitudes.find(a => a.word === this.selectedAttitudeWord) || attitudes[0];

      let html = `
        <div class="attitude-lab-wrapper">
          <div style="margin-bottom:20px;">
            <h3 style="font-family:var(--font-heading); font-size:1.18rem; font-weight:800; color:var(--text-main); margin-bottom:6px; display:flex; align-items:center; gap:8px;">
              <span>🎭</span> Phòng Thí Nghiệm Sắc Thái & Cảm Xúc (Attitudinal Lab)
            </h3>
            <p style="font-size:0.88rem; color:#475569; line-height:1.5;">
              Cùng một từ ngữ, nhưng khi thay đổi chuyển động cao độ, ý nghĩa thực sự của bạn sẽ quay ngoắt 180 độ! Chọn một từ bên dưới để khám phá từng sắc thái cảm xúc:
            </p>
          </div>

          <!-- Selector Pills -->
          <div class="attitude-word-selector">
      `;

      attitudes.forEach(a => {
        const isActive = a.word === currentWordObj.word;
        html += `
          <button class="attitude-word-pill ${isActive ? "active" : ""}" onclick="IntonationManager.selectAttitudeWord('${a.word}')">
            "${a.word}" <small style="font-family:var(--font-ipa); font-weight:400; opacity:0.85;">${a.ipa}</small>
          </button>
        `;
      });

      html += `
          </div>

          <!-- Variations Grid -->
          <div class="attitude-variations-grid">
      `;

      currentWordObj.variations.forEach(v => {
        html += `
          <div class="attitude-tone-card">
            <div>
              <div class="attitude-tone-header">
                <span class="attitude-tone-symbol">${v.symbol}</span>
                <span class="attitude-tone-tag">${v.meaning}</span>
              </div>
              <div class="attitude-tone-vn">"${v.vnMeaning}"</div>
              <div class="attitude-tone-context">
                📌 <strong>Ngữ cảnh:</strong> ${v.context}
              </div>
            </div>
            <button class="btn-attitude-listen" onclick="IntonationManager.playAttitudeExample('${currentWordObj.word}', '${v.tone}', this)">
              <span>🔊</span> Nghe Sắc Thái Này (${v.symbol})
            </button>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      container.innerHTML = html;
    },

    selectAttitudeWord(word) {
      this.selectedAttitudeWord = word;
      this.render();
    },

    // ------------------------------------------------------------------------
    // TAB 4: 4 CHỨC NĂNG CỦA NGỮ ĐIỆU & NUCLEUS SHIFT LAB
    // ------------------------------------------------------------------------
    renderFunctionsTab(container) {
      const funcs = window.INTONATION_DATA.functions;
      const demo = window.INTONATION_DATA.nucleusShiftDemo;
      const activeWord = demo.words[this.selectedNucleusIndex] || demo.words[0];

      let html = `
        <div style="margin-bottom:20px;">
          <h3 style="font-family:var(--font-heading); font-size:1.18rem; font-weight:800; color:var(--text-main); margin-bottom:6px; display:flex; align-items:center; gap:8px;">
            <span>🎯</span> 4 Chức Năng Cốt Lõi Của Ngữ Điệu (Theo GS. Peter Roach)
          </h3>
          <p style="font-size:0.88rem; color:#475569; line-height:1.5;">
            Ngữ điệu không chỉ để cho 'hay', mà nó đảm nhận 4 vai trò ngôn ngữ học tối quan trọng giúp người nghe giải mã trọn vẹn thông điệp của bạn:
          </p>
        </div>

        <div class="functions-showcase-grid">
      `;

      funcs.forEach(f => {
        html += `
          <div class="function-card-item">
            <div class="function-card-icon">${f.icon}</div>
            <div class="function-card-title">${f.title}</div>
            <div class="function-card-desc">${f.desc}</div>
            <div class="function-card-takeaway">💡 ${f.keyTakeaway}</div>
          </div>
        `;
      });

      html += `
        </div>

        <!-- Thí Nghiệm Kinh Điển: Nucleus Shift -->
        <div class="nucleus-lab-container">
          <div style="text-align:center; max-width:680px; margin:0 auto;">
            <div style="font-family:var(--font-heading); font-size:1.2rem; font-weight:800; color:#1E293B; margin-bottom:6px;">
              🔬 Thí Nghiệm Di Chuyển Hạt Nhân: "I didn't take your book."
            </div>
            <p style="font-size:0.85rem; color:#64748B; margin-bottom:14px;">
              Bấm vào từng từ bên dưới để di chuyển <strong>Hạt Nhân Ngữ Điệu (Nucleus)</strong> và khám phá xem ý nghĩa hàm ẩn của cả câu thay đổi ra sao:
            </p>

            <div class="nucleus-sentence-chips">
      `;

      demo.words.forEach((w, idx) => {
        const isAct = idx === this.selectedNucleusIndex;
        html += `
          <button class="nucleus-chip-btn ${isAct ? "active" : ""}" onclick="IntonationManager.selectNucleus(${idx})">
            ${w.word}
          </button>
        `;
      });

      html += `
            </div>

            <div class="nucleus-feedback-panel">
              <div class="nucleus-meaning-headline">
                👉 ${activeWord.meaning}
              </div>
              <div class="nucleus-explanation-body">
                ${activeWord.explanation}
              </div>

              ${activeWord.dialogueContext ? `
                <div class="context-box" style="text-align:left; margin:14px 0;">
                  <div class="context-icon">🎭</div>
                  <div>
                    <div class="context-title">Tình Huống Đối Thoại & Phản Biện Thực Tế</div>
                    <div class="context-body">${activeWord.dialogueContext}</div>
                  </div>
                </div>
              ` : ""}

              <button class="btn-play-tone-pitch" style="margin:12px auto 0; padding:10px 24px; font-size:0.88rem;" onclick="IntonationManager.playNucleusExample(${this.selectedNucleusIndex}, this)">
                <span>🔊</span> Nghe Câu Nhấn Trọng Tâm Vào "${activeWord.word}"
              </button>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;
    },

    selectNucleus(idx) {
      this.selectedNucleusIndex = idx;
      this.render();
      this.playNucleusExample(idx);
    },

    // ------------------------------------------------------------------------
    // TAB 6: CẨM NANG GIẢNG DẠY CỦA CÔ GIÁO (TEACHER'S PEDAGOGICAL GUIDE)
    // ------------------------------------------------------------------------
    renderGuideTab(container) {
      const guide = window.INTONATION_DATA.teacherGuide;
      if (!guide) {
        container.innerHTML = `<div style="padding:30px; text-align:center;">Dữ liệu cẩm nang chưa sẵn sàng.</div>`;
        return;
      }

      let html = `
        <div class="teacher-guide-wrapper">
          <!-- Banner Chào Mừng & Tôn Chỉ Sư Phạm -->
          <div class="pedagogy-step-card" style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); color:#FFFFFF; border:none; margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
              <div style="font-size:2.4rem;">👩‍🏫</div>
              <div>
                <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:#FFFFFF; margin-bottom:4px;">
                  Cẩm Nang Giảng Dạy Ngữ Điệu (Teacher's Guide)
                </h2>
                <div style="font-size:0.88rem; color:#C7D2FE; margin:0;">
                  Sổ tay phương pháp sư phạm thực chiến chuẩn quốc tế (Wells, Roach) dành riêng cho lớp học trực tiếp & trực tuyến.
                </div>
              </div>
            </div>
            <p style="font-size:0.86rem; color:#E0E7FF; line-height:1.6; margin-top:10px; border-top:1px solid rgba(255,255,255,0.15); padding-top:12px;">
              📌 <strong>Triết lý giảng dạy:</strong> <em>"Học ngữ điệu không phải là bắt chước máy móc, mà là rèn luyện cho đôi tai nhạy bén để giải mã cảm xúc và điều khiển dây thanh đới để truyền tải đúng ý đồ giao tiếp."</em>
            </p>
          </div>

          <!-- Phần 1: Quy Trình 4 Bước Giảng Dạy Trên Lớp -->
          <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:14px; display:flex; align-items:center; gap:8px;">
            <span>🎯</span> Quy Trình 4 Bước Triển Khai Tiết Học (Classroom Workflow)
          </h3>
          <div class="pedagogy-steps-grid">
      `;

      guide.workflowSteps.forEach(step => {
        html += `
          <div class="pedagogy-step-card">
            <div class="pedagogy-step-head">
              <div class="step-num-badge">${step.num}</div>
              <div class="step-title-text">${step.title}</div>
            </div>
            <div style="font-size:0.88rem; color:#475569; line-height:1.6;">
              ${step.desc}
            </div>
          </div>
        `;
      });

      html += `
          </div>

          <!-- Phần 2: 3 Phương Pháp Giảng Dạy Độc Quyền -->
          <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:var(--text-main); margin:28px 0 14px; display:flex; align-items:center; gap:8px;">
            <span>✨</span> 3 Kỹ Thuật Độc Quyền Giúp Học Viên Việt 'Bẻ Giọng' Nhanh Nhất
          </h3>
          <div class="pedagogy-method-list">
      `;

      guide.signatureTechniques.forEach(tech => {
        html += `
          <div class="method-card">
            <div class="method-card-title">
              <span>💡</span> ${tech.title}
            </div>
            <div class="method-card-body" style="color:#4B5563; line-height:1.55;">
              ${tech.desc}
            </div>
          </div>
        `;
      });

      html += `
          </div>

          <!-- Phần 3: Bảng Ma Trận Chẩn Đoán Lỗi & Cách Sửa Nhanh -->
          <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:800; color:var(--text-main); margin:32px 0 14px; display:flex; align-items:center; gap:8px;">
            <span>🚨</span> Ma Trận Bắt Lỗi & Kỹ Thuật 'Sửa Gấp' Cho Học Viên Việt Nam
          </h3>
          <div class="pedagogy-table-wrap">
            <table class="pedagogy-table">
              <thead>
                <tr>
                  <th style="width:28%;">Lỗi Sai Kinh Điển</th>
                  <th style="width:34%;">Nguyên Nhân Căn Bản (Root Cause)</th>
                  <th style="width:38%;">Kỹ Thuật Sửa Nhanh (Teacher's Fix)</th>
                </tr>
              </thead>
              <tbody>
      `;

      guide.errorMatrix.forEach(row => {
        html += `
          <tr>
            <td style="font-weight:700; color:#BE123C;">${row.mistake}</td>
            <td style="color:#475569;">${row.reason}</td>
            <td style="color:#15803D; font-weight:600;">👉 ${row.teacherFix}</td>
          </tr>
        `;
      });

      html += `
              </tbody>
            </table>
          </div>

          <!-- Nút Điều Hướng Thực Hành Nhanh -->
          <div style="text-align:center; margin-top:32px; padding:24px; background:#F8FAFC; border-radius:var(--radius-md); border:1px dashed #CBD5E1;">
            <h4 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:#1E293B; margin-bottom:8px;">
              Sẵn sàng hướng dẫn học viên thực hành ngay bây giờ?
            </h4>
            <p style="font-size:0.85rem; color:#64748B; margin-bottom:16px;">
              Bắt đầu với 5 loại cao độ cốt lõi hoặc khám phá các đoạn hội thoại thực tế:
            </p>
            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button class="btn-primary" style="padding:10px 24px; font-weight:800;" onclick="IntonationManager.switchTab('tones')">
                <span>📉</span> Bắt Đầu Từ Tab 1 (5 Loại Điệu)
              </button>
              <button class="btn-primary" style="padding:10px 24px; font-weight:800; background:#7C3AED;" onclick="IntonationManager.switchTab('rules')">
                <span>📖</span> Đến Tab 2 (8 Quy Tắc)
              </button>
              <button class="btn-primary" style="padding:10px 24px; font-weight:800; background:#0D9488;" onclick="IntonationManager.switchTab('quiz')">
                <span>🏆</span> Kiểm Tra Với Tab 5 (15 Câu Quiz)
              </button>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;
    },

    selectNucleus(idx) {
      this.selectedNucleusIndex = idx;
      this.render();
      this.playNucleusExample(idx);
    },

    // ------------------------------------------------------------------------
    // TAB 5: 15 CÂU TRẮC NGHIỆM LUYỆN TAI NHẬN DIỆN CAO ĐỘ (EAR TRAINING QUIZ)
    // ------------------------------------------------------------------------
    renderQuizTab(container) {
      const quizList = window.INTONATION_DATA.quiz;
      const total = quizList.length;

      // Nếu đã hoàn thành bài quiz
      if (this.quizIndex >= total) {
        const pct = Math.round((this.quizScore / total) * 100);
        let msg = "";
        let trophy = "🏆";
        if (pct >= 85) {
          msg = "Xuất sắc! Đôi tai của bạn đã bắt trọn từng dao động cao độ như người bản xứ!";
          trophy = "🌟";
        } else if (pct >= 60) {
          msg = "Rất tốt! Bạn đã nắm được phần lớn các quy tắc ngữ điệu cốt lõi.";
          trophy = "👍";
        } else {
          msg = "Hãy nghe lại các đường cong cao độ ở Tab 1 và làm lại để tai nghe nhạy bén hơn nhé!";
          trophy = "💪";
        }

        container.innerHTML = `
          <div class="quiz-intonation-wrapper">
            <div class="quiz-int-card quiz-result-modal-card">
              <div class="quiz-trophy-emoji">${trophy}</div>
              <h2 style="font-family:var(--font-heading); font-size:1.6rem; font-weight:800; color:var(--text-main); margin-bottom:8px;">
                Hoàn Thành Bài Luyện Tai Nghe Ngữ Điệu!
              </h2>
              <div class="quiz-final-score">${this.quizScore} / ${total} Đúng (${pct}%)</div>
              <p style="font-size:0.92rem; color:#475569; max-width:480px; margin:0 auto 24px; line-height:1.5;">
                ${msg}
              </p>
              <button class="btn-quiz-next" style="margin:0 auto;" onclick="IntonationManager.resetQuiz()">
                <span>🔄</span> Làm Lại Bài Trắc Nghiệm
              </button>
            </div>
          </div>
        `;
        return;
      }

      const q = quizList[this.quizIndex];

      let html = `
        <div class="quiz-intonation-wrapper">
          <!-- Score Bar -->
          <div class="quiz-score-bar">
            <div class="quiz-progress-pill">
              Câu hỏi ${this.quizIndex + 1} / ${total}
            </div>
            <div style="font-weight:700; font-size:0.88rem; color:#0284C7;">
              Điểm: ${this.quizScore} / ${this.quizIndex}
            </div>
            <div class="quiz-streak-pill">
              🔥 Chuỗi: ${this.quizStreak}
            </div>
          </div>

          <!-- Question Card -->
          <div class="quiz-int-card">
            <span class="quiz-category-tag">${q.category}</span>
            <div class="quiz-question-title">${q.question}</div>

            <!-- Audio Buttons Box -->
            <div class="quiz-audio-trigger-box">
              <button class="btn-quiz-large-play" onclick="IntonationManager.playQuizAudio(this)">
                <span>🔊</span> Nghe Giọng Bản Xứ
              </button>
      `;

      if (q.targetTone && ["fall", "rise", "fall_rise", "rise_fall", "level"].includes(q.targetTone)) {
        html += `
          <button class="btn-quiz-contour-play" onclick="AudioEngine.playPitchContour('${q.targetTone}', this)" title="Nghe mô phỏng sóng cao độ âm học">
            <span>🎵</span> Nghe Đường Cao Độ (Contour)
          </button>
        `;
      }

      html += `
            </div>

            <!-- 4 Options -->
            <div class="quiz-options-grid">
      `;

      q.options.forEach((opt, optIdx) => {
        let optClass = "";
        let disabledAttr = this.quizAnswered ? "disabled" : "";
        if (this.quizAnswered) {
          if (opt.isCorrect) optClass = "correct";
          else if (this.selectedOptIdx === optIdx) optClass = "incorrect";
        }

        html += `
          <button class="quiz-opt-btn ${optClass}" ${disabledAttr} onclick="IntonationManager.handleQuizAnswer(${optIdx})">
            <div class="quiz-opt-marker">${String.fromCharCode(65 + optIdx)}</div>
            <div>${opt.text}</div>
          </button>
        `;
      });

      html += `</div>`;

      // Feedback Box if answered
      if (this.quizAnswered) {
        const isCorrect = q.options[this.selectedOptIdx] && q.options[this.selectedOptIdx].isCorrect;
        html += `
          <div class="quiz-feedback-box ${isCorrect ? "" : "is-wrong"}">
            <div class="quiz-fb-title">
              ${isCorrect ? "🎉 Chính Xác!" : "❌ Chưa Đúng Rối!"}
            </div>
            <div class="quiz-fb-desc">
              ${q.explanation}
            </div>
          </div>

          <div class="quiz-action-bar">
            <button class="btn-quiz-next" onclick="IntonationManager.nextQuizQuestion()">
              ${this.quizIndex + 1 === total ? "Xem Kết Quả 🏆" : "Câu Tiếp Theo ➔"}
            </button>
          </div>
        `;
      }

      html += `
          </div>
        </div>
      `;

      container.innerHTML = html;
    },

    handleQuizAnswer(optIdx) {
      if (this.quizAnswered) return;
      this.quizAnswered = true;
      this.selectedOptIdx = optIdx;

      const q = window.INTONATION_DATA.quiz[this.quizIndex];
      const isCorrect = q.options[optIdx] && q.options[optIdx].isCorrect;

      if (isCorrect) {
        this.quizScore++;
        this.quizStreak++;
        AudioEngine.playSfx("correct");
      } else {
        this.quizStreak = 0;
        AudioEngine.playSfx("incorrect");
      }

      this.render();
    },

    nextQuizQuestion() {
      this.quizIndex++;
      this.quizAnswered = false;
      this.selectedOptIdx = null;

      const total = window.INTONATION_DATA.quiz.length;
      if (this.quizIndex >= total) {
        AudioEngine.playSfx("complete");
      }

      this.render();
      window.scrollTo({ top: 300, behavior: "smooth" });
    },

    resetQuiz() {
      this.quizIndex = 0;
      this.quizScore = 0;
      this.quizStreak = 0;
      this.quizAnswered = false;
      this.selectedOptIdx = null;
      this.render();
    },

    // =======================================================================
    // CÁC HÀM PHÁT ÂM NGỮ ĐIỆU CHUYÊN SÂU (HỖ TRỢ 100% GOOGLE MEET TAB SHARING)
    // =======================================================================
    playToneExample(toneId, exIdx, btnEl) {
      const tone = window.INTONATION_DATA.tones.find(t => t.id === toneId);
      if (!tone || !tone.examples[exIdx]) return;
      const ex = tone.examples[exIdx];
      const audioUrl = ex.audioUrl || `audio/intonation/tone_${tone.id}_ex_${exIdx}.mp3`;
      const textToSpeak = ex.speechText || ex.en;
      const pitch = (ex.speechPitch !== undefined) ? ex.speechPitch : tone.speechPitch;
      const rate = ex.speechRate || 0.90;
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, pitch, rate, btnEl);
    },

    playToneDialogue(toneId, lineIdx, btnEl) {
      const tone = window.INTONATION_DATA.tones.find(t => t.id === toneId);
      if (!tone || !tone.realLifeDialogue || !tone.realLifeDialogue.lines[lineIdx]) return;
      const line = tone.realLifeDialogue.lines[lineIdx];
      const audioUrl = line.audioUrl || `audio/intonation/tone_${tone.id}_dial_${lineIdx}.mp3`;
      const textToSpeak = line.speechText || line.en;
      const pitch = line.speechPitch !== undefined ? line.speechPitch : (tone.speechPitch || 1.0);
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, pitch, 0.90, btnEl);
    },

    playRuleExample(ruleId, exIdx, btnEl) {
      const rule = window.INTONATION_DATA.rules.find(r => r.id === ruleId);
      if (!rule || !rule.examples[exIdx]) return;
      const ex = rule.examples[exIdx];
      const audioUrl = ex.audioUrl || `audio/intonation/rule_${rule.id}_ex_${exIdx}.mp3`;
      const textToSpeak = ex.speechText || ex.en;
      const pitch = (ex.speechPitch !== undefined) ? ex.speechPitch : 1.0;
      const rate = ex.speechRate || 0.90;
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, pitch, rate, btnEl);
    },

    playRuleDialogue(ruleId, lineIdx, btnEl) {
      const rule = window.INTONATION_DATA.rules.find(r => r.id === ruleId);
      if (!rule || !rule.contextualDialogue || !rule.contextualDialogue.lines[lineIdx]) return;
      const line = rule.contextualDialogue.lines[lineIdx];
      const audioUrl = line.audioUrl || `audio/intonation/rule_${rule.id}_dial_${lineIdx}.mp3`;
      const textToSpeak = line.speechText || line.en;
      const pitch = line.speechPitch !== undefined ? line.speechPitch : 1.0;
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, pitch, 0.90, btnEl);
    },

    playAttitudeExample(word, toneType, btnEl) {
      const wordObj = window.INTONATION_DATA.attitudes.find(a => a.word === word);
      if (!wordObj) return;
      const variation = wordObj.variations.find(v => v.tone === toneType);
      if (!variation) return;
      const wSafe = word.toLowerCase().replace(/[^a-z0-9]/g, "_");
      const audioUrl = variation.audioUrl || `audio/intonation/att_${wSafe}_${variation.tone}.mp3`;
      const textToSpeak = variation.speechText || word;
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, variation.speechPitch, variation.speechRate || 0.90, btnEl);
    },

    playNucleusExample(wordIdx, btnEl) {
      const demo = window.INTONATION_DATA.nucleusShiftDemo;
      const w = demo.words[wordIdx];
      if (!w) return;
      const audioUrl = w.audioUrl || `audio/intonation/nucleus_${wordIdx}.mp3`;
      const textToSpeak = w.speechText || "I didn't take your book.";
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, w.speechPitch, 0.90, btnEl);
    },

    playQuizAudio(btnEl) {
      const q = window.INTONATION_DATA.quiz[this.quizIndex];
      if (!q) return;
      const audioUrl = q.audioUrl || `audio/intonation/quiz_${q.id}.mp3`;
      const textToSpeak = q.speechText || q.audioText;
      AudioEngine.playIntonationAudio(audioUrl, textToSpeak, q.speechPitch || 1.0, 0.90, btnEl);
    },

    playLinkingItem(typeNum, exIdx, btnEl) {
      const data = window.INTONATION_DATA && window.INTONATION_DATA.linkingContractions;
      if (!data || !data.linkingTypes) return;
      const type = data.linkingTypes.find(t => t.num === typeNum);
      if (!type || !type.examples[exIdx]) return;
      const ex = type.examples[exIdx];
      const audioUrl = ex.audioUrl || `audio/intonation/link_${typeNum}_${exIdx}.mp3`;
      AudioEngine.playIntonationAudio(audioUrl, ex.speechText, 1.0, 0.88, btnEl);
    },

    playContraction(groupId, itemIdx, btnEl) {
      const data = window.INTONATION_DATA && window.INTONATION_DATA.linkingContractions;
      if (!data || !data.contractions) return;
      const group = data.contractions.find(g => g.id === groupId);
      if (!group || !group.items[itemIdx]) return;
      const item = group.items[itemIdx];
      const audioUrl = item.audioUrl || `audio/intonation/cont_${groupId}_${itemIdx}.mp3`;
      AudioEngine.playIntonationAudio(audioUrl, item.speechText, 1.0, 0.88, btnEl);
    },

    playPausingSentence(sentIdx, btnEl) {
      const data = window.INTONATION_DATA && window.INTONATION_DATA.pausingChunking;
      if (!data || !data.section2 || !data.section2.sentences) return;
      const sent = data.section2.sentences[sentIdx];
      if (!sent) return;
      const audioUrl = sent.audioUrl || `audio/intonation/pause_trans_${sentIdx}.mp3`;
      AudioEngine.playIntonationAudio(audioUrl, sent.speechText, 1.0, 0.88, btnEl);
    },

    playDialogueLine(speechText, pitch, rate, btnEl) {
      if (!speechText) return;
      AudioEngine.playIntonationAudio(null, speechText, pitch || 1.0, rate || 0.90, btnEl);
    },

    selectPractice(practiceId) {
      this.selectedPracticeId = practiceId;
      this.stopExamTimer();
      this.render();
    },

    setPracticeMode(mode) {
      this.practiceMode = mode;
      this.render();
    },

    formatTimerTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    },

    startExamTimer(type, seconds = 45) {
      this.stopExamTimer();
      this.examTimerType = type;
      this.examTimerSecondsLeft = seconds;
      this.examTimerTotal = seconds;

      const displayEl = document.getElementById("examTimerDisplay");
      const statusEl = document.getElementById("examTimerStatus");
      const progressEl = document.getElementById("examTimerProgressBar");

      if (displayEl) {
        displayEl.textContent = this.formatTimerTime(seconds);
        displayEl.className = `exam-timer-clock ${type === 'prep' ? 'prep-mode' : 'speak-mode'}`;
      }
      if (statusEl) {
        statusEl.textContent = type === 'prep' 
          ? '⏳ Đang trong 45s CHUẨN BỊ (Lướt mắt, gạch chân từ khó)' 
          : '🎙️ Đang trong 45s ĐỌC TO (Nói to, rõ, dứt khoát)';
      }
      if (progressEl) {
        progressEl.style.width = '100%';
        progressEl.style.background = type === 'prep' ? '#F59E0B' : '#EF4444';
      }

      this.examTimerInterval = setInterval(() => {
        this.examTimerSecondsLeft--;
        if (this.examTimerSecondsLeft < 0) {
          this.stopExamTimer();
          const sEl = document.getElementById("examTimerStatus");
          if (sEl) {
            sEl.textContent = type === 'prep' 
              ? '🔔 HẾT 45S CHUẨN BỊ! Bấm "🎙️ 45s Đọc To" để ghi âm ngay!' 
              : '🎉 HOÀN THÀNH 45S ĐỌC TO! Bấm "▶️ Nghe Băng Gốc" để đối chiếu!';
          }
          if (window.AudioEngine && window.AudioEngine.playSfx) {
            window.AudioEngine.playSfx("correct");
          }
          return;
        }

        const disp = document.getElementById("examTimerDisplay");
        const prog = document.getElementById("examTimerProgressBar");
        if (disp) disp.textContent = this.formatTimerTime(this.examTimerSecondsLeft);
        if (prog) {
          const pct = (this.examTimerSecondsLeft / this.examTimerTotal) * 100;
          prog.style.width = `${pct}%`;
        }
      }, 1000);
    },

    stopExamTimer() {
      if (this.examTimerInterval) {
        clearInterval(this.examTimerInterval);
        this.examTimerInterval = null;
      }
      this.examTimerType = null;
      this.examTimerSecondsLeft = 45;
      this.examTimerTotal = 45;
      const displayEl = document.getElementById("examTimerDisplay");
      const statusEl = document.getElementById("examTimerStatus");
      const progressEl = document.getElementById("examTimerProgressBar");
      if (displayEl) {
        displayEl.textContent = "00:45";
        displayEl.className = "exam-timer-clock";
      }
      if (statusEl) {
        statusEl.textContent = "Đồng hồ bấm giờ mô phỏng phòng thi ETS";
      }
      if (progressEl) {
        progressEl.style.width = "100%";
        progressEl.style.background = "#CBD5E1";
      }
    },

    playPracticeSentence(practiceId, sentIdx, btnEl) {
      const data = window.INTONATION_DATA && window.INTONATION_DATA.toeicPractice;
      if (!data) return;
      const p = data.practices.find(item => item.id === practiceId);
      if (!p || !p.chunkedSentences[sentIdx]) return;
      const sent = p.chunkedSentences[sentIdx];
      const text = sent.speechText || sent.text.replace(/[↗↘|\/]/g, "").trim();
      AudioEngine.playIntonationAudio(null, text, 1.0, 0.90, btnEl);
    },

    playPracticeWord(word, btnEl) {
      if (!word) return;
      AudioEngine.playIntonationAudio(null, word, 1.0, 0.88, btnEl);
    }
  };
  window.IntonationManager = IntonationManager;

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
    } else if (state.currentView === "ipa_encoding") {
      // Phím Space để nghe phát âm từ khi không đang gõ text
      if (e.code === "Space" && document.activeElement !== document.getElementById("ipaEncodingInput")) {
        e.preventDefault();
        IpaEncodingManager.playAudio();
      } else if (e.code === "Space" && (e.ctrlKey || e.metaKey || e.altKey)) {
        e.preventDefault();
        IpaEncodingManager.playAudio();
      }
    }
  });

  // Khởi tạo app & giọng đọc & đăng nhập
  AudioEngine.init();
  DictationManager.init();
  IpaDecodingManager.init();
  IpaEncodingManager.init();
  IntonationManager.init();
  window.navigateTo("overview");
  AUTH.init();

});
