import re

with open('index.css', 'r') as f:
    css = f.read()

# 1. Update variables for a more premium look
css = re.sub(
    r'--filler-color: rgba\(28, 31, 34, 1\);',
    '--filler-color: #0f1115; /* Deeper, richer black */',
    css
)
css = re.sub(
    r'--header-color: rgba\(33, 47, 62, 1\);',
    '--header-color: rgba(15, 17, 21, 0.85); /* Glassmorphic header */',
    css
)
css = re.sub(
    r'--primary-color: rgba\(73, 88, 105, 1\);',
    '--primary-color: #1a1d24; /* Sleeker dark gray */',
    css
)
css = re.sub(
    r'--secondary-color: rgba\(43, 50, 59, 1\);',
    '--secondary-color: #232730; /* Slightly lighter gray */',
    css
)
css = re.sub(
    r'--product-color: rgb\(182, 187, 190\);',
    '--product-color: #1e222b;', # Use dark card background instead of light silver
    css
)
css = re.sub(
    r'--accent-color: rgba\(238, 16, 77, 1\);',
    '--accent-color: #ff2a5f; /* Vibrant pink/red glow */\n  --accent-glow: 0 0 20px rgba(255, 42, 95, 0.4);',
    css
)

# 2. Modernize borders (remove harsh white and pink borders)
css = re.sub(r'border:\s*white\s*solid\s*3px;', 'border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); backdrop-filter: blur(8px);', css)
css = re.sub(r'border:\s*3px\s*solid\s*#FF7499;', 'border: 1px solid var(--accent-color); box-shadow: var(--accent-glow);', css)
css = re.sub(r'border:\s*4px\s*solid#FF7499;', 'border: 1px solid var(--accent-color); box-shadow: var(--accent-glow);', css)
css = re.sub(r'border:\s*solid\s*white\s*4px;', 'border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); backdrop-filter: blur(8px);', css)
css = re.sub(r'border:\s*3px\s*solid#ffffff;', 'border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); backdrop-filter: blur(8px);', css)
css = re.sub(r'border:\s*solid\s*3px\s*white;', 'border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);', css)

# 3. Add smooth transitions to interactive elements
css = re.sub(r'(\.cnt:hover,\.cont:hover\{)', r'\1\n    transform: translateY(-4px);\n    background-color: var(--secondary-color);\n    border-color: var(--accent-color);\n    box-shadow: 0 12px 40px rgba(255, 42, 95, 0.2);', css)
css = re.sub(r'(\.cnt\{[^}]*?)transition:\s*box-shadow\s*0\.3s;', r'\1transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);', css)
css = re.sub(r'(\.cont\{[^}]*?)transition:\s*box-shadow\s*0\.3s;', r'\1transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);', css)

# 4. Enhance Header
css = re.sub(r'(header\s*\{[^}]*?)background-color:\s*var\(--header-color\);', r'\1background-color: var(--header-color);\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05);', css)

# 5. Fix colors for text in light components that became dark
css = re.sub(r'color:\s*black;', 'color: #ffffff;', css)
css = re.sub(r'background-color:\s*rgb\(182, 187, 190\);', 'background-color: var(--product-color); border: 1px solid rgba(255, 255, 255, 0.05);', css)

# 6. Button enhancements
css = re.sub(r'(\.add-btn-cont\s*button\s*\{[^}]*?)\}', r'\1    transition: all 0.3s ease;\n    font-weight: 600;\n    color: white;\n    cursor: pointer;\n}\n.add-btn-cont button:hover {\n    background-color: var(--accent-color);\n    transform: scale(1.05);\n    box-shadow: var(--accent-glow);\n}', css)

# 7. Input fields
css = re.sub(r'(\.search-bar-cont\s*input\s*\{[^}]*?)border:\s*solid\s*var\(--accent-color\)\s*3px;', r'\1border: 1px solid rgba(255, 255, 255, 0.2);\n    transition: all 0.3s ease;', css)
css = re.sub(r'(\.search-bar-cont\s*input:focus\s*\{)', r'\1\n    border-color: var(--accent-color);\n    box-shadow: 0 0 15px rgba(255, 42, 95, 0.3);\n    outline: none;', css)

with open('index.css', 'w') as f:
    f.write(css)

print("CSS modernization complete.")
