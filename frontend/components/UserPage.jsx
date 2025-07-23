import React from "react";
import { useAuth } from "./AuthContext";


export default function UserPage() {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const [username,setUsername]=React.useState("")
	const [email,setEmail]=React.useState("")
	const [tel,setTel]=React.useState("")
	const [judet,setJudet]=React.useState("")
	const [oras,setOras]=React.useState("")
	const [adress,setAdress]=React.useState("")
	const [postalcode,setPostalcode]=React.useState("")
	const [orders,setOrder]=React.useState([])

	const [loading,setLoading]=React.useState(false)

	React.useEffect(() => {
		const fetchAll = async () => {
			try {
			setLoading(true);

			const [userRes, ordersRes] = await Promise.all([
				fetch("/user/data"),
				fetch("/orders/show"),
			]);

			if (!userRes.ok) throw new Error("Failed to get user data");
			if (!ordersRes.ok) throw new Error("Failed to get orders");

			const userData = await userRes.json();
			const ordersData = await ordersRes.json();

			setUsername(userData[0].username);
			setEmail(userData[0].email);
			setTel(userData[0].telefon);
			setJudet(userData[0].judet);
			setOras(userData[0].oras);
			setAdress(userData[0].adresa);
			setPostalcode(userData[0].cod_postal);

			setOrder(ordersData);
			} catch (err) {
			console.error(err);
			} finally {
			setLoading(false);
			}
		};

		fetchAll();
	}, []);


	const handleLogout = async () => {
		try {
			const res = await fetch("/logout");
			const data = await res.json();
			if (res.ok) {
				setIsLoggedIn(false);
				location.reload()
			} else {
				console.error("Logout failed:", data.message);
			}
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	const handleAdressChange=async ()=>{
		try{
			const res=await fetch("/user/adressChange",{
				method:"POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({judet,oras,adress,postalcode})
			})
			const data=await res.json()
			if(res.ok){
				location.reload()
			}else{
				console.error("Adress change failed",data.message)
			}
		}
		catch (error){
			console.error(error)
		}
	}

	const ordersElems=orders.map((order)=>{
		const isoString = order.date;
		const date = new Date(isoString);

		const formattedDate = 
			String(date.getDate()).padStart(2, "0") + "/" +
			String(date.getMonth() + 1).padStart(2, "0") + "/" +
			date.getFullYear();
		return(
			<div className="order-cont-card">
				<div className="upper-order-cont">
					<div className="order-icon">
						{order.status==="livrare"? 
							<i class="bi bi-truck" style={{color:"white",fontSize:"40px"}}></i> :
						order.status==="finalizat" ? 
							<i class="bi bi-house-check" style={{color:"white",fontSize:"40px"}}></i> :
								order.status==="procesat" ? <i class="bi bi-box-seam" style={{color:"white",fontSize:"40px"}}></i>:
								<i class="bi bi-hourglass-split" style={{color:"white",fontSize:"40px"}}></i>
						}
					</div>
					<div className="order-id-cont">
						<h3>ID Comandă:</h3>
						<h4>{order.id}</h4>
					</div>
					<div className="sec-data-cont">
						<div className="order-status-cont">
							<span>Status:</span>
							<span>{order.status}</span>
						</div>
						<div className="order-date-cont">
							<span>Data:</span>
							<span>{formattedDate}</span>
						</div>
					</div>
				</div>
				
				
				<div className="order-price-cont">
					<h3>Total:</h3>
					<h4>{order.price} Lei</h4>
				</div>
			</div>
		)
	})

 	return (
		<div className="user-page-cont-main">
			<div className="my-acc-cont">
				<h1>Contul Meu</h1>
				<section>
					{loading ? <h1>Se încarcă...</h1>:
					<>					
					<div className="det-cont-main">
						<h2>Nume:</h2>
						<input type="text" value={username} readOnly></input>
					</div>
					<div className="det-cont-main">
						<h2>E-mail:</h2>
						<input type="text" value={email} readOnly></input>
					</div>
					<div className="det-cont-main">
						<h2>Număr Telefon:</h2>
						<input type="text" value={tel} readOnly></input>
					</div>
					<form className="adr-cont-main" onSubmit={handleAdressChange}>
						<h2>Adresă Livrare:</h2>
						<ul className="adr-list">
							<li>
								<span>Județ:</span>
								<select name="judete" required onChange={(e)=>setJudet(e.target.value)} value={judet}>
									<option value="">Alege Judet</option>
									<option value="Alba">Alba</option>
									<option value="Arad">Arad</option>
									<option value="Arges">Arges</option>
									<option value="Bacau">Bacau</option>
									<option value="Bihor">Bihor</option>
									<option value="Bistrita Nasaud">Bistrita Nasaud</option>
									<option value="Botosani">Botosani</option>
									<option value="Brasov">Brasov</option>
									<option value="Braila">Braila</option>
									<option value="Bucuresti">Bucuresti</option>
									<option value="Buzau">Buzau</option>
									<option value="Caras Severin">Caras Severin</option>
									<option value="Calarasi">Calarasi</option>
									<option value="Cluj">Cluj</option>
									<option value="Constanta">Constanta</option>
									<option value="Covasna">Covasna</option>
									<option value="Dambovita">Dambovita</option>
									<option value="Dolj">Dolj</option>
									<option value="Galati">Galati</option>
									<option value="Giurgiu">Giurgiu</option>
									<option value="Gorj">Gorj</option>
									<option value="Harghita">Harghita</option>
									<option value="Hunedoara">Hunedoara</option>
									<option value="Ialomita">Ialomita</option>
									<option value="Iasi">Iasi</option>
									<option value="Ilfov">Ilfov</option>
									<option value="Maramures">Maramures</option>
									<option value="Mehedinti">Mehedinti</option>
									<option value="Mures">Mures</option>
									<option value="Neamt">Neamt</option>
									<option value="Olt">Olt</option>
									<option value="Prahova">Prahova</option>
									<option value="Satu Mare">Satu Mare</option>
									<option value="Salaj">Salaj</option>
									<option value="Sibiu">Sibiu</option>
									<option value="Suceava">Suceava</option>
									<option value="Teleorman">Teleorman</option>
									<option value="Timis">Timis</option>
									<option value="Tulcea">Tulcea</option>
									<option value="Vaslui">Vaslui</option>
									<option value="Valcea">Valcea</option>
									<option value="Vrancea">Vrancea</option>
								</select>
							</li>
							<li>
								<span>Oraș:</span>
								<input type="text" value={oras} required onChange={(e) => setOras(e.target.value)}/>
							</li>
							<li>
								<span>Adresă:</span>
								<input type="text" value={adress} required onChange={(e) => setAdress(e.target.value)}/>
							</li>
							<li>
								<span>Cod&nbsp;Poștal:</span>
								<input type="text" value={postalcode} required onChange={(e) => setPostalcode(e.target.value)}/>
							</li>
						</ul>
						<button>Modifică Adresa</button>
					</form>
					<button className="logout-btn" onClick={handleLogout}>Log&nbsp;Out</button></>}
				</section>
			</div>
			<div className="my-ord-cont">
				<h1>Comenzile Mele</h1>
				<section className="">
					{ordersElems.length>0 ? ordersElems : <h1>Nu există comenzi...</h1>}
				</section>
			</div>
		</div>
  	);
}
