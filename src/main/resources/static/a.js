const url = 'http://localhost:8080';

var curConservationId;
var conservations = document.querySelectorAll('.conservation');

function connect() {
//	var socket = new SockJS(url + '/mess');

	var socket = new SockJS('https://testtt113231.herokuapp.com/?fbclid=IwAR3jVMoLZ2uXa4viSBtl--qA6We5qSicUuJ9u89LOYCBK2aAzVPOoj7OdCU/mess');


     stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);

}

function onConnected(frame) {
	for(let i = 0; i < conservations.length; i++){
		console.log(conservations[i]);
		let index = i + 1;
		stompClient.subscribe('/topic/conservation' + index, onMessageReceived);
	}
	curConservationId = document.querySelector('#conservationId').value ;
	
	
	var state = document.querySelector('#state');
	state.style.color = 'red';
	console.log(state);
	state.innerText = `Connected all conservations`;
}
connect();
function onError() {
	console.log('no');
}
function onMessageReceived(response) {
		console.log('Response');
		var data = JSON.parse(response.body);
		var conservation  = conservations[data.conservationId - 1];
		console.log(conservation);
		var node = document.createElement("p");                 
		var textnode = document.createTextNode(data.message);
		node.appendChild(textnode);                              

		conservation.appendChild(node);
	
}

function sendMess(){
	let mess = document.querySelector('#input').value;
	curConservationId = document.querySelector('#conservationId').value ;

	console.log(mess);
	stompClient.send("/app/chat/" + curConservationId, {}, JSON.stringify({
        conservationId: curConservationId,
        message: mess
    }));
	document.querySelector('#input').value = '';

}