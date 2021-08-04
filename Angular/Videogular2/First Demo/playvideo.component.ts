import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {UserServiceService} from '../user-service.service';
import {Router , ActivatedRoute} from '@angular/router';
import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// export interface IMedia {
//   src: any;
//   type: string;
// }


@Component({
  selector: 'app-playcourse',
  templateUrl: './playcourse.component.html',
  styleUrls: ['./playcourse.component.css']
})


export class PlaycourseComponent implements OnInit {
  id: number;
  pdcontent:any;
  all_courses: any;
  videourlgular:any;
  video_url: any;
  mobileQuery: MediaQueryList;
  pdfsrc: any;
  items:any=[0];
  items1:any=[1,2,3];
  private _mobileQueryListener: () => void;


  
  sources= {};
  constructor(private changeDetectorRef: ChangeDetectorRef,private media: MediaMatcher,private userService: UserServiceService, private router: ActivatedRoute , private _sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
    ngOnInit(){
    this.router.params.subscribe( params => {
      this.id = params['id'];
      //alert(this.id);
    })
    this.get_single(this.id);
  }

  createRange(number){
    console.log('createRange'+number);
    var items: number[] = [];
    for( var i = 0; i < number; i++) {
      items.push(i);
    }
    console.log(items);
    return items;
  }

  Range(number) {          
    console.log('range'+ number);
    var items: number[] = [];
    for( var i = 0; i < number; i++) {
      items.push(i);
    }
    console.log(items);
    return items;
  }

  another_range(number){
    /*console.log('number'+ number);*/
    var items: number[] = [];
    for( var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  get_single(id) {
    console.log('get catagory calling');
    this.userService.getById(id).subscribe(
      data => {
        this.all_courses = data['data'];
        console.log('I CANT SEE DATA HERE in single componenet : ', this.all_courses);
        console.log(this.all_courses[0]['values'][0]['values'][0]['full_vid_url']);
      
        this.video_url = this.all_courses[0]['values'][0]['values'][0]['full_vid_url'];
        this.videourlgular = this.video_url;
        //this.video_url  = "https://storage.googleapis.com/web-assets/videos/ECHO2017/VijayaLakshmi/VijayaLakshmi-360p.mp4"
        this.pdfsrc = this.all_courses[0]['values'][0]['values'][0]['pdf'];
        console.log('urllllllllllllll', this.video_url)


      }
    );
  }


  updatevideo(url){
    this.video_url = url;
    console.log(this.video_url);
  }





  photoURL() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.pdfsrc);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

