import { IClient } from "src/entities/IClient";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../src/config/firebase";

const create = async (
  payload: IClient,
  userId: string
): Promise<{ data: any; error: any }> => {
  const { name, address, city, country, postalCode } = payload;

  try {
    const docRef = await addDoc(collection(db, "clients"), {
      name,
      address,
      city,
      country,
      postalCode,
      userId,
    });

    return {
      data: docRef.id,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};

const getAll = async (userId: string): Promise<{ data: any; error: any }> => {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"));
    let clients = [] as any[];
    querySnapshot.forEach((doc) => {
      clients.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return {
      data: clients as IClient[],
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};

const getOne = async (id: string): Promise<{ data: any; error: any }> => {
  try {
    const rawClient = await getDoc(doc(db, "clients", id));

    const client = {
      id: rawClient.id,
      data: rawClient.data(),
    };

    return {
      data: client as any,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e,
    };
  }
};

export const clientServices = {
  create,
  getAll,
  getOne,
};
