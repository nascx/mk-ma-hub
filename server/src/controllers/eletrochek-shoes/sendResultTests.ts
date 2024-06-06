import { Request, Response, json } from 'express'
import { getAllCollaborators, getDoneTests } from '../../models/eletrocheck-shoes/getCollaborators';

const extractMonthAndYear = (date: string) => {
    const regex = /\d{2}\/(\d{2})\/(\d{4})/;
    const match = date.match(regex);
    if (match && match[1] && match[2]) {
        return `%%/${match[1]}/${match[2]}`;
    } else {
        return null;
    }
}

export const sendResults = async (req: Request, res: Response) => {
    try {
        const currenteDate = new Date().toLocaleDateString('pt-br')
        const dateForQuery = extractMonthAndYear(currenteDate)
        const allCollaborators = await getAllCollaborators() as []
        const doneTests = await getDoneTests(dateForQuery as string) as any
        const results = allCollaborators.map((collaborator: {id: string, name: string }) => {
            if (doneTests[collaborator.id]) {
                return {id: collaborator.id, name: collaborator.name, status: doneTests[collaborator.id] === 'positive' ? 'OK' : 'NG', label: collaborator.name, value: collaborator.name}
            } else {
                return {id: collaborator.id, name: collaborator.name, status: 'Pendente', label: collaborator.name, value: collaborator.name}
            }
        })
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const sendResultsForId = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
}