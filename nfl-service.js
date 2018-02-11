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

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function(data) {
            playersData = data.body.players;
            //console.log('Player Data Ready')
            //console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
                //console.log('Finished Writing Player Data to localStorage')

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
        var player = getPlayerById(playersData, id)
        if (!player || getPlayerById(myTeam, id) || myTeam.length > 12) {
            return
        }
        myTeam.push(player)
    }

    this.getMyTeam = function getMyTeam() {
        return myTeam
    }

    this.removeFromTeam = function(id) {
        var player = getPlayerById(myTeam, id)
        if (!player) {
            return
        }
        var i = myTeam.indexOf(player)
        myTeam.splice(i, 1)
        return myTeam
    }

    loadPlayersData(); //call the function above every time we create a new service

}