async function getJoke(){
    try{
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")

        if (!response.ok) {
            throw new Error(`HTTP Error : ${response.status}`)
        }

        const joke = await response.json()

        console.log("\n😂 Random Joke");
        console.log(joke.setup);
        console.log(joke.punchline);

    }catch(error){
        console.log("Error fetching joke : ",error);
    }
}

module.exports = getJoke
