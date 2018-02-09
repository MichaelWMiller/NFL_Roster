function NflService() {
    var playersData = [];
    var myTeam = [];

    this.getPlayersBySearchParam = function getPlayersBySearchParam(searchKey, searchValue) {

        var filtered = playersData.filter(function(player) {
            if (player[searchKey].toLowerCase() == searchValue.toLowerCase()) {
                return true;
            }
        })

        return filtered
    }


    // this.getPlayersByTeam = function(teamName) {
    //     return playersData.filter(function(player) {
    //         if (player.team == teamName) {
    //             return true;
    //         }
    //     });
    // }

    // this.getPlayersByPosition = function(position) {
    //     //return an array of all players who match the given position.
    //     return playersData.filter(function(player) {
    //         if (player.position == position) {
    //             return true;
    //         }
    //     });
    // }

    // this.getPlayersByName = function getPlayersByName(playerName) {
    //     //return players by name
    //     return playersData.filter(function(player) {
    //         if (player.name == playerName) {
    //             return true;
    //         }
    //     })
    // }


    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            console.log(playersData)
            return
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function(data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')

        });
    }

    function getPlayerById(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            var player = arr[i]
            if (id == player.id) {
                return player
            }
        }
    }

    //PUBLIC
    this.addToMyTeam = function addToTeam(id) {
        var player = getCharactersById(nflPlayers, id)
        if (!player || getCharacterById(myTeam, id) || myTeam.length > 13) { return }
        myTeam.push(player)
    }

    this.removeFromTeam = function(id) {
        var player = getPlayerById(myTeam, id)
        if (!player) { return }
        var i = myTeam.indexOf(player)
        myTeam.splice(i, 1)
    }

    loadPlayersData(); //call the function above every time we create a new service

}