function placedOrderEmail(products,id,data,nume,email,telefon,adresa,judet,localitate,total,transprot,modalitate){
  let prodElems=``
  products.forEach((item)=>{
    prodElems+=`
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price} RON</td>
      </tr>
    `
  })
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Confirmare Comandă - Masco Baits</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #4caf50;
      color: white;
      padding: 15px;
      border-radius: 6px 6px 0 0;
      text-align: center;
    }
    .section {
      margin: 20px 0;
    }
    .section h2 {
      margin-bottom: 10px;
      color: #333;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    .footer {
      margin-top: 30px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
    .product-list {
      margin-top: 10px;
    }
    .product-list table {
      width: 100%;
      border-collapse: collapse;
    }
    .product-list th, .product-list td {
      padding: 8px;
      border: 1px solid #ccc;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Comanda ta a fost plasată cu succes!</h1>
    </div>

    <div class="section">
      <h2>Detalii Comandă</h2>
      <table class="info-table">
        <tr>
          <td><strong>ID Comandă:</strong></td>
          <td>${id}</td>
        </tr>
        <tr>
          <td><strong>Data plasării:</strong></td>
          <td>${data}</td>
        </tr>
        <tr>
          <td><strong>Status:</strong></td>
          <td>Plasată</td>
        </tr>
      </table>
    </div>

    <div class="section">
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

    <div class="section">
      <h2>Adresă de Livrare</h2>
      <p>
        ${adresa},<br>
        ${judet}, ${localitate}<br>
        România
      </p>
    </div>

    <div class="section">
      <h2>Produse Comandate</h2>
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th>Produs</th>
              <th>Cantitate</th>
              <th>Preț</th>
            </tr>
          </thead>
          <tbody>
            ${prodElems}
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Total</h2>
      <table class="info-table">
        <tr>
          <td><strong>Subtotal:</strong></td>
          <td>${total} RON</td>
        </tr>
        <tr>
          <td><strong>Transport:</strong></td>
          <td>${transprot} RON</td>
        </tr>
        <tr>
          <td><strong>Total Plătit:</strong></td>
          <td><strong>${total+transprot} RON</strong></td>
        </tr>
        <tr>
          <td><strong>Metodă de Plată:</strong></td>
          <td>${modalitate}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      <p>Îți mulțumim că ai ales <strong>Masco Baits</strong>!</p>
      <p>Te vom anunța prin email când comanda este expediată.</p>
      <p><a href="https://masco-baits.ro" target="_blank">www.masco-baits.ro</a></p>
    </div>
  </div>
</body>
</html>`
}

module.exports=placedOrderEmail;