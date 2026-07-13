with open('index.css', 'a') as f:
    f.write('''
/* Premium Global Tweaks */
::selection {
    background-color: var(--accent-color);
    color: white;
}

::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: var(--filler-color); 
}
::-webkit-scrollbar-thumb {
    background: var(--primary-color); 
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color); 
}

.modern-btn {
    background: linear-gradient(135deg, var(--accent-color), #ff4a75);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 700;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 42, 95, 0.3);
    cursor: pointer;
}
.modern-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 42, 95, 0.5);
}

/* Enhancing header links */
header a {
    transition: all 0.3s ease;
}
header a:hover {
    color: var(--accent-color);
    transform: scale(1.05);
}

/* Glassmorphism drop-down */
.dropdown-content {
    background: rgba(30, 34, 43, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.dropdown-content a {
    color: white;
    transition: all 0.2s ease;
}
.dropdown-content a:hover {
    background-color: var(--accent-color);
    color: white;
}
.dropdown-content p {
    color: #aaa;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* Footer improvements */
footer {
    border-top: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
}

/* Hero Section Image Glow */
.logo-sect img {
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.15));
}
''')
print("Final CSS tweaks added.")
