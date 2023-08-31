import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: [],
})
export class IndexComponent implements OnInit {
  // header section
  heightSize: number = 46;
  translationOffset: number = 0;

  // comments section
  elementsOffset: number[] = [0, 0, 0, 0, 0];
  lastElementTrack: number = 0;
  elementsTracker: number[] = [0, 0, 0, 0, 0];
  elementsCount: number = 4;

  // intersection observer section
  IOTracker: any[] = [];
  IOElements: any;
  rightIOElements: any;
  leftIOElements: any;
  // initialSectionClasses = [
  //   "transition-all",
  //   "duration-1000",
  //   "opacity-0",
  //   "blur-lg",
  //   "delay-300",
  // ];

  moveInterval = setInterval((): void => this.moveHandler(), 1000);
  commentMoveInterval = setInterval((): void => this.commentMoveHandler(), 10);

  // header handler
  moveHandler(): void {
    this.translationOffset =
      this.translationOffset > 2 * (this.heightSize - 1)
        ? 0
        : (this.translationOffset += this.heightSize);
  }

  // comments handler
  commentMoveHandler(): void {
    this.elementsOffset = this.elementsOffset.map((eo, index) => {
      this.elementsTracker[index] += 1;
      return this.elementsTracker[index] + index * 420;
    });
  }

  commentAddInterval = setInterval((): number | void => {
    this.lastElementTrack =
      this.lastElementTrack <= 0
        ? (this.lastElementTrack = this.elementsCount)
        : this.lastElementTrack - 1;

    this.elementsTracker[this.lastElementTrack] =
      0 - this.lastElementTrack * 420 - 420;
  }, 10 * 420);

  // initial movement
  ngOnInit() {
    this.lastElementTrack =
      this.lastElementTrack <= 0
        ? (this.lastElementTrack = this.elementsCount)
        : this.lastElementTrack - 1;
    this.elementsTracker[this.lastElementTrack] =
      0 - this.lastElementTrack * 420 - 400;

    // get intersection observer objects
    // this.IOElements = document.querySelectorAll("section");
    // this.IOElements.forEach((element: any) => {
    //   this.initialSectionClasses.map((className) => {
    //     element.classList.add(className);
    //   });
    //   this.intersectionObserver.observe(element);
    // });

    // get right intersection observer objects
    this.rightIOElements = document.querySelectorAll(".right");
    this.rightIOElements.forEach((element: any) => {
      this.rightIntersectionObserver.observe(element);
    });

    // get left intersection observer objects
    this.leftIOElements = document.querySelectorAll(".left");
    this.leftIOElements.forEach((element: any) => {
      this.leftIntersectionObserver.observe(element);
    });
  }

  // intersection obesrvesr
  // intersectionObserver: IntersectionObserver = new IntersectionObserver(
  //   (observer) => {
  //     observer.forEach((o) => {
  //       if (o.isIntersecting) {
  //       } else {
  //         o.target.classList.add("opacity-0");
  //         o.target.classList.add("blur-lg");
  //       }
  //     });
  //   }
  // );

  // right intersection observer
  rightIntersectionObserver: IntersectionObserver = new IntersectionObserver(
    (observers) => {
      observers.forEach((o) => {
        if (o.isIntersecting) {
          o.target.classList.remove("translate-x-72");
          o.target.classList.remove("opacity-0");
          o.target.classList.remove("blur-lg");
        } else {
          o.target.classList.add("translate-x-72");
          o.target.classList.add("opacity-0");
          o.target.classList.add("blur-lg");
        }
      });
    }
  );

  // left intersection observer
  leftIntersectionObserver: IntersectionObserver = new IntersectionObserver(
    (observers) => {
      observers.forEach((o) => {
        if (o.isIntersecting) {
          o.target.classList.remove("-translate-x-72");
          o.target.classList.remove("opacity-0");
          o.target.classList.remove("blur-lg");
        } else {
          o.target.classList.add("-translate-x-72");
          o.target.classList.add("opacity-0");
          o.target.classList.add("blur-lg");
        }
      });
    }
  );

  comments: any[] = [
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia esse veritatis deserunt! Non sit nostrum, sapiente ipsum ad optio nam molestias nihil voluptatem. Unde tempora provident dignissimos saepe quod.",
      author: "author",
    },
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia esse veritatis deserunt! Non sit nostrum, sapiente ipsum ad optio nam molestias nihil voluptatem. Unde tempora provident dignissimos saepe quod.",
      author: "author",
    },
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia esse veritatis deserunt! Non sit nostrum, sapiente ipsum ad optio nam molestias nihil voluptatem. Unde tempora provident dignissimos saepe quod.",
      author: "author",
    },
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia esse veritatis deserunt! Non sit nostrum, sapiente ipsum ad optio nam molestias nihil voluptatem. Unde tempora provident dignissimos saepe quod.",
      author: "author",
    },
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quia esse veritatis deserunt! Non sit nostrum, sapiente ipsum ad optio nam molestias nihil voluptatem. Unde tempora provident dignissimos saepe quod.",
      author: "author",
    },
  ];
}
