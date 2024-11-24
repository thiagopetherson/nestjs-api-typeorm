import { createReadStream, ReadStream } from 'fs';

// Função para transformar um arquivo em buffer
export const getFileToBuffer = (filename: string) => {
  // Cria um stream de leitura a partir do arquivo
  const readStream = createReadStream(filename);
  const chunks = []; // Array para armazenar os chunks de dados lidos

  // Retorna uma Promise que resolve quando todos os dados forem lidos
  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      // Adiciona cada chunk ao array conforme o arquivo é lido
      readStream.on('data', (chunk) => chunks.push(chunk));

      // Rejeita a Promise se ocorrer um erro na leitura
      readStream.on('error', (err) => reject(err));

      // Quando a leitura for concluída, resolve a Promise com o buffer e o stream
      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks) as Buffer, // Concatena todos os chunks em um único Buffer
          stream: readStream, // Retorna o stream de leitura
        });
      });
    },
  );
};
