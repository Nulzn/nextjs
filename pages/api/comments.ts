import { NextApiRequest, NextApiResponse } from "next";
import db from "../../services/Firebase.js"
import { collection, addDoc } from "firebase/firestore"

export default async function Create(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.commentArea == "") { return; }

    try {
        const docRef = await addDoc(collection(db, "users"), {
            id: 1,
            email: req.body.username,
            comment: req.body.commentArea
        });
        console.log("Document writtin with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}