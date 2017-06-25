'use strict'

const renderPlaylistDisplay = () => { //shows the UI and all content
    SC.initialize({
        client_id: fd4e76fc67798bfa742089ed619084a6
    });

    let musicList = document.getElementById('musicTitles')
    let playerControls = document.getElementById('playerControls')
    let audioPlayer = document.getElementById('audioPlayer')
    let currentSong = document.getElementsByClassName('currentSong')[0]
    let musicStatus = document.getElementsByClassName('musicStatus')[0]
    let btnControls = document.querySelectorAll('button[data-function]')
    let input = document.getElementById('inputQuery');
    let songIndexCounter = 0
    let playlistSource = []

    audioPlayer.addEventListener('ended', () => { //plays next song in list when current tracks stops
        if (songIndexCounter < playlistSource.length - 1) {
            songIndexCounter = songIndexCounter + 1
        } else songIndexCounter = 0
        musicStatus.innerHTML = `Playing`
        currentSong.innerHTML = playlistSource[songIndexCounter][0]
        audioPlayer.src = playlistSource[songIndexCounter][1]
        audioPlayer.play()
    })

    class Jukebox {
        constructor(player) {
            this.player = player
        }
        play() {
            // alert(0)
            console.log(player)
            musicStatus.innerHTML = `Playing`
            currentSong.innerHTML = playlistSource[songIndexCounter][0]
            player.play()
        }
        pause() {
            // alert(0)
            musicStatus.innerHTML = `Paused`
            player.pause()
        }
        restart() {
            // alert(0)
            musicStatus.innerHTML = `Restarting Song`
            player.currentTime = 0
            player.play()
        }
        previous() {
            (songIndexCounter === 0) ? songIndexCounter = playlistSource.length - 1: songIndexCounter--
                player.src = playlistSource[songIndexCounter][1]
            currentSong.innerHTML = playlistSource[songIndexCounter][0]
            player.play()
        }
        next() {
            (songIndexCounter === playlistSource.length - 1) ? songIndexCounter = 0: songIndexCounter++
                player.src = playlistSource[songIndexCounter][1]
            currentSong.innerHTML = playlistSource[songIndexCounter][0]
            player.play()
        }
    }

    let search = (searchTerm) => {
        if (searchTerm != '') {
            playlistSource = [] //clears playlist with each new search
            musicList.innerHTML = ''
            SC.get('/tracks', {
                q: searchTerm
            }).then((tracks) => {
                populatePlaylistDisplay(tracks)//pass queried tracks into func to display
                SC.stream('/tracks/' + playlistSource[songIndexCounter][1]).then(function (player) {
                    let scJukebox = new Jukebox(player) //create new instance of Jukebox class and pass in SC player
                    scJukebox.play(); //this should play audio
                    for (let i = 0; i < btnControls.length; i++) { //calls functions of the class instance
                        btnControls[i].addEventListener('click', (e) => scJukebox[e.target.getAttribute('data-function')]())
                    }
                    let playlistTracks = document.querySelectorAll('li') //dynamically creates var for tracks
                    for (let i = 0; i < playlistTracks.length; i++) { //makes each track clickable
                        playlistTracks[i].addEventListener('click', (e) => clickSongSelection(e.target.getAttribute('data-index')))
                    }
                });
            });
        } else alert('Please enter a value')//if no input entry
    }

    let clickSongSelection = (playlistIndex) => { //when new song from playlist selected
        scJukebox.pause()
        songIndexCounter = parseInt(playlistIndex)
        currentSong.innerHTML = playlistSource[songIndexCounter][0]
    }

    let populatePlaylistDisplay = (tracks) => { //displays playlist from search
        for (let i = 0; i < tracks.length; i++) {
            playlistSource.push([tracks[i].title, tracks[i].id, tracks[i].artwork_url])
        }
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