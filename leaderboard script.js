function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var nextState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "RECIEVED":
            nextState.content = action.payload;
            return nextState;
        case "ERROR":
            alert("OOPS something happened try again");
            return nextState;
        default:
            return state;
    }
}

var store = Redux.createStore(reducer);

function render() {
    var state = store.getState();
    var FCC = document.getElementById("FCC");
    FCC.innerHTML = "";
    for (var i = 0; i < state.content.length; i++) {
        var content = state.content[i];
        var tr = document.createElement("tr");
        var index = document.createElement("td");
        var user = document.createElement("td");
        var username = document.createElement("span");
        var userimg = document.createElement("td");
        var img = document.createElement("img");
        var alltime = document.createElement("td");
        var recent = document.createElement("td");
        index.innerHTML = i + 1;
        img.src = content.img;
        img.style.height = "4rem";
        userimg.appendChild(img);
        username.innerHTML = content.username;
        user.appendChild(username);
        recent.innerHTML = content.recent;
        alltime.innerHTML = content.alltime;
        tr.appendChild(index);
        tr.appendChild(userimg);
        tr.appendChild(user);
        tr.appendChild(alltime);
        tr.appendChild(recent);
        FCC.appendChild(tr);
    }
}
store.subscribe(render);


    axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then(function (response) {
        store.dispatch({ type: "RECIEVED", payload: response.data });
    }).catch(function (error) {
        store.dispatch({ type: "ERROR", payload: error });
    });


document.getElementById("alltime").addEventListener("click", function () {
        axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then(function (response) {
            store.dispatch({ type: "RECIEVED", payload: response.data });
        }).catch(function (error) {
            store.dispatch({ type: "ERROR", payload: error });
        });
    });
document.getElementById("recent").addEventListener("click", function () {
    
        axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent").then(function (response) {
            store.dispatch({ type: "RECIEVED", payload: response.data });
        }).catch(function (error) {
            store.dispatch({ type: "ERROR" });
        });
    });