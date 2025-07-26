function confirmOrderEmail(id,data,nume,email,telefon,adresa,judet,localitate,modalitate){
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
      background-color: aqua;
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
      <h1>Comanda ta a fost confirmată!</h1>
    </div>
    
    <p>Bună <strong>${nume}</strong>,</p>
    <p>Comanda ta cu ID-ul <strong>${id}</strong>, plasată în data ${data}, a fost confirmată și este pregătită pentru livrare. Curierul va prelua coletul în scurt timp.</p>

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
      <h3>💳 Modalitate de plată:</h3>
      <p>${modalitate}</p>
    </div>

    <p>Vei primi notificări suplimentare pe email sau SMS când coletul este preluat de curier și în drum spre tine.</p>

    <p>Îți mulțumim că ai ales <strong>Masco Baits</strong>! Pentru întrebări sau informații suplimentare, nu ezita să ne contactezi.</p>

    <div class="footer">
      Masco Baits © 2025 · contact: <a href="mailto:masco.baits@gmail.com">masco.baits@gmail.com</a>
    </div>
  </div>
</body>
</html>
`
}

module.exports=confirmOrderEmail