/**
 * PRONUNCIATION WITH MISS NGUYET — CHUYÊN ĐỀ NGỮ ĐIỆU (INTONATION DATA)
 * Biên soạn theo chuẩn Ngữ âm - Âm vị học Quốc tế (J.C. Wells, Peter Roach, David Crystal)
 * Tích hợp hệ thống phân đoạn âm điệu đa tầng (Prosodic Multi-Chunk Engine)
 * Đảm bảo lên giọng (↗) và xuống giọng (↘) chuẩn xác 100% tại từng từ khóa.
 */

window.INTONATION_DATA = {
  // =========================================================================
  // PHẦN 1: 5 CHUYỂN ĐỘNG CAO ĐỘ CỐT LÕI (5 CORE TONES)
  // =========================================================================
  tones: [
    {
      id: "fall",
      name: "Falling Tone (Giọng Xuống)",
      symbol: "↘",
      arrow: "↘",
      icon: "📉",
      tagColor: "blue",
      shortDesc: "Cao độ đổ dốc từ cao xuống thấp nhất",
      meaning: "Hoàn tất (Finality) • Chắc chắn (Certainty) • Dứt khoát (Definiteness)",
      detailedExplanation: "Cao độ bắt đầu từ mức trung bình hoặc cao rồi đổ dốc xuống mức thấp nhất của quãng giọng. Báo hiệu câu nói đã trọn vẹn và người nói hoàn toàn tự tin về thông tin mình cung cấp.",
      acousticCurve: [
        { x: 5, y: 20 },
        { x: 30, y: 25 },
        { x: 60, y: 45 },
        { x: 95, y: 80 }
      ],
      soundWaveId: "fall",
      audioFrequency: { start: 270, end: 125, duration: 0.5 },
      speechPitch: 0.92,
      examples: [
        {
          en: "I live in London.",
          vn: "Tôi sống ở London (Khẳng định chắc chắn).",
          ipa: "/aɪ lɪv ɪn ˈlʌndən ↘/",
          highlightWord: "London",
          prosodyChunks: [
            { text: "I live in", pitch: 1.06, rate: 0.95 },
            { text: "London.", pitch: 0.65, rate: 0.80 } // Rơi sâu ở từ cuối cùng
          ]
        },
        {
          en: "Stop it right now.",
          vn: "Dừng lại ngay lập tức (Mệnh lệnh dứt khoát).",
          ipa: "/stɒp ɪt raɪt naʊ ↘/",
          highlightWord: "now",
          prosodyChunks: [
            { text: "Stop it right", pitch: 1.10, rate: 0.92 },
            { text: "now.", pitch: 0.60, rate: 0.75 } // Mệnh lệnh dứt khoát hạ sâu
          ]
        },
        {
          en: "Where do you work?",
          vn: "Bạn làm việc ở đâu? (Câu hỏi Wh- chuẩn).",
          ipa: "/weə duː juː wɜːk ↘/",
          highlightWord: "work",
          prosodyChunks: [
            { text: "Where do you", pitch: 1.10, rate: 0.95 },
            { text: "work.", pitch: 0.65, rate: 0.78 } // Wh- bắt buộc hạ giọng ở cuối
          ]
        }
      ]
    },
    {
      id: "rise",
      name: "Rising Tone (Giọng Lên)",
      symbol: "↗",
      arrow: "↗",
      icon: "📈",
      tagColor: "green",
      shortDesc: "Cao độ vút từ thấp/trung bình lên cao dần",
      meaning: "Chưa hoàn tất (Non-finality) • Nghi vấn / Thăm dò (Inquiry) • Mời gọi phản hồi",
      detailedExplanation: "Cao độ bắt đầu từ mức thấp hoặc trung bình rồi vút lên cao dần về cuối câu. Tạo cảm giác tò mò, mở lời, mời gọi người nghe trả lời, hoặc báo hiệu câu chuyện vẫn còn vế sau.",
      acousticCurve: [
        { x: 5, y: 78 },
        { x: 35, y: 65 },
        { x: 65, y: 42 },
        { x: 95, y: 18 }
      ],
      soundWaveId: "rise",
      audioFrequency: { start: 135, end: 285, duration: 0.5 },
      speechPitch: 1.25,
      examples: [
        {
          en: "Are you ready?",
          vn: "Bạn đã sẵn sàng chưa? (Câu hỏi Yes/No).",
          ipa: "/ɑː juː ˈredi ↗/",
          highlightWord: "ready",
          prosodyChunks: [
            { text: "Are you", pitch: 0.95, rate: 0.95 },
            { text: "ready?", pitch: 1.55, rate: 0.90 } // Vút lên cao ở từ cuối
          ]
        },
        {
          en: "Excuse me?",
          vn: "Xin lỗi, bạn có thể nhắc lại được không? (Hỏi lại lịch sự).",
          ipa: "/ɪkˈskjuːz miː ↗/",
          highlightWord: "me",
          prosodyChunks: [
            { text: "Excuse", pitch: 0.95, rate: 0.95 },
            { text: "me?", pitch: 1.55, rate: 0.90 } // Hỏi lại lên giọng rõ ràng
          ]
        },
        {
          en: "Do you need any help?",
          vn: "Bạn có cần giúp gì không? (Thăm dò niềm nở).",
          ipa: "/duː juː niːd ˈeni help ↗/",
          highlightWord: "help",
          prosodyChunks: [
            { text: "Do you need any", pitch: 0.95, rate: 0.95 },
            { text: "help?", pitch: 1.55, rate: 0.90 } // Lên giọng câu hỏi Yes/No
          ]
        }
      ]
    },
    {
      id: "fall_rise",
      name: "Fall-Rise Tone (Xuống rồi Lên)",
      symbol: "↘↗",
      arrow: "↘↗",
      icon: "🎢",
      tagColor: "purple",
      shortDesc: "Cao độ hạ xuống rồi lại móc ngược lên ở đuôi",
      meaning: "Dè dặt (Reservation) • Tương phản ngầm (Contrast) • Lịch sự / Giảm nhẹ",
      detailedExplanation: "Cao độ hạ xuống ở giữa âm tiết/từ trọng tâm rồi móc ngược lên ở cuối. Thể hiện ý 'Tôi đồng ý một phần nhưng vẫn còn băn khoăn', hoặc ngầm báo hiệu vế đối lập phía sau.",
      acousticCurve: [
        { x: 5, y: 25 },
        { x: 45, y: 78 },
        { x: 95, y: 32 }
      ],
      soundWaveId: "fall_rise",
      audioFrequency: { start: 240, mid: 140, end: 250, duration: 0.6 },
      speechPitch: 1.05,
      examples: [
        {
          en: "I like the color...",
          vn: "Tôi thích cái màu... (nhưng cái giá thì hơi đắt).",
          ipa: "/aɪ laɪk ðə ˈkʌlə ↘↗/",
          highlightWord: "color",
          prosodyChunks: [
            { text: "I like the", pitch: 1.0, rate: 0.95 },
            { text: "col-", pitch: 0.70, rate: 0.85, pauseAfter: 25 },
            { text: "or?", pitch: 1.48, rate: 0.88 } // Hạ ở col- và móc lên ở or?
          ]
        },
        {
          en: "She is very nice...",
          vn: "Cô ấy rất tốt bụng... (nhưng hơi khó tính).",
          ipa: "/ʃiː ɪz ˈveri naɪs ↘↗/",
          highlightWord: "nice",
          prosodyChunks: [
            { text: "She is very", pitch: 1.0, rate: 0.95 },
            { text: "ni-", pitch: 0.70, rate: 0.85, pauseAfter: 25 },
            { text: "ce?", pitch: 1.48, rate: 0.88 }
          ]
        },
        {
          en: "Be careful.",
          vn: "Hãy cẩn thận nhé (Lời nhắc nhở ân cần, mềm mỏng).",
          ipa: "/biː ˈkeəfl ↘↗/",
          highlightWord: "careful",
          prosodyChunks: [
            { text: "Be", pitch: 1.0, rate: 0.95 },
            { text: "care-", pitch: 0.70, rate: 0.85, pauseAfter: 25 },
            { text: "ful?", pitch: 1.45, rate: 0.88 }
          ]
        }
      ]
    },
    {
      id: "rise_fall",
      name: "Rise-Fall Tone (Lên rồi Xuống)",
      symbol: "↗↘",
      arrow: "↗↘",
      icon: "⚡",
      tagColor: "peach",
      shortDesc: "Cao độ vọt lên rất cao rồi đổ sập xuống",
      meaning: "Kinh ngạc tột độ (Surprise) • Ấn tượng mạnh (Approval) • Mỉa mai (Sarcasm)",
      detailedExplanation: "Cao độ vọt lên rất cao tạo một đỉnh nhọn rồi rơi thẳng đứng xuống mức rất thấp. Dùng khi người nói quá đỗi ngạc nhiên trước một tin tức chấn động, hoặc dùng để mỉa mai.",
      acousticCurve: [
        { x: 5, y: 75 },
        { x: 48, y: 15 },
        { x: 95, y: 80 }
      ],
      soundWaveId: "rise_fall",
      audioFrequency: { start: 160, peak: 330, end: 125, duration: 0.6 },
      speechPitch: 1.35,
      examples: [
        {
          en: "You won the lottery?!",
          vn: "Cậu trúng số độc đắc thật á?! (Kinh ngạc tột cùng).",
          ipa: "/juː wʌn ðə ˈlɒtəri ↗↘/",
          highlightWord: "lottery",
          prosodyChunks: [
            { text: "You won the", pitch: 1.05, rate: 0.95 },
            { text: "LOT-", pitch: 1.65, rate: 0.75, pauseAfter: 20 },
            { text: "tery!", pitch: 0.65, rate: 0.82 } // Vọt lên đỉnh rồi rơi tự do
          ]
        },
        {
          en: "Brilliant!",
          vn: "Quá tuyệt đỉnh! (Khen ngợi hết lời).",
          ipa: "/ˈbrɪljənt ↗↘/",
          highlightWord: "Brilliant",
          prosodyChunks: [
            { text: "BRIL-", pitch: 1.65, rate: 0.75, pauseAfter: 20 },
            { text: "liant!", pitch: 0.65, rate: 0.82 }
          ]
        },
        {
          en: "Is that really true?!",
          vn: "Chuyện đó có thật không đấy?! (Quá bất ngờ).",
          ipa: "/ɪz ðæt ˈrɪəli truː ↗↘/",
          highlightWord: "true",
          prosodyChunks: [
            { text: "Is that really", pitch: 1.05, rate: 0.95 },
            { text: "TRUE!", pitch: 1.60, rate: 0.75, pauseAfter: 20 },
            { text: "true.", pitch: 0.65, rate: 0.82 }
          ]
        }
      ]
    },
    {
      id: "level",
      name: "Level Tone (Giọng Bằng / Ngang)",
      symbol: "→",
      arrow: "→",
      icon: "➖",
      tagColor: "gray",
      shortDesc: "Cao độ giữ nguyên một mức phẳng, không đổi",
      meaning: "Do dự (Hesitation) • Suy nghĩ (Thinking aloud) • Máy móc / Vô cảm (Routine)",
      detailedExplanation: "Cao độ duy trì một đường ngang phẳng, không dịch chuyển lên hay xuống. Xuất hiện khi người nói đang ngẫm nghĩ tìm từ tiếp theo ('Well →, um →'), hoặc khi đọc danh sách điểm danh đều đều.",
      acousticCurve: [
        { x: 5, y: 48 },
        { x: 35, y: 48 },
        { x: 65, y: 48 },
        { x: 95, y: 48 }
      ],
      soundWaveId: "level",
      audioFrequency: { start: 195, end: 195, duration: 0.5 },
      speechPitch: 1.0,
      examples: [
        {
          en: "Well, let me see...",
          vn: "À thì... để tôi xem nào... (Đang suy nghĩ từ tiếp theo).",
          ipa: "/wel let miː siː →/",
          highlightWord: "see",
          prosodyChunks: [
            { text: "Well...", pitch: 0.95, rate: 0.75, pauseAfter: 200 },
            { text: "let me see...", pitch: 0.95, rate: 0.78 }
          ]
        },
        {
          en: "Number one, number two...",
          vn: "Số một, số hai... (Đọc điểm danh máy móc).",
          ipa: "/ˈnʌmbə wʌn → ˈnʌmbə tuː →/",
          highlightWord: "two",
          prosodyChunks: [
            { text: "Number one...", pitch: 0.95, rate: 0.80, pauseAfter: 150 },
            { text: "number two...", pitch: 0.95, rate: 0.80 }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 2: 8 QUY TẮC NGỮ PHÁP CỦA NGỮ ĐIỆU (GRAMMATICAL RULES)
  // =========================================================================
  rules: [
    {
      id: "rule_statements",
      num: 1,
      title: "Câu Trần Thuật (Statements)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Cực kỳ phổ biến",
      ruleSummary: "Đa số câu khẳng định và phủ định diễn tả sự thật, thông tin trọn vẹn đều hạ cao độ ở từ khóa cuối cùng.",
      diagram: "Statement ───────────↘ (Chắc chắn & Trọn vẹn)",
      formula: "[Chủ ngữ] + [Vị ngữ] + [Tân ngữ / Trạng từ ↘]",
      note: "Ngoại lệ: Nếu câu mang hàm ý dè dặt, chưa hoàn tất hoặc ngầm ám chỉ sự bất đồng ngầm, người bản xứ sẽ dùng điệu Xuống-Lên (Fall-Rise ↘↗).",
      examples: [
        {
          en: "She works as a software engineer.",
          vn: "Cô ấy làm kỹ sư phần mềm (Sự thật rõ ràng).",
          ipa: "/ʃiː wɜːks æz ə ˈsɒftweər ˌendʒɪˈnɪə ↘/",
          marked: "She works as a software <strong>ENGINEER</strong> ↘.",
          prosodyChunks: [
            { text: "She works as a software", pitch: 1.02, rate: 0.95 },
            { text: "engineer.", pitch: 0.68, rate: 0.80 } // engineer đổ dốc ↘
          ]
        },
        {
          en: "I don't think that's a good idea.",
          vn: "Tôi không nghĩ đó là một ý kiến hay.",
          ipa: "/aɪ dəʊnt θɪŋk ðæts ə ɡʊd aɪˈdɪə ↘/",
          marked: "I don't think that's a good <strong>IDEA</strong> ↘.",
          prosodyChunks: [
            { text: "I don't think that's a good", pitch: 1.02, rate: 0.95 },
            { text: "idea.", pitch: 0.68, rate: 0.80 }
          ]
        },
        {
          en: "I thought he was honest...",
          vn: "Tôi từng nghĩ anh ta thành thật... (Dè dặt, ngầm ý: hóa ra không phải).",
          ipa: "/aɪ θɔːt hiː wɒz ˈɒnɪst ↘↗/",
          marked: "I thought he was <strong>HONEST</strong> ↘↗...",
          prosodyChunks: [
            { text: "I thought he was", pitch: 1.0, rate: 0.95 },
            { text: "hon-", pitch: 0.72, rate: 0.85, pauseAfter: 20 },
            { text: "est?", pitch: 1.45, rate: 0.88 }
          ]
        }
      ]
    },
    {
      id: "rule_wh_questions",
      num: 2,
      title: "Câu Hỏi Wh- (Information Questions)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Dễ nhầm lẫn nhất",
      ruleSummary: "Câu hỏi bắt đầu bằng Who, What, Where, When, Why, Which, How có ngữ điệu CHUẨN LÀ HẠ GIỌNG ↘, không phải lên giọng!",
      diagram: "Wh- Word ───────────↘ (Yêu cầu thông tin cụ thể)",
      formula: "[Wh- Word] + [Trợ ĐT] + [S] + [V] ↘",
      note: "Phá bỏ ngộ nhận: Rất nhiều người Việt nghĩ 'câu hỏi là phải lên giọng'. Với câu hỏi Wh-, chỉ lên giọng nhẹ (↗) khi người nói muốn cực kỳ ân cần, niềm nở hoặc yêu cầu người nghe nhắc lại tên vì quên mất.",
      examples: [
        {
          en: "Where did you buy this jacket?",
          vn: "Bạn mua chiếc áo khoác này ở đâu vậy? (Câu hỏi Wh- chuẩn).",
          ipa: "/weə dɪd juː baɪ ðɪs ˈdʒækɪt ↘/",
          marked: "Where did you buy this <strong>JACKET</strong> ↘?",
          prosodyChunks: [
            { text: "Where did you buy this", pitch: 1.10, rate: 0.95 },
            { text: "jacket.", pitch: 0.65, rate: 0.78 } // jacket đổ dốc ↘
          ]
        },
        {
          en: "What time does the conference start?",
          vn: "Mấy giờ thì hội nghị bắt đầu?",
          ipa: "/wɒt taɪm dʌz ðə ˈkɒnfərəns stɑːt ↘/",
          marked: "What time does the conference <strong>START</strong> ↘?",
          prosodyChunks: [
            { text: "What time does the conference", pitch: 1.10, rate: 0.95 },
            { text: "start.", pitch: 0.65, rate: 0.78 }
          ]
        },
        {
          en: "What was your name again?",
          vn: "Tên bạn là gì nhỉ? (Hỏi lại thân thiện, xin lỗi vì quên tên).",
          ipa: "/wɒt wɒz jɔː neɪm əˈɡen ↗/",
          marked: "What was your name <strong>AGAIN</strong> ↗?",
          prosodyChunks: [
            { text: "What was your name", pitch: 0.98, rate: 0.95 },
            { text: "again?", pitch: 1.50, rate: 0.90 } // Ngoại lệ thân thiện: lên giọng
          ]
        }
      ]
    },
    {
      id: "rule_yes_no",
      num: 3,
      title: "Câu Hỏi Yes / No",
      tonePattern: "Lên giọng ở cuối câu (Rising ↗)",
      badge: "Quy tắc kinh điển",
      ruleSummary: "Câu hỏi bắt đầu bằng trợ động từ (Do, Does, Did, Are, Is, Have, Has, Can, Will, Would...) luôn lên giọng cao dần về cuối.",
      diagram: "Auxiliary + Subject ───────────↗ (Chờ đợi xác nhận)",
      formula: "[Trợ động từ] + [S] + [V] ↗",
      note: "Mục đích là biểu thị tính chất thăm dò, nghi vấn: người nói chưa biết câu trả lời và cần người nghe xác nhận Đúng (Yes) hoặc Sai (No).",
      examples: [
        {
          en: "Do you live in New York?",
          vn: "Bạn có sống ở New York không?",
          ipa: "/duː juː lɪv ɪn njuː jɔːk ↗/",
          marked: "Do you live in New <strong>YORK</strong> ↗?",
          prosodyChunks: [
            { text: "Do you live in New", pitch: 0.96, rate: 0.95 },
            { text: "York?", pitch: 1.55, rate: 0.90 } // Vút lên ở York ↗
          ]
        },
        {
          en: "Have you finished your homework?",
          vn: "Con đã làm xong bài tập về nhà chưa?",
          ipa: "/hæv juː ˈfɪnɪʃt jɔː ˈhəʊmwɜːk ↗/",
          marked: "Have you finished your <strong>HOMEWORK</strong> ↗?",
          prosodyChunks: [
            { text: "Have you finished your", pitch: 0.96, rate: 0.95 },
            { text: "homework?", pitch: 1.52, rate: 0.90 }
          ]
        },
        {
          en: "Can you speak French?",
          vn: "Bạn có nói được tiếng Pháp không?",
          ipa: "/kæn juː spiːk frentʃ ↗/",
          marked: "Can you speak <strong>FRENCH</strong> ↗?",
          prosodyChunks: [
            { text: "Can you speak", pitch: 0.96, rate: 0.95 },
            { text: "French?", pitch: 1.55, rate: 0.90 }
          ]
        }
      ]
    },
    {
      id: "rule_choice",
      num: 4,
      title: "Câu Hỏi Lựa Chọn (Alternative Questions với 'OR')",
      tonePattern: "Vế 1 Lên (↗) — Vế cuối Xuống (↘)",
      badge: "Quy tắc 2 vế",
      ruleSummary: "Khi đưa ra các lựa chọn bằng liên từ 'or': Lên giọng ở lựa chọn thứ nhất (↗) và hạ giọng dứt khoát ở lựa chọn cuối cùng (↘).",
      diagram: "Option 1 ↗  or  Option 2 ↘ (Đóng danh sách lựa chọn)",
      formula: "[Lựa chọn 1 ↗] + or + [Lựa chọn 2 ↘]",
      note: "Cảnh báo ngữ nghĩa: Nếu bạn lên giọng ở cả hai vế ('coffee ↗ or tea ↗?'), câu sẽ biến thành câu hỏi Yes/No: 'Bạn có muốn uống thứ gì đó (như cà phê hay trà chẳng hạn) không?' chứ không phải bắt chọn 1 trong 2!",
      examples: [
        {
          en: "Would you prefer coffee or tea?",
          vn: "Bạn muốn dùng cà phê hay trà? (Chọn 1 trong 2).",
          ipa: "/wʊd juː prɪˈfɜː ˈkɒfi ↗ ɔː tiː ↘/",
          marked: "Would you prefer <strong>COFFEE</strong> ↗ or <strong>TEA</strong> ↘?",
          prosodyChunks: [
            { text: "Would you prefer", pitch: 1.0, rate: 0.95 },
            { text: "coffee?", pitch: 1.45, rate: 0.88, pauseAfter: 120 }, // Lên ở coffee ↗
            { text: "or tea.", pitch: 0.68, rate: 0.78 } // Xuống ở tea ↘
          ]
        },
        {
          en: "Are we traveling by train or by bus?",
          vn: "Chúng ta sẽ đi bằng tàu hỏa hay xe buýt?",
          ipa: "/ɑː wiː ˈtrævlɪŋ baɪ treɪn ↗ ɔː baɪ bʌs ↘/",
          marked: "Are we traveling by <strong>TRAIN</strong> ↗ or by <strong>BUS</strong> ↘?",
          prosodyChunks: [
            { text: "Are we traveling by", pitch: 1.0, rate: 0.95 },
            { text: "train?", pitch: 1.45, rate: 0.88, pauseAfter: 120 },
            { text: "or by bus.", pitch: 0.68, rate: 0.78 }
          ]
        }
      ]
    },
    {
      id: "rule_tag_questions",
      num: 5,
      title: "Câu Hỏi Đuôi (Tag Questions)",
      tonePattern: "Chắc chắn $\\rightarrow$ Xuống (↘) | Chưa chắc $\\rightarrow$ Lên (↗)",
      badge: "2 sắc thái tâm lý",
      ruleSummary: "Ngữ điệu của câu hỏi đuôi phản ánh chính xác mức độ tự tin của người nói.",
      diagram: "Chắc chắn: ──↘ (Đồng tình đi nào!) | Chưa chắc: ──↗ (Hỏi thật đấy!)",
      formula: "Câu kể + [Trợ ĐT + Đại từ ↘ hoặc ↗]",
      note: "• Nếu bạn biết chắc và chỉ cần người nghe gật đầu đồng tình: HẠ GIỌNG ↘.\n• Nếu bạn không chắc và muốn hỏi thật: LÊN GIỌNG ↗.",
      examples: [
        {
          en: "It's a beautiful day, isn't it?",
          vn: "Trời đẹp quá, đúng không nào? (Người nói biết chắc trời đang rất đẹp).",
          ipa: "/ɪts ə ˈbjuːtɪfl deɪ ˈɪznt ɪt ↘/",
          marked: "It's a beautiful day, isn't it ↘?",
          prosodyChunks: [
            { text: "It's a beautiful day,", pitch: 1.05, rate: 0.95, pauseAfter: 140 },
            { text: "isn't it.", pitch: 0.68, rate: 0.80 } // isn't it hạ giọng ↘
          ]
        },
        {
          en: "You haven't seen my keys, have you?",
          vn: "Cậu có thấy chìa khóa của tôi đâu không đấy? (Hỏi thật vì đang tìm chìa khóa).",
          ipa: "/juː hævnt siːn maɪ kiːz hæv juː ↗/",
          marked: "You haven't seen my keys, have you ↗?",
          prosodyChunks: [
            { text: "You haven't seen my keys,", pitch: 0.98, rate: 0.95, pauseAfter: 140 },
            { text: "have you?", pitch: 1.52, rate: 0.88 } // have you lên giọng ↗
          ]
        }
      ]
    },
    {
      id: "rule_commands_requests",
      num: 6,
      title: "Câu Mệnh Lệnh (Commands) vs Lời Yêu Cầu (Requests)",
      tonePattern: "Mệnh lệnh $\\rightarrow$ Xuống (↘) | Yêu cầu lịch sự $\\rightarrow$ Lên (↗) hoặc ↘↗",
      badge: "Sắc thái quyền uy vs Lịch sự",
      ruleSummary: "Mệnh lệnh dứt khoát hạ giọng để thể hiện thẩm quyền; Lời nhờ vả lịch sự lên giọng hoặc dùng Fall-Rise để giảm nhẹ độ áp đặt.",
      diagram: "Mệnh lệnh: ──↘ (Dứt khoát) | Yêu cầu: ──↗ hoặc ──↘↗ (Mềm mỏng)",
      formula: "Command: [V-inf ↘] | Request: [Could/Would you... ↗]",
      note: "Nếu nói 'Could you help me?' mà hạ giọng sâu ↘, câu sẽ nghe giống như một lời ra lệnh cộc cằn chứ không còn là lời nhờ vả lịch sự.",
      examples: [
        {
          en: "Open your books to page ten.",
          vn: "Mở sách ra trang số mười (Lời thầy cô ra lệnh trong lớp).",
          ipa: "/ˈəʊpən jɔː bʊks tuː peɪdʒ ten ↘/",
          marked: "Open your books to page <strong>TEN</strong> ↘.",
          prosodyChunks: [
            { text: "Open your books to page", pitch: 1.08, rate: 0.95 },
            { text: "ten.", pitch: 0.65, rate: 0.75 } // ten dứt khoát ↘
          ]
        },
        {
          en: "Could you please pass the salt?",
          vn: "Bạn làm ơn chuyển giúp tôi lọ muối được không? (Yêu cầu lịch sự).",
          ipa: "/kʊd juː pliːz pɑːs ðə sɔːlt ↗/",
          marked: "Could you please pass the <strong>SALT</strong> ↗?",
          prosodyChunks: [
            { text: "Could you please pass the", pitch: 1.0, rate: 0.95 },
            { text: "salt?", pitch: 1.50, rate: 0.90 } // salt lên giọng lịch sự ↗
          ]
        },
        {
          en: "Hold on a minute, please.",
          vn: "Làm ơn giữ máy một chút nhé (Lịch sự, nhẹ nhàng).",
          ipa: "/həʊld ɒn ə ˈmɪnɪt pliːz ↘↗/",
          marked: "Hold on a minute, <strong>PLEASE</strong> ↘↗.",
          prosodyChunks: [
            { text: "Hold on a", pitch: 1.0, rate: 0.95 },
            { text: "min-", pitch: 0.72, rate: 0.85, pauseAfter: 20 },
            { text: "-ute, please?", pitch: 1.42, rate: 0.88 }
          ]
        }
      ]
    },
    {
      id: "rule_lists",
      num: 7,
      title: "Ngữ Điệu Liệt Kê (List Intonation)",
      tonePattern: "Liệt kê đóng: A ↗, B ↗, and C ↘ | Liệt kê mở: A ↗, B ↗, C ↗...",
      badge: "Quy tắc vàng 100%",
      ruleSummary: "Khi liệt kê một chuỗi các danh từ/tính từ: Lên giọng nhẹ ở các mục phía trước để báo hiệu chưa hết, và HẠ GIỌNG DỨT KHOÁT ở mục cuối cùng sau 'and'.",
      diagram: "Item 1 ↗  ,  Item 2 ↗  ,  and  Item 3 ↘ (Đóng danh sách)",
      formula: "A ↗, B ↗, and C ↘",
      note: "Quy tắc này xuất hiện trong 100% các đề thi TOEIC Speaking Part 1 và giao tiếp đời thực. Nó báo cho người nghe biết chính xác khi nào danh sách kết thúc.",
      examples: [
        {
          en: "I bought some apples, oranges, bananas, and milk.",
          vn: "Tôi đã mua một ít táo, cam, chuối và sữa (Hết danh sách).",
          ipa: "/aɪ bɔːt səm ˈæplz ↗ ˈɒrɪndʒɪz ↗ bəˈnɑːnəz ↗ ənd mɪlk ↘/",
          marked: "I bought some <strong>APPLES</strong> ↗, <strong>ORANGES</strong> ↗, <strong>BANANAS</strong> ↗, and <strong>MILK</strong> ↘.",
          prosodyChunks: [
            { text: "I bought some", pitch: 1.0, rate: 0.95 },
            { text: "apples?", pitch: 1.38, rate: 0.88, pauseAfter: 100 }, // apples ↗
            { text: "oranges?", pitch: 1.42, rate: 0.88, pauseAfter: 100 }, // oranges ↗
            { text: "bananas?", pitch: 1.46, rate: 0.88, pauseAfter: 100 }, // bananas ↗
            { text: "and milk.", pitch: 0.65, rate: 0.78 } // milk hạ dốc ↘
          ]
        },
        {
          en: "We could visit London, Paris, Rome...",
          vn: "Chúng ta có thể ghé London, Paris, Rome... (Liệt kê mở: còn nhiều nơi nữa chưa kể).",
          ipa: "/wiː kʊd ˈvɪzɪt ˈlʌndən ↗ ˈpærɪs ↗ rəʊm ↗/",
          marked: "We could visit <strong>LONDON</strong> ↗, <strong>PARIS</strong> ↗, <strong>ROME</strong> ↗...",
          prosodyChunks: [
            { text: "We could visit", pitch: 1.0, rate: 0.95 },
            { text: "London?", pitch: 1.38, rate: 0.88, pauseAfter: 100 },
            { text: "Paris?", pitch: 1.42, rate: 0.88, pauseAfter: 100 },
            { text: "Rome?", pitch: 1.46, rate: 0.88 }
          ]
        }
      ]
    },
    {
      id: "rule_conditionals",
      num: 8,
      title: "Mệnh Đề Phụ Mở Đầu (Introductory & Dependent Clauses)",
      tonePattern: "Mệnh đề phụ Lên (↗ hoặc ↘↗) — Mệnh đề chính Xuống (↘)",
      badge: "Cấu trúc ghép câu",
      ruleSummary: "Khi mệnh đề phụ thuộc (chỉ điều kiện If, thời gian When, nhượng bộ Although...) đứng trước: Lên giọng nhẹ để nối sang mệnh đề chính rồi hạ giọng kết thúc.",
      diagram: "Dependent Clause ↗ / ↘↗  ,  Main Clause ───────────↘",
      formula: "[If / When / Although + Clause ↗] , [Main Clause ↘]",
      note: "Nếu đảo ngược lại (Mệnh đề chính đứng trước, mệnh đề phụ đứng sau), toàn bộ câu thường sẽ hạ giọng ↘ ở cuối câu.",
      examples: [
        {
          en: "If you study hard, you will pass the exam.",
          vn: "Nếu bạn học chăm chỉ, bạn sẽ đỗ kỳ thi.",
          ipa: "/ɪf juː ˈstʌdi hɑːd ↗ juː wɪl pɑːs ði ɪɡˈzæm ↘/",
          marked: "If you study <strong>HARD</strong> ↗, you will pass the <strong>EXAM</strong> ↘.",
          prosodyChunks: [
            { text: "If you study", pitch: 1.0, rate: 0.95 },
            { text: "hard?", pitch: 1.42, rate: 0.88, pauseAfter: 150 }, // hard ↗
            { text: "you will pass the", pitch: 1.02, rate: 0.95 },
            { text: "exam.", pitch: 0.68, rate: 0.78 } // exam ↘
          ]
        },
        {
          en: "Although it was raining, they still played football.",
          vn: "Mặc dù trời mưa, họ vẫn chơi bóng đá.",
          ipa: "/ɔːlˈðəʊ ɪt wɒz ˈreɪnɪŋ ↘↗ ðeɪ stɪl pleɪd ˈfʊtbɔːl ↘/",
          marked: "Although it was <strong>RAINING</strong> ↘↗, they still played <strong>FOOTBALL</strong> ↘.",
          prosodyChunks: [
            { text: "Although it was", pitch: 1.0, rate: 0.95 },
            { text: "rain-", pitch: 0.72, rate: 0.85, pauseAfter: 20 },
            { text: "-ing?", pitch: 1.45, rate: 0.88, pauseAfter: 150 },
            { text: "they still played", pitch: 1.02, rate: 0.95 },
            { text: "football.", pitch: 0.68, rate: 0.78 }
          ]
        },
        {
          en: "Before you leave, please turn off the lights.",
          vn: "Trước khi rời đi, xin vui lòng tắt đèn.",
          ipa: "/bɪˈfɔː juː liːv ↗ pliːz tɜːn ɒf ðə laɪts ↘/",
          marked: "Before you <strong>LEAVE</strong> ↗, please turn off the <strong>LIGHTS</strong> ↘.",
          prosodyChunks: [
            { text: "Before you", pitch: 1.0, rate: 0.95 },
            { text: "leave?", pitch: 1.42, rate: 0.88, pauseAfter: 150 },
            { text: "please turn off the", pitch: 1.02, rate: 0.95 },
            { text: "lights.", pitch: 0.68, rate: 0.78 }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 3: PHÒNG THÍ NGHIỆM THÁI ĐỘ (ATTITUDINAL LAB)
  // Cùng 1 từ biến đổi ý nghĩa 180 độ theo cao độ
  // =========================================================================
  attitudes: [
    {
      word: "Really",
      ipa: "/ˈrɪəli/",
      theme: "Từ vựng bộc lộ sự thật và hoài nghi",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Đồng tình / Khẳng định chắc chắn",
          vnMeaning: "Quả đúng như vậy / Tôi hoàn toàn tin điều đó.",
          context: "A: 'Trời hôm nay lạnh thật đấy!' — B: 'Really ↘.'",
          speechPitch: 0.75,
          speechRate: 0.82,
          prosodyChunks: [
            { text: "Really.", pitch: 0.65, rate: 0.75 } // Trầm dứt khoát
          ]
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Tò mò / Hoài nghi nhẹ",
          vnMeaning: "Thật thế sao? Cậu nói nghiêm túc đấy chứ?",
          context: "A: 'Tôi vừa gặp giám đốc ở siêu thị.' — B: 'Really ↗?'",
          speechPitch: 1.45,
          speechRate: 0.95,
          prosodyChunks: [
            { text: "Really?", pitch: 1.58, rate: 0.95 } // Vút cao nghi vấn
          ]
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Kinh ngạc tột độ / Không tin nổi",
          vnMeaning: "Trời đất ơi, không thể tin nổi!",
          context: "A: 'Anh ấy vừa trúng số 10 tỷ!' — B: 'Really ↗↘?!'",
          speechPitch: 1.55,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "REAL-", pitch: 1.68, rate: 0.72, pauseAfter: 20 },
            { text: "LY!", pitch: 0.62, rate: 0.78 } // Vọt đỉnh rồi rơi sập
          ]
        },
        {
          tone: "level",
          symbol: "→",
          meaning: "Thờ ơ / Chán chường",
          vnMeaning: "Ừ, thế à... (Chẳng mấy quan tâm).",
          context: "A: 'Hôm nay tớ lại mua thêm đôi giày.' — B: 'Really →...'",
          speechPitch: 0.95,
          speechRate: 0.80,
          prosodyChunks: [
            { text: "Really...", pitch: 0.95, rate: 0.75 } // Bằng phẳng vô cảm
          ]
        }
      ]
    },
    {
      word: "Excuse me",
      ipa: "/ɪkˈskjuːz miː/",
      theme: "Từ vựng xin lỗi, hỏi lại và phản ứng",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Xin lỗi chân thành sau va chạm",
          vnMeaning: "Thành thật xin lỗi vì tôi đã va phải bạn / làm phiền bạn.",
          context: "Khi bạn vô tình dẫm vào chân người khác trên xe buýt: 'Excuse me ↘.'",
          speechPitch: 0.75,
          speechRate: 0.82,
          prosodyChunks: [
            { text: "Excuse me.", pitch: 0.68, rate: 0.78 }
          ]
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Hỏi lại lịch sự khi nghe không rõ",
          vnMeaning: "Xin lỗi, bạn có thể nói lại điều vừa rồi được không?",
          context: "Khi người đối diện nói quá nhỏ trong quán cà phê: 'Excuse me ↗?'",
          speechPitch: 1.45,
          speechRate: 0.95,
          prosodyChunks: [
            { text: "Excuse me?", pitch: 1.55, rate: 0.95 }
          ]
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Phẫn nộ / Bị xúc phạm",
          vnMeaning: "Này, bạn vừa nói cái quái gì thế hả?!",
          context: "Khi ai đó xúc phạm hoặc chen ngang hàng thô lỗ: 'Excuse me ↗↘?!'",
          speechPitch: 1.55,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "EXCUSE", pitch: 1.65, rate: 0.72, pauseAfter: 20 },
            { text: "me?!", pitch: 0.65, rate: 0.78 }
          ]
        }
      ]
    },
    {
      word: "Hello",
      ipa: "/həˈləʊ/",
      theme: "Lời chào hỏi và thái độ giao tiếp",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Trang trọng / Xa cách",
          vnMeaning: "Chào bạn (Nghiêm túc, trang trọng trong công việc).",
          context: "Gặp đối tác cấp cao trong phòng họp: 'Hello ↘.'",
          speechPitch: 0.75,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "Hello.", pitch: 0.68, rate: 0.78 }
          ]
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Thân thiện / Vui tươi / Cởi mở",
          vnMeaning: "Chào bạn nhé! (Ấm áp, sẵn sàng trò chuyện).",
          context: "Gặp bạn bè thân hoặc đón khách hàng vào quầy: 'Hello ↗!'",
          speechPitch: 1.45,
          speechRate: 0.95,
          prosodyChunks: [
            { text: "Hello?", pitch: 1.52, rate: 0.95 }
          ]
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Gọi với / Mỉa mai ai đang lơ đễnh",
          vnMeaning: "Có ai ở nhà không? / Tỉnh lại đi xem nào!",
          context: "Gõ cửa căn phòng vắng hoặc gọi người bạn đang ngồi mơ màng: 'Hello ↗↘?!'",
          speechPitch: 1.55,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "HEL-", pitch: 1.65, rate: 0.72, pauseAfter: 20 },
            { text: "-lo?!", pitch: 0.65, rate: 0.78 }
          ]
        }
      ]
    },
    {
      word: "Right",
      ipa: "/raɪt/",
      theme: "Xác nhận, khuyến khích và phản biện",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Xác nhận đúng / Hoàn toàn đồng ý",
          vnMeaning: "Chính xác / Tôi đồng ý.",
          context: "A: 'Cuộc họp lúc 9 giờ đúng không?' — B: 'Right ↘.'",
          speechPitch: 0.75,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "Right.", pitch: 0.68, rate: 0.78 }
          ]
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Khuyến khích nói tiếp",
          vnMeaning: "Hiểu rồi, bạn nói tiếp đi xem nào.",
          context: "Lắng nghe đồng nghiệp thuyết trình dự án: 'Right ↗, go on.'",
          speechPitch: 1.45,
          speechRate: 0.95,
          prosodyChunks: [
            { text: "Right?", pitch: 1.52, rate: 0.95 }
          ]
        },
        {
          tone: "fall_rise",
          symbol: "↘↗",
          meaning: "Đồng ý dè dặt / Sắp phản bác",
          vnMeaning: "Đúng rồi đấy... nhưng mà...",
          context: "A: 'Giải pháp này tiết kiệm nhất.' — B: 'Right ↘↗... but it takes too long.'",
          speechPitch: 1.05,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "Ri-", pitch: 0.70, rate: 0.80, pauseAfter: 20 },
            { text: "-ght?", pitch: 1.48, rate: 0.85 }
          ]
        }
      ]
    },
    {
      word: "Thank you",
      ipa: "/ˈθæŋk juː/",
      theme: "Lời cảm ơn và tầng sâu cảm xúc",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Cảm ơn chân thành, trang trọng",
          vnMeaning: "Tôi chân thành cảm kích sự giúp đỡ quý báu của bạn.",
          context: "Sau khi nhận được sự giúp đỡ to lớn từ một người bạn: 'Thank you ↘.'",
          speechPitch: 0.75,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "Thank you.", pitch: 0.68, rate: 0.78 }
          ]
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Lịch sự thông thường hàng ngày",
          vnMeaning: "Cảm ơn bạn nhé (Nhẹ nhàng, khi nhận tiền thối hoặc giữ cửa).",
          context: "Nhân viên thu ngân thối tiền thừa cho bạn: 'Thank you ↗.'",
          speechPitch: 1.45,
          speechRate: 0.95,
          prosodyChunks: [
            { text: "Thank you?", pitch: 1.52, rate: 0.95 }
          ]
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Mỉa mai / Bực tức",
          vnMeaning: "Cảm ơn cậu nhiều nhé! (Mỉa mai vì bị làm phiền/làm hỏng việc).",
          context: "Ai đó vô ý làm đổ tách cà phê lên tài liệu của bạn: 'Thank you ↗↘!'",
          speechPitch: 1.55,
          speechRate: 0.85,
          prosodyChunks: [
            { text: "THANK", pitch: 1.65, rate: 0.72, pauseAfter: 20 },
            { text: "you!", pitch: 0.65, rate: 0.78 }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 4: 4 CHỨC NĂNG CỦA NGỮ ĐIỆU (FUNCTIONS OF INTONATION)
  // =========================================================================
  functions: [
    {
      id: "attitudinal",
      title: "1. Chức Năng Biểu Cảm & Thái Độ (Attitudinal)",
      icon: "🎭",
      desc: "Ngữ điệu bộc lộ cảm xúc chủ quan của người nói: vui tươi, giận dữ, hoài nghi, mỉa mai, nghiêm túc hay thờ ơ.",
      keyTakeaway: "Lời nói giống như 'lời ca', còn ngữ điệu chính là 'giai điệu'. Cùng một câu chữ nhưng giai điệu vui sẽ mang ý vui, giai điệu mỉa mai sẽ biến lời khen thành lời chê trách."
    },
    {
      id: "grammatical",
      title: "2. Chức Năng Ngữ Pháp (Grammatical)",
      icon: "📐",
      desc: "Ngữ điệu giúp người nghe phân biệt loại câu và cấu trúc ngữ pháp mà trong văn viết cần đến dấu câu.",
      keyTakeaway: "Phân biệt câu kể (↘) với câu hỏi (↗); phân biệt mệnh đề quan hệ xác định (đọc liền mạch) với không xác định (ngắt thành các đơn vị ngữ điệu độc lập)."
    },
    {
      id: "accentual",
      title: "3. Chức Năng Tiêu Điểm / Nhấn Trọng Tâm (Accentual / Focus)",
      icon: "🎯",
      desc: "Vị trí đặt Hạt nhân ngữ điệu (Nucleus / Tonic Syllable) quyết định thông tin nào là Mới (New) hoặc Cần Tương Phản (Contrastive).",
      keyTakeaway: "Thí nghiệm kinh điển với câu 'I didn't take your book' chứng minh việc dịch chuyển Nucleus sang từ nào sẽ làm thay đổi hoàn toàn hàm ý đối lập của câu đó."
    },
    {
      id: "discourse",
      title: "4. Chức Năng Diễn Ngôn & Điều Tiết Hội Thoại (Discourse)",
      icon: "💬",
      desc: "Ngữ điệu đóng vai trò là 'đèn tín hiệu giao thông' điều tiết cuộc hội thoại giữa hai người.",
      keyTakeaway: "Hạ giọng sâu (↘) báo hiệu 'Tôi đã nói xong, mời bạn tiếp lời' (Turn-yielding); giữ giọng ngang (→) báo hiệu 'Đợi chút, tôi chưa nói xong' (Turn-holding)."
    }
  ],

  // Thí nghiệm Nucleus Shift với câu: "I didn't take your book"
  nucleusShiftDemo: {
    baseSentence: "I didn't take your book.",
    words: [
      {
        word: "I",
        ipa: "/aɪ/",
        meaning: "NGƯỜI KHÁC lấy, KHÔNG PHẢI TÔI!",
        explanation: "Nhấn mạnh chủ ngữ 'I' để phủ nhận sự can dự của bản thân, ngầm ám chỉ có người khác trong phòng đã lấy.",
        speechPitch: 1.35,
        prosodyChunks: [
          { text: "I!", pitch: 1.60, rate: 0.68, volume: 1.0, pauseAfter: 60 }, // "I" nổi bật, to, cao, kéo dài
          { text: "didn't take your book.", pitch: 0.78, rate: 1.12, volume: 0.50 } // các từ sau đọc lướt, nhỏ, hạ thấp
        ]
      },
      {
        word: "DIDN'T",
        ipa: "/ˈdɪdnt/",
        meaning: "Tôi TUYỆT ĐỐI KHÔNG làm việc đó!",
        explanation: "Nhấn mạnh sự phủ định tuyệt đối. Bác bỏ hoàn toàn cáo buộc của người nghe.",
        speechPitch: 1.3,
        prosodyChunks: [
          { text: "I", pitch: 0.88, rate: 1.12, volume: 0.50 },
          { text: "DIDN'T!", pitch: 1.60, rate: 0.68, volume: 1.0, pauseAfter: 50 }, // Nhấn mạnh gắt ở DIDN'T
          { text: "take your book.", pitch: 0.78, rate: 1.12, volume: 0.50 }
        ]
      },
      {
        word: "TAKE",
        ipa: "/teɪk/",
        meaning: "Tôi chỉ MƯỢN/CẦM HỘ thôi, không phải LẤY CẮP!",
        explanation: "Nhấn mạnh hành động: tôi có cầm cuốn sách nhưng không phải với ý định chiếm đoạt.",
        speechPitch: 1.25,
        prosodyChunks: [
          { text: "I didn't", pitch: 0.88, rate: 1.12, volume: 0.50 },
          { text: "TAKE!", pitch: 1.55, rate: 0.68, volume: 1.0, pauseAfter: 50 }, // Nhấn mạnh ở TAKE
          { text: "your book.", pitch: 0.78, rate: 1.12, volume: 0.50 }
        ]
      },
      {
        word: "YOUR",
        ipa: "/jɔː/",
        meaning: "Tôi lấy sách của NGƯỜI KHÁC, KHÔNG PHẢI CỦA BẠN!",
        explanation: "Tương phản quyền sở hữu: Cuốn sách tôi lấy là của John hoặc của thư viện, không phải của bạn.",
        speechPitch: 1.3,
        prosodyChunks: [
          { text: "I didn't take", pitch: 0.88, rate: 1.12, volume: 0.50 },
          { text: "YOUR!", pitch: 1.60, rate: 0.68, volume: 1.0, pauseAfter: 50 }, // Nhấn mạnh ở YOUR
          { text: "book.", pitch: 0.78, rate: 1.12, volume: 0.50 }
        ]
      },
      {
        word: "BOOK",
        ipa: "/bʊk/",
        meaning: "Tôi lấy THỨ KHÁC (cây bút, máy tính), CHỨ KHÔNG PHẢI CUỐN SÁCH!",
        explanation: "Tương phản đồ vật: Thứ bạn bị mất là đồ vật khác, còn cuốn sách vẫn còn nguyên đó.",
        speechPitch: 1.25,
        prosodyChunks: [
          { text: "I didn't take your", pitch: 0.88, rate: 1.12, volume: 0.50 },
          { text: "BOOK.", pitch: 1.48, rate: 0.75, volume: 1.0 } // Nhấn mạnh ở BOOK
        ]
      }
    ]
  },

  // =========================================================================
  // PHẦN 5: 15 CÂU TRẮC NGHIỆM LUYỆN TAI NHẬN DIỆN CAO ĐỘ (EAR TRAINING QUIZ)
  // =========================================================================
  quiz: [
    {
      id: 1,
      type: "tone_id",
      category: "Nhận diện Cao độ",
      audioText: "She lives in California.",
      targetTone: "fall",
      speechPitch: 0.9,
      prosodyChunks: [
        { text: "She lives in", pitch: 1.05, rate: 0.95 },
        { text: "California.", pitch: 0.65, rate: 0.78 } // Rơi sâu ↘
      ],
      question: "Lắng nghe câu khẳng định sau và xác định hướng ngữ điệu ở cuối câu:",
      options: [
        { text: "Falling ↘ (Giọng Xuống)", isCorrect: true },
        { text: "Rising ↗ (Giọng Lên)", isCorrect: false },
        { text: "Fall-Rise ↘↗ (Xuống rồi Lên)", isCorrect: false },
        { text: "Level → (Giọng Ngang)", isCorrect: false }
      ],
      explanation: "'She lives in California.' là câu trần thuật khẳng định sự thật hoàn chỉnh, cao độ hạ dốc dứt khoát ở từ 'California' (Falling ↘)."
    },
    {
      id: 2,
      type: "tone_id",
      category: "Nhận diện Cao độ",
      audioText: "Are you coming to the party?",
      targetTone: "rise",
      speechPitch: 1.3,
      prosodyChunks: [
        { text: "Are you coming to the", pitch: 0.96, rate: 0.95 },
        { text: "party?", pitch: 1.55, rate: 0.88 } // Vút lên cao ↗
      ],
      question: "Lắng nghe câu hỏi sau và chọn ký hiệu ngữ điệu chuẩn xác:",
      options: [
        { text: "Falling ↘ (Giọng Xuống)", isCorrect: false },
        { text: "Rising ↗ (Giọng Lên)", isCorrect: true },
        { text: "Rise-Fall ↗↘ (Lên rồi Xuống)", isCorrect: false },
        { text: "Level → (Giọng Ngang)", isCorrect: false }
      ],
      explanation: "Đây là câu hỏi Yes/No bắt đầu bằng trợ động từ 'Are you...', theo quy tắc ngữ âm bắt buộc phải LÊN GIỌNG (Rising ↗) ở cuối câu để thăm dò câu trả lời."
    },
    {
      id: 3,
      type: "attitude",
      category: "Phân tích Thái độ",
      audioText: "Really?!",
      targetTone: "rise_fall",
      speechPitch: 1.45,
      prosodyChunks: [
        { text: "REAL-", pitch: 1.68, rate: 0.72, pauseAfter: 20 },
        { text: "LY!", pitch: 0.62, rate: 0.78 } // Vọt đỉnh rồi rơi sập ↗↘
      ],
      question: "Lắng nghe từ 'Really?!' sau đây và cho biết người nói đang thể hiện cảm xúc gì:",
      options: [
        { text: "Đồng tình nghiêm túc, khẳng định sự thật", isCorrect: false },
        { text: "Kinh ngạc tột độ / Bất ngờ lớn (Surprise)", isCorrect: true },
        { text: "Thờ ơ, chán chường, chẳng quan tâm", isCorrect: false },
        { text: "Xin lỗi chân thành sau va chạm", isCorrect: false }
      ],
      explanation: "Từ 'Really' được phát âm với điệu Rise-Fall (↗↘: cao độ vút lên cực đỉnh rồi rơi thẳng đứng) bộc lộ sự sửng sốt, kinh ngạc tột bực trước một tin chấn động."
    },
    {
      id: 4,
      type: "rule",
      category: "Quy tắc Ngữ pháp",
      audioText: "What time does the train leave?",
      targetTone: "fall",
      speechPitch: 0.92,
      prosodyChunks: [
        { text: "What time does the train", pitch: 1.10, rate: 0.95 },
        { text: "leave.", pitch: 0.65, rate: 0.78 } // Wh- bắt buộc hạ giọng ↘
      ],
      question: "Câu hỏi 'What time does the train leave?' thuộc dạng câu hỏi Wh-. Ngữ điệu chuẩn bản xứ là gì?",
      options: [
        { text: "Luôn lên giọng (↗) vì đây là câu hỏi", isCorrect: false },
        { text: "Hạ giọng dứt khoát (↘) ở cuối câu", isCorrect: true },
        { text: "Giọng ngang bằng phẳng (→)", isCorrect: false },
        { text: "Xuống rồi lên (↘↗)", isCorrect: false }
      ],
      explanation: "Quy tắc vàng của câu hỏi Wh- (What, Where, When, Why, How) là HẠ GIỌNG ↘ ở cuối câu. Đây là bẫy phổ biến nhất của người học tiếng Anh."
    },
    {
      id: 5,
      type: "attitude",
      category: "Phân tích Thái độ",
      audioText: "Excuse me?",
      targetTone: "rise",
      speechPitch: 1.3,
      prosodyChunks: [
        { text: "Excuse me?", pitch: 1.55, rate: 0.95 }
      ],
      question: "Lắng nghe cụm từ 'Excuse me ↗' sau đây và xác định ngữ cảnh sử dụng phù hợp nhất:",
      options: [
        { text: "Xin lỗi vì vừa dẫm chân bạn trên xe buýt", isCorrect: false },
        { text: "Lịch sự nhờ người đối diện nhắc lại vì nghe không rõ", isCorrect: true },
        { text: "Quát mắng người chen hàng thô lỗ", isCorrect: false },
        { text: "Chào đối tác trang trọng trong phòng họp", isCorrect: false }
      ],
      explanation: "'Excuse me ↗' với điệu lên giọng nhẹ nhàng là cách nói lịch sự khi bạn muốn người đối diện lặp lại điều họ vừa nói."
    },
    {
      id: 6,
      type: "rule",
      category: "Quy tắc Liệt kê",
      audioText: "We need apples, oranges, and bananas.",
      targetTone: "list",
      speechPitch: 1.0,
      prosodyChunks: [
        { text: "We need", pitch: 1.0, rate: 0.95 },
        { text: "apples?", pitch: 1.38, rate: 0.88, pauseAfter: 100 }, // apples ↗
        { text: "oranges?", pitch: 1.42, rate: 0.88, pauseAfter: 100 }, // oranges ↗
        { text: "and bananas.", pitch: 0.65, rate: 0.78 } // bananas ↘
      ],
      question: "Trong câu liệt kê: 'We need apples, oranges, and bananas', mô hình ngữ điệu chuẩn là:",
      options: [
        { text: "apples ↗ , oranges ↗ , and bananas ↘", isCorrect: true },
        { text: "apples ↘ , oranges ↘ , and bananas ↗", isCorrect: false },
        { text: "apples ↗ , oranges ↗ , and bananas ↗", isCorrect: false },
        { text: "apples ↘ , oranges ↘ , and bananas ↘", isCorrect: false }
      ],
      explanation: "Quy tắc liệt kê đóng: Lên giọng nhẹ ở các mục phía trước (apples ↗, oranges ↗) để báo hiệu chưa hết, và HẠ GIỌNG DỨT KHOÁT ở mục cuối cùng (and bananas ↘) để báo danh sách đã đóng."
    },
    {
      id: 7,
      type: "rule",
      category: "Câu hỏi Đuôi",
      audioText: "You're a student, aren't you?",
      targetTone: "fall",
      speechPitch: 0.9,
      prosodyChunks: [
        { text: "You're a student,", pitch: 1.05, rate: 0.95, pauseAfter: 140 },
        { text: "aren't you.", pitch: 0.68, rate: 0.80 } // aren't you ↘
      ],
      question: "Nếu người nói BIẾT CHẮC người nghe là học sinh và chỉ muốn họ gật đầu xác nhận, họ sẽ nói:",
      options: [
        { text: "You're a student, aren't you ↘? (Hạ giọng)", isCorrect: true },
        { text: "You're a student, aren't you ↗? (Lên giọng)", isCorrect: false },
        { text: "You're a student, aren't you →? (Giọng ngang)", isCorrect: false },
        { text: "You're a student, aren't you ↗↘? (Kinh ngạc)", isCorrect: false }
      ],
      explanation: "Khi người nói đã biết chắc đáp án và chỉ cần đối phương đồng tình, họ sẽ dùng điệu Xuống (Falling Tag ↘)."
    },
    {
      id: 8,
      type: "tone_id",
      category: "Nhận diện Cao độ",
      audioText: "I like the color...",
      targetTone: "fall_rise",
      speechPitch: 1.05,
      prosodyChunks: [
        { text: "I like the", pitch: 1.0, rate: 0.95 },
        { text: "col-", pitch: 0.70, rate: 0.85, pauseAfter: 25 },
        { text: "or?", pitch: 1.48, rate: 0.88 }
      ],
      question: "Lắng nghe câu 'I like the color...' sau và cho biết đây là loại điệu nào:",
      options: [
        { text: "Falling ↘ (Giọng Xuống)", isCorrect: false },
        { text: "Fall-Rise ↘↗ (Xuống rồi Lên - Dè dặt)", isCorrect: true },
        { text: "Rising ↗ (Giọng Lên)", isCorrect: false },
        { text: "Level → (Giọng Ngang)", isCorrect: false }
      ],
      explanation: "Câu thể hiện sự dè dặt: Cao độ hạ xuống ở 'color' rồi móc ngược lên nhẹ (Fall-Rise ↘↗), ngầm báo hiệu vế sau có điều chưa ưng ý (ví dụ: nhưng giá hơi đắt)."
    },
    {
      id: 9,
      type: "rule",
      category: "Câu hỏi Lựa chọn",
      audioText: "Do you want tea or coffee?",
      targetTone: "choice",
      speechPitch: 1.0,
      prosodyChunks: [
        { text: "Do you want", pitch: 1.0, rate: 0.95 },
        { text: "tea?", pitch: 1.45, rate: 0.88, pauseAfter: 120 }, // tea ↗
        { text: "or coffee.", pitch: 0.68, rate: 0.78 } // coffee ↘
      ],
      question: "Khi hỏi ai đó muốn uống trà hay cà phê (bắt buộc chọn 1 trong 2), ngữ điệu chuẩn là:",
      options: [
        { text: "tea ↗ or coffee ↘?", isCorrect: true },
        { text: "tea ↘ or coffee ↗?", isCorrect: false },
        { text: "tea ↗ or coffee ↗?", isCorrect: false },
        { text: "tea ↘ or coffee ↘?", isCorrect: false }
      ],
      explanation: "Câu hỏi lựa chọn 'A or B': Lên giọng ở lựa chọn 1 (tea ↗) và hạ giọng dứt khoát ở lựa chọn cuối cùng (coffee ↘)."
    },
    {
      id: 10,
      type: "attitude",
      category: "Phân tích Thái độ",
      audioText: "Thank you!",
      targetTone: "rise_fall",
      speechPitch: 1.4,
      prosodyChunks: [
        { text: "THANK", pitch: 1.65, rate: 0.72, pauseAfter: 20 },
        { text: "you!", pitch: 0.65, rate: 0.78 }
      ],
      question: "Ai đó vừa vô ý làm rách tài liệu của bạn, bạn nói 'Thank you ↗↘!'. Ngữ điệu này thể hiện điều gì?",
      options: [
        { text: "Cảm ơn chân thành, trang trọng", isCorrect: false },
        { text: "Mỉa mai, bực tức (Sarcasm / Irony)", isCorrect: true },
        { text: "Lịch sự thông thường hàng ngày", isCorrect: false },
        { text: "Hỏi thăm thân mật", isCorrect: false }
      ],
      explanation: "Điệu Rise-Fall (↗↘) biến lời cảm ơn thành lời mỉa mai, châm biếm sâu cay khi người nghe vừa làm một việc khiến bạn tức giận."
    },
    {
      id: 11,
      type: "rule",
      category: "Mệnh đề Điều kiện",
      audioText: "If it rains tomorrow, we will stay at home.",
      targetTone: "conditional",
      speechPitch: 1.0,
      prosodyChunks: [
        { text: "If it rains", pitch: 1.0, rate: 0.95 },
        { text: "tomorrow?", pitch: 1.42, rate: 0.88, pauseAfter: 150 }, // tomorrow ↗
        { text: "we will stay at", pitch: 1.02, rate: 0.95 },
        { text: "home.", pitch: 0.68, rate: 0.78 } // home ↘
      ],
      question: "Trong câu điều kiện: 'If it rains tomorrow ↗, we will stay at home ↘.', tại sao vế If lại lên giọng?",
      options: [
        { text: "Vì vế If là câu hỏi", isCorrect: false },
        { text: "Vì mệnh đề phụ chưa hoàn tất (Non-finality), báo hiệu câu còn tiếp diễn", isCorrect: true },
        { text: "Vì người nói đang mỉa mai", isCorrect: false },
        { text: "Vì đó là từ vựng khó phát âm", isCorrect: false }
      ],
      explanation: "Khi mệnh đề phụ đứng đầu câu, lên giọng nhẹ (Non-final Rise ↗) báo cho người nghe biết ý chưa trọn vẹn, phải nghe tiếp mệnh đề chính mới hoàn tất."
    },
    {
      id: 12,
      type: "attitude",
      category: "Phân tích Thái độ",
      audioText: "Right...",
      targetTone: "fall_rise",
      speechPitch: 1.05,
      prosodyChunks: [
        { text: "Ri-", pitch: 0.70, rate: 0.80, pauseAfter: 20 },
        { text: "-ght?", pitch: 1.48, rate: 0.85 }
      ],
      question: "Lắng nghe từ 'Right ↘↗...' sau đây. Người nói đang có thái độ gì?",
      options: [
        { text: "Đồng ý tuyệt đối 100%", isCorrect: false },
        { text: "Đồng ý dè dặt, sắp sửa đưa ra lời phản bác (nhưng mà...)", isCorrect: true },
        { text: "Hỏi lại thông tin vì chưa hiểu", isCorrect: false },
        { text: "Ra lệnh dứt khoát cho cấp dưới", isCorrect: false }
      ],
      explanation: "'Right ↘↗' với điệu Fall-Rise là sự đồng ý ngập ngừng, theo sau thường là từ 'but...' để phản biện lại lập luận của đối phương."
    },
    {
      id: 13,
      type: "nucleus",
      category: "Tiêu điểm Trọng tâm",
      audioText: "I didn't take your book.",
      targetTone: "accentual",
      speechPitch: 1.25,
      prosodyChunks: [
        { text: "I didn't take", pitch: 0.88, rate: 1.12, volume: 0.50 },
        { text: "YOUR!", pitch: 1.60, rate: 0.68, volume: 1.0, pauseAfter: 50 }, // Nhấn YOUR
        { text: "book.", pitch: 0.78, rate: 1.12, volume: 0.50 }
      ],
      question: "Trong câu 'I didn't take YOUR book', trọng tâm rơi vào 'YOUR'. Người nói ngầm ám chỉ điều gì?",
      options: [
        { text: "Người khác lấy, không phải tôi", isCorrect: false },
        { text: "Tôi lấy sách của người khác, không phải của bạn", isCorrect: true },
        { text: "Tôi lấy cây bút chứ không lấy cuốn sách", isCorrect: false },
        { text: "Tôi chỉ mượn chứ không lấy cắp", isCorrect: false }
      ],
      explanation: "Khi Hạt nhân ngữ điệu (Nucleus) rơi vào 'YOUR', nó tạo ra sự tương phản quyền sở hữu: cuốn sách bị lấy là của một người khác."
    },
    {
      id: 14,
      type: "tone_id",
      category: "Nhận diện Cao độ",
      audioText: "Well, let me see...",
      targetTone: "level",
      speechPitch: 1.0,
      prosodyChunks: [
        { text: "Well...", pitch: 0.95, rate: 0.75, pauseAfter: 200 },
        { text: "let me see...", pitch: 0.95, rate: 0.78 }
      ],
      question: "Lắng nghe câu: 'Well →, let me see →...'. Cao độ giữ nguyên một mức phẳng. Đây là loại điệu nào?",
      options: [
        { text: "Level Tone → (Giọng Ngang/Bằng - Đang suy nghĩ)", isCorrect: true },
        { text: "Falling Tone ↘ (Giọng Xuống - Dứt khoát)", isCorrect: false },
        { text: "Rising Tone ↗ (Giọng Lên - Thăm dò)", isCorrect: false },
        { text: "Rise-Fall Tone ↗↘ (Kinh ngạc)", isCorrect: false }
      ],
      explanation: "Điệu Level (→) giữ cao độ phẳng lì không đổi, đặc trưng cho trạng thái do dự (Hesitation), vừa nói vừa lục tìm từ ngữ tiếp theo trong đầu."
    },
    {
      id: 15,
      type: "rule",
      category: "Câu Mệnh Lệnh",
      audioText: "Sit down!",
      targetTone: "fall",
      speechPitch: 0.88,
      prosodyChunks: [
        { text: "Sit", pitch: 1.10, rate: 0.92 },
        { text: "down.", pitch: 0.62, rate: 0.75 } // down hạ dốc sâu ↘
      ],
      question: "Một huấn luyện viên hô lớn: 'Sit down! ↘'. Tại sao câu mệnh lệnh dứt khoát lại dùng điệu Xuống (Falling)?",
      options: [
        { text: "Để thể hiện quyền uy, tính dứt khoát và chấm dứt sự tranh cãi", isCorrect: true },
        { text: "Vì huấn luyện viên đang xin lỗi học viên", isCorrect: false },
        { text: "Vì câu mệnh lệnh luôn là câu hỏi", isCorrect: false },
        { text: "Để tỏ ra thân thiện, mời mọc nhẹ nhàng", isCorrect: false }
      ],
      explanation: "Mệnh lệnh dứt khoát (Orders/Commands) bắt buộc hạ giọng sâu (Falling ↘) để biểu thị quyền lực, tính kiên quyết và yêu cầu người nghe thực hiện ngay lập tức."
    }
  ]
};
