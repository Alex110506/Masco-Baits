const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt=require("bcryptjs");
const { hash } = require('crypto');
const { stat } = require('fs');
const rateLimit = require('express-rate-limit');
const session = require("express-session");
const nodemailer = require("nodemailer");
require('dotenv').config(); 
const fs = require('fs');

const placedOrderEmail=require("./assets/placed-email")
const confirmOrderEmail=require("./assets/confirm-email")
const deliverOrderEmail=require("./assets/delivery-email")

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true 
});

console.log("MySQL connected...");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60,
  },
}));


const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({message: 'Aveți nevoie de un cont',status:0});
  next();
}

function requireAdmin(req,res,next){
  if(req.session.user.role=="user") return res.stat(403).json({message:"You don't have admin permissions",status:0})
  next()
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    return res.status(429).json({
      message: "Ai încercat de prea multe ori. Te rog așteaptă 15 minute.",
      status: 0,
    });
  },
});


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
});

async function sendEmail({ to, subject, text, html }) {

  const mailOptions = {
    from: `"Masco-Baits" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

const emailText=fs.readFileSync(path.join(__dirname, 'assets','welcome-text.txt'), 'utf-8')
const emailContent=fs.readFileSync(path.join(__dirname, 'assets','welcome-email.html'), 'utf-8');


app.post("/register",loginLimiter,(req,res)=>{
  const { username, password, email, tel, judet, oras, adress, postalcode } = req.body;


  bcrypt.hash(password,10,(err,hash)=>{
    if(err){
      res.status(500).json({message:"Eroare baza de date!",status:0})
    }else{
      const query="INSERT INTO users (username,email,password,telefon,judet,oras,adresa,cod_postal) VALUES (?,?,?,?,?,?,?,?)"
      db.query(query,[username,email,hash,tel,judet,oras,adress,postalcode],(err,result)=>{
        if(err){
          console.log(err)
          res.status(500).json({message:"Email-ul este deja folosit!",status:0})
        }else{
          
          const query="SELECT * FROM users WHERE email=?"
          db.query(query,[email],(err,result)=>{
            if(err){
              console.log(err)
              res.status(500).json({message:"Eroare baza de date!",status:0})
            }else{
              req.session.user = { id: result[0].id , username: username };
              sendEmail({
                to: email,
                subject: "Bine ai venit la Masco-Baits",
                text: emailText,
                html: emailContent
              })
              res.json({message:"Cont creat cu succes!",status:1})
            }
          }) 
         
        }
      })
    }
  });
})


app.post("/login",loginLimiter,(req,res)=>{
  const email=req.body.email
  const password=req.body.password
  const query="SELECT * FROM users WHERE email=?"
  db.query(query,[email],(err,result)=>{
    if(err){
      res.status(500).json({message:"database error",status:0})
    }else{
      if(result.length>0){
        bcrypt.compare(password,result[0].password,(err,match)=>{
          if(match){
            req.session.user = { id: result[0].id, username: result[0].username , role:result[0].rol};
            res.json({message:"Logat cu succes!",status:1})
          }else{
            res.status(401).json({message:"Email/Parolă incorecte",status:1})
          }
        })
      }else{
        res.status(401).json({message:"Email/Parolă incorecte",status:0})
      }
    }
  })
})

app.get("/logout",(req,res)=>{
  req.session.destroy(()=>{
    res.json({message: "logged out"})
  })
})

app.get("/user/data",requireLogin,(req,res)=>{
  const userId=req.session.user.id
  const query="SELECT * FROM users WHERE id=?"
  db.query(query,[userId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"databse error",status:0})
    }else{
      console.log(result)
      res.json(result)
  
    }
  })
})

app.post("/user/adressChange",requireLogin,(req,res)=>{
  const userId=req.session.user.id
  const {judet,oras,adress,postalcode}=req.body
  const query="UPDATE users SET judet=?, oras=?, adresa=?, cod_postal=? WHERE id=?"
  db.query(query,[judet,oras,adress,postalcode,userId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      res.json({message:"adress updated",status:1})
    }
  })
})


app.post("/auth/check", (req, res) => {
  if (req.session.user) {
    const userId=req.session.user.id
    const query="SELECT username,rol,email,telefon,judet,oras,adresa,cod_postal FROM users WHERE id=?"
    db.query(query,[userId],(err,result)=>{
      if(err){
        res.status(500).json({loggedIn:true,err})
      }
      else{
        res.status(200).json({ loggedIn: true ,user:result[0]});
      }
    })
    
  } else {
    res.status(401).json({ loggedIn: false });
  }
});


app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.post("/api/products/reviews",(req,res)=>{
  const productId=Number(req.body.id)
  const query="SELECT * FROM productreviews WHERE productId=?"
  db.query(query,[productId],(err,result)=>{
    if(err){
      return res.status(500).json({error: "database error"})
    }
    res.json(result)
  })
})

app.post("/api/products/postreview",requireLogin,(req,res)=>{
  const comment=req.body.comment;
 
  const nrStars=req.body.nrStars;
  const productId=req.body.id
  const query="INSERT INTO productreviews (productId,username,rating,comment) VALUES (?,?,?,?)"
  db.query(query,[productId,req.session.user.username,nrStars,comment],(err,result)=>{
    if(err){
      res.status(500).json({message:"database error",status:0})
    }else{
      res.json({message:"Recenzie publicată",status:1,username:req.session.user.username})
    }
  })
})

app.get("/api/cart",requireLogin,(req,res)=>{
  const userId=req.session.user.id;
  const query="SELECT * FROM cart_products WHERE userid=?"
  db.query(query,[userId],(err,result)=>{
    if(err){
      res.status(500).json({message:"database error",status:0})
    }else{
      const products=result;
      res.json({cartProducts:products,status:1})
    }
  })
})

app.post("/api/addCart",requireLogin,(req,res)=>{
  const userId=Number(req.session.user.id)
  const productId=Number(req.body.productId)
  const quantity=Number(req.body.quantity)
  const query="SELECT * FROM cart_products WHERE userid=? AND productid=?"
  
  db.query(query,[userId,productId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      console.log(result)
      if(result.length===0){
        console.log("prodNou")
        const query1="INSERT INTO cart_products (userid,productid,quantity) VALUES (?,?,?)"
        db.query(query1,[userId,productId,quantity],(err,result)=>{
          if(err){
            console.log(err)
            res.status(500).json({message:"database error",status:0})
          }else{
            res.json({message:"Adăugat în coș!",status:1})
          }
        })
      }else{
        const qq=result[0].quantity+quantity;
        const query2="UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?"
        db.query(query2,[qq,userId,productId],(err,result)=>{
          if(err){
            res.status(500).json({message:"database error",status:0})
          }else{
            res.json({message:"Adăugat în coș!",status:1})
          }
        })
      }
      
    }
  })
  
})

app.post("/api/delCart",requireLogin,(req,res)=>{
  const userId=req.session.user.id;
  const productId=req.body.productId
  query="DELETE FROM cart_products WHERE userid=? AND productid=?"
  db.query(query,[userId,productId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      res.json({message:"Șters din coș",status:1})
    }
  })
})

app.post("/api/cart/add",requireLogin,(req,res)=>{
  const userId=req.session.user.id;
  const productId=req.body.productId
  const query="SELECT * FROM cart_products WHERE userid=? AND productid=?";

  db.query(query,[userId,productId],(err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({message:"Database error",status:0});
    }

    if(result.length===0){
      return res.status(404).json({message:"Produsul nu există în coș",status:0});
    }

    const currentQty=result[0].quantity;

    const newQty=currentQty+1;
    const updateQuery="UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?";

    db.query(updateQuery,[newQty,userId,productId],(err,result)=>{
      if(err){
        console.log(err)
        return res.status(500).json({message:"Database error",status:0});
      }
      res.json({message:"Cantitate crescuta",status:1});
    });
  });
})

app.post("/api/cart/subtract", requireLogin, (req, res) => {
  const userId=req.session.user.id;
  const productId=req.body.productId;
  const query="SELECT * FROM cart_products WHERE userid=? AND productid=?";

  db.query(query,[userId,productId],(err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({message:"Database error",status:0});
    }

    if(result.length===0){
      return res.status(404).json({message:"Produsul nu există în coș",status:0});
    }

    const currentQty=result[0].quantity;

    if(currentQty<=1){
      return res.status(400).json({message:"Cantitatea nu poate fi mai mică de 1",status:0});
    }

    const newQty=currentQty-1;
    const updateQuery="UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?";

    db.query(updateQuery,[newQty,userId,productId],(err,result)=>{
      if(err){
        console.log(err)
        return res.status(500).json({message:"Database error",status:0});
      }
      res.json({message:"Cantitate scăzută",status:1});
    });
  });
});

app.post("/order/send", (req, res) => {
  const {
    cartProd, costProd, costLivr, nume,
    email, telefon, judet, localitate, adresa,
    codPostal, modalitate
  } = req.body;

  const userId = req.session.user?.id || 0;
  const totalPrice = costProd + costLivr;

  const insertOrderQuery = `
    INSERT INTO orders (userid, price, username, email, telefon, judet, oras, adresa, cod_postal, modalitate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertOrderQuery, [
    userId, totalPrice, nume, email, telefon,
    judet, localitate, adresa, codPostal, modalitate
  ], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: "database error on order insert", status: 0 });
    }

    const getLastOrderQuery = `SELECT * FROM orders WHERE userid = ? ORDER BY id DESC LIMIT 1`;

    db.query(getLastOrderQuery, [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: "database error on order fetch", status: 0 });
      }

      const orderId = result[0].id;

      let completed = 0;
      let hasError = false;

      if (cartProd.length === 0) {
        return res.status(200).json({ message: "success (empty cart)", status: 1 });
      }

      cartProd.forEach((item) => {
        const insertItemQuery = `INSERT INTO order_items (productId,name, orderid, quantity, price) VALUES (?,?, ?, ?, ?)`;

        db.query(insertItemQuery, [item.product.id,item.product.name,orderId,item.quantity,Number(item.product.price)], (err) => {
          if (hasError) return;

          if (err) {
            hasError = true;
            console.log(err)
            return res.status(500).json({ message: "database error on item insert", status: 0 });
          }

          completed++;

          if (completed === cartProd.length) {
            return res.status(200).json({ message: "success", status: 1,orderId});
          }
        });
      });
    });
  });
})

