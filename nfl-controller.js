function Nflcontroller() {

    var loading = true; //Start the spinner
    var nflService = new NflService(drawNfl)
    var myTeamElem = document.getElementById("myTeam")
    var nflElem = document.getElementById("playerRoster")

    function getPlayers() {
        nflService.getPlayersBySearchParam("position", "QB")
    }

    function drawNfl(arr) {

        var template = ``
        var nflElem = document.getElementById("playerRoster")
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i]
            player.fullname = player.fullname ? player.fullname : 'No Name'
            player.position = player.position ? player.position : 'Not listed'
            player.pro_team = player.pro_team ? player.pro_team : 'Not listed'
            template += `
            <div class="col s3 player-card" >
                <img src="${player.photo}" style="width: 90px" alt="player card">
                <h4>Name: <span id="playerName">${player.fullname}</span></h4>
                <h5>Position: <span id="playerPosition">${player.position}</span></h5>
                <h5>Team: <span id="playerTeam">${player.pro_team}</span></h5>
                <button class="button btn btn-primary" onclick="app.controllers.nflCtrl.addToMyTeam(${player.id})">Add to my Team</button>
            </div>
            
            `
        }
        nflElem.innerHTML = template
    }

    function drawMyTeam(arr) {
        var template = ``
        var myTeamElem = document.getElementById("myTeam")
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i]
            player.fullname = player.fullname ? player.fullname : 'No Name'
            player.position = player.position ? player.position : 'Not listed'
            player.pro_team = player.pro_team ? player.pro_team : 'Not listed'
            template += `
            <div class="col s3 player-card" >
            <img src="${player.photo}" style="width: 90px" alt="player card">
            <h4>Name: <span id="playerName">${player.fullname}</span></h4>
            <h5>Position: <span id="playerPosition">${player.position}</span></h5>
            <h5>Team: <span id="playerTeam">${player.pro_team}</span></h5>
            <button class="button btn btn-primary" onclick="app.controllers.nflCtrl.removeFromMyTeam(${player.id})">Remove From My Team</button>
        </div>
            `
        }
        myTeamElem.innerHTML = template
    }

    this.getMyTeam = function() {
        //return myTeam

        drawMyTeam(myTeam)
    }

    this.addToMyTeam = function addToMyTeam(id) {
        nflService.addToMyTeam(id)

        drawMyTeam(nflService.getMyTeam())
    }

    this.removeFromMyTeam = function removeFromMyTeam(id) {
        var myTeamArr = nflService.removeFromTeam(id)
        drawMyTeam(myTeamArr)
    }

    this.search = function search(event) {

        event.preventDefault()
        var formData = event.target
        var name = formData.name.value
        var position = formData.position.value
        var team = formData.team.value
        var filteredArray = []

        var searchKey = ""
        var searchValue = ""
        if (name) {
            searchValue = name
            searchKey = "fullname"
        }
        if (position) {
            searchValue = position
            searchKey = "position"
        }
        if (team) {
            searchValue = team
            searchKey = "pro_team"
        }
        var filteredArray = nflService.getPlayersBySearchParam(searchKey, searchValue)

        drawNfl(filteredArray)
    }

    // function ready() {
    //     loading = false; //stop the spinner

    //     //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

    //     $('some-button').on('click', function() {
    //         var teamSF = nflService.getPlayersByTeam("SF");
    //     })
    // }

    getPlayers()

}