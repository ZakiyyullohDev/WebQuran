const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn")
const errorText = document.getElementById('errorText')
const wrapper = document.getElementById("wrapper")
const suraUl = document.querySelector('.sura-ul')
let test = 0

async function fetchAudio(playBtn, pauseBtn){
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${searchInput.value}/ar.alafasy`)
        if (!response.ok) {
            console.log(searchInput.value);
            throw new Error("Sura topib bo'lmadi Iltimos qaytadan urinig!")
        }
        
        if (searchInput.value > 114) {
            const errorText = document.createElement('p')
            errorText.textContent = "Sura topib bo'lmadi Iltimos qaytadan urinig!"
            errorText.classList.add('error-text')
            wrapper.appendChild(errorText)
        }
        
        const data = await response.json()
        
        console.log(data);
        
        let audio = data.data.ayahs[0].audio
        const numbersAyah = data.data.numberOfAyahs
        
        const audioElement = document.createElement('audio');
        playBtn.addEventListener('click', ()=> {
            for (let ayah = 0; ayah < numbersAyah; ayah++) {
                data.data.ayahs[test++]
                audioElement.src = audio;
                audioElement.play();
            }
        })
        
        pauseBtn.addEventListener('click', ()=> {
            audioElement.pause()
        })
        
    } catch (error) {
        console.error(error);
    }
}

// fetchAudio()

async function fetchdata(){
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${searchInput.value}`)
        if (!response.ok) {
            console.log(searchInput.value);
            throw new Error("Sura topib bo'lmadi Iltimos qaytadan urinig!")
        }
        
        if (searchInput.value > 114) {
            errorText.textContent = "Sura topib bo'lmadi Iltimos qaytadan urinig!"
            errorText.style.display = 'block'
            return ''
        }
        
        const data = await response.json()
        const suraNumber = data.data.number
        
        const suraName = data.data.englishName
        
        const suraLi = document.createElement('li')
        suraLi.classList.add('sura-li')
        
        const suraId = document.createElement('p')
        suraId.textContent = suraNumber
        suraId.classList.add('sura-id')
        
        const suraNameText = document.createElement('p')
        suraNameText.textContent = suraName
        suraNameText.classList.add('sura-name')
        
        const playBtn = document.createElement('button')
        playBtn.classList.add('btn')
        
        const pauseBtn = document.createElement('button')
        pauseBtn.classList.add('btn')
        
        const playIcon = document.createElement('i')
        playIcon.classList.add('fa-solid', 'fa-play', 'play-icon')
        
        const pauseIcon = document.createElement('i')
        pauseIcon.classList.add('fa-solid', 'fa-pause', 'pause-icon')
        
        fetchAudio(playBtn, pauseBtn)
        
        suraLi.appendChild(suraId)
        suraLi.appendChild(suraNameText)
        suraLi.appendChild(playBtn)
        playBtn.appendChild(playIcon)
        pauseBtn.appendChild(pauseIcon)
        suraLi.appendChild(playBtn)
        suraLi.appendChild(pauseBtn)
        suraUl.appendChild(suraLi)
        
    }
    catch(error) {
        console.error(error);
    }
}

submitBtn.addEventListener('click', () => {
    fetchdata()
})

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        fetchdata()
    }
})
