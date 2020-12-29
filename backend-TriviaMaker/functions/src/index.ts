import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();

const triviasRef = "games/trivias/";

export const onPhotoUrlCreation =
    functions.storage.object()
    .onFinalize( (object, context) => {

        if(!object.name?.startsWith(triviasRef + "photoUrl/")){
            return console.log("PhotoUrl Trigger: file is not inside games/trivias/photoUrl/");
        }

        if (!object.contentType?.startsWith("image/")){
            return console.log("PhotoUrl Trigger: file is not an image");
        }
        const link = object.selfLink;
        let name = object.name;                                              // name = games/trivias/photoUrl/example.jpeg
        const beginIndex = object.name.lastIndexOf("/");
        name = name?.substring(beginIndex, name?.lastIndexOf("."));          // name = example

        admin.firestore().collection(triviasRef + "singleChoice")
            .doc(name)
            .update({"photoUrl": link})
            .catch( (reason) => {
                console.log("Error updating singleChoice photoUrl Trivia");
                console.log(reason);
            });

        admin.firestore().collection(triviasRef + "multipleChoice")
            .doc(name)
            .update({ "photoUrl": link })
            .catch((reason) => {
                console.log("Error updating multipleChoice photoUrl Trivia");
                console.log(reason);
            });
    })

//export const onSingleChoiceTriviaCreation = 
//functions.firestore.document(triviasRef + "singleChoice/{docID}")
//.onCreate( (snap, context) => {
//    const data = snap.data();
//    //get image, download it, send to FB Storage
//    let photoUrl = data["photoUrl"];
//    photoUrl = "testando";
//    
//    //get FB Storage image link, add it to Firestore
//    
//    })

//admin.firestore().doc(triviasRef + "singleChoice/" + snap.id).update({
//    "photoUrl": photoUrl,
//})
//    .catch((reason) => {
//        console.log(reason);
//    })
//const file = admin.storage().bucket().file(triviasRef + "photoUrl/" + snap.id + ".png");
//console.log(file);
//file.createReadStream().pipe(file.createWriteStream());

//admin.storage().bucket().upload(triviasRef + "photoUrl/" + snap.id)
//    .catch((reason) => {
//        console.log(reason);
//    })
//admin.storage().bucket().file("teste.png").createWriteStream().pipe()

//export const getSingleChoiceTrivias = functions.https.onRequest((_request, response) => {
//    admin.firestore().doc("games/trivias/singleChoice/teste").get()
//        .then(snapshot => {
//            const data = snapshot.data();
//            response.send(data);
//        })
//        .catch(error => {
//            console.log(error);
//            response.status(500).send(error);
//        })
//})