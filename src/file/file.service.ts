import { Injectable } from "@nestjs/common";
import { PathLike } from "fs";
import { writeFile } from "fs/promises"; // Assim que salvamos o arquivo (isso é do Node mesmo)
import { join } from "path";

@Injectable()
export class FileService {

  getDestinationPath() {
    return join(__dirname, '..', '..', 'storage', 'files')
  }

  async uploadFile(file: Express.Multer.File, filename: string) {    

    // Salvando o arquivo 
    // O primeiro parâmetro do writeFile é onde salvaremos o arquivo (Criamos as pastas "storage/files" para salvar os arquivos) e nomeamos o arquivo
    // O segundo parâmetro é o conteúdo (dados) do arquivo
    // No primeiro parâmetroSubimos dois diretórios e depois entramos em "storage/files"


    const path: PathLike = join(this.getDestinationPath(), filename);
    await writeFile(path, file.buffer);
    return path;
  }
}