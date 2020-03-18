import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCtz512JEV9NftRywwBvbbt035V9XmlRwg",
    authDomain: "onlineaccounting-ad6a8.firebaseapp.com",
    databaseURL: "https://onlineaccounting-ad6a8.firebaseio.com",
    projectId: "onlineaccounting-ad6a8",
    storageBucket: "onlineaccounting-ad6a8.appspot.com",
    messagingSenderId: "351284660186",
    appId: "1:351284660186:web:aa6278b1e2703fbfeee2e3",
    measurementId: "G-RY25F64SQ9"
  };

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
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
						amount: snapshot.docs[i].data().amount,
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