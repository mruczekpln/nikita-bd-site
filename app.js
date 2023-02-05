const clickableElement = document.querySelector('.clickable')
const loadingPage = document.querySelector('.loading')
const landingPage = document.querySelector('.landing')
const mainPage = document.querySelector('.main')
const bonus = document.querySelector('.bonus')
const bonusImage = document.querySelector('.bonus-image')

const video = document.querySelectorAll('video')
const images = document.querySelectorAll('img')
const oSound = new Audio('./src/o.mp3')
const musik = new Audio('./src/music.mp3')

const loaded = []

// images.forEach(img => {
// 	img.onload = () => {
// 		console.log('loaded')
// 		loaded.push(img)
// 		console.log(loaded)

// 		if (loaded.length === 6) main()
// 	}
// })

video.forEach(vid => {
	vid.load()
	vid.addEventListener('canplaythrough', () => {
		console.log('loaded')
		loaded.push(vid)
		console.log(loaded)

		if (loaded.length === 2) main()
	})
})

const main = async () => {
	loadingPage.style.display = 'none'
	landingPage.style.display = 'flex'

	const switchPage = async () => {
		clickableElement.removeEventListener('click', handleClickAnimation)
		landingPage.style.display = 'none'
		mainPage.style.display = 'flex'

		setTimeout(() => {
			video.forEach(file => file.play())
		}, 1000)
	}

	let clickableState = { clicks: 0, scale: 0.5, drop: false }
	setTimeout(() => {
		clickableState.drop = true
		console.log('drop')
	}, 25500)
	const handleClickAnimation = e => {
		if (clickableState.clicks === 0) musik.play()
		if (clickableState.drop) switchPage()

		clickableState.scale += 0.1
		clickableState.clicks++
		console.log(clickableState)

		clickableElement.style.scale = clickableState.scale
		oSound.load()
		oSound.play()
	}

	let isBonusShown = false
	const switchBonus = () => {
		isBonusShown ? (bonusImage.style.bottom = '-2000px') : (bonusImage.style.bottom = '0px')
		isBonusShown = !isBonusShown
	}

	bonus.addEventListener('click', switchBonus)
	clickableElement.addEventListener('click', handleClickAnimation)
}
