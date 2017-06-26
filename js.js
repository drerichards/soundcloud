'use strict'

const renderPlaylistDisplay = () => { //shows the UI and all content
    SC.initialize({
        client_id: 'fd4e76fc67798bfa742089ed619084a6'
    });

    let musicList = document.getElementById('musicTitles')
    let playerControls = document.getElementById('playerControls')
    let currentSongTitle = document.querySelector('.currentSongTitle')
    let trackImg = document.querySelector('img')
    let userLink = document.querySelector('.userLink')
    let musicStatus = document.querySelector('.musicStatus')
    let btnControls = document.querySelectorAll('button[data-function]')
    let input = document.getElementById('inputQuery');
    let songIndexCounter = 0
    let playlistSource = []
    let currentSong
    let trackImage

    class Jukebox {
        constructor(player) {
            this.player = player
        }
        play() {
            musicStatus.innerHTML = `Playing`
            currentSongTitle.setAttribute('href', playlistSource[songIndexCounter][5])
            currentSongTitle.innerHTML = playlistSource[songIndexCounter][0]
            if (playlistSource[songIndexCounter][2] != null) {
                trackImage = playlistSource[songIndexCounter][2]
            } else trackImage = 'default.png'
            trackImg.setAttribute('src', trackImage)
            userLink.setAttribute('href', playlistSource[songIndexCounter][4])
            userLink.innerHTML = playlistSource[songIndexCounter][3]
            this.player.seek(0)            
            this.player.play()
            this.continue()
        }
        pause() {
            musicStatus.innerHTML = `Paused`
            this.player.pause()
        }
        restart() {
            musicStatus.innerHTML = `Song Restarted`
            this.player.seek(0)
            this.player.play()
        }
        previous() {
            (songIndexCounter === 0) ? songIndexCounter = playlistSource.length - 1: songIndexCounter--
                currentSong = playlistSource[songIndexCounter][1]
            currentSongTitle.innerHTML = playlistSource[songIndexCounter][0]
            scStream(currentSong)
        }
        next() {
            (songIndexCounter === playlistSource.length - 1) ? songIndexCounter = 0: songIndexCounter++
                currentSong = playlistSource[songIndexCounter][1]
            currentSongTitle.innerHTML = playlistSource[songIndexCounter][0]
            scStream(currentSong)
        }
        continue () {
            this.player.on('finish', () => { //plays next song in list when current tracks stops
                if (songIndexCounter < playlistSource.length - 1) {
                    songIndexCounter = songIndexCounter + 1
                } else songIndexCounter = 0
                currentSong = playlistSource[songIndexCounter][1]
                scStream(currentSong)
            })
        }
    }

    let scStream = (songPlaying) => {
        SC.stream('/tracks/' + songPlaying).then(function (player) {
            let scJukebox = new Jukebox(player) //create new instance of Jukebox class and pass in SC player
            scJukebox.pause()
            scJukebox.play() //auto plays audio
            for (let i = 0; i < btnControls.length; i++) { //calls functions of the class instance
                btnControls[i].onclick = (e) => scJukebox[e.target.getAttribute('data-function')]()
            }
            let playlistTracks = document.querySelectorAll('li') //dynamically creates var for tracks
            for (let i = 0; i < playlistTracks.length; i++) { //makes each track clickable
                playlistTracks[i].onclick = (e) => clickSongSelection(e.target.getAttribute('data-index'))
            }
        });
    }

    let search = (searchTerm) => {
        if (searchTerm != '') {
            playlistSource = [] //clears playlist with each new search
            musicList.innerHTML = ''
            SC.get('/tracks', {
                q: searchTerm
            }).then((tracks) => {
                populatePlaylistDisplay(tracks) //pass queried tracks into func to display
                currentSong = playlistSource[songIndexCounter][1]
                scStream(currentSong)
            });
        } else alert('Please enter a value') //if no input entry
    }

    let clickSongSelection = (playlistIndex) => { //when new song from playlist selected
        songIndexCounter = parseInt(playlistIndex)
        currentSong = playlistSource[songIndexCounter][1]
        scStream(currentSong)
    }

    let populatePlaylistDisplay = (tracks) => { //displays playlist from search
        for (let i = 0; i < tracks.length; i++) {
            playlistSource.push([tracks[i].title, tracks[i].id, tracks[i].artwork_url, tracks[i].user.username, tracks[i].user.permalink_url, tracks[i].permalink_url])
        }
        console.log(tracks[0])
        for (let i = 0; i < playlistSource.length; i++) {
            let li = document.createElement('li')
            let musicTitles = document.createTextNode(playlistSource[i][0])
            li.appendChild(musicTitles)
            musicList.appendChild(li)
            li.setAttribute('data-index', i)
        }
    }

    document.getElementById('search').onclick = () => search(input.value) //initiates search

}

{
    renderPlaylistDisplay() //calls main function IIFE
}