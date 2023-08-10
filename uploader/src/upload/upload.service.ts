import { Injectable } from '@nestjs/common';

@Injectable()
class UploadService {
  uploadToMinio(file: Express.Multer.File, filename: string) {}
}
