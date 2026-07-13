import os
import re

dirs = ['/Users/alexr/Desktop/coding-projects/Masco-Baits/frontend/components', '/Users/alexr/Desktop/coding-projects/Masco-Baits/frontend/pages']

def modernize_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix class= to className=
    content = re.sub(r'\sclass="', ' className="', content)
    
    # Modernize generic button text where possible
    content = re.sub(r'<button([^>]*)>Adaugă în coș</button>', r'<button\1 className="modern-btn">Adaugă în coș</button>', content)

    with open(filepath, 'w') as f:
        f.write(content)

for d in dirs:
    if os.path.exists(d):
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith('.jsx') or file.endswith('.js'):
                    modernize_file(os.path.join(root, file))

print("React modernization script complete.")
