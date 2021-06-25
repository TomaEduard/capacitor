import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Observable } from 'rxjs';
// import { fileText } from './files/file-sample-text';

export let FILE_KEY = 'files';

@Component({
  selector: 'app-feature-file-system',
  templateUrl: './feature-file-system.component.html',
  styleUrls: ['./feature-file-system.component.css']
})
export class FeatureFileSystemComponent implements OnInit {

  downloadUrl = '';
  myFiles = [];
  // download$: Observable<Download>
  

  pdfUrl="https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf";
  docUrl="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc";
  videoUrl="https://file-examples.com/index.php/sample-video-files/sample-mp4-files";
  imageUrl="https://file-examples.com/index.php/sample-images-download/sample-png-download";

  constructor(private http: HttpClient) {
    // this.loadingFiles()
  }

  // async loadingFiles() {
  //   const videoList = await Storage.get({ key: FILE_KEY})
  // }
  
  ngOnInit(): void {
  }

  writeSecretFile = async () => {
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  
  // Directory.Documents,  - /storage/emulated/0/Documents/secrets/text.txt
  // 
  readSecretFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  
    console.log('secrets:', contents);
    window.alert(contents)
  };
  
  deleteSecretFile = async () => {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
  };
  
  readFilePath = async () => {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    // const contents = await Filesystem.readFile({
    //   // path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
    //   path: fileText
    // });
  
    // console.log('data:', contents);
    // window.alert(contents)
  };

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

}
