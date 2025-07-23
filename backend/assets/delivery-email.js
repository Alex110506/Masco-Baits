function deliverOrderEmail(id,data,nume,email,telefon,adresa,judet,localitate,modalitate,price,livrare){
    return `
    <!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Confirmare Comandă - Masco Baits</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 30px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .header-email{
      background-color: hotpink;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 10px;
    }
    h1 {
      color: #2c3e50;
      margin: 0;
    }
    .info-section {
      margin: 20px 0;
    }
    .info-section h3 {
      margin-bottom: 8px;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    table, th, td {
      border: 1px solid #e0e0e0;
    }
    th, td {
      padding: 10px;
      text-align: left;
    }
    .total {
      font-weight: bold;
      background-color: #f9f9f9;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-email">
      <h1>Comanda ta este pe drum!</h1>
    </div>
    
    <p>Bună <strong>I${nume}</strong>,</p>
    <p>Comanda ta cu ID-ul <strong>${id}</strong>, plasată în data ${data}, a fost preluată de curier și se află acum în drum spre tine.</p>

    <div class="info-section">
      <h2>Date de Contact</h2>
      <table class="info-table">
        <tr>
          <td><strong>Nume:</strong></td>
          <td>${nume}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Telefon:</strong></td>
          <td>${telefon}</td>
        </tr>
      </table>
    </div>

    <div class="info-section">
      <h3>📍 Adresă de livrare:</h3>
      <p>
        ${adresa},<br>
        ${judet}, ${localitate}<br>
        România
      </p>
    </div>

    <div class="info-section">
      <h3>Pret: ${price}</h3>
      <h3>Livrare: ${livrare}</h3>
      <h2>Total: ${price+livrare}</h2
    </div>

    <div class="info-section">
      <h3>💳 Modalitate de plată:</h3>
      <p>${modalitate}</p>
    </div>

    <p>Îți mulțumim că ai ales <strong>Masco Baits</strong>! Dacă ai întrebări despre livrare, ne poți contacta oricând.</p>

    <div class="footer">
      Masco Baits © 2025 · contact: <a href="mailto:support@masco-baits.ro">support@masco-baits.ro</a>
    </div>
  </div>
</body>
</html>
`
}

module.exports=deliverOrderEmail