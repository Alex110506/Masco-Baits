import React from "react";

export default function HeroSection(){

    const sect1Ref = React.useRef(null);
    const sect2Ref = React.useRef(null);
    const sect3Ref = React.useRef(null);
    const sect4Ref = React.useRef(null);

    React.useEffect(() => {
        const images1 = sect1Ref.current.querySelectorAll('img');
        let current1 = 0;

        const images2 = sect2Ref.current.querySelectorAll('img');
        let current2 = 0;
        
        const images3 = sect3Ref.current.querySelectorAll('img');
        let current3 = 0;

        const images4 = sect4Ref.current.querySelectorAll('img');
        let current4 = 0;

        const interval = setInterval(() => {
            images1[current1].classList.remove('active1');
            current1 = (current1 + 1) % images1.length;
            images1[current1].classList.add('active1');

            images2[current2].classList.remove('active2');
            current2 = (current2 + 1) % images2.length;
            images2[current2].classList.add('active2');

            images3[current3].classList.remove('active3');
            current3 = (current3 + 1) % images3.length;
            images3[current3].classList.add('active3');

            images4[current4].classList.remove('active4');
            current4 = (current4 + 1) % images4.length;
            images4[current4].classList.add('active4');
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return(
        <div className="hero-section">
            <div className="upper-part"></div>
            <div className="sections">
                <div className="logo-sect">
                    <img id="logo-img" src="../assets/images/logo/maco-baits-logo.png.jpg" alt="company logo"></img>
                </div>
                <div className="sects-under">
                    <div className="sect1" ref={sect1Ref}>
                        <img className="active1" src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.14_2652d762.webp" alt="landscape image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.14_7085cd72.webp" alt="landscape image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.15_82bc644e.webp" alt="landscape image"/>
                    </div>
                    <div className="sect2" ref={sect2Ref}>
                        <img className="active2" src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_2c5e7579.webp" alt="team image"/>
                        <img src="..\assets\images\mainpage\Screenshot 2025-06-24 124541.webp" alt="team image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_16ed0842.webp" alt="team image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_970efb4b.webp" alt="team image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_4093fe3e.webp" alt="team image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_ee6ae59a.webp" alt="team image"/>
                    </div>
                </div>
                
            </div>
            
            <div className="mobile-hero-sect">
                <div className="mob-sect1">
                    <img id="logo-img" src="../assets/images/logo/maco-baits-logo.png.jpg" alt="company logo"></img>
                    <div className="mob-sect1-slide" ref={sect3Ref}>
                        <img className="active3" src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.14_2652d762.webp" alt="landscape image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.14_7085cd72.webp" alt="landscape image"/>
                        <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 14.32.15_82bc644e.webp" alt="landscape image"/>
                    </div>
                    
                </div>
                <div className="mob-sect2" ref={sect4Ref}>
                    <img className="active4" src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_2c5e7579.webp" alt="team image"/>
                    <img src="..\assets\images\mainpage\Screenshot 2025-06-24 124541.webp" alt="team image"/>
                    <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_16ed0842.webp" alt="team image"/>
                    <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_970efb4b.webp" alt="team image"/>
                    <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_4093fe3e.webp" alt="team image"/>
                    <img src="..\assets\images\mainpage\WhatsApp Image 2025-03-31 at 21.58.51_ee6ae59a.webp" alt="team image"/>
                </div>
            </div>

        </div>
    )
}