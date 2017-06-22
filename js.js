'use strict'

const renderPlaylistDisplay = () => { //shows the UI
    SC.initialize({
        client_id: 'fd4e76fc67798bfa742089ed619084a6'
    });

    let musicList = document.getElementById('musicTitles')
    let playerControls = document.getElementById('playerControls')
    let playerAudio = document.getElementById('playerAudio')
    let currentSong = document.getElementsByClassName('currentSong')[0]
    let musicStatus = document.getElementsByClassName('musicStatus')[0]
    let songIndexCounter = 0
    let input = document.getElementById('inputQuery');
            let playlistSource = []

    // let songPlayingName = playlistSource[songIndexCounter][0]
    // playerAudio.src = playlistSource[songIndexCounter][1]
    let playlistFile

    playerAudio.addEventListener('ended', () => {
        if (songIndexCounter < playlistSource.length - 1) {
            songIndexCounter = songIndexCounter + 1
        } else songIndexCounter = 0
        musicStatus.innerHTML = `Playing`
        currentSong.innerHTML = playlistSource[songIndexCounter][0]
        playerAudio.src = playlistSource[songIndexCounter][1]
        playerAudio.play()
    })

    let jukebox = { //audio controls
        search: (searchTerm) => {
            if (searchTerm != '') {
                playlistSource = []
                musicList.innerHTML = ''
                SC.get('/tracks', {
                    q: searchTerm
                }).then((tracks) => {
                    for (let i = 0; i < tracks.length; i++) {
                        playlistSource.push([tracks[i].title, tracks[i].id, tracks[i].artwork_url])
                    }
                    populatePlaylistDisplay()
                    playerAudioplaylistSource[songIndexCounter][1]        
                    SC.stream('/tracks/' + playlistSource[songIndexCounter][1]).then(function (playerAudio) {
                        playerAudio.play();
                    });            
                    jukebox.play()
                });
            } else alert('Please enter a value')
        },
        play: () => {
            musicStatus.innerHTML = `Playing`
            playerAudio.play()
        },
        pause: () => {
            playerAudio.pause()
            musicStatus.innerHTML = `Paused`
        },
        restart: () => {
            playerAudio.currentTime = 0
            playerAudio.play()
            musicStatus.innerHTML = `Restarting Song`
        },
        previous: () => {
            (songIndexCounter === 0) ? songIndexCounter = playlistSource.length - 1: songIndexCounter--
                playerAudio.src = playlistSource[songIndexCounter][1]
            currentSong.innerHTML = playlistSource[songIndexCounter][0]
            jukebox.play()
        },
        next: () => {
            (songIndexCounter === playlistSource.length - 1) ? songIndexCounter = 0: songIndexCounter++
                playerAudio.src = playlistSource[songIndexCounter][1]
            currentSong.innerHTML = playlistSource[songIndexCounter][0]
            jukebox.play()
        }
    }

    let clickSongSelection = (playlistIndex) => {
        jukebox.pause()
        songIndexCounter = parseInt(playlistIndex)
        currentSong.innerHTML = playlistSource[songIndexCounter][0]
         SC.stream('/tracks/' + playlistSource[songIndexCounter][1]).then(function (playerAudio) {
                        playerAudio.play();
                    });  
        jukebox.play()
    }

    let functionControl = (functionCommand, searchTerm) => {
        currentSong.innerHTML = playlistSource[songIndexCounter][0]
        jukebox[functionCommand](searchTerm)
    }

    let populatePlaylistDisplay = () => {
        for (let i = 0; i < playlistSource.length; i++) { //displays playlist
            let li = document.createElement('li')
            let musicTitles = document.createTextNode(playlistSource[i][0])
            li.appendChild(musicTitles)
            musicList.appendChild(li)
            li.setAttribute('data-index', i)
        }
    }

    jukebox.play()
    // currentSong.innerHTML = songPlayingName

    document.getElementById('musicTitles').onclick = (e) => clickSongSelection(e.target.getAttribute('data-index'))
    document.getElementsByTagName('button').onclick = (e) => functionControl(e.target.getAttribute('data-function'))
    document.getElementById('search').onclick = () => {

        jukebox.search(input.value)
    }

    // document.addEventListener("DOMContentLoaded", function (event) {
    // input.addEventListener('keyup', function (evt) {
    // search(input.value);
    // jukebox.search(input.value)

    // })
    // });
}

{
    renderPlaylistDisplay()
}