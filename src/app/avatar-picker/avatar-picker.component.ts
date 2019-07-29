import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";

@Component({
  selector: "app-avatar-picker",
  templateUrl: "./avatar-picker.component.html",
  styleUrls: ["./avatar-picker.component.css"]
})
export class AvatarPickerComponent implements OnInit {
  bodyTypes: any[] = [
    {
      name: "Female",
      image: "avatars/previews/geometry/female.png",
      type: "female"
    },
    { name: "Male", image: "avatars/previews/geometry/male.png", type: "male" }
  ];

  textureTypes: any[] = [
    {
      name: "Archer Girl",
      image: "avatars/previews/texture/archer.png",
      avatar_images_id: 28,
      is_approved: true
    },
    {
      name: "Astro Naut",
      image: "avatars/previews/texture/astronaut.png",
      avatar_images_id: 1,
      is_approved: true
    },
    {
      name: "Captain Spacey",
      image: "avatars/previews/texture/captainspacey.png",
      avatar_images_id: 2,
      is_approved: true
    },
    {
      name: "Chef Superb",
      image: "avatars/previews/texture/chef.png",
      avatar_images_id: 3,
      is_approved: true
    },
    {
      name: "Chip Woodley",
      image: "avatars/previews/texture/woodly.png",
      avatar_images_id: 4,
      is_approved: true
    },
    {
      name: "Clive Cop",
      image: "avatars/previews/texture/cop.png",
      avatar_images_id: 5,
      is_approved: true
    },
    {
      name: "Convict",
      image: "avatars/previews/texture/convict.png",
      avatar_images_id: 6,
      is_approved: true
    },
    {
      name: "Doc",
      image: "avatars/previews/texture/doctor.png",
      avatar_images_id: 7,
      is_approved: true
    },
    {
      name: "Elf",
      image: "avatars/previews/texture/elf.png",
      avatar_images_id: 8,
      is_approved: true
    },
    {
      name: "Franky Fire",
      image: "avatars/previews/texture/fireman.png",
      avatar_images_id: 9,
      is_approved: true
    },
    {
      name: "Girle Girl",
      image: "avatars/previews/texture/girly.png",
      avatar_images_id: 10,
      is_approved: true
    },
    {
      name: "Knight Kato",
      image: "avatars/previews/texture/knight.png",
      avatar_images_id: 11,
      is_approved: true
    },
    {
      name: "Morty the Mummy",
      image: "avatars/previews/texture/mummy.png",
      avatar_images_id: 12,
      is_approved: true
    },
    {
      name: "Ninja Go Camo",
      image: "avatars/previews/texture/ninja.png",
      avatar_images_id: 13,
      is_approved: true
    },
    {
      name: "Ninja Go Ninja",
      image: "avatars/previews/texture/ninja2.png",
      avatar_images_id: 14,
      is_approved: true
    },
    {
      name: "Pirate Pilt",
      image: "avatars/previews/texture/pirate.png",
      avatar_images_id: 15,
      is_approved: true
    },
    {
      name: "Pumpy",
      image: "avatars/previews/texture/pumpkin.png",
      avatar_images_id: 16,
      is_approved: true
    },
    {
      name: "Robert Roboto",
      image: "avatars/previews/texture/robot.png",
      avatar_images_id: 17,
      is_approved: true
    },
    {
      name: "Rumbo",
      image: "avatars/previews/texture/rambo.png",
      avatar_images_id: 18,
      is_approved: true
    },
    {
      name: "Santa Claus",
      image: "avatars/previews/texture/santa.png",
      avatar_images_id: 19,
      is_approved: true
    },
    {
      name: "Skelly",
      image: "avatars/previews/texture/skelly.png",
      avatar_images_id: 20,
      is_approved: true
    },
    {
      name: "Swampy the Eye",
      image: "avatars/previews/texture/swampy.png",
      avatar_images_id: 22,
      is_approved: true
    },
    {
      name: "Teachy Tess",
      image: "avatars/previews/texture/teacher.png",
      avatar_images_id: 23,
      is_approved: true
    },
    {
      name: "Undead Yeti",
      image: "avatars/previews/texture/yeti.png",
      avatar_images_id: 24,
      is_approved: true
    },
    {
      name: "Zombie Braains",
      image: "avatars/previews/texture/zombi.png",
      avatar_images_id: 27,
      is_approved: true
    }
  ];
  constructor(
    public expanseService: ExpanseClientService,
    private appService: AppService
  ) {
    this.expanseService
      .start()
      .then(() => this.expanseService.getAvatarImages())
      .then((images: any) => {
        this.textureTypes = images
          .map(image => {
            return {
              name: "Custom Avatar " + image.avatar_images_id,
              image: image.preview_image,
              avatar_images_id: image.avatar_images_id,
              is_approved: image.is_approved
            };
          })
          .concat(this.textureTypes);
        this.textureTypes.forEach(tex => {
          if (
            this.expanseService.currentSession.avatar_images_id ===
            tex.avatar_images_id
          ) {
            tex.selected = true;
          }
        });
        this.bodyTypes.forEach(body => {
          if (
            this.expanseService.currentSession.avatar_base_mesh === body.type
          ) {
            body.selected = true;
          }
        });
      });
  }

  ngOnInit() {}

  resetBody() {
    this.bodyTypes.forEach((type: any) => (type.selected = false));
  }

  resetTexture() {
    this.textureTypes.forEach((type: any) => (type.selected = false));
  }

  saveTexture() {
    this.textureTypes.forEach(tex => {
      if (tex.selected) {
        this.expanseService
          .setUserAvatarImage(tex.avatar_images_id)
          .then(resp => this.appService.showMessage(resp, "Saved!!"))
          .then(() => this.expanseService.refreshSession());
      }
    });
  }

  saveBody() {
    this.bodyTypes.forEach(body => {
      if (body.selected) {
        this.expanseService
          .setUserAvatarMesh(body.type)
          .then(resp => this.appService.showMessage(resp, "Saved!!"))
          .then(() => this.expanseService.refreshSession());
      }
    });
  }
}
