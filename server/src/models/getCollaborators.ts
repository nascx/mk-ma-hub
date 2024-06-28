import { db } from "../config/db";

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
export const getDoneTests = async (date: string): Promise<{ [key: string]: string }> => {
    try {
        console.log(date)
        return new Promise((resolve, reject) => {
            const query = "SELECT registration, result, id FROM results WHERE date LIKE ?";
            db.query(query, [date], (err, data) => {
                if (err) {
                    return reject(err);
                }
                if (data && data.length > 0) {
                    const hashTable = data.reduce((acc: { [key: string]: { result: string, id: number } }, { registration, result, id }) => {
                        if (!acc[registration] || acc[registration].id < id) {
                            acc[registration] = { result, id };
                        }
                        return acc;
                    }, {});

                    const resultHashTable = Object.keys(hashTable).reduce((acc: { [key: string]: string }, key) => {
                        acc[key] = hashTable[key].result;
                        return acc;
                    }, {});

                    resolve(resultHashTable);
                } else {
                    resolve({});
                }
            });
        });
    } catch (error) {
        throw error;
    }
};