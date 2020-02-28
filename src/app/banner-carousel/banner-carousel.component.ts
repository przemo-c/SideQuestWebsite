import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  QueryList,
  ViewChildren,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import * as moment from "moment";
import { CarouselItem } from "../home/home.component";

type SlideOffset = -1 | 1;

@Component({
  selector: "banner-carousel",
  templateUrl: "./banner-carousel.component.html",
  styleUrls: ["./banner-carousel.component.scss"]
})
export class BannerCarouselComponent implements AfterViewInit {
  @Input() items: CarouselItem[];
  @Output() itemSelected = new EventEmitter<string>();

  public activeIndex: number = 0;

  @ViewChild("slidePane", { static: false }) slidePane: ElementRef<
    HTMLDivElement
  >;
  @ViewChildren("slide") slides: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren("slideImage") slideImages: QueryList<
    ElementRef<HTMLDivElement>
  >;

  private slideDelay = 8000;
  private isStarted = false;
  private slideTimeout;

  ngAfterViewInit() {
    this.startRotating();
  }

  public onClickItem(targetUrl: string) {
    this.itemSelected.emit(targetUrl);
  }

  public gotoSlideRelative(offset: number) {
    this.activeIndex = this.relativeSlideIndex(offset as SlideOffset);
    this.play(offset as SlideOffset);
  }

  public gotoSlide(index: number) {
    this.activeIndex = index;
    this.play(1);
  }

  public timeAgo(ts: number) {
    return moment(ts).fromNow();
  }

  public formattedTimestamp(ts: number) {
    return moment(ts).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  private startRotating() {
    this.activeIndex = 0;
    this.slideImages.changes.subscribe(() => {
      if (this.slideImages.length > 0 && !this.isStarted) {
        this.isStarted = true;
        this.play(1);
      }
    });
    this.slideImages.notifyOnChanges();
  }

  private loadSlideImage(index: number) {
    const slideImage = this.slideImages.toArray()[index].nativeElement;
    if (!slideImage.style.backgroundImage) {
      slideImage.style.backgroundImage = `url(${this.items[index].imageUrl})`;
    }
  }

  private preloadRelative(offset: SlideOffset) {
    const index = this.relativeSlideIndex(offset);
    this.loadSlideImage(index);
  }

  private play(preloadOffset: SlideOffset) {
    this.loadSlideImage(this.activeIndex);
    this.slidePane.nativeElement.style.left = `-${this.activeIndex * 100}%`;
    this.preloadRelative(preloadOffset);
    clearTimeout(this.slideTimeout);
    this.slideTimeout = setTimeout(
      this.gotoSlideRelative.bind(this, 1),
      this.slideDelay
    );
  }

  private relativeSlideIndex(offset: SlideOffset) {
    return (
      (this.activeIndex + this.slides.length + offset) % this.slides.length
    );
  }
}
