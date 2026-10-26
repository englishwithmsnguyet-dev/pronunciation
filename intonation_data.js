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
        "Độ căng của dây thanh đới: Khi muốn lên giọng (↗), siết nhẹ dây thanh để tăng tần số rung $F_0$; khi muốn hạ giọng (↘), thả lỏng dây thanh để âm thanh trầm ấm rơi tự nhiên.",
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
      acousticDetails: "Tần số cơ bản $F_0$ giảm từ khoảng 260Hz - 280Hz xuống mức đáy 120Hz - 130Hz trong khoảng 0.4 - 0.5 giây.",
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
      acousticDetails: "Tần số cơ bản $F_0$ nâng từ khoảng 135Hz lên mức đỉnh 280Hz - 300Hz, tạo âm sắc ngân vang nhẹ.",
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
      acousticDetails: "Tần số $F_0$ phóng từ 160Hz vút lên đỉnh nhọn 330Hz - 350Hz rồi đổ sập xuống 120Hz.",
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
      acousticDetails: "Tần số $F_0$ dao động cực ít, giữ cố định quanh mức trung bình 190Hz - 200Hz.",
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
  // PHẦN 2: 8 QUY TẮC NGỮ PHÁP CHUYÊN SÂU (THE 8 GRAMMATICAL RULES)
  // =========================================================================
  rules: [
    {
      id: "rule_statements",
      num: 1,
      title: "Câu Trần Thuật (Statements)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Cực kỳ phổ biến (60% giao tiếp)",
      ruleSummary: "Đa số câu khẳng định và phủ định diễn tả sự thật, cung cấp thông tin hoàn chỉnh đều hạ cao độ ở từ khóa mang nghĩa cuối cùng.",
      diagram: "Subject + Verb + Object ───────────↘ (Chắc chắn & Trọn vẹn)",
      formula: "[Chủ ngữ] + [Vị ngữ] + [Tân ngữ / Trạng từ ↘]",
      deepRationale: "Hạ giọng ở cuối câu trần thuật là tín hiệu âm học sinh học phổ quát của con người: dây thanh đới chùng xuống, báo hiệu lượng thông tin đã được giải phóng trọn vẹn, người nghe không cần phải phỏng đoán thêm.",
      vietnamesePitfalls: "Nhiều học viên Việt Nam hay có thói quen 'vểnh giọng' ở cuối câu trần thuật (Up-talk) do ảnh hưởng từ mạng xã hội hoặc do thiếu tự tin, khiến câu khẳng định nghe như một câu hỏi ngớ ngẩn (ví dụ: 'My name is Nam ↗?').",
      teacherTips: "Mẹo của cô Nguyệt: Hãy nhắc học viên tưởng tượng từ cuối cùng của câu khẳng định mang 'dấu huyền' nhẹ nhàng của tiếng Việt. Điều này giúp học viên tự động ghìm cao độ xuống đáy một cách êm ái.",
      contextualDialogue: {
        title: "Hội thoại: Báo cáo tiến độ dự án (Project Status Meeting)",
        context: "Trình bày thông tin dự án một cách chuyên nghiệp, dứt khoát trước hội đồng quản trị.",
        lines: [
          { speaker: "Manager", en: "When will the mobile application be ready for testing ↘?", vn: "Khi nào thì ứng dụng di động sẵn sàng để thử nghiệm?", speechText: "When will the mobile application be ready for testing." },
          { speaker: "Lead Dev", en: "Our development team has finished the core features ↘. We will launch the beta test next Monday ↘.", vn: "Đội ngũ phát triển đã hoàn thành các tính năng cốt lõi. Chúng tôi sẽ chạy thử nghiệm vào thứ Hai tới (Tự tin & chính xác).", speechText: "Our development team has finished the core features. We will launch the beta test next Monday." }
        ]
      },
      examples: [
        {
          en: "She works as a software engineer.",
          vn: "Cô ấy làm kỹ sư phần mềm (Sự thật rõ ràng).",
          ipa: "/ʃiː wɜːks æz ə ˈsɒftweər ˌendʒɪˈnɪə ↘/",
          marked: "She works as a software <strong>ENGINEER</strong> ↘.",
          speechText: "She works as a software engineer.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "I don't think that's a good idea.",
          vn: "Tôi không nghĩ đó là một ý kiến hay.",
          ipa: "/aɪ dəʊnt θɪŋk ðæts ə ɡʊd aɪˈdɪə ↘/",
          marked: "I don't think that's a good <strong>IDEA</strong> ↘.",
          speechText: "I don't think that's a good idea.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "I thought he was honest...",
          vn: "Tôi từng nghĩ anh ta thành thật... (Dè dặt, ngầm ý: hóa ra không phải).",
          ipa: "/aɪ θɔːt hiː wɒz ˈɒnɪst ↘↗/",
          marked: "I thought he was <strong>HONEST</strong> ↘↗...",
          speechText: "I thought he was honest, though...",
          speechPitch: 1.04,
          speechRate: 0.86
        }
      ]
    },
    {
      id: "rule_wh_questions",
      num: 2,
      title: "Câu Hỏi Wh- (Information Questions)",
      tonePattern: "Hạ giọng ở cuối câu (Falling ↘)",
      badge: "Lỗi sai số 1 của học viên",
      ruleSummary: "Câu hỏi bắt đầu bằng Who, What, Where, When, Why, Which, How có ngữ điệu CHUẨN BẢN XỨ LÀ HẠ GIỌNG ↘, tuyệt đối không lên giọng!",
      diagram: "Wh- Word ───────────↘ (Đòi hỏi thông tin thực tế)",
      formula: "[Wh- Word] + [Trợ ĐT] + [S] + [V] ↘",
      deepRationale: "Tại sao câu hỏi Wh- lại hạ giọng? Vì từ để hỏi (Who, What, Where...) đã đứng ở đầu câu làm nhiệm vụ báo hiệu đây là một câu hỏi rồi! Người bản xứ không cần phải lên giọng ở cuối câu nữa. Hạ giọng ở cuối câu Wh- thể hiện tính lịch thiệp, tự nhiên và tập trung vào thông tin cần trả lời.",
      vietnamesePitfalls: "Đây là lỗi sai phổ biến nhất: 90% người Việt cứ thấy câu hỏi là tự động 'vểnh giọng' lên ở từ cuối! Đọc 'Where do you live ↗?' nghe rất kỳ quặc, thiếu tự nhiên và làm mất điểm nặng trong bài thi TOEIC/IELTS Speaking.",
      teacherTips: "Mẹo của cô Nguyệt: Hãy đặt câu hỏi cho học viên: 'Trong tiếng Việt, câu 'Mày đi đâu đấy?' người ta có lên giọng the thé ở cuối không?'. Không! Tiếng Anh cũng vậy: 'Where are you going ↘?'. Hãy hướng dẫn học viên gõ nhẹ ngón tay xuống bàn ở từ cuối cùng.",
      contextualDialogue: {
        title: "Hội thoại: Hỏi đường ở sân bay (Airport Navigation)",
        context: "Hành khách hỏi thông tin nhân viên mặt đất với ngữ điệu tự nhiên, chuẩn mực.",
        lines: [
          { speaker: "Passenger", en: "Excuse me ↗, where can I pick up my luggage ↘?", vn: "Xin lỗi anh, tôi có thể lấy hành lý ở đâu vậy ạ?", speechText: "Excuse me, where can I pick up my luggage." },
          { speaker: "Airport Staff", en: "Baggage claim is on the ground floor ↘, right next to Carousel Three ↘.", vn: "Khu vực trả hành lý ở tầng trệt, ngay cạnh băng chuyền số 3 ạ.", speechText: "Baggage claim is on the ground floor, right next to Carousel Three." }
        ]
      },
      examples: [
        {
          en: "Where did you buy this jacket?",
          vn: "Bạn mua chiếc áo khoác này ở đâu vậy? (Câu hỏi Wh- chuẩn).",
          ipa: "/weə dɪd juː baɪ ðɪs ˈdʒækɪt ↘/",
          marked: "Where did you buy this <strong>JACKET</strong> ↘?",
          speechText: "Where did you buy this jacket.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "What time does the conference start?",
          vn: "Mấy giờ thì hội nghị bắt đầu?",
          ipa: "/wɒt taɪm dʌz ðə ˈkɒnfərəns stɑːt ↘/",
          marked: "What time does the conference <strong>START</strong> ↘?",
          speechText: "What time does the conference start.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "What was your name again?",
          vn: "Tên bạn là gì nhỉ? (Hỏi lại thân thiện, xin lỗi vì quên tên).",
          ipa: "/wɒt wɒz jɔː neɪm əˈɡen ↗/",
          marked: "What was your name <strong>AGAIN</strong> ↗?",
          speechText: "What was your name again?",
          speechPitch: 1.15,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_yes_no",
      num: 3,
      title: "Câu Hỏi Yes / No",
      tonePattern: "Lên giọng ở cuối câu (Rising ↗)",
      badge: "Quy tắc kinh điển",
      ruleSummary: "Câu hỏi bắt đầu bằng trợ động từ (Do, Does, Did, Are, Is, Have, Has, Can, Will, Would...) luôn lên giọng cao dần về cuối để mời gọi xác nhận.",
      diagram: "Auxiliary + Subject ───────────↗ (Chờ đợi xác nhận Yes/No)",
      formula: "[Trợ động từ] + [S] + [V] ↗",
      deepRationale: "Câu hỏi Yes/No là câu hỏi đóng (Closed question): người nói không biết chắc tính chân thực của mệnh đề và muốn trao toàn quyền xác nhận Đúng/Sai cho người nghe. Cao độ nâng lên biểu thị sự chờ đợi câu trả lời từ đối phương.",
      vietnamesePitfalls: "Học viên hay lên giọng bằng cách 'thêm dấu sắc' khiến âm cuối nghe rất gay gắt và bị méo nguyên âm (ví dụ: 'pen' đọc thành 'pén'). Hãy nhớ: Lên giọng là nâng CAO ĐỘ (Pitch), không làm thay đổi nguyên âm chuẩn của từ!",
      teacherTips: "Mẹo của cô Nguyệt: Hướng dẫn học viên bắt đầu câu hỏi bằng một tông giọng trung bình trầm, và chỉ bắt đầu 'cất cánh' nâng cao độ ở 1-2 âm tiết cuối cùng giống như máy bay cất cánh khỏi đường băng.",
      contextualDialogue: {
        title: "Hội thoại: Gọi món tại nhà hàng (Ordering at a Restaurant)",
        context: "Bồi bàn hỏi thăm thực khách về nhu cầu dùng bữa.",
        lines: [
          { speaker: "Waiter", en: "Are you ready to order your main course ↗?", vn: "Quý khách đã sẵn sàng gọi món chính chưa ạ?", speechText: "Are you ready to order your main course?" },
          { speaker: "Customer", en: "Yes ↘, I will have the grilled salmon, please ↘.", vn: "Vâng, cho tôi món cá hồi nướng nhé.", speechText: "Yes, I will have the grilled salmon, please." }
        ]
      },
      examples: [
        {
          en: "Do you live in New York?",
          vn: "Bạn có sống ở New York không?",
          ipa: "/duː juː lɪv ɪn njuː jɔːk ↗/",
          marked: "Do you live in New <strong>YORK</strong> ↗?",
          speechText: "Do you live in New York?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Have you finished your homework?",
          vn: "Con đã làm xong bài tập về nhà chưa?",
          ipa: "/hæv juː ˈfɪnɪʃt jɔː ˈhəʊmwɜːk ↗/",
          marked: "Have you finished your <strong>HOMEWORK</strong> ↗?",
          speechText: "Have you finished your homework?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Can you speak French?",
          vn: "Bạn có nói được tiếng Pháp không?",
          ipa: "/kæn juː spiːk frentʃ ↗/",
          marked: "Can you speak <strong>FRENCH</strong> ↗?",
          speechText: "Can you speak French?",
          speechPitch: 1.14,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_choice",
      num: 4,
      title: "Câu Hỏi Lựa Chọn (Alternative Questions với 'OR')",
      tonePattern: "Vế 1 Lên (↗) — Vế cuối Xuống (↘)",
      badge: "Quy tắc 2 vế bắt buộc",
      ruleSummary: "Khi đưa ra các phương án chọn lựa bằng liên từ 'or': Lên giọng ở lựa chọn thứ nhất (↗) và HẠ GIỌNG DỨT KHOÁT ở lựa chọn cuối cùng (↘).",
      diagram: "Option 1 ↗  or  Option 2 ↘ (Chốt danh sách lựa chọn)",
      formula: "[Lựa chọn 1 ↗] + or + [Lựa chọn 2 ↘]",
      deepRationale: "Vế 1 lên giọng (↗) báo hiệu: 'Đây là phương án A, nhưng chưa hết đâu nhé'. Vế 2 hạ giọng (↘) báo hiệu: 'Đây là phương án B và là lựa chọn cuối cùng rồi, bạn chỉ được chọn 1 trong 2'.",
      vietnamesePitfalls: "BẪY TAI HẠI NHẤT: Nếu bạn lên giọng ở cả hai vế ('Would you like tea ↗ or coffee ↗?'), câu đó lập tức biến thành câu hỏi Yes/No: 'Bạn có muốn uống chút gì đó (như trà hay cà phê) không?'. Khi đó khách sẽ trả lời 'Yes, please' chứ không chọn trà hay cà phê!",
      teacherTips: "Mẹo của cô Nguyệt: Hãy vẽ hình cây cầu bập bênh: vế 1 nhấc bổng lên cao, vế 2 dập xuống đất. Bắt học viên luyện tập bằng cách chỉ tay trái lên (coffee ↗), chỉ tay phải xuống (tea ↘).",
      contextualDialogue: {
        title: "Hội thoại: Tiếp viên hàng không phục vụ đồ uống (In-flight Service)",
        context: "Tiếp viên hỏi hành khách lựa chọn thức uống trên chuyến bay.",
        lines: [
          { speaker: "Flight Attendant", en: "Would you like red wine ↗ or white wine ↘?", vn: "Quý khách muốn dùng rượu vang đỏ hay vang trắng ạ?", speechText: "Would you like red wine, or white wine." },
          { speaker: "Passenger", en: "Red wine, please ↘. Thank you ↘.", vn: "Cho tôi vang đỏ nhé. Cảm ơn cô.", speechText: "Red wine, please. Thank you." }
        ]
      },
      examples: [
        {
          en: "Would you prefer coffee or tea?",
          vn: "Bạn muốn dùng cà phê hay trà? (Chọn 1 trong 2).",
          ipa: "/wʊd juː prɪˈfɜː ˈkɒfi ↗ ɔː tiː ↘/",
          marked: "Would you prefer <strong>COFFEE</strong> ↗ or <strong>TEA</strong> ↘?",
          speechText: "Would you prefer coffee, or tea.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Are we traveling by train or by bus?",
          vn: "Chúng ta sẽ đi bằng tàu hỏa hay xe buýt?",
          ipa: "/ɑː wiː ˈtrævlɪŋ baɪ treɪn ↗ ɔː baɪ bʌs ↘/",
          marked: "Are we traveling by <strong>TRAIN</strong> ↗ or by <strong>BUS</strong> ↘?",
          speechText: "Are we traveling by train, or by bus.",
          speechPitch: 1.0,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_tag_questions",
      num: 5,
      title: "Câu Hỏi Đuôi (Tag Questions)",
      tonePattern: "Chắc chắn $\\rightarrow$ Xuống (↘) | Chưa chắc $\\rightarrow$ Lên (↗)",
      badge: "Phản ánh tâm lý khảo thí",
      ruleSummary: "Ngữ điệu của câu hỏi đuôi phản ánh chính xác 100% mức độ tự tin của người nói trong giao tiếp.",
      diagram: "Chắc chắn 100%: ──↘ (Đồng tình đi nào!) | Chưa chắc: ──↗ (Hỏi thật đấy!)",
      formula: "Câu kể + [Trợ ĐT + Đại từ ↘ hoặc ↗]",
      deepRationale: "• Điệu Xuống (Falling Tag ↘): Người nói ĐÃ BIẾT CHẮC đáp án rồi, không có nhu cầu hỏi thêm, chỉ cần người nghe gật đầu tán thành theo mình.\n• Điệu Lên (Rising Tag ↗): Người nói CHƯA BIẾT THỰC SỰ và đang hỏi thật sự như một câu hỏi Yes/No thông thường.",
      vietnamesePitfalls: "Học viên khi làm bài thi ngữ pháp trên giấy thì làm đúng, nhưng khi nói thì luôn lên giọng ở đuôi vì nghĩ 'cứ có dấu hỏi là phải lên giọng', dẫn đến việc biến một lời chào xã giao thân mật thành một câu tra khảo đối phương!",
      teacherTips: "Mẹo của cô Nguyệt: Trong đời sống, 80% câu hỏi đuôi dùng điệu HẠ GIỌNG ↘ để tạo sự đồng cảm (ví dụ khen thời tiết đẹp: 'Nice day, isn't it ↘?'). Hãy dạy học viên hạ giọng để tạo phong thái ấm áp, gần gũi.",
      contextualDialogue: {
        title: "Hội thoại: Trò chuyện xã giao công sở (Small Talk)",
        context: "Hai đồng nghiệp gặp nhau ở hành lang và bắt chuyện thời tiết.",
        lines: [
          { speaker: "Colleague A", en: "The new marketing strategy is very promising, isn't it ↘?", vn: "Chiến lược tiếp thị mới rất nhiều triển vọng, đúng không nào? (Đồng tình đi nào!).", speechText: "The new marketing strategy is very promising, isn't it." },
          { speaker: "Colleague B", en: "Absolutely ↘! I think our sales will double next quarter ↘.", vn: "Chắc chắn rồi! Tớ nghĩ doanh số sẽ tăng gấp đôi trong quý tới.", speechText: "Absolutely! I think our sales will double next quarter." }
        ]
      },
      examples: [
        {
          en: "It's a beautiful day, isn't it?",
          vn: "Trời đẹp quá, đúng không nào? (Người nói biết chắc trời đang rất đẹp).",
          ipa: "/ɪts ə ˈbjuːtɪfl deɪ ˈɪznt ɪt ↘/",
          marked: "It's a beautiful day, isn't it ↘?",
          speechText: "It's a beautiful day, isn't it.",
          speechPitch: 0.94,
          speechRate: 0.90
        },
        {
          en: "You haven't seen my keys, have you?",
          vn: "Cậu có thấy chìa khóa của tôi đâu không đấy? (Hỏi thật vì đang tìm chìa khóa).",
          ipa: "/juː hævnt siːn maɪ kiːz hæv juː ↗/",
          marked: "You haven't seen my keys, have you ↗?",
          speechText: "You haven't seen my keys, have you?",
          speechPitch: 1.15,
          speechRate: 0.90
        }
      ]
    },
    {
      id: "rule_commands_requests",
      num: 6,
      title: "Câu Mệnh Lệnh (Commands) vs Lời Yêu Cầu (Requests)",
      tonePattern: "Mệnh lệnh $\\rightarrow$ Xuống (↘) | Yêu cầu lịch sự $\\rightarrow$ Lên (↗) hoặc ↘↗",
      badge: "Sắc thái quyền lực vs Lịch sự",
      ruleSummary: "Mệnh lệnh dứt khoát hạ giọng để thể hiện thẩm quyền; Lời nhờ vả lịch sự lên giọng hoặc dùng Fall-Rise để giảm nhẹ độ áp đặt.",
      diagram: "Mệnh lệnh: ──↘ (Dứt khoát) | Yêu cầu: ──↗ hoặc ──↘↗ (Mềm mỏng)",
      formula: "Command: [V-inf ↘] | Request: [Could/Would you... ↗]",
      deepRationale: "Hạ giọng sâu trong mệnh lệnh thể hiện vị thế quyền lực cao hơn (sếp ra lệnh cho nhân viên, giáo viên bảo học sinh, cha mẹ bảo con cái). Nếu trong lời nhờ vả đối tác mà bạn hạ giọng sâu, đối tác sẽ cảm thấy bị bạn ra lệnh một cách trịch thượng và thô lỗ.",
      vietnamesePitfalls: "Học viên nói 'Could you help me?' nhưng lại phát âm với giọng điệu trầm đục và hạ sâu ở từ 'me ↘', khiến người nước ngoài cảm thấy như đang bị 'bắt buộc' phải giúp chứ không phải đang được nhờ vả một cách lịch sự.",
      teacherTips: "Mẹo của cô Nguyệt: Khi nhờ vả ai, hãy mỉm cười nhẹ khi nói từ cuối cùng! Nụ cười tự nhiên sẽ kéo khóe môi sang hai bên và nâng cao độ thanh quản lên một cách tự nhiên mà không cần gắng gượng.",
      contextualDialogue: {
        title: "Hội thoại: Nhờ vả đồng nghiệp tại văn phòng (Office Collaboration)",
        context: "Nhân viên nhờ đồng nghiệp chuyển tài liệu một cách lịch thiệp, dễ mến.",
        lines: [
          { speaker: "Staff A", en: "Could you please review this contract for me ↗?", vn: "Cậu làm ơn xem qua bản hợp đồng này giúp tớ được không?", speechText: "Could you please review this contract for me?" },
          { speaker: "Staff B", en: "Sure thing ↘! I will look at it right away ↘.", vn: "Được chứ! Tớ sẽ xem ngay bây giờ.", speechText: "Sure thing! I will look at it right away." }
        ]
      },
      examples: [
        {
          en: "Open your books to page ten.",
          vn: "Mở sách ra trang số mười (Lời thầy cô ra lệnh trong lớp).",
          ipa: "/ˈəʊpən jɔː bʊks tuː peɪdʒ ten ↘/",
          marked: "Open your books to page <strong>TEN</strong> ↘.",
          speechText: "Open your books to page ten.",
          speechPitch: 0.92,
          speechRate: 0.88
        },
        {
          en: "Could you please pass the salt?",
          vn: "Bạn làm ơn chuyển giúp tôi lọ muối được không? (Yêu cầu lịch sự).",
          ipa: "/kʊd juː pliːz pɑːs ðə sɔːlt ↗/",
          marked: "Could you please pass the <strong>SALT</strong> ↗?",
          speechText: "Could you please pass the salt?",
          speechPitch: 1.14,
          speechRate: 0.90
        },
        {
          en: "Hold on a minute, please.",
          vn: "Làm ơn giữ máy một chút nhé (Lịch sự, nhẹ nhàng).",
          ipa: "/həʊld ɒn ə ˈmɪnɪt pliːz ↘↗/",
          marked: "Hold on a minute, <strong>PLEASE</strong> ↘↗.",
          speechText: "Hold on a minute, please.",
          speechPitch: 1.05,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_lists",
      num: 7,
      title: "Ngữ Điệu Liệt Kê (List Intonation)",
      tonePattern: "Liệt kê đóng: A ↗, B ↗, and C ↘ | Liệt kê mở: A ↗, B ↗, C ↗...",
      badge: "Quy tắc vàng TOEIC Speaking Part 1",
      ruleSummary: "Khi liệt kê một chuỗi các danh từ/tính từ: Lên giọng nhẹ ở các mục phía trước để báo hiệu chưa hết, và HẠ GIỌNG DỨT KHOÁT ở mục cuối cùng sau 'and'.",
      diagram: "Item 1 ↗  ,  Item 2 ↗  ,  and  Item 3 ↘ (Đóng danh sách)",
      formula: "A ↗, B ↗, and C ↘",
      deepRationale: "Trong bài thi TOEIC Speaking Part 1 (Read a text aloud), quy tắc này xuất hiện trong 100% các đề thi ETS! Giám khảo khảo thí chấm điểm rất khắt khe tiêu chí này để xem thí sinh có khả năng điều khiển nhịp thở và báo hiệu kết thúc danh sách hay không.",
      vietnamesePitfalls: "Học viên thường đọc liền một mạch không ngắt nghỉ ở dấu phẩy, hoặc đọc đều đều như tụng kinh, không có nhịp nhấc lên ở A và B.",
      teacherTips: "Mẹo của cô Nguyệt: Yêu cầu học viên ngắt nghỉ 0.3 giây tại mỗi dấu phẩy, và tưởng tượng mỗi món đồ như một nốt nhạc tăng dần: Đồ ↗, Rê ↗, Mi ↗... và nốt cuối rơi về Đô ↘!",
      contextualDialogue: {
        title: "Hội thoại: Thông báo trên chuyến bay (In-flight Announcement)",
        context: "Tiếp viên trưởng thông báo các dịch vụ miễn phí phục vụ hành khách.",
        lines: [
          { speaker: "Cabin Crew", en: "We are pleased to offer complimentary coffee ↗, orange juice ↗, and light snacks ↘.", vn: "Chúng tôi rất hân hạnh được phục vụ cà phê miễn phí, nước cam và đồ ăn nhẹ.", speechText: "We are pleased to offer complimentary coffee, orange juice, and light snacks." },
          { speaker: "Passenger", en: "Could I have some coffee, please ↗?", vn: "Cho tôi một ly cà phê nhé?", speechText: "Could I have some coffee, please?" }
        ]
      },
      examples: [
        {
          en: "I bought some apples, oranges, bananas, and milk.",
          vn: "Tôi đã mua một ít táo, cam, chuối và sữa (Hết danh sách).",
          ipa: "/aɪ bɔːt səm ˈæplz ↗ ˈɒrɪndʒɪz ↗ bəˈnɑːnəz ↗ ənd mɪlk ↘/",
          marked: "I bought some <strong>APPLES</strong> ↗, <strong>ORANGES</strong> ↗, <strong>BANANAS</strong> ↗, and <strong>MILK</strong> ↘.",
          speechText: "I bought some apples, oranges, bananas, and milk.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "We could visit London, Paris, Rome...",
          vn: "Chúng ta có thể ghé London, Paris, Rome... (Liệt kê mở: còn nhiều nơi nữa chưa kể).",
          ipa: "/wiː kʊd ˈvɪzɪt ˈlʌndən ↗ ˈpærɪs ↗ rəʊm ↗/",
          marked: "We could visit <strong>LONDON</strong> ↗, <strong>PARIS</strong> ↗, <strong>ROME</strong> ↗...",
          speechText: "We could visit London, Paris, Rome...",
          speechPitch: 1.04,
          speechRate: 0.88
        }
      ]
    },
    {
      id: "rule_conditionals",
      num: 8,
      title: "Mệnh Đề Phụ Mở Đầu (Introductory & Dependent Clauses)",
      tonePattern: "Mệnh đề phụ Lên (↗ hoặc ↘↗) — Mệnh đề chính Xuống (↘)",
      badge: "Cấu trúc ghép câu nâng cao",
      ruleSummary: "Khi mệnh đề phụ thuộc (chỉ điều kiện If, thời gian When, nhượng bộ Although...) đứng trước: Lên giọng nhẹ để nối sang mệnh đề chính rồi hạ giọng kết thúc.",
      diagram: "Dependent Clause ↗ / ↘↗  ,  Main Clause ───────────↘",
      formula: "[If / When / Although + Clause ↗] , [Main Clause ↘]",
      deepRationale: "Hiện tượng này gọi là 'Treo cao độ' (Suspension): người nói giữ cao độ lơ lửng ở giữa câu để giữ sự chú ý của người nghe, ngầm báo hiệu: 'Ý chính quan trọng nhất sắp xuất hiện ở vế sau, hãy chú ý nghe!'.",
      vietnamesePitfalls: "Học viên hay hạ giọng ở cuối mệnh đề phụ If, khiến người nghe tưởng câu nói đã kết thúc và bất ngờ khi thí sinh nói tiếp vế sau.",
      teacherTips: "Mẹo của cô Nguyệt: Dạy học viên coi dấu phẩy (,) như một bàn đạp nhảy: nhấc cao độ lên ở bàn đạp rồi đáp êm ái xuống đất ở cuối câu.",
      contextualDialogue: {
        title: "Hội thoại: Tư vấn khách hàng tại ngân hàng (Banking Advisory)",
        context: "Chuyên viên tài chính tư vấn điều kiện mở thẻ tín dụng cho khách hàng.",
        lines: [
          { speaker: "Advisor", en: "If you open an account today ↗, you will receive a cash bonus of fifty dollars ↘.", vn: "Nếu quý khách mở tài khoản ngay hôm nay, quý khách sẽ nhận được khoản tiền thưởng 50 đô la.", speechText: "If you open an account today, you will receive a cash bonus of fifty dollars." },
          { speaker: "Customer", en: "That sounds fantastic ↘! I would like to sign up now ↘.", vn: "Nghe tuyệt quá! Tôi muốn đăng ký ngay bây giờ.", speechText: "That sounds fantastic! I would like to sign up now." }
        ]
      },
      examples: [
        {
          en: "If you study hard, you will pass the exam.",
          vn: "Nếu bạn học chăm chỉ, bạn sẽ đỗ kỳ thi.",
          ipa: "/ɪf juː ˈstʌdi hɑːd ↗ juː wɪl pɑːs ði ɪɡˈzæm ↘/",
          marked: "If you study <strong>HARD</strong> ↗, you will pass the <strong>EXAM</strong> ↘.",
          speechText: "If you study hard, you will pass the exam.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Although it was raining, they still played football.",
          vn: "Mặc dù trời mưa, họ vẫn chơi bóng đá.",
          ipa: "/ɔːlˈðəʊ ɪt wɒz ˈreɪnɪŋ ↘↗ ðeɪ stɪl pleɪd ˈfʊtbɔːl ↘/",
          marked: "Although it was <strong>RAINING</strong> ↘↗, they still played <strong>FOOTBALL</strong> ↘.",
          speechText: "Although it was raining, they still played football.",
          speechPitch: 1.0,
          speechRate: 0.88
        },
        {
          en: "Before you leave, please turn off the lights.",
          vn: "Trước khi rời đi, xin vui lòng tắt đèn.",
          ipa: "/bɪˈfɔː juː liːv ↗ pliːz tɜːn ɒf ðə laɪts ↘/",
          marked: "Before you <strong>LEAVE</strong> ↗, please turn off the <strong>LIGHTS</strong> ↘.",
          speechText: "Before you leave, please turn off the lights.",
          speechPitch: 1.0,
          speechRate: 0.88
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 3: PHÒNG THÍ NGHIỆM THÁI ĐỘ (ATTITUDINAL LAB)
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
        desc: "Dùng Tab 2 (8 Quy Tắc Ngữ Pháp) để giải thích cơ sở ngôn ngữ học. Không bắt học viên học vẹt công thức mà cho đọc to Đoạn hội thoại thực tế giữa 2 nhân vật (A và B). Chỉ ra bẫy ngữ âm kinh điển của câu hỏi Wh- và câu hỏi Lựa chọn."
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
