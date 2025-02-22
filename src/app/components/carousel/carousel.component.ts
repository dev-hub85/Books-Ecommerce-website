import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  imports: [FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  imageUrl: string = 'images/image1.jpg';
  imageUrl2: string = 'images/image2.jpeg';
  index: number = -1;
  titles: string[] = [
    'The Requiem Red',
    'On a Midnight Clear',
    'Crown of Midnight (Throne of Glass #2)',
    'Avatar: The Last Airbender: Smoke and Shadow, Part 3 (Smoke and Shadow #3)',
  ];
  imgLink: string[] = [
    'https://books.toscrape.com/media/cache/6b/07/6b07b77236b7c80f42bd90bf325e69f6.jpg',
    'https://books.toscrape.com/media/cache/75/9d/759d9276739200e2cb8101a36449ba20.jpg',
    'https://books.toscrape.com/media/cache/b7/7d/b77d5e56daa3c22822abf1b8affbaef9.jpg',
    'https://books.toscrape.com/media/cache/9f/25/9f25ffe4229a32d1368b3dfe248c3343.jpg',
  ];
  description: string[] = [
    "Patient Twenty-nine.A monster roams the halls of Soothing Hills Asylum. Three girls dead. 29 is endowed with the curse…or gift of perception. She hears messages in music, sees lyrics in paintings. And the corn. A lifetime asylum resident, the orchestral corn music is the only constant in her life.Mason, a new, kind orderly, sees 29 as a woman, not a lunatic. And as his bel Patient Twenty-nine.A monster roams the halls of Soothing Hills Asylum. Three girls dead. 29 is endowed with the curse…or gift of perception. She hears messages in music, sees lyrics in paintings. And the corn. A lifetime asylum resident, the orchestral corn music is the only constant in her life.Mason, a new, kind orderly, sees 29 as a woman, not a lunatic. And as his belief in her grows, so does her self- confidence. That perhaps she might escape, might see the outside world. But the monster has other plans. The missing girls share one common thread...each was twenty-nine's cell mate. Will she be next? ...more",
    "It's Christmas Eve and private investigator Adam Fraley has lost his way while traveling a remote rural road in the foothills of the Colorado Rockies during a heavy snowstorm. At a loss as to where to turn next, he happens upon an isolated cabin in the woods where he stops to seek directions. There to greet him is the dwelling's lone inhabitant, an enchanting young girl wh It's Christmas Eve and private investigator Adam Fraley has lost his way while traveling a remote rural road in the foothills of the Colorado Rockies during a heavy snowstorm. At a loss as to where to turn next, he happens upon an isolated cabin in the woods where he stops to seek directions. There to greet him is the dwelling's lone inhabitant, an enchanting young girl who invites him out of the storm. Puzzled by the circumstances of a child left home along under such conditions, Fraley soon discovers the horrific reason why, a revelation that launches him into an intensive search for both a killer and a trove of buried gold. ...more",
    "A line that should never be crossed is about to be breached.It puts this entire castle in jeopardy—and the life of your friend.From the throne of glass rules a king with a fist of iron and a soul as black as pitch. Assassin Celaena Sardothien won a brutal contest to become his Champion. Yet Celaena is far from loyal to the crown. She hides her secret vigilantly; she know A line that should never be crossed is about to be breached.It puts this entire castle in jeopardy—and the life of your friend. From the throne of glass rules a king with a fist of iron and a soul as black as pitch. Assassin Celaena Sardothien won a brutal contest to become his Champion. Yet Celaena is far from loyal to the crown. She hides her secret vigilantly; she knows that the man she serves is bent on evil.Keeping up the deadly charade becomes increasingly difficult when Celaena realizes she is not the only one seeking justice. As she tries to untangle the mysteries buried deep within the glass castle, her closest relationships suffer. It seems no one is above questioning her allegiances—not the Crown Prince Dorian; not Chaol, the Captain of the Guard; not even her best friend, Nehemia, a foreign princess with a rebel heart.Then one terrible night, the secrets they have all been keeping lead to an unspeakable tragedy. As Celaena's world shatters, she will be forced to give up the very thing most precious to her and decide once and for all where her true loyalties lie... and whom she is ultimately willing to fight for. ...more",
    "Children are disappearing in the Fire Nation capitol! Avatar Aang and his friends are doing everything in their power to save them - but will it be enough?!What's worse, when Azula - the mad sister of Fire Lord Zuko - appears on the scene, Zuko locks down the capitol to catch her, igniting fear and riots in the streets! Will Zuko follow in his evil father's footsteps in or Children are disappearing in the Fire Nation capitol! Avatar Aang and his friends are doing everything in their power to save them - but will it be enough?!What's worse, when Azula - the mad sister of Fire Lord Zuko - appears on the scene, Zuko locks down the capitol to catch her, igniting fear and riots in the streets! Will Zuko follow in his evil father's footsteps in order to save those he holds dear?!Written and drawn by the creative team behind the best-selling The Promise, The Search and The Rift, Gene Luen Yang and Gurihiru, in collaboration with Avatar: The Last Airbender and Legend of Korra creators Michael Dante DiMartino and Bryan Konietzko, this is the ultimate continuation of Avatar and the perfect companion to Legend of Korra! ...more",
  ];
  price: number[] = [22.65, 14.07, 43.29, 28.09];

  private animationInterval: any;
  model: any = {
    name: '',
  };
  private router = inject(Router);

  ngOnInit() {
    this.animate();
  }

  findBook(formData: any) {
    console.log(formData);
    this.router.navigate(['/search/', formData.Booksearch]);
  }
  animate() {
    const book = document.getElementsByClassName('slide');
    this.index = (this.index + 1) % book.length;
    book[this.index].classList.add('slide-right');
    this.animationInterval = setInterval(() => {
      for (let i = 0; i < book.length; i++) {
        book[i].classList.remove('slide-right');
      }
      this.index = (this.index + 1) % book.length;
      book[this.index].classList.add('slide-right');
    }, 5000);
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}
