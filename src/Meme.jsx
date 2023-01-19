import { useState, useEffect } from "react";



export default function Meme() {


    const [meme, setMeme] =useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMeme, setAllMeme] = useState([])
    
    const handleChange = (event) =>{
        const {name, value, type} = event.target
        setMeme(prevState =>({
            ...prevState,
            [name]: value
        }))
    }
    useEffect(() =>{
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes)
        }
        getMemes()

    }, [])

    console.log(allMeme)

    const getMemeImg = () =>{
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        let url = allMeme[randomNumber].url
        setMeme(prevState => ({
            topText: "",
            bottomText: "",
            randomImage: url
        }))
        
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    name = "topText"
                    className="form--input"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    className="form--input"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImg}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
            <img className="img--meme" src={meme.randomImage} />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    )
}