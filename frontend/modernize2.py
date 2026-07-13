import re

with open('index.css', 'r') as f:
    css = f.read()

# Make the product list container glassmorphic
css = re.sub(
    r'\.product-list-container\{[^}]*?background-color:\s*rgba\(255,\s*255,\s*255,\s*0\.331\);',
    '.product-list-container{\n    background: rgba(15, 17, 21, 0.6);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    border-top: 1px solid rgba(255, 255, 255, 0.05);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n    padding: 40px 0;',
    css
)

# Product Container Modernization
css = re.sub(
    r'\.product-cont\{([^}]*?)\}',
    r'.product-cont{\n    display: flex;\n    flex-direction: column;\n    background: var(--product-color);\n    height: 440px;\n    width: 280px;\n    border: 1px solid rgba(255,255,255,0.05);\n    border-radius: 20px;\n    padding: 16px;\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n    box-shadow: 0 4px 20px rgba(0,0,0,0.3);\n    position: relative;\n    overflow: hidden;\n}',
    css
)

css = re.sub(
    r'(\.product-cont:hover\s*\{)',
    r'\1\n    transform: translateY(-8px);\n    box-shadow: 0 12px 30px rgba(255, 42, 95, 0.15);\n    border-color: rgba(255, 42, 95, 0.3);',
    css
)
if '.product-cont:hover' not in css:
    css += "\n.product-cont:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 12px 30px rgba(255, 42, 95, 0.15);\n    border-color: rgba(255, 42, 95, 0.3);\n}\n"

# Fix product images inside the container
css += "\n.prod-img-cont img {\n    border-radius: 12px;\n    transition: transform 0.5s ease;\n}\n.product-cont:hover .prod-img-cont img {\n    transform: scale(1.05);\n}\n"

# Typography enhancements
css = re.sub(
    r'\.list-title\{([^}]*?)\}',
    r'.list-title{\n    font-size: 36px;\n    font-weight: 800;\n    letter-spacing: -0.5px;\n    padding: 13px;\n    margin: 0;\n    background: linear-gradient(90deg, #fff, #a0a0a0);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    text-shadow: 0 2px 10px rgba(0,0,0,0.2);\n}',
    css
)

# Replace the gradient on the hero section border
css = re.sub(
    r'\.hero-section\{([^}]*?)\}',
    r'.hero-section{\n    background-color: var(--primary-color);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    box-shadow: 0 20px 50px rgba(0,0,0,0.5);\n    position: relative;\n    height: 25rem;\n    justify-self: center;\n    margin: 50px 0;\n    border-radius: 30px;\n    overflow: hidden;\n}',
    css
)

# Mobile adjustments
css = re.sub(
    r'\.mob-sect2\{([^}]*?)\}',
    r'.mob-sect2{\n    position: relative;\n    height: 49vw;\n    overflow: hidden;\n    border-radius: 20px;\n    border: 1px solid rgba(255,255,255,0.1);\n    box-shadow: 0 10px 30px rgba(0,0,0,0.4);\n}',
    css
)
css = re.sub(
    r'\.mob-sect1\{([^}]*?)\}',
    r'.mob-sect1{\n    height: 34vw;\n    border-radius: 20px;\n    display: flex;\n    overflow: hidden;\n    border: 1px solid rgba(255,255,255,0.1);\n    box-shadow: 0 10px 30px rgba(0,0,0,0.4);\n}',
    css
)

with open('index.css', 'w') as f:
    f.write(css)

print("CSS modernization part 2 complete.")
