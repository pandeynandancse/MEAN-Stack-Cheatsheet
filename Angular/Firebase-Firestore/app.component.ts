import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'myproject';
  currentMessage = new BehaviorSubject({});
  email ="nandanpandey@gmail.com";
  res:any;
  password = "123456789123";
  private dbPath = '/tutorials/';
  tutorials:any;
  constructor( private firestore: AngularFirestore ) { }

  ngOnInit(){}
  
  addDataInFirestore(){
    var data ={'name':'nandan','email':'pandeynancsne'};
       return  this.firestore
            .collection("contact")
            .add(data)
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
  }

  getFirestoreData(){
   return  this.firestore.collection("contact").snapshotChanges().subscribe(res =>{
        console.log("all docs in document" , res)
        this.res =res[0].payload.doc.id;
        console.log("0th-index document id of firestore", res[0].payload.doc.id)
        console.log("0th-index document data of firestore", res[0].payload.doc.data())
    })
  }

  //update 0th-index document
  updateCollection(){
    return this.firestore
       .collection("contact")
       .doc(this.res)
       .set({ completed: false }, { merge: true });
  }


  //delete name field of 0th-index document
  deleteField(){
    return this.firestore
       .collection("contact")
       .doc(this.res)
       .update({
      name: firebase.firestore.FieldValue.delete()
    })
  }
  

  //delete 0th-index document
  deleteCollection(){
    this.firestore
       .collection("contact")
       .doc(this.res)
       .delete();
  }

}
