#!/usr/bin/env python3
"""
Neural Audio Generator for Miss Nguyet Intonation Masterclass
Uses Microsoft Azure Edge Neural Voices (en-US-JennyNeural & en-US-GuyNeural)
with precision SSML prosody, pitch contours, and expressive conversational dynamics.
"""

import os
import sys
import json
import asyncio
import edge_tts

VOICE_FEMALE = "en-US-JennyNeural"
VOICE_MALE = "en-US-GuyNeural"

# Target directory
AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio", "intonation")
os.makedirs(AUDIO_DIR, exist_ok=True)

# 97 Audio Specifications
AUDIO_SPECS = [
    # =========================================================================
    # 1. TONE EXAMPLES (14 items)
    # =========================================================================
    # Falling tone (↘): pitch -5Hz, clear cadence
    {"id": "tone_fall_ex_0", "file": "tone_fall_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "I live in London."},
    {"id": "tone_fall_ex_1", "file": "tone_fall_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "+0%", "text": "Stop it right now."},
    {"id": "tone_fall_ex_2", "file": "tone_fall_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Where do you work."},

    # Rising tone (↗): pitch +15Hz, question inflection
    {"id": "tone_rise_ex_0", "file": "tone_rise_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Are you ready?"},
    {"id": "tone_rise_ex_1", "file": "tone_rise_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Excuse me?"},
    {"id": "tone_rise_ex_2", "file": "tone_rise_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Do you need any help?"},

    # Fall-Rise tone (↘↗): reservation, contrast
    {"id": "tone_fall_rise_ex_0", "file": "tone_fall_rise_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "I like the color, though..."},
    {"id": "tone_fall_rise_ex_1", "file": "tone_fall_rise_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "She is very nice, though..."},
    {"id": "tone_fall_rise_ex_2", "file": "tone_fall_rise_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Be careful, please."},

    # Rise-Fall tone (↗↘): surprise, excitement
    {"id": "tone_rise_fall_ex_0", "file": "tone_rise_fall_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+25Hz", "rate": "+0%", "text": "You won the lottery?!"},
    {"id": "tone_rise_fall_ex_1", "file": "tone_rise_fall_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Brilliant!"},
    {"id": "tone_rise_fall_ex_2", "file": "tone_rise_fall_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+25Hz", "rate": "+0%", "text": "Is that really true?!"},

    # Level tone (→): routine, hesitation
    {"id": "tone_level_ex_0", "file": "tone_level_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-15%", "text": "Well, let me see..."},
    {"id": "tone_level_ex_1", "file": "tone_level_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-10%", "text": "Number one, number two..."},

    # =========================================================================
    # 2. TONE DIALOGUES (10 items)
    # =========================================================================
    {"id": "tone_fall_dial_0", "file": "tone_fall_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Where do you currently work."},
    {"id": "tone_fall_dial_1", "file": "tone_fall_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "I work as a senior designer at TechCorp."},

    {"id": "tone_rise_dial_0", "file": "tone_rise_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Good morning! Do you have a reservation with us?"},
    {"id": "tone_rise_dial_1", "file": "tone_rise_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Yes, under the name of David Miller."},

    {"id": "tone_fall_rise_dial_0", "file": "tone_fall_rise_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "What do you think about the new logo design."},
    {"id": "tone_fall_rise_dial_1", "file": "tone_fall_rise_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+0Hz", "rate": "-5%", "text": "Well, I like the color, though... but the font is a bit small."},

    {"id": "tone_rise_fall_dial_0", "file": "tone_rise_fall_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Guess what! I got the scholarship to Oxford!"},
    {"id": "tone_rise_fall_dial_1", "file": "tone_rise_fall_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+20Hz", "rate": "+0%", "text": "Brilliant! That is incredible!"},

    {"id": "tone_level_dial_0", "file": "tone_level_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-10%", "text": "Student number one, student number two, student number three."},
    {"id": "tone_level_dial_1", "file": "tone_level_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-10Hz", "rate": "-5%", "text": "Present."},

    # =========================================================================
    # 3. RULE EXAMPLES (21 items)
    # =========================================================================
    # Statements (Fall ↘)
    {"id": "rule_rule_statements_ex_0", "file": "rule_rule_statements_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "She works as a software engineer."},
    {"id": "rule_rule_statements_ex_1", "file": "rule_rule_statements_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "I don't think that's a good idea."},
    {"id": "rule_rule_statements_ex_2", "file": "rule_rule_statements_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "I thought he was honest, though..."},

    # Wh-Questions (Fall ↘)
    {"id": "rule_rule_wh_questions_ex_0", "file": "rule_rule_wh_questions_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Where did you buy this jacket."},
    {"id": "rule_rule_wh_questions_ex_1", "file": "rule_rule_wh_questions_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "What time does the conference start."},
    {"id": "rule_rule_wh_questions_ex_2", "file": "rule_rule_wh_questions_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "What was your name again?"},

    # Yes/No Questions (Rise ↗)
    {"id": "rule_rule_yes_no_ex_0", "file": "rule_rule_yes_no_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Do you live in New York?"},
    {"id": "rule_rule_yes_no_ex_1", "file": "rule_rule_yes_no_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Have you finished your homework?"},
    {"id": "rule_rule_yes_no_ex_2", "file": "rule_rule_yes_no_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Can you speak French?"},

    # Alternative / Choice Questions (Rise ↗ then Fall ↘)
    {"id": "rule_rule_choice_ex_0", "file": "rule_rule_choice_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Would you like tea, or coffee."},
    {"id": "rule_rule_choice_ex_1", "file": "rule_rule_choice_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Should we take the bus, or walk."},

    # Lists (Rise ↗, Rise ↗, Fall ↘)
    {"id": "rule_rule_lists_ex_0", "file": "rule_rule_lists_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "I bought some apples, oranges, bananas, and milk."},
    {"id": "rule_rule_lists_ex_1", "file": "rule_rule_lists_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "We could visit London, Paris, Rome..."},

    # Tag Questions
    {"id": "rule_rule_tag_questions_ex_0", "file": "rule_rule_tag_questions_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "You're coming tonight, aren't you?"},
    {"id": "rule_rule_tag_questions_ex_1", "file": "rule_rule_tag_questions_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "It's a beautiful day, isn't it."},

    # Conditionals (Dependent Rise ↗, Independent Fall ↘)
    {"id": "rule_rule_conditionals_ex_0", "file": "rule_rule_conditionals_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "If you study hard, you will pass the exam."},
    {"id": "rule_rule_conditionals_ex_1", "file": "rule_rule_conditionals_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Although it was raining, they still played football."},
    {"id": "rule_rule_conditionals_ex_2", "file": "rule_rule_conditionals_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Before you leave, please turn off the lights."},

    # Commands & Requests
    {"id": "rule_rule_commands_requests_ex_0", "file": "rule_rule_commands_requests_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Please close the door."},
    {"id": "rule_rule_commands_requests_ex_1", "file": "rule_rule_commands_requests_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Could you pass the salt, please?"},
    {"id": "rule_rule_commands_requests_ex_2", "file": "rule_rule_commands_requests_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "+0%", "text": "Sit down immediately."},

    # Rule 9: Series of numbers & phone numbers
    {"id": "rule_rule_numbers_series_ex_0", "file": "rule_rule_numbers_series_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Our new number is two one eight, five five five, three six seven five."},
    {"id": "rule_rule_numbers_series_ex_1", "file": "rule_rule_numbers_series_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Flight VN four one two, will depart from Gate eighteen."},
    {"id": "rule_rule_numbers_series_ex_2", "file": "rule_rule_numbers_series_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Call toll-free at one eight hundred, four five six, seven eight nine zero."},

    # Rule 10: Signposts & transition words
    {"id": "rule_rule_signposts_ex_0", "file": "rule_rule_signposts_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Additionally, all attendees will receive a training handbook."},
    {"id": "rule_rule_signposts_ex_1", "file": "rule_rule_signposts_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "In conclusion, we would like to thank all of our guests."},
    {"id": "rule_rule_signposts_ex_2", "file": "rule_rule_signposts_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "However, if you buy tickets in advance, you will receive a discount."},

    # Rule 11: Rhetorical requests & public announcements (Falling ↘)
    {"id": "rule_rule_rhetorical_requests_ex_0", "file": "rule_rule_rhetorical_requests_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Could we have your attention, please."},
    {"id": "rule_rule_rhetorical_requests_ex_1", "file": "rule_rule_rhetorical_requests_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Can you please listen carefully."},
    {"id": "rule_rule_rhetorical_requests_ex_2", "file": "rule_rule_rhetorical_requests_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Could I have everyone's attention, please."},

    # Rule 12: Punctuation pausing & thought groups
    {"id": "rule_rule_punctuation_pausing_ex_0", "file": "rule_rule_punctuation_pausing_ex_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "According to the monthly report, our production has increased three hundred percent."},
    {"id": "rule_rule_punctuation_pausing_ex_1", "file": "rule_rule_punctuation_pausing_ex_1.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Due to severe weather conditions, all morning flights have been delayed."},
    {"id": "rule_rule_punctuation_pausing_ex_2", "file": "rule_rule_punctuation_pausing_ex_2.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "By the time we got to the airport, the plane had already departed."},

    # =========================================================================
    # 4. RULE DIALOGUES (16 items)
    # =========================================================================
    # Statements Dialogue
    {"id": "rule_rule_statements_dial_0", "file": "rule_rule_statements_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "When will the mobile application be ready for testing."},
    {"id": "rule_rule_statements_dial_1", "file": "rule_rule_statements_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Our development team has finished the core features. We will launch the beta test next Monday."},

    # Wh-Questions Dialogue
    {"id": "rule_rule_wh_questions_dial_0", "file": "rule_rule_wh_questions_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Excuse me, where can I pick up my luggage."},
    {"id": "rule_rule_wh_questions_dial_1", "file": "rule_rule_wh_questions_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Baggage claim is on the ground floor, right next to Carousel Three."},

    # Yes/No Dialogue
    {"id": "rule_rule_yes_no_dial_0", "file": "rule_rule_yes_no_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Have you already registered for the morning keynote session?"},
    {"id": "rule_rule_yes_no_dial_1", "file": "rule_rule_yes_no_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Yes, I registered online two days ago."},

    # Choice Dialogue
    {"id": "rule_rule_choice_dial_0", "file": "rule_rule_choice_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Would you like your coffee iced, or hot."},
    {"id": "rule_rule_choice_dial_1", "file": "rule_rule_choice_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Iced, please. Thank you."},

    # Lists Dialogue
    {"id": "rule_rule_lists_dial_0", "file": "rule_rule_lists_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "We are pleased to offer complimentary coffee, orange juice, and light snacks."},
    {"id": "rule_rule_lists_dial_1", "file": "rule_rule_lists_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+15Hz", "rate": "+0%", "text": "Could I have some coffee, please?"},

    # Tag Questions Dialogue
    {"id": "rule_rule_tag_questions_dial_0", "file": "rule_rule_tag_questions_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "The quarterly sales report is due tomorrow, isn't it."},
    {"id": "rule_rule_tag_questions_dial_1", "file": "rule_rule_tag_questions_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Yes, we need to send it to the director before 5 PM."},

    # Conditionals Dialogue
    {"id": "rule_rule_conditionals_dial_0", "file": "rule_rule_conditionals_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "If you open an account today, you will receive a cash bonus of fifty dollars."},
    {"id": "rule_rule_conditionals_dial_1", "file": "rule_rule_conditionals_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+10Hz", "rate": "+0%", "text": "That sounds fantastic! I would like to sign up now."},

    # Commands & Requests Dialogue
    {"id": "rule_rule_commands_requests_dial_0", "file": "rule_rule_commands_requests_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Please review these contracts before noon."},
    {"id": "rule_rule_commands_requests_dial_1", "file": "rule_rule_commands_requests_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+0Hz", "rate": "+0%", "text": "Sure thing! I will look at it right away."},

    # Rule 9: Series of numbers Dialogue
    {"id": "rule_rule_numbers_series_dial_0", "file": "rule_rule_numbers_series_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Where can I contact if I have questions about my reservation."},
    {"id": "rule_rule_numbers_series_dial_1", "file": "rule_rule_numbers_series_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "Our customer service number is two one eight, five five five, three six seven five. Please call between nine and five."},

    # Rule 10: Signposts Dialogue
    {"id": "rule_rule_signposts_dial_0", "file": "rule_rule_signposts_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "First, please pick up your badge at the desk. Next, join our keynote session in Hall A."},
    {"id": "rule_rule_signposts_dial_1", "file": "rule_rule_signposts_dial_1.mp3", "voice": VOICE_MALE, "pitch": "+15Hz", "rate": "+0%", "text": "Additionally, will lunch be provided at noon?"},

    # Rule 11: Rhetorical requests Dialogue
    {"id": "rule_rule_rhetorical_requests_dial_0", "file": "rule_rule_rhetorical_requests_dial_0.mp3", "voice": VOICE_MALE, "pitch": "-10Hz", "rate": "-5%", "text": "Could I have everyone's attention, please. Due to mechanical problems, this bus will now be taken out of service."},
    {"id": "rule_rule_rhetorical_requests_dial_1", "file": "rule_rule_rhetorical_requests_dial_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Excuse me, how long will we have to wait for the shuttle."},

    # Rule 12: Punctuation pausing Dialogue
    {"id": "rule_rule_punctuation_pausing_dial_0", "file": "rule_rule_punctuation_pausing_dial_0.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "According to the monthly report, our production has increased three hundred percent over the past five years."},
    {"id": "rule_rule_punctuation_pausing_dial_1", "file": "rule_rule_punctuation_pausing_dial_1.mp3", "voice": VOICE_MALE, "pitch": "-5Hz", "rate": "-5%", "text": "There is only one group to thank for this: our dedicated staff."},

    # =========================================================================
    # 5. ATTITUDES (16 items)
    # =========================================================================
    # Really
    {"id": "att_really_fall", "file": "att_really_fall.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Really."},
    {"id": "att_really_rise", "file": "att_really_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Really?"},
    {"id": "att_really_rise_fall", "file": "att_really_rise_fall.mp3", "voice": VOICE_FEMALE, "pitch": "+30Hz", "rate": "+5%", "text": "Really?!"},
    {"id": "att_really_level", "file": "att_really_level.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-15%", "text": "Really..."},

    # Excuse me
    {"id": "att_excuse_me_fall", "file": "att_excuse_me_fall.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "Excuse me."},
    {"id": "att_excuse_me_rise", "file": "att_excuse_me_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Excuse me?"},
    {"id": "att_excuse_me_rise_fall", "file": "att_excuse_me_rise_fall.mp3", "voice": VOICE_FEMALE, "pitch": "+35Hz", "rate": "+5%", "text": "Excuse me?!"},

    # Hello
    {"id": "att_hello_fall", "file": "att_hello_fall.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-5%", "text": "Hello."},
    {"id": "att_hello_rise", "file": "att_hello_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+25Hz", "rate": "+5%", "text": "Hello!"},
    {"id": "att_hello_rise_fall", "file": "att_hello_rise_fall.mp3", "voice": VOICE_FEMALE, "pitch": "+35Hz", "rate": "+5%", "text": "Hello?!"},

    # Right
    {"id": "att_right_fall", "file": "att_right_fall.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Right."},
    {"id": "att_right_rise", "file": "att_right_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Right?"},
    {"id": "att_right_fall_rise", "file": "att_right_fall_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Right... but..."},

    # Thank you
    {"id": "att_thank_you_fall", "file": "att_thank_you_fall.mp3", "voice": VOICE_FEMALE, "pitch": "-10Hz", "rate": "-5%", "text": "Thank you."},
    {"id": "att_thank_you_rise", "file": "att_thank_you_rise.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+5%", "text": "Thank you!"},
    {"id": "att_thank_you_rise_fall", "file": "att_thank_you_rise_fall.mp3", "voice": VOICE_FEMALE, "pitch": "+30Hz", "rate": "+5%", "text": "Thank you?!"},

    # =========================================================================
    # 6. NUCLEUS SHIFT DEMO (5 items with custom SSML stress)
    # =========================================================================
    {
        "id": "nucleus_0", "file": "nucleus_0.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural"><prosody pitch="+50Hz" volume="+40%">I</prosody>, didn't take your book.</voice></speak>"""
    },
    {
        "id": "nucleus_1", "file": "nucleus_1.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">I did <prosody pitch="+50Hz" volume="+40%">NOT</prosody> take your book.</voice></speak>"""
    },
    {
        "id": "nucleus_2", "file": "nucleus_2.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">I didn't <prosody pitch="+50Hz" volume="+40%">TAKE</prosody> your book.</voice></speak>"""
    },
    {
        "id": "nucleus_3", "file": "nucleus_3.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">I didn't take <prosody pitch="+50Hz" volume="+40%">YOUR</prosody> book.</voice></speak>"""
    },
    {
        "id": "nucleus_4", "file": "nucleus_4.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">I didn't take your <prosody pitch="+50Hz" volume="+40%">BOOK</prosody>.</voice></speak>"""
    },

    # =========================================================================
    # 7. QUIZ AUDIO (15 items)
    # =========================================================================
    {"id": "quiz_1", "file": "quiz_1.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "She lives in California."},
    {"id": "quiz_2", "file": "quiz_2.mp3", "voice": VOICE_FEMALE, "pitch": "+15Hz", "rate": "+0%", "text": "Are you coming to the party?"},
    {"id": "quiz_3", "file": "quiz_3.mp3", "voice": VOICE_FEMALE, "pitch": "+30Hz", "rate": "+5%", "text": "Really?!"},
    {"id": "quiz_4", "file": "quiz_4.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "What time does the train leave."},
    {"id": "quiz_5", "file": "quiz_5.mp3", "voice": VOICE_FEMALE, "pitch": "+20Hz", "rate": "+0%", "text": "Excuse me?"},
    {"id": "quiz_6", "file": "quiz_6.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "We need apples, oranges, and bananas."},
    {"id": "quiz_7", "file": "quiz_7.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "-5%", "text": "You're a student, aren't you."},
    {"id": "quiz_8", "file": "quiz_8.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "I like the color, though..."},
    {"id": "quiz_9", "file": "quiz_9.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Do you want tea, or coffee."},
    {"id": "quiz_10", "file": "quiz_10.mp3", "voice": VOICE_FEMALE, "pitch": "+30Hz", "rate": "+5%", "text": "Thank you?!"},
    {"id": "quiz_11", "file": "quiz_11.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "If it rains tomorrow, we will stay at home."},
    {"id": "quiz_12", "file": "quiz_12.mp3", "voice": VOICE_FEMALE, "pitch": "+0Hz", "rate": "-5%", "text": "Right, but..."},
    {
        "id": "quiz_13", "file": "quiz_13.mp3", "voice": VOICE_FEMALE,
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">I didn't take <prosody pitch="+50Hz" volume="+40%">YOUR</prosody> book.</voice></speak>"""
    },
    {"id": "quiz_14", "file": "quiz_14.mp3", "voice": VOICE_FEMALE, "pitch": "-15Hz", "rate": "-15%", "text": "Well, let me see..."},
    {"id": "quiz_15", "file": "quiz_15.mp3", "voice": VOICE_FEMALE, "pitch": "-5Hz", "rate": "+0%", "text": "Sit down."}
]

async def generate_item(spec, semaphore, index, total):
    async with semaphore:
        target_path = os.path.join(AUDIO_DIR, spec["file"])
        voice = spec.get("voice", VOICE_FEMALE)
        
        # Retry loop for network reliability
        for attempt in range(1, 4):
            try:
                if "ssml" in spec:
                    communicate = edge_tts.Communicate(spec["ssml"], voice)
                else:
                    text = spec["text"]
                    pitch = spec.get("pitch", "+0Hz")
                    rate = spec.get("rate", "+0%")
                    communicate = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
                
                await communicate.save(target_path)
                size_kb = os.path.getsize(target_path) / 1024
                print(f"[{index}/{total}] OK ({size_kb:.1f} KB): {spec['file']} ({spec.get('text', 'SSML')[:30]})")
                return True
            except Exception as e:
                print(f"[{index}/{total}] Attempt {attempt} failed for {spec['file']}: {e}")
                if attempt < 3:
                    await asyncio.sleep(1.0)
                else:
                    print(f"[{index}/{total}] ERROR FAILED: {spec['file']}")
                    return False

async def main():
    print(f"Starting neural speech synthesis for {len(AUDIO_SPECS)} items into {AUDIO_DIR}...")
    # Limit concurrency to 5 to avoid throttling
    semaphore = asyncio.Semaphore(5)
    tasks = [
        generate_item(spec, semaphore, i + 1, len(AUDIO_SPECS))
        for i, spec in enumerate(AUDIO_SPECS)
    ]
    results = await asyncio.gather(*tasks)
    success_count = sum(1 for r in results if r)
    print(f"\nCompleted: {success_count}/{len(AUDIO_SPECS)} audio files generated successfully.")
    if success_count < len(AUDIO_SPECS):
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
