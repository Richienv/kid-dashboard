import json
import random
from datetime import datetime
from pathlib import Path

USER_FILE = Path('../USER.md')
SOUL_FILE = Path('../SOUL.md')
LOG_FILE = Path('../buddy-checkin.md')

# load name from USER
user_name = 'Richie'
if USER_FILE.exists():
    for line in USER_FILE.read_text().splitlines():
        if line.lower().startswith('name:'):
            user_name = line.split(':', 1)[1].strip()
            break

soul_snippet = SOUL_FILE.read_text().splitlines()[:20] if SOUL_FILE.exists() else []

templates = [
    f"{user_name}, kamu lagi apa sekarang yang bikin ngeladenin GMBA thesis terasa ringan?",
    f"Richie, apa ide startup paling money-making yang lagi kamu kepoin buat ditch landing page chaos?",
    f"Richie, ada hal kecil yang aku bisa atur hari ini biar kamu makin dekat sama goal thesis?",
    f"Richie, kamu lagi seneng sama apa di project FlashQI / ERP yang kamu garap?",
    f"Richie, ada batasan apa yang harus aku jaga agar aku tetap jadi sahabat yang supportif buat kamu?",
    f"Richie, kamu lagi butuh apa dari aku supaya FlashQI, ERP, dan thesis bisa jalan bersamaan tanpa overheat?",
    f"Richie, kalau aku bisa bikin automation sederhana buat sekarang, kamu mau aku bantu apain duluan?"
]

question = random.choice(templates)
now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
entry = f"- {now} | {question}\n"

LOG_FILE.write_text(LOG_FILE.read_text() + entry if LOG_FILE.exists() else entry)
print(question)
