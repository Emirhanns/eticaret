import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        

        <section className="features-section">
          <h2>Enfes Tatlılar</h2>
          <div className="features-grid">
            <div className="feature-item">
              <img src="https://i.imgur.com/E4v27Zv.png" />
              
              <h3>Günlük Taze Fırınlanmış</h3>
              <p> 
              Ekmeğimiz günlük olarak taze olarak pişirilmekte olup hiçbir koruyucu madde içermemektedir ve kalitesi oldukça yüksektir. Aynı zamanda özellikle güzel ve yumuşaktır.
              </p>
            </div>
            
            <div className="feature-item">
              <img src="https://i.imgur.com/seU6x4Y.png" />
              <h3>Kapınıza Teslim</h3>
              <p>
                Güvenilir kargo ile evinize kadar ulaştırıyoruz
              </p>
            </div>
           
            <div className="feature-item">
              <img src="https://i.imgur.com/1TUxJ2t.png" />
              <h3>Lezzetli Tatlar</h3>
              <p>
              Her biri özenle seçilmiş malzemelerle hazırlanan tatlı ve kurabiyelerimizle gününüze lezzet katın.
              </p>
            </div>
          </div>
        </section>

        <section className="visit-us-section">
         
          <div className="visit-image">
            <img src="https://cdn.yemek.com/uploads/2018/12/brownie-kurabiye-yemekcom.jpg" />
          </div>
        </section>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
