'use strict'

const renderPlaylistDisplay = () => { //shows the UI
    // const playlistSource = [
    //     ['Amy Winehouse - Love Is A Losing Game', 'music/amy.mp3'],
    //     ['Coldplay - Parachutes', 'music/coldplay.mp3'],
    //     ['Drake - Bria\'s Interlude', 'music/drake.mp3'],
    //     ['Rick Ross - Maybach Music IV', 'music/rick.mp3'],
    //     ['Sleep Thieves - Out Of The Darkness', 'music/sleep.mp3']
    // ]
    // let musicList = document.getElementById('musicTitles')
    // let playerControls = document.getElementById('playerControls')
    // let playerAudio = document.getElementById('playerAudio')
    // let currentSong = document.getElementsByClassName('currentSong')[0]
    // let musicStatus = document.getElementsByClassName('musicStatus')[0]
    // let songIndexCounter = 0
    // let songPlayingName = playlistSource[songIndexCounter][0]
    // playerAudio.src = playlistSource[songIndexCounter][1]
    // let playlistFile

    // playerAudio.addEventListener('ended', () => {
    //     if (songIndexCounter < playlistSource.length-1) {
    //         songIndexCounter = songIndexCounter+1
    //     } else songIndexCounter = 0
    //     musicStatus.innerHTML = `Playing`        
    //     currentSong.innerHTML = playlistSource[songIndexCounter][0]        
    //     playerAudio.src = playlistSource[songIndexCounter][1]
    //     playerAudio.play()
    // })

    // let jukebox = { //audio controls
    //     play: () => {
    //         musicStatus.innerHTML = `Playing`
    //         playerAudio.play()
    //     },
    //     pause: () => {
    //         playerAudio.pause()
    //         musicStatus.innerHTML = `Paused`
    //     },
    //     restart: () => {
    //         playerAudio.currentTime = 0
    //         playerAudio.play()
    //         musicStatus.innerHTML = `Restarting Song`
    //     },
    //     previous: () => {
    //         (songIndexCounter === 0) ? songIndexCounter = playlistSource.length - 1: songIndexCounter--
    //             playerAudio.src = playlistSource[songIndexCounter][1]
    //         currentSong.innerHTML = playlistSource[songIndexCounter][0]
    //         jukebox.play()
    //     },
    //     next: () => {
    //         (songIndexCounter === playlistSource.length - 1) ? songIndexCounter = 0: songIndexCounter++
    //             playerAudio.src = playlistSource[songIndexCounter][1]
    //         currentSong.innerHTML = playlistSource[songIndexCounter][0]
    //         jukebox.play()
    //     }
    // }

    // let clickSongSelection = (playlistIndex) => {
    //     jukebox.pause()
    //     songIndexCounter = parseInt(playlistIndex)
    //     currentSong.innerHTML = playlistSource[songIndexCounter][0]
    //     playerAudio.src = playlistSource[songIndexCounter][1]
    //     jukebox.play()
    // }

    // let funcControl = (functionCommand) => {
    //     currentSong.innerHTML = playlistSource[songIndexCounter][0]
    //     jukebox[functionCommand]()
    // }

    // for (let i = 0; i < playlistSource.length; i++) { //displays playlist
    //     let li = document.createElement('li')
    //     let musicTitles = document.createTextNode(playlistSource[i][0])
    //     li.appendChild(musicTitles)
    //     musicList.appendChild(li)
    //     li.setAttribute('data-index', i)
    // }
    // jukebox.play()
    // currentSong.innerHTML = songPlayingName

    // document.getElementById('musicTitles').onclick = (e) => clickSongSelection(e.target.getAttribute('data-index'))
    // document.getElementById('playerControls').onclick = (e) => funcControl(e.target.getAttribute('data-function'))

    SC.initialize({
        client_id: 'fd4e76fc67798bfa742089ed619084a6'
    });
            alert(0)

    function search(searchTearm) {

        SC.get('/tracks', {
            q: searchTearm
        }).then(function (tracks) {
            console.log(tracks)
            // SC.stream('/tracks/' + tracks[0].id).then(function (player) {
            //     player.play();
            // });

        });
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        var input = document.getElementById('inputQuery');
        input.addEventListener('keyup', function (evt) {
            search(input.value);
        })
    });
}

{
    renderPlaylistDisplay()
}