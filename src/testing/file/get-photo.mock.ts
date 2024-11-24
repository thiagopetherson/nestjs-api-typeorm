import { join } from 'path';
import { getFileToBuffer } from './get-file-to-buffer';

// Função que retorna uma foto simulada para testes
export const getPhoto = async () => {
  // Converte o arquivo 'photo.png' em buffer e retorna o stream
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, 'photo.png'),
  );

  // Simula um arquivo no formato esperado pelo multer
  const photo: Express.Multer.File = {
    fieldname: 'file', // Nome do campo do arquivo
    originalname: 'photo.png', // Nome original do arquivo
    encoding: '7bit', // Tipo de codificação
    mimetype: 'image/png', // Tipo MIME do arquivo
    size: 1024 * 50, // Tamanho do arquivo (em bytes)
    stream, // Stream de leitura do arquivo
    destination: '', // Caminho de destino (simulado)
    filename: 'file-name', // Nome do arquivo
    path: 'file-path', // Caminho do arquivo (simulado)
    buffer, // Buffer contendo os dados do arquivo
  };

  return photo; // Retorna o objeto do arquivo simulado
};
