import firebase from './dbsetting';

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
