import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Accepts user content and then adds it to the database.
export const putDb = async (content) => {
  
  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  //Remember that this requires an object.
  const req = store.add({ jate: content })
  const res = await req;

  //Debugging only.
  console.log("Data saved to IndexedDB", res);

};

//Method which gets all stored JATE info from the database.
export const getDb = async () => {

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const req = store.getAll();

  const res = await req;

  //Debugging only.
  console.log("Loaded from IndexedDB", res);

};

initdb();
