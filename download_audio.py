import urllib.request, json, os, time

sounds_map = {
    # 1. Monophthongs Long
    "i_long": "Close front unrounded vowel.ogg",
    "u_long": "Close back rounded vowel.ogg",
    "a_long": "Open back unrounded vowel.ogg",
    "o_long": "Open-mid back rounded vowel.ogg",
    "er_long": "Open-mid central unrounded vowel.ogg",

    # 2. Monophthongs Short
    "i_short": "Near-close near-front unrounded vowel.ogg",
    "u_short": "Near-close near-back rounded vowel.ogg",
    "e_sound": "Open-mid front unrounded vowel.ogg",
    "ae_sound": "Near-open front unrounded vowel.ogg",
    "schwa": "Mid-central vowel.ogg",
    "wedge": "Open-mid back unrounded vowel.ogg",
    "o_short": "Open back rounded vowel.ogg",

    # 3. Diphthongs
    "ear_sound": "PR-near.ogg",
    "e_i_sound": "PR-face.ogg",
    "ure_sound": "PR-cure.ogg",
    "oy_sound": "PR-choice.ogg",
    "ou_sound": "PR-goat.ogg",
    "air_sound": "PR-square.ogg",
    "ai_sound": "PR-price.ogg",
    "au_sound": "PR-mouth.ogg",

    # 4. Consonants
    "p_sound": "Voiceless bilabial plosive.ogg",
    "b_sound": "Voiced bilabial plosive.ogg",
    "t_sound": "Voiceless alveolar plosive.ogg",
    "d_sound": "Voiced alveolar plosive.ogg",
    "k_sound": "Voiceless velar plosive.ogg",
    "g_sound": "Voiced velar plosive.ogg",
    "f_sound": "Voiceless labiodental fricative.ogg",
    "v_sound": "Voiced labiodental fricative.ogg",
    "th_unvoiced": "Voiceless dental fricative.ogg",
    "th_voiced": "Voiced dental fricative.ogg",
    "s_sound": "Voiceless alveolar sibilant.ogg",
    "z_sound": "Voiced alveolar sibilant.ogg",
    "sh_sound": "Voiceless palato-alveolar sibilant.ogg",
    "zh_sound": "Voiced palato-alveolar sibilant.ogg",
    "ch_sound": "Voiceless postalveolar affricate.ogg",
    "j_sound": "Voiced postalveolar affricate.ogg",
    "m_sound": "Bilabial nasal.ogg",
    "n_sound": "Alveolar nasal.ogg",
    "ng_sound": "Velar nasal.ogg",
    "h_sound": "Voiceless glottal fricative.ogg",
    "l_sound": "Alveolar lateral approximant.ogg",
    "r_sound": "Alveolar approximant.ogg",
    "w_sound": "Voiced labio-velar approximant.ogg",
    "j_semivowel": "Palatal approximant.ogg"
}

def get_wikimedia_url(filename):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&titles=File:{urllib.parse.quote(filename)}&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'EnglishPhoneticsDownloader/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            pages = data['query']['pages']
            for k, v in pages.items():
                if 'imageinfo' in v:
                    return v['imageinfo'][0]['url']
    except Exception as e:
        print(f"Error for {filename}: {e}")
    return None

os.makedirs("audio", exist_ok=True)

success = 0
for sound_id, fn in sounds_map.items():
    dest = f"audio/{sound_id}.ogg"
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {dest}")
        success += 1
        continue
    
    url = get_wikimedia_url(fn)
    if not url:
        print(f"FAILED to find URL for {sound_id} ({fn})")
        continue
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=15) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded: {dest} ({os.path.getsize(dest)} bytes)")
        success += 1
    except Exception as e:
        print(f"Download failed for {dest}: {e}")
    time.sleep(0.3)

print(f"\nDone: {success}/{len(sounds_map)} downloaded.")
