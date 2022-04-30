const coin = document.getElementById("flipOne")
coin.addEventListener("click", flipCoin)
async function flipCoin() {
    const endpoint = "app/flip/"
    const url = document.baseURI+endpoint
    await fetch(url).then(function(response) {
    		    return response.json();
  		      }).then(function(result) {
				    console.log(result);
				    document.getElementById("result").innerHTML = result.flip;
				    document.getElementById("quarter").setAttribute("src", "assets/img/"+result.flip+".png");
				  });
  };