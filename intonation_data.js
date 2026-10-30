/**
 * PRONUNCIATION WITH MISS NGUYET — CHUYÊN ĐỀ NGỮ ĐIỆU (INTONATION MASTERCLASS)
 * Biên soạn theo chuẩn Ngữ âm - Âm vị học Quốc tế (J.C. Wells, Peter Roach, David Crystal)
 * Tích hợp Giáo án Sư phạm Chi tiết phục vụ Giảng dạy Trực tiếp & Luyện thi TOEIC/IELTS
 */

window.INTONATION_DATA = {

  // =========================================================================
  // BÀI GIẢNG DẪN NHẬP: BẢN CHẤT NGỮ ĐIỆU & CƠ CHẾ SƯ PHẠM
  // =========================================================================
  natureIntro: {
    title: "Bản Chất Ngữ Điệu: Tại Sao Người Việt Nói Tiếng Anh Bị Chê 'Phẳng Lì' Hoặc 'Cộc Cằn'?",
    subtitle: "Bài giảng lý thuyết nền tảng giúp giáo viên truyền cảm hứng và định hướng cho học viên ngay từ buổi học đầu tiên.",
    coreParadox: "Người Việt Nam nói tiếng mẹ đẻ có tới 6 thanh điệu (ngang, huyền, sắc, hỏi, ngã, nặng) rất trầm bổng. Nhưng nghịch lý là khi chuyển sang nói tiếng Anh, hầu hết học viên lại nói 'đều đều như tụng kinh' hoặc lên giọng/xuống giọng sai chỗ khiến người bản xứ cảm thấy bị cộc cằn hoặc hoài nghi.",
    linguisticComparison: [
      {
        aspect: "Bản chất phân loại",
        vn: "Ngôn ngữ thanh điệu (Tone Language)",
        en: "Ngôn ngữ ngữ điệu (Intonation Language)",
        note: "Tiếng Việt cố định cao độ ở cấp từ; Tiếng Anh linh hoạt cao độ ở cấp câu."
      },
      {
        aspect: "Cấp độ thay đổi cao độ",
        vn: "Cấp độ TỪ ĐƠN LẬP (Syllable level)",
        en: "Cấp độ CỤM TƯ DUY & CÂU (Thought Group level)",
        note: "Đổi cao độ trong tiếng Anh không đổi từ vựng, mà đổi THÁI ĐỘ và Ý ĐỒ."
      },
      {
        aspect: "Hậu quả khi đổi cao độ",
        vn: "Đổi hẳn nghĩa từ vựng: ma (ma quỷ) ≠ má (mẹ) ≠ mà (nhưng) ≠ mạ (lúa)",
        en: "Đổi thái độ & cấu trúc ngữ pháp: Really ↘ (Đồng ý) ≠ Really ↗ (Hoài nghi) ≠ Really ↗↘ (Sốc)",
        note: "Người bản xứ lắng nghe 'giai điệu' để đoán cảm xúc và ý định thực sự của bạn."
      },
      {
        aspect: "Nhịp điệu tổng thể",
        vn: "Đẳng thời âm tiết (Syllable-timed): Mỗi tiếng phát ra có thời lượng xấp xỉ bằng nhau",
        en: "Đẳng thời trọng âm (Stress-timed): Nhịp điệu dồn vào các âm tiết trọng tâm (Content words)",
        note: "Không được đọc đều đều từng tiếng như tiếng Việt, phải có tiếng lướt và tiếng nhấn."
      }
    ],
    toneUnitLecture: {
      headline: "Cấu Trúc 1 Đơn Vị Ngữ Điệu (Tone Unit / Intonation Phrase)",
      explanation: "Trong tiếng Anh, một câu hoàn chỉnh thường được chia thành các Đơn vị ngữ điệu (Tone Units). Mỗi Tone Unit đại diện cho một cụm tư duy (Thought Group) và bắt buộc phải có một 'Hạt nhân' (Nucleus) — nơi cao độ bắt đầu trượt lên hoặc rơi xuống.",
      components: [
        {
          name: "1. Pre-Head (Âm Trước Đầu)",
          role: "Các âm tiết nhẹ, không mang trọng âm đứng trước Head.",
          example: "in a...",
          tip: "Đọc lướt nhanh, nhẹ, không nhấn giọng."
        },
        {
          name: "2. Head (Âm Đầu)",
          role: "Bắt đầu từ âm tiết mang trọng âm đầu tiên đến trước Nucleus.",
          example: "...LIT-tle...",
          tip: "Duy trì cao độ ổn định, nhịp nhàng."
        },
        {
          name: "3. NUCLEUS / Tonic (Hạt Nhân) ★",
          role: "Âm tiết quan trọng nhất cả cụm! Nơi cao độ trượt lên (↗) hoặc đổ xuống (↘) mạnh mẽ nhất.",
          example: "...BOIL-...",
          tip: "Học viên phải tập trung 100% năng lượng vào âm này để tạo giai điệu chuẩn."
        },
        {
          name: "4. Tail (Phần Đuôi)",
          role: "Các âm tiết đi sau Nucleus, tiếp tục quán tính cao độ mà Nucleus đã vạch ra.",
          example: "...ing pot.",
          tip: "Nếu Nucleus đi xuống thì Tail chìm hẳn xuống; nếu Nucleus đi lên thì Tail tiếp tục vút lên."
        }
      ]
    },
    vocalMechanism: {
      headline: "Kỹ Thuật Cơ Thể Học: Điều Khiển Dây Thanh & Luồng Hơi",
      steps: [
        "Lấy hơi bằng cơ hoành (thở bụng): Không thở nông bằng ngực để có đủ cột hơi duy trì cao độ đến cuối câu.",
        "Độ căng của dây thanh đới: Khi muốn lên giọng (↗), siết nhẹ dây thanh để tăng tần số rung F₀; khi muốn hạ giọng (↘), thả lỏng dây thanh để âm thanh trầm ấm rơi tự nhiên.",
        "Kéo dài trường độ (Vowel Lengthening): Âm tiết nhận Nucleus bắt buộc phải đọc DÀI HƠN gấp 1.5 lần so với các âm tiết xung quanh."
      ]
    }
  },

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
      shortDesc: "Cao độ đổ dốc từ cao xuống mức thấp nhất của quãng giọng",
      meaning: "Hoàn tất (Finality) • Chắc chắn (Certainty) • Dứt khoát (Definiteness)",
      detailedExplanation: "Cao độ bắt đầu từ mức trung bình hoặc cao rồi đổ dốc xuống mức thấp nhất của quãng giọng. Đây là giai điệu phổ biến nhất trong tiếng Anh (chiếm khoảng 60% giao tiếp), báo hiệu câu nói đã trọn vẹn và người nói hoàn toàn tự tin về thông tin mình cung cấp.",
      acousticDetails: "Tần số cơ bản F₀ giảm từ khoảng 260Hz - 280Hz xuống mức đáy 120Hz - 130Hz trong khoảng 0.4 - 0.5 giây.",
      usageGuide: [
        "Câu khẳng định và phủ định thông thường (Statements).",
        "Câu hỏi Wh- yêu cầu thông tin cụ thể (Who, What, Where, When, Why, How).",
        "Câu mệnh lệnh, chỉ thị dứt khoát của người có thẩm quyền (Commands).",
        "Thành phần cuối cùng trong chuỗi liệt kê (List final item)."
      ],
      vietnamesePitfalls: "Học viên Việt Nam khi hạ giọng hay bị lỗi 'nuốt luôn âm cuối' (ví dụ: hạ giọng từ 'London' hoặc 'worked' thì bỏ quên âm /d/ hoặc đuôi /-kt/). Hãy nhắc học viên: Hạ cao độ giọng chứ KHÔNG ĐƯỢC hạ âm lượng làm mất phụ âm cuối!",
      teacherTips: "Mẹo dạy trên lớp: Hãy cho học viên giơ tay lên cao ngang ngực rồi quét dứt khoát xuống ngang hông khi phát âm Nucleus. Động tác cơ thể này giúp dây thanh đới tự động thả lỏng theo chiều đi xuống.",
      acousticCurve: [
        { x: 5, y: 20 },
        { x: 30, y: 25 },
        { x: 60, y: 45 },
        { x: 95, y: 80 }
      ],
      soundWaveId: "fall",
      audioFrequency: { start: 270, end: 125, duration: 0.5 },
      speechPitch: 0.92,
      realLifeDialogue: {
        title: "Tình huống: Phỏng vấn xin việc (Job Interview)",
        context: "Ứng viên trả lời phỏng vấn một cách tự tin, chắc chắn, thể hiện năng lực chuyên môn.",
        lines: [
          { speaker: "Interviewer", en: "Where do you currently work ↘?", vn: "Hiện tại bạn đang làm việc ở đâu?", speechText: "Where do you currently work." },
          { speaker: "Candidate", en: "I work as a senior designer at TechCorp ↘.", vn: "Tôi làm thiết kế trưởng tại tập đoàn TechCorp (Chắc chắn & đĩnh đạc).", speechText: "I work as a senior designer at TechCorp." }
        ]
      },
      examples: [
        {
          en: "I live in London.",
          vn: "Tôi sống ở London (Khẳng định chắc chắn).",
          ipa: "/aɪ lɪv ɪn ˈlʌndən ↘/",
          highlightWord: "London",
          speechText: "I live in London.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "Stop it right now.",
          vn: "Dừng lại ngay lập tức (Mệnh lệnh dứt khoát).",
          ipa: "/stɒp ɪt raɪt naʊ ↘/",
          highlightWord: "now",
          speechText: "Stop it right now.",
          speechPitch: 0.90,
          speechRate: 0.88
        },
        {
          en: "Where do you work?",
          vn: "Bạn làm việc ở đâu? (Câu hỏi Wh- chuẩn).",
          ipa: "/weə duː juː wɜːk ↘/",
          highlightWord: "work",
          speechText: "Where do you work.",
          speechPitch: 0.92,
          speechRate: 0.88
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
      shortDesc: "Cao độ vút từ mức thấp/trung bình lên cao dần về cuối",
      meaning: "Chưa hoàn tất (Non-finality) • Nghi vấn / Thăm dò (Inquiry) • Mời gọi phản hồi",
      detailedExplanation: "Cao độ bắt đầu từ mức thấp hoặc trung bình rồi vút lên cao dần về cuối câu. Điệu lên tạo cảm giác tò mò, mở lời, mời gọi người nghe trả lời, hoặc báo hiệu câu chuyện vẫn còn vế sau chưa hết.",
      acousticDetails: "Tần số cơ bản F₀ nâng từ khoảng 135Hz lên mức đỉnh 280Hz - 300Hz, tạo âm sắc ngân vang nhẹ.",
      usageGuide: [
        "Câu hỏi Yes/No bắt đầu bằng trợ động từ (Do, Are, Can, Will...).",
        "Lời đề nghị, nhờ vả lịch sự (Polite requests: Could you please...?).",
        "Mệnh đề phụ đứng trước mệnh đề chính (If you agree ↗, we will start ↘).",
        "Các món đồ đứng trước trong chuỗi liệt kê (A ↗, B ↗, and C ↘)."
      ],
      vietnamesePitfalls: "Học viên hay thêm dấu sắc tiếng Việt vào âm cuối (ví dụ đọc 'ready' thành 'ré-đí'). Hãy sửa ngay: Lên giọng trong tiếng Anh là ngân dài và trượt cao độ lên mượt mà (Gliding), không phải giật cục thêm dấu sắc sắc nhọn!",
      teacherTips: "Mẹo dạy trên lớp: Cho học viên ngước mắt nhìn lên trên hoặc đưa ngón tay trỏ từ từ hướng lên trần nhà khi phát âm âm tiết cuối. Cử chỉ này ngăn học viên giật giọng.",
      acousticCurve: [
        { x: 5, y: 78 },
        { x: 35, y: 65 },
        { x: 65, y: 42 },
        { x: 95, y: 18 }
      ],
      soundWaveId: "rise",
      audioFrequency: { start: 135, end: 285, duration: 0.5 },
      speechPitch: 1.15,
      realLifeDialogue: {
        title: "Tình huống: Quầy chăm sóc khách hàng (Customer Service)",
        context: "Nhân viên khách sạn tiếp đón niềm nở và lịch sự với khách hàng.",
        lines: [
          { speaker: "Staff", en: "Good morning! Do you have a reservation with us ↗?", vn: "Chào buổi sáng quý khách! Quý khách đã đặt phòng trước chưa ạ?", speechText: "Good morning! Do you have a reservation with us?" },
          { speaker: "Guest", en: "Yes, under the name of David Miller ↘.", vn: "Vâng, đặt dưới tên David Miller.", speechText: "Yes, under the name of David Miller." }
        ]
      },
      examples: [
        {
          en: "Are you ready?",
          vn: "Bạn đã sẵn sàng chưa? (Câu hỏi Yes/No).",
          ipa: "/ɑː juː ˈredi ↗/",
          highlightWord: "ready",
          speechText: "Are you ready?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Excuse me?",
          vn: "Xin lỗi, bạn có thể nhắc lại được không? (Hỏi lại lịch sự).",
          ipa: "/ɪkˈskjuːz miː ↗/",
          highlightWord: "me",
          speechText: "Excuse me?",
          speechPitch: 1.15,
          speechRate: 0.92
        },
        {
          en: "Do you need any help?",
          vn: "Bạn có cần giúp gì không? (Thăm dò niềm nở).",
          ipa: "/duː juː niːd ˈeni help ↗/",
          highlightWord: "help",
          speechText: "Do you need any help?",
          speechPitch: 1.14,
          speechRate: 0.90
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
      shortDesc: "Cao độ hạ xuống ở giữa rồi móc ngược lên ở đuôi",
      meaning: "Dè dặt (Reservation) • Tương phản ngầm (Contrast) • Lịch sự / Giảm nhẹ (Softening)",
      detailedExplanation: "Cao độ hạ xuống ở giữa âm tiết/từ trọng tâm rồi móc ngược lên ở cuối. Đây là giai điệu cực kỳ tinh tế của người bản xứ: thể hiện ý 'Tôi đồng ý một phần nhưng vẫn còn băn khoăn', hoặc ngầm báo hiệu vế đối lập phía sau mà không cần nói thẳng ra.",
      acousticDetails: "Cao độ trượt từ 240Hz hạ xuống đáy 140Hz rồi lại móc ngược lên 240Hz - 250Hz tạo thành hình chữ V hoặc cái muỗng múc âm thanh.",
      usageGuide: [
        "Thể hiện sự bất đồng một cách lịch sự, nhã nhặn (Polite disagreement).",
        "Lời cảnh báo, nhắc nhở thân mật mà không muốn nghe như ra lệnh (Be careful ↘↗).",
        "Mệnh đề chỉ sự nhượng bộ (Although it was cold ↘↗...).",
        "Câu trả lời nửa vời, ngầm ám chỉ điều chưa nói hết (Well, he's nice ↘↗... [nhưng tôi không tin lắm])."
      ],
      vietnamesePitfalls: "Người Việt Nam gần như không có phản xạ dùng điệu Fall-Rise vì trong tiếng Việt không có thanh điệu nào tương đương. Học viên thường biến thành điệu xuống cụt ngủn khiến câu nói nghe rất thô thiển hoặc chê bai thẳng thừng.",
      teacherTips: "Mẹo dạy trên lớp: Hãy ví von điệu Fall-Rise như một 'chiếc muỗng múc kem': võng xuống rồi múc ngược lên. Hướng dẫn học viên: khi bạn khen ai đó mà sắp 'nhưng' cái gì thì hãy dùng điệu này!",
      acousticCurve: [
        { x: 5, y: 25 },
        { x: 45, y: 78 },
        { x: 95, y: 32 }
      ],
      soundWaveId: "fall_rise",
      audioFrequency: { start: 240, mid: 140, end: 250, duration: 0.6 },
      speechPitch: 1.04,
      realLifeDialogue: {
        title: "Tình huống: Góp ý thiết kế sản phẩm (Product Review)",
        context: "Đồng nghiệp góp ý nhẹ nhàng khéo léo để không làm mất lòng người thiết kế.",
        lines: [
          { speaker: "Designer", en: "What do you think about the new logo design ↘?", vn: "Cậu thấy mẫu thiết kế logo mới thế nào?", speechText: "What do you think about the new logo design." },
          { speaker: "Colleague", en: "Well, I like the color ↘↗... but the font is a bit small ↘.", vn: "À thì... tớ thích cái màu sắc đấy (nhưng cái phông chữ hơi nhỏ cậu ạ).", speechText: "Well, I like the color, though... but the font is a bit small." }
        ]
      },
      examples: [
        {
          en: "I like the color...",
          vn: "Tôi thích cái màu... (nhưng cái giá thì hơi đắt).",
          ipa: "/aɪ laɪk ðə ˈkʌlə ↘↗/",
          highlightWord: "color",
          speechText: "I like the color, though...",
          speechPitch: 1.04,
          speechRate: 0.86
        },
        {
          en: "She is very nice...",
          vn: "Cô ấy rất tốt bụng... (nhưng hơi khó tính trong công việc).",
          ipa: "/ʃiː ɪz ˈveri naɪs ↘↗/",
          highlightWord: "nice",
          speechText: "She is very nice, though...",
          speechPitch: 1.04,
          speechRate: 0.86
        },
        {
          en: "Be careful.",
          vn: "Hãy cẩn thận nhé (Lời nhắc nhở ân cần, mềm mỏng).",
          ipa: "/biː ˈkeəfl ↘↗/",
          highlightWord: "careful",
          speechText: "Be careful, please.",
          speechPitch: 1.04,
          speechRate: 0.88
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
      shortDesc: "Cao độ vút lên cực đỉnh rồi rơi thẳng đứng xuống mức rất thấp",
      meaning: "Kinh ngạc tột độ (Surprise) • Ấn tượng mãnh liệt (Strong Approval) • Mỉa mai (Sarcasm)",
      detailedExplanation: "Cao độ vọt lên rất cao tạo một đỉnh nhọn chót vót rồi rơi thẳng đứng xuống mức rất thấp. Dùng khi người nói quá đỗi ngạc nhiên trước một tin tức chấn động, xúc động mạnh trước một thành tựu, hoặc dùng để mỉa mai sâu cay.",
      acousticDetails: "Tần số F₀ phóng từ 160Hz vút lên đỉnh nhọn 330Hz - 350Hz rồi đổ sập xuống 120Hz.",
      usageGuide: [
        "Bày tỏ sự kinh ngạc tột bực (You passed with 100% ↗↘?!).",
        "Lời tán thưởng, khen ngợi hết lời (Brilliant ↗↘! Absolutely fantastic ↗↘!).",
        "Châm biếm, mỉa mai khi tức giận (Oh, thank you so much ↗↘!)."
      ],
      vietnamesePitfalls: "Học viên thường ngại bộc lộ cảm xúc khi nói tiếng Anh nên điệu này thường bị đọc phẳng lì. Cần khuyến khích học viên giải phóng cơ mặt và giọng nói khi thực hành.",
      teacherTips: "Mẹo dạy trên lớp: Kỹ thuật 'Đóng vai diễn viên điện ảnh'. Bảo học viên tưởng tượng vừa trúng xổ số 20 tỷ và nói từ 'Really?!' hoặc 'Brilliant!' với 200% năng lượng cơ thể.",
      acousticCurve: [
        { x: 5, y: 75 },
        { x: 48, y: 15 },
        { x: 95, y: 80 }
      ],
      soundWaveId: "rise_fall",
      audioFrequency: { start: 160, peak: 330, end: 125, duration: 0.6 },
      speechPitch: 1.18,
      realLifeDialogue: {
        title: "Tình huống: Bạn thân nhận học bổng toàn phần (Exciting News)",
        context: "Hai người bạn trò chuyện và bất ngờ trước một tin tức quá đỗi tuyệt vời.",
        lines: [
          { speaker: "Friend A", en: "Guess what! I got the scholarship to Oxford ↘!", vn: "Cậu đoán xem nào! Tớ vừa nhận được học bổng sang Oxford rồi!", speechText: "Guess what! I got the scholarship to Oxford!" },
          { speaker: "Friend B", en: "Brilliant ↗↘! That is incredible ↗↘!", vn: "Quá tuyệt đỉnh luôn! Thật không thể tin nổi (Phấn khích tột độ)!", speechText: "Brilliant! That is incredible!" }
        ]
      },
      examples: [
        {
          en: "You won the lottery?!",
          vn: "Cậu trúng số độc đắc thật á?! (Kinh ngạc tột cùng).",
          ipa: "/juː wʌn ðə ˈlɒtəri ↗↘/",
          highlightWord: "lottery",
          speechText: "You won the lottery?!",
          speechPitch: 1.18,
          speechRate: 0.90
        },
        {
          en: "Brilliant!",
          vn: "Quá tuyệt đỉnh! (Khen ngợi hết lời).",
          ipa: "/ˈbrɪljənt ↗↘/",
          highlightWord: "Brilliant",
          speechText: "Brilliant!",
          speechPitch: 1.16,
          speechRate: 0.88
        },
        {
          en: "Is that really true?!",
          vn: "Chuyện đó có thật không đấy?! (Quá bất ngờ).",
          ipa: "/ɪz ðæt ˈrɪəli truː ↗↘/",
          highlightWord: "true",
          speechText: "Is that really true?!",
          speechPitch: 1.18,
          speechRate: 0.90
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
      shortDesc: "Cao độ duy trì một đường ngang phẳng lì, không đổi",
      meaning: "Do dự (Hesitation) • Đang suy nghĩ (Thinking aloud) • Máy móc / Vô cảm (Routine)",
      detailedExplanation: "Cao độ duy trì một đường ngang phẳng, không dịch chuyển lên hay xuống. Xuất hiện khi người nói đang ngẫm nghĩ tìm từ tiếp theo ('Well →, um →'), hoặc khi đọc danh sách điểm danh, đọc số liệu một cách vô cảm, máy móc.",
      acousticDetails: "Tần số F₀ dao động cực ít, giữ cố định quanh mức trung bình 190Hz - 200Hz.",
      usageGuide: [
        "Khi người nói cần thời gian suy nghĩ để không bị người khác cướp lượt lời (Turn-holding).",
        "Đọc danh sách, số điện thoại hoặc mã sản phẩm một cách vô cảm (Routine listing).",
        "Thờ ơ, không hào hứng trong đối thoại."
      ],
      vietnamesePitfalls: "Người Việt Nam vô tình biến TẤT CẢ các câu tiếng Anh thành điệu Level vì thói quen đọc phẳng lì! Giáo viên cần chỉ rõ: Điệu Level chỉ dùng khi ĐANG NGHĨ hoặc THỜ Ơ, không được dùng để nói chuyện bình thường!",
      teacherTips: "Mẹo dạy trên lớp: Khi học viên nói câu kể mà đọc như điệu Level, hãy bảo học viên: 'Em đang đọc điểm danh à? Hãy hạ giọng xuống ở chữ cuối cho cô nghe nào!'.",
      acousticCurve: [
        { x: 5, y: 48 },
        { x: 35, y: 48 },
        { x: 65, y: 48 },
        { x: 95, y: 48 }
      ],
      soundWaveId: "level",
      audioFrequency: { start: 195, end: 195, duration: 0.5 },
      speechPitch: 0.98,
      realLifeDialogue: {
        title: "Tình huống: Giáo viên điểm danh học sinh (Classroom Attendance)",
        context: "Đọc danh sách học sinh theo thứ tự số báo danh một cách máy móc, đều đặn.",
        lines: [
          { speaker: "Teacher", en: "Student number one →, student number two →, student number three ↘.", vn: "Học sinh số một, học sinh số hai, học sinh số ba.", speechText: "Student number one, student number two, student number three." },
          { speaker: "Student", en: "Present ↘!", vn: "Có mặt ạ!", speechText: "Present." }
        ]
      },
      examples: [
        {
          en: "Well, let me see...",
          vn: "À thì... để tôi xem nào... (Đang suy nghĩ từ tiếp theo).",
          ipa: "/wel let miː siː →/",
          highlightWord: "see",
          speechText: "Well, let me see...",
          speechPitch: 0.98,
          speechRate: 0.80
        },
        {
          en: "Number one, number two...",
          vn: "Số một, số hai... (Đọc điểm danh máy móc).",
          ipa: "/ˈnʌmbə wʌn → ˈnʌmbə tuː →/",
          highlightWord: "two",
          speechText: "Number one, number two...",
          speechPitch: 0.98,
          speechRate: 0.82
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 2: 12 QUY TẮC LÊN & XUỐNG GIỌNG THEO KIỂU CÂU (6 XUỐNG - 6 LÊN)
  // =========================================================================
  rules: [
    // =======================================================================
    // NHÓM 1: CÁC TRƯỜNG HỢP XUỐNG GIỌNG (FALLING TONE ↘)
    // =======================================================================
    {
      id: "rule_statements",
      num: 1,
      group: "falling",
      title: "Câu Trần Thuật (Statements)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Khẳng định & Phủ định (60% giao tiếp)",
      ruleSummary: "Đa số câu khẳng định và phủ định diễn tả sự thật, cung cấp thông tin hoàn chỉnh đều hạ cao độ ở từ khóa mang nghĩa cuối cùng.",
      diagram: "Subject + Verb + Object ───────────↘ (Chắc chắn & Trọn vẹn)",
      formula: "[Chủ ngữ] + [Vị ngữ] + [Tân ngữ / Từ cuối ↘] .",
      deepRationale: "Hạ giọng ở cuối câu trần thuật là tín hiệu âm học sinh học phổ quát của con người: dây thanh đới chùng xuống, báo hiệu lượng thông tin đã được giải phóng trọn vẹn, người nghe không cần phải phỏng đoán thêm.",
      vietnamesePitfalls: "Nhiều học viên Việt Nam hay có thói quen 'vểnh giọng' ở cuối câu trần thuật (Up-talk) do ảnh hưởng từ mạng xã hội hoặc do thiếu tự tin, khiến câu khẳng định nghe như một câu hỏi ngớ ngẩn (ví dụ: 'My name is Nam ↗?').",
      teacherTips: "Mẹo của cô Nguyệt: Hãy nhắc học viên tưởng tượng từ cuối cùng của câu khẳng định mang 'dấu huyền' nhẹ nhàng của tiếng Việt. Điều này giúp học viên tự động ghìm cao độ xuống đáy một cách êm ái.",
      contextualDialogue: {
        title: "Hội thoại: Báo cáo tiến độ dự án (Project Status Meeting)",
        context: "Trình bày thông tin dự án một cách chuyên nghiệp, dứt khoát trước hội đồng quản trị.",
        lines: [
          { speaker: "Manager", en: "When will the mobile application be ready for testing ↘?", vn: "Khi nào thì ứng dụng di động sẵn sàng để thử nghiệm?", audioUrl: "audio/intonation/rule_rule_statements_dial_0.mp3", speechText: "When will the mobile application be ready for testing." },
          { speaker: "Lead Dev", en: "Our development team has finished the core features ↘. We will launch the beta test next Monday ↘.", vn: "Đội ngũ phát triển đã hoàn thành các tính năng cốt lõi. Chúng tôi sẽ chạy thử nghiệm vào thứ Hai tới.", audioUrl: "audio/intonation/rule_rule_statements_dial_1.mp3", speechText: "Our development team has finished the core features. We will launch the beta test next Monday." }
        ]
      },
      examples: [
        {
          en: "She works as a software engineer.",
          vn: "Cô ấy làm kỹ sư phần mềm (Sự thật rõ ràng).",
          ipa: "/ʃiː wɜːks æz ə ˈsɒftweər ˌendʒɪˈnɪə ↘/",
          marked: "She works as a software <strong>ENGINEER</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_statements_ex_0.mp3",
          speechText: "She works as a software engineer.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "I don't think that's a good idea.",
          vn: "Tôi không nghĩ đó là một ý kiến hay.",
          ipa: "/aɪ dəʊnt θɪŋk ðæts ə ɡʊd aɪˈdɪə ↘/",
          marked: "I don't think that's a good <strong>IDEA</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_statements_ex_1.mp3",
          speechText: "I don't think that's a good idea.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "We will launch the beta test next Monday.",
          vn: "Chúng tôi sẽ bắt đầu chạy thử nghiệm vào thứ Hai tới.",
          ipa: "/wiː wɪl lɔːntʃ ðə ˈbeɪtə tɛst nɛkst ˈmʌndeɪ ↘/",
          marked: "We will launch the beta test next <strong>MONDAY</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_statements_dial_1.mp3",
          speechText: "We will launch the beta test next Monday.",
          speechPitch: 0.94,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_wh_questions",
      num: 2,
      group: "falling",
      title: "Câu Hỏi Wh- (Information Questions)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Lỗi sai số 1 của học viên",
      collinsTrack: "audio/collins/collins_wh_questions_falling.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.06 (Wh-Questions Falling)",
      ruleSummary: "Câu hỏi bắt đầu bằng Who, What, Where, When, Why, Which, How có ngữ điệu CHUẨN BẢN XỨ LÀ HẠ GIỌNG ↘, tuyệt đối không lên giọng!",
      diagram: "Wh- Word ───────────↘ (Đòi hỏi thông tin thực tế)",
      formula: "[Wh- Word] + [Trợ ĐT] + [S] + [V ↘] ?",
      deepRationale: "Tại sao câu hỏi Wh- lại hạ giọng? Vì từ để hỏi (Who, What, Where...) đã đứng ở đầu câu làm nhiệm vụ báo hiệu đây là một câu hỏi rồi! Người bản xứ không cần phải lên giọng ở cuối câu nữa. Hạ giọng ở cuối câu Wh- thể hiện tính lịch thiệp, tự nhiên và tập trung vào thông tin cần trả lời.",
      vietnamesePitfalls: "Đây là lỗi sai phổ biến nhất: 90% người Việt cứ thấy câu hỏi là tự động 'vểnh giọng' lên ở từ cuối! Đọc 'Where do you live ↗?' nghe rất kỳ quặc, thiếu tự nhiên và làm mất điểm nặng trong bài thi TOEIC/IELTS Speaking.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy đặt câu hỏi cho học viên: 'Trong tiếng Việt, câu 'Mày đi đâu đấy?' người ta có lên giọng the thé ở cuối không?'. Không! Tiếng Anh cũng vậy: 'Where are you going ↘?'. Hãy hướng dẫn học viên gõ nhẹ ngón tay xuống bàn ở từ cuối cùng.",
      contextualDialogue: {
        title: "Hội thoại: Hỏi đường ở sân bay (Airport Navigation)",
        context: "Hành khách hỏi thông tin nhân viên mặt đất với ngữ điệu tự nhiên, chuẩn mực.",
        lines: [
          { speaker: "Passenger", en: "Excuse me ↗, where can I pick up my luggage ↘?", vn: "Xin lỗi anh, tôi có thể lấy hành lý ở đâu vậy ạ?", audioUrl: "audio/intonation/rule_rule_wh_questions_dial_0.mp3", speechText: "Excuse me, where can I pick up my luggage." },
          { speaker: "Airport Staff", en: "Baggage claim is on the ground floor ↘, right next to Carousel Three ↘.", vn: "Khu vực trả hành lý ở tầng trệt, ngay cạnh băng chuyền số 3 ạ.", audioUrl: "audio/intonation/rule_rule_wh_questions_dial_1.mp3", speechText: "Baggage claim is on the ground floor, right next to Carousel Three." }
        ]
      },
      examples: [
        {
          en: "Where did you buy this jacket?",
          vn: "Bạn mua chiếc áo khoác này ở đâu vậy? (Câu hỏi Wh- chuẩn).",
          ipa: "/weə dɪd juː baɪ ðɪs ˈdʒækɪt ↘/",
          marked: "Where did you buy this <strong>JACKET</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_wh_questions_ex_0.mp3",
          speechText: "Where did you buy this jacket.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "What time does the conference start?",
          vn: "Mấy giờ thì hội nghị bắt đầu?",
          ipa: "/wɒt taɪm dʌz ðə ˈkɒnfərəns stɑːt ↘/",
          marked: "What time does the conference <strong>START</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_wh_questions_ex_1.mp3",
          speechText: "What time does the conference start.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "Why are you learning English?",
          vn: "Tại sao bạn lại học tiếng Anh?",
          ipa: "/waɪ ɑː juː ˈlɜːnɪŋ ˈɪŋɡlɪʃ ↘/",
          marked: "Why are you learning <strong>ENGLISH</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_wh_questions_ex_2.mp3",
          speechText: "Why are you learning English.",
          speechPitch: 0.92,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_commands",
      num: 3,
      group: "falling",
      title: "Câu Mệnh Lệnh & Chỉ Dẫn Dứt Khoát (Commands & Orders)",
      tonePattern: "Hạ giọng dứt khoát (Falling ↘)",
      badge: "Thể hiện thẩm quyền & Quyết đoán",
      ruleSummary: "Câu mệnh lệnh, chỉ dẫn quy trình an toàn hoặc yêu cầu dứt khoát luôn HẠ GIỌNG sâu ở âm tiết cuối cùng để thể hiện thẩm quyền và tính quyết đoán.",
      diagram: "[Động từ nguyên mẫu] + ... + [Từ cuối ↘] !",
      formula: "[V-inf + Object ↘ !]",
      deepRationale: "Hạ giọng sâu trong mệnh lệnh thể hiện vị thế quyền lực cao hơn (giáo viên hướng dẫn học sinh trong lớp, sếp phân công nhiệm vụ dứt khoát, hoặc người hướng dẫn an toàn). Âm sắc rơi dứt khoát tạo sự tin cậy.",
      vietnamesePitfalls: "Nếu bạn đưa ra chỉ dẫn kỹ thuật hoặc mệnh lệnh an toàn mà lại lên giọng ở cuối, người nghe sẽ cảm thấy bạn đang hoang mang, thiếu tự tin hoặc nghi ngờ chính mệnh lệnh của mình.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy phát âm âm tiết cuối dứt khoát như một dấu chấm hết, không ngân dài, hạ thấp âm vực để tạo sự uy tín.",
      contextualDialogue: {
        title: "Hội thoại: Hướng dẫn trong lớp học (Classroom Instruction)",
        context: "Giáo viên yêu cầu cả lớp mở sách để bắt đầu bài học.",
        lines: [
          { speaker: "Teacher", en: "Please turn off your phones and open your books to page ten ↘.", vn: "Các em vui lòng tắt điện thoại và mở sách ra trang số mười.", audioUrl: "audio/intonation/rule_rule_commands_requests_dial_0.mp3", speechText: "Please turn off your phones and open your books to page ten." },
          { speaker: "Students", en: "Yes, teacher ↘.", vn: "Vâng ạ.", audioUrl: "audio/intonation/rule_rule_commands_requests_dial_1.mp3", speechText: "Yes, teacher." }
        ]
      },
      examples: [
        {
          en: "Open your books to page ten.",
          vn: "Mở sách ra trang số mười (Lời thầy cô ra lệnh trong lớp).",
          ipa: "/ˈəʊpən jɔː bʊks tuː peɪdʒ ten ↘/",
          marked: "Open your books to page <strong>TEN</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_commands_requests_ex_0.mp3",
          speechText: "Open your books to page ten.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "Turn off the lights before leaving the office.",
          vn: "Hãy tắt đèn trước khi rời khỏi văn phòng.",
          ipa: "/tɜːn ɒf ðə laɪts bɪˈfɔː ˈliːvɪŋ ði ˈɒfɪs ↘/",
          marked: "Turn off the lights before leaving the <strong>OFFICE</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_commands_requests_ex_0.mp3",
          speechText: "Turn off the lights before leaving the office.",
          speechPitch: 0.92,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_tag_certain",
      num: 4,
      group: "falling",
      title: "Câu Hỏi Đuôi Khi Đã Biết Chắc (Tag Questions - Certainty)",
      tonePattern: "Hạ giọng ở phần đuôi (Falling ↘)",
      badge: "Tìm kiếm sự đồng thuận (Expecting Agreement)",
      ruleSummary: "Khi người nói ĐÃ BIẾT CHẮC thông tin và chỉ muốn người nghe đồng tình, gật đầu xác nhận cùng mình thì BẮT BUỘC HẠ GIỌNG ở phần đuôi.",
      diagram: "[Mệnh đề trần thuật] , [Trợ động từ + Đại từ ↘] ?",
      formula: "[Statement] , [Tag ↘ ?]",
      deepRationale: "Vì người nói đã nắm chắc sự thật (ví dụ trời đang rất đẹp, hoặc báo cáo đã xong), phần đuôi không nhằm mục đích lấy thông tin mà chỉ là một nhịp cầu giao tiếp để mời gọi đối phương gật đầu hòa hợp.",
      vietnamesePitfalls: "Học viên thấy dấu hỏi ở cuối câu hỏi đuôi nên luôn vểnh giọng lên, vô tình biến một lời chào xã giao ấm áp thành một câu tra khảo đối phương.",
      teacherTips: "Mẹo của cô Nguyệt: Trong đời sống hàng ngày, hơn 80% câu hỏi đuôi dùng điệu HẠ GIỌNG ↘ để tạo sự thân thiện, gần gũi.",
      contextualDialogue: {
        title: "Hội thoại: Trò chuyện xã giao công sở (Small Talk)",
        context: "Hai đồng nghiệp gặp nhau ở hành lang và bàn luận chiến lược.",
        lines: [
          { speaker: "Colleague A", en: "The new marketing strategy is very promising, isn't it ↘?", vn: "Chiến lược tiếp thị mới rất nhiều triển vọng, đúng không nào? (Đồng tình đi nào!).", audioUrl: "audio/intonation/rule_rule_tag_questions_dial_0.mp3", speechText: "The new marketing strategy is very promising, isn't it." },
          { speaker: "Colleague B", en: "Absolutely ↘! I think our sales will double next quarter ↘.", vn: "Chắc chắn rồi! Tớ nghĩ doanh số sẽ tăng gấp đôi trong quý tới.", audioUrl: "audio/intonation/rule_rule_tag_questions_dial_1.mp3", speechText: "Absolutely! I think our sales will double next quarter." }
        ]
      },
      examples: [
        {
          en: "It's a beautiful day, isn't it?",
          vn: "Trời đẹp quá, đúng không nào? (Người nói biết chắc trời đang rất đẹp).",
          ipa: "/ɪts ə ˈbjuːtɪfl deɪ ˈɪznt ɪt ↘/",
          marked: "It's a beautiful day, isn't <strong>IT</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_tag_questions_ex_0.mp3",
          speechText: "It's a beautiful day, isn't it.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "The new marketing strategy is very promising, isn't it?",
          vn: "Chiến lược tiếp thị mới rất triển vọng, đúng không nào?",
          ipa: "/ðə njuː ˈmɑːkɪtɪŋ ˈstrætədʒi z ˈvɛri ˈprɒmɪsɪŋ ˈɪznt ɪt ↘/",
          marked: "The new marketing strategy is very promising, isn't <strong>IT</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_tag_questions_dial_0.mp3",
          speechText: "The new marketing strategy is very promising, isn't it.",
          speechPitch: 0.94,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_public_announcements",
      num: 5,
      group: "falling",
      title: "Thông Báo & Yêu Cầu Nơi Công Cộng (Public Announcements - TOEIC)",
      tonePattern: "Hạ giọng dứt khoát ở cuối câu (Falling ↘)",
      badge: "Đặc sản TOEIC Part 1 (Collins Track 06 & 24)",
      collinsTrack: "audio/collins/collins_banquet_model.mp3",
      collinsTrackTitle: "Collins Track 01-02.06 & 24 (Public Announcements)",
      ruleSummary: "Trong các bài phát thanh nơi công cộng (sân bay, nhà ga, sự kiện), dù câu có mở đầu bằng 'Can you please' hay 'Could I have', phát thanh viên luôn HẠ GIỌNG dứt khoát ở cuối câu để khẳng định tính nghi thức và yêu cầu mọi người tuân thủ.",
      diagram: "[Can you please / Attention...] + ... + [Từ cuối ↘] .",
      formula: "[Public Call / Protocol Notice ↘]",
      deepRationale: "Theo giáo trình Collins TOEIC (trang 24): 'When you make a polite request by asking a rhetorical question, or one that people don't really need to answer, intonation will fall.' Dù có hình thức câu hỏi trợ động từ (Could/Can), nhưng về bản chất đây là một thông báo điều hành mang tính nghi thức. Hạ giọng thể hiện sự chuyên nghiệp tuyệt đối.",
      vietnamesePitfalls: "99% học viên cứ thấy từ 'Could I...' hoặc thấy từ 'please' ở cuối là tự động vểnh giọng vút lên cao ('attention please ↗?'). Lỗi này khiến lời thông báo trở nên van nài, thiếu tính quyền lực và làm mất điểm nặng trong các bài đọc TOEIC.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy nhớ nguyên tắc: Nhờ vả cá nhân thì LÊN GIỌNG (↗); nhưng thông báo quy định tập thể thì HẠ GIỌNG (↘).",
      contextualDialogue: {
        title: "Hội thoại: Thông báo trên xe buýt (Public Transit Announcement)",
        context: "Tài xế thông báo cho hành khách về sự cố và yêu cầu sự chú ý trật tự.",
        lines: [
          { speaker: "Driver", en: "Could I have everyone's attention, please ↘? Due to mechanical problems ↗, this bus will now be taken out of service ↘.", vn: "Xin quý hành khách vui lòng chú ý. Do sự cố kỹ thuật, xe buýt này tạm thời ngừng phục vụ.", audioUrl: "audio/intonation/rule_rule_rhetorical_requests_dial_0.mp3", speechText: "Could I have everyone's attention, please. Due to mechanical problems, this bus will now be taken out of service." },
          { speaker: "Passenger", en: "Thank you for letting us know ↘.", vn: "Cảm ơn bác tài đã thông báo.", audioUrl: "audio/intonation/rule_rule_rhetorical_requests_dial_1.mp3", speechText: "Thank you for letting us know." }
        ]
      },
      examples: [
        {
          en: "Could we have your attention, please?",
          vn: "Xin quý vị vui lòng chú ý (Trích đề Collins Track 06).",
          ipa: "/kʊd wiː hæv jɔːr əˈtɛnʃən pliːz ↘/",
          marked: "Could we have your attention, <strong>PLEASE</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_rhetorical_requests_ex_0.mp3",
          speechText: "Could we have your attention, please.",
          speechPitch: 0.94,
          speechRate: 0.88
        },
        {
          en: "Can you please listen carefully?",
          vn: "Xin các bạn vui lòng chú ý lắng nghe (Trích đề Collins Track 24).",
          ipa: "/kæn juː pliːz ˈlɪsn ˈkeəfʊli ↘/",
          marked: "Can you please listen <strong>CAREFULLY</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_rhetorical_requests_ex_1.mp3",
          speechText: "Can you please listen carefully.",
          speechPitch: 0.94,
          speechRate: 0.88
        },
        {
          en: "Could I have everyone's attention, please?",
          vn: "Xin tất cả mọi người vui lòng chú ý (Trích đề Collins Track 41).",
          ipa: "/kʊd aɪ hæv ˈɛvrɪwʌnz əˈtɛnʃən pliːz ↘/",
          marked: "Could I have everyone's attention, <strong>PLEASE</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_rhetorical_requests_ex_2.mp3",
          speechText: "Could I have everyone's attention, please.",
          speechPitch: 0.94,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_final_item",
      num: 6,
      group: "falling",
      title: "Vế Chốt Cuối Cùng Của Danh Sách & Lựa Chọn (Final Item Falling)",
      tonePattern: "Hạ giọng dứt điểm ở mục cuối cùng (Falling ↘)",
      badge: "Tín hiệu đóng danh sách (Closed List)",
      collinsTrack: "audio/collins/collins_closed_list.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.22 (Closed Lists)",
      ruleSummary: "Dù trong chuỗi liệt kê nhiều món đồ hay câu hỏi lựa chọn 'A or B', mục cuối cùng BẮT BUỘC phải hạ giọng sâu để phát tín hiệu: 'Danh sách đã kết thúc, tôi đã nói xong!'",
      diagram: "[Mục 1 ↗] , [Mục 2 ↗] ... and [MỤC CUỐI ↘] .",
      formula: "[Item A ↗] , [Item B ↗] and [Final Item ↘]",
      deepRationale: "Theo giáo trình Collins TOEIC (trang 22): Đây là bài kiểm tra cốt lõi của TOEIC Speaking Part 1. Nếu thí sinh tiếp tục lên giọng ở mục cuối, giám khảo sẽ trừ điểm vì câu bị hiểu thành 'danh sách mở dở dang' (Open list).",
      vietnamesePitfalls: "Thí sinh bị đà 'lên giọng' cuốn đi, lên giọng ở mục 1, mục 2 rồi lên luôn ở mục cuối cùng (apples ↗, bananas ↗, and milk ↗?), khiến bài nói bị hụt hẫng và mất điểm ngữ điệu.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy coi chữ 'AND' hoặc 'OR' trước mục cuối cùng như một cái phanh hãm: Gặp 'and' là chuẩn bị cho giọng rơi thẳng xuống đáy!",
      contextualDialogue: {
        title: "Hội thoại: Tiếp viên phục vụ đồ uống trên máy bay",
        context: "Tiếp viên hỏi hành khách lựa chọn thức uống với vế cuối hạ giọng dứt khoát.",
        lines: [
          { speaker: "Flight Attendant", en: "Would you like red wine ↗ or white wine ↘?", vn: "Quý khách muốn dùng rượu vang đỏ hay vang trắng ạ?", audioUrl: "audio/intonation/rule_rule_choice_dial_0.mp3", speechText: "Would you like red wine, or white wine." },
          { speaker: "Passenger", en: "Red wine, please ↘. Thank you ↘.", vn: "Cho tôi vang đỏ nhé. Cảm ơn cô.", audioUrl: "audio/intonation/rule_rule_choice_dial_1.mp3", speechText: "Red wine, please. Thank you." }
        ]
      },
      examples: [
        {
          en: "I bought some apples, oranges, bananas, and milk.",
          vn: "Tôi đã mua táo, cam, chuối và sữa (Mục cuối cùng hạ giọng kết thúc).",
          ipa: "/aɪ bɔːt səm ˈæplz ↗ ˈɒrɪndʒɪz ↗ bəˈnɑːnəz ↗ ənd mɪlk ↘/",
          marked: "I bought some apples ↗, oranges ↗, bananas ↗, and <strong>MILK</strong> ↘.",
          audioUrl: "audio/intonation/rule_rule_lists_ex_0.mp3",
          speechText: "I bought some apples, oranges, bananas, and milk.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Would you prefer coffee or tea?",
          vn: "Bạn muốn dùng cà phê hay trà? (Trà là lựa chọn cuối nên hạ giọng).",
          ipa: "/wʊd juː prɪˈfɜː ˈkɒfi ↗ ɔː tiː ↘/",
          marked: "Would you prefer coffee ↗ or <strong>TEA</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_choice_ex_0.mp3",
          speechText: "Would you prefer coffee, or tea.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Are we traveling by train or by bus?",
          vn: "Chúng ta sẽ đi bằng tàu hỏa hay xe buýt?",
          ipa: "/ɑː wiː ˈtrævlɪŋ baɪ treɪn ↗ ɔː baɪ bʌs ↘/",
          marked: "Are we traveling by train ↗ or by <strong>BUS</strong> ↘?",
          audioUrl: "audio/intonation/rule_rule_choice_ex_1.mp3",
          speechText: "Are we traveling by train, or by bus.",
          speechPitch: 1.0,
          speechRate: 0.88
        }
      ]
    },

    // =======================================================================
    // NHÓM 2: CÁC TRƯỜNG HỢP LÊN GIỌNG (RISING TONE ↗)
    // =======================================================================
    {
      id: "rule_yes_no",
      num: 7,
      group: "rising",
      title: "Câu Hỏi Yes / No (Yes / No Questions)",
      tonePattern: "Lên giọng ở cuối câu (Rising ↗)",
      badge: "Quy tắc kinh điển mọi cấp độ",
      collinsTrack: "audio/collins/collins_yes_no_rising.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.07 (Yes/No Questions Rising)",
      ruleSummary: "Câu hỏi bắt đầu bằng trợ động từ (Do, Does, Did, Are, Is, Have, Has, Can, Will, Would...) luôn VÚT CAO GIỌNG ở âm tiết cuối cùng để hỏi thông tin đúng hay sai.",
      diagram: "Trợ động từ + Chủ ngữ + ... + [Từ cuối ↗] ?",
      formula: "[Aux + S + V ↗ ?]",
      deepRationale: "Theo Peter Roach & Collins TOEIC (trang 18): Câu hỏi Yes/No là câu hỏi đóng, người nói thiếu thông tin xác nhận nên cao độ được kéo vút lên ở âm tiết mang trọng âm cuối cùng để trao quyền phát biểu cho đối phương.",
      vietnamesePitfalls: "Học viên thường đọc ngang bè bè hoặc hạ giọng như câu khẳng định (ví dụ: 'Do you live in Hanoi ↘?'), khiến người nghe tưởng bạn đang lẩm bẩm khẳng định thay vì đặt câu hỏi.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy giữ đầu câu ở cao độ vừa phải, đến âm tiết cuối cùng thì nâng cao vòm họng và nhướng nhẹ chân mày để hỗ trợ đẩy cao độ lên.",
      contextualDialogue: {
        title: "Hội thoại: Lễ tân khách sạn đón khách (Hotel Check-in)",
        context: "Lễ tân xác nhận thông tin đặt phòng với khách du lịch.",
        lines: [
          { speaker: "Receptionist", en: "Do you have a reservation with us tonight ↗?", vn: "Quý khách đã có đặt phòng trước tối nay chưa ạ?", audioUrl: "audio/intonation/rule_rule_yes_no_dial_0.mp3", speechText: "Do you have a reservation with us tonight?" },
          { speaker: "Guest", en: "Yes ↘, I booked a deluxe room under the name of Smith ↘.", vn: "Vâng, tôi có đặt phòng deluxe dưới tên Smith.", audioUrl: "audio/intonation/rule_rule_yes_no_dial_1.mp3", speechText: "Yes, I booked a deluxe room under the name of Smith." }
        ]
      },
      examples: [
        {
          en: "Do you live in New York?",
          vn: "Bạn có sống ở New York không?",
          ipa: "/duː juː lɪv ɪn njuː jɔːk ↗/",
          marked: "Do you live in New <strong>YORK</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_yes_no_ex_0.mp3",
          speechText: "Do you live in New York?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Have you finished your homework?",
          vn: "Con đã làm xong bài tập về nhà chưa?",
          ipa: "/hæv juː ˈfɪnɪʃt jɔː ˈhəʊmwɜːk ↗/",
          marked: "Have you finished your <strong>HOMEWORK</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_yes_no_ex_1.mp3",
          speechText: "Have you finished your homework?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Can you speak French?",
          vn: "Bạn có nói được tiếng Pháp không?",
          ipa: "/kæn juː spiːk frentʃ ↗/",
          marked: "Can you speak <strong>FRENCH</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_yes_no_ex_2.mp3",
          speechText: "Can you speak French?",
          speechPitch: 1.14,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_polite_requests",
      num: 8,
      group: "rising",
      title: "Lời Nhờ Vả & Yêu Cầu Lịch Sự (Polite Requests)",
      tonePattern: "Lên giọng mềm mỏng (Rising ↗)",
      badge: "Sắc thái khiêm nhường & Tôn trọng",
      ruleSummary: "Khi nhờ vả hoặc xin phép người khác giúp đỡ (Could you please..., Would you mind..., Excuse me...), bắt buộc LÊN GIỌNG ở từ cuối cùng để thể hiện sự nhã nhặn, tránh tạo cảm giác ra lệnh thô lỗ.",
      diagram: "Could/Would you please + ... + [Từ cuối ↗] ?",
      formula: "[Could / Would you... ↗ ?]",
      deepRationale: "Trong văn hóa giao tiếp tiếng Anh, lên giọng thể hiện sự khiêm nhường, trao quyền quyết định đồng ý hay từ chối cho đối phương. Nếu hạ giọng sâu (Could you help me ↘), đối phương sẽ cảm thấy bị bạn ra lệnh ép buộc.",
      vietnamesePitfalls: "Nhiều người nói 'Could you help me?' nhưng hạ giọng đục ở từ 'me ↘', khiến lời nhờ vả nghe như một mệnh lệnh trịch thượng.",
      teacherTips: "Mẹo của cô Nguyệt: Khi nói lời nhờ vả, hãy mỉm cười ở từ cuối cùng! Nụ cười giúp khóe môi kéo sang hai bên và nâng thanh quản lên tự nhiên.",
      contextualDialogue: {
        title: "Hội thoại: Nhờ đồng nghiệp giúp đỡ tại văn phòng",
        context: "Nhân viên nhờ đồng nghiệp xem qua bản hợp đồng một cách lịch thiệp.",
        lines: [
          { speaker: "Staff A", en: "Could you please review this contract for me ↗?", vn: "Cậu làm ơn xem qua bản hợp đồng này giúp tớ được không?", audioUrl: "audio/intonation/rule_rule_commands_requests_dial_0.mp3", speechText: "Could you please review this contract for me?" },
          { speaker: "Staff B", en: "Sure thing ↘! I will look at it right away ↘.", vn: "Được chứ! Tớ sẽ xem ngay bây giờ.", audioUrl: "audio/intonation/rule_rule_commands_requests_dial_1.mp3", speechText: "Sure thing! I will look at it right away." }
        ]
      },
      examples: [
        {
          en: "Could you please pass the salt?",
          vn: "Bạn làm ơn chuyển giúp tôi lọ muối được không? (Nhờ vả lịch sự).",
          ipa: "/kʊd juː pliːz pɑːs ðə sɔːlt ↗/",
          marked: "Could you please pass the <strong>SALT</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_commands_requests_ex_1.mp3",
          speechText: "Could you please pass the salt?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Hold on a minute, please.",
          vn: "Làm ơn giữ máy một chút nhé (Lịch sự, nhẹ nhàng).",
          ipa: "/həʊld ɒn ə ˈmɪnɪt pliːz ↗/",
          marked: "Hold on a minute, <strong>PLEASE</strong> ↗.",
          audioUrl: "audio/intonation/rule_rule_commands_requests_ex_2.mp3",
          speechText: "Hold on a minute, please.",
          speechPitch: 1.12,
          speechRate: 0.88
        },
        {
          en: "Could you please review this contract for me?",
          vn: "Cậu làm ơn xem qua bản hợp đồng này giúp tớ được không?",
          ipa: "/kʊd juː pliːz rɪˈvjuː ðɪs ˈkɒntrækt fɔː miː ↗/",
          marked: "Could you please review this contract for <strong>ME</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_commands_requests_dial_0.mp3",
          speechText: "Could you please review this contract for me?",
          speechPitch: 1.14,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_tag_unsure",
      num: 9,
      group: "rising",
      title: "Câu Hỏi Đuôi Khi Chưa Thực Sự Chắc (Tag Questions - Unsure)",
      tonePattern: "Lên giọng ở phần đuôi (Rising ↗)",
      badge: "Hỏi thật sự để lấy thông tin (Genuine Inquiry)",
      ruleSummary: "Khi người nói THỰC SỰ CHƯA BIẾT câu trả lời và muốn hỏi đối phương thật lòng (tương đương một câu hỏi Yes/No), bắt buộc LÊN GIỌNG ở phần đuôi.",
      diagram: "[Mệnh đề trần thuật] , [Trợ động từ + Đại từ ↗] ?",
      formula: "[Statement] , [Tag ↗ ?]",
      deepRationale: "Khi cao độ vút lên ở phần đuôi, người nghe lập tức nhận diện đây là một câu hỏi thật sự cần câu trả lời chứ không phải một lời nói đãi bôi xã giao.",
      vietnamesePitfalls: "Khi thực sự muốn hỏi thông tin (ví dụ hỏi người khác có thấy ví tiền của mình không) mà lại hạ giọng ở đuôi, người nghe sẽ tưởng bạn đã tìm thấy rồi!",
      teacherTips: "Mẹo của cô Nguyệt: Nếu trong lòng bạn đang băn khoăn và chưa biết chắc, hãy nhấc giọng cao lên ở trợ động từ và đại từ đuôi.",
      contextualDialogue: {
        title: "Hội thoại: Tìm kiếm đồ thất lạc (Looking for Keys)",
        context: "Một người đang vội vã tìm chìa khóa xe của mình.",
        lines: [
          { speaker: "Person A", en: "You haven't seen my keys, have you ↗?", vn: "Cậu có thấy chùm chìa khóa của tớ đâu không đấy?", audioUrl: "audio/intonation/rule_rule_tag_questions_ex_1.mp3", speechText: "You haven't seen my keys, have you?" },
          { speaker: "Person B", en: "Check on the kitchen table ↘. I saw them there earlier ↘.", vn: "Xem trên bàn bếp xem, hồi nãy tớ thấy ở đó đấy.", audioUrl: "audio/intonation/rule_rule_statements_ex_1.mp3", speechText: "Check on the kitchen table. I saw them there earlier." }
        ]
      },
      examples: [
        {
          en: "You haven't seen my keys, have you?",
          vn: "Cậu có thấy chìa khóa của tôi đâu không đấy? (Hỏi thật vì đang tìm chìa khóa).",
          ipa: "/juː hævnt siːn maɪ kiːz hæv juː ↗/",
          marked: "You haven't seen my keys, have <strong>YOU</strong> ↗?",
          audioUrl: "audio/intonation/rule_rule_tag_questions_ex_1.mp3",
          speechText: "You haven't seen my keys, have you?",
          speechPitch: 1.15,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_incomplete_items",
      num: 10,
      group: "rising",
      title: "Vế Liệt Kê Mở Đầu & Chuỗi Số (Incomplete Items & Number Series)",
      tonePattern: "Lên giọng ở các vế phía trước (Rising ↗)",
      badge: "Đặc sản TOEIC Part 1 (Collins Track 22 & 23)",
      collinsTrack: "audio/collins/collins_numbers_lists.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.23 (Series of Numbers)",
      ruleSummary: "Khi liệt kê danh sách hoặc đọc chuỗi số điện thoại, mã hiệu chuyến bay, các mục phía trước luôn LÊN GIỌNG để báo hiệu: 'Thông tin vẫn còn tiếp diễn, hãy chú ý lắng nghe!'",
      diagram: "[Mục 1 ↗] , [Mục 2 ↗] ... [Cụm số 1 ↗] ── [Cụm số 2 ↗]",
      formula: "[Item 1 ↗] , [Item 2 ↗] ... [Chưa kết thúc]",
      deepRationale: "Theo Collins TOEIC (trang 22, 23): Người bản xứ nhóm các con số thành từng cụm 3-4 số và lên giọng ở cuối mỗi cụm để bộ não người nghe kịp ghi nhận từng khối thông tin.",
      vietnamesePitfalls: "Học viên hay đọc chuỗi số một cách đều đều như đọc bảng cửu chương, khiến bài nói không có nhịp điệu và giám khảo rất khó theo dõi.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy ngắt chuỗi số điện thoại làm 3 cụm (3 số - 3 số - 4 số). Lên giọng ở 2 cụm đầu để tạo giai điệu chuẩn bản xứ.",
      contextualDialogue: {
        title: "Hội thoại: Cung cấp số điện thoại tổng đài",
        context: "Nhân viên tổng đài xác nhận số điện thoại hotline hỗ trợ khách hàng.",
        lines: [
          { speaker: "Customer", en: "Where can I contact if I have questions about my reservation ↘?", vn: "Tôi có thể liên hệ ở đâu nếu có thắc mắc?", audioUrl: "audio/intonation/rule_rule_numbers_series_dial_0.mp3", speechText: "Where can I contact if I have questions about my reservation." },
          { speaker: "Support Agent", en: "Our customer service number is 218 ↗ - 555 ↗ - 3675 ↘. Please call between nine and five ↘.", vn: "Số chăm sóc khách hàng của chúng tôi là 218 – 555 – 3675.", audioUrl: "audio/intonation/rule_rule_numbers_series_dial_1.mp3", speechText: "Our customer service number is two one eight, five five five, three six seven five. Please call between nine and five." }
        ]
      },
      examples: [
        {
          en: "Our new number is 218 - 555 - 3675.",
          vn: "Số điện thoại mới của chúng tôi là 218 – 555 – 3675 (Trích đề Collins Track 23).",
          ipa: "/aʊə njuː ˈnʌmbə z tuː wʌn eɪt ↗ faɪv faɪv faɪv ↗ θriː sɪks ˈsevn faɪv ↘/",
          marked: "Our new number is <strong>218</strong> ↗ – <strong>555</strong> ↗ – 3675 ↘.",
          audioUrl: "audio/intonation/rule_rule_numbers_series_ex_0.mp3",
          speechText: "Our new number is two one eight, five five five, three six seven five.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Flight VN 412 will depart from Gate 18.",
          vn: "Chuyến bay VN 412 sẽ khởi hành từ Cổng số 18.",
          ipa: "/flaɪt viː en fɔː wʌn tuː ↗ wɪl dɪˈpɑːt frəm ɡeɪt eɪˈtiːn ↘/",
          marked: "Flight <strong>VN 412</strong> ↗ will depart from GATE 18 ↘.",
          audioUrl: "audio/intonation/rule_rule_numbers_series_ex_1.mp3",
          speechText: "Flight VN four one two, will depart from Gate eighteen.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "We could visit London, Paris, Rome...",
          vn: "Chúng ta có thể ghé London, Paris, Rome... (Liệt kê mở: còn nhiều nơi nữa chưa kể).",
          ipa: "/wiː kʊd ˈvɪzɪt ˈlʌndən ↗ ˈpærɪs ↗ rəʊm ↗/",
          marked: "We could visit <strong>LONDON</strong> ↗, <strong>PARIS</strong> ↗, <strong>ROME</strong> ↗...",
          audioUrl: "audio/intonation/rule_rule_lists_ex_1.mp3",
          speechText: "We could visit London, Paris, Rome...",
          speechPitch: 1.04,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_dependent_clauses",
      num: 11,
      group: "rising",
      title: "Mệnh Đề Phụ Mở Đầu & Câu Điều Kiện (Introductory Clauses)",
      tonePattern: "Lên giọng ở cuối mệnh đề phụ (Rising ↗)",
      badge: "Cầu nối nhịp điệu câu phức",
      ruleSummary: "Khi mệnh đề phụ chỉ điều kiện (If), thời gian (When, Before), nhượng bộ (Although) đứng đầu câu, luôn LÊN GIỌNG ở cuối mệnh đề phụ để treo thông tin, chuẩn bị bước vào mệnh đề chính.",
      diagram: "[If / When / Although + Clause ↗] , [Main Clause ↘] .",
      formula: "[Dependent Clause ↗] , [Main Clause ↘]",
      deepRationale: "Mệnh đề phụ chỉ là điều kiện hoặc hoàn cảnh, ý chính chưa được giải phóng. Hiện tượng này gọi là 'Treo cao độ' (Suspension): người nói giữ cao độ lơ lửng ở giữa câu để kích thích sự chú ý của người nghe chờ đợi kết quả ở mệnh đề chính.",
      vietnamesePitfalls: "Nhiều bạn hạ giọng quá sớm ở cuối mệnh đề phụ (If you study hard ↘), khiến người nghe tưởng câu đã kết thúc và bất ngờ khi thí sinh nói tiếp vế sau.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy giữ cao độ vểnh lên ở từ cuối của mệnh đề phụ như một dấu móc xích nối liền vào mệnh đề chính.",
      contextualDialogue: {
        title: "Hội thoại: Họp bàn giải pháp kinh doanh",
        context: "Giám đốc đưa ra điều kiện tiên quyết cho đội ngũ tiếp thị.",
        lines: [
          { speaker: "Director", en: "If we increase our advertising budget next quarter ↗, what results can we expect ↘?", vn: "Nếu quý tới chúng ta tăng ngân sách quảng cáo, ta có thể kỳ vọng kết quả gì?", audioUrl: "audio/intonation/rule_rule_conditionals_dial_0.mp3", speechText: "If we increase our advertising budget next quarter, what results can we expect." },
          { speaker: "Marketer", en: "If we invest wisely ↗, our market share will expand by twenty percent ↘.", vn: "Nếu đầu tư khôn ngoan, thị phần của chúng ta sẽ tăng 20%.", audioUrl: "audio/intonation/rule_rule_conditionals_dial_1.mp3", speechText: "If we invest wisely, our market share will expand by twenty percent." }
        ]
      },
      examples: [
        {
          en: "If you study hard, you will pass the exam.",
          vn: "Nếu bạn học chăm chỉ, bạn sẽ đỗ kỳ thi (Mệnh đề If lên giọng).",
          ipa: "/ɪf juː ˈstʌdi hɑːd ↗ juː wɪl pɑːs ði ɪɡˈzæm ↘/",
          marked: "If you study <strong>HARD</strong> ↗, you will pass the exam ↘.",
          audioUrl: "audio/intonation/rule_rule_conditionals_ex_0.mp3",
          speechText: "If you study hard, you will pass the exam.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Although it was raining, they still played football.",
          vn: "Mặc dù trời mưa, họ vẫn chơi bóng đá.",
          ipa: "/ɔːlˈðəʊ ɪt wɒz ˈreɪnɪŋ ↗ ðeɪ stɪl pleɪd ˈfʊtbɔːl ↘/",
          marked: "Although it was <strong>RAINING</strong> ↗, they still played football ↘.",
          audioUrl: "audio/intonation/rule_rule_conditionals_ex_1.mp3",
          speechText: "Although it was raining, they still played football.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Before you leave, please turn off the lights.",
          vn: "Trước khi rời đi, xin vui lòng tắt đèn.",
          ipa: "/bɪˈfɔː juː liːv ↗ pliːz tɜːn ɒf ðə laɪts ↘/",
          marked: "Before you <strong>LEAVE</strong> ↗, please turn off the lights ↘.",
          audioUrl: "audio/intonation/rule_rule_conditionals_ex_2.mp3",
          speechText: "Before you leave, please turn off the lights.",
          speechPitch: 1.0,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_signposts_pausing",
      num: 12,
      group: "rising",
      title: "Từ Nối Dẫn Dắt & Ngắt Nghỉ Dấu Phẩy (Signposts & Punctuation)",
      tonePattern: "Lên giọng nhẹ + Nghỉ ngắn (Rising ↗)",
      badge: "Kỹ thuật thở đều bản xứ (Collins Track 29)",
      collinsTrack: "audio/collins/collins_punctuation_pausing.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.29 (Punctuation & Pausing)",
      ruleSummary: "Các từ nối chuyển ý (However ↗, In addition ↗, According to ↗) và vị trí trước dấu phẩy luôn LÊN GIỌNG NHẸ rồi nghỉ một nhịp ngắn (0.3s) để thính giả chuẩn bị tiếp nhận thông điệp tiếp theo.",
      diagram: "[Từ nối / Cụm tư duy ↗] , [nghỉ 0.3s] ── [Mệnh đề tiếp theo ↘]",
      formula: "[Signpost ↗ , ] + [Next Thought Group]",
      deepRationale: "Theo giáo trình Collins TOEIC (trang 24): Dấu phẩy phân tách các khối tư duy (Thought Groups). Lên giọng nhẹ ở từ nối giúp giữ nhịp thở bằng cơ hoành, tránh hụt hơi và tạo phong thái diễn thuyết đĩnh đạc.",
      vietnamesePitfalls: "Đọc lướt qua từ nối hoặc không ngắt nghỉ sau dấu phẩy, khiến câu dài bị dính chùm vào nhau và mất điểm tiêu chí Lưu loát (Fluency).",
      teacherTips: "Mẹo của cô Nguyệt: Coi dấu phẩy như một nốt nhạc hoa mỹ: vểnh nhẹ giọng lên rồi ngừng thở nửa giây trước khi sang ý mới.",
      contextualDialogue: {
        title: "Hội thoại: Báo cáo thường niên trước đại hội cổ đông",
        context: "Diễn giả trình bày các chỉ số kinh doanh bằng các từ nối chuẩn mực.",
        lines: [
          { speaker: "Speaker", en: "First of all ↗, welcome everyone ↘. However ↗, we faced several supply chain challenges this year ↘.", vn: "Đầu tiên, xin chào mừng mọi người. Tuy nhiên, năm nay chúng ta gặp phải một số thách thức chuỗi cung ứng.", audioUrl: "audio/intonation/rule_rule_signposts_dial_0.mp3", speechText: "First of all, welcome everyone. However, we faced several supply chain challenges this year." },
          { speaker: "Investor", en: "According to the financial statement ↗, your net revenue still increased significantly ↘.", vn: "Theo báo cáo tài chính, doanh thu thuần vẫn tăng trưởng đáng kể.", audioUrl: "audio/intonation/rule_rule_signposts_dial_1.mp3", speechText: "According to the financial statement, your net revenue still increased significantly." }
        ]
      },
      examples: [
        {
          en: "Additionally, all attendees will receive a training handbook.",
          vn: "Ngoài ra, tất cả người tham dự sẽ nhận được sổ tay đào tạo (Collins Quick Tip).",
          ipa: "/əˈdɪʃənəli ↗ ɔːl ətɛnˈdiːz wɪl rɪˈsiːv ə ˈtreɪnɪŋ ˈhændbʊk ↘/",
          marked: "<strong>ADDITIONALLY</strong> ↗, all attendees will receive a training handbook ↘.",
          audioUrl: "audio/intonation/rule_rule_signposts_ex_0.mp3",
          speechText: "Additionally, all attendees will receive a training handbook.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "In conclusion, we would like to thank all of our guests.",
          vn: "Tóm lại, chúng tôi xin chân thành cảm ơn toàn thể quý quan khách (Collins Track 25).",
          ipa: "/ɪn kənˈkluːʒən ↗ wiː wʊd laɪk tuː θæŋk ɔːl əv ˈaʊə ɡɛsts ↘/",
          marked: "<strong>IN CONCLUSION</strong> ↗, we'd like to thank all of our guests ↘.",
          audioUrl: "audio/intonation/rule_rule_signposts_ex_1.mp3",
          speechText: "In conclusion, we would like to thank all of our guests.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "According to the monthly report, our production has increased 300%.",
          vn: "Theo báo cáo hàng tháng, sản lượng của chúng ta đã tăng 300% (Collins Track 29).",
          ipa: "/əˈkɔːdɪŋ tuː ðə ˈmʌnθli rɪˈpɔːt ↗ ˈaʊə prəˈdʌkʃən hæz ɪnˈkriːst θriː ˈhʌndrəd pəˈsɛnt ↘/",
          marked: "According to the monthly report <strong>↗</strong>, | our production has increased 300% ↘. ||",
          audioUrl: "audio/intonation/rule_rule_punctuation_pausing_ex_0.mp3",
          speechText: "According to the monthly report, our production has increased three hundred percent.",
          speechPitch: 1.0,
          speechRate: 0.88
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 3: TRỌNG ÂM CÂU & NHỊP ĐIỆU ĐẲNG THỜI (SENTENCE STRESS & RHYTHM)
  // Biên soạn theo chuẩn Collins TOEIC Speaking Questions 1–2 (Tips & Tasks)
  // =========================================================================
  sentenceStress: {
    title: "Trọng Âm Câu & Nhịp Điệu Đẳng Thời (Sentence Stress & Rhythm)",
    subtitle: "Bí quyết tạo nhịp điệu bập bênh tự nhiên và đạt điểm tối đa tiêu chí Stress trong bài thi TOEIC Speaking Questions 1–2.",
    overview: "Trong tiếng Anh, không phải từ nào trong câu cũng được đọc mạnh như nhau. Tiếng Anh là ngôn ngữ đẳng thời trọng âm (Stress-timed language): người bản xứ chỉ dồn sức nhấn mạnh vào các TỪ NỘI DUNG (Content Words), và lướt qua rất nhanh các TỪ CHỨC NĂNG (Function Words). Nắm vững 4 nguyên lý trọng âm câu dưới đây giúp học viên thoát hoàn toàn khỏi cách nói 'đều đều như tụng kinh' của tiếng Việt.",
    
    // 1. CONTENT WORDS VS FUNCTION WORDS
    contentVsFunction: {
      headline: "1. Nguyên Tắc Cốt Lõi: Content Words (Nhấn Mạnh) vs. Function Words (Lướt Nhẹ)",
      explanation: "Đây là quy tắc nền tảng tạo nên nhịp điệu (rhythm) của tiếng Anh. Hãy nhớ câu thần chú: 'Có từ mang nghĩa thì nhấn to cao dài, từ ngữ pháp thì lướt nhanh trầm nhẹ'.",
      collinsTrack: "audio/collins/collins_sentence_stress_content.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.18 (Content vs. Function Words)",
      categories: [
        {
          type: "Content Words (TỪ NỘI DUNG — Nhấn Trọng Âm ★)",
          desc: "Mang thông tin cốt lõi của câu. Phải đọc TO HƠN, CAO HƠN, và KÉO DÀI HƠN.",
          badgeColor: "green",
          groups: [
            { pos: "Danh từ (Nouns)", examples: "meeting, employees, report, London, manager" },
            { pos: "Động từ chính (Main Verbs)", examples: "thank, attend, conduct, work, increase" },
            { pos: "Tính từ (Adjectives)", examples: "important, new, annual, fantastic, difficult" },
            { pos: "Trạng từ (Adverbs)", examples: "really, completely, strongly, quickly, early" },
            { pos: "Từ phủ định (Negatives)", examples: "not, don't, can't, never, nowhere" }
          ]
        },
        {
          type: "Function Words (TỪ CHỨC NĂNG — Đọc Lướt / Nhược Hóa)",
          desc: "Chỉ đóng vai trò kết nối ngữ pháp. Đọc NHẸ, NHANH, NGUYÊN ÂM BIẾN THÀNH /ə/ (Schwa).",
          badgeColor: "gray",
          groups: [
            { pos: "Mạo từ (Articles)", examples: "a, an, the (đọc nhẹ thành /ðə/, /ə/)" },
            { pos: "Giới từ (Prepositions)", examples: "to, in, on, at, of, for (đọc nhẹ thành /tə/, /əv/, /fə/)" },
            { pos: "Đại từ (Pronouns)", examples: "he, she, it, they, us, you, my, your" },
            { pos: "Trợ động từ (Auxiliaries)", examples: "is, are, was, have, has, can, will, do" },
            { pos: "Liên từ (Conjunctions)", examples: "and, but, or, so (đọc 'and' thành /ən/)" }
          ]
        }
      ],
      examples: [
        {
          en: "The employees are the ones to thank.",
          marked: "The em<strong>PLOY</strong>ees are the <strong>ONES</strong> to <strong>THANK</strong>.",
          analysis: "Trong câu có 7 từ, nhưng chỉ có 3 từ mang nội dung nhận trọng âm: emPLOYees (noun), ONES (pronoun đại diện), THANK (verb). Các từ 'The', 'are the', 'to' đọc lướt cực nhanh.",
          audioUrl: "audio/intonation/stress_ex_employees.mp3",
          speechText: "The employees are the ones to thank."
        },
        {
          en: "There's really not a lot to say about that.",
          marked: "There's <strong>REAL</strong>ly <strong>NOT</strong> a <strong>LOT</strong> to <strong>SAY</strong> about that.",
          analysis: "Nhấn mạnh vào REALly (adverb), NOT (negative), LOT (noun), SAY (main verb). Các từ 'There's a', 'to', 'about that' lướt nhẹ.",
          audioUrl: "audio/intonation/stress_ex_not_lot.mp3",
          speechText: "There's really not a lot to say about that."
        }
      ]
    },

    // 2. ADVERBS FOR EMPHASIS
    adverbsEmphasis: {
      headline: "2. Nhấn Mạnh Trạng Từ Chỉ Mức Độ (Adverbs for Emphasis)",
      explanation: "Trong các bài đọc TOEIC Speaking (thông báo sự kiện, quảng cáo dịch vụ, thư ngỏ giám đốc), các trạng từ như 'really', 'completely', 'strongly', 'extremely', 'absolutely' đóng vai trò thuyết phục người nghe. Người bản xứ luôn dồn trọng âm câu vào các trạng từ này để tạo sức nặng.",
      collinsTrack: "audio/collins/collins_adverbs_emphasis.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.19 (Adverbs Stressed for Emphasis)",
      examples: [
        {
          en: "We really don't have much time.",
          marked: "We <strong>REAL</strong>ly don't have much <strong>TIME</strong>.",
          vn: "Chúng ta thực sự không còn nhiều thời gian nữa đâu (Nhấn mạnh sự cấp bách).",
          audioUrl: "audio/intonation/stress_ex_really_time.mp3",
          speechText: "We really don't have much time."
        },
        {
          en: "I completely forgot the conference.",
          marked: "I com<strong>PLETE</strong>ly for<strong>GOT</strong> the <strong>CON</strong>ference.",
          vn: "Tôi hoàn toàn quên bẵng mất buổi hội nghị (Nhấn mạnh mức độ triệt để).",
          audioUrl: "audio/intonation/stress_ex_completely_forgot.mp3",
          speechText: "I completely forgot the conference."
        },
        {
          en: "We strongly suggest that you back up your computer files.",
          marked: "We <strong>STRONG</strong>ly sug<strong>GEST</strong> that you <strong>BACK UP</strong> your com<strong>PU</strong>ter files.",
          vn: "Chúng tôi cực kỳ khuyến nghị bạn nên sao lưu các tệp máy tính vào cuối ngày (Collins Track 20).",
          audioUrl: "audio/intonation/stress_ex_strongly_suggest.mp3",
          speechText: "We strongly suggest that you back up your computer files at the end of the day."
        }
      ]
    },

    // 3. CONTRASTIVE STRESS & NUMBERS (-TEEN VS -TY)
    contrastiveNumbers: {
      headline: "3. Bẫy Số Đếm (-teen vs -ty) & Trọng Âm Tương Phản (Contrastive Stress)",
      explanation: "Đây là 'chiếc bẫy điểm số' kinh điển trong bài thi TOEIC Q1-2: Giám khảo ETS luôn cố tình đưa các con số như 13, 30, 17, 70 vào văn bản để kiểm tra xem thí sinh có phân biệt được trọng âm âm tiết 1 hay 2 không. Khi câu có thông tin sửa sai hoặc đối lập, từ tương phản phải nhận trọng âm mạnh nhất toàn câu.",
      collinsTrack: "audio/collins/collins_contrastive_numbers.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.20 & Track 21 (Numbers & Contrastive Stress)",
      rulesComparison: [
        {
          type: "Đuôi -TEEN (13 – 19)",
          rule: "Luôn nhấn vào ÂM TIẾT THỨ 2 (-TEEN)",
          ipa: "/...ˈtiːn/ (Âm /iː/ căng dài, cao độ vút lên)",
          examples: "thirTEEN (/θɜːrˈtiːn/), fourTEEN, fifTEEN, sevenTEEN (/ˌsevnˈtiːn/)"
        },
        {
          type: "Đuôi -TY (30, 40 ... 70)",
          rule: "Luôn nhấn vào ÂM TIẾT THỨ 1 (Âm đầu)",
          ipa: "/ˈ...ti/ (Âm /i/ ngắn nhẹ, cao độ rơi xuống)",
          examples: "THIRty (/ˈθɜːrti/), FORty, FIFty, SEVenty (/ˈsevnti/)"
        }
      ],
      examples: [
        {
          en: "The correct numbers are 13 and 17, not 30 and 70.",
          marked: "The correct numbers are thir<strong>TEEN</strong> and seven<strong>TEEN</strong>, NOT <strong>THIR</strong>ty and <strong>SEV</strong>enty.",
          vn: "Các con số chính xác là 13 và 17, chứ KHÔNG PHẢI 30 và 70 (Trích đề Collins Track 20).",
          audioUrl: "audio/intonation/stress_ex_numbers_contrast.mp3",
          speechText: "The correct numbers are thirteen and seventeen, not thirty and seventy."
        },
        {
          en: "Please turn down the volume on the TV, not up.",
          marked: "Please turn <strong>DOWN</strong> the volume on the TV, <strong>NOT UP</strong>.",
          vn: "Làm ơn vặn NHỎ tivi lại, KHÔNG PHẢI vặn to lên đâu (Tương phản đối lập).",
          audioUrl: "audio/intonation/stress_ex_turn_down.mp3",
          speechText: "Please turn down the volume on the TV, not up."
        },
        {
          en: "The parking spaces are clearly marked 'visitor.'",
          marked: "The <strong>PARK</strong>ing spaces are <strong>CLEAR</strong>ly marked '<strong>VIS</strong>itor.'",
          vn: "Các chỗ đỗ xe được ghi rõ ràng là dành cho khách thăm quan.",
          audioUrl: "audio/intonation/stress_ex_parking_visitor.mp3",
          speechText: "The parking spaces are clearly marked visitor."
        }
      ]
    },

    // 4. HETERONYMS: NOUN (1) VS VERB (2) STRESS SHIFT
    nounVerbShift: {
      headline: "4. Bẫy Chuyển Trọng Âm Cặp Từ Noun / Verb (Two-Syllable Heteronyms)",
      explanation: "Trong tiếng Anh, hàng trăm từ có cùng mặt chữ nhưng đổi vị trí trọng âm hoàn toàn tùy theo loại từ trong câu: Đứng làm Danh từ/Tính từ nhấn ÂM 1, đứng làm Động từ nhấn ÂM 2. Đọc sai trọng âm sẽ làm sai lệch cấu trúc ngữ pháp và bị trừ điểm phát âm nặng.",
      collinsTrack: "audio/collins/collins_noun_verb_stress.mp3",
      collinsTrackTitle: "Collins Audio Track 01-02.12 & Track 13 (Noun/Verb Stress Shift)",
      pairs: [
        { word: "conduct", nStress: "CONduct /ˈkɒn.dʌkt/", nMeaning: "hạnh kiểm, tư cách, sự chỉ đạo", vStress: "conDUCT /kənˈdʌkt/", vMeaning: "tiến hành, thực hiện", exN: "follow the code of CONduct", exV: "will conDUCT a thorough search" },
        { word: "record", nStress: "REcord /ˈrek.ɔːd/", nMeaning: "kỷ lục, hồ sơ, bản ghi", vStress: "reCORD /rɪˈkɔːd/", vMeaning: "ghi nhận, ghi âm", exN: "set a new sales REcord", exV: "so we can reCORD your attendance" },
        { word: "produce", nStress: "PROduce /ˈprɒd.juːs/", nMeaning: "nông sản, rau củ quả", vStress: "proDUCE /prəˈdjuːs/", vMeaning: "sản xuất, chế tạo", exN: "made money in PROduce", exV: "the plant will proDUCE parts" },
        { word: "permit", nStress: "PERmit /ˈpɜː.mɪt/", nMeaning: "giấy phép, sự cấp phép", vStress: "perMIT /pəˈmɪt/", vMeaning: "cho phép", exN: "getting a scuba PERmit", exV: "smoking is not perMITted" },
        { word: "project", nStress: "PROject /ˈprɒdʒ.ekt/", nMeaning: "dự án, đề án", vStress: "proJECT /prəˈdʒekt/", vMeaning: "chiếu, dự phóng", exN: "several important PROjects", exV: "sales are proJECTed to grow" },
        { word: "increase", nStress: "INcrease /ˈɪn.kriːs/", nMeaning: "sự gia tăng", vStress: "inCREASE /ɪnˈkriːs/", vMeaning: "tăng lên", exN: "a significant INcrease", exV: "business is set to inCREASE" },
        { word: "refund", nStress: "REfund /ˈriː.fʌnd/", nMeaning: "tiền hoàn lại", vStress: "reFUND /rɪˈfʌnd/", vMeaning: "hoàn tiền", exN: "request a full REfund", exV: "we will reFUND your money" },
        { word: "contest", nStress: "CONtest /ˈkɒn.test/", nMeaning: "cuộc thi, hội thi", vStress: "conTEST /kənˈtest/", vMeaning: "tranh chấp, khiếu nại", exN: "pie-baking CONtest", exV: "decided to conTEST the decision" }
      ]
    }
  },

  // =========================================================================
  // PHẦN 4: PHÒNG THÍ NGHIỆM THÁI ĐỘ (ATTITUDINAL LAB)
  // Cùng 1 từ biến đổi ý nghĩa 180 độ theo cao độ tự nhiên
  // =========================================================================
  attitudes: [
    {
      word: "Really",
      ipa: "/ˈrɪəli/",
      theme: "Từ vựng bộc lộ sự thật, hoài nghi và kinh ngạc",
      teacherAdvice: "Từ 'Really' là con dao hai lưỡi trong giao tiếp công sở. Nếu bạn nói trầm 'Really ↘', sếp sẽ thấy bạn là người điềm tĩnh, đáng tin cậy. Nhưng nếu bạn nói 'Really ↗↘' sai chỗ, sếp có thể nghĩ bạn đang mỉa mai hoặc nghi ngờ năng lực của họ!",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Đồng tình / Khẳng định chắc chắn",
          vnMeaning: "Quả đúng như vậy / Tôi hoàn toàn tin điều đó.",
          context: "A: 'Trời hôm nay lạnh thật đấy!' — B: 'Really ↘.' (Đồng cảm sâu sắc)",
          speechText: "Really.",
          speechPitch: 0.90,
          speechRate: 0.85
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Tò mò / Hoài nghi nhẹ",
          vnMeaning: "Thật thế sao? Cậu nói nghiêm túc đấy chứ?",
          context: "A: 'Tôi vừa gặp giám đốc ở siêu thị.' — B: 'Really ↗?' (Muốn biết thêm)",
          speechText: "Really?",
          speechPitch: 1.16,
          speechRate: 0.95
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Kinh ngạc tột độ / Không tin nổi",
          vnMeaning: "Trời đất ơi, không thể tin nổi!",
          context: "A: 'Anh ấy vừa trúng số 10 tỷ!' — B: 'Really ↗↘?!' (Quá đỗi sốc)",
          speechText: "Really?!",
          speechPitch: 1.20,
          speechRate: 0.88
        },
        {
          tone: "level",
          symbol: "→",
          meaning: "Thờ ơ / Chán chường",
          vnMeaning: "Ừ, thế à... (Chẳng mấy quan tâm).",
          context: "A: 'Hôm nay tớ lại mua thêm đôi giày.' — B: 'Really →...' (Nghe chán ngấy)",
          speechText: "Really...",
          speechPitch: 0.96,
          speechRate: 0.78
        }
      ]
    },
    {
      word: "Excuse me",
      ipa: "/ɪkˈskjuːz miː/",
      theme: "Từ vựng xin lỗi, hỏi lại lịch thiệp và phản ứng phẫn nộ",
      teacherAdvice: "Nhiều học viên đi du lịch nước ngoài khi nghe không rõ người bản xứ nói gì thì lại quát 'What?'. Điều này cực kỳ bất lịch sự! Hãy dạy học viên mỉm cười và nói 'Excuse me ↗?' với giọng lên nhẹ nhàng.",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Xin lỗi chân thành sau va chạm",
          vnMeaning: "Thành thật xin lỗi vì tôi đã va phải bạn / làm phiền bạn.",
          context: "Khi bạn vô tình dẫm vào chân người khác trên tàu điện: 'Excuse me ↘.'",
          speechText: "Excuse me.",
          speechPitch: 0.92,
          speechRate: 0.85
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Hỏi lại lịch sự khi nghe không rõ",
          vnMeaning: "Xin lỗi, bạn có thể nói lại điều vừa rồi được không?",
          context: "Khi người đối diện nói quá nhỏ trong quán cà phê: 'Excuse me ↗?'",
          speechText: "Excuse me?",
          speechPitch: 1.15,
          speechRate: 0.95
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Phẫn nộ / Bị xúc phạm",
          vnMeaning: "Này, bạn vừa nói cái quái gì thế hả?!",
          context: "Khi ai đó xúc phạm hoặc chen ngang hàng thô lỗ: 'Excuse me ↗↘?!'",
          speechText: "Excuse me?!",
          speechPitch: 1.20,
          speechRate: 0.88
        }
      ]
    },
    {
      word: "Hello",
      ipa: "/həˈləʊ/",
      theme: "Lời chào hỏi và tạo ấn tượng đầu tiên",
      teacherAdvice: "Ấn tượng 7 giây đầu tiên khi phỏng vấn xin việc phụ thuộc rất nhiều vào chữ 'Hello'. Một chữ 'Hello ↗!' vui tươi, cởi mở sẽ khiến người phỏng vấn cảm thấy ứng viên là người tràn đầy năng lượng tích cực.",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Trang trọng / Xa cách",
          vnMeaning: "Chào bạn (Nghiêm túc, trang trọng trong công việc).",
          context: "Gặp đối tác cấp cao trong phòng họp nghiêm túc: 'Hello ↘.'",
          speechText: "Hello.",
          speechPitch: 0.92,
          speechRate: 0.85
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Thân thiện / Vui tươi / Cởi mở",
          vnMeaning: "Chào bạn nhé! (Ấm áp, sẵn sàng trò chuyện).",
          context: "Gặp bạn bè thân hoặc đón khách hàng vào quầy: 'Hello ↗!'",
          speechText: "Hello!",
          speechPitch: 1.15,
          speechRate: 0.95
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Gọi với / Mỉa mai ai đang lơ đễnh",
          vnMeaning: "Có ai ở nhà không? / Tỉnh lại đi xem nào!",
          context: "Gõ cửa căn phòng vắng hoặc gọi người bạn đang ngồi mơ màng: 'Hello ↗↘?!'",
          speechText: "Hello?!",
          speechPitch: 1.20,
          speechRate: 0.88
        }
      ]
    },
    {
      word: "Right",
      ipa: "/raɪt/",
      theme: "Kỹ năng lắng nghe tích cực (Active Listening) trong hội thoại",
      teacherAdvice: "Trong cuộc họp quốc tế, để thể hiện bạn đang tích cực theo dõi câu chuyện mà không cắt lời người nói, hãy dùng 'Right ↗' (nhẹ nhàng). Nhưng nếu bạn định phản biện ý kiến của họ, hãy dùng 'Right ↘↗... but...'.",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Xác nhận đúng / Hoàn toàn đồng ý",
          vnMeaning: "Chính xác / Tôi đồng ý.",
          context: "A: 'Cuộc họp lúc 9 giờ đúng không?' — B: 'Right ↘.'",
          speechText: "Right.",
          speechPitch: 0.92,
          speechRate: 0.85
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Khuyến khích nói tiếp (Active listening)",
          vnMeaning: "Hiểu rồi, bạn nói tiếp đi xem nào.",
          context: "Lắng nghe đồng nghiệp thuyết trình dự án: 'Right ↗, go on.'",
          speechText: "Right?",
          speechPitch: 1.15,
          speechRate: 0.95
        },
        {
          tone: "fall_rise",
          symbol: "↘↗",
          meaning: "Đồng ý dè dặt / Sắp phản bác",
          vnMeaning: "Đúng rồi đấy... nhưng mà...",
          context: "A: 'Giải pháp này tiết kiệm nhất.' — B: 'Right ↘↗... but it takes too long.'",
          speechText: "Right, but...",
          speechPitch: 1.04,
          speechRate: 0.85
        }
      ]
    },
    {
      word: "Thank you",
      ipa: "/ˈθæŋk juː/",
      theme: "Lời cảm ơn và xây dựng mối quan hệ",
      teacherAdvice: "Hãy dạy học viên phân biệt giữa lời cảm ơn xã giao hàng ngày (Thank you ↗ khi nhận cốc cà phê) và lời cảm ơn sâu sắc (Thank you ↘ khi ai đó cứu giúp bạn trong cơn hoạn nạn).",
      variations: [
        {
          tone: "fall",
          symbol: "↘",
          meaning: "Cảm ơn chân thành, trang trọng",
          vnMeaning: "Tôi chân thành cảm kích sự giúp đỡ quý báu của bạn.",
          context: "Sau khi nhận được sự giúp đỡ to lớn từ một người bạn: 'Thank you ↘.'",
          speechText: "Thank you.",
          speechPitch: 0.90,
          speechRate: 0.85
        },
        {
          tone: "rise",
          symbol: "↗",
          meaning: "Lịch sự thông thường hàng ngày",
          vnMeaning: "Cảm ơn bạn nhé (Nhẹ nhàng, khi nhận tiền thối hoặc giữ cửa).",
          context: "Nhân viên thu ngân thối tiền thừa cho bạn: 'Thank you ↗.'",
          speechText: "Thank you!",
          speechPitch: 1.14,
          speechRate: 0.95
        },
        {
          tone: "rise_fall",
          symbol: "↗↘",
          meaning: "Mỉa mai / Bực tức",
          vnMeaning: "Cảm ơn cậu nhiều nhé! (Mỉa mai vì bị làm phiền/làm hỏng việc).",
          context: "Ai đó vô ý làm đổ tách cà phê lên tài liệu của bạn: 'Thank you ↗↘!'",
          speechText: "Thank you?!",
          speechPitch: 1.20,
          speechRate: 0.88
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 4: 4 CHỨC NĂNG CỦA NGỮ ĐIỆU & THÍ NGHIỆM NUCLEUS SHIFT
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
        dialogueContext: "A: 'Why did you steal my book?' — B: 'I, didn't take your book! John took it!'",
        speechText: "I, didn't take your book.",
        speechPitch: 1.06
      },
      {
        word: "DIDN'T",
        ipa: "/ˈdɪdnt/",
        meaning: "Tôi TUYỆT ĐỐI KHÔNG làm việc đó!",
        explanation: "Nhấn mạnh sự phủ định tuyệt đối. Bác bỏ hoàn toàn cáo buộc của người nghe một cách quyết liệt.",
        dialogueContext: "A: 'Admit it, you took my book!' — B: 'I DID NOT take your book! Stop accusing me!'",
        speechText: "I DID NOT take your book.",
        speechPitch: 1.08
      },
      {
        word: "TAKE",
        ipa: "/teɪk/",
        meaning: "Tôi chỉ MƯỢN/CẦM HỘ thôi, không phải LẤY CẮP!",
        explanation: "Nhấn mạnh hành động: tôi có cầm cuốn sách nhưng không phải với ý định chiếm đoạt.",
        dialogueContext: "A: 'You took my book without asking!' — B: 'I didn't TAKE your book! I only borrowed it for an hour!'",
        speechText: "I didn't TAKE your book.",
        speechPitch: 1.06
      },
      {
        word: "YOUR",
        ipa: "/jɔː/",
        meaning: "Tôi lấy sách của NGƯỜI KHÁC, KHÔNG PHẢI CỦA BẠN!",
        explanation: "Tương phản quyền sở hữu: Cuốn sách tôi lấy là của Sarah hoặc của thư viện, không phải cuốn của bạn.",
        dialogueContext: "A: 'Hey, you have my book on your desk!' — B: 'I didn't take YOUR book! This is Sarah's book!'",
        speechText: "I didn't take YOUR book.",
        speechPitch: 1.08
      },
      {
        word: "BOOK",
        ipa: "/bʊk/",
        meaning: "Tôi lấy THỨ KHÁC (cây bút, máy tính), CHỨ KHÔNG PHẢI CUỐN SÁCH!",
        explanation: "Tương phản đồ vật: Thứ bạn bị mất là đồ vật khác, còn cuốn sách vẫn còn nguyên đó trên giá.",
        dialogueContext: "A: 'Give me back my book!' — B: 'I didn't take your BOOK! I borrowed your calculator!'",
        speechText: "I didn't take your BOOK.",
        speechPitch: 1.06
      }
    ]
  },

  // =========================================================================
  // PHẦN 5: CẨM NANG GIẢNG DẠY DÀNH CHO CÔ GIÁO (TEACHER'S PEDAGOGICAL GUIDE)
  // =========================================================================
  teacherGuide: {
    workflowSteps: [
      {
        num: 1,
        title: "Bước 1: Khởi Động Đôi Tai (Ear Calibration)",
        desc: "Trước khi bắt học viên nói, hãy cho học viên nghe Tab 1 (5 Loại Điệu Cốt Lõi) và bật nút 'Nghe Sóng Điệu'. Yêu cầu học viên nhắm mắt lại và chỉ tập trung cảm nhận cao độ bay lên hay rơi xuống như nốt nhạc. Đôi tai phải nhận diện được thì miệng mới phát âm đúng."
      },
      {
        num: 2,
        title: "Bước 2: Dạy Quy Tắc Gắn Với Ngữ Cảnh (Contextual Grammar)",
        desc: "Dùng Tab 2 (Quy Tắc Lên & Xuống Giọng) để giải thích cơ sở ngôn ngữ học. Không bắt học viên học vẹt công thức mà cho đọc to Đoạn hội thoại thực tế giữa 2 nhân vật (A và B). Chỉ ra bẫy ngữ âm kinh điển của câu hỏi Wh- và câu hỏi Lựa chọn."
      },
      {
        num: 3,
        title: "Bước 3: Đóng Vai Biểu Cảm Sắc Thái (Attitudinal Role-play)",
        desc: "Sử dụng Tab 3 (Thí Nghiệm Thái Độ) và Tab 4 (Nucleus Shift). Cho hai học viên bắt cặp đóng kịch: một người hỏi nghi ngờ, một người trả lời mỉa mai bằng các từ 'Really' hoặc 'Thank you' để lớp học sinh động và cười vui vẻ."
      },
      {
        num: 4,
        title: "Bước 4: Trắc Nghiệm Đánh Giá Nhanh (15-Question Ear Quiz)",
        desc: "Cho cả lớp cùng làm bài kiểm tra 15 câu ở Tab 5. Khuyến khích học viên đạt chuỗi đúng (streak) từ 8 câu trở lên để xây dựng sự tự tin trước khi bước vào luyện đề TOEIC Speaking Part 1."
      }
    ],
    signatureTechniques: [
      {
        title: "Kỹ Thuật 1: 'Ngân Hơi Vỗ Nhịp' (Humming & Beating)",
        desc: "Khi học viên bị ngượng hoặc phát âm từ vựng chưa chuẩn, hãy bảo học viên KHÔNG ĐỌC CHỮ mà hãy ngậm miệng lại và ngân nga 'hừm hừm' theo đúng giai điệu câu: 'Mmm-mmm mmm-mmm ↗ mmm-mmm ↘'. Khi giai điệu đã ngấm vào cơ thể, mới cho lồng chữ vào."
      },
      {
        title: "Kỹ Thuật 2: 'Vẽ Đường Cao Độ Bằng Tay' (Air Conducting)",
        desc: "Bắt buộc học viên dùng tay phải chỉ vào không trung khi luyện nói. Câu lên giọng thì tay vẽ mũi tên bay lên trần nhà; câu hạ giọng thì tay quét xuống mặt bàn. Vận động cơ thể (Kinesthetic) giúp liên kết não bộ ghi nhớ cao độ sâu gấp 3 lần."
      },
      {
        title: "Kỹ Thuật 3: 'Phóng Đại Biên Độ' (Exaggeration Drill)",
        desc: "Người Việt thường rụt rè nên cao độ khi nói tiếng Anh chỉ nhích được 5-10%, nghe vẫn phẳng lì. Cô hãy bảo học viên: 'Hãy nói quá lên gấp đôi cho cô, giống như em đang đóng kịch kịch tính trên sân khấu vậy!'. Nói quá lên trước rồi mới thu nhỏ về mức tự nhiên."
      }
    ],
    errorMatrix: [
      {
        mistake: "1. Câu hỏi Wh- bị vểnh giọng lên (Where do you live ↗?)",
        reason: "Ảnh hưởng từ câu hỏi Yes/No, học viên nghĩ cứ có dấu hỏi '?' là phải lên giọng.",
        teacherFix: "Bảo học viên tưởng tượng từ cuối cùng mang 'dấu huyền' tiếng Việt (Where do you lìve ↘)."
      },
      {
        mistake: "2. Liệt kê A, B, and C bị đọc phẳng lì một mạch không ngắt nghỉ",
        reason: "Học viên sợ ngắt hơi sẽ bị ngập ngừng hoặc không kịp thời gian.",
        teacherFix: "Yêu cầu ngắt đúng 0.3s tại dấu phẩy và kéo dài nguyên âm ở mỗi món đồ như bậc thang đi lên."
      },
      {
        mistake: "3. Hạ giọng ở cuối câu bị nuốt luôn phụ âm cuối (Ending Sounds)",
        reason: "Học viên đồng nhất việc 'hạ cao độ' với việc 'hạ âm lượng' và ngậm miệng sớm.",
        teacherFix: "Giải thích: Cao độ trầm xuống nhưng luồng hơi vẫn phải bật mạnh phụ âm cuối (/t/, /d/, /s/, /z/)."
      },
      {
        mistake: "4. Thêm dấu sắc tiếng Việt khi lên giọng (như ré-đí, pén)",
        reason: "Áp đặt thanh điệu tiếng Việt (Tone) vào ngữ điệu tiếng Anh (Intonation).",
        teacherFix: "Dạy kỹ thuật 'Gliding' (Trượt mượt mà): ngân dài nguyên âm rồi trượt lên, không được giật cục."
      }
    ]
  },

  // =========================================================================
  // PHẦN 6: 15 CÂU TRẮC NGHIỆM LUYỆN TAI NHẬN DIỆN CAO ĐỘ (EAR TRAINING QUIZ)
  // =========================================================================
  quiz: [
    {
      id: 1,
      type: "tone_id",
      category: "Nhận diện Cao độ",
      audioText: "She lives in California.",
      speechText: "She lives in California.",
      targetTone: "fall",
      speechPitch: 0.92,
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
      speechText: "Are you coming to the party?",
      targetTone: "rise",
      speechPitch: 1.15,
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
      speechText: "Really?!",
      targetTone: "rise_fall",
      speechPitch: 1.20,
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
      speechText: "What time does the train leave.",
      targetTone: "fall",
      speechPitch: 0.92,
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
      speechText: "Excuse me?",
      targetTone: "rise",
      speechPitch: 1.15,
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
      speechText: "We need apples, oranges, and bananas.",
      targetTone: "list",
      speechPitch: 1.0,
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
      speechText: "You're a student, aren't you.",
      targetTone: "fall",
      speechPitch: 0.94,
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
      speechText: "I like the color, though...",
      targetTone: "fall_rise",
      speechPitch: 1.04,
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
      speechText: "Do you want tea, or coffee.",
      targetTone: "choice",
      speechPitch: 1.0,
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
      speechText: "Thank you?!",
      targetTone: "rise_fall",
      speechPitch: 1.20,
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
      speechText: "If it rains tomorrow, we will stay at home.",
      targetTone: "conditional",
      speechPitch: 1.0,
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
      speechText: "Right, but...",
      targetTone: "fall_rise",
      speechPitch: 1.04,
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
      speechText: "I didn't take YOUR book.",
      targetTone: "accentual",
      speechPitch: 1.08,
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
      speechText: "Well, let me see...",
      targetTone: "level",
      speechPitch: 0.98,
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
      speechText: "Sit down.",
      targetTone: "fall",
      speechPitch: 0.90,
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
