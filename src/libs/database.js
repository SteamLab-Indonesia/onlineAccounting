import firebase from './dbsetting';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getCurrentUser() {
    return cookies.get('user');    
}

export function updateUser(user)
{
    cookies.set('user', user, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/'
    });
}

export function login(username, password) {

	return new Promise((resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
			updateUser(username);
			resolve();
		}).catch((err)=>reject(err));
	})
}

export function logout() {
	return new Promise((resolve, reject) => {
		firebase.auth().signOut().then(() => {
			resolve('success');
		})
		.catch((err) => reject(err))
	})
}

export function getTransaction(){
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('Transaction').get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						date: snapshot.docs[i].data().date,
						category: snapshot.docs[i].data().category,
						description: snapshot.docs[i].data().description,
						amount: Number(snapshot.docs[i].data().amount),
					};
					data.push(object);
				}


				resolve(data);
			}
		})
  })
}

export function getIncomeCategory(){
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('Category').where('section', '==', 'Income').get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						name: snapshot.docs[i].data().name
					};
					data.push(object);
				}


				resolve(data);
			}
		})
  })
}

export function getExpenseCategory(){
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('Category').where('section', '==', 'Expense').get()
		.then((snapshot) => {
			if(snapshot.empty){
				resolve(null);
			}
			else{
				let data = [];
				for (let i=0;i< snapshot.docs.length; ++i){
					let object = {
						id: snapshot.docs[i].id,
						name: snapshot.docs[i].data().name
					};
					data.push(object);
				}


				resolve(data);
			}
		})
  })
}

export function updateTransaction(transactionId, newData){
	return new Promise((resolve,reject)=>{
		if (transactionId)
		{
			const db = firebase.firestore();
			let currentDoc = db.collection('Transaction').doc(transactionId);
			if (currentDoc)
			{
				currentDoc.set(newData).then(()=>
				{
					resolve('success');
				}).catch((err) => reject(err));
			}
		}
		else
		{
			reject('Invalid Transaction ID')
		}
	})
}

export function insertTransaction(newData){
	return new Promise((resolve,reject)=>{
		if (newData)
		{
			const db = firebase.firestore();
			db.collection('Transaction').add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})
			// if (currentDoc)
			// {
			// 	currentDoc.add(newData).then(()=>
			// 	{
			// 		resolve('success');
			// 	}).catch((err) => reject(err));
			// }
		}
		else
		{
			reject('Invalid Transaction ID')
		}
	})
}

export function insertCategory(newData){
	return new Promise((resolve,reject)=>{
		if (newData)
		{
			const db = firebase.firestore();
			db.collection('Category').add(newData)
			.then((snapshot) => {
				console.log(snapshot);
				resolve(snapshot.id);
			})
			// if (currentDoc)
			// {
			// 	currentDoc.add(newData).then(()=>
			// 	{
			// 		resolve('success');
			// 	}).catch((err) => reject(err));
			// }
		}
		else
		{
			reject('Invalid Category ID')
		}
	})
}

export function getChatroom(sender, recipient)
{
	return new Promise((resolve, reject) => {
		const db = firebase.firestore();
		db.collection('chatroom')
		.where('sender', 'in', [sender, recipient])
		.get().
		then((data) => {
			if (data.empty)
				resolve(null);
			else
			{
				for (let i=0; i < data.docs.length; ++i)
				{
					let chatroom = data.docs[i];
					if (chatroom.data().recipient == recipient ||
						chatroom.data().recipient == sender)
					{
						resolve({
							id: chatroom.id,
							sender: chatroom.data().sender,
							recipient: chatroom.data().recipient
						})
					}
				}
				resolve(null);
			}
		}).catch((err) => reject(err));
	})
}

export function getChatMessage(chatroomId)
{
	return new Promise((resolve,reject)=>{
		const db = firebase.firestore();
		db.collection('chats')
		.where('chatroom', '==', db.collection('chatroom').doc(chatroomId))
		.orderBy('timestamp', 'desc')
		.limit(100).get()
		.then((snapshot) =>{
			if (snapshot.empty)
				resolve([])
			else
			{
				let messages = [];
				for(let i=0; i < snapshot.docs.length; ++i)
				{
					let doc = snapshot.docs[i];
					messages.push({
						id: doc.id,
						from: doc.data().from,
						message: doc.data().message,
						timestamp: doc.data().timestamp
					})
				}
				resolve(messages);
			}
		}).catch((err)=>reject(err));
	})
}

export function sendChatMessage(chatroomId, from, message) {
	return new Promise((resolve, reject) => {
		const db = firebase.firestore();

		if (!chatroomId)
			reject('Invalid Chatroom Id');

		db.collection('chats').add({
			chatroom: db.collection('chatroom').doc(chatroomId),
			from: from,
			message: message,
			timestamp: new Date()
		}).then((snapshot) => {
			resolve(snapshot.id);
		}).catch((err) => reject(err));
	});
}

export function onNewChatMessage(chatroomId, callbackFunction)
{
	const db = firebase.firestore();
	db.collection('chats')
	.where('chatroom', '==', db.collection('chatroom').doc(chatroomId))
	.orderBy('timestamp', 'desc')
	.onSnapshot((snapshot) => {
		let messages = [];
		for (let i=0; i < snapshot.docs.length; ++i)
		{
			let doc = snapshot.docs[i];
			messages.push({
				id: doc.id,
				from: doc.data().from,
				message: doc.data().message,
				timestamp: doc.data().timestamp
			});
		}
		if (callbackFunction)
			callbackFunction(messages);

	})
}