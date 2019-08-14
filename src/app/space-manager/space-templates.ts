export class SpaceTemplates {
  template = {
    settings: {
      name: "Space",
      uuid: "675B41EA-634A-45DA-87EF-D7D493F3B4C7",
      type: "Object3D",
      shadow: {
        cast: false,
        receive: false
      },
      transform: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      },
      mouseOn: false,
      behaviours: [],
      physics: {
        enabled: false,
        walkOnEnabled: false,
        settings: { mass: 0, friction: 0, restitution: 0 },
        shapes: []
      },
      hide_on_mobile: false,
      hide_on_desktop: false,
      preserve_scale: false,
      disable_animations: false,
      geometry: { sub_type: "" },
      material: {},
      light: {},
      sound: {},
      state: {
        added: false,
        updated: false,
        transform_update: false,
        removed: false
      },
      space_settings: {
        auto_mute: false,
        running: true,
        jumping: true,
        fly: true,
        move: true,
        rotate: true,
        teleport: true,
        spawn_point: {
          transform: {
            position: { x: 0.0, y: 10.0, z: 0 },
            rotation: { y: 0.0 }
          }
        },
        shared_browser: {
          enabled: false,
          locked: false,
          url: "about:blank",
          transform: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1 }
          }
        },
        shared_video: {
          enabled: false,
          locked: false,
          "360": false,
          playlist: [],
          transform: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1 }
          }
        },
        shared_slides: {
          enabled: false,
          locked: false,
          playlist: [],
          transform: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1 }
          }
        },
        glow: { enabled: false, scatter: 1, intensity: 1 }
      }
    },
    children: [
      {
        children: [],
        settings: {
          name: "Space Template",
          uuid: "39209028-6561-4442-8B56-C24BF05450F4",
          type: "Custom",
          transform: {
            position: { x: 0.0, y: 7.27730751, z: 5.0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 }
          },
          physics: {
            enabled: false,
            walkOnEnabled: false,
            grabEnabled: false,
            spawnerEnabled: false,
            settings: { mass: 0, friction: 0, restitution: 0 },
            shapes: []
          },
          shadow: { cast: false, receive: false },
          disable_animations: false,
          url:
            "https://github.com/the-expanse/StaticScenes/releases/download/7.0/tuscany",
          mouseOn: false,
          behaviours: [],
          hide_on_mobile: false,
          hide_on_desktop: false,
          preserve_scale: false,
          geometry: { type: "AssetBundle" },
          material: {},
          light: {},
          sound: {
            url:
              "https://github.com/the-expanse/StaticScenes/releases/download/7.0/tuscany"
          },
          text: {},
          effect: "",
          portal: {},
          sprite: {
            pivot: { x: 0.5, y: 0.5 },
            uv_rect: { x: 0, y: 0, z: 100, w: 100 }
          },
          state: {
            added: false,
            updated: false,
            transform_updated: false,
            removed: false
          }
        },
        object3D: -114887386
      }
    ],
    behaviours: [],
    version: "2.0",
    object3D: 1392870
  };
}
