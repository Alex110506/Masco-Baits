import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="aux-div-foot">
                <div>
                    <h4>Despre Masco Baits</h4>
                    <p>
                        MASCO-BAITS SRL<br />
                        CUI: 42410332<br />
                        J02/348/2020<br />
                        <a href="mailto:&#109;&#097;&#115;&#099;&#111;&#046;&#098;&#097;&#105;&#116;&#115;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">Email</a><br />
                        +40 749 048 838
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
                        <a href="https://www.facebook.com/mascobaits/?locale=ro_RO" style={{marginTop:"0"}}><i class="bi bi-facebook" style={{fontSize:"28px"}}></i></a><br />
                        <a href="https://www.tiktok.com/@marius.mascovits" style={{marginTop:"0"}}><i class="bi bi-tiktok" style={{fontSize:"28px"}}></i></a>
                    </p>
                </div>
            </div>
            
            <div className="aux-div-foot-d">
                <div className="lig-cont-foot">
                    <a href="https://consumer-redress.ec.europa.eu/index_ro" className="link-lig-foot">
                        <img src="../assets/images/icons/anpc-sol.webp" alt="solutionare ligitii" />
                    </a>
                    <a href="https://reclamatiisal.anpc.ro/">
                        <img src="../assets/images/icons/anpc-sal.webp" alt="solutionare ligitii anpc" />
                    </a>
                </div>
                
                <div style={{ fontSize: "14px", color: "#888" }}>
                    © 2025 Masco Baits. Toate drepturile rezervate.<br/>
                    Site realizat de <a href="https://github.com/Alex110506" style={{ color: "#999" }}>Alexandru Marius Rădulescu</a>
                </div>
            </div>
            
            
        </footer>
    );
}
