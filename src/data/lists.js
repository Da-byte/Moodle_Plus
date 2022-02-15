
import app from "../firebase/firebase";


export async function fiterList(collectionName) {
    try {
    var ItemList = "{ ";
    let dbList = (await app
      .firestore() 
      .collection(collectionName)
      .where("Active", "==", true)
      .orderBy("order_no", "asc")
      .get()
    ).docs.map(doc => ({ code: doc.data().code, description: doc.data().description }));
    //build json output
    for (let i = 0; i < dbList.length; i++) {
      ItemList += "\"" + dbList[i].code + "\" : \"" + dbList[i].description + "\"";
      if (i + 1 < dbList.length) ItemList += ", "
    }
    return ItemList + "}"; // JSON format
  } catch (e) {
    console.log(e)
    return "{}";
  }
} 