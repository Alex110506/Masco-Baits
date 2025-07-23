import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="aux-div-foot">
                <div>
                    <h4>Despre Masco Baits</h4>
                    <p>
                        Masco Baits SRL<br />
                        CUI: RO12345678<br />
                        JXX/1234/2024<br />
                        contact@mascobaits.ro<br />
                        +40 712 345 678
                    </p>
                </div>

                <div>
                    <h4>Linkuri utile</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li><Link to={"/termeni&conditii"} style={{ color: "#ccc" }}>Termeni și Condiții</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Social Media</h4>
                    <p className="social-link-foot">
                        <a href="https://www.facebook.com/mascobaits/?locale=ro_RO" style={{marginTop:"0"}}><i class="bi bi-facebook"></i> Facebook</a><br />
                        <a href="https://www.tiktok.com/@marius.mascovits"><i class="bi bi-tiktok"></i> TikTok</a>
                    </p>
                </div>
            </div>
            
            <div className="aux-div-foot">
                
                <div style={{ fontSize: "14px", color: "#888" }}>
                    © 2025 Masco Baits. Toate drepturile rezervate.<br/>
                    Site realizat de <a href="https://github.com/Alex110506" style={{ color: "#999" }}>Alexandru Marius Rădulescu</a>
                </div>
            </div>
            
            
        </footer>
    );
}
