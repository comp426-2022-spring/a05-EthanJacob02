const coin = document.getElementById("singleFlip")
coin.addEventListener("click", flipCoin)
async function flipCoin() {
    const url = 'http://localhost:5555/app/flip/'
    await fetch(url).then(function(response) {
    		    return response.json();
  		      }).then(function(result) {
				    console.log(result.flip);
				    document.getElementById("result").innerHTML = result.flip;
				    document.getElementById("quarter").setAttribute("src", "./assets/img/"+result.flip+".png");
				  });
};

const coins = document.getElementById("coins")
coins.addEventListener("submit", flipCoins)
async function flipCoins(event) {
    event.preventDefault();
    const endpoint = "app/flip/coins/"
	const url = document.baseURI+endpoint
    const formEvent = event.currentTarget
    try {
		const formData = new FormData(formEvent);
		const flips = await sendFlips({ url, formData });
		console.log(flips);
		document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
		document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
    } catch (error) {
		console.log(error);
	}
}

const call = document.getElementById("call")
call.addEventListener("submit", flipCall)

async function flipCall(event) {
    event.preventDefault();
    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent); 
        const results = await sendFlips({ url, formData });
        console.log(results);
        document.getElementById("choice").innerHTML = "Guess: "+results.call;
        document.getElementById("actual").innerHTML = "Actual: "+results.flip;
        document.getElementById("results").innerHTML = "Result: "+results.result;
        } catch (error) {
            console.log(error);
        }
}

async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json()
}

// Navigation Buttons
function homeNav() {
    document.getElementById("home").className = "visable";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

function singleNav() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "visable";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

function multiNav() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "visable";
    document.getElementById("guess").className = "hidden";
}

function guessNav() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "visable";
} 
