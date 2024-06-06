import { db } from "../../config/db";

// para selecionar todos os colaboradores
export const getAllCollaborators = async () => {
    try {
        return new Promise (async(resolve, reject) => {
            const q = 'SELECT id, name FROM colab'
            await db.query(q, (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0 ) {
                    resolve(data)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const getCollaboratorForId = async (id: string) => {
    try {
        return new Promise (async(resolve, reject) => {
            const q = 'SELECT id, name FROM colab WHERE id = ?'
            await db.query(q, [id], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0 ) {
                    resolve(data)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

// para selecionar todos os que fizeram o teste no mês
export const getDoneTests = async ( date:  string ) => {
    try {
        return new Promise (async(resolve, reject) => {
            const q = "SELECT registration, result FROM results WHERE date LIKE ?"
            await db.query(q, [date], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    const hashTable = data.reduce((acc: { [key: string]: string }, value: { registration: string, result: string }) => {
                        acc[value.registration] = value.result;
                        return acc;
                    }, {});
                    resolve(hashTable);
                } else {
                    resolve([])
                }
            })
        })
    } catch (error) {
        throw error
    }
}