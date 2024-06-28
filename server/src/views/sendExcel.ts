import ExcelJS from 'exceljs';
import { getDoneTests, getAllCollaborators } from '../models/getCollaborators';
import { Request, Response } from 'express';

export const sendExcel = async (req: Request, res: Response) => {
    try {
        // Obter todos os colaboradores
        const allCollaborators = await getAllCollaborators() as { id: string, name: string }[];
        
        // Obter todos os testes realizados em uma data específica
        const doneTests = await getDoneTests('%%/06/24') as { [key: string]: string };

        // Mapear os resultados para incluir o status do teste
        const results = allCollaborators.map((collaborator) => {
            const status = doneTests[collaborator.id]
                ? doneTests[collaborator.id] === 'positive' ? 'OK' : 'NG'
                : 'Pendente';

            return {
                id: collaborator.id,
                name: collaborator.name,
                status: status,
                label: collaborator.name,
                value: collaborator.name
            };
        });

        // Criar um novo workbook e worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Resultados');

        // Adicionar o cabeçalho
        worksheet.columns = [
            { header: 'Nome', key: 'name', width: 100, font: {bold: true} },
            { header: 'MATRICULA', key: 'id', width: 10 },
            { header: 'Status', key: 'status', width: 10 },
            { header: 'Label', key: 'label', width: 30 },
            { header: 'Value', key: 'value', width: 30 },
        ];

        // Adicionar dados ao worksheet
        results.forEach((row) => {
            const rowData = { name: row.name, id: row.id, status: row.status } 
            worksheet.addRow(rowData);
        });

        // Enviar o arquivo Excel como resposta
        const buffer = await workbook.xlsx.writeBuffer();
        res.setHeader('Content-Disposition', 'attachment; filename="resultados.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        res.status(400).json('Error');
    }
};