app.post("/order/getConf",(req,res)=>{
  const orderId=req.body.id
  console.log(orderId,typeof(orderId))
  const query="SELECT * FROM orders WHERE id=?"
  db.query(query,[orderId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      console.log(result)
      const query1="SELECT * FROM order_items WHERE orderid=?"
      db.query(query1,[orderId],(err,result1)=>{
        if(err){
          console.log(err);
          res.status(500).json({message:"database error",status:0})
        }else{
          const htmlContent=String(placedOrderEmail(result1,orderId,result[0].date,result[0].username,result[0].email,result[0].telefon,result[0].adresa,result[0].judet,result[0].localitate,result[0].price,25,result[0].modalitate))
          sendEmail({
            to:result[0].email,
            subject:"Comandă Plasată",
            text:null,
            html:htmlContent
          })
          res.status(200).json({details:result[0],products:result1})
        }
      })
    }
  })
})

app.get("/orders/show",requireLogin,(req,res)=>{
  const userId=req.session.user.id
  const query="SELECT * FROM orders WHERE userid=?"
  db.query(query,[userId],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      console.log(result,"mena");
      res.json(result)
    }
  })
})

app.post("/orders/changeStatus",requireLogin,requireAdmin,(req,res)=>{
  const {id,status}=req.body
  const query="UPDATE orders SET status=? WHERE id=?"
  db.query(query,[status,id],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      const query1="SELECT * FROM orders WHERE id=?"
      db.query(query1,[id],(err,result1)=>{
        if(err){
          console.log(err)
          res.status(500).json({message:"database error",status:0})
        }else{
          if(status=='procesat'){
            const htmlContent=String(confirmOrderEmail(id,result1[0].date,result1[0].username,result1[0].email,result1[0].telefon,result1[0].adresa,result1[0].judet,result1[0].oras,result1[0].modalitate))
            sendEmail({to:result1[0].email,subject:"Comandă Confirmată",text:null,html:htmlContent})
          }else{
            if(status=="livrare"){
              const htmlContent=String(deliverOrderEmail(id,result1[0].date,result1[0].username,result1[0].email,result1[0].telefon,result1[0].adresa,result1[0].judet,result1[0].oras,result1[0].modalitate,result1[0].price,25))
              sendEmail({to:result1[0].email,subject:"Comandă pe Drum",text:null,html:htmlContent})
            }
          }
          res.json({message:"success",status:1})
        }
      })

      
    }
  })
})

app.post("/api/admin/recentOrders",requireLogin,requireAdmin,(req,res)=>{
  const userId=req.session.user.id
  const query="SELECT * FROM orders";
  db.query(query,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).json({message:"databse error",status:0})
    }else{
      res.json({result:result,status:1})
    }
  })

})

app.post("/api/admin/getProducts",requireLogin,requireAdmin,(req,res)=>{
  const id=req.body
  const query="SELECT * FROM order_items WHERE orderid=?"
  db.query(query,[id],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).json({message:"database error",status:0})
    }else{
      res.json({result:result,status:1})
    }
  })
})

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
